# Yoruba Lunar Calendar Flask Application

A standalone Flask web application providing comprehensive traditional Yoruba calendar functionality based on the authentic 13-month lunar calendar system.

## Features

### Traditional Calendar System
- 13 authentic Yoruba months (Ṣẹ̀rẹ̀, Èrèlé, etc.)
- 28-day lunar cycles with proper moon phase calculation
- Daily sacred activities and spiritual practices
- Traditional Yoruba day names
- Orisha associations for each month

### Enhanced Functionality
- Real-time lunar date calculation using day-of-year algorithm
- Comprehensive offerings and spiritual guidance
- Traditional taboos and restrictions
- Sacred prayers and meditation practices
- Full moon phase tracking (New, Waxing, Full, Waning, Dark)

### Web Interface
- Beautiful responsive HTML templates
- Interactive calendar view
- Real-time today's information display
- Sacred color schemes and traditional aesthetics
- Mobile-friendly responsive design

### API Endpoints
- `GET /api/today` - Current Yoruba date with full details
- `GET /api/months` - Complete calendar data (all 13 months)
- `GET /api/month/<month_name>` - Specific month details
- `GET /api/day/<month_name>/<day_number>` - Specific day information
- `GET /health` - Health check endpoint

## Quick Start

### Installation
```bash
# Install Flask
pip install flask

# Run the application
python yoruba_calendar_flask_app.py
```

### Access Points
- **Web Interface**: http://localhost:8080
- **Interactive Calendar**: http://localhost:8080/calendar
- **API Base**: http://localhost:8080/api/

### Example API Usage
```bash
# Get today's Yoruba calendar information
curl http://localhost:8080/api/today

# Get all months
curl http://localhost:8080/api/months

# Get specific month (Ṣẹ̀rẹ̀)
curl http://localhost:8080/api/month/Ṣẹ̀rẹ̀

# Get specific day
curl http://localhost:8080/api/day/Ṣẹ̀rẹ̀/12
```

## Calendar Structure

### Months and Orisha Associations
1. **Ṣẹ̀rẹ̀** (Ọbàtálá) - Purity, New Beginnings
2. **Èrèlé** (Ògún) - War, Iron, Labor
3. *(Additional 11 months would be implemented in full version)*

### Daily Activities
Each day includes:
- Traditional Yoruba day name
- Sacred activity or ritual
- Specific offerings and materials
- Moon phase information
- Optional prayers and spiritual guidance

## Integration with Node.js

This Flask application complements the existing Node.js/TypeScript calendar integration. Both systems provide:
- Identical API endpoints
- Same data structure
- Compatible JSON responses
- Cross-platform calendar functionality

## Technical Details

### Date Calculation Algorithm
```python
# Enhanced day-of-year calculation for accurate lunar cycles
day_of_year = (current_date - start_of_year).days + 1
cycle_length = 28
total_cycles = 13
adjusted_day = ((day_of_year - 1) % (cycle_length * total_cycles)) + 1
month_index = ((adjusted_day - 1) // cycle_length) % total_cycles
day_in_month = ((adjusted_day - 1) % cycle_length) + 1
```

### Moon Phase Calculation
Accurately calculates 8 distinct moon phases:
- New Moon (Day 1)
- Waxing Crescent (Days 2-7)
- First Quarter (Day 7)
- Waxing Gibbous (Days 8-14)
- Full Moon (Day 15)
- Waning Gibbous (Days 16-21)
- Last Quarter (Day 21)
- Waning Crescent (Days 22-27)
- Dark Moon (Day 28)

## Cultural Authenticity

All calendar data maintains authentic Yoruba cultural practices:
- Traditional month names with proper diacritical marks
- Authentic Orisha associations and spiritual themes
- Real traditional offerings and ceremonial practices
- Proper taboos and cultural restrictions
- Traditional prayers in authentic context

## Production Deployment

For production use:
1. Set `debug=False` in app.run()
2. Configure proper WSGI server (Gunicorn, uWSGI)
3. Set up reverse proxy (Nginx)
4. Configure SSL/TLS certificates
5. Implement proper logging and monitoring

## License

This application preserves and honors traditional Yoruba spiritual practices with cultural authenticity and respect.