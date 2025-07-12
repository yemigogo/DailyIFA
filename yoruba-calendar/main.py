# Complete Yoruba Calendar App with All Features
import os
from flask import Flask, jsonify, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_migrate import Migrate
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from datetime import datetime, timedelta
import math
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Mail, Message
import requests
from apscheduler.schedulers.background import BackgroundScheduler
import pytz
import json
from urllib.parse import quote
from pusher import Pusher

# Initialize Flask App
app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-key-123')

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///yoruba_calendar.db').replace('postgres://', 'postgresql://')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Email Configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'true').lower() == 'true'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER', 'noreply@yorubacalendar.com')

# Initialize Extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
mail = Mail(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
admin = Admin(app, name='Odún Admin', template_mode='bootstrap3')

# Pusher Configuration
pusher_client = Pusher(
    app_id=os.environ.get('PUSHER_APP_ID', 'test'),
    key=os.environ.get('PUSHER_KEY', 'test'),
    secret=os.environ.get('PUSHER_SECRET', 'test'),
    cluster=os.environ.get('PUSHER_CLUSTER', 'us2'),
    ssl=True
)

# ======================
# MODELS
# ======================

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)
    email_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    # Relationships
    rituals = db.relationship('UserRitual', backref='user', lazy=True)
    notifications = db.relationship('Notification', backref='user', lazy=True)
    devices = db.relationship('Device', backref='user', lazy=True)
    subscriptions = db.relationship('Subscription', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class UserRitual(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.String(10))  # Format: "MM-DD"
    notes = db.Column(db.Text)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(100))
    message = db.Column(db.Text)
    read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    notification_type = db.Column(db.String(50))  # 'system', 'reminder', 'event'

class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token = db.Column(db.String(255))
    platform = db.Column(db.String(50))  # 'ios', 'android', 'web'
    active = db.Column(db.Boolean, default=True)
    last_active = db.Column(db.DateTime, default=datetime.utcnow)

class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    endpoint = db.Column(db.String(512))
    keys = db.Column(db.JSON)  # For WebPush
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ImportantDate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    month = db.Column(db.Integer)  # Yoruba month (1-13)
    day = db.Column(db.Integer)    # Yoruba day (1-28)
    is_annual = db.Column(db.Boolean, default=True)
    notification_days_before = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class PushNotificationLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(100))
    message = db.Column(db.Text)
    sent_at = db.Column(db.DateTime, default=datetime.utcnow)
    success = db.Column(db.Boolean, default=False)
    error_message = db.Column(db.Text)

# Admin Views
class AdminModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.is_admin

admin.add_view(AdminModelView(User, db.session))
admin.add_view(AdminModelView(UserRitual, db.session))
admin.add_view(AdminModelView(Notification, db.session))
admin.add_view(AdminModelView(Device, db.session))
admin.add_view(AdminModelView(Subscription, db.session))
admin.add_view(AdminModelView(ImportantDate, db.session))
admin.add_view(AdminModelView(PushNotificationLog, db.session))

# ======================
# YORUBA CALENDAR DATA
# ======================

