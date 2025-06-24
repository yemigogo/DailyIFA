import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AmbientTrack {
  id: string;
  name: string;
  nameYoruba: string;
  description: string;
  descriptionYoruba: string;
  file: string;
  category: "chants" | "drums" | "nature" | "mixed";
  duration?: number;
}

const ambientTracks: AmbientTrack[] = [
  // Chants
  {
    id: "ifa_wisdom_chant",
    name: "Ifá Wisdom Chant",
    nameYoruba: "Orin Ọgbọ́n Ifá",
    description: "Traditional Ifá chanting for wisdom and guidance",
    descriptionYoruba: "Orin Ifá ìbílẹ̀ fún ọgbọ́n àti ìtọ́sọ́nà",
    file: "/static/audio/soundscapes/ifa_wisdom_chant.mp3",
    category: "chants",
    duration: 600
  },
  {
    id: "orisha_praise_chant",
    name: "Orisha Praise Chant",
    nameYoruba: "Orin Ìyìn Òrìṣà",
    description: "Devotional chanting to honor the Orishas",
    descriptionYoruba: "Orin ìsìn láti bu ọlá fún àwọn Òrìṣà",
    file: "/static/audio/soundscapes/orisha_praise_chant.mp3",
    category: "chants",
    duration: 480
  },
  {
    id: "ancestral_calling",
    name: "Ancestral Calling",
    nameYoruba: "Ìpè Àwọn Bàbá",
    description: "Sacred chants to connect with ancestors",
    descriptionYoruba: "Orin mímọ́ láti dá sí àwọn bàbá wa",
    file: "/static/audio/soundscapes/ancestral_calling.mp3",
    category: "chants",
    duration: 540
  },

  // Drums
  {
    id: "bata_drums",
    name: "Bata Drums",
    nameYoruba: "Ìlù Bàtá",
    description: "Sacred Bata drums speaking the language of the Orishas",
    descriptionYoruba: "Ìlù Bàtá mímọ́ tí ń sọ èdè àwọn Òrìṣà",
    file: "/static/audio/soundscapes/bata_drums.mp3",
    category: "drums",
    duration: 720
  },
  {
    id: "talking_drum",
    name: "Talking Drum",
    nameYoruba: "Ìlù Dùndún",
    description: "Traditional talking drum conveying ancient messages",
    descriptionYoruba: "Ìlù Dùndún ìbílẹ̀ tí ń gbé àwọn ọ̀rọ̀ àtijọ́",
    file: "/static/audio/soundscapes/talking_drum.mp3",
    category: "drums",
    duration: 600
  },
  {
    id: "dundun_ensemble",
    name: "Dundun Ensemble",
    nameYoruba: "Ẹgbẹ́ Ìlù Dùndún",
    description: "Full ensemble of Dundun drums in ceremonial rhythm",
    descriptionYoruba: "Ẹgbẹ́ kíkún ìlù Dùndún ní ìlù àjọ̀dún",
    file: "/static/audio/soundscapes/dundun_ensemble.mp3",
    category: "drums",
    duration: 840
  },

  // Nature
  {
    id: "sacred_forest",
    name: "Sacred Forest",
    nameYoruba: "Igbó Mímọ́",
    description: "Peaceful sounds of the sacred Yoruba forest",
    descriptionYoruba: "Ohùn àlàáfíà igbó mímọ́ Yorùbá",
    file: "/static/audio/soundscapes/sacred_forest.mp3",
    category: "nature",
    duration: 900
  },
  {
    id: "flowing_river",
    name: "Flowing River",
    nameYoruba: "Odò Tí Ń Sàn",
    description: "Gentle river sounds for Oshun meditation",
    descriptionYoruba: "Ohùn odò tútù fún ìjímọ̀ Ọ̀ṣun",
    file: "/static/audio/soundscapes/flowing_river.mp3",
    category: "nature",
    duration: 780
  },
  {
    id: "ocean_blessing_waves",
    name: "Ocean Blessing Waves",
    nameYoruba: "Ìgbì Ìbùkún Òkun",
    description: "Ocean waves carrying Yemoja's blessings",
    descriptionYoruba: "Ìgbì òkun tí ń gbé ìbùkún Yemọja",
    file: "/static/audio/soundscapes/ocean_blessing_waves.mp3",
    category: "nature",
    duration: 660
  },
  {
    id: "wind_through_palms",
    name: "Wind Through Palms",
    nameYoruba: "Afẹ́fẹ́ Láàrín Ọ̀pẹ",
    description: "Gentle wind through sacred palm trees",
    descriptionYoruba: "Afẹ́fẹ́ tútù láàrín igi ọ̀pẹ mímọ́",
    file: "/static/audio/soundscapes/wind_through_palms.mp3",
    category: "nature",
    duration: 720
  },

  // Mixed
  {
    id: "temple_peace",
    name: "Temple Peace",
    nameYoruba: "Àlàáfíà Tẹ́ńpílì",
    description: "Serene atmosphere of a peaceful Yoruba temple",
    descriptionYoruba: "Àyíká tútù ti tẹ́ńpílì Yorùbá aláàfíà",
    file: "/static/audio/soundscapes/temple_peace.mp3",
    category: "mixed",
    duration: 1200
  },
  {
    id: "sacred_ceremony",
    name: "Sacred Ceremony",
    nameYoruba: "Àjọ̀dún Mímọ́",
    description: "Sounds of a traditional Yoruba spiritual ceremony",
    descriptionYoruba: "Ohùn àjọ̀dún ẹ̀mí Yorùbá ìbílẹ̀",
    file: "/static/audio/soundscapes/sacred_ceremony.mp3",
    category: "mixed",
    duration: 960
  },
  {
    id: "dawn_prayers",
    name: "Dawn Prayers",
    nameYoruba: "Ìwúre Òwúrọ̀",
    description: "Early morning prayers with birds and gentle chanting",
    descriptionYoruba: "Ìwúre kùtùkùtù pẹ̀lú ẹyẹ àti orin dídùn",
    file: "/static/audio/soundscapes/dawn_prayers.mp3",
    category: "mixed",
    duration: 840
  }
];

