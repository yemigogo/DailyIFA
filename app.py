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
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS wisdom_entries (
            id INTEGER PRIMARY KEY,
            reading_id INTEGER,
            odu_id INTEGER,
            date TEXT,
            ai_insight TEXT,
            ai_insight_yoruba TEXT,
            ese_verse TEXT,
            ese_verse_yoruba TEXT,
            personal_notes TEXT,
            tags TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (reading_id) REFERENCES daily_readings (id),
            FOREIGN KEY (odu_id) REFERENCES odus (id)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS practice_reminders (
            id INTEGER PRIMARY KEY,
            user_id TEXT DEFAULT 'default',
            region TEXT,
            practice_type TEXT,
            reminder_time TEXT,
            timezone TEXT,
            frequency TEXT,
            is_enabled BOOLEAN DEFAULT 1,
            last_sent TIMESTAMP,
            custom_message TEXT,
            custom_message_yoruba TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS practice_sessions (
            id INTEGER PRIMARY KEY,
            user_id TEXT DEFAULT 'default',
            practice_type TEXT,
            session_date TEXT,
            completion_time INTEGER,
            notes TEXT,
            mood_before INTEGER,
            mood_after INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
    """Learn about Ifá page with interactive features"""
    conn = get_db_connection()
    odus = conn.execute('SELECT * FROM odus ORDER BY id').fetchall()
    conn.close()
    return render_template('learn.html', odus=odus)

@app.route('/ancestral')
def ancestral():
    """Ancestral connection pathway page"""
    return render_template('ancestral.html')

@app.route('/wisdom-archive')
def wisdom_archive():
    """Ifá wisdom archive page"""
    conn = get_db_connection()
    
    # Get all readings with Odu details, ordered by date desc
    archive_readings = conn.execute('''
        SELECT dr.*, o.name, o.name_yoruba, o.subtitle, o.subtitle_yoruba,
               o.message, o.message_yoruba, o.guidance, o.guidance_yoruba,
               o.reflection, o.reflection_yoruba, o.pronunciation, o.pattern
        FROM daily_readings dr
        JOIN odus o ON dr.odu_id = o.id
        ORDER BY dr.date DESC
        LIMIT 100
    ''').fetchall()
    
    # Get unique Odus for filtering
    unique_odus = conn.execute('''
        SELECT DISTINCT o.id, o.name, o.name_yoruba
        FROM odus o
        JOIN daily_readings dr ON o.id = dr.odu_id
        ORDER BY o.name
    ''').fetchall()
    
    conn.close()
    
    return render_template('wisdom_archive.html', 
                         archive_readings=archive_readings,
                         unique_odus=unique_odus)

@app.route('/diaspora')
def diaspora():
    """Diaspora guidance page"""
    return render_template('diaspora.html')

@app.route('/api/learn/opele-tutorial')
def api_opele_tutorial():
    """API endpoint for Opele casting tutorial data"""
    tutorial_data = {
        'basics': {
            'description': 'Opele is the traditional Ifá divination chain consisting of 8 half-seed shells',
            'descriptionYoruba': 'Opele ni ẹ̀wọ̀n àfọ̀mọ́ Ifá ìbílẹ̀ tí ó ní epo òkúta ìdajì mẹ́jọ',
            'materials': ['8 half-seed shells', 'Chain or string', 'Clean cloth', 'Blessed water'],
            'materialsYoruba': ['Epo òkúta ìdajì mẹ́jọ', 'Ẹ̀wọ̀n tàbí okùn', 'Aṣọ mímọ́', 'Omi ìbùkún']
        },
        'casting_steps': [
            {
                'step': 1,
                'action': 'Prepare sacred space',
                'actionYoruba': 'Múra ààyè mímọ́',
                'details': 'Cleanse area and lay white cloth',
                'detailsYoruba': 'Wẹ àgbègbè náà kí o sì tẹ́ aṣọ funfun'
            },
            {
                'step': 2,
                'action': 'Hold Opele correctly',
                'actionYoruba': 'Mú Opele dáadáa',
                'details': 'Grip middle of chain with dominant hand',
                'detailsYoruba': 'Di àárín ẹ̀wọ̀n mú pẹ̀lú ọwọ́ àgbára'
            },
            {
                'step': 3,
                'action': 'State your question',
                'actionYoruba': 'Sọ ìbéèrè rẹ',
                'details': 'Ask clearly and specifically',
                'detailsYoruba': 'Béèrè ní kedere àti pàtó'
            },
            {
                'step': 4,
                'action': 'Cast with intention',
                'actionYoruba': 'Sọ pẹ̀lú èrò',
                'details': 'Gentle swing allowing shells to fall naturally',
                'detailsYoruba': 'Ìṣípayà rọrọ tí ó jẹ́ kí àwọn epo ṣubú láìfọwọ́kan'
            }
        ]
    }
    return jsonify(tutorial_data)

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

@app.route('/api/orisha/today')
def api_today_orisha():
    """API endpoint for today's Orisha"""
    today = datetime.now()
    orisha = get_daily_orisha(today)
    return jsonify(orisha)

@app.route('/api/orisha/<date>')
def api_orisha_by_date(date):
    """API endpoint for Orisha by specific date"""
    try:
        target_date = datetime.strptime(date, '%Y-%m-%d')
        orisha = get_daily_orisha(target_date)
        return jsonify(orisha)
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

@app.route('/api/wisdom-archive')
def api_wisdom_archive():
    """API endpoint for wisdom archive with filtering"""
    odu_filter = request.args.get('odu')
    date_from = request.args.get('from')
    date_to = request.args.get('to')
    search_query = request.args.get('q', '').lower()
    limit = min(int(request.args.get('limit', 50)), 100)
    
    conn = get_db_connection()
    
    # Build dynamic query
    query = '''
        SELECT dr.*, o.name, o.name_yoruba, o.subtitle, o.subtitle_yoruba,
               o.message, o.message_yoruba, o.guidance, o.guidance_yoruba,
               o.reflection, o.reflection_yoruba, o.pronunciation, o.pattern,
               we.ai_insight, we.ai_insight_yoruba, we.ese_verse, we.ese_verse_yoruba,
               we.personal_notes, we.tags
        FROM daily_readings dr
        JOIN odus o ON dr.odu_id = o.id
        LEFT JOIN wisdom_entries we ON dr.id = we.reading_id
        WHERE 1=1
    '''
    params = []
    
    if odu_filter:
        query += ' AND o.id = ?'
        params.append(odu_filter)
    
    if date_from:
        query += ' AND dr.date >= ?'
        params.append(date_from)
    
    if date_to:
        query += ' AND dr.date <= ?'
        params.append(date_to)
    
    if search_query:
        query += ''' AND (LOWER(o.name) LIKE ? OR LOWER(o.message) LIKE ? 
                        OR LOWER(we.ai_insight) LIKE ? OR LOWER(we.tags) LIKE ?)'''
        search_param = f'%{search_query}%'
        params.extend([search_param, search_param, search_param, search_param])
    
    query += ' ORDER BY dr.date DESC LIMIT ?'
    params.append(limit)
    
    results = conn.execute(query, params).fetchall()
    conn.close()
    
    return jsonify([dict(row) for row in results])

@app.route('/api/wisdom-entry', methods=['POST'])
def api_create_wisdom_entry():
    """Create or update wisdom entry for a reading"""
    data = request.get_json()
    
    required_fields = ['reading_id', 'odu_id', 'date']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    conn = get_db_connection()
    
    # Check if entry already exists
    existing = conn.execute('''
        SELECT id FROM wisdom_entries WHERE reading_id = ?
    ''', (data['reading_id'],)).fetchone()
    
    if existing:
        # Update existing entry
        conn.execute('''
            UPDATE wisdom_entries 
            SET ai_insight = ?, ai_insight_yoruba = ?, ese_verse = ?, 
                ese_verse_yoruba = ?, personal_notes = ?, tags = ?
            WHERE reading_id = ?
        ''', (
            data.get('ai_insight', ''),
            data.get('ai_insight_yoruba', ''),
            data.get('ese_verse', ''),
            data.get('ese_verse_yoruba', ''),
            data.get('personal_notes', ''),
            data.get('tags', ''),
            data['reading_id']
        ))
        entry_id = existing['id']
    else:
        # Create new entry
        cursor = conn.execute('''
            INSERT INTO wisdom_entries 
            (reading_id, odu_id, date, ai_insight, ai_insight_yoruba, 
             ese_verse, ese_verse_yoruba, personal_notes, tags)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['reading_id'],
            data['odu_id'], 
            data['date'],
            data.get('ai_insight', ''),
            data.get('ai_insight_yoruba', ''),
            data.get('ese_verse', ''),
            data.get('ese_verse_yoruba', ''),
            data.get('personal_notes', ''),
            data.get('tags', '')
        ))
        entry_id = cursor.lastrowid
    
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'entry_id': entry_id})

@app.route('/api/practice-reminders', methods=['GET'])
def api_get_practice_reminders():
    """Get all practice reminders for user"""
    user_id = request.args.get('user_id', 'default')
    
    conn = get_db_connection()
    reminders = conn.execute('''
        SELECT * FROM practice_reminders 
        WHERE user_id = ? 
        ORDER BY reminder_time
    ''', (user_id,)).fetchall()
    conn.close()
    
    return jsonify([dict(reminder) for reminder in reminders])

@app.route('/api/practice-reminders', methods=['POST'])
def api_create_practice_reminder():
    """Create or update practice reminder"""
    data = request.get_json()
    
    required_fields = ['practice_type', 'reminder_time', 'frequency']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    conn = get_db_connection()
    
    # Check if reminder already exists for this practice type
    existing = conn.execute('''
        SELECT id FROM practice_reminders 
        WHERE user_id = ? AND practice_type = ?
    ''', (data.get('user_id', 'default'), data['practice_type'])).fetchone()
    
    if existing:
        # Update existing reminder
        conn.execute('''
            UPDATE practice_reminders 
            SET region = ?, reminder_time = ?, timezone = ?, frequency = ?, 
                is_enabled = ?, custom_message = ?, custom_message_yoruba = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (
            data.get('region', ''),
            data['reminder_time'],
            data.get('timezone', 'UTC'),
            data['frequency'],
            data.get('is_enabled', True),
            data.get('custom_message', ''),
            data.get('custom_message_yoruba', ''),
            existing['id']
        ))
        reminder_id = existing['id']
    else:
        # Create new reminder
        cursor = conn.execute('''
            INSERT INTO practice_reminders 
            (user_id, region, practice_type, reminder_time, timezone, frequency, 
             is_enabled, custom_message, custom_message_yoruba)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get('user_id', 'default'),
            data.get('region', ''),
            data['practice_type'],
            data['reminder_time'],
            data.get('timezone', 'UTC'),
            data['frequency'],
            data.get('is_enabled', True),
            data.get('custom_message', ''),
            data.get('custom_message_yoruba', '')
        ))
        reminder_id = cursor.lastrowid
    
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'reminder_id': reminder_id})

@app.route('/api/practice-sessions', methods=['POST'])
def api_log_practice_session():
    """Log a completed practice session"""
    data = request.get_json()
    
    required_fields = ['practice_type', 'session_date']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    conn = get_db_connection()
    
    cursor = conn.execute('''
        INSERT INTO practice_sessions 
        (user_id, practice_type, session_date, completion_time, notes, mood_before, mood_after)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        data.get('user_id', 'default'),
        data['practice_type'],
        data['session_date'],
        data.get('completion_time', 0),
        data.get('notes', ''),
        data.get('mood_before', 0),
        data.get('mood_after', 0)
    ))
    
    session_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'session_id': session_id})

