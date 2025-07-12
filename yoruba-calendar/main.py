#!/usr/bin/env python3
"""
Yoruba Calendar Application
A comprehensive spiritual calendar system with user authentication and ritual tracking
"""

import os
import json
import math
from datetime import datetime, date, timedelta
from flask import Flask, render_template, jsonify, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required
from flask_migrate import Migrate
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_mail import Mail, Message
from werkzeug.security import generate_password_hash, check_password_hash
import requests
from urllib.parse import quote
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
try:
    import pusher
    PUSHER_AVAILABLE = True
except ImportError:
    PUSHER_AVAILABLE = False

# Initialize Flask App
app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'yoruba-calendar-wisdom-2025')

# Configuration
app.config.update(
    SQLALCHEMY_DATABASE_URI='sqlite:///yoruba_calendar.db',
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
    MAIL_SERVER=os.getenv('MAIL_SERVER', 'smtp.gmail.com'),
    MAIL_PORT=int(os.getenv('MAIL_PORT', 587)),
    MAIL_USE_TLS=True,
    MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
    PUSHER_APP_ID=os.getenv('PUSHER_APP_ID'),
    PUSHER_KEY=os.getenv('PUSHER_KEY'),
    PUSHER_SECRET=os.getenv('PUSHER_SECRET'),
    PUSHER_CLUSTER=os.getenv('PUSHER_CLUSTER', 'us2')
)

# Initialize Extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
mail = Mail(app)

# Initialize Pusher if available
pusher_client = None
if PUSHER_AVAILABLE and app.config.get('PUSHER_APP_ID'):
    try:
        pusher_client = pusher.Pusher(
            app_id=app.config['PUSHER_APP_ID'],
            key=app.config['PUSHER_KEY'],
            secret=app.config['PUSHER_SECRET'],
            cluster=app.config['PUSHER_CLUSTER'],
            ssl=True
        )
        print("✓ Pusher real-time notifications initialized")
    except Exception as e:
        print(f"⚠️  Pusher initialization failed: {e}")
        pusher_client = None

# Admin Setup
admin = Admin(app, name='Odún Calendar Admin', template_mode='bootstrap3')

# Login Manager Setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth_login'
login_manager.login_message = 'Please log in to access your spiritual practice tracking.'

# ==================
# DATABASE MODELS
# ==================

class User(UserMixin, db.Model):
    """Enhanced user model with password authentication and spiritual preferences"""
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    spiritual_path = db.Column(db.String(100), default='Yoruba Traditional')
    preferred_orisha = db.Column(db.String(50), default='Ọbàtálá')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    # Enhanced user attributes
    is_admin = db.Column(db.Boolean, default=False)
    
    # Relationships
    rituals = db.relationship('UserRitual', backref='practitioner', lazy=True, cascade='all, delete-orphan')
    
    def set_password(self, password):
        """Hash and set user password"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Check if provided password matches hash"""
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'spiritual_path': self.spiritual_path,
            'preferred_orisha': self.preferred_orisha,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'total_rituals': len(self.rituals)
        }

class UserRitual(db.Model):
    """Enhanced user ritual tracking with completion status"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    ritual_notes = db.Column(db.Text)
    ritual_type = db.Column(db.String(100))
    orisha = db.Column(db.String(50))
    date_performed = db.Column(db.DateTime, default=datetime.utcnow)
    moon_phase = db.Column(db.String(30))
    offerings = db.Column(db.Text)  # JSON string
    spiritual_outcome = db.Column(db.Text)
    duration_minutes = db.Column(db.Integer)
    location = db.Column(db.String(100))
    privacy_level = db.Column(db.String(20), default='private')
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'ritual_notes': self.ritual_notes,
            'ritual_type': self.ritual_type,
            'orisha': self.orisha,
            'date_performed': self.date_performed.isoformat() if self.date_performed else None,
            'moon_phase': self.moon_phase,
            'offerings': json.loads(self.offerings) if self.offerings else [],
            'spiritual_outcome': self.spiritual_outcome,
            'duration_minutes': self.duration_minutes,
            'location': self.location,
            'privacy_level': self.privacy_level,
            'completed': self.completed,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'practitioner': self.practitioner.username if self.practitioner else None
        }

class Notification(db.Model):
    """User notification model"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('notifications', lazy=True))

class ImportantDate(db.Model):
    """Important spiritual dates model"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    month = db.Column(db.Integer, nullable=False)
    day = db.Column(db.Integer, nullable=False)
    repeat_yearly = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'month': self.month,
            'day': self.day,
            'repeat_yearly': self.repeat_yearly
        }

class Device(db.Model):
    """User device model for push notifications"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token = db.Column(db.String(255), nullable=False)
    platform = db.Column(db.String(50), nullable=False)  # 'ios', 'android', 'web'
    device_name = db.Column(db.String(100))
    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_used = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('devices', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'platform': self.platform,
            'device_name': self.device_name,
            'active': self.active,
            'last_used': self.last_used.isoformat() if self.last_used else None
        }

