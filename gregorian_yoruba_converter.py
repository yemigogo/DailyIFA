#!/usr/bin/env python3
"""
Gregorian to Yoruba Calendar Converter
Converts modern Gregorian dates to traditional Yoruba lunar calendar system
"""

import json
import math
from datetime import datetime, date
from typing import Dict, Any, Optional

class GregorianYorubaConverter:
    def __init__(self, calendar_data_path: str = 'complete_yoruba_calendar_2025.json'):
        """Initialize converter with complete Yoruba calendar data"""
        self.load_calendar_data(calendar_data_path)
        
        # Yoruba calendar constants
        self.YORUBA_YEAR_DAYS = 364  # 13 months × 28 days
        self.YORUBA_MONTH_DAYS = 28
        self.YORUBA_MONTHS = 13
        
        # Yoruba calendar epoch - January 1st as reference point
        self.YORUBA_EPOCH = datetime(2025, 1, 1)
    
    def load_calendar_data(self, calendar_path: str):
        """Load complete Yoruba calendar data"""
        try:
            with open(calendar_path, 'r', encoding='utf-8') as f:
                self.calendar_data = json.load(f)
                print(f"✅ Loaded Yoruba calendar with {len(self.calendar_data['months'])} months")
        except FileNotFoundError:
            print(f"⚠️ Calendar file {calendar_path} not found, using minimal data")
            self.calendar_data = {"year": 2025, "months": []}
    
    def calculate_moon_phase(self, greg_date: datetime) -> str:
        """Calculate moon phase for a given Gregorian date using lunar cycle approximation"""
        # Use synodic month cycle (29.53 days) for moon phase calculation
        synodic_month = 29.53058868
        
        # Known new moon reference (approximate)
        known_new_moon = datetime(2025, 1, 29, 12, 36)  # January 29, 2025
        
        # Calculate days since known new moon
        days_since_new_moon = (greg_date - known_new_moon).total_seconds() / (24 * 3600)
        
        # Calculate position in lunar cycle (0-1)
        lunar_cycle_position = (days_since_new_moon % synodic_month) / synodic_month
        
        # Map to 8 traditional phases based on cycle position
        if lunar_cycle_position < 0.03 or lunar_cycle_position > 0.97:
            return "New Moon"
        elif 0.03 <= lunar_cycle_position < 0.22:
            return "Waxing Crescent"
        elif 0.22 <= lunar_cycle_position < 0.28:
            return "First Quarter"
        elif 0.28 <= lunar_cycle_position < 0.47:
            return "Waxing Gibbous"
        elif 0.47 <= lunar_cycle_position < 0.53:
            return "Full Moon"
        elif 0.53 <= lunar_cycle_position < 0.72:
            return "Waning Gibbous"
        elif 0.72 <= lunar_cycle_position < 0.78:
            return "Last Quarter"
        else:  # 0.78 <= lunar_cycle_position < 0.97
            return "Waning Crescent"
    
    def gregorian_to_yoruba_date(self, greg_date: datetime) -> Dict[str, Any]:
        """Convert Gregorian date to Yoruba calendar date"""
        # Calculate days since Yoruba epoch
        days_since_epoch = (greg_date - self.YORUBA_EPOCH).days
        
        # Handle negative days (dates before epoch)
        if days_since_epoch < 0:
            # For dates before epoch, calculate backwards
            years_before = abs(days_since_epoch) // self.YORUBA_YEAR_DAYS + 1
            adjusted_days = days_since_epoch + (years_before * self.YORUBA_YEAR_DAYS)
            yoruba_year = self.calendar_data["year"] - years_before
        else:
            adjusted_days = days_since_epoch
            yoruba_year = self.calendar_data["year"] + (adjusted_days // self.YORUBA_YEAR_DAYS)
        
        # Calculate position within current Yoruba year
        day_in_year = adjusted_days % self.YORUBA_YEAR_DAYS
        if day_in_year == 0 and adjusted_days > 0:
            day_in_year = self.YORUBA_YEAR_DAYS
        
        # Calculate month and day within month
        month_index = (day_in_year - 1) // self.YORUBA_MONTH_DAYS
        day_in_month = ((day_in_year - 1) % self.YORUBA_MONTH_DAYS) + 1
        
        # Ensure valid indices
        month_index = max(0, min(month_index, len(self.calendar_data["months"]) - 1))
        day_in_month = max(1, min(day_in_month, self.YORUBA_MONTH_DAYS))
        
        # Get month data
        yoruba_month = self.calendar_data["months"][month_index]
        
        # Get day data if available
        day_data = None
        if day_in_month <= len(yoruba_month["days"]):
            day_data = yoruba_month["days"][day_in_month - 1]
        
        # Calculate actual moon phase for this date
        actual_moon_phase = self.calculate_moon_phase(greg_date)
        
        return {
            "gregorian_date": greg_date.strftime("%Y-%m-%d"),
            "yoruba_year": yoruba_year,
            "yoruba_month": yoruba_month["name"],
            "yoruba_day": day_in_month,
            "yoruba_day_name": day_data["yoruba_day"] if day_data else f"Day {day_in_month}",
            "orisha": yoruba_month["orisha"],
            "theme": yoruba_month["theme"],
            "color": yoruba_month["color"],
            "taboos": yoruba_month["taboos"],
            "activity": day_data["activity"] if day_data else "Traditional observance",
            "offerings": day_data["offerings"] if day_data else ["traditional offerings"],
            "moon_phase": actual_moon_phase,
            "prayer": day_data.get("prayer") if day_data else None,
            "day_in_year": day_in_year,
            "month_index": month_index + 1
        }
    
    def yoruba_to_gregorian_date(self, yoruba_year: int, month_name: str, day: int) -> Optional[datetime]:
        """Convert Yoruba date back to Gregorian date"""
        # Find month index
        month_index = None
        for i, month in enumerate(self.calendar_data["months"]):
            if month["name"] == month_name:
                month_index = i
                break
        
        if month_index is None:
            return None
        
        # Calculate day in Yoruba year
        day_in_year = (month_index * self.YORUBA_MONTH_DAYS) + day
        
        # Calculate years from base year
        years_from_base = yoruba_year - self.calendar_data["year"]
        
        # Calculate total days from epoch
        total_days = (years_from_base * self.YORUBA_YEAR_DAYS) + day_in_year - 1
        
        # Calculate Gregorian date
        from datetime import timedelta
        gregorian_date = self.YORUBA_EPOCH + timedelta(days=total_days)
        
        return gregorian_date
    
    def get_yoruba_calendar_range(self, start_date: datetime, end_date: datetime) -> list:
        """Get Yoruba calendar data for a date range"""
        current_date = start_date
        calendar_range = []
        
        while current_date <= end_date:
            yoruba_data = self.gregorian_to_yoruba_date(current_date)
            calendar_range.append(yoruba_data)
            current_date += timedelta(days=1)
        
        return calendar_range
    
    def find_yoruba_festivals(self, greg_year: int) -> list:
        """Find important Yoruba calendar festivals in a Gregorian year"""
        festivals = []
        start_date = datetime(greg_year, 1, 1)
        end_date = datetime(greg_year, 12, 31)
        
        current_date = start_date
        while current_date <= end_date:
            yoruba_data = self.gregorian_to_yoruba_date(current_date)
            
            # Check for special festival days
            if yoruba_data["yoruba_day"] == 1:  # New moon - month beginning
                festivals.append({
                    "type": "Month Beginning",
                    "name": f"Beginning of {yoruba_data['yoruba_month']}",
                    "gregorian_date": yoruba_data["gregorian_date"],
                    "orisha": yoruba_data["orisha"],
                    "significance": f"Sacred month dedicated to {yoruba_data['orisha']}"
                })
            
            if yoruba_data["yoruba_day"] == 15:  # Full moon
                festivals.append({
                    "type": "Full Moon Festival",
                    "name": f"Full Moon of {yoruba_data['yoruba_month']}",
                    "gregorian_date": yoruba_data["gregorian_date"],
                    "orisha": yoruba_data["orisha"],
                    "significance": f"Peak power day for {yoruba_data['orisha']}"
                })
            
            current_date += timedelta(days=14)  # Check every 2 weeks to catch major events
        
        return festivals

# CLI Interface and Testing
def main():
    """Main function for testing and CLI usage"""
    converter = GregorianYorubaConverter()
    
    print("🌙 Gregorian to Yoruba Calendar Converter")
    print("=" * 50)
    
    # Test with today's date
    today = datetime.now()
    yoruba_today = converter.gregorian_to_yoruba_date(today)
    
    print(f"\n📅 Today's Conversion:")
    print(f"Gregorian: {yoruba_today['gregorian_date']}")
    print(f"Yoruba: {yoruba_today['yoruba_day']} {yoruba_today['yoruba_month']} {yoruba_today['yoruba_year']}")
    print(f"Day Name: {yoruba_today['yoruba_day_name']}")
    print(f"Orisha: {yoruba_today['orisha']}")
    print(f"Activity: {yoruba_today['activity']}")
    print(f"Moon Phase: {yoruba_today['moon_phase']}")
    print(f"Offerings: {', '.join(yoruba_today['offerings'])}")
    if yoruba_today['prayer']:
        print(f"Prayer: {yoruba_today['prayer']}")
    
    # Test round-trip conversion
    print(f"\n🔄 Round-trip Test:")
    back_to_gregorian = converter.yoruba_to_gregorian_date(
        yoruba_today['yoruba_year'],
        yoruba_today['yoruba_month'], 
        yoruba_today['yoruba_day']
    )
    print(f"Original: {today.strftime('%Y-%m-%d')}")
    print(f"Back: {back_to_gregorian.strftime('%Y-%m-%d')}")
    print(f"Match: {'✅' if abs((today - back_to_gregorian).days) <= 1 else '❌'}")
    
    # Test specific important dates
    print(f"\n🎉 Important Dates in 2025:")
    test_dates = [
        datetime(2025, 1, 1),   # New Year
        datetime(2025, 3, 21),  # Spring Equinox
        datetime(2025, 6, 21),  # Summer Solstice
        datetime(2025, 9, 23),  # Autumn Equinox
        datetime(2025, 12, 21), # Winter Solstice
    ]
    
    for test_date in test_dates:
        yoruba_date = converter.gregorian_to_yoruba_date(test_date)
        print(f"{test_date.strftime('%B %d, %Y')} → {yoruba_date['yoruba_day']} {yoruba_date['yoruba_month']} ({yoruba_date['orisha']})")
    
    print(f"\n📊 Conversion Statistics:")
    print(f"Yoruba Year Length: {converter.YORUBA_YEAR_DAYS} days")
    print(f"Yoruba Months: {converter.YORUBA_MONTHS}")
    print(f"Days per Month: {converter.YORUBA_MONTH_DAYS}")
    print(f"Calendar Loaded: {'✅' if converter.calendar_data['months'] else '❌'}")

if __name__ == "__main__":
    from datetime import timedelta
    main()