@app.route('/api/practice-stats')
def api_practice_stats():
    """Get practice statistics and streaks"""
    user_id = request.args.get('user_id', 'default')
    days = int(request.args.get('days', 30))
    
    conn = get_db_connection()
    
    # Get recent sessions
    sessions = conn.execute('''
        SELECT practice_type, session_date, completion_time, mood_before, mood_after
        FROM practice_sessions 
        WHERE user_id = ? AND session_date >= date('now', '-{} days')
        ORDER BY session_date DESC
    '''.format(days), (user_id,)).fetchall()
    
    # Calculate statistics
    stats = {
        'total_sessions': len(sessions),
        'total_minutes': sum(s['completion_time'] for s in sessions),
        'current_streak': 0,
        'longest_streak': 0,
        'practice_frequency': {},
        'mood_improvement': 0,
        'recent_sessions': [dict(s) for s in sessions[:10]]
    }
    
    # Calculate streaks and frequency
    if sessions:
        practice_dates = set(s['session_date'] for s in sessions)
        current_date = datetime.now().date()
        current_streak = 0
        
        # Check current streak
        check_date = current_date
        while check_date.isoformat() in practice_dates:
            current_streak += 1
            check_date -= timedelta(days=1)
        
        stats['current_streak'] = current_streak
        
        # Practice frequency by type
        for session in sessions:
            practice_type = session['practice_type']
            stats['practice_frequency'][practice_type] = stats['practice_frequency'].get(practice_type, 0) + 1
        
        # Mood improvement
        mood_sessions = [s for s in sessions if s['mood_before'] and s['mood_after']]
        if mood_sessions:
            avg_improvement = sum(s['mood_after'] - s['mood_before'] for s in mood_sessions) / len(mood_sessions)
            stats['mood_improvement'] = round(avg_improvement, 1)
    
    conn.close()
    return jsonify(stats)

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

