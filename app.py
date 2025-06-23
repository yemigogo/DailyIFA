#!/usr/bin/env python3
"""
Ifá Daily Reading App - Python Flask Version
Comprehensive bilingual Yoruba spiritual guidance application
"""

from flask import Flask, render_template, jsonify, request, send_from_directory
import sqlite3
import json
import os
from datetime import datetime, timedelta
import random

app = Flask(__name__)
app.secret_key = 'ifa-spiritual-guidance-2025'

# Database initialization
def init_db():
    """Initialize SQLite database with Odu and readings data"""
    conn = sqlite3.connect('ifa_app.db')
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS odus (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            name_yoruba TEXT NOT NULL,
            subtitle TEXT,
            subtitle_yoruba TEXT,
            element TEXT,
            element_yoruba TEXT,
            energy TEXT,
            energy_yoruba TEXT,
            message TEXT,
            message_yoruba TEXT,
            guidance TEXT,
            guidance_yoruba TEXT,
            reflection TEXT,
            reflection_yoruba TEXT,
            pronunciation TEXT,
            pattern TEXT
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS daily_readings (
            id INTEGER PRIMARY KEY,
            date TEXT UNIQUE NOT NULL,
            odu_id INTEGER,
            FOREIGN KEY (odu_id) REFERENCES odus (id)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ebo_recommendations (
            id INTEGER PRIMARY KEY,
            odu_id INTEGER,
            title TEXT,
            title_yoruba TEXT,
            description TEXT,
            description_yoruba TEXT,
            materials TEXT,
            materials_yoruba TEXT,
            FOREIGN KEY (odu_id) REFERENCES odus (id)
        )
    ''')
    
    # Insert sample Odu data if table is empty
    cursor.execute('SELECT COUNT(*) FROM odus')
    if cursor.fetchone()[0] == 0:
        sample_odus = [
            (1, 'Eji Ogbe', 'Ejì Ògbè', 'The Odu of Light and Clarity', 'Odu ti Imole ati Aseyori',
             'Light', 'Imole', 'Illumination', 'Ìtanná',
             'Light pierces through darkness, revealing the path forward. Today brings clarity to situations that have been clouded.',
             'Imole gbona nipasẹ okunkun, o si ṣafihan ọna iwaju. Oni mu aseyori wa si awọn ipo ti o ti wa ni awọsanma.',
             'Seek clarity in communication with others|Trust your intuition in important decisions|Share your knowledge generously',
             'Wa aseyori ninu ibaraẹnisọrọ pẹlu awọn ẹlomiran|Gbẹkẹle oye inu rẹ ninu awọn ipinnu pataki|Pin imọ rẹ ni ọpọlọpọ',
             'How can I bring more light and understanding to my current situation?',
             'Bawo ni mo ṣe le mu imole ati oye diẹ sii wa si ipo mi lọwọlọwọ?',
             'EH-jee OH-gbeh', '[[true,true],[true,true]]'),
            
            (2, 'Oyeku Meji', 'Òyẹ́kú Méjì', 'The Odu of Mystery and Depth', 'Odu ti Asiri ati Ijinle',
             'Darkness', 'Okunkun', 'Introspection', 'Iwadi-inu',
             'Deep wisdom comes from within. Look beneath the surface to find the truth you seek.',
             'Ọgbọn jinlẹ n wa lati inu. Wo nisalẹ oju lati wa otitọ ti o n wa.',
             'Meditate on hidden meanings|Trust the wisdom of your ancestors|Embrace the unknown with courage',
             'Ṣe aṣaro lori awọn itumọ to farapamọ|Gbẹkẹle ọgbọn awọn baba rẹ|Gbamo aimọ pẹlu igboya',
             'What hidden wisdom am I ready to discover within myself?',
             'Ọgbọn wo ti o farapamọ ni mo ti ṣetan lati ṣawari ninu ara mi?',
             'OH-yeh-koo meh-JEE', '[[false,false],[false,false]]')
        ]
        
        cursor.executemany('''
            INSERT INTO odus (id, name, name_yoruba, subtitle, subtitle_yoruba, 
                             element, element_yoruba, energy, energy_yoruba,
                             message, message_yoruba, guidance, guidance_yoruba,
                             reflection, reflection_yoruba, pronunciation, pattern)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', sample_odus)
    
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
    
    # Check if reading exists
    reading = conn.execute('''
        SELECT dr.*, o.* FROM daily_readings dr
        JOIN odus o ON dr.odu_id = o.id
        WHERE dr.date = ?
    ''', (date_str,)).fetchone()
    
    if not reading:
        # Generate new reading
        odus = conn.execute('SELECT id FROM odus').fetchall()
        if odus:
            odu_id = random.choice(odus)['id']
            conn.execute('INSERT INTO daily_readings (date, odu_id) VALUES (?, ?)', 
                        (date_str, odu_id))
            conn.commit()
            
            # Get the newly created reading
            reading = conn.execute('''
                SELECT dr.*, o.* FROM daily_readings dr
                JOIN odus o ON dr.odu_id = o.id
                WHERE dr.date = ?
            ''', (date_str,)).fetchone()
    
    conn.close()
    return reading

# Routes
@app.route('/')
def home():
    """Home page with today's reading"""
    today = datetime.now().strftime('%Y-%m-%d')
    reading = get_daily_reading(today)
    return render_template('home.html', reading=reading, today=today)

@app.route('/daily-prayers')
def daily_prayers():
    """Daily prayers page"""
    return render_template('daily_prayers.html')

@app.route('/learn')
def learn():
    """Learn about Ifá page"""
    conn = get_db_connection()
    odus = conn.execute('SELECT * FROM odus ORDER BY id').fetchall()
    conn.close()
    return render_template('learn.html', odus=odus)

@app.route('/problem-search')
def problem_search():
    """Problem search page"""
    conn = get_db_connection()
    odus = conn.execute('SELECT * FROM odus').fetchall()
    conn.close()
    return render_template('problem_search.html', odus=odus)

@app.route('/profile')
def profile():
    """User profile page"""
    return render_template('profile.html')

@app.route('/history')
def history():
    """Reading history page"""
    conn = get_db_connection()
    readings = conn.execute('''
        SELECT dr.*, o.name, o.name_yoruba, o.subtitle, o.subtitle_yoruba
        FROM daily_readings dr
        JOIN odus o ON dr.odu_id = o.id
        ORDER BY dr.date DESC
        LIMIT 30
    ''').fetchall()
    conn.close()
    return render_template('history.html', readings=readings)

# API Routes
@app.route('/api/readings/<date>')
def api_get_reading(date):
    """API endpoint for daily reading"""
    reading = get_daily_reading(date)
    if reading:
        return jsonify(dict(reading))
    return jsonify({'error': 'Reading not found'}), 404

@app.route('/api/odus')
def api_get_odus():
    """API endpoint for all Odus"""
    conn = get_db_connection()
    odus = conn.execute('SELECT * FROM odus ORDER BY id').fetchall()
    conn.close()
    return jsonify([dict(odu) for odu in odus])

@app.route('/api/odus/<int:odu_id>')
def api_get_odu(odu_id):
    """API endpoint for specific Odu"""
    conn = get_db_connection()
    odu = conn.execute('SELECT * FROM odus WHERE id = ?', (odu_id,)).fetchone()
    conn.close()
    if odu:
        return jsonify(dict(odu))
    return jsonify({'error': 'Odu not found'}), 404

@app.route('/api/search')
def api_search():
    """API endpoint for problem search"""
    query = request.args.get('q', '').lower()
    conn = get_db_connection()
    
    # Search in messages and guidance
    odus = conn.execute('''
        SELECT * FROM odus 
        WHERE LOWER(message) LIKE ? OR LOWER(guidance) LIKE ?
        OR LOWER(message_yoruba) LIKE ? OR LOWER(guidance_yoruba) LIKE ?
    ''', (f'%{query}%', f'%{query}%', f'%{query}%', f'%{query}%')).fetchall()
    
    conn.close()
    return jsonify([dict(odu) for odu in odus])

# Static file serving
@app.route('/audio/<path:filename>')
def serve_audio(filename):
    """Serve audio files"""
    return send_from_directory('static/audio', filename)

@app.route('/images/<path:filename>')
def serve_images(filename):
    """Serve image files"""
    return send_from_directory('static/images', filename)

# Template filters
@app.template_filter('split_guidance')
def split_guidance(guidance_text):
    """Split guidance text by pipe separator"""
    return guidance_text.split('|') if guidance_text else []

@app.template_filter('parse_pattern')
def parse_pattern(pattern_text):
    """Parse Odu pattern from JSON string"""
    try:
        return json.loads(pattern_text) if pattern_text else [[True, True], [True, True]]
    except:
        return [[True, True], [True, True]]

if __name__ == '__main__':
    # Create directories
    os.makedirs('static/audio/ambient', exist_ok=True)
    os.makedirs('static/audio/odu', exist_ok=True)
    os.makedirs('static/images', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    # Initialize database
    init_db()
    
    # Run development server
    app.run(host='0.0.0.0', port=5000, debug=True)