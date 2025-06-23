import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Music, Play, Pause, Volume2, VolumeX, X, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FloatingAmbientControlsProps {
  className?: string;
}

const quickTracks = [
  {
    id: "blessing",
    name: "Ocean Waves",
    nameYoruba: "Ìgbì Òkun",
    file: "/audio/ambient/blessing_chant.mp3"
  },
  {
    id: "forest",
    name: "Forest",
    nameYoruba: "Igbó",
    file: "/audio/ambient/forest.mp3"
  },
  {
    id: "drums",
    name: "Sacred Drums",
    nameYoruba: "Ìlù Mímọ́",
    file: "/audio/ambient/bata_drums.mp3"
  }
];

export default function FloatingAmbientControls({ className }: FloatingAmbientControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [volume, setVolume] = useState([25]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { ts, language } = useLanguage();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100;
      audioRef.current.loop = true;
    }
  }, [volume, isMuted]);

  const playTrack = (track: any) => {
    if (currentTrack?.id === track.id && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      
      if (audioRef.current) {
        audioRef.current.src = track.file;
        audioRef.current.load();
        audioRef.current.play().catch(error => {
          console.error('Error playing ambient audio:', error);
          setIsPlaying(false);
        });
      }
    }
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
    setIsExpanded(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className={`fixed bottom-20 right-4 z-40 ${className}`}>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-12 w-12 rounded-full bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
          size="icon"
        >
          {currentTrack && isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Music className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Expanded Controls */}
      {isExpanded && (
        <div className="fixed bottom-36 right-4 z-50 w-80">
          <Card className="border-amber-200 dark:border-amber-800 bg-white dark:bg-gray-900 shadow-xl">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-amber-600" />
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 text-sm">
                    {ts("Ambient Sounds", "Àwọn Ohùn Àyíká")}
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Current Track */}
              {currentTrack && (
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-amber-900 dark:text-amber-100">
                      {language === "english" ? currentTrack.name : currentTrack.nameYoruba}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={togglePlayPause}
                        className="h-6 w-6"
                      >
                        {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={stopAudio}
                        className="h-6 w-6 text-red-600"
                      >
                        ⏹
                      </Button>
                    </div>
                  </div>
                  
                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                      className="h-6 w-6"
                    >
                      {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                    </Button>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-xs text-amber-600 dark:text-amber-400 w-8">
                      {isMuted ? 0 : volume[0]}%
                    </span>
                  </div>
                </div>
              )}

              {/* Quick Track Selection */}
              <div className="space-y-2">
                <p className="text-xs text-amber-700 dark:text-amber-300 mb-2">
                  {ts("Quick Selection:", "Ìyàn Kíakía:")}
                </p>
                {quickTracks.map((track) => (
                  <Button
                    key={track.id}
                    variant={currentTrack?.id === track.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => playTrack(track)}
                    className={`w-full justify-start ${
                      currentTrack?.id === track.id 
                        ? "bg-amber-600 hover:bg-amber-700" 
                        : "border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {currentTrack?.id === track.id && isPlaying ? (
                        <Pause className="h-3 w-3" />
                      ) : (
                        <Play className="h-3 w-3" />
                      )}
                      <span className="text-xs">
                        {language === "english" ? track.name : track.nameYoruba}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Info */}
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-3 leading-relaxed">
                {ts(
                  "Play calming sounds to enhance your spiritual practice",
                  "Ṣí àwọn ohùn ìrọ̀rọ̀ láti mú ìṣe ẹ̀mí rẹ dára sí i"
                )}
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.error('Floating ambient audio error:', e);
          setIsPlaying(false);
        }}
        preload="none"
      />
    </>
  );
}