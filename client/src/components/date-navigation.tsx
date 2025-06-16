import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { formatDisplayDate, canNavigateToFuture, getDayOfYear } from "@/lib/date-utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface DateNavigationProps {
  currentDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDateSelect?: (date: Date) => void;
}

export default function DateNavigation({
  currentDate,
  onPreviousDay,
  onNextDay,
  onDateSelect,
}: DateNavigationProps) {
  const canGoNext = canNavigateToFuture(currentDate);
  const { ts } = useLanguage();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const dayOfYear = getDayOfYear(currentDate);
  const totalDaysInYear = new Date(currentDate.getFullYear(), 11, 31).getDate() === 31 ? 365 : 366;

  const handleDateSelect = (date: Date | undefined) => {
    if (date && onDateSelect) {
      onDateSelect(date);
      setIsCalendarOpen(false);
    }
  };

  return (
    <Card className="border-sacred-gold/10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPreviousDay}
            className="p-2 text-spiritual-blue hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="text-center hover:bg-gray-50">
                <div>
                  <p className="font-crimson text-spiritual-blue text-lg font-semibold">
                    {formatDisplayDate(currentDate)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {currentDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <CalendarComponent
                mode="single"
                selected={currentDate}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onNextDay}
            disabled={!canGoNext}
            className="p-2 text-spiritual-blue hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-sacred-gold" />
            <span>{ts("Day", "Ọjọ́")} {dayOfYear} {ts("of", "ninu")} {totalDaysInYear}</span>
          </div>
          <span className="text-sacred-gold">•</span>
          <span>{ts("365 Daily Readings", "Kika 365 Ojoojúmọ́")}</span>
        </div>
      </CardContent>
    </Card>
  );
}
