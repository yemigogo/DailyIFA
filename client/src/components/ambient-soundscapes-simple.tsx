import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AmbientTrack {
  id: string;
  name: string;
  nameYoruba: string;
  description: string;
  descriptionYoruba: string;
  file: string;
  category: "chants" | "drums" | "nature" | "mixed";
}

const ambientTracks: AmbientTrack[] = [
  {
    id: "ifa_wisdom_chant",
    name: "Ifá Wisdom Chant",
    nameYoruba: "Orin Ọgbọ́n Ifá",
    description: "Traditional Ifá chanting for wisdom and guidance",
    descriptionYoruba: "Orin Ifá ìbílẹ̀ fún ọgbọ́n àti ìtọ́sọ́nà",
    file: "/static/audio/soundscapes/ifa_wisdom_chant.mp3",
    category: "chants"
  },
  {
    id: "ifa_prosperity_chant",
    name: "Ifá Prosperity Chant",
    nameYoruba: "Orin Ọrọ̀ Ifá",
    description: "Traditional wealth and abundance prayers",
    descriptionYoruba: "Àdúrà ọrọ̀ àti ọ̀pọ̀lọpọ̀ ìbílẹ̀",
    file: "/static/audio/soundscapes/ifa_prosperity_chant.mp3",
    category: "chants"
  },
  {
    id: "bata_egungun_abida",
    name: "Batá Egungun Ceremony",
    nameYoruba: "Àyẹyẹ Batá Egungun",
    description: "Authentic ceremonial drumming for ancestral calling",
    descriptionYoruba: "Ìlù àyẹyẹ òtítọ́ fún ìpè àwọn egungun",
    file: "/static/audio/soundscapes/bata_egungun_abida.mp3",
    category: "drums"
  },
  {
    id: "talking_drums",
    name: "Talking Drums",
    nameYoruba: "Dùndún",
    description: "Traditional pitch-bending drums that speak Yoruba tones",
    descriptionYoruba: "Ìlù àtẹnudun tí ń sọ̀rọ̀ ní èdè Yorùbá",
    file: "/static/audio/soundscapes/talking_drum_loop.mp3",
    category: "drums"
  },
  {
    id: "ocean_blessing_waves",
    name: "Ocean Blessing Waves",
    nameYoruba: "Ìgbì Ìbùkún Òkun",
    description: "Authentic ocean waves for spiritual cleansing",
    descriptionYoruba: "Ìgbì òkun òtítọ́ fún ìwẹ̀nù ẹ̀mí",
    file: "/static/audio/soundscapes/ocean_blessing_waves_real.mp3",
    category: "nature"
  },
  {
    id: "temple_peace",
    name: "Temple Peace",
    nameYoruba: "Àlàáfíà Tẹ́míílì",
    description: "Sounds of a peaceful temple environment",
    descriptionYoruba: "Ohùn àyíká tẹ́míílì àlàáfíà",
    file: "/static/audio/soundscapes/temple_peace.mp3",
    category: "mixed"
  },
  {
    id: "sacred_ceremony",
    name: "Sacred Ceremony",
    nameYoruba: "Àjọ̀dún Mímọ́",
    description: "Sounds of a traditional Yoruba spiritual ceremony",
    descriptionYoruba: "Ohùn àjọ̀dún ẹ̀mí Yorùbá ìbílẹ̀",
    file: "/static/audio/soundscapes/sacred_ceremony.mp3",
    category: "mixed"
  }
];

export default function AmbientSoundscapes() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentTrack, setCurrentTrack] = useState<AmbientTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

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
    // Toggle pause if same track
    if (currentTrack?.id === track.id && isPlaying) {
      if (currentAudio) {
        currentAudio.pause();
        setIsPlaying(false);
      }
      return;
    }

    // Stop current audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Create new audio using working pattern
    const audio = new Audio(track.file);
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    audio.play().then(() => {
      setCurrentAudio(audio);
      setCurrentTrack(track);
      setIsPlaying(true);
    }).catch(e => {
      console.error(`${track.name} failed:`, e);
      setIsPlaying(false);
    });
  };

  const toggleMute = () => {
    if (currentAudio) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      currentAudio.volume = newMutedState ? 0 : volume;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (currentAudio && !isMuted) {
      currentAudio.volume = newVolume;
    }
  };

  const stopPlayback = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-200 mb-2">
          🎵 Ambient Yoruba Soundscapes
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Traditional sounds to enhance your spiritual practice
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
          Ohùn ìbílẹ̀ láti mú ìgbẹ́sẹ̀ ẹ̀mí rẹ pọ̀ sí i
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === category.id
                ? "bg-amber-600 text-white shadow-lg"
                : "border-amber-300 text-amber-700 hover:bg-amber-50"
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Current Track Display */}
      {currentTrack && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-amber-200 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-300">
                Now Playing: {currentTrack.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentTrack.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={toggleMute}
                variant="outline"
                size="sm"
                className="border-amber-300"
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
                className="w-20"
              />
              <Button
                onClick={stopPlayback}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Stop
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Soundscape Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTracks.map((track) => (
          <Card
            key={track.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              currentTrack?.id === track.id
                ? "ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-900/20"
                : "hover:bg-amber-50 dark:hover:bg-amber-900/10"
            }`}
            onClick={() => playTrack(track)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg text-amber-800 dark:text-amber-200">
                <span>{track.name}</span>
                {currentTrack?.id === track.id && isPlaying ? (
                  <Pause className="w-5 h-5 text-amber-600" />
                ) : (
                  <Play className="w-5 h-5 text-amber-600" />
                )}
              </CardTitle>
              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                {track.nameYoruba}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {track.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                {track.descriptionYoruba}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  track.category === "chants" ? "bg-emerald-100 text-emerald-700" :
                  track.category === "drums" ? "bg-red-100 text-red-700" :
                  track.category === "nature" ? "bg-blue-100 text-blue-700" :
                  "bg-purple-100 text-purple-700"
                }`}>
                  {track.category}
                </span>
                {currentTrack?.id === track.id && isPlaying && (
                  <span className="text-xs text-amber-600 font-medium animate-pulse">
                    Playing...
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTracks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No soundscapes found in this category.
          </p>
        </div>
      )}
    </div>
  );
}