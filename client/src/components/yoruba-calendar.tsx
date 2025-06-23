import { useState, useEffect } from "react";
import { Calendar, Bell, Star, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface YorubaCalendarProps {
  showNotifications?: boolean;
}

const yorubaMonths = [
  { name: "Ṣẹ́rẹ́", english: "January", focus: "New beginnings", orisha: "Ọbàtálá", color: "white" },
  { name: "Èrèlé", english: "February", focus: "Planning", orisha: "Ògún", color: "green" },
  { name: "Ẹrẹ̀nà", english: "March", focus: "Growth", orisha: "Ọ̀ṣun", color: "yellow" },
  { name: "Igbé", english: "April", focus: "Manifestation", orisha: "Ọrunmila", color: "brown" },
  { name: "Ẹ̀bìbí", english: "May", focus: "Abundance", orisha: "Yemoja", color: "blue" },
  { name: "Òkúdù", english: "June", focus: "Power", orisha: "Ṣàngó", color: "red" },
  { name: "Agẹmọ", english: "July", focus: "Wisdom", orisha: "Ọrunmila", color: "brown" },
  { name: "Ògún", english: "August", focus: "Work", orisha: "Ògún", color: "green" },
  { name: "Owéwé", english: "September", focus: "Harvest", orisha: "Yemoja", color: "blue" },
  { name: "Ọ̀wàrà", english: "October", focus: "Gratitude", orisha: "Ọ̀ṣun", color: "yellow" },
  { name: "Bélú", english: "November", focus: "Transition", orisha: "Ọya", color: "purple" },
  { name: "Ọ̀pẹ̀", english: "December", focus: "Reflection", orisha: "Ọbàtálá", color: "white" }
];

const orishaFeastDays = [
  { orisha: "Ọbàtálá", date: "2025-01-01", description: "New Year blessing", yoruba: "Ọjọ́ Ọbàtálá" },
  { orisha: "Ògún", date: "2025-02-14", description: "Iron, work, protection", yoruba: "Ọjọ́ Ògún" },
  { orisha: "Ọ̀ṣun", date: "2025-03-21", description: "Love, fertility, rivers", yoruba: "Ọjọ́ Ọ̀ṣun" },
  { orisha: "Ṣàngó", date: "2025-06-21", description: "Thunder, lightning, justice", yoruba: "Ọjọ́ Ṣàngó" },
  { orisha: "Yemoja", date: "2025-09-07", description: "Ocean mother, protection", yoruba: "Ọjọ́ Yemoja" },
  { orisha: "Ọya", date: "2025-11-02", description: "Wind, change, ancestors", yoruba: "Ọjọ́ Ọya" }
];

export default function YorubaCalendar({ showNotifications = true }: YorubaCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const { ts } = useLanguage();

  useEffect(() => {
    // Calculate upcoming events
    const today = new Date();
    const upcoming = orishaFeastDays.filter(event => {
      const eventDate = new Date(event.date);
      const daysDiff = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      return daysDiff >= 0 && daysDiff <= 30; // Next 30 days
    });
    setUpcomingEvents(upcoming);
  }, []);

  const getCurrentYorubaMonth = () => {
    const monthIndex = currentDate.getMonth();
    return yorubaMonths[monthIndex];
  };

  const getOrishaColor = (orisha: string) => {
    const colors: { [key: string]: string } = {
      "Ọbàtálá": "bg-white text-gray-800 border-gray-300",
      "Ògún": "bg-green-600 text-white",
      "Ọ̀ṣun": "bg-yellow-400 text-yellow-900",
      "Ọrunmila": "bg-amber-700 text-white",
      "Yemoja": "bg-blue-600 text-white",
      "Ṣàngó": "bg-red-600 text-white",
      "Ọya": "bg-purple-600 text-white"
    };
    return colors[orisha] || "bg-gray-500 text-white";
  };

  const currentMonth = getCurrentYorubaMonth();

  return (
    <div className="space-y-6">
      {/* Current Month Display */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
            <Calendar className="h-5 w-5" />
            {ts("Yoruba Lunar Calendar", "Kálẹ́ńdà Oṣù Yorùbá")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                {currentMonth.name}
              </h2>
              <p className="text-amber-700 dark:text-amber-300">
                {currentMonth.english} 2025
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Crown className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-amber-800 dark:text-amber-200">
                  {ts("Presiding Orisha:", "Òrìṣà Tó Ń Darí:")}
                </span>
                <Badge className={getOrishaColor(currentMonth.orisha)}>
                  {currentMonth.orisha}
                </Badge>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  {ts("Monthly Focus:", "Àkókò Oṣù:")}
                </h4>
                <p className="text-amber-700 dark:text-amber-300">
                  {currentMonth.focus}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Orisha Feast Days */}
      {upcomingEvents.length > 0 && (
        <Card className="border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
              <Bell className="h-5 w-5" />
              {ts("Upcoming Orisha Feast Days", "Àwọn Ọjọ́ Àṣe Òrìṣà Tó Ń Bọ̀")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => {
              const eventDate = new Date(event.date);
              const daysUntil = Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
              
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getOrishaColor(event.orisha).split(' ')[0]}`}></div>
                    <div>
                      <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                        {event.yoruba}
                      </h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        {event.description}
                      </p>
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        {eventDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100">
                      {daysUntil === 0 ? ts("Today", "Òní") : 
                       daysUntil === 1 ? ts("Tomorrow", "Ọ̀la") :
                       `${daysUntil} ${ts("days", "ọjọ́")}`}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Monthly Orisha Guide */}
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
            <Star className="h-5 w-5" />
            {ts("Monthly Orisha Guide", "Ìtọ́sọ́nà Òrìṣà Oṣù")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {yorubaMonths.map((month, index) => {
              const isCurrentMonth = index === currentDate.getMonth();
              
              return (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border text-center transition-all ${
                    isCurrentMonth 
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/30 scale-105' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
                  }`}
                >
                  <div className="space-y-2">
                    <h4 className={`font-semibold ${isCurrentMonth ? 'text-amber-900 dark:text-amber-100' : 'text-gray-700 dark:text-gray-300'}`}>
                      {month.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {month.english}
                    </p>
                    <Badge size="sm" className={getOrishaColor(month.orisha)}>
                      {month.orisha}
                    </Badge>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {month.focus}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {showNotifications && (
        <Card className="border-amber-200 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-amber-700 dark:text-amber-300">
                  {ts("Get daily Ifá notifications", "Gbà ìfiránsẹ́ Ifá ojoojúmọ́")}
                </span>
              </div>
              <Button size="sm" variant="outline" className="border-amber-300">
                {ts("Enable", "Gba Láàyè")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}