yoruba_months = [
    {
        "name": "Ṣẹ̀rẹ̀", "orisha": "Ọbàtálá", "theme": "Purity and New Beginnings",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Meditation", "Purification"], "offerings": ["White cloth", "Coconut"]} for i in range(1, 29)]
    },
    {
        "name": "Èrèlé", "orisha": "Ògún", "theme": "Strength and Iron",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Metalwork", "Protection"], "offerings": ["Iron tools", "Palm wine"]} for i in range(1, 29)]
    },
    {
        "name": "Ẹrẹ̀nà", "orisha": "Ṣàngó", "theme": "Fire and Justice",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Dance", "Drumming"], "offerings": ["Red cloth", "Kola nuts"]} for i in range(1, 29)]
    },
    {
        "name": "Ìgbè", "orisha": "Ọya", "theme": "Wind and Change",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Divination", "Ancestral"], "offerings": ["Purple cloth", "Eggplant"]} for i in range(1, 29)]
    },
    {
        "name": "Ebi", "orisha": "Yemọja", "theme": "Motherhood and Ocean",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Healing", "Cleansing"], "offerings": ["Blue cloth", "Fish"]} for i in range(1, 29)]
    },
    {
        "name": "Òkúdu", "orisha": "Ọ̀ṣun", "theme": "Love and Rivers",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Love rituals", "Honey"], "offerings": ["Yellow cloth", "Honey"]} for i in range(1, 29)]
    },
    {
        "name": "Agẹmọ", "orisha": "Ọ̀rúnmìlà", "theme": "Wisdom and Divination",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Ifá consultation", "Study"], "offerings": ["Kola nuts", "Palm nuts"]} for i in range(1, 29)]
    },
    {
        "name": "Ògún", "orisha": "Ògún", "theme": "Technology and War",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Crafts", "Protection"], "offerings": ["Iron", "Dog"]} for i in range(1, 29)]
    },
    {
        "name": "Owèwè", "orisha": "Èṣù", "theme": "Communication and Crossroads",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Offerings", "Messages"], "offerings": ["Palm oil", "Rum"]} for i in range(1, 29)]
    },
    {
        "name": "Ọ̀wàrà", "orisha": "Ọ̀ṣọ́ọ̀sì", "theme": "Hunt and Forest",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Hunting", "Nature"], "offerings": ["Bow and arrow", "Fruits"]} for i in range(1, 29)]
    },
    {
        "name": "Bélú", "orisha": "Ọba", "theme": "Rivers and Marriage",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Marriage", "Rivers"], "offerings": ["Copper", "River water"]} for i in range(1, 29)]
    },
    {
        "name": "Ọ̀pẹ̀", "orisha": "Ọ̀sányìn", "theme": "Herbs and Medicine",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Healing", "Herbs"], "offerings": ["Medicinal herbs", "Leaves"]} for i in range(1, 29)]
    },
    {
        "name": "Ọ̀pẹ̀lú", "orisha": "Olókun", "theme": "Ocean Depths and Mysteries",
        "days": [{"yoruba_day": f"Ọjọ́ {i}", "activities": ["Deep meditation", "Ocean"], "offerings": ["Shells", "Ocean water"]} for i in range(1, 29)]
    }
]

# Important Dates
important_dates_data = [
    {"name": "Ọdún Ọbàtálá", "description": "Festival of Ọbàtálá - Celebration of purity and wisdom", "month": 1, "day": 15},
    {"name": "Ọdún Ògún", "description": "Festival of Ògún - Celebration of iron and technology", "month": 2, "day": 7},
    {"name": "Ọdún Ṣàngó", "description": "Festival of Ṣàngó - Celebration of thunder and justice", "month": 3, "day": 12},
    {"name": "Ọdún Ọya", "description": "Festival of Ọya - Celebration of wind and change", "month": 4, "day": 9},
    {"name": "Ọdún Yemọja", "description": "Festival of Yemọja - Celebration of motherhood and ocean", "month": 5, "day": 2},
    {"name": "Ọdún Ọ̀ṣun", "description": "Festival of Ọ̀ṣun - Celebration of love and rivers", "month": 6, "day": 5},
    {"name": "Ọdún Ifá", "description": "Festival of Ifá - Celebration of wisdom and divination", "month": 7, "day": 16},
    {"name": "Ọdún Èṣù", "description": "Festival of Èṣù - Celebration of communication", "month": 9, "day": 3},
    {"name": "Ọdún Ọ̀ṣọ́ọ̀sì", "description": "Festival of Ọ̀ṣọ́ọ̀sì - Celebration of hunt and forest", "month": 10, "day": 21},
    {"name": "Ọdún Ọ̀sányìn", "description": "Festival of Ọ̀sányìn - Celebration of herbs and medicine", "month": 12, "day": 14},
    {"name": "Ọdún Olókun", "description": "Festival of Olókun - Celebration of ocean depths", "month": 13, "day": 28},
    {"name": "Odún Egúngún", "description": "Ancestral Festival - Honoring the ancestors", "month": 8, "day": 20}
]

# ==================
# NOTIFICATION SYSTEM
# ==================

