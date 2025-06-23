import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface AudioPlayerProps {
  oduName: string;
  oduNameYoruba: string;
  pronunciation: string;
  audioUrl?: string;
  phoneticAudioUrl?: string;
  meaning: string;
  meaningYoruba: string;
  hasAudio?: boolean;
}

export default function AudioPlayer({
  oduName,
  oduNameYoruba,
  pronunciation,
  audioUrl,
  phoneticAudioUrl,
  meaning,
  meaningYoruba,
  hasAudio = false
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<'main' | 'phonetic'>('main');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const phoneticAudioRef = useRef<HTMLAudioElement | null>(null);
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
    const activeAudioRef = currentAudio === 'main' ? audioRef : phoneticAudioRef;
    const activeAudioUrl = currentAudio === 'main' ? audioUrl : phoneticAudioUrl;
    
    if (hasAudio && activeAudioUrl && activeAudioRef.current) {
      // Use actual audio file
      if (isPlaying) {
        activeAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Stop other audio if playing
        if (audioRef.current) audioRef.current.pause();
        if (phoneticAudioRef.current) phoneticAudioRef.current.pause();
        
        activeAudioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // Use Text-to-Speech as fallback
      if (isPlaying) {
        speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        speakText(oduNameYoruba, 'yoruba');
        setTimeout(() => {
          if (!speechSynthesis.speaking) {
            speakText(`This means: ${meaning}`, 'en');
          }
        }, 3000);
      }
    }
  };

  const playPhonetic = () => {
    console.log('playPhonetic called', { phoneticAudioUrl, hasPhoneticRef: !!phoneticAudioRef.current });
    
    if (phoneticAudioUrl && phoneticAudioRef.current) {
      setCurrentAudio('phonetic');
      setIsPlaying(true);
      if (audioRef.current) audioRef.current.pause();
      
      phoneticAudioRef.current.play().then(() => {
        console.log('Phonetic audio playing successfully');
      }).catch(error => {
        console.error('Error playing phonetic audio:', error);
        setIsPlaying(false);
        // Fallback to TTS
        speakText(pronunciation.replace(/\[.*?\]/g, ''), 'en');
      });
    } else {
      console.log('No phonetic audio URL or ref, using TTS');
      // Fallback to slower TTS
      speakText(pronunciation.replace(/\[.*?\]/g, ''), 'en');
    }
  };

  const playMain = () => {
    console.log('playMain called', { audioUrl, hasAudioRef: !!audioRef.current });
    
    if (audioUrl && audioRef.current) {
      setCurrentAudio('main');
      setIsPlaying(true);
      if (phoneticAudioRef.current) phoneticAudioRef.current.pause();
      
      audioRef.current.play().then(() => {
        console.log('Audio playing successfully');
      }).catch(error => {
        console.error('Error playing main audio:', error);
        setIsPlaying(false);
        // Fallback to TTS
        speakText(oduNameYoruba, 'yoruba');
      });
    } else {
      console.log('No audio URL or ref, using TTS');
      speakText(oduNameYoruba, 'yoruba');
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
              onClick={playMain}
              disabled={isLoading}
              className="bg-amber-100 hover:bg-amber-200 dark:bg-amber-900 dark:hover:bg-amber-800 border-amber-300 dark:border-amber-700"
              title={ts("Play Yoruba pronunciation", "Gbọ́ bí a ti ń pè é ní Yorùbá")}
            >
              <Play className="h-4 w-4 text-amber-700 dark:text-amber-300 mr-1" />
              <span className="text-xs">{ts("Yoruba", "Yorùbá")}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={playPhonetic}
              disabled={isLoading}
              className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 border-blue-300 dark:border-blue-700"
              title={ts("Play phonetic guide", "Gbọ́ ìtọ́kasí àfọhùn")}
            >
              <Play className="h-4 w-4 text-blue-700 dark:text-blue-300 mr-1" />
              <span className="text-xs">{ts("Guide", "Ìtọ́kasí")}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleMute}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-700"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              ) : (
                <Volume2 className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              )}
            </Button>

            {hasAudio && audioUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(audioUrl, '_blank')}
                className="bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 border-green-300 dark:border-green-700"
                title={ts("Download audio", "Gba ohùn")}
              >
                <Download className="h-4 w-4 text-green-700 dark:text-green-300" />
              </Button>
            )}
          </div>
        </div>

        {/* Debug info */}
        <div className="mt-2 text-xs text-gray-500">
          <p>Audio URL: {audioUrl || 'none'}</p>
          <p>Phonetic URL: {phoneticAudioUrl || 'none'}</p>
          <p>Has Audio: {hasAudio ? 'yes' : 'no'}</p>
        </div>

        {/* Hidden audio elements for actual audio files */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => {
              console.log('Audio ended');
              setIsPlaying(false);
            }}
            onError={(e) => {
              console.error('Audio error:', e);
              setIsPlaying(false);
            }}
            onLoadStart={() => console.log('Loading audio:', audioUrl)}
            onCanPlay={() => console.log('Audio can play:', audioUrl)}
            onLoadedData={() => console.log('Audio loaded:', audioUrl)}
            preload="auto"
            controls={false}
          />
        )}
        {phoneticAudioUrl && (
          <audio
            ref={phoneticAudioRef}
            src={phoneticAudioUrl}
            onEnded={() => {
              console.log('Phonetic audio ended');
              setIsPlaying(false);
            }}
            onError={(e) => {
              console.error('Phonetic audio error:', e);
              setIsPlaying(false);
            }}
            onLoadStart={() => console.log('Loading phonetic audio:', phoneticAudioUrl)}
            onCanPlay={() => console.log('Phonetic audio can play:', phoneticAudioUrl)}
            onLoadedData={() => console.log('Phonetic audio loaded:', phoneticAudioUrl)}
            preload="auto"
            controls={false}
          />
        )}

        <div className="mt-3 text-xs text-amber-600 dark:text-amber-400">
          {hasAudio && audioUrl ? (
            <div>
              <p>{ts("Audio files loaded - click buttons to play", "Àwọn fáìlì ohùn ti wa - tẹ bọ́tìnì láti gbọ́")}</p>
              <div className="flex gap-2 mt-2">
                <audio controls preload="auto" src={audioUrl} className="h-8">
                  Your browser does not support audio.
                </audio>
                {phoneticAudioUrl && (
                  <audio controls preload="auto" src={phoneticAudioUrl} className="h-8">
                    Your browser does not support audio.
                  </audio>
                )}
              </div>
            </div>
          ) : ts(
            "Using text-to-speech for pronunciation guidance",
            "Lo ìmọ̀ ẹ̀rọ text-to-speech fún ìtọ́kasí àfọhùn"
          )}
        </div>
      </CardContent>
    </Card>
  );
}