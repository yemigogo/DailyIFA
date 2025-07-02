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
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-sacred-gold/20 sticky top-0 z-40">
        <div className="container-responsive py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 reveal-fade" style={{animationDelay: '0.1s'}}>
            <div className="w-10 h-10 bg-gradient-to-br from-sacred-gold to-orange-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
              <RefreshCw className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-crimson font-bold text-spiritual-blue dark:text-white text-responsive-lg">
                {t("Ifá Daily", "Ifá Ojoojúmọ́")}
              </h1>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t("Traditional Yoruba Wisdom", "Ọgbọ́n Yorùbá Àtìjọ́")}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 reveal-fade" style={{animationDelay: '0.2s'}}>
            <button
              onClick={() => setLanguage(language === "english" ? "yoruba" : "english")}
              style={{
                padding: '8px 12px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: '2px solid #2563eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🌍
              <span>
                {language === "english" ? "Yorùbá" : "English"}
              </span>
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-spiritual-blue hover:bg-spiritual-blue/10 rounded-xl nav-transition btn-touch"
            >
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
