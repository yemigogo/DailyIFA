#!/usr/bin/env python3
"""
Yoruba Lunar Calendar Flask Application
Based on traditional 13-month calendar system with authentic spiritual practices
"""

from flask import Flask, jsonify, render_template_string
from datetime import datetime
import json

app = Flask(__name__)

# Load Complete Yoruba Lunar Calendar Data from generated JSON
import json
import os

# Load complete calendar data
try:
    with open('complete_yoruba_calendar_2025.json', 'r', encoding='utf-8') as f:
        yoruba_calendar = json.load(f)
        print(f"✅ Loaded complete calendar with {len(yoruba_calendar['months'])} months and {sum(len(month['days']) for month in yoruba_calendar['months'])} total days")
except FileNotFoundError:
    print("⚠️ Complete calendar file not found, using fallback data")
    # Fallback to basic calendar data if file not found
    yoruba_calendar = {
        "year": 2025,
        "months": [
            {
                "name": "Ṣẹ̀rẹ̀",
                "orisha": "Ọbàtálá",
                "theme": "Purity, New Beginnings",
                "color": "white",
                "taboos": ["salt", "alcohol", "palm oil"],
                "days": [
                    {
                        "day": 1, "yoruba_day": "Ọjọ́-Àìkú",
                        "activity": "New Moon - White cloth offerings",
                        "moon_phase": "New Moon",
                        "offerings": ["white cloth", "coconut", "water"],
                        "prayer": "Ọbàtálá, cleanse my path as I begin this cycle"
                    }
                ]
            }
        ]
    }

# Lunar Phase Calculator (Enhanced)
def get_moon_phase(day):
    """Calculate moon phase based on day in 28-day lunar cycle"""
    if day == 1:
        return "New Moon"
    elif day == 15:
        return "Full Moon" 
    elif day == 28:
        return "Dark Moon"
    elif 2 <= day <= 7:
        return "Waxing Crescent"
    elif 8 <= day <= 14:
        return "Waxing Gibbous"
    elif day == 7 or day == 21:
        return "First Quarter"
    elif day == 14 or day == 22:
        return "Last Quarter"
    elif 16 <= day <= 21:
        return "Waning Gibbous"
    elif 22 <= day <= 27:
        return "Waning Crescent"
    else:
        return "Waning Moon"

