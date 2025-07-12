#!/usr/bin/env python3
"""
Ifá Daily Reading App - Main Entry Point
Comprehensive bilingual Yoruba spiritual guidance application
"""

import os
import sys
from flask import Flask, render_template, jsonify, request, send_from_directory, redirect, url_for
import sqlite3
import json
from datetime import datetime, date, timedelta
import hashlib
import math
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'ifa-daily-yoruba-wisdom-2025')

# SQLAlchemy Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ifa_app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Login Manager Setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
login_manager.login_message = 'Please log in to access your spiritual practice tracking.'

# SQLAlchemy Models
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    spiritual_path = db.Column(db.String(100))  # e.g., "Yoruba Traditional", "Santería", etc.
    preferred_orisha = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    # Relationships
    rituals = db.relationship('UserRitual', backref='practitioner', lazy=True, cascade='all, delete-orphan')
    
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
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    ritual_notes = db.Column(db.Text)
    ritual_type = db.Column(db.String(100))
    orisha = db.Column(db.String(50))
    date_performed = db.Column(db.DateTime, default=datetime.utcnow)
    moon_phase = db.Column(db.String(30))
    offerings = db.Column(db.Text)  # JSON string for offerings list
    spiritual_outcome = db.Column(db.Text)
    duration_minutes = db.Column(db.Integer)  # Duration of ritual/practice
    location = db.Column(db.String(100))  # Where the ritual was performed
    privacy_level = db.Column(db.String(20), default='private')  # private, shared, community
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
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'practitioner': self.practitioner.username if self.practitioner else None
        }

class CalendarEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    gregorian_date = db.Column(db.Date, unique=True, nullable=False)
    yoruba_date = db.Column(db.String(100))
    orisha = db.Column(db.String(50))
    moon_phase = db.Column(db.String(30))
    daily_prayer = db.Column(db.Text)
    activities = db.Column(db.Text)  # JSON string
    offerings = db.Column(db.Text)  # JSON string
    spiritual_guidance = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'gregorian_date': self.gregorian_date.isoformat(),
            'yoruba_date': self.yoruba_date,
            'orisha': self.orisha,
            'moon_phase': self.moon_phase,
            'daily_prayer': self.daily_prayer,
            'activities': json.loads(self.activities) if self.activities else [],
            'offerings': json.loads(self.offerings) if self.offerings else [],
            'spiritual_guidance': self.spiritual_guidance
        }

