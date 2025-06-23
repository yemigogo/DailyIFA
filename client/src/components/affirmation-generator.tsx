import { useState } from "react";
import { Sparkles, RefreshCw, Heart, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface AffirmationGeneratorProps {
  currentOdu?: {
    name: string;
    nameYoruba: string;
    message: string;
    messageYoruba: string;
  };
}

const affirmationTemplates = {
  1: { // Ogbe Meji
    english: [
      "I am a vessel of divine light and clarity",
      "Wisdom flows through me like pure water",
      "I illuminate every path I walk",
      "My mind is clear, my purpose is divine"
    ],
    yoruba: [
      "Èmi ni ohun èlò ìmọ́lẹ̀ Ọlọ́run",
      "Ọgbọ́n ń sàn gba mi bíi omi mímọ́",
      "Mo ń tan ìmọ́lẹ̀ sí gbogbo ọ̀nà tí mo rìn",
      "Ọkàn mi mọ́, èrò mi sì jẹ́ ti Ọlọ́run"
    ]
  },
  2: { // Oyeku Meji
    english: [
      "I embrace the wisdom hidden in darkness",
      "I am protected by ancestral strength",
      "My inner light shines through all challenges",
      "I transform obstacles into stepping stones"
    ],
    yoruba: [
      "Mo gba ọgbọ́n tí ó pamọ́ nínú òkùnkùn",
      "Agbára àwọn baba ń dààbò bò mí",
      "Ìmọ́lẹ̀ inú mi ń tan láàrín gbogbo ìdojúkọ",
      "Mo ń yí àwọn ìdènà padà sí àtẹ̀gùn"
    ]
  },
  3: { // Iwori Meji
    english: [
      "My character is my greatest treasure",
      "I grow stronger through every experience",
      "Wisdom guides my words and actions",
      "I am patient and understanding with others"
    ],
    yoruba: [
      "Ìwà mi ni ìṣúra mi tó tóbi jù",
      "Mo ń túbọ̀ lágbára nípasẹ̀ gbogbo ìrírí",
      "Ọgbọ́n ń darí ọ̀rọ̀ àti iṣẹ́ mi",
      "Mo ní sùúrù, mo sì ní ìmòye fún àwọn ẹlòmíràn"
    ]
  },
  4: { // Odi Meji
    english: [
      "I build my life on solid foundations",
      "Success flows to me naturally",
      "I am grounded in truth and integrity",
      "My efforts create lasting prosperity"
    ],
    yoruba: [
      "Mo ń kọ́ ayé mi lórí ìpìlẹ̀ tó dára",
      "Àṣeyọrí ń wá sọ́dọ̀ mi lọ́nà àdáyébá",
      "Mo dúró lórí òtítọ́ àti òdodo",
      "Àkànṣe mi ń dá ọrọ̀ tó dúró pẹ́"
    ]
  },
  5: { // Irosun Meji
    english: [
      "Love heals all wounds in my heart",
      "I radiate peace and compassion",
      "My inner light brings comfort to others",
      "I am worthy of love and happiness"
    ],
    yoruba: [
      "Ìfẹ́ ń wo gbogbo ọgbẹ́ ọkàn mi sàn",
      "Mo ń tan àlàáfíà àti àánú",
      "Ìmọ́lẹ̀ inú mi ń mú ìtùnú wá fún àwọn ẹlòmíràn",
      "Mo yẹ fún ìfẹ́ àti ìdùnnú"
    ]
  },
  6: { // Owonrin Meji
    english: [
      "I embrace change as a gift from the divine",
      "I am flexible like water, strong like stone",
      "Every ending brings a beautiful beginning",
      "I trust the process of transformation"
    ],
    yoruba: [
      "Mo gba àyípadà gẹ́gẹ́ bíi ẹ̀bùn láti ọ̀dọ̀ Ọlọ́run",
      "Mo rọ bíi omi, mo sì lágbára bíi òkúta",
      "Gbogbo ìparí ń mú ìbẹ̀rẹ̀ tó lẹ́wà wá",
      "Mo gbẹ́kẹ̀lé ìlànà àyípadà"
    ]
  }
};

export default function AffirmationGenerator({ currentOdu }: AffirmationGeneratorProps) {
  const [currentAffirmation, setCurrentAffirmation] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { ts, language } = useLanguage();
  const { toast } = useToast();

  const generateAffirmation = () => {
    setIsGenerating(true);
    
    // Simulate generation time
    setTimeout(() => {
      if (currentOdu) {
        // Use current Odu's ID to get specific affirmations
        const oduId = getOduId(currentOdu.name);
        const templates = affirmationTemplates[oduId as keyof typeof affirmationTemplates];
        
        if (templates) {
          const englishAffirmations = templates.english;
          const yorubaAffirmations = templates.yoruba;
          const randomIndex = Math.floor(Math.random() * englishAffirmations.length);
          
          setCurrentAffirmation({
            english: englishAffirmations[randomIndex],
            yoruba: yorubaAffirmations[randomIndex],
            oduName: currentOdu.name,
            oduNameYoruba: currentOdu.nameYoruba
          });
        } else {
          // Generic affirmation
          setCurrentAffirmation({
            english: "I am aligned with divine wisdom and purpose",
            yoruba: "Mo wà ní ìbámu pẹ̀lú ọgbọ́n àti ète Ọlọ́run",
            oduName: currentOdu.name,
            oduNameYoruba: currentOdu.nameYoruba
          });
        }
      } else {
        // Random affirmation from all available
        const allAffirmations = Object.values(affirmationTemplates);
        const randomOdu = allAffirmations[Math.floor(Math.random() * allAffirmations.length)];
        const randomIndex = Math.floor(Math.random() * randomOdu.english.length);
        
        setCurrentAffirmation({
          english: randomOdu.english[randomIndex],
          yoruba: randomOdu.yoruba[randomIndex],
          oduName: "Universal Wisdom",
          oduNameYoruba: "Ọgbọ́n Gbogbogbò"
        });
      }
      
      setIsGenerating(false);
    }, 1000);
  };

  const getOduId = (oduName: string): number => {
    const oduMap: { [key: string]: number } = {
      "Ogbe Meji": 1,
      "Oyeku Meji": 2,
      "Iwori Meji": 3,
      "Odi Meji": 4,
      "Irosun Meji": 5,
      "Owonrin Meji": 6
    };
    return oduMap[oduName] || 1;
  };

  const copyAffirmation = () => {
    if (currentAffirmation) {
      const text = language === "english" 
        ? currentAffirmation.english 
        : currentAffirmation.yoruba;
      
      navigator.clipboard.writeText(text).then(() => {
        toast({
          title: ts("Copied!", "Ti Daakọ!"),
          description: ts("Affirmation copied to clipboard", "Ti daakọ àfọ̀mọ́ sí clipboard"),
        });
      });
    }
  };

  return (
    <Card className="border-amber-200 dark:border-amber-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
          <Sparkles className="h-5 w-5" />
          {ts("Personal Affirmation Generator", "Ẹ̀rọ Ìdá Àfọ̀mọ́ Ti Ara Ẹni")}
        </CardTitle>
        <p className="text-sm text-amber-700 dark:text-amber-300">
          {ts("Generate personalized affirmations based on Odu wisdom", "Ṣẹ̀dá àfọ̀mọ́ ti ara ẹni tó dá lórí ọgbọ́n Odù")}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentOdu && (
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100">
              {currentOdu.name}
            </Badge>
            <span>{ts("Based on today's Odu", "Dá lórí Odù òní")}</span>
          </div>
        )}

        <div className="text-center">
          <Button
            onClick={generateAffirmation}
            disabled={isGenerating}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                {ts("Generating...", "Ń Ṣẹ̀dá...")}
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                {ts("Generate Affirmation", "Ṣẹ̀dá Àfọ̀mọ́")}
              </>
            )}
          </Button>
        </div>

        {currentAffirmation && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-700">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Heart className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                    {ts("Your Personal Affirmation", "Àfọ̀mọ́ Ti Ara Rẹ")}
                  </span>
                </div>
                
                <blockquote className="text-lg font-medium text-amber-900 dark:text-amber-100 leading-relaxed">
                  "{language === "english" ? currentAffirmation.english : currentAffirmation.yoruba}"
                </blockquote>
                
                {language === "english" && (
                  <p className="text-sm text-amber-600 dark:text-amber-400 italic">
                    {currentAffirmation.yoruba}
                  </p>
                )}
                
                <div className="flex items-center justify-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                  <span>{ts("Inspired by", "Àtilẹ́yìn láti ọ̀dọ̀")}</span>
                  <Badge variant="outline" size="sm">
                    {currentAffirmation.oduNameYoruba}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <Button
                onClick={copyAffirmation}
                variant="outline"
                size="sm"
                className="border-amber-300"
              >
                <Copy className="h-4 w-4 mr-2" />
                {ts("Copy", "Daakọ")}
              </Button>
              
              <Button
                onClick={generateAffirmation}
                variant="outline"
                size="sm"
                className="border-amber-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {ts("New One", "Tuntun")}
              </Button>
            </div>
          </div>
        )}

        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
          <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
            {ts("How to Use Affirmations", "Bí A Ti Ń Lo Àfọ̀mọ́")}
          </h4>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• {ts("Repeat daily, especially in the morning", "Sọ ojoojúmọ́, paapàa ní òwúrọ̀")}</li>
            <li>• {ts("Speak with conviction and belief", "Sọ pẹ̀lú ìgbàgbọ́ àti ìdánilójú")}</li>
            <li>• {ts("Visualize the affirmation manifesting", "Wo àfọ̀mọ́ náà nínú ọkàn")}</li>
            <li>• {ts("Feel the positive energy flow through you", "Jẹ́ kí agbára rere sàn gba ọ")}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}