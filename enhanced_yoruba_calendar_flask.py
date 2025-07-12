from flask import Flask, jsonify, render_template, session, request
from datetime import datetime, timedelta
import math
import json

app = Flask(__name__)
app.secret_key = 'ifá_spiritual_calendar_2025'

# Load complete calendar data
with open('complete_yoruba_calendar_2025.json', 'r') as f:
    yoruba_calendar = json.load(f)

def generate_month_days(orisha: str, daily_rituals: dict):
    """Generate complete 28-day structure with intelligent defaults"""
    days = []
    yoruba_days = ["Àìkú", "Ajé", "Ìṣẹ́gun", "Rírú", "Bọ̀", "Ẹtì", "Àbámẹ́ta"]
    
    for day in range(1, 29):
        # Get pre-defined ritual or use default
        if day in daily_rituals:
            activity, offerings = daily_rituals[day]
        else:
            activity = f"Standard {orisha} devotion"
            offerings = ["water", "kolanut", "candle"]
        
        days.append({
            "day": day,
            "yoruba_day": f"Ọjọ́-{yoruba_days[(day-1) % 7]}-{'ìlọ́' if day % 2 == 0 else 'òwà'}",
            "activity": activity,
            "offerings": offerings,
            "moon_phase": get_moon_phase(day),
            "prayer": generate_prayer(orisha, day)
        })
    return days

def generate_prayer(orisha: str, day: int) -> str:
    """Generate context-aware prayers based on Orisha and moon phase"""
    moon_phase = get_moon_phase(day)
    
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
        "Ọya": {
            "🌑 New Moon": "Ọya, goddess of winds, blow away old sorrows as the moon renews",
            "🌕 Full Moon": "Queen of storms, under the full moon's light, transform my life with your powerful winds",
            "default": f"Ọya, bring positive change and transformation to my journey"
        },
        "Yemọja": {
            "🌑 New Moon": "Yemọja, mother of waters, wash me clean with new moon blessings",
            "🌕 Full Moon": "Ocean mother, under the full moon's reflection, nurture and protect your children",
            "default": f"Yemọja, mother of all, protect and nurture me like the vast ocean"
        },
        "Ọ̀ṣun": {
            "🌑 New Moon": "Ọ̀ṣun, river goddess, let new love and abundance flow into my life",
            "🌕 Full Moon": "Sweet water Orisha, under the full moon, bless me with fertility and prosperity",
            "default": f"Ọ̀ṣun, bring sweetness and abundance to my relationships and endeavors"
        },
        "Èṣù": {
            "🌑 New Moon": "Èṣù Ẹlẹ́gbára, open new paths as the moon begins its cycle",
            "🌕 Full Moon": "Messenger Orisha, under the full moon's light, deliver my prayers to the divine",
            "default": f"Èṣù, guardian of crossroads, open the right doors and close the wrong ones"
        },
        "Ọ̀sányìn": {
            "🌑 New Moon": "Ọ̀sányìn, master of herbs, let healing grow with the new moon",
            "🌕 Full Moon": "Forest Orisha, under the full moon, strengthen your healing medicines",
            "default": f"Ọ̀sányìn, grant me knowledge of healing and wellness"
        },
        "Olókun": {
            "🌑 New Moon": "Olókun, depths of ocean, reveal mysteries as the moon begins anew",
            "🌕 Full Moon": "Ocean depths Orisha, under the full moon, share your ancient wisdom",
            "default": f"Olókun, keeper of ocean secrets, grant me deep wisdom and intuition"
        },
        "Òrìṣà Òkò": {
            "🌑 New Moon": "Òrìṣà Òkò, farmer Orisha, plant new seeds of prosperity with the new moon",
            "🌕 Full Moon": "Lord of harvest, under the full moon, bless the fruits of my labor",
            "default": f"Òrìṣà Òkò, bring abundance and fertile ground for my endeavors"
        },
        "Ọ̀ṣọ́ọ̀sì": {
            "🌑 New Moon": "Ọ̀ṣọ́ọ̀sì, hunter Orisha, help me track new opportunities with the new moon",
            "🌕 Full Moon": "Forest hunter, under the full moon, guide my aim toward justice",
            "default": f"Ọ̀ṣọ́ọ̀sì, grant me precision and justice in all my pursuits"
        },
        "Òrúnmìlà": {
            "🌑 New Moon": "Òrúnmìlà, witness of destiny, reveal new wisdom as the moon begins",
            "🌕 Full Moon": "Elérìí ìpín, under the full moon's clarity, illuminate the path of my destiny",
            "default": f"Òrúnmìlà, great oracle, guide me with your infinite wisdom"
        }
    }
    
    orisha_prayers = prayers.get(orisha, {"default": f"Great Orisha {orisha}, bless and guide me"})
    return orisha_prayers.get(moon_phase, orisha_prayers["default"])

