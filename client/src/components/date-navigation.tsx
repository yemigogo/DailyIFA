import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDisplayDate, canNavigateToFuture } from "@/lib/date-utils";

interface DateNavigationProps {
  currentDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
}

export default function DateNavigation({
  currentDate,
  onPreviousDay,
  onNextDay,
}: DateNavigationProps) {
  const canGoNext = canNavigateToFuture(currentDate);

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
          
          <div className="text-center">
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
        
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4 text-sacred-gold" />
          <span>Daily reading available</span>
        </div>
      </CardContent>
    </Card>
  );
}