class PushNotificationLog(db.Model):
    """Log of sent push notifications"""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    platform = db.Column(db.String(50))
    status = db.Column(db.String(50), default='sent')  # 'sent', 'delivered', 'failed'
    sent_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('push_logs', lazy=True))

# Admin Views
class AdminModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and getattr(current_user, 'is_admin', False)

# Add admin views after all models are defined
def setup_admin():
    admin.add_view(AdminModelView(User, db.session))
    admin.add_view(AdminModelView(UserRitual, db.session))
    admin.add_view(AdminModelView(Notification, db.session))
    admin.add_view(AdminModelView(ImportantDate, db.session))
    admin.add_view(AdminModelView(Device, db.session))
    admin.add_view(AdminModelView(PushNotificationLog, db.session))

# ==================
# CALENDAR SYSTEM
# ==================

# Traditional Yoruba Month Data
YORUBA_MONTHS = [
    {"name": "Ṣẹ̀rẹ̀", "orisha": "Ọbàtálá", "theme": "Purity, New Beginnings", "emoji": "⚪"},
    {"name": "Èrèlé", "orisha": "Ògún", "theme": "Strength, Labor", "emoji": "⚔️"},
    {"name": "Ẹrẹ̀nà", "orisha": "Ṣàngó", "theme": "Justice, Power", "emoji": "⚡"},
    {"name": "Ìgbè", "orisha": "Ọ̀ṣun", "theme": "Love, Prosperity", "emoji": "💛"},
    {"name": "Ebi", "orisha": "Yemọja", "theme": "Motherhood, Healing", "emoji": "🌊"},
    {"name": "Òkúdu", "orisha": "Ọya", "theme": "Change, Transformation", "emoji": "🌪️"},
    {"name": "Agẹmọ", "orisha": "Èṣù", "theme": "Communication, Crossroads", "emoji": "🔄"},
    {"name": "Ògún", "orisha": "Ògún", "theme": "Technology, Iron", "emoji": "🔧"},
    {"name": "Owèwè", "orisha": "Ọ̀sányìn", "theme": "Medicine, Herbs", "emoji": "🌿"},
    {"name": "Ọ̀wàrà", "orisha": "Olókun", "theme": "Ocean Depths, Wisdom", "emoji": "🌊"},
    {"name": "Bélú", "orisha": "Òrìṣà Òkò", "theme": "Agriculture, Fertility", "emoji": "🌾"},
    {"name": "Ọ̀pẹ̀", "orisha": "Ọ̀ṣọ́ọ̀sì", "theme": "Hunting, Protection", "emoji": "🏹"},
    {"name": "Ọ̀pẹ̀lú", "orisha": "Òrúnmìlà", "theme": "Wisdom, Divination", "emoji": "🔮"}
]

# Yoruba Day Names
YORUBA_DAYS = [
    "Ọjọ́-Àìkú", "Ọjọ́-Ajé", "Ọjọ́-Ìṣẹ́gun", "Ọjọ́-Ọ̀rú",
    "Ọjọ́-Ọ̀bọ", "Ọjọ́-Ẹtì", "Ọjọ́-Àbámẹ́ta"
]

def calculate_moon_phase(date_obj):
    """Calculate moon phase using astronomical formulas"""
    year = date_obj.year
    month = date_obj.month
    day = date_obj.day
    
    # Convert to Julian Date for precise calculation
    if month <= 2:
        year -= 1
        month += 12
    a = year // 100
    b = 2 - a + a // 4
    jd = int(365.25 * (year + 4716)) + int(30.6001 * (month + 1)) + day + b - 1524.5
    
    # Calculate moon age in days
    days_since_new = jd - 2451549.5
    moon_cycle = 29.530588853
    moon_age = (days_since_new % moon_cycle)
    
    # Enhanced phase determination with Yoruba names
    phases = [
        {"name": "🌑 New Moon", "yoruba": "Òṣùpá Tuntun", "spiritual": "New beginnings, purification"},
        {"name": "🌒 Waxing Crescent", "yoruba": "Òṣùpá Gbígbé", "spiritual": "Growth, intention setting"},
        {"name": "🌓 First Quarter", "yoruba": "Òṣùpá Àgbedè", "spiritual": "Action, determination"},
        {"name": "🌔 Waxing Gibbous", "yoruba": "Òṣùpá Ńgbọ́n", "spiritual": "Patience, refinement"},
        {"name": "🌕 Full Moon", "yoruba": "Òṣùpá Kìkùn", "spiritual": "Manifestation, power"},
        {"name": "🌖 Waning Gibbous", "yoruba": "Òṣùpá Ńdín", "spiritual": "Gratitude, sharing wisdom"},
        {"name": "🌗 Last Quarter", "yoruba": "Òṣùpá Ìdajì", "spiritual": "Release, forgiveness"},
        {"name": "🌘 Waning Crescent", "yoruba": "Òṣùpá Ńkú", "spiritual": "Rest, reflection"}
    ]
    
    # Precise phase mapping
    if moon_age < 1: 
        return phases[0]  # New Moon
    elif moon_age < 7: 
        return phases[1]  # Waxing Crescent
    elif moon_age < 8: 
        return phases[2]  # First Quarter
    elif moon_age < 14: 
        return phases[3]  # Waxing Gibbous
    elif moon_age < 15: 
        return phases[4]  # Full Moon
    elif moon_age < 22: 
        return phases[5]  # Waning Gibbous
    elif moon_age < 23: 
        return phases[6]  # Last Quarter
    else: 
        return phases[7]  # Waning Crescent

