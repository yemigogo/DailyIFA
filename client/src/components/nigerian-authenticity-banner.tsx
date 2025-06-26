import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NigerianAuthenticityBannerProps {
  className?: string;
}

export default function NigerianAuthenticityBanner({ className = "" }: NigerianAuthenticityBannerProps) {
  const { ts } = useLanguage();

  return (
    <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-2">
          <h3 className="font-semibold text-red-800 dark:text-red-200">
            🔇 {ts(
              "Audio Features Disabled - Nigerian Authenticity Required",
              "Àwọn Ẹ̀yà Ohùn Ti Dá Dúró - A Nílò Àṣà Nàìjíríà Gidi"
            )}
          </h3>
          
          <p className="text-sm text-red-700 dark:text-red-300">
            {ts(
              "All Yoruba pronunciation features are intentionally disabled until authentic recordings from native Nigerian speakers are obtained.",
              "Gbogbo àwọn ẹ̀yà ìpè Yorùbá ti dá dúró mọ́mọ́ títí a yóò fi rí àwọn gbóhùngbohùn gidi láti ọ̀dọ̀ àwọn abínibí Nàìjíríà."
            )}
          </p>
          
          <div className="text-xs text-red-600 dark:text-red-400 space-y-1">
            <div className="font-medium">
              {ts("Required Qualifications:", "Àwọn Àdínwọ́n Tí A Nílò:")}
            </div>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>{ts("Native speakers from Southwest Nigeria (Lagos, Oyo, Ogun, Osun states)", "Àwọn abínibí láti Gúúsù-Ìwọ̀-Oòrùn Nàìjíríà")}</li>
              <li>{ts("Understanding of Ifá tradition and Orisha worship", "Òye àṣà Ifá àti ìbọ̀rìṣà")}</li>
              <li>{ts("Cultural context for spiritual terminology", "Àyíká àṣà fún àwọn ọ̀rọ̀ ẹ̀mí")}</li>
              <li>{ts("Professional recording quality", "Ìgbóhùnsílẹ̀ tó ṣe déédé")}</li>
            </ul>
          </div>
          
          <div className="pt-2 border-t border-red-200 dark:border-red-700">
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
              {ts(
                "This approach prioritizes cultural authenticity over technical functionality.",
                "Ọ̀nà yìí fi àṣà gidi ṣáájú ìṣẹ́ ẹ̀rọ."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}