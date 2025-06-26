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
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-2">
                <span className="text-lg">🔊</span>
                {ts(
                  "Click on any highlighted Yoruba word to hear its pronunciation!",
                  "Tẹ eyikeyi ọ̀rọ̀ Yorùbá tí a fojú hàn láti gbọ́ bí a ṣe ń kà á!"
                )}
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                {ts(
                  "Look for the speaker icon (🔊) next to Yoruba words",
                  "Wá fún àmì agbohùnsọ (🔊) lẹ́gbẹ̀ẹ́ àwọn ọ̀rọ̀ Yorùbá"
                )}
              </p>
            </div>
          </div>
        </InteractiveYorubaText>
      </CardContent>
    </Card>
  );
}