def gregorian_to_yoruba(greg_date):
    """Convert Gregorian date to Yoruba calendar"""
    # Yoruba calendar: 364 days = 13 months × 28 days
    yoruba_start = datetime(2024, 1, 1)  # Arbitrary start date
    days_diff = (greg_date - yoruba_start).days
    
    # Calculate Yoruba year, month, and day
    yoruba_year = 2024 + (days_diff // 364)
    year_day = days_diff % 364
    yoruba_month_index = year_day // 28
    yoruba_day = (year_day % 28) + 1
    
    # Get month info
    month_info = YORUBA_MONTHS[yoruba_month_index % 13]
    
    # Get Yoruba day name
    yoruba_day_name = YORUBA_DAYS[greg_date.weekday()]
    
    # Calculate moon phase
    moon_phase = calculate_moon_phase(greg_date)
    
    # Generate prayer and offerings
    prayer = generate_prayer(month_info["orisha"], yoruba_day, moon_phase["name"])
    offerings = generate_offerings(month_info["orisha"])
    activity = generate_activity(month_info["orisha"], yoruba_day)
    
    return {
        "yoruba_year": yoruba_year,
        "yoruba_month": month_info["name"],
        "yoruba_day": f"{yoruba_day} {yoruba_day_name}",
        "orisha": month_info["orisha"],
        "theme": month_info["theme"],
        "moon_phase": moon_phase["name"],
        "prayer": prayer,
        "offerings": offerings,
        "activity": activity,
        "spiritual_guidance": f"Focus on {month_info['theme'].lower()} with {moon_phase['spiritual'].lower()}"
    }

def generate_prayer(orisha, day, moon_phase):
    """Generate contextual prayer"""
    prayers = {
        "Ọbàtálá": f"Ọbàtálá, source of purity and wisdom, guide us on day {day}. Under the {moon_phase}, grant us clarity and peace.",
        "Ògún": f"Ògún, master of iron and determination, strengthen us on day {day}. With the {moon_phase}, empower our work.",
        "Ṣàngó": f"Ṣàngó, lord of thunder and justice, protect us on day {day}. Through the {moon_phase}, bring righteous power.",
        "Ọ̀ṣun": f"Ọ̀ṣun, goddess of love and rivers, bless us on day {day}. Under the {moon_phase}, flow abundance to us.",
        "Yemọja": f"Yemọja, mother of waters, nurture us on day {day}. With the {moon_phase}, heal and protect us.",
        "Ọya": f"Ọya, winds of change, guide us on day {day}. Through the {moon_phase}, transform our path.",
        "Èṣù": f"Èṣù, opener of ways, clear our path on day {day}. Under the {moon_phase}, remove all obstacles."
    }
    return prayers.get(orisha, f"Divine forces, guide us on day {day} under the {moon_phase}.")

def generate_offerings(orisha):
    """Generate appropriate offerings for each Orisha"""
    offering_map = {
        "Ọbàtálá": ["white cloth", "coconut water", "white flowers", "cool water"],
        "Ògún": ["palm oil", "iron tools", "red palm wine", "roasted yam"],
        "Ṣàngó": ["red apples", "palm oil", "red candles", "bitter kola"],
        "Ọ̀ṣun": ["honey", "yellow flowers", "cinnamon", "gold jewelry"],
        "Yemọja": ["blue flowers", "sea water", "white candles", "watermelon"],
        "Ọya": ["purple eggplant", "wine", "copper coins", "plums"],
        "Èṣù": ["palm oil", "candy", "rum", "red pepper"]
    }
    return offering_map.get(orisha, ["water", "flowers", "candles"])

def generate_activity(orisha, day):
    """Generate daily spiritual activity"""
    activities = {
        "Ọbàtálá": "Meditation and purification practices",
        "Ògún": "Work dedication and tool blessing",
        "Ṣàngó": "Justice reflection and community service",
        "Ọ̀ṣun": "Self-care and abundance visualization",
        "Yemọja": "Ancestral connection and healing work",
        "Ọya": "Change embracing and wind ceremonies",
        "Èṣù": "Path clearing and communication rituals"
    }
    return activities.get(orisha, "General spiritual practice")

def get_spiritual_guidance(moon_phase_name):
    """Get spiritual guidance based on moon phase"""
    guidance = {
        "🌑 New Moon": {
            "practices": ["Meditation", "Setting intentions", "Purification rituals"],
            "offerings": ["White candles", "Clear water", "White flowers"],
            "taboos": ["Making major decisions", "Starting conflicts"],
            "energy": "Receptive, introspective, cleansing"
        },
        "🌕 Full Moon": {
            "practices": ["Manifestation rituals", "Divination", "Healing ceremonies"],
            "offerings": ["Fruits", "Palm wine", "Cooked foods"],
            "taboos": ["Sleeping outdoors", "Cutting hair"],
            "energy": "Active, powerful, transformative"
        }
    }
    return guidance.get(moon_phase_name, guidance["🌑 New Moon"])

# ==================
# AUTHENTICATION
# ==================

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def auth_login():
    """Enhanced login with password authentication"""
    if request.method == 'POST':
        data = request.get_json() if request.is_json else request.form
        identifier = data.get('email', '').strip()
        password = data.get('password', '')
        
        # Find user by email or username
        user = User.query.filter(
            (User.email == identifier) | (User.username == identifier)
        ).first()
        
        if user and (not user.password_hash or user.check_password(password)):
            user.last_login = datetime.utcnow()
            db.session.commit()
            login_user(user)
            
            if request.is_json:
                return jsonify({
                    'status': 'success',
                    'message': 'Logged in successfully',
                    'user': user.to_dict()
                })
            else:
                return redirect(url_for('dashboard'))
        else:
            error_msg = 'Invalid username or password'
            if request.is_json:
                return jsonify({'status': 'error', 'message': error_msg}), 401
            else:
                flash(error_msg)
                return render_template('auth/login.html', error=error_msg)
    
    return render_template('auth/login.html')

@app.route('/register', methods=['GET', 'POST'])
def auth_register():
    """Enhanced registration with password security"""
    if request.method == 'POST':
        data = request.get_json() if request.is_json else request.form
        
        try:
            # Check if user already exists
            existing_user = User.query.filter(
                (User.email == data.get('email')) | 
                (User.username == data.get('username'))
            ).first()
            
            if existing_user:
                raise ValueError('Email or username already exists')
            
            # Validate password
            password = data.get('password', '')
            if len(password) < 6:
                raise ValueError('Password must be at least 6 characters long')
            
            user = User(
                email=data.get('email'),
                username=data.get('username'),
                first_name=data.get('first_name', ''),
                last_name=data.get('last_name', ''),
                spiritual_path=data.get('spiritual_path', 'Yoruba Traditional'),
                preferred_orisha=data.get('preferred_orisha', 'Ọbàtálá')
            )
            user.set_password(password)
            
            db.session.add(user)
            db.session.commit()
            login_user(user)
            
            if request.is_json:
                return jsonify({
                    'status': 'success',
                    'message': 'Account created successfully',
                    'user': user.to_dict()
                }), 201
            else:
                flash('Account created successfully!')
                return redirect(url_for('dashboard'))
                
        except Exception as e:
            db.session.rollback()
            error_msg = str(e)
            if request.is_json:
                return jsonify({'status': 'error', 'message': error_msg}), 400
            else:
                flash(error_msg)
                return render_template('auth/register.html', error=error_msg)
    
    return render_template('auth/register.html')

@app.route('/logout')
@login_required
def auth_logout():
    """Logout user"""
    logout_user()
    return redirect(url_for('index'))

# ==================
# MAIN ROUTES
# ==================

@app.route('/')
def index():
    """Main calendar page"""
    current_date = datetime.now()
    yoruba_data = gregorian_to_yoruba(current_date)
    moon_phase = calculate_moon_phase(current_date)
    spiritual_guidance = get_spiritual_guidance(moon_phase["name"])
    
    return render_template('odun-calendar.html',
                         current_date=current_date,
                         yoruba_data=yoruba_data,
                         moon_phase=moon_phase,
                         spiritual_guidance=spiritual_guidance)

@app.route('/dashboard')
@login_required
def dashboard():
    """Enhanced user dashboard with today's spiritual guidance"""
    today = datetime.now()
    yoruba_data = gregorian_to_yoruba(today)
    moon_phase = calculate_moon_phase(today)
    spiritual_guidance = get_spiritual_guidance(moon_phase["name"])
    
    # Get user's rituals for today
    today_str = today.strftime("%m-%d")
    rituals = UserRitual.query.filter_by(
        user_id=current_user.id
    ).filter(
        db.func.date(UserRitual.date_performed) == today.date()
    ).all()
    
    return render_template('dashboard-streamlined.html',
                         current_date=today,
                         yoruba_data=yoruba_data,
                         moon_phase=moon_phase,
                         spiritual_guidance=spiritual_guidance,
                         rituals=rituals,
                         user=current_user)

# ==================
# API ENDPOINTS
# ==================

@app.route('/api/convert/<date_str>')
def api_convert_date(date_str):
    """Convert specific date to Yoruba calendar"""
    try:
        greg_date = datetime.strptime(date_str, '%Y-%m-%d')
        yoruba_data = gregorian_to_yoruba(greg_date)
        return jsonify(yoruba_data)
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

@app.route('/api/today')
def api_today():
    """Get today's Yoruba calendar data"""
    today = datetime.now()
    yoruba_data = gregorian_to_yoruba(today)
    moon_phase = calculate_moon_phase(today)
    spiritual_guidance = get_spiritual_guidance(moon_phase["name"])
    
    return jsonify({
        **yoruba_data,
        'moon_phase_details': moon_phase,
        'spiritual_guidance': spiritual_guidance,
        'gregorian_date': today.strftime('%Y-%m-%d')
    })

@app.route('/api/rituals', methods=['GET', 'POST'])
def api_rituals():
    """Ritual management API"""
    if request.method == 'GET':
        date_filter = request.args.get('date')
        
        if current_user.is_authenticated:
            query = UserRitual.query.filter_by(user_id=current_user.id)
            if date_filter:
                filter_date = datetime.strptime(date_filter, '%Y-%m-%d').date()
                query = query.filter(db.func.date(UserRitual.date_performed) == filter_date)
            rituals = query.order_by(UserRitual.created_at.desc()).all()
        else:
            # Show public rituals for non-authenticated users
            rituals = UserRitual.query.filter_by(privacy_level='community').limit(10).all()
        
        return jsonify([ritual.to_dict() for ritual in rituals])
    
    elif request.method == 'POST':
        if not current_user.is_authenticated:
            return jsonify({'error': 'Authentication required'}), 401
        
        data = request.get_json()
        try:
            ritual = UserRitual(
                user_id=current_user.id,
                ritual_notes=data.get('ritual_notes'),
                ritual_type=data.get('ritual_type'),
                orisha=data.get('orisha'),
                moon_phase=data.get('moon_phase'),
                offerings=json.dumps(data.get('offerings', [])),
                spiritual_outcome=data.get('spiritual_outcome'),
                duration_minutes=data.get('duration_minutes'),
                location=data.get('location'),
                privacy_level=data.get('privacy_level', 'private')
            )
            
            db.session.add(ritual)
            db.session.commit()
            return jsonify(ritual.to_dict()), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400

@app.route('/add_ritual', methods=['POST'])
@login_required
def add_ritual():
    """Quick ritual addition for dashboard"""
    try:
        note = request.form.get('note', '')
        ritual_type = request.form.get('ritual_type', 'Daily Practice')
        orisha = request.form.get('orisha', current_user.preferred_orisha)
        
        current_moon = calculate_moon_phase(datetime.now())
        
        ritual = UserRitual(
            user_id=current_user.id,
            ritual_notes=note,
            ritual_type=ritual_type,
            orisha=orisha,
            moon_phase=current_moon['name'],
            completed=False
        )
        
        db.session.add(ritual)
        db.session.commit()
        
        flash('Ritual added successfully!')
        return redirect(url_for('dashboard'))
        
    except Exception as e:
        flash(f'Error adding ritual: {str(e)}')
        return redirect(url_for('dashboard'))

@app.route('/complete_ritual/<int:ritual_id>', methods=['POST'])
@login_required
def complete_ritual(ritual_id):
    """Mark ritual as completed"""
    ritual = UserRitual.query.get_or_404(ritual_id)
    
    if ritual.user_id != current_user.id:
        flash('Access denied')
        return redirect(url_for('dashboard'))
    
    ritual.completed = not ritual.completed
    db.session.commit()
    
    flash('Ritual status updated!')
    return redirect(url_for('dashboard'))

@app.route('/api/user/profile')
@login_required
def api_user_profile():
    """Get user profile"""
    return jsonify(current_user.to_dict())

@app.route('/health')
def health_check():
    """Health check endpoint"""
    try:
        user_count = User.query.count()
        ritual_count = UserRitual.query.count()
        
        return jsonify({
            'status': 'healthy',
            'app': 'Yoruba Calendar Application',
            'features': [
                'Traditional Yoruba calendar conversion',
                'Moon phase calculations',
                'User authentication and ritual tracking',
                'Daily spiritual guidance',
                'Orisha-based monthly themes'
            ],
            'database': {
                'connected': True,
                'users': user_count,
                'rituals': ritual_count
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# ==================
# ENHANCED FEATURES
# ==================

def send_email_notification(user, subject, message):
    """Send email notification to user"""
    try:
        if app.config.get('MAIL_USERNAME') and user.email:
            msg = Message(
                subject,
                sender=app.config['MAIL_USERNAME'],
                recipients=[user.email]
            )
            msg.body = message
            mail.send(msg)
            print(f"✓ Email sent to {user.email}: {subject}")
    except Exception as e:
        app.logger.error(f"Failed to send email: {str(e)}")

def send_push_notification(user, title, message):
    """Send push notification to user's devices"""
    if not pusher_client:
        return
    
    try:
        # Send to user's channel
        pusher_client.trigger(
            f'user_{user.id}',
            'notification',
            {
                'title': title,
                'message': message,
                'timestamp': datetime.now().isoformat()
            }
        )
        
        # Log the notification
        log_entry = PushNotificationLog(
            user_id=user.id,
            title=title,
            message=message,
            platform='pusher',
            status='sent'
        )
        db.session.add(log_entry)
        db.session.commit()
        
        print(f"✓ Push notification sent to user {user.id}: {title}")
    except Exception as e:
        app.logger.error(f"Failed to send push notification: {str(e)}")

def send_realtime_update(channel, event, data):
    """Send real-time updates via Pusher"""
    if pusher_client:
        try:
            pusher_client.trigger(channel, event, data)
        except Exception as e:
            app.logger.error(f"Failed to send realtime update: {str(e)}")

def get_social_share_links(date_info):
    """Generate social media sharing links"""
    text = f"Today is {date_info.get('yoruba_day', 'a special day')} in the Yoruba calendar. {date_info.get('activity', 'Join our spiritual journey!')}"
    encoded_text = quote(text)
    base_url = request.url_root
    return {
        'twitter': f"https://twitter.com/intent/tweet?text={encoded_text}&url={base_url}",
        'facebook': f"https://www.facebook.com/sharer/sharer.php?u={base_url}&quote={encoded_text}",
        'whatsapp': f"https://wa.me/?text={encoded_text}%20{base_url}",
        'linkedin': f"https://www.linkedin.com/sharing/share-offsite/?url={base_url}"
    }

def check_important_dates():
    """Check for important spiritual dates and notify users"""
    today = datetime.now()
    
    # Convert to Yoruba calendar day
    yoruba_day = (today.timetuple().tm_yday - 1) % 364 + 1
    yoruba_month = ((yoruba_day - 1) // 28) + 1
    yoruba_day_in_month = ((yoruba_day - 1) % 28) + 1
    
    # Check for important dates
    important_dates = ImportantDate.query.filter(
        ImportantDate.month == yoruba_month,
        ImportantDate.day == yoruba_day_in_month
    ).all()
    
    if important_dates:
        users = User.query.all()
        for date in important_dates:
            for user in users:
                # Create in-app notification
                notification = Notification(
                    user_id=user.id,
                    message=f"Today is {date.name}: {date.description[:200]}{'...' if len(date.description) > 200 else ''}"
                )
                db.session.add(notification)
                
                # Send email notification if configured
                if user.email:
                    send_email_notification(
                        user,
                        f"🗓️ Important Date: {date.name}",
                        f"Today is {date.name} in the Yoruba calendar.\n\n{date.description}\n\nHave a blessed day!"
                    )
                
                # Send push notification
                send_push_notification(
                    user,
                    f"🗓️ {date.name}",
                    f"{date.description[:100]}{'...' if len(date.description) > 100 else ''}"
                )
                
                # Send realtime update to user's dashboard
                send_realtime_update(
                    f'user_{user.id}',
                    'important_date',
                    {
                        'name': date.name,
                        'description': date.description,
                        'date': today.strftime('%Y-%m-%d')
                    }
                )
        
        db.session.commit()
        print(f"✓ Processed {len(important_dates)} important dates for {len(users)} users")

@app.route('/share', methods=['POST'])
@login_required
def share():
    """Handle social media sharing"""
    platform = request.form.get('platform')
    today = datetime.now()
    date_info = gregorian_to_yoruba(today)
    share_links = get_social_share_links(date_info)
    
    if platform in share_links:
        return redirect(share_links[platform])
    
    flash('Sharing link generated successfully!', 'success')
    return redirect(url_for('dashboard'))

@app.route('/notifications')
@login_required
def notifications():
    """Display user notifications"""
    notifications = Notification.query.filter_by(user_id=current_user.id).order_by(Notification.created_at.desc()).all()
    return render_template('notifications.html', notifications=notifications)

@app.route('/devices')
@login_required
def device_management():
    """Device management page"""
    return render_template('device_management.html')

@app.route('/admin-dashboard')
@login_required
def admin_dashboard():
    """Admin dashboard page"""
    if not getattr(current_user, 'is_admin', False):
        flash('Admin access required', 'error')
        return redirect(url_for('dashboard'))
    
    # Gather statistics
    stats = {
        'total_users': User.query.count(),
        'active_devices': Device.query.filter_by(active=True).count(),
        'important_dates': ImportantDate.query.count(),
        'total_notifications': Notification.query.count()
    }
    
    # Recent activity (sample data)
    recent_activity = [
        {
            'message': f'System started successfully with {stats["total_users"]} users',
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        },
        {
            'message': f'{stats["active_devices"]} devices currently active',
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        },
        {
            'message': f'Scheduler running for {stats["important_dates"]} important dates',
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
    ]
    
    return render_template('admin_dashboard.html', stats=stats, recent_activity=recent_activity)

@app.route('/admin/notify', methods=['POST'])
@login_required
def admin_notify():
    """Send notification to all users"""
    if not getattr(current_user, 'is_admin', False):
        return jsonify({'error': 'Admin access required'}), 403
    
    title = request.form.get('title', 'Admin Notification')
    message = request.form.get('message', '')
    notification_type = request.form.get('notification_type', 'all')
    
    if not message:
        flash('Message is required', 'error')
        return redirect(url_for('admin_dashboard'))
    
    users = User.query.all()
    sent_count = 0
    
    for user in users:
        if notification_type in ['all', 'in-app']:
            # Create in-app notification
            notification = Notification(
                user_id=user.id,
                message=f"{title}: {message}"
            )
            db.session.add(notification)
        
        if notification_type in ['all', 'email'] and user.email:
            # Send email notification
            send_email_notification(user, title, message)
        
        if notification_type in ['all', 'push']:
            # Send push notification
            send_push_notification(user, title, message)
        
        sent_count += 1
    
    db.session.commit()
    
    flash(f'Notification sent to {sent_count} users via {notification_type} channel(s)', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/test-notifications', methods=['POST'])
@login_required
def admin_test_notifications():
    """Test notification system"""
    if not getattr(current_user, 'is_admin', False):
        return jsonify({'error': 'Admin access required'}), 403
    
    # Send test notifications to admin
    test_message = f"🧪 System test notification sent at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    
    # In-app notification
    notification = Notification(
        user_id=current_user.id,
        message=test_message
    )
    db.session.add(notification)
    
    # Email notification
    if current_user.email:
        send_email_notification(current_user, "🧪 Test Notification", test_message)
    
    # Push notification
    send_push_notification(current_user, "🧪 Test Push", test_message)
    
    db.session.commit()
    
    flash('Test notifications sent successfully! Check your devices and email.', 'success')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/check-important-dates', methods=['POST'])
@login_required
def admin_check_important_dates():
    """Manually trigger important dates check"""
    if not getattr(current_user, 'is_admin', False):
        return jsonify({'error': 'Admin access required'}), 403
    
    try:
        check_important_dates()
        flash('Important dates check completed successfully!', 'success')
    except Exception as e:
        flash(f'Error checking important dates: {str(e)}', 'error')
    
    return redirect(url_for('admin_dashboard'))

@app.route('/mark_notification_read/<int:notification_id>', methods=['POST'])
@login_required
def mark_notification_read(notification_id):
    """Mark notification as read"""
    notification = Notification.query.get_or_404(notification_id)
    
    if notification.user_id != current_user.id:
        flash('Access denied.', 'error')
        return redirect(url_for('notifications'))
    
    notification.read = True
    db.session.commit()
    
    return jsonify({'status': 'success'})

@app.route('/api/notifications')
@login_required
def api_notifications():
    """API endpoint for notifications"""
    notifications = Notification.query.filter_by(user_id=current_user.id).order_by(Notification.created_at.desc()).limit(10).all()
    return jsonify([{
        'id': n.id,
        'message': n.message,
        'read': n.read,
        'created_at': n.created_at.isoformat()
    } for n in notifications])

@app.route('/api/share-links')
@login_required
def api_share_links():
    """API endpoint for social sharing links"""
    today = datetime.now()
    date_info = gregorian_to_yoruba(today)
    share_links = get_social_share_links(date_info)
    return jsonify(share_links)

@app.route('/register_device', methods=['POST'])
@login_required
def register_device():
    """Register user device for push notifications"""
    data = request.get_json() or request.form
    token = data.get('token')
    platform = data.get('platform', 'web')
    device_name = data.get('device_name', f'{platform.title()} Device')
    
    if not token:
        return jsonify({'error': 'Device token required'}), 400
    
    # Check if device already exists
    existing_device = Device.query.filter_by(
        user_id=current_user.id, 
        token=token
    ).first()
    
    if existing_device:
        # Update existing device
        existing_device.active = True
        existing_device.last_used = datetime.utcnow()
        existing_device.device_name = device_name
    else:
        # Create new device
        device = Device(
            user_id=current_user.id,
            token=token,
            platform=platform,
            device_name=device_name
        )
        db.session.add(device)
    
    db.session.commit()
    
    # Send welcome push notification
    send_push_notification(
        current_user,
        "Welcome to Odún Calendar!",
        "You'll now receive spiritual guidance and important date notifications."
    )
    
    return jsonify({'status': 'success', 'message': 'Device registered successfully'})

@app.route('/api/devices')
@login_required
def api_user_devices():
    """Get user's registered devices"""
    devices = Device.query.filter_by(user_id=current_user.id, active=True).all()
    return jsonify([device.to_dict() for device in devices])

@app.route('/unregister_device/<int:device_id>', methods=['DELETE'])
@login_required
def unregister_device(device_id):
    """Unregister a user device"""
    device = Device.query.filter_by(id=device_id, user_id=current_user.id).first()
    
    if not device:
        return jsonify({'error': 'Device not found'}), 404
    
    device.active = False
    db.session.commit()
    
    return jsonify({'status': 'success', 'message': 'Device unregistered'})

@app.route('/api/pusher/auth', methods=['POST'])
@login_required
def pusher_auth():
    """Authenticate user for Pusher channels"""
    if not pusher_client:
        return jsonify({'error': 'Push notifications not available'}), 503
    
    socket_id = request.form['socket_id']
    channel_name = request.form['channel_name']
    
    # Only allow access to user's own channel
    if channel_name != f'user_{current_user.id}':
        return jsonify({'error': 'Unauthorized'}), 403
    
    auth = pusher_client.authenticate(
        channel=channel_name,
        socket_id=socket_id
    )
    
    return jsonify(auth)

@app.route('/api/test-notification', methods=['POST'])
@login_required
def test_notification():
    """Test notification system (for development)"""
    if not current_user.is_admin:
        return jsonify({'error': 'Admin access required'}), 403
    
    # Send test notifications
    send_email_notification(
        current_user,
        "🧪 Test Notification",
        "This is a test email notification from the Odún Calendar system."
    )
    
    send_push_notification(
        current_user,
        "🧪 Test Push",
        "This is a test push notification from the Odún Calendar system."
    )
    
    # Create in-app notification
    notification = Notification(
        user_id=current_user.id,
        message="🧪 Test in-app notification - system is working correctly!"
    )
    db.session.add(notification)
    db.session.commit()
    
    return jsonify({'status': 'success', 'message': 'Test notifications sent'})

# ==================
# SCHEDULED TASKS
# ==================

def setup_scheduler():
    """Setup background scheduler for notifications"""
    try:
        scheduler = BackgroundScheduler()
        scheduler.add_job(
            func=check_important_dates,
            trigger='cron',
            hour=8,
            minute=0,
            id='daily_notifications'
        )
        scheduler.start()
        atexit.register(lambda: scheduler.shutdown())
        print("✓ Background scheduler started for daily notifications")
    except Exception as e:
        print(f"⚠️  Scheduler setup failed: {e}")

def initialize_important_dates():
    """Initialize important spiritual dates"""
    sample_dates = [
        ('Ọbàtálá Day', 'Day of purification and new beginnings with the father of all Orishas', 1, 1),
        ('Ògún Festival', 'Celebration of iron, technology, and the warrior spirit', 2, 15),
        ('Ṣàngó Thunder Day', 'Day of justice, power, and divine thunder', 3, 10),
        ('Ọ̀ṣun River Blessing', 'Celebration of love, prosperity, and river goddess', 4, 8),
        ('Yemọja Ocean Day', 'Motherhood, healing, and ocean mother celebration', 5, 12),
        ('Ọya Transformation Day', 'Day of change, transformation, and winds of change', 6, 20),
        ('Èṣù Crossroads Day', 'Communication, messages, and crossroads guidance', 7, 3),
        ('Ọ̀sányìn Medicine Day', 'Day of herbal medicine and healing knowledge', 9, 18),
        ('Olókun Wisdom Day', 'Ocean depths wisdom and spiritual mysteries', 10, 25),
        ('Òrìṣà Òkò Harvest Day', 'Agriculture, fertility, and abundance celebration', 11, 14),
        ('Ọ̀ṣọ́ọ̀sì Protection Day', 'Day of hunting, protection, and spiritual guardianship', 12, 7),
        ('Òrúnmìlà Wisdom Day', 'Divination, wisdom, and spiritual knowledge', 13, 16)
    ]
    
    for name, description, month, day in sample_dates:
        if not ImportantDate.query.filter_by(name=name).first():
            important_date = ImportantDate(
                name=name,
                description=description,
                month=month,
                day=day
            )
            db.session.add(important_date)
    
    db.session.commit()
    print("✓ Important spiritual dates initialized")

# ==================
# INITIALIZATION
# ==================

def init_db():
    """Initialize database with default data"""
    with app.app_context():
        db.create_all()
        
        # Create default user if none exists
        if not User.query.first():
            default_user = User(
                email="spiritual_seeker@example.com",
                username="spiritual_seeker",
                first_name="Spiritual",
                last_name="Seeker",
                spiritual_path="Yoruba Traditional",
                preferred_orisha="Ọbàtálá",
                is_admin=True  # Make default user an admin
            )
            default_user.set_password("test123")  # Default password for demo
            db.session.add(default_user)
            db.session.commit()
            print("✓ Default admin user created with password 'test123'")
        
        # Initialize important dates and admin setup
        initialize_important_dates()
        setup_admin()
        
        print("✓ Database initialized successfully")

if __name__ == '__main__':
    init_db()
    
    # Start scheduler for enhanced features
    setup_scheduler()
    
    port = int(os.environ.get('PORT', 8080))
    
    print(f"""
    🌟 Enhanced Yoruba Calendar Application
    =======================================
    Starting server on port {port}
    
    🌙 Core Features:
    • Traditional Yoruba calendar conversion
    • Astronomical moon phase calculations  
    • User authentication and ritual tracking
    • Daily spiritual guidance with Orisha themes
    • Interactive calendar interface
    
    ⚡ Enhanced Features:
    • Social media sharing (Twitter, Facebook, WhatsApp, LinkedIn)
    • Email notifications for important spiritual dates
    • In-app notification system
    • Background scheduler for daily notifications
    • Admin panel for content management
    • Important dates calendar with 12 spiritual celebrations
    
    📱 Access: http://localhost:{port}
    🔐 Demo Login: username='spiritual_seeker', password='test123'
    ⚙️  Admin Panel: http://localhost:{port}/admin
    """)
    
    app.run(host='0.0.0.0', port=port, debug=True)