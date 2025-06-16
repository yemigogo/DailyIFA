import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Clock, Heart, Star } from "lucide-react";

interface DailyPrayer {
  id: number;
  dayOfWeek: number;
  dayName: string;
  dayNameYoruba: string;
  title: string;
  titleYoruba: string;
  prayer: string;
  prayerYoruba: string;
  meaning: string;
  meaningYoruba: string;
  blessing: string;
  blessingYoruba: string;
}

export default function DailyPrayers() {
  const { language, ts } = useLanguage();
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.

  const { data: prayers, isLoading } = useQuery<DailyPrayer[]>({
    queryKey: ["/api/prayers/all"],
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: todaysPrayer } = useQuery<DailyPrayer>({
    queryKey: ["/api/prayers/daily", today],
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950 dark:to-orange-950 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-2 text-amber-700 dark:text-amber-300">
              {ts("Loading daily prayers...", "Ń gbé àwọn àdúrà ojoojúmọ́...")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950 dark:to-orange-950 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100">
            {ts("Daily Ifá Prayers", "Àwọn Àdúrà Ifá Ojoojúmọ́")}
          </h1>
          <p className="text-amber-700 dark:text-amber-300">
            {ts(
              "Traditional prayers for each day of the week according to Ifá wisdom",
              "Àwọn àdúrà ìbílẹ̀ fún ọjọ́ kọ̀ọ̀kan nínú ọ̀sẹ̀ gẹ́gẹ́ bí ọgbọ́n Ifá"
            )}
          </p>
        </div>

        {/* Today's Prayer Highlight */}
        {todaysPrayer && (
          <Card className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 border-amber-300 dark:border-amber-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-amber-600" />
                <div>
                  <CardTitle className="text-amber-900 dark:text-amber-100">
                    {ts("Today's Prayer", "Àdúrà Òní")} - {language === "english" ? todaysPrayer.dayName : todaysPrayer.dayNameYoruba}
                  </CardTitle>
                  <CardDescription className="text-amber-700 dark:text-amber-300">
                    {language === "english" ? todaysPrayer.title : todaysPrayer.titleYoruba}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/50 dark:bg-amber-950/30 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                  <span className="text-lg">🙏</span>
                  {ts("Prayer (Àdúrà):", "Àdúrà:")}
                </h4>
                <p className="text-amber-800 dark:text-amber-200 italic leading-relaxed">
                  "{language === "english" ? todaysPrayer.prayer : todaysPrayer.prayerYoruba}"
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                  {ts("Meaning:", "Ìtumọ̀:")}
                </h4>
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  {language === "english" ? todaysPrayer.meaning : todaysPrayer.meaningYoruba}
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg">
                <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                  {ts("Blessing:", "Ìbùkún:")}
                </h4>
                <p className="text-amber-800 dark:text-amber-200 text-sm italic">
                  {language === "english" ? todaysPrayer.blessing : todaysPrayer.blessingYoruba}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Weekly Prayers */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            {ts("Weekly Prayer Guide", "Ìtọ́nisọ́nà Àdúrà Ọ̀sẹ̀")}
          </h2>
          
          <div className="grid gap-4">
            {prayers?.map((prayer) => (
              <Card 
                key={prayer.id} 
                className={`transition-all ${
                  prayer.dayOfWeek === today 
                    ? "ring-2 ring-amber-400 bg-amber-50 dark:bg-amber-950/50" 
                    : "bg-white dark:bg-amber-950"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-amber-900 dark:text-amber-100 flex items-center gap-3">
                        {language === "english" ? prayer.dayName : prayer.dayNameYoruba}
                        {prayer.dayOfWeek === today && (
                          <Badge variant="secondary" className="text-xs">
                            {ts("Today", "Òní")}
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-amber-700 dark:text-amber-300">
                        {language === "english" ? prayer.title : prayer.titleYoruba}
                      </CardDescription>
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        {language === "english" ? prayer.dayNameYoruba : prayer.dayName}
                      </p>
                    </div>
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                      {ts("Spiritual Meaning:", "Ìtumọ̀ Ẹ̀mí:")}
                    </h4>
                    <p className="text-amber-800 dark:text-amber-200 text-sm">
                      {language === "english" ? prayer.meaning : prayer.meaningYoruba}
                    </p>
                  </div>

                  <Separator className="bg-amber-200 dark:bg-amber-800" />

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      {ts("Prayer (Àdúrà):", "Àdúrà:")}
                    </h4>
                    <p className="text-amber-800 dark:text-amber-200 text-sm italic leading-relaxed">
                      "{language === "english" ? prayer.prayer : prayer.prayerYoruba}"
                    </p>
                  </div>

                  <div className="bg-amber-100 dark:bg-amber-900/40 p-3 rounded-lg">
                    <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                      {ts("Daily Blessing:", "Ìbùkún Ojoojúmọ́:")}
                    </h4>
                    <p className="text-amber-800 dark:text-amber-200 text-sm">
                      {language === "english" ? prayer.blessing : prayer.blessingYoruba}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-amber-600 dark:text-amber-400 py-4">
          {ts(
            "Recite these prayers with sincere intention and faith for spiritual guidance and protection",
            "Kigbe àwọn àdúrà wọ̀nyí pẹ̀lú ète òtítọ́ àti ìgbàgbọ́ fún ìtọ́nisọ́nà ẹ̀mí àti ààbò"
          )}
        </div>
      </div>
    </div>
  );
}