import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LearningSimple() {
  const { language, t: ts } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-spiritual-blue/20 backdrop-blur-sm rounded-full">
              <GraduationCap className="h-16 w-16 text-spiritual-blue" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-spiritual-blue dark:text-sacred-gold">
            {ts("Orisha Learning Academy", "Ilé-ẹ̀kọ́ Òrìṣà")}
          </h1>
          
          <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400 mb-8">
            {ts(
              "Master authentic Yoruba traditions through personalized learning paths",
              "Mọ àwọn àṣà Yorùbá òtítọ́ nípa àwọn ọ̀nà ẹ̀kọ́ ti ara rẹ"
            )}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-spiritual-blue dark:text-sacred-gold">
                🎯 {ts("Learning Paths", "Àwọn Ọ̀nà Ẹ̀kọ́")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600 mb-2">5</div>
              <p className="text-gray-600 dark:text-gray-400">
                {ts("Available Orisha paths", "Àwọn ọ̀nà Òrìṣà tó wà")}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-spiritual-blue dark:text-sacred-gold">
                ⭐ {ts("Authentic Audio", "Ohùn Òtítọ́")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <p className="text-gray-600 dark:text-gray-400">
                {ts("Genuine recordings", "Gbóhùn gidi")}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-spiritual-blue dark:text-sacred-gold">
                🏆 {ts("Achievements", "Àwọn Àṣeyọrí")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600 mb-2">5</div>
              <p className="text-gray-600 dark:text-gray-400">
                {ts("Badge types available", "Oríṣìí àmì àṣeyọrí")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Available Orishas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-spiritual-blue dark:text-sacred-gold">
            {ts("Available Learning Paths", "Àwọn Ọ̀nà Ẹ̀kọ́ Tó Wà")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Olókun", nameYoruba: "Olókun", icon: "🌊", description: "Ocean deity of wisdom" },
              { name: "Ọya", nameYoruba: "Ọya", icon: "💨", description: "Wind goddess of transformation" },
              { name: "Yemọja", nameYoruba: "Yemọja", icon: "🌊", description: "Mother of waters" },
              { name: "Ọ̀ṣun", nameYoruba: "Ọ̀ṣun", icon: "💖", description: "River goddess of love" },
              { name: "Ọbàtálá", nameYoruba: "Ọbàtálá", icon: "🤍", description: "Creator of humanity" }
            ].map((orisha) => (
              <Card key={orisha.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{orisha.icon}</div>
                    <div>
                      <CardTitle className="text-lg">
                        {language === 'yoruba' ? orisha.nameYoruba : orisha.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {orisha.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    {ts("Start Learning", "Bẹ̀rẹ̀ Ẹ̀kọ́")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 bg-gradient-to-r from-spiritual-blue to-sacred-gold rounded-lg text-white">
          <h2 className="text-3xl font-bold mb-4">
            {ts("Ready to Begin?", "Ṣe o ti ṣetan láti bẹ̀rẹ̀?")}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {ts("Choose your first learning path and start your spiritual journey", "Yan ọ̀nà ẹ̀kọ́ àkọ́kọ́ rẹ kí o sì bẹ̀rẹ̀ ìrìn àjò ẹ̀mí rẹ")}
          </p>
          <Button size="lg" className="bg-white text-spiritual-blue hover:bg-gray-100">
            {ts("Get Started", "Bẹ̀rẹ̀")}
          </Button>
        </div>
      </div>
    </div>
  );
}