import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, BookOpen, Star, Lightbulb, Heart } from "lucide-react";
import { Odu, DailyReadingWithOdu } from "@shared/schema";
import { useLocation } from "wouter";
import OduPattern from "@/components/odu-pattern";
import OduIfaImage from "@/components/odu-ifa-image";
import { useLanguage } from "@/contexts/LanguageContext";
import InteractiveYorubaText from "@/components/interactive-yoruba-text";
import { formatDate } from "@/lib/date-utils";

export default function Learn() {
  const [, setLocation] = useLocation();
  const { language, ts } = useLanguage();
  const todayDate = formatDate(new Date());

  const { data: odus = [], isLoading } = useQuery<Odu[]>({
    queryKey: ["/api/odus"],
  });

  const { data: todaysReading } = useQuery<DailyReadingWithOdu>({
    queryKey: [`/api/readings/${todayDate}`],
    staleTime: 1000 * 60 * 60, // 1 hour
  });

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
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <h1 className="font-crimson font-bold text-spiritual-blue text-xl">
              Learn About Ifá
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Today's Sacred Odu */}
        {todaysReading && (
          <Card className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-300 dark:border-amber-700">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-3 text-center">
                {ts("Today's Sacred Odu", "Odù Mímọ́ Òní")}
              </h3>
              <div className="flex items-center justify-center gap-3">
                <OduIfaImage oduName={todaysReading.odu.name} size={80} />
                <div className="text-left">
                  <p className="font-bold text-amber-900 dark:text-amber-100">
                    {todaysReading.odu.name}
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    {language === "english" ? todaysReading.odu.subtitle : todaysReading.odu.subtitleYoruba}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Introduction */}
        <Card className="bg-gradient-to-r from-sacred-gold/10 to-spiritual-blue/10 border-sacred-gold/20">
          <CardContent className="p-6">
            <h2 className="font-crimson text-xl font-bold text-spiritual-blue mb-3">
              The Wisdom of Ifá
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Ifá is an ancient African spiritual tradition that originated among the Yoruba people. It is a system of divination that provides guidance, wisdom, and insight into life's challenges and opportunities through the sacred verses known as Odu.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-spiritual-blue rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs font-medium text-spiritual-blue">Wisdom</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs font-medium text-spiritual-blue">Guidance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-sacred-gold rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs font-medium text-spiritual-blue">Healing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The 16 Major Odu */}
        <Card className="border-sacred-gold/10">
          <CardContent className="p-6">
            <h3 className="font-crimson text-lg font-semibold text-spiritual-blue mb-4">
              The 16 Major Odu
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              The Odu are the sacred verses of Ifá, containing wisdom, stories, and guidance for every aspect of life. Each Odu has its own unique energy and message.
            </p>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {odus.map((odu) => (
                  <div key={odu.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-crimson font-semibold text-spiritual-blue">
                          {odu.name}
                        </h4>
                        <p className="text-sm text-gray-600">{odu.subtitle}</p>
                      </div>
                      <OduPattern pattern={odu.pattern} className="ml-4" />
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">
                      {odu.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {odu.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-spiritual-blue/10 text-spiritual-blue text-xs rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card className="border-sacred-gold/10">
          <CardContent className="p-6">
            <h3 className="font-crimson text-lg font-semibold text-spiritual-blue mb-4">
              How to Use Daily Readings
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sacred-gold rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-spiritual-blue">Morning Reflection</h4>
                  <p className="text-sm text-gray-600">
                    Read your daily Odu each morning to set intentions and receive guidance for the day ahead.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sacred-gold rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-spiritual-blue">Contemplate the Message</h4>
                  <p className="text-sm text-gray-600">
                    Spend time thinking about how the Odu's wisdom applies to your current situation and challenges.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sacred-gold rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-spiritual-blue">Apply the Guidance</h4>
                  <p className="text-sm text-gray-600">
                    Take practical steps based on the Odu's guidance throughout your day.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sacred-gold rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-spiritual-blue">Evening Reflection</h4>
                  <p className="text-sm text-gray-600">
                    Reflect on how the day's events connected to your morning reading and what you learned.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Respect and Understanding */}
        <Card className="bg-gradient-to-r from-sage-green/10 to-sacred-gold/10 border-sage-green/20">
          <CardContent className="p-6">
            <h3 className="font-crimson text-lg font-semibold text-spiritual-blue mb-3">
              Approaching Ifá with Respect
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Ifá is a sacred tradition that should be approached with respect, humility, and an open heart. These daily readings are meant to provide guidance and inspiration while honoring the deep wisdom of this ancient spiritual practice.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