# Current Yoruba Date Calculator (Enhanced)
def get_yoruba_date():
    """Get current Yoruba date based on traditional lunar calendar"""
    import datetime
    current_date = datetime.datetime.now()
    
    # Enhanced mapping using day of year for accurate cycle representation
    start_of_year = datetime.datetime(current_date.year, 1, 1)
    day_of_year = (current_date - start_of_year).days + 1
    
    # Calculate which 28-day cycle we're in (13 months of 28 days = 364 days)
    cycle_length = 28
    total_cycles = 13
    adjusted_day = ((day_of_year - 1) % (cycle_length * total_cycles)) + 1
    
    month_index = ((adjusted_day - 1) // cycle_length) % total_cycles
    day_in_month = ((adjusted_day - 1) % cycle_length) + 1
    
    # Ensure month_index is within valid range
    if month_index >= len(yoruba_calendar["months"]):
        month_index = 0
    
    current_month = yoruba_calendar["months"][month_index]
    
    # Ensure day_in_month is within valid range for the current month
    if day_in_month > len(current_month["days"]):
        day_in_month = len(current_month["days"])
    
    current_day = current_month["days"][day_in_month - 1]
    
    return {
        "month": current_month["name"],
        "day": day_in_month,
        "yoruba_day": current_day["yoruba_day"],
        "orisha": current_month["orisha"],
        "activity": current_day["activity"],
        "offerings": current_day.get("offerings", []),
        "prayer": current_day.get("prayer"),
        "moon_phase": get_moon_phase(day_in_month),
        "theme": current_month["theme"],
        "color": current_month["color"],
        "taboos": current_month.get("taboos", [])
    }

# Flask Routes
@app.route('/')
def home():
    """Home page displaying current Yoruba date"""
    today = get_yoruba_date()
    
    template = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Yoruba Lunar Calendar - Today</title>
        <style>
            body {
                font-family: 'Georgia', serif;
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                color: white;
                margin: 0;
                padding: 20px;
                min-height: 100vh;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 30px;
                background: rgba(244, 208, 63, 0.1);
                border-radius: 15px;
                border: 2px solid #f4d03f;
            }
            h1 { color: #f4d03f; text-align: center; margin-bottom: 30px; }
            .today-info {
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                padding: 25px;
                border-radius: 12px;
                margin-bottom: 20px;
            }
            .offerings {
                background: linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%);
                padding: 20px;
                border-radius: 12px;
                margin-top: 20px;
            }
            .offering-badge {
                background: rgba(255, 255, 255, 0.2);
                padding: 5px 10px;
                border-radius: 15px;
                margin: 5px;
                display: inline-block;
                font-size: 0.9rem;
            }
            .api-links {
                margin-top: 30px;
                text-align: center;
            }
            .api-links a {
                color: #3498db;
                text-decoration: none;
                margin: 0 15px;
                padding: 10px 20px;
                background: rgba(52, 152, 219, 0.2);
                border-radius: 5px;
                border: 1px solid #3498db;
                display: inline-block;
                margin-bottom: 10px;
            }
            .api-links a:hover {
                background: rgba(52, 152, 219, 0.4);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🌙 Today is Day {{ day }} of {{ month }} 🌙</h1>
            <h2 style="text-align: center; color: #3498db;">Orisha of the Month: {{ orisha }}</h2>
            
            <div class="today-info">
                <h3>📅 {{ date }}</h3>
                <p><strong>Yoruba Day:</strong> {{ yoruba_day }}</p>
                <p><strong>Sacred Activity:</strong> {{ activity }}</p>
                <p><strong>Moon Phase:</strong> {{ moon_phase }}</p>
                <p><strong>Monthly Theme:</strong> {{ theme }}</p>
                <p><strong>Sacred Color:</strong> {{ color }}</p>
                {% if taboos %}
                <p><strong>Taboos:</strong> {{ taboos|join(', ') }}</p>
                {% endif %}
                {% if prayer %}
                <div style="background: rgba(241, 196, 15, 0.1); padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #f1c40f;">
                    <em>"{{ prayer }}"</em>
                </div>
                {% endif %}
            </div>
            
            {% if offerings %}
            <div class="offerings">
                <h4>🎁 Sacred Offerings for Today</h4>
                {% for offering in offerings %}
                    <span class="offering-badge">{{ offering }}</span>
                {% endfor %}
            </div>
            {% endif %}
            
            <div class="api-links">
                <h3>API Endpoints:</h3>
                <a href="/api/today">Today's Data (JSON)</a>
                <a href="/api/months">All Months</a>
                <a href="/api/month/{{ month }}">Current Month Details</a>
                <a href="/calendar">Interactive Calendar</a>
            </div>
        </div>
    </body>
    </html>
    """
    
    return render_template_string(template, **today, date=f"{today['day']} {today['month']}")

@app.route('/calendar')
def calendar_view():
    """Interactive calendar view"""
    template = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Traditional Yoruba Calendar</title>
        <style>
            body {
                font-family: 'Georgia', serif;
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                color: white;
                margin: 0;
                padding: 20px;
                min-height: 100vh;
            }
            .container { max-width: 1200px; margin: 0 auto; }
            .header {
                text-align: center;
                margin-bottom: 40px;
                padding: 30px;
                background: rgba(244, 208, 63, 0.1);
                border-radius: 15px;
                border: 2px solid #f4d03f;
            }
            .month-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            }
            .month-card {
                background: rgba(52, 73, 94, 0.8);
                padding: 20px;
                border-radius: 12px;
                border: 2px solid #34495e;
                transition: transform 0.2s;
            }
            .month-card:hover {
                transform: translateY(-5px);
                border-color: #f4d03f;
            }
            .month-card h3 { color: #f4d03f; }
            .today-marker { background: #e74c3c; color: white; padding: 5px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🌙 Traditional Yoruba Calendar 🌙</h1>
                <p>13 Months of Sacred Time - Àkókò Yorùbá Àtìjọ́</p>
            </div>
            
            <div id="calendar-content">
                <p style="text-align: center;">Loading calendar data...</p>
            </div>
        </div>
        
        <script>
            fetch('/api/months')
                .then(response => response.json())
                .then(data => {
                    const content = document.getElementById('calendar-content');
                    const monthsHtml = data.months.map(month => `
                        <div class="month-card">
                            <h3>${month.name}</h3>
                            <p><strong>Sacred to:</strong> ${month.orisha}</p>
                            <p><strong>Theme:</strong> ${month.theme}</p>
                            <p><strong>Color:</strong> ${month.color}</p>
                            <p><strong>Days:</strong> ${month.days.length}</p>
                            ${month.taboos ? `<p><strong>Taboos:</strong> ${month.taboos.join(', ')}</p>` : ''}
                        </div>
                    `).join('');
                    
                    content.innerHTML = `<div class="month-grid">${monthsHtml}</div>`;
                })
                .catch(error => {
                    document.getElementById('calendar-content').innerHTML = 
                        '<p style="color: #e74c3c; text-align: center;">Error loading calendar data</p>';
                });
        </script>
    </body>
    </html>
    """
    return render_template_string(template)

@app.route('/api/month/<month_name>')
def get_month(month_name):
    """Get specific month data"""
    month = next((m for m in yoruba_calendar["months"] if m["name"] == month_name), None)
    if month:
        return jsonify(month)
    return jsonify({"error": "Month not found"}), 404

@app.route('/api/months')
def get_all_months():
    """Get all months data"""
    return jsonify(yoruba_calendar)

@app.route('/api/today')
def today():
    """Get today's Yoruba calendar data"""
    try:
        yoruba_date = get_yoruba_date()
        return jsonify(yoruba_date)
    except Exception as e:
        return jsonify({"error": f"Failed to get today's data: {str(e)}"}), 500

@app.route('/api/day/<month_name>/<int:day_number>')
def get_specific_day(month_name, day_number):
    """Get specific day in specific month"""
    month = next((m for m in yoruba_calendar["months"] if m["name"] == month_name), None)
    if not month:
        return jsonify({"error": "Month not found"}), 404
    
    day = next((d for d in month["days"] if d["day"] == day_number), None)
    if not day:
        return jsonify({"error": "Day not found"}), 404
    
    return jsonify({
        "month": month_name,
        "orisha": month["orisha"],
        "theme": month["theme"],
        "color": month["color"],
        "taboos": month.get("taboos", []),
        **day,
        "moon_phase": get_moon_phase(day_number)
    })

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "service": "Yoruba Calendar Flask App"})

if __name__ == '__main__':
    print("🌙 Starting Yoruba Lunar Calendar Flask Application...")
    print("📅 Serving traditional 13-month calendar system")
    print("🔗 Available at: http://localhost:8080")
    print("📚 API Documentation:")
    print("   - GET /api/today - Current Yoruba date")
    print("   - GET /api/months - All month data") 
    print("   - GET /api/month/<name> - Specific month")
    print("   - GET /api/day/<month>/<day> - Specific day")
    print("   - GET /health - Health check")
    print("   - GET /calendar - Interactive calendar view")
    
    app.run(host='0.0.0.0', port=8080, debug=True)