import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface SimpleAudioPlayerProps {
  oduName: string;
  oduId: number;
}

export default function SimpleAudioPlayer({ oduName, oduId }: SimpleAudioPlayerProps) {
  const { ts } = useLanguage();

  return (
    <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300 line-through">
          🔇 {ts("Audio Pronunciation - DISABLED", "Àfọhùn - TI DÁ DÚRÓ")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 line-through">
            {oduName}
          </h3>
        </div>
        
        <div className="bg-red-100 dark:bg-red-900/40 p-4 rounded-lg border border-red-300 dark:border-red-700">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-3">
              <div className="text-red-800 dark:text-red-200 font-semibold">
                🚫 {ts("Audio Features Disabled", "Àwọn Ẹ̀yà Ohùn Ti Dá Dúró")}
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">
                {ts(
                  "Requires authentic Nigerian Yoruba speakers with cultural knowledge",
                  "A nílò àwọn abínibí Yorùbá Nàìjíríà pẹ̀lú ìmọ̀ àṣà"
                )}
              </div>
              <div className="text-xs text-red-600 dark:text-red-400 space-y-1">
                <div className="font-medium">
                  {ts("Required Qualifications:", "Àwọn Àdínwọ́n Tí A Nílò:")}
                </div>
                <ul className="list-disc list-inside space-y-0.5 ml-2">
                  <li>{ts("Native speakers from Southwest Nigeria", "Àwọn abínibí láti Gúúsù-Ìwọ̀-Oòrùn Nàìjíríà")}</li>
                  <li>{ts("Understanding of Ifá tradition", "Òye àṣà Ifá")}</li>
                  <li>{ts("Professional recording quality", "Ìgbóhùnsílẹ̀ tó ṣe déédé")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}