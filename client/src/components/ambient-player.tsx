import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, VolumeX, Music, Waves, TreePine, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AmbientTrack {
  id: string;
  name: string;
  nameYoruba: string;
  description: string;
  descriptionYoruba: string;
  file: string;
  icon: any;
  category: "drums" | "nature" | "chants" | "mixed";
  duration?: number;
}

const ambientTracks: AmbientTrack[] = [
  {
    id: "blessing",
    name: "Sacred Blessing Chant",
    nameYoruba: "Orin Ìbùkún Mímọ́",
    description: "Peaceful Yoruba blessings for meditation",
    descriptionYoruba: "Àwọn ìbùkún Yorùbá àlàáfíà fún ìṣàró",
    file: "/audio/ambient/blessing_chant.mp3",
    icon: Crown,
    category: "chants"
  },
  {
    id: "wisdom",
    name: "Ifa Wisdom Chant", 
    nameYoruba: "Orin Ọgbọ́n Ifá",
    description: "Traditional Ifa wisdom verses",
    descriptionYoruba: "Àwọn ẹsẹ ọgbọ́n Ifá ìbílẹ̀",
    file: "/audio/ambient/wisdom_chant.mp3",
    icon: Crown,
    category: "chants"
  },
  {
    id: "bata",
    name: "Bata Drums",
    nameYoruba: "Ìlù Bàtá",
    description: "Traditional sacred drum rhythms",
    descriptionYoruba: "Àwọn ilu mímọ́ ìbílẹ̀",
    file: "/audio/ambient/bata_drums.mp3",
    icon: Music,
    category: "drums"
  },
  {
    id: "dundun",
    name: "Talking Drum",
    nameYoruba: "Ìlù Dúndún",
    description: "Melodic talking drum patterns",
    descriptionYoruba: "Àwọn ìlù dúndún tó ń sọ̀rọ̀",
    file: "/audio/ambient/dundun.mp3",
    icon: Music,
    category: "drums"
  },
  {
    id: "forest",
    name: "Sacred Forest",
    nameYoruba: "Igbó Mímọ́",
    description: "Peaceful forest ambience",
    descriptionYoruba: "Àyíká igbó àlàáfíà",
    file: "/audio/ambient/forest.mp3",
    icon: TreePine,
    category: "nature"
  },
  {
    id: "river",
    name: "Flowing River",
    nameYoruba: "Odò Tí Ń Sàn",
    description: "Gentle water flowing sounds",
    descriptionYoruba: "Ohùn omi tí ń sàn rọ̀rọ̀",
    file: "/audio/ambient/river.mp3",
    icon: Waves,
    category: "nature"
  },
  {
    id: "temple",
    name: "Temple Peace",
    nameYoruba: "Àlàáfíà Tẹ́ńpù",
    description: "Serene temple atmosphere",
    descriptionYoruba: "Àyíká tẹ́ńpù àlàáfíà",
    file: "/audio/ambient/temple_peace.mp3",
    icon: Crown,
    category: "mixed"
  },
  {
    id: "ceremony",
    name: "Sacred Ceremony",
    nameYoruba: "Àjọ̀dún Mímọ́",
    description: "Traditional ceremony sounds",
    descriptionYoruba: "Àwọn ohùn àjọ̀dún ìbílẹ̀",
    file: "/audio/ambient/ceremony.mp3",
    icon: Music,
    category: "mixed"
  }
];

const categoryColors = {
  drums: "bg-orange-100 text-orange-800 border-orange-300",
  nature: "bg-green-100 text-green-800 border-green-300", 
  chants: "bg-purple-100 text-purple-800 border-purple-300",
  mixed: "bg-blue-100 text-blue-800 border-blue-300"
};

