import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, BookOpen, Menu } from "lucide-react";
import DailyReading from "@/components/daily-reading";
import DateNavigation from "@/components/date-navigation";
import ReadingHistory from "@/components/reading-history";
import LanguageToggle from "@/components/language-toggle";
import { formatDate, getPreviousDay, getNextDay } from "@/lib/date-utils";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { DailyReadingWithOdu } from "@shared/schema";
import YorubaPronunciationDemo from "@/components/yoruba-pronunciation-demo";
import DemoInteractiveText from "@/components/demo-interactive-text";


export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  // Trigger entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
  };

  const handleNewReading = () => {
    setCurrentDate(new Date());
    refetchReading();
  };

  return (
    <div className={`min-h-screen pb-20 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Header */}
      <header className="bg-red-100 border-4 border-red-500 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sacred-gold to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <RefreshCw className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-spiritual-blue text-xl">
                {t("Ifá Daily", "Ifá Ojoojúmọ́")}
              </h1>
              <div className="text-xs text-gray-600">
                {t("Traditional Yoruba Wisdom", "Ọgbọ́n Yorùbá Àtìjọ́")}
              </div>
            </div>
          </div>
          
          {/* RIGHT SIDE - LANGUAGE TOGGLES */}
          <div className="flex items-center space-x-2 bg-yellow-200 p-2 border-2 border-black">
            <div className="text-xs text-black">DEBUG:</div>
            
            {/* Original LanguageToggle */}
            <div className="border-2 border-green-500 p-1 min-w-[100px] min-h-[40px] bg-white">
              <LanguageToggle />
              <div className="text-xs text-red-500">COMPONENT HERE</div>
            </div>
            
            {/* Direct inline toggle */}
            <button
              onClick={() => setLanguage(language === "english" ? "yoruba" : "english")}
              className="px-4 py-2 bg-red-500 text-white font-bold rounded border-2 border-black"
            >
              🌍 {language === "english" ? "YORUBA" : "ENGLISH"}
            </button>
            
            {/* Simple test button */}
            <button
              onClick={() => alert(`Current language: ${language}`)}
              className="px-2 py-1 bg-blue-500 text-white font-bold"
            >
              TEST
            </button>
            
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-responsive py-6 spacing-mobile">
        {/* Date Navigation */}
        <div className={`reveal-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.3s'}}>
          <DateNavigation
            currentDate={currentDate}
            onPreviousDay={handlePreviousDay}
            onNextDay={handleNextDay}
            onDateSelect={handleDateSelect}
          />
        </div>

        {/* Daily Reading */}
        <div className={`reveal-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.4s'}}>
          {readingLoading ? (
            <Card className="overflow-hidden border-sacred-gold/10 loading-shimmer">
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
            <div className="card-smooth">
              <DailyReading reading={reading} />
            </div>
          ) : (
            <Card className="border-sacred-gold/10 card-smooth">
              <CardContent className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-mobile-optimized">
                  {t("No reading available for this date", "Kò sí kíkà fún ọjọ́ yìí")}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Reading History */}
        <div className={`reveal-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.5s'}}>
          <ReadingHistory
            readings={history.slice(0, 3)}
            onViewAll={() => setLocation("/history")}
            onSelectReading={handleSelectReading}
          />
        </div>

        {/* Learn Section */}
        <div className={`reveal-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.6s'}}>
          <Card className="bg-gradient-to-br from-sacred-gold/10 via-spiritual-blue/5 to-emerald-50 border-sacred-gold/20 card-smooth">
            <CardContent className="p-6">
              <h3 className="font-crimson text-responsive-lg font-semibold text-spiritual-blue dark:text-white mb-3 flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-sacred-gold transition-transform hover:scale-110" />
                <span>{t("Learn About Ifá", "Kọ́ nípa Ifá")}</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-responsive-base text-mobile-optimized mb-4">
                {t(
                  "Discover the rich tradition of Ifá divination, its history, and the wisdom of the Odu. Deepen your understanding of this ancient spiritual practice.",
                  "Ṣàwárí àṣà ọlọ́rọ̀ ti àfọṣẹ Ifá, ìtàn rẹ̀, àti ọgbọ́n Odù. Mú òye rẹ jìn sí i nípa àṣà ẹ̀mí àtijọ́ yìí."
                )}
              </p>
              <Button
                onClick={() => setLocation("/learn")}
                className="bg-spiritual-blue hover:bg-spiritual-blue/90 text-white py-3 px-6 rounded-xl font-medium nav-transition btn-touch shadow-lg hover:shadow-xl"
              >
                {t("Explore Ifá Tradition", "Ṣàwárí Àṣà Ifá")}
              </Button>
            </CardContent>
          </Card>
        </div>
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