def get_moon_phase(day: int) -> str:
    """Enhanced moon phase calculator with 8 distinct phases"""
    if day == 1:
        return "🌑 New Moon"
    elif day == 15:
        return "🌕 Full Moon"
    elif day == 28:
        return "🌑 Dark Moon"
    elif day >= 2 and day <= 7:
        return "🌒 Waxing Crescent"
    elif day >= 8 and day <= 14:
        return "🌔 Waxing Gibbous"
    elif day == 7 or day == 21:
        return "🌓 First Quarter"
    elif day == 14 or day == 22:
        return "🌗 Last Quarter"
    elif day >= 16 and day <= 21:
        return "🌖 Waning Gibbous"
    elif day >= 22 and day <= 27:
        return "🌘 Waning Crescent"
    else:
        return "🌘 Waning Moon"

def get_current_yoruba_date():
    """Get current date in Yoruba calendar format"""
    today = datetime.now()
    
    # Calculate day of year (simplified for demonstration)
    day_of_year = today.timetuple().tm_yday
    
    # Map to 13-month, 28-day cycle (364 days)
    yoruba_day_of_year = day_of_year % 364
    if yoruba_day_of_year == 0:
        yoruba_day_of_year = 364
    
    # Calculate month and day
    month_index = (yoruba_day_of_year - 1) // 28
    day_in_month = ((yoruba_day_of_year - 1) % 28) + 1
    
    # Ensure valid indices
    month_index = min(month_index, len(yoruba_calendar["months"]) - 1)
    
    return {
        "month": yoruba_calendar["months"][month_index]["name"],
        "day": day_in_month,
        "year": yoruba_calendar["year"],
        "gregorian": today.strftime("%Y-%m-%d")
    }

# Enhanced Gregorian to Yoruba Conversion Functions
def calculate_precise_moon_phase(greg_date):
    """Calculate moon phase for a given date using astronomical precision"""
    # Synodic month cycle (29.53 days) for moon phase calculation
    synodic_month = 29.53058868
    
    # Known new moon reference (January 29, 2025, 12:36 UTC)
    known_new_moon = datetime(2025, 1, 29, 12, 36)
    
    # Calculate days since known new moon
    days_since_new_moon = (greg_date - known_new_moon).total_seconds() / (24 * 3600)
    
    # Calculate position in lunar cycle (0-1)
    lunar_cycle_position = (days_since_new_moon % synodic_month) / synodic_month
    
    # Map to 8 traditional phases based on cycle position
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
    else:  # 0.78 <= lunar_cycle_position < 0.97
        return "🌘 Waning Crescent"

def gregorian_to_yoruba_enhanced(greg_date):
    """Enhanced Gregorian to Yoruba conversion with intelligent prayer generation"""
    YORUBA_YEAR_DAYS = 364  # 13 months × 28 days
    YORUBA_MONTH_DAYS = 28
    YORUBA_EPOCH = datetime(2025, 1, 1)
    
    # Calculate days since Yoruba epoch
    days_since_epoch = (greg_date - YORUBA_EPOCH).days
    
    # Handle negative days (dates before epoch)
    if days_since_epoch < 0:
        years_before = abs(days_since_epoch) // YORUBA_YEAR_DAYS + 1
        adjusted_days = days_since_epoch + (years_before * YORUBA_YEAR_DAYS)
        yoruba_year = yoruba_calendar["year"] - years_before
    else:
        adjusted_days = days_since_epoch
        yoruba_year = yoruba_calendar["year"] + (adjusted_days // YORUBA_YEAR_DAYS)
    
    # Calculate position within current Yoruba year
    day_in_year = adjusted_days % YORUBA_YEAR_DAYS
    if day_in_year == 0 and adjusted_days > 0:
        day_in_year = YORUBA_YEAR_DAYS
    
    # Calculate month and day within month
    month_index = (day_in_year - 1) // YORUBA_MONTH_DAYS
    day_in_month = ((day_in_year - 1) % YORUBA_MONTH_DAYS) + 1
    
    # Ensure valid indices
    month_index = max(0, min(month_index, len(yoruba_calendar["months"]) - 1))
    day_in_month = max(1, min(day_in_month, YORUBA_MONTH_DAYS))
    
    # Get month data
    yoruba_month = yoruba_calendar["months"][month_index]
    
    # Get day data if available
    day_data = None
    if day_in_month <= len(yoruba_month["days"]):
        day_data = yoruba_month["days"][day_in_month - 1]
    
    # Calculate actual moon phase for this date
    actual_moon_phase = calculate_precise_moon_phase(greg_date)
    
    # Generate intelligent prayer
    orisha = yoruba_month["orisha"]
    intelligent_prayer = generate_prayer(orisha, day_in_month)
    
    # Enhanced Yoruba day name
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
        "taboos": yoruba_month["taboos"],
        "activity": day_data["activity"] if day_data else f"Traditional {orisha} observance",
        "offerings": day_data["offerings"] if day_data else ["water", "kolanut", "candle"],
        "moon_phase": actual_moon_phase,
        "prayer": intelligent_prayer,
        "spiritual_guidance": f"Today is under the guidance of {orisha}, focus on {yoruba_month['theme'].lower()}",
        "day_in_year": day_in_year,
        "month_index": month_index + 1
    }