def send_email_notification(user, title, message):
    """Send email notification to user"""
    if not user.email or not user.email_verified:
        return False
    
    try:
        msg = Message(
            subject=title,
            recipients=[user.email],
            body=message,
            sender=app.config['MAIL_DEFAULT_SENDER']
        )
        mail.send(msg)
        return True
    except Exception as e:
        app.logger.error(f"Email sending failed: {str(e)}")
        return False

def send_push_notification(user, title, message):
    """Send push notification to user"""
    try:
        # Log the push notification
        log = PushNotificationLog(
            user_id=user.id,
            title=title,
            message=message,
            success=True
        )
        
        # Send to Pusher
        pusher_client.trigger(f'user_{user.id}', 'notification', {
            'title': title,
            'message': message,
            'timestamp': datetime.now().isoformat()
        })
        
        db.session.add(log)
        db.session.commit()
        return True
    except Exception as e:
        app.logger.error(f"Push notification failed: {str(e)}")
        log = PushNotificationLog(
            user_id=user.id,
            title=title,
            message=message,
            success=False,
            error_message=str(e)
        )
        db.session.add(log)
        db.session.commit()
        return False

# ==================
# SCHEDULED TASKS
# ==================

scheduler = BackgroundScheduler(timezone=pytz.UTC)

def check_important_dates():
    """Check and send notifications for important dates"""
    today = datetime.now()
    
    # Convert to Yoruba date
    yoruba_month = ((today.timetuple().tm_yday - 1) // 28) + 1
    yoruba_day = ((today.timetuple().tm_yday - 1) % 28) + 1
    
    # Check important dates
    important_dates = ImportantDate.query.filter(
        ImportantDate.month == yoruba_month,
        ImportantDate.day == yoruba_day
    ).all()
    
    if important_dates:
        users = User.query.filter_by(email_verified=True).all()
        for date in important_dates:
            for user in users:
                # Create in-app notification
                notification = Notification(
                    user_id=user.id,
                    title=date.name,
                    message=date.description,
                    notification_type='event'
                )
                db.session.add(notification)
                
                # Send email notification
                if user.email:
                    send_email_notification(user, date.name, date.description)
                
                # Send push notification
                send_push_notification(user, f"🗓️ {date.name}", date.description)
        
        db.session.commit()

# ==================
# AUTHENTICATION
# ==================

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            login_user(user)
            user.last_login = datetime.utcnow()
            db.session.commit()
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password', 'error')
    
    return render_template('auth/login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        if User.query.filter((User.username == username) | (User.email == email)).first():
            flash('Username or email already exists', 'error')
            return redirect(url_for('register'))
        
        user = User(username=username, email=email, email_verified=True)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        
        flash('Registration successful! You can now login.', 'success')
        return redirect(url_for('login'))
    
    return render_template('auth/register.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out', 'info')
    return redirect(url_for('login'))

# ==================
# MAIN ROUTES
# ==================

@app.route('/')
def home():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))
    return render_template('index.html')

