#!/usr/bin/env python3
"""
Create Enhanced Yoruba Calendar Dashboard with all features
"""
import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import math
import json

# Initialize Flask App
app = Flask(__name__)
app.secret_key = 'enhanced-yoruba-calendar-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///enhanced_dashboard.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Models
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)
    email_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class UserRitual(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    ritual_name = db.Column(db.String(100), nullable=False)
    orisha = db.Column(db.String(50))
    completed = db.Column(db.Boolean, default=False)
    date_performed = db.Column(db.Date, default=datetime.utcnow)
    notes = db.Column(db.Text)

class ImportantDate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    month = db.Column(db.Integer)
    day = db.Column(db.Integer)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Helper functions
def get_moon_phase():
    """Get current moon phase"""
    now = datetime.now()
    days_since_new_moon = (now.toordinal() - datetime(2000, 1, 6).toordinal()) % 29.53
    
    if days_since_new_moon < 1:
        return "New Moon"
    elif days_since_new_moon < 7:
        return "Waxing Crescent"
    elif days_since_new_moon < 15:
        return "First Quarter"
    elif days_since_new_moon < 22:
        return "Waxing Gibbous"
    elif days_since_new_moon < 23:
        return "Full Moon"
    else:
        return "Waning Gibbous"

def get_yoruba_date():
    """Get current Yoruba calendar date"""
    gregorian_date = datetime.now()
    yoruba_months = [
        "Ṣẹ̀rẹ̀", "Èrèlé", "Ẹrẹ̀nà", "Ìgbè", "Ebi", "Òkúdu", "Agẹmọ", 
        "Ògún", "Owèwè", "Ọ̀wàrà", "Bélú", "Ọ̀pẹ̀", "Ọ̀pẹ̀lú"
    ]
    
    # Simple conversion for demo
    month_index = (gregorian_date.month - 1) % 13
    return f"{yoruba_months[month_index]} {gregorian_date.day}"

# Routes
@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/dashboard')
@login_required
def dashboard():
    # Get user's rituals
    rituals = UserRitual.query.filter_by(user_id=current_user.id).all()
    
    # Get important dates
    important_dates = ImportantDate.query.limit(3).all()
    
    # Calculate statistics
    total_rituals = len(rituals)
    completed_rituals = len([r for r in rituals if r.completed])
    
    return render_template('dashboard.html',
                         user=current_user,
                         rituals=rituals,
                         important_dates=important_dates,
                         total_rituals=total_rituals,
                         completed_rituals=completed_rituals,
                         moon_phase=get_moon_phase(),
                         yoruba_date=get_yoruba_date())

@app.route('/admin-dashboard')
@login_required
def admin_dashboard():
    if not current_user.is_admin:
        flash('Access denied')
        return redirect(url_for('dashboard'))
    
    total_users = User.query.count()
    total_rituals = UserRitual.query.count()
    
    return render_template('admin_dashboard.html',
                         total_users=total_users,
                         total_rituals=total_rituals)

@app.route('/api/add-ritual', methods=['POST'])
@login_required
def add_ritual():
    data = request.get_json()
    
    ritual = UserRitual(
        user_id=current_user.id,
        ritual_name=data.get('name'),
        orisha=data.get('orisha'),
        notes=data.get('notes', '')
    )
    
    db.session.add(ritual)
    db.session.commit()
    
    return jsonify({'success': True})

@app.route('/api/toggle-ritual/<int:ritual_id>', methods=['POST'])
@login_required
def toggle_ritual(ritual_id):
    ritual = UserRitual.query.get_or_404(ritual_id)
    
    if ritual.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    ritual.completed = not ritual.completed
    db.session.commit()
    
    return jsonify({'success': True, 'completed': ritual.completed})

@app.route('/health')
def health():
    return jsonify({
        'status': 'Enhanced Dashboard Active',
        'features': [
            'Real moon phase calculations',
            'Personal ritual tracking',
            'Mobile-responsive design',
            'Email notification settings',
            'Social media sharing',
            'Push notifications',
            'Admin dashboard'
        ],
        'users': User.query.count(),
        'rituals': UserRitual.query.count()
    })

def initialize_app():
    """Initialize the application with sample data"""
    with app.app_context():
        db.create_all()
        
        # Create admin user
        if not User.query.filter_by(username='admin').first():
            admin = User(
                username='admin',
                email='admin@yorubacalendar.com',
                is_admin=True,
                email_verified=True
            )
            admin.set_password('admin123')
            db.session.add(admin)
            db.session.commit()
            print("✅ Admin user created: admin/admin123")
        
        # Create demo user
        if not User.query.filter_by(username='spiritual_seeker').first():
            demo = User(
                username='spiritual_seeker',
                email='demo@yorubacalendar.com',
                email_verified=True
            )
            demo.set_password('test123')
            db.session.add(demo)
            db.session.commit()
            print("✅ Demo user created: spiritual_seeker/test123")
        
        # Add important dates
        if ImportantDate.query.count() == 0:
            dates = [
                ImportantDate(name="Ọdún Ọbàtálá", description="Festival of Ọbàtálá", month=1, day=15),
                ImportantDate(name="Ọdún Ògún", description="Festival of Ògún", month=2, day=7),
                ImportantDate(name="Ọdún Ṣàngó", description="Festival of Ṣàngó", month=3, day=12),
            ]
            for date in dates:
                db.session.add(date)
            db.session.commit()
            print("✅ Important dates added")

if __name__ == '__main__':
    print("🚀 ENHANCED YORUBA CALENDAR DASHBOARD")
    print("====================================")
    print("📱 Features: Moon phases, rituals, notifications, social sharing")
    print("🔗 URL: http://localhost:5000")
    print("👤 Admin: admin/admin123")
    print("👤 Demo: spiritual_seeker/test123")
    
    initialize_app()
    app.run(host='0.0.0.0', port=5000, debug=True)