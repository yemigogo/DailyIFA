import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  BookOpen, 
  Award, 
  Zap, 
  Volume2, 
  CheckCircle,
  PlayCircle,
  GraduationCap,
  Target,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import OrishaLearningPath from "@/components/orisha-learning-path";

export default function Learning() {
  const { language, t: ts } = useLanguage();
  const [userId] = useState("user-demo"); // Demo user ID

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-spiritual-blue to-sacred-gold text-white py-16">
        <div className="container-responsive">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <GraduationCap className="h-16 w-16" />
              </div>
            </div>
            
            <h1 className="text-responsive-4xl font-bold mb-4">
              {ts("Orisha Learning Academy", "Ilé-ẹ̀kọ́ Òrìṣà")}
            </h1>
            
            <p className="text-responsive-xl max-w-3xl mx-auto opacity-90">
              {ts(
                "Master authentic Yoruba traditions through personalized learning paths, earn achievement badges, and connect with centuries-old wisdom",
                "Mọ àwọn àṣà Yorùbá òtítọ́ nípa àwọn ọ̀nà ẹ̀kọ́ ti ara rẹ, gba àwọn àmì àṣeyọrí, kí o sì so mọ́ ọgbọ́n ọgọ́rùn-ún ọdún"
              )}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2">
                ⭐ {ts("5 Authentic Recordings", "5 Gbóhùn Òtítọ́")}
              </Badge>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2">
                🏆 {ts("Achievement System", "Ètò Àṣeyọrí")}
              </Badge>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2">
                📚 {ts("Personalized Paths", "Àwọn Ọ̀nà Ti Ara Rẹ")}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="py-16">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-responsive-3xl font-bold text-spiritual-blue dark:text-sacred-gold mb-4">
              {ts("Learning Features", "Àwọn Ẹ̀yà Ẹ̀kọ́")}
            </h2>
            <p className="text-responsive-lg text-gray-600 dark:text-gray-400">
              {ts("Comprehensive tools for authentic Yoruba spiritual education", "Àwọn ohun èlò tó pé fún ẹ̀kọ́ ẹ̀mí Yorùbá òtítọ́")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <Volume2 className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-responsive-lg">
                  {ts("Authentic Audio", "Ohùn Òtítọ́")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-responsive-sm text-gray-600 dark:text-gray-400">
                  {ts("Learn proper pronunciation from genuine Nigerian Yoruba speakers", "Kọ́ sísọ tó tọ́ lọ́wọ́ àwọn onísọ̀rọ̀ Yorùbá Nàìjíríà gidi")}
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
              <CardHeader className="pb-3">
                <Target className="h-8 w-8 text-emerald-500 mb-2" />
                <CardTitle className="text-responsive-lg">
                  {ts("Personalized Paths", "Àwọn Ọ̀nà Ti Ara Rẹ")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-responsive-sm text-gray-600 dark:text-gray-400">
                  {ts("Customized learning journeys for each Orisha based on your interests", "Àwọn ìrìn àjò ẹ̀kọ́ tí a ṣàtòpọ̀ fún Òrìṣà kọ̀ọ̀kan tó dá lórí ìfẹ́ rẹ")}
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-500">
              <CardHeader className="pb-3">
                <Award className="h-8 w-8 text-amber-500 mb-2" />
                <CardTitle className="text-responsive-lg">
                  {ts("Achievement Badges", "Àwọn Àmì Àṣeyọrí")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-responsive-sm text-gray-600 dark:text-gray-400">
                  {ts("Earn recognition for milestones and mastery of spiritual knowledge", "Gba ìmọ̀ fún àwọn ààmì àkọ́kọ́ àti ìmọ̀ ẹ̀mí")}
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <Sparkles className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle className="text-responsive-lg">
                  {ts("Progress Tracking", "Àtẹ̀lé Ìlọsíwájú")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-responsive-sm text-gray-600 dark:text-gray-400">
                  {ts("Monitor your spiritual education journey with detailed analytics", "Tọ́jú ìrìn àjò ẹ̀kọ́ ẹ̀mí rẹ pẹ̀lú àlàyé ìsọfúnni")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Learning Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardHeader>
                <PlayCircle className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-responsive-xl text-blue-700 dark:text-blue-300">
                  {ts("Pronunciation Mastery", "Gígùn Sísọ")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {ts("Practice authentic Yoruba pronunciation with native speaker recordings", "Se àdáṣe sísọ Yorùbá òtítọ́ pẹ̀lú gbóhùn àwọn onílẹ̀")}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• {ts("Tonal accuracy training", "Ẹ̀kọ́ òtítọ́ ohùn")}</li>
                  <li>• {ts("Interactive pronunciation guide", "Ìtọ́nisọ́nà sísọ àjọṣepọ̀")}</li>
                  <li>• {ts("Audio comparison tools", "Àwọn ohun èlò àfiwéra ohùn")}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle className="text-responsive-xl text-emerald-700 dark:text-emerald-300">
                  {ts("Cultural History", "Ìtàn Àṣà")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {ts("Discover the rich stories and traditions behind each Orisha", "Ṣàwárí àwọn ìtàn ọlọ́rọ̀ àti àṣà tó wà lẹ́yìn Òrìṣà kọ̀ọ̀kan")}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• {ts("Origin stories and myths", "Àwọn ìtàn ìpilẹ̀ṣẹ̀ àti àròsọ")}</li>
                  <li>• {ts("Cultural significance", "Pàtàkì àṣà")}</li>
                  <li>• {ts("Modern applications", "Àwọn ìlò òde òní")}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
              <CardHeader>
                <Zap className="h-12 w-12 text-amber-600 mb-4" />
                <CardTitle className="text-responsive-xl text-amber-700 dark:text-amber-300">
                  {ts("Spiritual Practice", "Ìṣe Ẹ̀mí")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {ts("Learn traditional rituals, prayers, and daily spiritual practices", "Kọ́ àwọn ìṣe àtìjọ́, àdúrà, àti àwọn ìṣe ẹ̀mí ojoojúmọ́")}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• {ts("Daily prayer cycles", "Àwọn àdúrà ojoojúmọ́")}</li>
                  <li>• {ts("Ritual preparations", "Àmúra ìṣe")}</li>
                  <li>• {ts("Meditation techniques", "Àwọn ọ̀nà ìṣàró")}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Learning Path Component */}
      <div className="py-8 bg-white dark:bg-gray-800">
        <OrishaLearningPath userId={userId} />
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-spiritual-blue to-sacred-gold text-white">
        <div className="container-responsive text-center">
          <h2 className="text-responsive-3xl font-bold mb-4">
            {ts("Start Your Spiritual Learning Journey", "Bẹ̀rẹ̀ Ìrìn Àjò Ẹ̀kọ́ Ẹ̀mí Rẹ")}
          </h2>
          <p className="text-responsive-lg opacity-90 mb-8 max-w-2xl mx-auto">
            {ts(
              "Choose your first Orisha learning path and begin earning achievements while mastering authentic Yoruba traditions",
              "Yan ọ̀nà ẹ̀kọ́ Òrìṣà àkọ́kọ́ rẹ kí o sì bẹ̀rẹ̀ gígba àwọn àṣeyọrí lákòókò tí o bá ń kọ́ àwọn àṣà Yorùbá òtítọ́"
            )}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-spiritual-blue hover:bg-gray-100 btn-touch">
              <Crown className="h-5 w-5 mr-2" />
              {ts("Begin Learning", "Bẹ̀rẹ̀ Ẹ̀kọ́")}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-spiritual-blue btn-touch">
              <CheckCircle className="h-5 w-5 mr-2" />
              {ts("View Achievements", "Wo Àwọn Àṣeyọrí")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}