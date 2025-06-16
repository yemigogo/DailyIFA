import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, BookOpen, Menu } from "lucide-react";
import DailyReading from "@/components/daily-reading";
import DateNavigation from "@/components/date-navigation";
import ReadingHistory from "@/components/reading-history";
import { formatDate, getPreviousDay, getNextDay } from "@/lib/date-utils";
import { useLocation } from "wouter";
import { DailyReadingWithOdu } from "@shared/schema";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [, setLocation] = useLocation();

  const dateString = formatDate(currentDate);

  const {
    data: reading,
    isLoading: readingLoading,
    refetch: refetchReading,
  } = useQuery<DailyReadingWithOdu>({
    queryKey: [`/api/readings/${dateString}`],
  });

  const { data: history = [] } = useQuery<DailyReadingWithOdu[]>({
    queryKey: ["/api/readings/history"],
  });

  const handlePreviousDay = () => {
    setCurrentDate(getPreviousDay(currentDate));
  };

  const handleNextDay = () => {
    setCurrentDate(getNextDay(currentDate));
  };

  const handleSelectReading = (date: string) => {
    setCurrentDate(new Date(date));
  };

  const handleNewReading = () => {
    setCurrentDate(new Date());
    refetchReading();
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sacred-gold/20">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sacred-gold rounded-full flex items-center justify-center">
              <RefreshCw className="h-4 w-4 text-white" />
            </div>
            <h1 className="font-crimson font-bold text-spiritual-blue text-xl">
              Ifá Daily
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-spiritual-blue hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Date Navigation */}
        <DateNavigation
          currentDate={currentDate}
          onPreviousDay={handlePreviousDay}
          onNextDay={handleNextDay}
        />

        {/* Daily Reading */}
        {readingLoading ? (
          <Card className="overflow-hidden border-sacred-gold/10">
            <div className="bg-gradient-to-r from-spiritual-blue to-spiritual-blue/90 p-6">
              <Skeleton className="h-8 w-48 mb-2 bg-white/20" />
              <Skeleton className="h-4 w-32 bg-white/20" />
            </div>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ) : reading ? (
          <DailyReading reading={reading} />
        ) : (
          <Card className="border-sacred-gold/10">
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No reading available for this date</p>
            </CardContent>
          </Card>
        )}

        {/* Reading History */}
        <ReadingHistory
          readings={history.slice(0, 3)}
          onViewAll={() => setLocation("/history")}
          onSelectReading={handleSelectReading}
        />

        {/* Learn Section */}
        <Card className="bg-gradient-to-r from-sacred-gold/10 to-spiritual-blue/10 border-sacred-gold/20">
          <CardContent className="p-6">
            <h3 className="font-crimson text-lg font-semibold text-spiritual-blue mb-3 flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-sacred-gold" />
              <span>Learn About Ifá</span>
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              Discover the rich tradition of Ifá divination, its history, and the
              wisdom of the Odu. Deepen your understanding of this ancient
              spiritual practice.
            </p>
            <Button
              onClick={() => setLocation("/learn")}
              className="bg-spiritual-blue text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-spiritual-blue/90 transition-colors"
            >
              Explore Ifá Tradition
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Floating Action Button */}
      <Button
        onClick={handleNewReading}
        className="fixed bottom-20 right-6 bg-sacred-gold text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-sacred-gold/90 transition-all hover:scale-105"
      >
        <RefreshCw className="h-5 w-5" />
      </Button>
    </div>
  );
}
