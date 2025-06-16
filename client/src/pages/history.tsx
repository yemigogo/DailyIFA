import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, ChevronRight } from "lucide-react";
import { DailyReadingWithOdu } from "@shared/schema";
import { formatShortDate, parseDate } from "@/lib/date-utils";
import { useLocation } from "wouter";

export default function History() {
  const [, setLocation] = useLocation();

  const { data: history = [], isLoading } = useQuery<DailyReadingWithOdu[]>({
    queryKey: ["/api/readings/history?limit=50"],
  });

  const handleSelectReading = (date: string) => {
    // Navigate back to home with the selected date
    // For now, we'll just go back to home - in a full implementation,
    // we could pass the date as a query parameter
    setLocation("/");
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sacred-gold/20">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            className="p-2 text-spiritual-blue hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sacred-gold rounded-full flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <h1 className="font-crimson font-bold text-spiritual-blue text-xl">
              Reading History
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        <Card className="border-sacred-gold/10">
          <CardContent className="p-6">
            <h2 className="font-crimson text-lg font-semibold text-spiritual-blue mb-4">
              All Readings
            </h2>

            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No readings found</p>
                <p className="text-sm text-gray-500">
                  Start your spiritual journey by getting your first daily
                  reading.
                </p>
                <Button
                  onClick={() => setLocation("/")}
                  className="mt-4 bg-spiritual-blue text-white hover:bg-spiritual-blue/90"
                >
                  Get Today's Reading
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((reading) => (
                  <div
                    key={reading.date}
                    onClick={() => handleSelectReading(reading.date)}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-spiritual-blue">
                          {reading.odu.name}
                        </p>
                        {reading.saved && (
                          <div className="w-2 h-2 bg-sage-green rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {reading.odu.subtitle}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatShortDate(parseDate(reading.date))}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}

            {history.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Showing {history.length} reading{history.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
