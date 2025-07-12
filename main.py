#!/usr/bin/env python3
"""
Ifá Daily Reading App - Main Entry Point
Comprehensive bilingual Yoruba spiritual guidance application
"""

import os
import sys
from flask import Flask, render_template, jsonify, request, send_from_directory
import sqlite3
import json
from datetime import datetime, date, timedelta
import hashlib
import math

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'ifa-daily-yoruba-wisdom-2025')

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
    return jsonify({
        'status': 'healthy',
        'app': 'Ifá Daily - Enhanced Yoruba Calendar',
        'features': [
            'Intelligent prayer generation',
            'Astronomical moon phase calculation',
            'Enhanced Yoruba day naming',
            'Spiritual pattern analysis',
            'Complete calendar system'
        ],
        'audio_status': 'disabled_pending_authentic_recordings',
        'database': 'connected',
        'calendar_loaded': len(yoruba_calendar.get("months", [])) > 0,
        'total_calendar_days': sum(len(month.get("days", [])) for month in yoruba_calendar.get("months", []))
    })

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
    📊 Database: SQLite initialized
    """)
    
    # Run the app
    app.run(
        host='0.0.0.0',
        port=port,
        debug=True
    )