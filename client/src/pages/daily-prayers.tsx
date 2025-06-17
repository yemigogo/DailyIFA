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

        {/* Prayer Reflection Section */}
        <div className="py-8 border-t border-amber-200 dark:border-amber-800">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-6 text-center flex items-center justify-center gap-2">
              <Star className="h-6 w-6" />
              {ts("Prayer Reflection", "Ìrònú Àdúrà")}
            </h3>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-amber-800 dark:text-amber-200 text-center font-medium mb-8">
                {ts(
                  "Contemplate these questions to deepen your understanding of daily prayer practice and strengthen your spiritual connection:",
                  "Rò àwọn ìbéèrè wọ̀nyí láti jín sí òye ìṣe àdúrà ojoojúmọ́ àti mú ìdàpọ̀ ẹ̀mí rẹ lágbára:"
                )}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="space-y-4">
                  <div className="bg-white dark:bg-amber-950/50 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
                      {ts("Personal Practice", "Ìṣe Ti Ara Ẹni")}
                    </h4>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                          {ts("Q: How can daily prayer transform your spiritual life?", "Ì: Báwo ni àdúrà ojoojúmọ́ ṣe lè yí ìgbé ayé ẹ̀mí rẹ padà?")}
                        </p>
                        <p className="text-amber-700 dark:text-amber-300 italic">
                          {ts(
                            "A: Daily prayer creates a sacred rhythm that aligns your spirit with divine wisdom. Like the consistent rising of the sun, regular communication with Òrúnmìlà brings stability, guidance, and spiritual growth to every aspect of your life.",
                            "I: Àdúrà ojoojúmọ́ ṣẹ̀dá àtẹ̀gùn mímọ́ tí ó ṣe ẹ̀mí rẹ dọ́gba pẹ̀lú ọgbọ́n ọlọ́run. Gẹ́gẹ́ bí ìyọ̀ òòrùn tí ó ń dìde déédéé, ìbánisọ̀rọ̀ déédéé pẹ̀lú Òrúnmìlà mú ìdúróṣinṣin, ìtọ́nisọ́nà, àti ìdàgbàsókè ẹ̀mí wá sí gbogbo ẹ̀yà ìgbé ayé rẹ."
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                          {ts("Q: What is the significance of praying in Yoruba?", "Ì: Kí ni ìtumọ̀ àdúrà ní èdè Yorùbá?")}
                        </p>
                        <p className="text-amber-700 dark:text-amber-300 italic">
                          {ts(
                            "A: Yoruba is the sacred language that carries the ancestral power and cultural essence of Ifá tradition. Praying in Yoruba connects you directly to the spiritual vibrations of your ancestors and activates the ancient wisdom embedded in each word.",
                            "I: Yorùbá ni èdè mímọ́ tí ó gbé agbára àwọn baba ńlá àti ẹ̀mí àṣà àṣà Ifá. Àdúrà ní èdè Yorùbá so ọ́ taara mọ́ ìgbọ̀n ẹ̀mí àwọn baba ńlá rẹ ó sì mú ọgbọ́n àtijọ́ tí ó wà nínú ọ̀rọ̀ kọ̀ọ̀kan ṣiṣẹ́."
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-amber-950/50 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
                      {ts("Spiritual Understanding", "Òye Ẹ̀mí")}
                    </h4>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                          {ts("Q: How do the different days connect to spiritual energies?", "Ì: Báwo ni àwọn ọjọ́ tó yàtọ̀ ṣe ń darapọ̀ mọ́ àwọn agbára ẹ̀mí?")}
                        </p>
                        <p className="text-amber-700 dark:text-amber-300 italic">
                          {ts(
                            "A: Each day carries unique spiritual frequencies that influence our consciousness. From Sunday's divine light to Saturday's ancestral wisdom, understanding these energies helps you align your prayers with cosmic rhythms for maximum spiritual benefit.",
                            "I: Ọjọ́ kọ̀ọ̀kan ní àwọn ìgbọ̀n ẹ̀mí àkànṣe tí ó ń ní ipa lórí àǹfààní wa. Láti ìmọ́lẹ̀ ọlọ́run ọjọ́ Àìkú dé ọgbọ́n àwọn baba ńlá ọjọ́ Àbámẹ́ta, òye àwọn agbára yìí ràn ọ́ lọ́wọ́ láti ṣe àwọn àdúrà rẹ dọ́gba pẹ̀lú àtẹ̀gùn àgbáyé fún àǹfààní ẹ̀mí tó pọ̀ jùlọ."
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                          {ts("Q: What role does intention play in prayer effectiveness?", "Ì: Kí ni ipò tí ète ń kó nínú ìmúṣẹ àdúrà?")}
                        </p>
                        <p className="text-amber-700 dark:text-amber-300 italic">
                          {ts(
                            "A: Intention is the spiritual fuel that gives life to your prayers. When you pray with pure heart, focused mind, and sincere purpose, you create a powerful bridge between your soul and divine consciousness, allowing miracles to manifest.",
                            "I: Ète ni epo ẹ̀mí tí ó fún àdúrà rẹ ní ẹ̀mí. Nígbà tí o bá dúró àdúrà pẹ̀lú ọkàn mímọ́, ọkàn tí ó ṣojú ọkàn, àti ète òtítọ́, o ṣẹ̀dá àkójọpọ̀ alágbára láàrin ọkàn rẹ àti àǹfààní ọlọ́run, tí ó jẹ́ kí àwọn iṣẹ́ ìyanu ṣẹ."
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <div className="bg-white dark:bg-amber-950/50 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
                      {ts("Community & Heritage", "Àgbègbè àti Ọ̀rọ̀")}
                    </h4>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                          {ts("Q: How do daily prayers connect you to your Yoruba heritage?", "Ì: Báwo ni àdúrà ojoojúmọ́ ṣe ń so ọ́ pọ̀ mọ́ ọ̀rọ̀ Yorùbá rẹ?")}
                        </p>
                        <p className="text-amber-700 dark:text-amber-300 italic">
                          {ts(
                            "A: Daily prayers are threads that weave you into the fabric of Yoruba spiritual heritage. Each prayer connects you to millions of ancestors who used these same words, creating an unbroken chain of spiritual continuity across generations.",
                            "I: Àdúrà ojoojúmọ́ jẹ́ okùn tí ó hun ọ́ sínú aṣọ ọ̀rọ̀ ẹ̀mí Yorùbá. Àdúrà kọ̀ọ̀kan so ọ́ pọ̀ mọ́ ọ̀kẹ́ mẹ́ta àwọn baba ńlá tí wọ́n lo àwọn ọ̀rọ̀ kannáà, tí ó ṣẹ̀dá ẹ̀wọ̀n ìtẹ̀síwájú ẹ̀mí tí kò gbẹ́ ní àárín àwọn ìran."
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                          {ts("Q: What blessings come from consistent prayer practice?", "Ì: Àwọn ìbùkún wo ni ó ti ìṣe àdúrà déédéé wá?")}
                        </p>
                        <p className="text-amber-700 dark:text-amber-300 italic">
                          {ts(
                            "A: Consistent prayer brings divine protection, spiritual clarity, emotional balance, and material prosperity. Most importantly, it develops your relationship with Òrúnmìlà, opening pathways for wisdom, healing, and divine favor in all endeavors.",
                            "I: Àdúrà déédéé mú ààbò ọlọ́run, ìmọ́ ẹ̀mí, ìdọ̀gbà ẹ̀dùn, àti ọrọ̀ ayé wá. Ìpàtàkì jùlọ, ó mú ìbáṣepọ̀ rẹ pẹ̀lú Òrúnmìlà dàgbàsókè, tí ó ṣí àwọn ọnà fún ọgbọ́n, ìwòsàn, àti ojúrere ọlọ́run nínú gbogbo iṣẹ́."
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-amber-950/50 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
                      {ts("Practical Application", "Ìlò Gidi")}
                    </h4>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                          {ts("Q: When is the best time to recite daily prayers?", "Ì: Ìgbà wo ni ó dára jùlọ láti ka àdúrà ojoojúmọ́?")}
                        </p>
                        <p className="text-amber-700 dark:text-amber-300 italic">
                          {ts(
                            "A: Dawn is traditionally the most powerful time, when the veil between physical and spiritual worlds is thinnest. However, consistency matters more than timing - choose a time you can maintain daily with dedication and reverence.",
                            "I: Àfẹ̀mọ́júmọ́ ni àkókò tó lágbára jùlọ ní àṣà, nígbà tí aṣọ láàrin àgbáyé àti àyè ẹ̀mí tinú jùlọ. Síbẹ̀síbẹ̀, ìbámu ṣe pàtàkì ju àkókò lọ - yan àkókò tí o lè máa ṣe ojoojúmọ́ pẹ̀lú ìfarabalẹ̀ àti ọlá."
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                          {ts("Q: How should you prepare your heart for prayer?", "Ì: Báwo ni o ṣe gbọ́dọ̀ múra ọkàn rẹ sílẹ̀ fún àdúrà?")}
                        </p>
                        <p className="text-amber-700 dark:text-amber-300 italic">
                          {ts(
                            "A: Begin with gratitude, cleanse your mind of worldly concerns, and approach with humility and respect. Light a candle or incense if possible, creating sacred space that honors the divine presence you're inviting into your life.",
                            "I: Bẹ̀rẹ̀ pẹ̀lú ọpẹ́, fọ ọkàn rẹ mọ́ kúrò lára àwọn àníyàn ayé, kí o sì súnmọ́ pẹ̀lú ìrẹ̀lẹ̀ àti ọlá. Tan fìtílà tàbí tùràrí bí ó bá ṣe é ṣe, kí o ṣẹ̀dá aáyè mímọ́ tí ó bu ọlá fún ìwàsí ọlọ́run tí o ń pè sínú ìgbé ayé rẹ."
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                <p className="text-amber-900 dark:text-amber-100 font-medium italic">
                  {ts(
                    "\"Àdúrà ní kókó ẹ̀mí\" - Prayer is the essence of spirituality. Through daily communion with Òrúnmìlà, we align our lives with divine purpose and ancestral wisdom.",
                    "\"Àdúrà ní kókó ẹ̀mí\" - Àdúrà ni kókó ẹ̀mí. Nípasẹ̀ ìbánisọ̀rọ̀ ojoojúmọ́ pẹ̀lú Òrúnmìlà, a ṣe ìgbé ayé wa dọ́gba pẹ̀lú ète ọlọ́run àti ọgbọ́n àwọn baba ńlá."
                  )}
                </p>
              </div>
            </div>
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