# ================
# FLASK ENDPOINTS
# ================

@app.route('/')
def dashboard():
    """Enhanced dashboard with current Yoruba date"""
    yoruba_date = get_current_yoruba_date()
    month_data = next(m for m in yoruba_calendar["months"] 
                     if m["name"] == yoruba_date["month"])
    day_data = month_data["days"][yoruba_date["day"]-1]
    
    return render_template('enhanced_dashboard.html',
                         date=yoruba_date,
                         day=day_data,
                         month=month_data)

@app.route('/api/calendar')
def full_calendar():
    """Complete calendar API with enhanced data"""
    return jsonify(yoruba_calendar)

@app.route('/api/today-enhanced')
def today_enhanced():
    """Enhanced today's date with intelligent prayers"""
    today = datetime.now()
    enhanced_yoruba_date = gregorian_to_yoruba_enhanced(today)
    return jsonify(enhanced_yoruba_date)

@app.route('/api/convert-enhanced/<date_str>')
def convert_enhanced(date_str):
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
def range_enhanced():
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
        
        # Limit range to prevent excessive data
        days_diff = (end_date - start_date).days
        if days_diff > 100:
            return jsonify({"error": "Date range cannot exceed 100 days for enhanced conversion"}), 400
        
        calendar_range = []
        current_date = start_date
        
        while current_date <= end_date:
            enhanced_data = gregorian_to_yoruba_enhanced(current_date)
            calendar_range.append(enhanced_data)
            current_date += timedelta(days=1)
        
        return jsonify({
            "start_date": start_date_str,
            "end_date": end_date_str,
            "total_days": len(calendar_range),
            "enhanced_calendar_data": calendar_range,
            "spiritual_pattern": analyze_spiritual_pattern(calendar_range)
        })
        
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400
    except Exception as e:
        return jsonify({"error": f"Enhanced range conversion failed: {str(e)}"}), 500

def analyze_spiritual_pattern(calendar_data):
    """Analyze spiritual patterns in date range"""
    orisha_count = {}
    moon_phases = {}
    
    for day in calendar_data:
        orisha = day["orisha"]
        moon_phase = day["moon_phase"]
        
        orisha_count[orisha] = orisha_count.get(orisha, 0) + 1
        moon_phases[moon_phase] = moon_phases.get(moon_phase, 0) + 1
    
    dominant_orisha = max(orisha_count, key=orisha_count.get)
    dominant_moon_phase = max(moon_phases, key=moon_phases.get)
    
    return {
        "dominant_orisha": dominant_orisha,
        "dominant_moon_phase": dominant_moon_phase,
        "orisha_distribution": orisha_count,
        "moon_phase_distribution": moon_phases,
        "spiritual_focus": f"This period emphasizes {dominant_orisha}'s energy with {dominant_moon_phase.split()[1].lower()} lunar influence"
    }

@app.route('/health')
def health_check():
    """Enhanced health check with calendar status"""
    return jsonify({
        "status": "healthy",
        "service": "Enhanced Yoruba Calendar Flask App",
        "features": [
            "Intelligent prayer generation",
            "Astronomical moon phase calculation",
            "Enhanced Yoruba day naming",
            "Spiritual pattern analysis",
            "Complete 13-month calendar system"
        ],
        "calendar_loaded": len(yoruba_calendar["months"]) == 13,
        "total_days": sum(len(month["days"]) for month in yoruba_calendar["months"])
    })

if __name__ == '__main__':
    print("🌙 Starting Enhanced Yoruba Lunar Calendar Flask Application...")
    print("🔮 Features: Intelligent Prayers, Astronomical Calculations, Spiritual Patterns")
    print("🔗 Available at: http://localhost:8080")
    print("📚 Enhanced API Documentation:")
    print("   - GET /api/today-enhanced - Enhanced current Yoruba date")
    print("   - GET /api/convert-enhanced/<date> - Enhanced date conversion")
    print("   - GET /api/range-enhanced - Enhanced range conversion with patterns")
    print("   - GET /api/calendar - Complete calendar data")
    print("   - GET /health - Health check with feature status")
    
    app.run(host='0.0.0.0', port=8080, debug=True)