export default function AmbientPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AmbientTrack | null>(null);
  const [volume, setVolume] = useState([30]);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { ts, language } = useLanguage();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100;
      audioRef.current.loop = true; // Loop ambient tracks
    }
  }, [volume, isMuted]);

  const playTrack = (track: AmbientTrack) => {
    if (currentTrack?.id === track.id && isPlaying) {
      // Pause current track
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      // Play new track
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
      audioRef.current?.play().catch(error => {
        console.error('Error resuming ambient audio:', error);
      });
      setIsPlaying(true);
    }
  };

  const stopTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const filteredTracks = selectedCategory === "all" 
    ? ambientTracks 
    : ambientTracks.filter(track => track.category === selectedCategory);

  const categories = [
    { id: "all", name: ts("All", "Gbogbo"), nameYoruba: "Gbogbo" },
    { id: "chants", name: ts("Chants", "Orin"), nameYoruba: "Orin" },
    { id: "drums", name: ts("Drums", "Ìlù"), nameYoruba: "Ìlù" },
    { id: "nature", name: ts("Nature", "Àdáyébá"), nameYoruba: "Àdáyébá" },
    { id: "mixed", name: ts("Mixed", "Àdàpọ̀"), nameYoruba: "Àdàpọ̀" }
  ];

  return (
    <Card className="border-amber-200 dark:border-amber-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
          <Music className="h-5 w-5" />
          {ts("Ambient Yoruba Soundscapes", "Àwọn Ohùn Àyíká Yorùbá")}
        </CardTitle>
        <p className="text-sm text-amber-700 dark:text-amber-300">
          {ts("Traditional sounds to enhance your spiritual practice", "Àwọn ohùn ìbílẹ̀ láti mú ìwà ẹ̀mí rẹ dára sí i")}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Playing */}
        {currentTrack && (
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <currentTrack.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                    {language === "english" ? currentTrack.name : currentTrack.nameYoruba}
                  </h4>
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    {ts("Now Playing", "Ń Ṣí í Báyìí")}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlayPause}
                  className="h-8 w-8 p-0"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={stopTrack}
                  className="h-8 w-8 p-0 text-red-600"
                >
                  ⏹
                </Button>
              </div>
            </div>
            
            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="h-8 w-8 p-0"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
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

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-amber-600 hover:bg-amber-700" : "border-amber-300"}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Track List */}
        <div className="space-y-3">
          {filteredTracks.map((track) => {
            const Icon = track.icon;
            const isCurrentTrack = currentTrack?.id === track.id;
            
            return (
              <div
                key={track.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-amber-50 dark:hover:bg-amber-900/20 ${
                  isCurrentTrack 
                    ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/30' 
                    : 'border-amber-200 dark:border-amber-700'
                }`}
                onClick={() => playTrack(track)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCurrentTrack ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-600'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-900 dark:text-amber-100">
                        {language === "english" ? track.name : track.nameYoruba}
                      </h4>
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        {language === "english" ? track.description : track.descriptionYoruba}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={categoryColors[track.category]}>
                      {track.category}
                    </Badge>
                    <div className="w-6 h-6 flex items-center justify-center">
                      {isCurrentTrack && isPlaying ? (
                        <Pause className="h-4 w-4 text-amber-600" />
                      ) : (
                        <Play className="h-4 w-4 text-amber-600" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
          onError={(e) => {
            console.error('Ambient audio error:', e);
            setIsPlaying(false);
          }}
          preload="none"
        />

        {/* Usage Info */}
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
          <p className="text-xs text-amber-700 dark:text-amber-300">
            {ts(
              "These ambient sounds are designed to create a peaceful atmosphere during your Ifá practice. Play them softly in the background while reading, meditating, or reflecting.",
              "Àwọn ohùn àyíká wọ̀nyí ni a ṣẹ̀dá láti dá àyíká àlàáfíà sílẹ̀ nígbà ìṣe Ifá rẹ. Ṣí wọn rọ̀rọ̀ ní ẹ̀yìn nígbà kíka, ìṣàró, tàbí ìrònú."
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}