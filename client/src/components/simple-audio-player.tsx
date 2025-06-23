import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface SimpleAudioPlayerProps {
  oduName: string;
  oduId: number;
}

export default function SimpleAudioPlayer({ oduName, oduId }: SimpleAudioPlayerProps) {
  const { ts } = useLanguage();

  return (
    <Card className="border-amber-200 dark:border-amber-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
          <Volume2 className="h-5 w-5" />
          {ts("Audio Pronunciation", "Àfọhùn")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
            {oduName}
          </h3>
        </div>
        
        {/* Direct HTML5 Audio Controls */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-amber-700 dark:text-amber-300 block mb-2">
              {ts("Yoruba Pronunciation", "Àfọhùn Yorùbá")}
            </label>
            <audio 
              controls 
              preload="auto" 
              src={`/audio/odu/${oduId}.mp3`} 
              className="w-full h-10"
            >
              {ts("Your browser does not support audio playback", "Ẹ̀rọ rẹ kò ṣe àtìlẹ́yìn fún ṣíṣí ohùn")}
            </audio>
          </div>
          
          <div>
            <label className="text-sm font-medium text-amber-700 dark:text-amber-300 block mb-2">
              {ts("Phonetic Guide", "Ìtọ́kasí Àfọhùn")}
            </label>
            <audio 
              controls 
              preload="auto" 
              src={`/audio/odu/${oduId}_phonetic.mp3`} 
              className="w-full h-10"
            >
              {ts("Your browser does not support audio playback", "Ẹ̀rọ rẹ kò ṣe àtìlẹ́yìn fún ṣíṣí ohùn")}
            </audio>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
          <p className="text-xs text-amber-700 dark:text-amber-300">
            {ts(
              "Click the play button to hear authentic Yoruba pronunciation of this sacred Odu",
              "Tẹ bọ́tìnì ìbẹ̀rẹ̀ láti gbọ́ àfọhùn Yorùbá gidi ti Odù mímọ́ yìí"
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}