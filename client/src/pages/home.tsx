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

  // Get today's Odu card number from the reading
  const getTodaysOduCardNumber = () => {
    if (!reading?.odu) return 1;
    
    // Map Odu names to card numbers - comprehensive mapping
    const oduToCardMap: Record<string, number> = {
      // Major Odu (1-16)
      'Eji Ogbe': 1,
      'Oyeku Meji': 2,
      'Iwori Meji': 3,
      'Idi Meji': 4,
      'Irosun Meji': 5,
      'Owonrin Meji': 6,
      'Obara Meji': 7,
      'Okanran Meji': 8,
      'Ogunda Meji': 9,
      'Osa Meji': 10,
      'Ika Meji': 11,
      'Oturupon Meji': 12,
      'Otura Meji': 13,
      'Irete Meji': 14,
      'Ose Meji': 15,
      'Ofun Meji': 16,
      
      // Combined Odu (17-256) - examples for common combinations
      'Iwori Odi': 51, // Iwori + Odi combination (card 51)
      'Ogbe Oyeku': 17,
      'Ogbe Iwori': 18,
      'Ogbe Idi': 19,
      'Oyeku Ogbe': 33,
      'Oyeku Iwori': 34,
      'Oyeku Idi': 35,
      'Iwori Ogbe': 49,
      'Iwori Oyeku': 50,
      'Iwori Idi': 51,
      'Idi Ogbe': 65,
      'Idi Oyeku': 66,
      'Idi Iwori': 67,
      'Odi Iwori': 67, // Alternative naming
      
      // Alternative Yoruba spellings and combinations
      'Òdí Ìwòrì': 67,
      'Ìwòrì Òdí': 51,
      'Òdí': 4,
      'Ìwòrì': 3
    };

    // First try exact match
    if (oduToCardMap[reading.odu.name]) {
      console.log(`Found exact match for "${reading.odu.name}": card ${oduToCardMap[reading.odu.name]}`);
      return oduToCardMap[reading.odu.name];
    }

    // Fallback: use Odu ID if available
    if (reading.odu.id && reading.odu.id <= 256) {
      console.log(`Using Odu ID ${reading.odu.id} as card number`);
      return reading.odu.id;
    }

    // Log if no match found
    console.log(`No match found for "${reading.odu.name}", using default card 1`);
    return 1;
  };

  const currentOduCard = getTodaysOduCardNumber();
  
  // Debug logging
  useEffect(() => {
    if (reading?.odu) {
      console.log('Today\'s Odu:', reading.odu.name, 'ID:', reading.odu.id);
      console.log('Mapped to card:', currentOduCard);
    }
  }, [reading, currentOduCard]);

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
          <div className="flex items-center space-x-2">
            {/* Language Toggle Button */}
            <button
              onClick={() => setLanguage(language === "english" ? "yoruba" : "english")}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold shadow-lg"
              style={{
                minWidth: '120px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '16px' }}>🌍</span>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                {language === "english" ? "Yorùbá" : "English"}
              </span>
            </button>
            
            {/* Menu Button */}
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-responsive py-6 spacing-mobile">
        {/* Rotating Authentic Odu Card Display */}
        <div className={`reveal-up ${isVisible ? 'visible' : ''}`} style={{animationDelay: '0.2s'}}>
          <Card className="bg-gradient-to-br from-sacred-gold/10 via-spiritual-blue/5 to-emerald-50 border-sacred-gold/20 card-smooth mb-6 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Authentic Odu Card Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-40 md:w-40 md:h-48 rounded-xl overflow-hidden shadow-lg bg-black/5">
                    <img
                      src={`/static/odu_cards/odu_card_${currentOduCard}.png`}
                      alt={`Today's Odu Ifá Card: ${reading?.odu?.name || 'Sacred Odu'}`}
                      className="w-full h-full object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
                      onError={(e) => {
                        console.log(`Failed to load odu_card_${currentOduCard}.png`);
                      }}
                    />
                    {/* Overlay with card number */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-semibold">
                      {currentOduCard}/256
                    </div>
                  </div>
                </div>

                {/* Odu Information */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-crimson text-xl md:text-2xl font-bold text-spiritual-blue dark:text-white mb-2">
                    {t("Today's Sacred Odu", "Odù Mímọ́ Onì")}
                  </h3>
                  <p className="text-sacred-gold font-semibold text-lg mb-3">
                    {reading?.odu?.name || `Odu ${currentOduCard}`}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {reading?.odu?.meaning || t(
                      "Today's sacred Odu card representing divine wisdom and spiritual guidance from traditional Yoruba practice.",
                      "Káàdì Odù mímọ́ onì tí ó dúró fún ọgbọ́n òrìṣà àti ìtọ́sọ́nà ẹ̀mí láti àṣà Yorùbá àtijọ́."
                    )}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-spiritual-blue/10 text-spiritual-blue px-3 py-1 rounded-full text-xs font-medium">
                      {t("Authentic Cards", "Káàdì Tótọ́")}
                    </span>
                    <span className="bg-sacred-gold/10 text-sacred-gold px-3 py-1 rounded-full text-xs font-medium">
                      {currentOduCard <= 16 ? t("Major Odu", "Odù Àgbà") : t("Minor Odu", "Odù Kékeré")}
                    </span>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                      {t("Traditional Pattern", "Ilana Àtijọ́")}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Today's date indicator */}
              <div className="mt-4 text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {t(`Today's Sacred Reading • ${formatDate(currentDate)}`, `Kíkà Mímọ́ Onì • ${formatDate(currentDate)}`)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

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
