import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Volume2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface YorubaPronunciationDemoProps {
  className?: string;
}

export default function YorubaPronunciationDemo({ className }: YorubaPronunciationDemoProps) {
  const [word, setWord] = useState("");
  const [status, setStatus] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const { ts } = useLanguage();

  // Common Yoruba words with their pronunciation guides
  const commonWords = [
    { word: "òrìṣà", meaning: "deity/divine force", pronunciation: "oh-ree-shah" },
    { word: "àṣẹ", meaning: "divine force/amen", pronunciation: "ah-shay" },
    { word: "ifá", meaning: "Yoruba divination system", pronunciation: "ee-fah" },
    { word: "ọdún", meaning: "year/festival", pronunciation: "oh-doon" },
    { word: "ìwòrì", meaning: "Odu name", pronunciation: "ee-woh-ree" },
    { word: "ẹjẹ́", meaning: "blood", pronunciation: "eh-jay" },
    { word: "ọmọ", meaning: "child", pronunciation: "oh-moh" },
    { word: "ilé", meaning: "house/home", pronunciation: "ee-lay" },
    { word: "owó", meaning: "money", pronunciation: "oh-woh" },
    { word: "ayé", meaning: "world/life", pronunciation: "ah-yay" },
    { word: "ọrun", meaning: "heaven/sky", pronunciation: "oh-roon" },
    { word: "àgbà", meaning: "elder", pronunciation: "ah-gbah" }
  ];

  const playPronunciation = async () => {
    const trimmedWord = word.trim();
    if (!trimmedWord) {
      setStatus(ts("Please enter a Yoruba word", "Jọ̀wọ́ fi ọ̀rọ̀ Yorùbá kan sí"));
      return;
    }

    setIsPlaying(true);
    setStatus(ts("Loading pronunciation...", "Ń gbe ìpè ohùn..."));

    // Direct mapping for authentic files
    const audioFiles: Record<string, string> = {
      'ṣàngó': 'sango.mp3',
      'sango': 'sango.mp3',
      'òrìṣà': 'orisa.mp3',
      'orisa': 'orisa.mp3',
      'àṣẹ': 'ase.mp3',
      'ase': 'ase.mp3',
      'ọ̀ṣun': 'osun.mp3',
      'osun': 'osun.mp3',
      'ọ̀rúnmìlà': 'orunmila.mp3',
      'orunmila': 'orunmila.mp3',
      'yemọja': 'yemoja.mp3',
      'yemoja': 'yemoja.mp3',
      'ifá': 'ifa.mp3',
      'ifa': 'ifa.mp3'
    };
    
    const audioSource = audioFiles[trimmedWord.toLowerCase()] 
      ? `/static/audio/pronunciation/${audioFiles[trimmedWord.toLowerCase()]}`
      : null;

    // Disable audio until authentic recordings are provided
    setStatus(ts(
      `Audio playback disabled - current files do not meet authentic African pronunciation standards. Awaiting genuine native speaker recordings.`,
      `Àwòrán ohùn ti dí kúrò - àwọn fáìlì tí ó wà báyìí kò bá ìlànà ìpè Yorùbá òtítọ́ mu. A ń dúró fún àwọn àmòhùn òdájú láti ọ̀dọ̀ àwọn afẹ̀dè ìbílẹ̀.`
    ));
    setIsPlaying(false);
    return;

    try {
      // Check if authentic pronunciation file exists
      const headResponse = await fetch(audioSource, { method: "HEAD" });
      
      if (!headResponse.ok) {
        setStatus(ts(
          `Authentic pronunciation not available for "${trimmedWord}". Check pronunciation mapping for available words.`,
          `Kò sí ìpè òtítọ́ fún "${trimmedWord}". Wo àtẹ ìpè fún àwọn ọ̀rọ̀ tí ó wà.`
        ));
        setIsPlaying(false);
        return;
      }
      
      // audioSource already set above
      const sourceType = "authentic Yoruba audio";

      // Find matching word info for display
      const matchedWord = commonWords.find(w => 
        w.word.toLowerCase() === trimmedWord.toLowerCase()
      );

      // Create and play audio
      const audio = new Audio(audioSource);
      
      audio.onloadeddata = () => {
        setStatus(ts(
          `Playing ${sourceType} pronunciation...`,
          `Ń ṣe ìpè ohùn ${sourceType}...`
        ));
      };

      audio.onended = () => {
        setIsPlaying(false);
        if (matchedWord) {
          setStatus(ts(
            `${matchedWord.word} (${matchedWord.pronunciation}) - ${matchedWord.meaning}`,
            `${matchedWord.word} (${matchedWord.pronunciation}) - ${matchedWord.meaning}`
          ));
        } else {
          setStatus(ts(
            `Played pronunciation for "${trimmedWord}"`,
            `Ti ṣe ìpè ohùn fún "${trimmedWord}"`
          ));
        }
      };

      audio.onerror = () => {
        setIsPlaying(false);
        if (matchedWord) {
          setStatus(ts(
            `Pronunciation guide: ${matchedWord.pronunciation} - ${matchedWord.meaning}`,
            `Ìtọ́kasí ìpè: ${matchedWord.pronunciation} - ${matchedWord.meaning}`
          ));
        } else {
          setStatus(ts(
            "Could not load audio. Click again to retry.",
            "Kò lè gbe ohùn. Tẹ padà láti gbìyànjú."
          ));
        }
      };

      await audio.play();

    } catch (error) {
      setIsPlaying(false);
      console.error("Pronunciation error:", error);
      
      const matchedWord = commonWords.find(w => 
        w.word.toLowerCase() === trimmedWord.toLowerCase()
      );
      
      if (matchedWord) {
        setStatus(ts(
          `Browser blocked audio. Pronunciation: ${matchedWord.pronunciation} - ${matchedWord.meaning}`,
          `Ẹ̀rọ ayélujára dá ohùn dúró. Ìpè: ${matchedWord.pronunciation} - ${matchedWord.meaning}`
        ));
      } else {
        setStatus(ts(
          "Browser blocked auto-play. Click again to play.",
          "Ẹ̀rọ ayélujára dá ohùn dúró. Tẹ padà láti ṣe."
        ));
      }
    }
  };

  const handleWordClick = (selectedWord: string) => {
    setWord(selectedWord);
    setStatus("");
  };

  return (
    <Card className={`bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <Volume2 className="w-5 h-5" />
          {ts("🔊 Yoruba Pronunciation Demo", "🔊 Àpẹẹrẹ Ìpè Yorùbá")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="yorubaWord" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {ts("Enter Yorùbá word:", "Fi ọ̀rọ̀ Yorùbá sí:")}
          </Label>
          <Input
            id="yorubaWord"
            type="text"
            placeholder={ts("e.g. òrìṣà", "àpẹẹrẹ: òrìṣà")}
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="mt-1"
            onKeyPress={(e) => e.key === 'Enter' && playPronunciation()}
          />
        </div>

        <Button
          onClick={playPronunciation}
          disabled={isPlaying}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Play className="w-4 h-4 mr-2" />
          {isPlaying 
            ? ts("Playing...", "Ń ṣe...") 
            : ts("▶️ Hear Pronunciation", "▶️ Gbọ́ Bí A Ṣe Ń Kà Á")
          }
        </Button>

        {status && (
          <p className="text-sm text-gray-700 dark:text-gray-300 italic bg-white dark:bg-gray-800 p-3 rounded-lg">
            {status}
          </p>
        )}

        {/* Common Words Grid */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {ts("Common Yoruba Words:", "Àwọn Ọ̀rọ̀ Yorùbá Tí A Mọ̀:")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {commonWords.slice(0, 6).map((item) => (
              <button
                key={item.word}
                onClick={() => handleWordClick(item.word)}
                className="text-left p-2 text-xs bg-white dark:bg-gray-800 rounded border hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="font-medium text-amber-700 dark:text-amber-300">{item.word}</div>
                <div className="text-gray-600 dark:text-gray-400 text-xs">{item.meaning}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-600 dark:text-gray-400 border-t pt-3 space-y-1">
          <div>
            {ts(
              "Tip: Click on common words above to try them, or type your own Yoruba word",
              "Ìmọ̀ràn: Tẹ àwọn ọ̀rọ̀ tí ó wà lókè tàbí kọ tirẹ"
            )}
          </div>
          <div className="text-emerald-600 dark:text-emerald-400">
            {ts(
              "Uses local audio files when available, otherwise Google TTS for Yoruba",
              "Lo fáìlì ohùn agbègbè tí ó bá wà, bí kò Google TTS fún Yorùbá"
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}