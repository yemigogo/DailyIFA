import { useState, useEffect } from "react";
import { Calendar, Bell, Star, Crown, Moon, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { yorubaCalendar2025, type YorubaMonth, type YorubaDay } from "@/data/yoruba-calendar-2025";

interface YorubaCalendarProps {
  showNotifications?: boolean;
}



export default function YorubaCalendar({ showNotifications = true }: YorubaCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<YorubaDay | null>(null);
  const { ts } = useLanguage();

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
          {currentMonth.days[currentDay - 1] && (
            <div className="space-y-2">
              <p className="font-semibold">
                {currentMonth.days[currentDay - 1]?.yoruba_day}
              </p>
              <p className="text-amber-100">
                {currentMonth.days[currentDay - 1]?.activity}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-2xl">
                  {getMoonPhaseIcon(currentMonth.days[currentDay - 1]?.moon_phase || "New Moon")}
                </span>
                <span className="text-amber-100">
                  {currentMonth.days[currentDay - 1]?.moon_phase}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};