def get_daily_orisha(date):
    """Get the Orisha for a specific date based on traditional 4-day cycle"""
    # Traditional Yoruba 4-day cycle starting from a reference date
    # Day 1: Ọbàtálá (Sunday equivalent), Day 2: Ògún (Monday), Day 3: Ṣàngó (Tuesday), Day 4: Ọ̀ṣun (Wednesday)
    reference_date = datetime(2025, 1, 1)  # Starting point
    days_since_reference = (date - reference_date).days
    cycle_day = days_since_reference % 4
    
    orisha_data = {
        0: {  # Ọbàtálá Day
            'name': 'Ọbàtálá',
            'nameEnglish': 'Obatala',
            'dayName': 'Ọjọ́ Ọbàtálá',
            'dayNameEnglish': 'Day of Obatala',
            'oriki': [
                'Ọbàtálá òrìṣà ọba',
                'Bàbá àgbébó inú àkùn',
                'Òrìṣàńlá ọṣẹrẹ mọgbọ́ njẹ́',
                'Àlàbálàṣẹ ọba àtéwọ̀'
            ],
            'orikiEnglish': [
                'Obatala, divine king of the Orisha',
                'Father who carries wisdom in silence',
                'Great Orisha who knows all secrets',
                'King who creates with his hands'
            ],
            'colors': ['White', 'Silver', 'Pearl'],
            'colorsYoruba': ['Funfun', 'Fàdákà', 'Iyùn òkun'],
            'taboos': [
                'No palm wine or alcohol',
                'Avoid red palm oil',
                'No red clothing',
                'No violent actions or words'
            ],
            'taboosYoruba': [
                'Má mu emu tàbí ọtí líle',
                'Má lo epo pupa',
                'Má wọ aṣọ pupa', 
                'Má ṣe ohun ìwà-ọ̀tẹ̀ tàbí sọ̀rọ̀ ìwà-ọ̀tẹ̀'
            ],
            'blessings': [
                'Peace and clarity of mind',
                'Wisdom in all decisions',
                'Spiritual purity and protection',
                'Leadership and authority'
            ],
            'blessingsYoruba': [
                'Àlàáfíà àti àṣírí ọkàn',
                'Ọgbọ́n nínú gbogbo ìpinnu',
                'Mímọ́ ẹ̀mí àti ààbò',
                'Aṣáájú àti àṣẹ'
            ],
            'offerings': ['White kola nut', 'White flowers', 'Coconut water', 'White cloth'],
            'offeringsYoruba': ['Obì funfun', 'Òdòdó funfun', 'Omi agbọn', 'Aṣọ funfun'],
            'element': 'Air/Sky',
            'elementYoruba': 'Afẹ́fẹ́/Ọ̀run',
            'symbol': '☁️'
        },
        1: {  # Ògún Day
            'name': 'Ògún',
            'nameEnglish': 'Ogun',
            'dayName': 'Ọjọ́ Ògún',
            'dayNameEnglish': 'Day of Ogun',
            'oriki': [
                'Ògún ọ̀nílé oko',
                'Ológun ológun, elérí ìjà',
                'Ọba aládé irin',
                'Oṣínimálẹ̀ òkè òrì'
            ],
            'orikiEnglish': [
                'Ogun, master of the farm and forge',
                'Warrior of warriors, witness of battle',
                'King crowned with iron',
                'Mountain climber who never tires'
            ],
            'colors': ['Green', 'Black', 'Red'],
            'colorsYoruba': ['Ewé', 'Dúdú', 'Pupa'],
            'taboos': [
                'No lies or dishonesty',
                'Avoid laziness',
                'No breaking of oaths',
                'Respect all iron tools'
            ],
            'taboosYoruba': [
                'Má purọ́ tàbí jẹ́ aláìlótítọ́',
                'Má jẹ́ ọ̀lẹ',
                'Má ru ìbúra',
                'Bọ̀wọ̀ fún gbogbo ohun èlò irin'
            ],
            'blessings': [
                'Success in work and technology',
                'Protection during travel',
                'Strength and perseverance',
                'Victory over obstacles'
            ],
            'blessingsYoruba': [
                'Àṣeyọrí nínú iṣẹ́ àti ìmọ̀-ẹ̀rọ',
                'Ààbò nígbà ìrìnàjò',
                'Agbára àti ìfaradà',
                'Ìṣẹ́gun lórí àwọn ìdènà'
            ],
            'offerings': ['Palm wine', 'Kola nut', 'Iron objects', 'Dog meat (traditional)'],
            'offeringsYoruba': ['Emu', 'Obì', 'Àwọn ohun irin', 'Ẹran ajá (ìbílẹ̀)'],
            'element': 'Iron/Metal',
            'elementYoruba': 'Irin/Irin',
            'symbol': '⚔️'
        },
        2: {  # Ṣàngó Day
            'name': 'Ṣàngó',
            'nameEnglish': 'Shango',
            'dayName': 'Ọjọ́ Ṣàngó',
            'dayNameEnglish': 'Day of Shango',
            'oriki': [
                'Ṣàngó ọba kòso',
                'Aláàfin òyó ọba ìjà',
                'Ọba tí ó ya iná láti ẹnu',
                'Jákúta tí ó pa òkúta'
            ],
            'orikiEnglish': [
                'Shango, the king who did not hang',
                'King of Oyo, lord of battle',
                'King who spits fire from his mouth',
                'Stone thrower who splits rocks'
            ],
            'colors': ['Red', 'White', 'Brown'],
            'colorsYoruba': ['Pupa', 'Funfun', 'Ìtakùn'],
            'taboos': [
                'No bitter kola on his day',
                'Avoid sheep meat',
                'No lies or injustice',
                'Respect elders and authority'
            ],
            'taboosYoruba': [
                'Má jẹ orógbó lọ́jọ́ rẹ̀',
                'Má jẹ ẹran àgùntàn',
                'Má purọ́ tàbí ṣe àìtọ́',
                'Bọ̀wọ̀ fún àwọn àgbà àti àṣẹ'
            ],
            'blessings': [
                'Leadership and charisma',
                'Justice and fairness',
                'Protection from enemies',
                'Power and authority'
            ],
            'blessingsYoruba': [
                'Aṣáájú àti ẹni ìfẹ́',
                'Òdodo àti àìṣègbé',
                'Ààbò lọ́wọ́ àwọn ọ̀tá',
                'Agbára àti àṣẹ'
            ],
            'offerings': ['Red palm oil', 'Bitter kola', 'Ram meat', 'Red wine'],
            'offeringsYoruba': ['Epo pupa', 'Orógbó', 'Ẹran àgbò', 'Ọtí pupa'],
            'element': 'Fire/Thunder',
            'elementYoruba': 'Iná/Àrá',
            'symbol': '⚡'
        },
        3: {  # Ọ̀ṣun Day
            'name': 'Ọ̀ṣun',
            'nameEnglish': 'Oshun',
            'dayName': 'Ọjọ́ Ọ̀ṣun',
            'dayNameEnglish': 'Day of Oshun',
            'oriki': [
                'Ọ̀ṣun Ṣẹ̀ẹ́gbẹ̀rì olómi wèrẹ wèrẹ',
                'Ìyálọ́ja àyàbá',
                'Olódò òrìṣà omi',
                'Yèyé kárí ọmọ bí bí'
            ],
            'orikiEnglish': [
                'Oshun of the brass, owner of fresh flowing waters',
                'Mother of the market, queen mother',
                'River goddess, deity of waters',
                'Mother who carries and protects children'
            ],
            'colors': ['Yellow', 'Gold', 'Orange', 'Green'],
            'colorsYoruba': ['Ọ̀fẹ̀', 'Wúrà', 'Ọsàn', 'Ewé'],
            'taboos': [
                'No disrespect to pregnant women',
                'Avoid pollution of water sources',
                'No neglect of personal hygiene',
                'Respect all mothers and children'
            ],
            'taboosYoruba': [
                'Má gàn obìnrin oyún',
                'Má sọ odò àti omi di àìmọ́',
                'Má gbàgbé ìmọ́tótó ara',
                'Bọ̀wọ̀ fún gbogbo ìyá àti ọmọ'
            ],
            'blessings': [
                'Fertility and childbearing',
                'Love and relationships',
                'Prosperity and abundance',
                'Healing and sweetness in life'
            ],
            'blessingsYoruba': [
                'Ìbímọ àti ọmọ bíbí',
                'Ìfẹ́ àti ìbáṣepọ̀',
                'Ọrọ̀ àti ọ̀pọ̀lọpọ̀',
                'Ìwòsàn àti adùn ayé'
            ],
            'offerings': ['Honey', 'Yellow flowers', 'Gold jewelry', 'River water'],
            'offeringsYoruba': ['Oyin', 'Òdòdó ọ̀fẹ̀', 'Ohun ọ̀ṣọ́ wúrà', 'Omi odò'],
            'element': 'Fresh Water',
            'elementYoruba': 'Omi Òkun',
            'symbol': '💧'
        }
    }
    
    return orisha_data.get(cycle_day, orisha_data[0])