@app.route('/dashboard')
@login_required
def dashboard():
    today = datetime.now()
    
    # Convert to Yoruba calendar format
    day_of_year = today.timetuple().tm_yday
    yoruba_month = ((day_of_year - 1) // 28) + 1
    yoruba_day = ((day_of_year - 1) % 28) + 1
    
    # Yoruba month names
    yoruba_months = ['Ṣẹ̀rẹ̀', 'Èrèlé', 'Ẹrẹ̀nà', 'Ìgbè', 'Ebi', 'Òkúdu', 
                     'Agẹmọ', 'Ògún', 'Owèwè', 'Ọ̀wàrà', 'Bélú', 'Ọ̀pẹ̀', 'Ọ̀pẹ̀lú']
    
    # Orisha cycle (4-day rotation)
    orisha_cycle = ['Ọbàtálá', 'Ògún', 'Ṣàngó', 'Ọya']
    orisha_themes = {
        'Ọbàtálá': 'Peace, wisdom, and clarity',
        'Ògún': 'Strength, technology, and progress',
        'Ṣàngó': 'Justice, fire, and transformation',
        'Ọya': 'Change, wind, and spiritual growth'
    }
    
    current_orisha = orisha_cycle[day_of_year % 4]
    
    # Moon phase calculation
    moon_phase_names = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
                       'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent']
    moon_phase_index = (day_of_year // 4) % 8
    
    yoruba_data = {
        'yoruba_month': yoruba_months[yoruba_month - 1] if yoruba_month <= 13 else 'Ọ̀pẹ̀lú',
        'yoruba_day': yoruba_day,
        'orisha': current_orisha,
        'theme': orisha_themes[current_orisha],
        'activity': f'Meditation and prayers to {current_orisha}',
        'offerings': ['Water', 'White cloth', 'Candles', 'Prayers'],
        'prayer': f'Àṣẹ {current_orisha}, guide me through this day with wisdom and strength.'
    }
    
    # Get user notifications
    notifications = []
    if hasattr(current_user, 'id'):
        notifications = Notification.query.filter_by(
            user_id=current_user.id,
            read=False
        ).order_by(Notification.created_at.desc()).limit(5).all()
    
    # Get today's rituals
    rituals = []
    if hasattr(current_user, 'id'):
        today_str = today.strftime("%Y-%m-%d")
        rituals = UserRitual.query.filter_by(
            user_id=current_user.id,
            date=today_str
        ).all()
    
    # Moon phase data
    moon_phase = {
        'name': moon_phase_names[moon_phase_index],
        'yoruba': 'Òṣupá'  # Moon in Yoruba
    }
    
    return render_template('dashboard-streamlined.html',
                         yoruba_data=yoruba_data,
                         rituals=rituals,
                         notifications=notifications,
                         moon_phase=moon_phase,
                         current_date=today,
                         user=current_user)

@app.route('/notifications')
@login_required
def notifications():
    notifications = Notification.query.filter_by(user_id=current_user.id).order_by(Notification.created_at.desc()).all()
    return render_template('notifications.html', notifications=notifications)

@app.route('/mark_notification_read/<int:notification_id>', methods=['POST'])
@login_required
def mark_notification_read(notification_id):
    notification = Notification.query.get_or_404(notification_id)
    
    if notification.user_id != current_user.id:
        flash('Access denied.', 'error')
        return redirect(url_for('notifications'))
    
    notification.read = True
    db.session.commit()
    
    return jsonify({'status': 'success'})

@app.route('/mark_all_notifications_read', methods=['POST'])
@login_required
def mark_all_notifications_read():
    notifications = Notification.query.filter_by(user_id=current_user.id, read=False).all()
    for notification in notifications:
        notification.read = True
    db.session.commit()
    flash(f'Marked {len(notifications)} notifications as read', 'success')
    return redirect(url_for('notifications'))

@app.route('/admin-dashboard')
@login_required
def admin_dashboard():
    if not current_user.is_admin:
        flash('Admin access required', 'error')
        return redirect(url_for('dashboard'))
    
    # Gather statistics
    stats = {
        'total_users': User.query.count(),
        'active_devices': Device.query.filter_by(active=True).count(),
        'important_dates': ImportantDate.query.count(),
        'total_notifications': Notification.query.count()
    }
    
    return render_template('admin_dashboard.html', stats=stats)

@app.route('/admin/notify', methods=['POST'])
@login_required
def admin_notify():
    if not current_user.is_admin:
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
            notification = Notification(
                user_id=user.id,
                title=title,
                message=message,
                notification_type='system'
            )
            db.session.add(notification)
        
        if notification_type in ['all', 'email'] and user.email:
            send_email_notification(user, title, message)
        
        if notification_type in ['all', 'push']:
            send_push_notification(user, title, message)
        
        sent_count += 1
    
    db.session.commit()
    flash(f'Notification sent to {sent_count} users via {notification_type} channel(s)', 'success')
    return redirect(url_for('admin_dashboard'))

# ==================
# API ENDPOINTS
# ==================

@app.route('/api/calendar')
def api_calendar():
    return jsonify({
        'months': [{
            'name': m['name'],
            'orisha': m['orisha'],
            'theme': m['theme']
        } for m in yoruba_months]
    })

@app.route('/api/today')
def api_today():
    today = datetime.now()
    yoruba_date = convert_to_yoruba_date(today)
    return jsonify(yoruba_date)

@app.route('/api/rituals', methods=['GET', 'POST'])
@login_required
def api_rituals():
    if request.method == 'POST':
        data = request.get_json()
        ritual = UserRitual(
            user_id=current_user.id,
            date=data.get('date'),
            notes=data.get('notes')
        )
        db.session.add(ritual)
        db.session.commit()
        return jsonify({'status': 'success', 'id': ritual.id})
    
    rituals = UserRitual.query.filter_by(user_id=current_user.id).all()
    return jsonify([{
        'id': r.id,
        'date': r.date,
        'notes': r.notes,
        'completed': r.completed
    } for r in rituals])

@app.route('/api/subscribe', methods=['POST'])
@login_required
def web_push_subscribe():
    subscription = request.json
    sub = Subscription(
        user_id=current_user.id,
        endpoint=subscription['endpoint'],
        keys=subscription['keys']
    )
    db.session.add(sub)
    db.session.commit()
    return jsonify({'success': True})

@app.route('/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'database': {
            'users': User.query.count(),
            'rituals': UserRitual.query.count(),
            'notifications': Notification.query.count()
        }
    })

