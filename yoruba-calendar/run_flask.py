#!/usr/bin/env python3
"""
Simple Flask launcher for Enhanced Yoruba Calendar Dashboard
All advanced features integrated and visible on dashboard
"""
import os
import sys

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from main import app, db, User, ImportantDate

def initialize_database():
    """Initialize database with demo users"""
    with app.app_context():
        try:
            # Create all database tables
            db.create_all()
            print("✅ Database tables created")
            
            # Create admin user if doesn't exist
            admin_user = User.query.filter_by(username='admin').first()
            if not admin_user:
                admin_user = User(
                    username='admin',
                    email='admin@yorubacalendar.com',
                    is_admin=True,
                    email_verified=True
                )
                admin_user.set_password('admin123')
                db.session.add(admin_user)
                db.session.commit()
                print("✅ Admin user created: admin/admin123")
            
            # Create demo user if doesn't exist
            demo_user = User.query.filter_by(username='spiritual_seeker').first()
            if not demo_user:
                demo_user = User(
                    username='spiritual_seeker',
                    email='demo@yorubacalendar.com',
                    email_verified=True
                )
                demo_user.set_password('test123')
                db.session.add(demo_user)
                db.session.commit()
                print("✅ Demo user created: spiritual_seeker/test123")
            
            # Add important dates if none exist
            if ImportantDate.query.count() == 0:
                important_dates = [
                    ImportantDate(name="Ọdún Ọbàtálá", description="Festival of Ọbàtálá - purity and wisdom", month=1, day=15),
                    ImportantDate(name="Ọdún Ògún", description="Festival of Ògún - iron and technology", month=2, day=7),
                    ImportantDate(name="Ọdún Ṣàngó", description="Festival of Ṣàngó - thunder and justice", month=3, day=12),
                ]
                for date in important_dates:
                    db.session.add(date)
                db.session.commit()
                print("✅ Important dates added")
                
        except Exception as e:
            print(f"Database setup error: {e}")
            return False
    return True

if __name__ == '__main__':
    print("🚀 ENHANCED YORUBA CALENDAR DASHBOARD")
    print("====================================")
    
    # Initialize database
    if initialize_database():
        print("\n📱 ALL ENHANCED FEATURES ACTIVE:")
        print("- Real moon phase calculations")
        print("- Personal ritual tracking")
        print("- Mobile-responsive design")
        print("- Email notification settings")
        print("- Social media sharing")
        print("- Push notifications")
        print("- Admin dashboard")
        print("\n🔗 Starting on http://localhost:5000")
        print("👤 Login: admin/admin123 or spiritual_seeker/test123")
        
        # Run Flask application
        app.run(host='0.0.0.0', port=5000, debug=True)
    else:
        print("❌ Failed to initialize database")