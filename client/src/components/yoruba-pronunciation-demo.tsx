import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Volume2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import NigerianAuthenticityBanner from "./nigerian-authenticity-banner";

interface YorubaPronunciationDemoProps {
  className?: string;
}

export default function YorubaPronunciationDemo({ className }: YorubaPronunciationDemoProps) {
  const [word, setWord] = useState("");
  const [status, setStatus] = useState("🔇 Audio disabled - Requires authentic Nigerian Yoruba speakers");
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
          🔇 {ts("Yoruba Pronunciation Demo - DISABLED", "Àpẹẹrẹ Ìpè Yorùbá - TI DÁ DÚRÓ")}
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
            placeholder={ts("🔇 Disabled - Nigerian speakers needed", "🔇 Ti dá dúró - A nílò àwọn Nàìjíríà")}
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="mt-1 opacity-50 cursor-not-allowed line-through"
            disabled
          />
        </div>

        <Button
          disabled={true}
          className="w-full bg-gray-400 cursor-not-allowed line-through"
        >
          🔇 {ts("DISABLED - Nigerian speakers needed", "TI DÁ DÚRÓ - A nílò àwọn Nàìjíríà")}
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
                disabled={true}
                className="text-left p-2 text-xs bg-gray-200 dark:bg-gray-700 rounded border cursor-not-allowed opacity-60 line-through"
              >
                <div className="font-medium text-gray-500 dark:text-gray-400">🔇 {item.word}</div>
                <div className="text-gray-500 dark:text-gray-500 text-xs">{item.meaning}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-red-600 dark:text-red-400 border-t pt-3 space-y-2 bg-red-50 dark:bg-red-900/20 p-3 rounded">
          <div className="font-semibold">
            🚫 {ts(
              "AUDIO DISABLED - Cultural Authenticity Required",
              "OHÙN TI DÁ DÚRÓ - Àṣà Gidi Ni A Nílò"
            )}
          </div>
          <div>
            {ts(
              "Pronunciation features disabled until authentic Nigerian Yoruba speakers provide recordings",
              "Àwọn ẹ̀yà ìpè ti dá dúró títí àwọn agbọ́rọ̀ Yorùbá Nàìjíríà gidi yóó fi fún wa"
            )}
          </div>
          <div className="text-xs">
            {ts(
              "Requirements: Native speakers from Southwest Nigeria (Lagos, Oyo, Ogun, Osun) with Ifá cultural knowledge",
              "Àwọn àdínwọ́n: Àwọn abínibí láti Gúúsù-Ìwọ̀-Oòrùn Nàìjíríà pẹ̀lú ìmọ̀ àṣà Ifá"
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}