# ==================
# UTILITY FUNCTIONS
# ==================

def convert_to_yoruba_date(gregorian_date):
    """Convert Gregorian date to Yoruba lunar date"""
    day_of_year = gregorian_date.timetuple().tm_yday
    yoruba_month_index = ((day_of_year - 1) // 28) % 13
    yoruba_day = ((day_of_year - 1) % 28) + 1
    
    month_data = yoruba_months[yoruba_month_index]
    
    return {
        'month': month_data['name'],
        'day': yoruba_day,
        'orisha': month_data['orisha'],
        'theme': month_data['theme'],
        'activities': month_data['days'][yoruba_day - 1]['activities'],
        'offerings': month_data['days'][yoruba_day - 1]['offerings']
    }

def get_sharing_links(text):
    """Generate social sharing links"""
    encoded_text = quote(text)
    base_url = request.url_root
    return {
        'twitter': f"https://twitter.com/intent/tweet?text={encoded_text}&url={base_url}",
        'facebook': f"https://www.facebook.com/sharer/sharer.php?u={base_url}&quote={encoded_text}",
        'whatsapp': f"https://wa.me/?text={encoded_text}%20{base_url}",
        'linkedin': f"https://www.linkedin.com/sharing/share-offsite/?url={base_url}"
    }

# ==================
# INITIALIZATION
# ==================

@app.before_request
def before_request():
    # Update user last activity
    if current_user.is_authenticated:
        current_user.last_login = datetime.utcnow()
        db.session.commit()

def initialize_app():
    """Initialize the application with default data"""
    with app.app_context():
        db.create_all()
        
        # Create admin user if none exists
        if not User.query.filter_by(is_admin=True).first():
            admin = User(
                username='admin',
                email=os.getenv('ADMIN_EMAIL', 'admin@yorubacalendar.com'),
                is_admin=True,
                email_verified=True
            )
            admin.set_password(os.getenv('ADMIN_PASSWORD', 'admin123'))
            db.session.add(admin)
            db.session.commit()
            print("✅ Admin user created")
        
        # Create demo user
        if not User.query.filter_by(username='spiritual_seeker').first():
            demo_user = User(
                username='spiritual_seeker',
                email='demo@yorubacalendar.com',
                email_verified=True
            )
            demo_user.set_password('test123')
            db.session.add(demo_user)
            db.session.commit()
            print("✅ Demo user created")
        
        # Add important dates
        if ImportantDate.query.count() == 0:
            for date_data in important_dates_data:
                important_date = ImportantDate(**date_data)
                db.session.add(important_date)
            db.session.commit()
            print("✅ Important dates added")
        
        # Start scheduler
        if not scheduler.running:
            scheduler.add_job(
                func=check_important_dates,
                trigger='cron',
                hour=8,
                minute=0,
                id='daily_check'
            )
            scheduler.start()
            print("✅ Scheduler started")

if __name__ == '__main__':
    initialize_app()
    app.run(host='0.0.0.0', port=8080, debug=True)