@app.route('/odu')
def odu_cards():
    """Display Odu cards from static folder"""
    card_folder = os.path.join(app.static_folder, 'odu_cards')
    if not os.path.exists(card_folder):
        os.makedirs(card_folder, exist_ok=True)
    
    # Get all PNG files in the odu_cards folder
    cards = []
    if os.path.exists(card_folder):
        cards = sorted([f for f in os.listdir(card_folder) if f.endswith('.png')])
    
    return render_template('odu_cards.html', cards=cards)

@app.route('/api/odu-cards')
def api_odu_cards():
    """API endpoint for React frontend to get Odu card data"""
    card_folder = os.path.join(app.static_folder, 'odu_cards')
    if not os.path.exists(card_folder):
        os.makedirs(card_folder, exist_ok=True)
    
    # Get all PNG files in the odu_cards folder
    cards = []
    if os.path.exists(card_folder):
        for filename in sorted(os.listdir(card_folder)):
            if filename.endswith('.png'):
                card_name = filename.replace('.png', '').replace('-', ' ').title()
                cards.append({
                    'filename': filename,
                    'name': card_name,
                    'url': f'/static/odu_cards/{filename}',
                    'type': 'traditional'
                })
    
    return jsonify({
        'cards': cards,
        'total': len(cards),
        'message': 'Odu cards loaded successfully' if cards else 'No Odu cards found'
    })

