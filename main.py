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
from datetime import datetime, date
import hashlib

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

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'app': 'Ifá Daily - Yoruba Sound & Wisdom',
        'audio_status': 'disabled_pending_authentic_recordings',
        'database': 'connected'
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