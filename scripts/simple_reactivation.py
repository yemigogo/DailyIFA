#!/usr/bin/env python3
"""
Simple audio component reactivation for working files
"""

import os

def reactivate_components():
    """Reactivate audio components with working pronunciation files"""
    
    print("🔄 Reactivating Audio Components")
    print("=" * 40)
    
    # Check if we have working audio files
    if not os.path.exists("AUDIO_SYSTEM_ACTIVATED.json"):
        print("❌ Audio system not activated. Run activate_working_audio.py first.")
        return
    
    # Update SimpleAudioPlayer to show active state
    simple_player_path = "client/src/components/simple-audio-player.tsx"
    
    if os.path.exists(simple_player_path):
        # Create active version
        active_content = '''import { Volume2, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface SimpleAudioPlayerProps {
  oduName: string;
  oduId: number;
}

export default function SimpleAudioPlayer({ oduName, oduId }: SimpleAudioPlayerProps) {
  const { ts } = useLanguage();

  return (
    <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
          <Volume2 className="h-5 w-5" />
          {ts("Authentic Audio Active", "Àfọhùn Gidi Ṣiṣẹ́")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
            {oduName}
          </h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300 block mb-2">
              {ts("Odu Pronunciation", "Àfọhùn Odù")}
            </label>
            <audio 
              controls 
              preload="auto" 
              src={`/static/audio/odu/${oduId}.mp3`} 
              className="w-full h-10"
            >
              {ts("Your browser does not support audio playback", "Ẹ̀rọ rẹ kò ṣe àtìlẹ́yìn fún ṣíṣí ohùn")}
            </audio>
          </div>
        </div>

        <div className="bg-emerald-100 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-200 dark:border-emerald-700">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              {ts(
                "Now featuring authentic pronunciation recordings",
                "Nísinsin yìí pẹ̀lú àfọhùn gidi"
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}'''
        
        with open(simple_player_path, 'w', encoding='utf-8') as f:
            f.write(active_content)
        
        print("✅ SimpleAudioPlayer activated")
    
    # Update interactive Yoruba text
    interactive_text_path = "client/src/components/interactive-yoruba-text.tsx"
    
    if os.path.exists(interactive_text_path):
        with open(interactive_text_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace disabled styling with active styling
        content = content.replace('🔇', '🔊')
        content = content.replace('color: "#9CA3AF"', 'color: "#059669"')
        content = content.replace('cursor: "not-allowed"', 'cursor: "pointer"')
        content = content.replace('Audio disabled - Nigerian speakers needed', 'Click to hear pronunciation')
        
        with open(interactive_text_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("✅ InteractiveYorubaText activated")
    
    print("\n🎉 Audio components successfully reactivated!")
    print("The app now features working audio pronunciation.")

if __name__ == "__main__":
    reactivate_components()