# Complete 256 Odu System Routes

@app.route('/api/odu-256/complete')
def api_get_complete_256_odu():
    """Get complete 256 Odu system with advanced filtering"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    category = request.args.get('category', 'all')
    search = request.args.get('search', '')
    primary_odu = request.args.get('primary_odu', '')
    
    conn = get_db_connection()
    
    # Build query with filters
    query = "SELECT * FROM odu_256_complete WHERE 1=1"
    params = []
    
    if category != 'all':
        query += " AND category = ?"
        params.append(category)
    
    if search:
        query += " AND (name LIKE ? OR meaning LIKE ? OR guidance LIKE ?)"
        params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
    
    if primary_odu:
        query += " AND primary_odu LIKE ?"
        params.append(f'%{primary_odu}%')
    
    query += " ORDER BY id LIMIT ? OFFSET ?"
    params.extend([per_page, (page - 1) * per_page])
    
    try:
        odu_list = conn.execute(query, params).fetchall()
        
        # Get total count
        count_query = "SELECT COUNT(*) as total FROM odu_256_complete WHERE 1=1"
        count_params = []
        
        if category != 'all':
            count_query += " AND category = ?"
            count_params.append(category)
        
        if search:
            count_query += " AND (name LIKE ? OR meaning LIKE ? OR guidance LIKE ?)"
            count_params.extend([f'%{search}%', f'%{search}%', f'%{search}%'])
        
        if primary_odu:
            count_query += " AND primary_odu LIKE ?"
            count_params.append(f'%{primary_odu}%')
        
        total = conn.execute(count_query, count_params).fetchone()['total']
        conn.close()
        
        return jsonify({
            "odu_list": [dict(odu) for odu in odu_list],
            "pagination": {
                "page": page,
                "per_page": per_page,
                "total": total,
                "pages": (total + per_page - 1) // per_page
            },
            "filters": {
                "category": category,
                "search": search,
                "primary_odu": primary_odu
            },
            "statistics": {
                "total_odu": total,
                "major_odu": 16,
                "minor_odu": 240
            }
        })
    except Exception as e:
        conn.close()
        return jsonify({"error": f"Database error: {str(e)}"}), 500

@app.route('/api/odu-256/search')
def api_search_complete_odu():
    """Search complete Odu system"""
    query = request.args.get('q', '')
    category = request.args.get('category', 'all')
    limit = request.args.get('limit', 10, type=int)
    
    if not query:
        return jsonify({"error": "Search query required"}), 400
    
    conn = get_db_connection()
    
    search_query = """
        SELECT * FROM odu_256_complete 
        WHERE (name LIKE ? OR meaning LIKE ? OR guidance LIKE ? 
               OR spiritual_significance LIKE ? OR traditional_story LIKE ?)
    """
    params = [f'%{query}%'] * 5
    
    if category != 'all':
        search_query += " AND category = ?"
        params.append(category)
    
    search_query += " ORDER BY id LIMIT ?"
    params.append(limit)
    
    try:
        results = conn.execute(search_query, params).fetchall()
        conn.close()
        
        return jsonify({
            "results": [dict(odu) for odu in results],
            "query": query,
            "category": category,
            "total_found": len(results)
        })
    except Exception as e:
        conn.close()
        return jsonify({"error": f"Search error: {str(e)}"}), 500

@app.route('/api/odu-256/categories')
def api_get_odu_categories():
    """Get Odu categories and statistics"""
    conn = get_db_connection()
    
    try:
        categories = conn.execute("""
            SELECT category, COUNT(*) as count 
            FROM odu_256_complete 
            GROUP BY category
        """).fetchall()
        
        primary_odu_stats = conn.execute("""
            SELECT primary_odu, COUNT(*) as count 
            FROM odu_256_complete 
            GROUP BY primary_odu
        """).fetchall()
        
        conn.close()
        
        return jsonify({
            "categories": [dict(cat) for cat in categories],
            "primary_odu_distribution": [dict(stat) for stat in primary_odu_stats],
            "total_combinations": 256
        })
    except Exception as e:
        conn.close()
        return jsonify({"error": f"Categories error: {str(e)}"}), 500

@app.route('/odu-256-complete')
def complete_256_odu_page():
    """Complete 256 Odu system page"""
    return render_template('odu_256_complete.html')

if __name__ == '__main__':
    # Create directories
    os.makedirs('static/audio/ambient', exist_ok=True)
    os.makedirs('static/audio/odu', exist_ok=True)
    os.makedirs('static/images', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    # Copy audio files from client if they exist
    import shutil
    if os.path.exists('client/public/audio'):
        try:
            shutil.copytree('client/public/audio', 'static/audio', dirs_exist_ok=True)
            print("Audio files copied successfully")
        except Exception as e:
            print(f"Could not copy audio files: {e}")
    
    # Initialize database
    init_db()
    
    print("🎵 Ifá Daily Reading App - Python Flask Version")
    print("✨ Starting server with ambient Yoruba soundscapes...")
    print("🌟 Bilingual spiritual guidance ready!")
    
    # Run development server
    app.run(host='0.0.0.0', port=5001, debug=True)