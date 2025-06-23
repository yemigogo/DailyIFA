import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface AudioPlayerProps {
  oduName: string;
  oduNameYoruba: string;
  pronunciation: string;
  audioUrl?: string;
  meaning: string;
  meaningYoruba: string;
}

export default function AudioPlayer({
  oduName,
  oduNameYoruba,
  pronunciation,
  audioUrl,
  meaning,
  meaningYoruba
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { ts } = useLanguage();

  // For now, we'll use Text-to-Speech API as a fallback
  const speakText = (text: string, lang: string = 'en') => {
    if ('speechSynthesis' in window) {
      setIsLoading(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'yoruba' ? 'yo-NG' : 'en-US'; // Yoruba Nigeria
      utterance.rate = 0.8; // Slower for better pronunciation
      utterance.pitch = 1.0;
      
      utterance.onstart = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
        setIsLoading(false);
      };

      speechSynthesis.speak(utterance);
    }
  };

  const handlePlayPause = () => {
    if (audioUrl && audioRef.current) {
      // Use actual audio file if available
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // Use Text-to-Speech as fallback
      if (isPlaying) {
        speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        // Play Yoruba pronunciation first, then English meaning
        speakText(oduNameYoruba, 'yoruba');
        setTimeout(() => {
          if (!speechSynthesis.speaking) {
            speakText(`This means: ${meaning}`, 'en');
          }
        }, 3000);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else {
      // For TTS, we can only cancel
      if (isMuted) {
        setIsMuted(false);
      } else {
        speechSynthesis.cancel();
        setIsPlaying(false);
        setIsMuted(true);
      }
    }
  };

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
              {ts("Audio Pronunciation", "Bí a ti ń pè é")}
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
              <span className="font-medium">{oduNameYoruba}</span>
              <span className="text-xs text-amber-600 dark:text-amber-400 ml-2">
                ({pronunciation})
              </span>
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400">
              {ts("Meaning:", "Ìtumọ̀:")} {ts(meaning, meaningYoruba)}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayPause}
              disabled={isLoading}
              className="bg-amber-100 hover:bg-amber-200 dark:bg-amber-900 dark:hover:bg-amber-800 border-amber-300 dark:border-amber-700"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-amber-600 border-t-transparent" />
              ) : isPlaying ? (
                <Pause className="h-4 w-4 text-amber-700 dark:text-amber-300" />
              ) : (
                <Play className="h-4 w-4 text-amber-700 dark:text-amber-300" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleMute}
              className="bg-amber-100 hover:bg-amber-200 dark:bg-amber-900 dark:hover:bg-amber-800 border-amber-300 dark:border-amber-700"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-amber-700 dark:text-amber-300" />
              ) : (
                <Volume2 className="h-4 w-4 text-amber-700 dark:text-amber-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Hidden audio element for when actual audio files are available */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            onError={() => setIsPlaying(false)}
            preload="metadata"
          />
        )}

        <div className="mt-3 text-xs text-amber-600 dark:text-amber-400">
          {ts(
            "Listen to the authentic Yoruba pronunciation and meaning of this sacred Odu",
            "Gbọ́ bí a ti ń pè Odù mímọ́ yìí ní èdè Yorùbá àti ìtumọ̀ rẹ̀"
          )}
        </div>
      </CardContent>
    </Card>
  );
}