export default function AmbientSoundscapes() {
  const { language, ts } = useLanguage();
  const [currentTrack, setCurrentTrack] = useState<AmbientTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const categories = [
    { id: "all", name: "All Sounds", nameYoruba: "Gbogbo Ohùn" },
    { id: "chants", name: "Chants", nameYoruba: "Orin" },
    { id: "drums", name: "Drums", nameYoruba: "Ìlù" },
    { id: "nature", name: "Nature", nameYoruba: "Àdáyébá" },
    { id: "mixed", name: "Mixed", nameYoruba: "Àpọ̀pọ̀" }
  ];

  const filteredTracks = ambientTracks.filter(track => 
    selectedCategory === "all" || track.category === selectedCategory
  );

  const playTrack = (track: AmbientTrack) => {
    if (currentTrack?.id === track.id && isPlaying) {
      // Pause current track
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      // Play new track
      setCurrentTrack(track);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = track.file;
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.volume = newMutedState ? 0 : volume;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 mt-8 p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-teal-700 dark:text-teal-400">
          🌊 {ts("Ambient Yoruba Soundscapes", "Ohùn Àyíká Yorùbá")}
        </h2>
        
        {/* Volume Controls */}
        {currentTrack && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-teal-600 hover:text-teal-700"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-20 accent-teal-600"
            />
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
          {ts("Filter by Category:", "Ṣàjọ Nípa Ìrú:")}
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {language === 'english' ? category.name : category.nameYoruba}
            </option>
          ))}
        </select>
      </div>

      {/* Currently Playing */}
      {currentTrack && (
        <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-teal-800 dark:text-teal-300">
                {ts("Now Playing:", "Tí Ń Ṣe Nísinsin:")}
              </h3>
              <p className="text-teal-700 dark:text-teal-400">
                {language === 'english' ? currentTrack.name : currentTrack.nameYoruba}
              </p>
              {currentTrack.duration && (
                <p className="text-sm text-teal-600 dark:text-teal-500">
                  {formatDuration(currentTrack.duration)}
                </p>
              )}
            </div>
            <Button
              onClick={() => playTrack(currentTrack)}
              variant="outline"
              size="sm"
              className="border-teal-500 text-teal-600 hover:bg-teal-50"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}

      {/* Audio Element */}
      <audio
        ref={audioRef}
        controls
        loop
        className="w-full mt-4"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Soundscape Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTracks.map((track) => (
          <Card key={track.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-teal-700 dark:text-teal-400">
                {language === 'english' ? track.name : track.nameYoruba}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {language === 'english' ? track.description : track.descriptionYoruba}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 capitalize bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {ts(
                    track.category,
                    track.category === "chants" ? "Orin" :
                    track.category === "drums" ? "Ìlù" :
                    track.category === "nature" ? "Àdáyébá" : "Àpọ̀pọ̀"
                  )}
                </span>
                {track.duration && (
                  <span className="text-xs text-gray-500">
                    {formatDuration(track.duration)}
                  </span>
                )}
              </div>
              <Button
                onClick={() => playTrack(track)}
                className="w-full mt-3 bg-teal-600 hover:bg-teal-700"
              >
                {currentTrack?.id === track.id && isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    {ts("Pause", "Dúró")}
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    {ts("Play", "Ṣe")}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTracks.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          {ts("No soundscapes found in this category.", "Kò sí ohùn àyíká nínú ìrú yìí.")}
        </div>
      )}
    </div>
  );
}