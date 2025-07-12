import { useState, useEffect } from "react";
import { Calendar, Bell, Star, Crown, Moon, Sun, CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { yorubaCalendar2025, type YorubaMonth, type YorubaDay, getMonthInfo, getDayActivities, getTodayInfo } from "@/data/yoruba-calendar-2025";

// Gregorian to Yoruba month mapping with dual display
const gregorianToYorubaMapping = [
  { gregorian: "January", yoruba: "Ṣẹ̀rẹ̀", orisha: "Ọbàtálá", color: "#FFFFFF", textColor: "#000000" },
  { gregorian: "February", yoruba: "Èrè̀lé", orisha: "Ògún", color: "#228B22", textColor: "#FFFFFF" },
  { gregorian: "March", yoruba: "Ẹrẹ́nà", orisha: "Ọ̀ṣun", color: "#FFD700", textColor: "#000000" },
  { gregorian: "April", yoruba: "Ìgbé", orisha: "Ṣàngó", color: "#FF0000", textColor: "#FFFFFF" },
  { gregorian: "May", yoruba: "Èbìbì", orisha: "Yemọja", color: "#1E90FF", textColor: "#FFFFFF" },
  { gregorian: "June", yoruba: "Òkúdu", orisha: "Ọya", color: "#9400D3", textColor: "#FFFFFF" },
  { gregorian: "July", yoruba: "Agẹmọ", orisha: "Èṣù", color: "#000000", textColor: "#FFFFFF" },
  { gregorian: "August", yoruba: "Ògún", orisha: "Ògún", color: "#228B22", textColor: "#FFFFFF" },
  { gregorian: "September", yoruba: "Ọwẹ́wẹ̀", orisha: "Ifá", color: "#8B4513", textColor: "#FFFFFF" },
  { gregorian: "October", yoruba: "Ọ̀wàrà", orisha: "Àgànjú", color: "#A0522D", textColor: "#FFFFFF" },
  { gregorian: "November", yoruba: "Bélú", orisha: "Olókun", color: "#000080", textColor: "#FFFFFF" },
  { gregorian: "December", yoruba: "Ọ̀pẹ̀", orisha: "Ọrìṣà Okè", color: "#006400", textColor: "#FFFFFF" },
  { gregorian: "Odún*", yoruba: "Odún", orisha: "Egúngún", color: "#708090", textColor: "#FFFFFF" } // Intercalary month
];

// Get current month display
const getCurrentMonthDisplay = (date = new Date()) => {
  const gregMonth = date.getMonth(); // 0-indexed (0 = January)
  
  // Handle intercalary month (every 3 years)
  const isIntercalaryYear = (date.getFullYear() % 3 === 0);
  if (isIntercalaryYear && date.getMonth() === 11 && date.getDate() > 25) {
    return gregorianToYorubaMapping[12]; // Return Odún month
  }
  
  return gregorianToYorubaMapping[gregMonth];
};

interface YorubaCalendarProps {
  showNotifications?: boolean;
}



export default function YorubaCalendar({ showNotifications = true }: YorubaCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<YorubaDay | null>(null);
  const [currentMonthDisplay, setCurrentMonthDisplay] = useState(getCurrentMonthDisplay());
  const { ts } = useLanguage();

  // Update month display daily
  useEffect(() => {
    const updateMonthDisplay = () => {
      setCurrentMonthDisplay(getCurrentMonthDisplay());
    };
    
    const dailyInterval = setInterval(updateMonthDisplay, 24 * 60 * 60 * 1000); // Update daily
    return () => clearInterval(dailyInterval);
  }, []);

  const getCurrentYorubaMonth = (): YorubaMonth => {
    return yorubaCalendar2025.months[selectedMonth];
  };

  const getCurrentDayInMonth = (): number => {
    return currentDate.getDate();
  };

  const getOrishaColor = (orisha: string) => {
    const colors: { [key: string]: string } = {
      "Ọbàtálá": "bg-white text-gray-800 border-gray-300",
      "Ògún": "bg-green-600 text-white",
      "Ọ̀ṣun": "bg-yellow-400 text-yellow-900",
      "Ọrunmila": "bg-amber-700 text-white",
      "Yemoja": "bg-blue-600 text-white",
      "Ṣàngó": "bg-red-600 text-white",
      "Ọya": "bg-purple-600 text-white",
      "Òrìṣà Òkò": "bg-brown-600 text-white",
      "Òṣányìn": "bg-green-700 text-white"
    };
    return colors[orisha] || "bg-gray-500 text-white";
  };

  const getMoonPhaseIcon = (phase: string) => {
    switch (phase) {
      case "New Moon": return "🌑";
      case "Waxing Crescent": return "🌒";
      case "First Quarter": return "🌓";
      case "Waxing Gibbous": return "🌔";
      case "Full Moon": return "🌕";
      case "Waning Gibbous": return "🌖";
      case "Last Quarter": return "🌗";
      case "Waning Crescent": return "🌘";
      default: return "🌙";
    }
  };

  const currentMonth = getCurrentYorubaMonth();
  const currentDay = getCurrentDayInMonth();

  return (
    <div className="space-y-6">
      {/* Gregorian-Yoruba Month Overlay */}
      <Card 
        className="border-2 bg-gradient-to-r overflow-hidden"
        style={{ 
          borderColor: currentMonthDisplay.color,
          background: `linear-gradient(135deg, ${currentMonthDisplay.color}22, ${currentMonthDisplay.color}11)`
        }}
      >
        <CardHeader 
          className="text-center"
          style={{ 
            backgroundColor: currentMonthDisplay.color + '20',
            borderBottom: `2px solid ${currentMonthDisplay.color}`
          }}
        >
          <CardTitle className="flex items-center justify-center gap-2">
            <CalendarIcon className="h-5 w-5" style={{ color: currentMonthDisplay.color }} />
            {ts("Gregorian-Yoruba Calendar Alignment", "Ìbámu Kálẹ́ńdà Gírìgórì-Yorùbá")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div 
                className="rounded-lg p-4 mb-4"
                style={{ 
                  backgroundColor: currentMonthDisplay.color + '15',
                  border: `2px solid ${currentMonthDisplay.color}`
                }}
              >
                <h3 className="text-2xl font-bold mb-2" style={{ color: currentMonthDisplay.color }}>
                  {currentMonthDisplay.gregorian}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {ts("Gregorian Month", "Òṣù Gírìgórì")}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div 
                className="rounded-lg p-4 mb-4"
                style={{ 
                  backgroundColor: currentMonthDisplay.color + '20',
                  border: `2px solid ${currentMonthDisplay.color}`
                }}
              >
                <h3 className="text-2xl font-bold mb-2" style={{ color: currentMonthDisplay.color }}>
                  {currentMonthDisplay.yoruba}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {ts("Yoruba Month", "Òṣù Yorùbá")}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ 
                backgroundColor: currentMonthDisplay.color + '20',
                border: `1px solid ${currentMonthDisplay.color}`
              }}
            >
              <Crown className="h-4 w-4" style={{ color: currentMonthDisplay.color }} />
              <span className="font-medium" style={{ color: currentMonthDisplay.color }}>
                {ts("Sacred to", "Mímọ́ fún")} {currentMonthDisplay.orisha}
              </span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              {ts("Traditional 13-month Odun cycle aligned with Gregorian calendar", 
                  "Ìgbà òṣù mẹ́tàlá àtìjọ́ Odún tí ó bá kálẹ́ńdà Gírìgórì mu")}
            </p>
            {currentMonthDisplay.gregorian === "Odún*" && (
              <p className="text-xs mt-2 font-medium" style={{ color: currentMonthDisplay.color }}>
                {ts("Intercalary Month - Sacred Time of Ancestors", "Òṣù Àfikún - Àkókò Mímọ́ Àwọn Baba")}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Complete Dual Calendar Grid */}
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            {ts("Complete 13-Month Calendar System", "Ètò Kálẹ́ńdà Òṣù Mẹ́tàlá")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {gregorianToYorubaMapping.map((month, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer"
                style={{
                  borderColor: month.color,
                  backgroundColor: month.color + '10'
                }}
              >
                <div className="text-center space-y-2">
                  <h4 className="font-bold text-sm" style={{ color: month.color }}>
                    {month.gregorian}
                  </h4>
                  <h3 className="font-semibold text-base" style={{ color: month.color }}>
                    {month.yoruba}
                  </h3>
                  <div 
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: month.color + '20',
                      color: month.color
                    }}
                  >
                    <Crown className="h-3 w-3" />
                    {month.orisha}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Month Display */}
      <Card className="border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
            <Calendar className="h-5 w-5" />
            {ts("Yoruba Sacred Calendar 2025", "Kálẹ́ńdà Mímọ́ Yorùbá 2025")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                {currentMonth.name}
              </h2>
              <p className="text-lg text-amber-700 dark:text-amber-300">
                {currentMonth.theme}
              </p>
              <Badge className={`mt-2 ${getOrishaColor(currentMonth.orisha)}`}>
                {ts("Orisha:", "Òrìṣà:")} {currentMonth.orisha}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Month Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-spiritual-blue dark:text-sacred-gold">
            {ts("Select Month", "Yan Oṣù")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {yorubaCalendar2025.months.map((month, index) => (
              <Button
                key={index}
                variant={selectedMonth === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMonth(index)}
                className="text-xs"
              >
                {month.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-spiritual-blue dark:text-sacred-gold">
            <Crown className="h-5 w-5" />
            {currentMonth.name} - {currentMonth.theme}
          </CardTitle>
          <p className="text-amber-600 dark:text-amber-400">
            {ts("Sacred to", "Mímọ́ sí")} {currentMonth.orisha}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {/* Header */}
            {['Day', 'Yoruba Day', 'Activity', 'Moon Phase'].slice(0, 4).map((header, i) => (
              <div key={i} className="text-center font-semibold text-sm text-amber-700 dark:text-amber-300 p-2">
                {header}
              </div>
            ))}
            
            {/* Days */}
            {currentMonth.days.map((day, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  currentDay === day.day 
                    ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                } ${index % 7 < 4 ? 'col-span-1' : 'col-span-3'}`}
                onClick={() => setSelectedDay(day)}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-amber-900 dark:text-amber-100">
                      {day.day}
                    </span>
                    <span className="text-lg">
                      {getMoonPhaseIcon(day.moon_phase)}
                    </span>
                  </div>
                  <div className="text-xs text-amber-700 dark:text-amber-300">
                    {day.yoruba_day}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {day.activity.length > 30 ? `${day.activity.substring(0, 30)}...` : day.activity}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {day.moon_phase}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Day Details */}
      {selectedDay && (
        <Card className="border-amber-300 dark:border-amber-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
              <Star className="h-5 w-5" />
              {selectedDay.yoruba_day} - {ts("Day", "Ọjọ́")} {selectedDay.day}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getMoonPhaseIcon(selectedDay.moon_phase)}</span>
                <div>
                  <h3 className="font-semibold text-spiritual-blue dark:text-sacred-gold">
                    {selectedDay.moon_phase}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedDay.activity}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  {ts("Sacred Activity", "Iṣẹ́ Mímọ́")}
                </h4>
                <p className="text-amber-700 dark:text-amber-300">
                  {selectedDay.activity}
                </p>
                {selectedDay.offerings && selectedDay.offerings.length > 0 && (
                  <div className="mt-3">
                    <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                      {ts("Offerings", "Ẹbọ")}:
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {selectedDay.offerings.map((offering, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200">
                          {offering}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Sacred Day */}
      <Card className="bg-gradient-to-r from-spiritual-blue to-sacred-gold text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            {ts("Today's Sacred Practice", "Iṣẹ́ Mímọ́ Òní")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {(() => {
            const todayInfo = getTodayInfo();
            return todayInfo ? (
              <div className="space-y-2">
                <p className="font-semibold">
                  {todayInfo.day.yoruba_day}
                </p>
                <p className="text-amber-100">
                  {todayInfo.day.activity}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-2xl">
                    {getMoonPhaseIcon(todayInfo.day.moon_phase)}
                  </span>
                  <span className="text-amber-100">
                    {todayInfo.day.moon_phase}
                  </span>
                </div>
                {todayInfo.day.offerings && todayInfo.day.offerings.length > 0 && (
                  <div className="mt-3">
                    <p className="text-amber-200 text-sm mb-1">
                      {ts("Today's Offerings", "Ẹbọ Òní")}:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {todayInfo.day.offerings.map((offering, index) => (
                        <Badge key={index} variant="outline" className="text-xs text-amber-100 border-amber-300">
                          {offering}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-amber-100">
                {ts("Calendar information not available", "Kò sí ìròyìn kálẹ́ńdà")}
              </p>
            );
          })()}
        </CardContent>
      </Card>
    </div>
  );
};