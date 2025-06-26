import InteractiveYorubaText from "./interactive-yoruba-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DemoInteractiveText() {
  const { ts } = useLanguage();

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <CardHeader>
        <CardTitle className="text-amber-800 dark:text-amber-200">
          {ts("Interactive Yoruba Text Demo", "Àpẹẹrẹ Ọ̀rọ̀ Yorùbá Tí Ó Ń Fèsì")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InteractiveYorubaText>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              The word <span className="yoruba-word" data-word="òrìṣà">òrìṣà</span> means deity or divine force in Yoruba tradition.
            </p>
            <p>
              In ifá divination, we seek guidance from òrúnmìlà, the òrìṣà of wisdom. 
              The sacred phrase àṣẹ is often spoken to confirm divine will.
            </p>
            <p>
              Traditional greetings include àlàáfíà (peace) and ìbùkún (blessing). 
              The ọba (king) and àgbà (elders) hold special respect in Yoruba culture.
            </p>
            <p className="text-sm text-amber-600 dark:text-amber-400 italic">
              {ts(
                "Click on any highlighted Yoruba word to hear its pronunciation!",
                "Tẹ eyikeyi ọ̀rọ̀ Yorùbá tí a fojú hàn láti gbọ́ bí a ṣe ń kà á!"
              )}
            </p>
          </div>
        </InteractiveYorubaText>
      </CardContent>
    </Card>
  );
}