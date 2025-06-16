import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, ChevronRight } from "lucide-react";
import { DailyReadingWithOdu } from "@shared/schema";
import { formatShortDate, parseDate } from "@/lib/date-utils";

interface ReadingHistoryProps {
  readings: DailyReadingWithOdu[];
  onViewAll: () => void;
  onSelectReading: (date: string) => void;
}

export default function ReadingHistory({
  readings,
  onViewAll,
  onSelectReading,
}: ReadingHistoryProps) {
  return (
    <Card className="border-sacred-gold/10">
      <CardContent className="p-6">
        <h3 className="font-crimson text-lg font-semibold text-spiritual-blue mb-4 flex items-center space-x-2">
          <History className="h-5 w-5 text-sacred-gold" />
          <span>Recent Readings</span>
        </h3>

        <div className="space-y-3">
          {readings.length === 0 ? (
            <p className="text-gray-600 text-center py-4">
              No previous readings found
            </p>
          ) : (
            readings.map((reading) => (
              <div
                key={reading.date}
                onClick={() => onSelectReading(reading.date)}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-medium text-spiritual-blue">
                    {reading.odu.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatShortDate(parseDate(reading.date))}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            ))
          )}
        </div>

        <Button
          onClick={onViewAll}
          variant="ghost"
          className="w-full mt-4 py-2 text-spiritual-blue font-medium hover:bg-gray-50 rounded-lg transition-colors"
        >
          View All History
        </Button>
      </CardContent>
    </Card>
  );
}