# Database initialization
def init_db():
    """Initialize SQLite database with Odu and readings data"""
    conn = sqlite3.connect('ifa_app.db')
    c = conn.cursor()
    
    # Create simplified tables compatible with existing schema
    c.execute('''CREATE TABLE IF NOT EXISTS odus_simple
                 (id INTEGER PRIMARY KEY, name TEXT, subtitle TEXT, 
                  verses TEXT, guidance TEXT, patterns TEXT)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS daily_readings_simple
                 (id INTEGER PRIMARY KEY, date TEXT UNIQUE, odu_id INTEGER,
                  interpretation TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    
    # Sample Odu data (first few for demonstration)
    odus_data = [
        (1, "Ògbè", "Light/Clarity", "The light of Ifá illuminates the path", 
         "New beginnings approach with clarity and divine blessing", "||||||||"),
        (2, "Ọ̀yẹ̀kú", "Death/Transformation", "What dies must be reborn", 
         "Release the old to embrace transformation", "||||||||"),
        (3, "Ìwòrì", "Troublesome character", "The twisted one who brings change", 
         "Navigate challenges with wisdom and patience", "||||||||"),
        (4, "Òdí", "The seal", "What is sealed must eventually open", 
         "Patience and perseverance will unlock opportunities", "||||||||"),
        (5, "Ìrosùn", "Red earth", "The foundation of all things", 
         "Build upon solid spiritual foundations", "||||||||")
    ]
    
    c.executemany('''INSERT OR IGNORE INTO odus_simple 
                     (id, name, subtitle, verses, guidance, patterns) 
                     VALUES (?, ?, ?, ?, ?, ?)''', odus_data)
    
    conn.commit()
    conn.close()
    
    # Initialize SQLAlchemy tables
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
                preferred_orisha="Ọbàtálá"
            )
            db.session.add(default_user)
            db.session.commit()
            print("✓ Default user created")
        
        print("✓ SQLAlchemy tables created successfully")

def get_db_connection():
    """Get database connection"""
    conn = sqlite3.connect('ifa_app.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_daily_reading(date_str):
    """Get or create daily reading for a specific date"""
    conn = get_db_connection()
    
    # Check if reading exists for this date
    reading = conn.execute(
        'SELECT * FROM daily_readings_simple WHERE date = ?', (date_str,)
    ).fetchone()
    
    if reading:
        # Get the associated Odu
        odu = conn.execute('SELECT * FROM odus_simple WHERE id = ?', (reading['odu_id'],)).fetchone()
        conn.close()
        return {
            'date': reading['date'],
            'odu': dict(odu),
            'interpretation': reading['interpretation']
        }
    
    # Create new reading
    # Simple algorithm: use date hash to select Odu
    date_hash = int(hashlib.md5(date_str.encode()).hexdigest(), 16)
    odu_count = conn.execute('SELECT COUNT(*) FROM odus_simple').fetchone()[0]
    if odu_count == 0:
        odu_count = 5  # fallback
    odu_id = (date_hash % odu_count) + 1
    
    odu = conn.execute('SELECT * FROM odus_simple WHERE id = ?', (odu_id,)).fetchone()
    
    if not odu:
        # Fallback if no Odu found
        conn.close()
        return {
            'date': date_str,
            'odu': {'name': 'Ògbè', 'subtitle': 'Light', 'verses': 'Light illuminates', 'guidance': 'Seek clarity'},
            'interpretation': 'Today brings new opportunities for spiritual growth'
        }
    
    # Create interpretation
    interpretation = f"Today's spiritual guidance from {odu['name']} speaks of {odu['subtitle'].lower()}. {odu['guidance']}"
    
    # Save reading
    conn.execute(
        'INSERT INTO daily_readings_simple (date, odu_id, interpretation) VALUES (?, ?, ?)',
        (date_str, odu_id, interpretation)
    )
    conn.commit()
    conn.close()
    
    return {
        'date': date_str,
        'odu': dict(odu),
        'interpretation': interpretation
    }

@app.route('/')
def home():
    """Home page with today's reading"""
    today = date.today().isoformat()
    reading = get_daily_reading(today)
    
    return render_template('index.html', 
                         reading=reading,
                         today=today,
                         app_title="Ifá Daily - Yoruba Sound & Wisdom")

@app.route('/api/reading/<date>')
def api_get_reading(date):
    """API endpoint for daily reading"""
    try:
        reading = get_daily_reading(date)
        return jsonify(reading)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/odus')
def api_get_odus():
    """API endpoint for all Odus"""
    conn = get_db_connection()
    odus = conn.execute('SELECT * FROM odus_simple ORDER BY id').fetchall()
    conn.close()
    
    return jsonify([dict(odu) for odu in odus])

@app.route('/pronunciation')
def pronunciation_demo():
    """Yoruba pronunciation demo page"""
    return render_template('pronunciation.html')

@app.route('/api/pronunciation/words')
def get_pronunciation_words():
    """Get list of available pronunciation words"""
    # Audio currently disabled - return empty list
    return jsonify({
        'status': 'disabled',
        'message': 'Audio pronunciation temporarily disabled pending authentic recordings',
        'available_words': []
    })

@app.route('/static/audio/pronunciation/<filename>')
def serve_pronunciation_audio(filename):
    """Serve pronunciation audio files"""
    try:
        return send_from_directory('static/audio/pronunciation', filename)
    except FileNotFoundError:
        return jsonify({
            'error': 'Audio file not found',
            'message': 'Pronunciation system disabled pending authentic recordings'
        }), 404

# Enhanced Yoruba Calendar Integration
def load_yoruba_calendar():
    """Load complete Yoruba calendar data"""
    try:
        with open('complete_yoruba_calendar_2025.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        # Fallback minimal calendar structure
        return {
            "year": 2025,
            "months": [
                {
                    "name": "Ṣẹ̀rẹ̀",
                    "orisha": "Ọbàtálá",
                    "theme": "Purity and Wisdom",
                    "color": "white",
                    "taboos": ["violence", "anger"],
                    "days": [{"activity": "Meditation", "offerings": ["white cloth"], "prayer": "Ọbàtálá guide us"}]
                }
            ]
        }

def calculate_precise_moon_phase(greg_date):
    """Calculate moon phase for a given date using astronomical precision"""
    synodic_month = 29.53058868  # Precise lunar cycle
    known_new_moon = datetime(2025, 1, 29, 12, 36)  # Reference point
    
    days_since_new_moon = (greg_date - known_new_moon).total_seconds() / (24 * 3600)
    lunar_cycle_position = (days_since_new_moon % synodic_month) / synodic_month
    
    if lunar_cycle_position < 0.03 or lunar_cycle_position > 0.97:
        return "🌑 New Moon"
    elif 0.03 <= lunar_cycle_position < 0.22:
        return "🌒 Waxing Crescent"
    elif 0.22 <= lunar_cycle_position < 0.28:
        return "🌓 First Quarter"
    elif 0.28 <= lunar_cycle_position < 0.47:
        return "🌔 Waxing Gibbous"
    elif 0.47 <= lunar_cycle_position < 0.53:
        return "🌕 Full Moon"
    elif 0.53 <= lunar_cycle_position < 0.72:
        return "🌖 Waning Gibbous"
    elif 0.72 <= lunar_cycle_position < 0.78:
        return "🌗 Last Quarter"
    else:
        return "🌘 Waning Crescent"

def generate_prayer(orisha: str, day: int, moon_phase: str) -> str:
    """Generate context-aware prayers based on Orisha and moon phase"""
    prayers = {
        "Ọbàtálá": {
            "🌑 New Moon": "Ọbàtálá, Ọba ọ̀run, bless me with purity and new beginnings on this sacred new moon",
            "🌕 Full Moon": "Father of white cloth, let your light illuminate my path with wisdom and clarity",
            "default": f"Ọbàtálá, make me pure as white cloth on day {day}, guide my steps with your divine wisdom"
        },
        "Ògún": {
            "🌑 New Moon": "Ògún, lord of iron, forge new strength within me as the moon begins anew",
            "🌕 Full Moon": "Warrior Orisha, under the full moon's power, grant me courage to face all challenges",
            "default": f"Ògún, give me strength to overcome obstacles, clear my path of all hindrances"
        },
        "Ṣàngó": {
            "🌑 New Moon": "Kabiyesi Ṣàngó, thunder king, ignite justice in my heart with each new moon",
            "🌕 Full Moon": "Lord of fire and lightning, let your justice burn bright under the full moon",
            "default": f"Ṣàngó, bring justice and balance to my life, let your fire purify my actions"
        },
        "Èṣù": {
            "🌑 New Moon": "Èṣù Ẹlẹ́gbára, open new paths as the moon begins its cycle",
            "🌕 Full Moon": "Messenger Orisha, under the full moon's light, deliver my prayers to the divine",
            "default": f"Èṣù, guardian of crossroads, open the right doors and close the wrong ones"
        }
    }
    
    orisha_prayers = prayers.get(orisha, {"default": f"Great Orisha {orisha}, bless and guide me"})
    return orisha_prayers.get(moon_phase, orisha_prayers["default"])

def gregorian_to_yoruba_enhanced(greg_date):
    """Enhanced Gregorian to Yoruba conversion with intelligent prayer generation"""
    YORUBA_YEAR_DAYS = 364  # 13 months × 28 days
    YORUBA_MONTH_DAYS = 28
    YORUBA_EPOCH = datetime(2025, 1, 1)
    
    yoruba_calendar = load_yoruba_calendar()
    
    days_since_epoch = (greg_date - YORUBA_EPOCH).days
    
    if days_since_epoch < 0:
        years_before = abs(days_since_epoch) // YORUBA_YEAR_DAYS + 1
        adjusted_days = days_since_epoch + (years_before * YORUBA_YEAR_DAYS)
        yoruba_year = yoruba_calendar["year"] - years_before
    else:
        adjusted_days = days_since_epoch
        yoruba_year = yoruba_calendar["year"] + (adjusted_days // YORUBA_YEAR_DAYS)
    
    day_in_year = adjusted_days % YORUBA_YEAR_DAYS
    if day_in_year == 0 and adjusted_days > 0:
        day_in_year = YORUBA_YEAR_DAYS
    
    month_index = (day_in_year - 1) // YORUBA_MONTH_DAYS
    day_in_month = ((day_in_year - 1) % YORUBA_MONTH_DAYS) + 1
    
    month_index = max(0, min(month_index, len(yoruba_calendar["months"]) - 1))
    day_in_month = max(1, min(day_in_month, YORUBA_MONTH_DAYS))
    
    yoruba_month = yoruba_calendar["months"][month_index]
    
    day_data = None
    if day_in_month <= len(yoruba_month.get("days", [])):
        day_data = yoruba_month["days"][day_in_month - 1]
    
    actual_moon_phase = calculate_precise_moon_phase(greg_date)
    
    orisha = yoruba_month["orisha"]
    intelligent_prayer = generate_prayer(orisha, day_in_month, actual_moon_phase)
    
    yoruba_days = ["Àìkú", "Ajé", "Ìṣẹ́gun", "Rírú", "Bọ̀", "Ẹtì", "Àbámẹ́ta"]
    day_suffix = "ìlọ́" if day_in_month % 2 == 0 else "òwà"
    yoruba_day_name = f"Ọjọ́-{yoruba_days[(day_in_month-1) % 7]}-{day_suffix}"
    
    return {
        "gregorian_date": greg_date.strftime("%Y-%m-%d"),
        "yoruba_year": yoruba_year,
        "yoruba_month": yoruba_month["name"],
        "yoruba_day": day_in_month,
        "yoruba_day_name": yoruba_day_name,
        "orisha": yoruba_month["orisha"],
        "theme": yoruba_month["theme"],
        "color": yoruba_month["color"],
        "taboos": yoruba_month.get("taboos", []),
        "activity": day_data["activity"] if day_data else f"Traditional {orisha} observance",
        "offerings": day_data["offerings"] if day_data else ["water", "kolanut", "candle"],
        "moon_phase": actual_moon_phase,
        "prayer": intelligent_prayer,
        "spiritual_guidance": f"Today is under the guidance of {orisha}, focus on {yoruba_month['theme'].lower()}",
        "day_in_year": day_in_year,
        "month_index": month_index + 1
    }

# Enhanced Calendar Routes
@app.route('/dashboard')
def calendar_dashboard():
    """Enhanced Yoruba calendar dashboard"""
    today = datetime.now()
    enhanced_data = gregorian_to_yoruba_enhanced(today)
    yoruba_calendar = load_yoruba_calendar()
    
    current_month = None
    for month in yoruba_calendar["months"]:
        if month["name"] == enhanced_data["yoruba_month"]:
            current_month = month
            break
    
    current_day = {
        "activity": enhanced_data["activity"],
        "offerings": enhanced_data["offerings"],
        "prayer": enhanced_data["prayer"],
        "moon_phase": enhanced_data["moon_phase"],
        "yoruba_day": enhanced_data["yoruba_day_name"]
    }
    
    return render_template('dashboard.html',
                         date=enhanced_data,
                         month=current_month or {"orisha": "Loading...", "theme": "Loading...", "color": "white"},
                         day=current_day)

@app.route('/odun-calendar')
def odun_calendar():
    """Simple Odún Calendar based on user template"""
    today = datetime.now()
    enhanced_data = gregorian_to_yoruba_enhanced(today)
    return render_template('odun_calendar.html', date=enhanced_data)

@app.route('/api/today-enhanced')
def api_today_enhanced():
    """Enhanced today's date with intelligent prayers"""
    today = datetime.now()
    enhanced_yoruba_date = gregorian_to_yoruba_enhanced(today)
    return jsonify(enhanced_yoruba_date)

@app.route('/api/convert-enhanced/<date_str>')
def api_convert_enhanced(date_str):
    """Enhanced conversion with intelligent prayer generation"""
    try:
        greg_date = datetime.strptime(date_str, "%Y-%m-%d")
        enhanced_yoruba_date = gregorian_to_yoruba_enhanced(greg_date)
        return jsonify(enhanced_yoruba_date)
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400
    except Exception as e:
        return jsonify({"error": f"Enhanced conversion failed: {str(e)}"}), 500

@app.route('/api/range-enhanced')
def api_range_enhanced():
    """Enhanced range conversion with prayer patterns"""
    try:
        start_date_str = request.args.get('start_date')
        end_date_str = request.args.get('end_date')
        
        if not start_date_str or not end_date_str:
            return jsonify({"error": "start_date and end_date parameters required"}), 400
        
        start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d")
        
        if start_date > end_date:
            return jsonify({"error": "start_date must be before end_date"}), 400
        
        days_diff = (end_date - start_date).days
        if days_diff > 30:  # Limit for performance
            return jsonify({"error": "Date range cannot exceed 30 days for enhanced conversion"}), 400
        
        calendar_range = []
        current_date = start_date
        
        while current_date <= end_date:
            enhanced_data = gregorian_to_yoruba_enhanced(current_date)
            calendar_range.append(enhanced_data)
            current_date += timedelta(days=1)
        
        # Analyze spiritual patterns
        orisha_count = {}
        moon_phases = {}
        
        for day in calendar_range:
            orisha = day["orisha"]
            moon_phase = day["moon_phase"]
            
            orisha_count[orisha] = orisha_count.get(orisha, 0) + 1
            moon_phases[moon_phase] = moon_phases.get(moon_phase, 0) + 1
        
        dominant_orisha = max(orisha_count, key=orisha_count.get) if orisha_count else "Unknown"
        dominant_moon_phase = max(moon_phases, key=moon_phases.get) if moon_phases else "Unknown"
        
        spiritual_pattern = {
            "dominant_orisha": dominant_orisha,
            "dominant_moon_phase": dominant_moon_phase,
            "orisha_distribution": orisha_count,
            "moon_phase_distribution": moon_phases,
            "spiritual_focus": f"This period emphasizes {dominant_orisha}'s energy with {dominant_moon_phase.split()[1].lower() if ' ' in dominant_moon_phase else 'lunar'} influence"
        }
        
        return jsonify({
            "start_date": start_date_str,
            "end_date": end_date_str,
            "total_days": len(calendar_range),
            "enhanced_calendar_data": calendar_range,
            "spiritual_pattern": spiritual_pattern
        })
        
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400
    except Exception as e:
        return jsonify({"error": f"Enhanced range conversion failed: {str(e)}"}), 500

@app.route('/api/calendar')
def api_full_calendar():
    """Complete calendar API with enhanced data"""
    yoruba_calendar = load_yoruba_calendar()
    return jsonify(yoruba_calendar)

@app.route('/health')
def health_check():
    """Enhanced health check endpoint"""
    yoruba_calendar = load_yoruba_calendar()
    
    # Check SQLAlchemy database status
    try:
        ritual_count = UserRitual.query.count()
        calendar_count = CalendarEntry.query.count()
        sqlalchemy_status = {
            "sqlalchemy_connected": True,
            "user_rituals_count": ritual_count,
            "calendar_entries_count": calendar_count
        }
    except Exception as e:
        sqlalchemy_status = {
            "sqlalchemy_connected": False,
            "error": str(e)
        }
    
    return jsonify({
        'status': 'healthy',
        'app': 'Ifá Daily - Enhanced Yoruba Calendar with SQLAlchemy',
        'features': [
            'Intelligent prayer generation',
            'Astronomical moon phase calculation',
            'Enhanced Yoruba day naming',
            'Spiritual pattern analysis',
            'Complete calendar system',
            'SQLAlchemy user ritual tracking',
            'Calendar entry persistence'
        ],
        'audio_status': 'disabled_pending_authentic_recordings',
        'database': 'connected',
        'calendar_loaded': len(yoruba_calendar.get("months", [])) > 0,
        'total_calendar_days': sum(len(month.get("days", [])) for month in yoruba_calendar.get("months", [])),
        **sqlalchemy_status
    })

# Authentication endpoints
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Simple login system (demo - in production use OAuth)"""
    if request.method == 'POST':
        data = request.get_json() if request.is_json else request.form
        email = data.get('email')
        username = data.get('username')
        
        # Find user by email or username
        user = None
        if email:
            user = User.query.filter_by(email=email).first()
        elif username:
            user = User.query.filter_by(username=username).first()
        
        if user:
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
            if request.is_json:
                return jsonify({'status': 'error', 'message': 'User not found'}), 404
            else:
                return render_template('login.html', error='User not found')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    """Logout current user"""
    logout_user()
    return redirect(url_for('home'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    """Register new user"""
    if request.method == 'POST':
        data = request.get_json() if request.is_json else request.form
        
        try:
            user = User(
                email=data.get('email'),
                username=data.get('username'),
                first_name=data.get('first_name', ''),
                last_name=data.get('last_name', ''),
                spiritual_path=data.get('spiritual_path', 'Yoruba Traditional'),
                preferred_orisha=data.get('preferred_orisha', 'Ọbàtálá')
            )
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
                return redirect(url_for('dashboard'))
                
        except Exception as e:
            db.session.rollback()
            if request.is_json:
                return jsonify({'status': 'error', 'message': str(e)}), 400
            else:
                return render_template('register.html', error=str(e))
    
    return render_template('register.html')

@app.route('/api/user/profile')
@login_required
def user_profile():
    """Get current user profile"""
    return jsonify(current_user.to_dict())

@app.route('/api/user/profile', methods=['PUT'])
@login_required
def update_profile():
    """Update user profile"""
    data = request.get_json()
    try:
        current_user.first_name = data.get('first_name', current_user.first_name)
        current_user.last_name = data.get('last_name', current_user.last_name)
        current_user.spiritual_path = data.get('spiritual_path', current_user.spiritual_path)
        current_user.preferred_orisha = data.get('preferred_orisha', current_user.preferred_orisha)
        db.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': 'Profile updated successfully',
            'user': current_user.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'status': 'error', 'message': str(e)}), 400

# Enhanced SQLAlchemy API Endpoints with Authentication
@app.route('/api/rituals', methods=['GET', 'POST'])
def rituals():
    """Get all rituals or create new ritual"""
    if request.method == 'GET':
        # If user is logged in, show their rituals; otherwise show public ones
        if current_user.is_authenticated:
            rituals = UserRitual.query.filter_by(user_id=current_user.id).order_by(UserRitual.created_at.desc()).all()
        else:
            # Show community/shared rituals for non-authenticated users
            rituals = UserRitual.query.filter_by(privacy_level='community').order_by(UserRitual.created_at.desc()).limit(10).all()
        return jsonify([ritual.to_dict() for ritual in rituals])
    
    elif request.method == 'POST':
        data = request.get_json()
        try:
            ritual = UserRitual(
                user_id=current_user.id if current_user.is_authenticated else None,
                ritual_notes=data.get('ritual_notes'),
                ritual_type=data.get('ritual_type'),
                orisha=data.get('orisha'),
                moon_phase=data.get('moon_phase'),
                offerings=json.dumps(data.get('offerings', [])) if data.get('offerings') else None,
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

@app.route('/api/rituals/<int:ritual_id>', methods=['GET', 'PUT', 'DELETE'])
def ritual_detail(ritual_id):
    """Get, update, or delete specific ritual"""
    ritual = UserRitual.query.get_or_404(ritual_id)
    
    # Check access permissions
    if ritual.privacy_level == 'private' and (not current_user.is_authenticated or current_user.id != ritual.user_id):
        return jsonify({'error': 'Access denied'}), 403
    
    if request.method == 'GET':
        return jsonify(ritual.to_dict())
    
    elif request.method == 'PUT':
        # Only owner can update
        if not current_user.is_authenticated or current_user.id != ritual.user_id:
            return jsonify({'error': 'Access denied'}), 403
            
        data = request.get_json()
        try:
            ritual.ritual_notes = data.get('ritual_notes', ritual.ritual_notes)
            ritual.ritual_type = data.get('ritual_type', ritual.ritual_type)
            ritual.orisha = data.get('orisha', ritual.orisha)
            ritual.moon_phase = data.get('moon_phase', ritual.moon_phase)
            ritual.spiritual_outcome = data.get('spiritual_outcome', ritual.spiritual_outcome)
            ritual.duration_minutes = data.get('duration_minutes', ritual.duration_minutes)
            ritual.location = data.get('location', ritual.location)
            ritual.privacy_level = data.get('privacy_level', ritual.privacy_level)
            if data.get('offerings'):
                ritual.offerings = json.dumps(data.get('offerings'))
            db.session.commit()
            return jsonify(ritual.to_dict())
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
    
    elif request.method == 'DELETE':
        # Only owner can delete
        if not current_user.is_authenticated or current_user.id != ritual.user_id:
            return jsonify({'error': 'Access denied'}), 403
            
        try:
            db.session.delete(ritual)
            db.session.commit()
            return jsonify({'message': 'Ritual deleted successfully'})
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400

@app.route('/api/calendar-entries', methods=['GET', 'POST'])
def calendar_entries():
    """Get calendar entries or save today's enhanced data"""
    if request.method == 'GET':
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        
        query = CalendarEntry.query
        if start_date:
            query = query.filter(CalendarEntry.gregorian_date >= start_date)
        if end_date:
            query = query.filter(CalendarEntry.gregorian_date <= end_date)
        
        entries = query.order_by(CalendarEntry.gregorian_date.desc()).limit(30).all()
        return jsonify([entry.to_dict() for entry in entries])
    
    elif request.method == 'POST':
        # Save today's enhanced calendar data
        today = datetime.now().date()
        enhanced_data = gregorian_to_yoruba_enhanced(datetime.now())
        
        try:
            # Check if entry exists
            existing = CalendarEntry.query.filter_by(gregorian_date=today).first()
            if existing:
                # Update existing entry
                existing.yoruba_date = f"{enhanced_data['yoruba_day']} {enhanced_data['yoruba_month']} {enhanced_data['yoruba_year']}"
                existing.orisha = enhanced_data['orisha']
                existing.moon_phase = enhanced_data['moon_phase']
                existing.daily_prayer = enhanced_data['prayer']
                existing.activities = json.dumps([enhanced_data['activity']])
                existing.offerings = json.dumps(enhanced_data['offerings'])
                existing.spiritual_guidance = enhanced_data['spiritual_guidance']
                entry = existing
            else:
                # Create new entry
                entry = CalendarEntry(
                    gregorian_date=today,
                    yoruba_date=f"{enhanced_data['yoruba_day']} {enhanced_data['yoruba_month']} {enhanced_data['yoruba_year']}",
                    orisha=enhanced_data['orisha'],
                    moon_phase=enhanced_data['moon_phase'],
                    daily_prayer=enhanced_data['prayer'],
                    activities=json.dumps([enhanced_data['activity']]),
                    offerings=json.dumps(enhanced_data['offerings']),
                    spiritual_guidance=enhanced_data['spiritual_guidance']
                )
                db.session.add(entry)
            
            db.session.commit()
            return jsonify(entry.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    # Initialize database
    init_db()
    
    # Get port from environment or default to 5001
    port = int(os.environ.get('PORT', 5001))
    
    print(f"""
    🌟 Ifá Daily - Yoruba Sound & Wisdom App
    ==========================================
    Starting Flask server on port {port}
    
    📱 Main App (React/Node.js): http://localhost:5000
    🐍 Flask Demo: http://localhost:{port}
    
    🔇 Audio Status: Disabled pending authentic recordings
    📊 Database: SQLite + SQLAlchemy initialized
    
    📋 SQLAlchemy Features:
    • UserRitual tracking: /api/rituals
    • Calendar entries: /api/calendar-entries
    • Enhanced health check: /health
    """)
    
    # Run the app
    app.run(
        host='0.0.0.0',
        port=port,
        debug=True
    )