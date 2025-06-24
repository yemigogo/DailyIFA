import React, { useState, useRef, useEffect } from "react";
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
    file: "/static/ambient/wisdom_chant.mp3",
    category: "chants",
    duration: 600
  },
  {
    id: "orisha_praise_chant",
    name: "Orisha Praise Chant",
    nameYoruba: "Orin Ìyìn Òrìṣà",
    description: "Devotional chanting to honor the Orishas",
    descriptionYoruba: "Orin ìsìn láti bu ọlá fún àwọn Òrìṣà",
    file: "/static/ambient/blessing_chant.mp3",
    category: "chants",
    duration: 480
  },
  {
    id: "ancestral_calling",
    name: "Ancestral Calling",
    nameYoruba: "Ìpè Àwọn Bàbá",
    description: "Sacred chants to connect with ancestors",
    descriptionYoruba: "Orin mímọ́ láti dá sí àwọn bàbá wa",
    file: "/static/ambient/wisdom_chant.mp3",
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
    file: "/static/ambient/bata_drums.mp3",
    category: "drums",
    duration: 720
  },
  {
    id: "talking_drum",
    name: "Talking Drum",
    nameYoruba: "Ìlù Dùndún",
    description: "Traditional talking drum conveying ancient messages",
    descriptionYoruba: "Ìlù Dùndún ìbílẹ̀ tí ń gbé àwọn ọ̀rọ̀ àtijọ́",
    file: "/static/ambient/talking_drum.mp3",
    category: "drums",
    duration: 600
  },
  {
    id: "dundun_ensemble",
    name: "Dundun Ensemble",
    nameYoruba: "Ẹgbẹ́ Ìlù Dùndún",
    description: "Full ensemble of Dundun drums in ceremonial rhythm",
    descriptionYoruba: "Ẹgbẹ́ kíkún ìlù Dùndún ní ìlù àjọ̀dún",
    file: "/static/ambient/talking_drum.mp3",
    category: "drums",
    duration: 840
  },

  // Nature
  {
    id: "sacred_forest",
    name: "Sacred Forest",
    nameYoruba: "Igbó Mímọ́",
    description: "Forest sounds with birds, frogs, and forest animals",
    descriptionYoruba: "Ohùn igbó pẹ̀lú ẹyẹ, ọ̀pọ̀lọ́ àti ẹranko igbó",
    file: "/static/ambient/sacred_forest.mp3",
    category: "nature",
    duration: 900
  },
  {
    id: "flowing_river",
    name: "Flowing River",
    nameYoruba: "Odò Tí Ń Sàn",
    description: "Gentle river sounds for Oshun meditation",
    descriptionYoruba: "Ohùn odò tútù fún ìjímọ̀ Ọ̀ṣun",
    file: "/static/ambient/river_new.mp3",
    category: "nature",
    duration: 780
  },
  {
    id: "ocean_blessing_waves",
    name: "Ocean Blessing Waves",
    nameYoruba: "Ìgbì Ìbùkún Òkun",
    description: "Ocean waves carrying Yemoja's blessings",
    descriptionYoruba: "Ìgbì òkun tí ń gbé ìbùkún Yemọja",
    file: "/static/ambient/ocean_blessing_waves.mp3",
    category: "nature",
    duration: 660
  },
  {
    id: "wind_through_palms",
    name: "Wind Through Palms",
    nameYoruba: "Afẹ́fẹ́ Láàrín Ọ̀pẹ",
    description: "Gentle wind through sacred palm trees",
    descriptionYoruba: "Afẹ́fẹ́ tútù láàrín igi ọ̀pẹ mímọ́",
    file: "/static/ambient/sacred_forest.mp3",
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
    file: "/static/ambient/temple_peace.mp3",
    category: "mixed",
    duration: 1200
  },
  {
    id: "sacred_ceremony",
    name: "Sacred Ceremony",
    nameYoruba: "Àjọ̀dún Mímọ́",
    description: "Sounds of a traditional Yoruba spiritual ceremony",
    descriptionYoruba: "Ohùn àjọ̀dún ẹ̀mí Yorùbá ìbílẹ̀",
    file: "/static/ambient/sacred_ceremony.mp3",
    category: "mixed",
    duration: 960
  },
  {
    id: "dawn_prayers",
    name: "Dawn Prayers",
    nameYoruba: "Ìwúre Òwúrọ̀",
    description: "Early morning prayers with birds and gentle chanting",
    descriptionYoruba: "Ìwúre kùtùkùtù pẹ̀lú ẹyẹ àti orin dídùn",
    file: "/static/ambient/blessing_chant.mp3",
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
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Layered soundscape state
  const [layer1Track, setLayer1Track] = useState<AmbientTrack | null>(null);
  const [layer2Track, setLayer2Track] = useState<AmbientTrack | null>(null);
  const [layer1Playing, setLayer1Playing] = useState(false);
  const [layer2Playing, setLayer2Playing] = useState(false);
  const layer1AudioRef = useRef<HTMLAudioElement>(null);
  const layer2AudioRef = useRef<HTMLAudioElement>(null);
  
  // Playlist functionality
  const [currentPlaylist, setCurrentPlaylist] = useState<string[]>([]);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const playlistAudioRef = useRef<HTMLAudioElement>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Auto-load Ocean Blessing Waves on component mount
  useEffect(() => {
    const defaultTrack = ambientTracks.find(track => track.id === "ocean_blessing_waves");
    if (defaultTrack) {
      setCurrentTrack(defaultTrack);
      if (audioRef.current) {
        audioRef.current.src = defaultTrack.file;
        audioRef.current.volume = 0;
        // Auto-play the default track with fade in
        audioRef.current.play().then(() => {
          fadeIn(audioRef.current!);
          setIsPlaying(true);
        }).catch(() => {
          // Handle autoplay restrictions - user interaction required
          setIsPlaying(false);
        });
      }
    }
  }, []);

  const fadeOut = (audio: HTMLAudioElement, callback: () => void) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume > 0.1) {
        audio.volume = Math.max(0, audio.volume - 0.1);
      } else {
        clearInterval(fadeIntervalRef.current!);
        audio.pause();
        callback();
      }
    }, 100);
  };

  const fadeIn = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume < (isMuted ? 0 : volume - 0.1)) {
        audio.volume = Math.min(isMuted ? 0 : volume, audio.volume + 0.1);
      } else {
        clearInterval(fadeIntervalRef.current!);
        audio.volume = isMuted ? 0 : volume;
      }
    }, 100);
  };

  const loadNewTrack = (track: AmbientTrack) => {
    if (audioRef.current) {
      audioRef.current.src = track.file;
      audioRef.current.play().then(() => {
        fadeIn(audioRef.current!);
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
      setCurrentTrack(track);
    }
  };

  const playTrack = (track: AmbientTrack) => {
    if (currentTrack?.id === track.id && isPlaying) {
      // Pause current track with fade out
      if (audioRef.current) {
        fadeOut(audioRef.current, () => {
          setIsPlaying(false);
        });
      }
    } else {
      // Play new track
      if (currentTrack && isPlaying && audioRef.current) {
        // Fade out current track, then load new one
        fadeOut(audioRef.current, () => {
          loadNewTrack(track);
        });
      } else {
        // No current track or not playing, load immediately
        loadNewTrack(track);
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

  // Cleanup fade intervals on component unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Audio file mapping for layered soundscapes
  const layeredAudioMap: { [key: string]: string } = {
    ifa_wisdom_chant: "/static/audio/soundscapes/ifa_wisdom_chant.mp3",
    bata_drums: "/static/audio/soundscapes/bata_drums.mp3",
    flowing_river: "/static/audio/soundscapes/flowing_river.mp3",
    ocean_blessing_waves: "/static/audio/soundscapes/ocean_blessing_waves.mp3"
  };

  // Mood-based playlists
  const playlists: { [key: string]: string[] } = {
    meditation: ["temple_peace", "flowing_river", "ocean_blessing_waves"],
    ritual: ["sacred_ceremony", "ifa_wisdom_chant", "bata_drums"],
    healing: ["sacred_forest", "talking_drum", "flowing_river"]
  };

  const moodDescriptions = {
    meditation: {
      name: ts("Meditation", "Ìjímọ̀"),
      description: ts("Peaceful sounds for deep contemplation", "Ohùn àlàáfíà fún ìrònú jinlẹ̀"),
      nameYoruba: "Ìjímọ̀",
      descriptionYoruba: "Ohùn àlàáfíà fún ìrònú jinlẹ̀"
    },
    ritual: {
      name: ts("Ritual", "Àjọ̀dún"),
      description: ts("Sacred ceremony sounds for spiritual practice", "Ohùn àjọ̀dún mímọ́ fún iṣẹ ẹ̀mí"),
      nameYoruba: "Àjọ̀dún",
      descriptionYoruba: "Ohùn àjọ̀dún mímọ́ fún iṣẹ ẹ̀mí"
    },
    healing: {
      name: ts("Healing", "Ìwòsàn"),
      description: ts("Restorative sounds for spiritual renewal", "Ohùn ìmúpadà fún ìsọdọ̀tun ẹ̀mí"),
      nameYoruba: "Ìwòsàn",
      descriptionYoruba: "Ohùn ìmúpadà fún ìsọdọ̀tun ẹ̀mí"
    }
  };

  const playLayeredSound = () => {
    const layer1Value = (document.getElementById("layer1Select") as HTMLSelectElement)?.value;
    const layer2Value = (document.getElementById("layer2Select") as HTMLSelectElement)?.value;

    if (layer1AudioRef.current) {
      layer1AudioRef.current.src = layeredAudioMap[layer1Value] || "";
      if (layer1Value) {
        layer1AudioRef.current.volume = 0.6;
        layer1AudioRef.current.play();
        setLayer1Track(ambientTracks.find(t => t.id === layer1Value) || null);
        setLayer1Playing(true);
      } else {
        layer1AudioRef.current.pause();
        setLayer1Track(null);
        setLayer1Playing(false);
      }
    }

    if (layer2AudioRef.current) {
      layer2AudioRef.current.src = layeredAudioMap[layer2Value] || "";
      if (layer2Value) {
        layer2AudioRef.current.volume = 0.6;
        layer2AudioRef.current.play();
        setLayer2Track(ambientTracks.find(t => t.id === layer2Value) || null);
        setLayer2Playing(true);
      } else {
        layer2AudioRef.current.pause();
        setLayer2Track(null);
        setLayer2Playing(false);
      }
    }
  };

  const initSoundscape = () => {
    // Start with Ocean Blessing Waves as default
    const defaultTrack = ambientTracks.find(track => track.id === "ocean_blessing_waves");
    if (defaultTrack) {
      playTrack(defaultTrack);
    }
  };

  const setSleepTimer = () => {
    if (sleepTimerRef.current) {
      clearTimeout(sleepTimerRef.current);
    }
    
    const sleepMinutesInput = document.getElementById("sleepMinutes") as HTMLInputElement;
    const mins = parseInt(sleepMinutesInput?.value || "0");
    
    if (isNaN(mins) || mins <= 0) {
      alert(ts("Enter a valid number of minutes", "Fi nọ́mbà ìṣẹ́jú tó tọ̀nà"));
      return;
    }

    const ms = mins * 60 * 1000;
    sleepTimerRef.current = setTimeout(() => {
      // Stop all audio players
      if (audioRef.current) audioRef.current.pause();
      if (layer1AudioRef.current) layer1AudioRef.current.pause();
      if (layer2AudioRef.current) layer2AudioRef.current.pause();
      if (playlistAudioRef.current) playlistAudioRef.current.pause();
      
      // Reset all states
      setIsPlaying(false);
      setLayer1Playing(false);
      setLayer2Playing(false);
      setActiveMood(null);
      setCurrentTrack(null);
      setLayer1Track(null);
      setLayer2Track(null);
      
      alert(ts("🛏 Soundscape has stopped. Sleep well.", "🛏 Ohùn àyíká ti dáwọ́. Sun dáradára."));
    }, ms);

    alert(ts(`Sleep timer set for ${mins} minutes`, `Àkókò oorun ti yan fún ìṣẹ́jú ${mins}`));
  };

  return (
    <div className="bg-white dark:bg-gray-800 mt-8 p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-teal-700 dark:text-teal-400">
          🌊 {ts("Ambient Yoruba Soundscapes", "Ohùn Àyíká Yorùbá")}
        </h2>
        
        <Button
          onClick={initSoundscape}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          🎧 {ts("Start Soundscape", "Bẹ̀rẹ̀ Ohùn Àyíká")}
        </Button>
        
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

      {/* Sleep Timer */}
      <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-3">
          🛏 {ts("Sleep Timer", "Àkókò Oorun")}
        </h3>
        <div className="flex items-center gap-3">
          <input
            id="sleepMinutes"
            type="number"
            min="1"
            max="180"
            placeholder={ts("Minutes", "Ìṣẹ́jú")}
            className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
          <Button
            onClick={setSleepTimer}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {ts("Set Timer", "Yan Àkókò")}
          </Button>
        </div>
        <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
          {ts("All soundscapes will stop automatically after the set time", "Gbogbo ohùn àyíká yóò dáwọ́ láìfọwọ́si lẹ́yìn àkókò tí a yan")}
        </p>
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

      {/* Layered Soundscape Section */}
      <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl">
        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-4">
          🎵 {ts("Layered Soundscape Mixer", "Apò Ohùn Àyíká")}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          {ts(
            "Mix multiple soundscapes together for a deeper meditation experience. Combine chants with nature sounds or drums with flowing water.",
            "Da àwọn ohùn àyíká pọ̀ fún ìrírí ìjímọ̀ tó jinlẹ̀. So orin pẹ̀lú ohùn àdáyébá tàbí ìlù pẹ̀lú omi tí ń sàn."
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Layer 1 - Chants & Drums */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <label className="block font-semibold mb-2 text-purple-700 dark:text-purple-300">
              {ts("Spiritual Layer:", "Ipele Ẹ̀mí:")}
            </label>
            <select
              id="layer1Select"
              onChange={playLayeredSound}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded mb-3 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
            >
              <option value="">{ts("-- Select --", "-- Yan --")}</option>
              <option value="ifa_wisdom_chant">{ts("Ifá Wisdom Chant", "Orin Ọgbọ́n Ifá")}</option>
              <option value="bata_drums">{ts("Bata Drums", "Ìlù Bàtá")}</option>
            </select>
            {layer1Track && (
              <div className="text-sm text-purple-600 dark:text-purple-400 mb-2">
                {ts("Playing:", "Tí Ń Ṣe:")} {language === 'english' ? layer1Track.name : layer1Track.nameYoruba}
              </div>
            )}
            <audio
              ref={layer1AudioRef}
              controls
              loop
              className="w-full"
              onPlay={() => setLayer1Playing(true)}
              onPause={() => setLayer1Playing(false)}
            />
          </div>

          {/* Layer 2 - Nature */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <label className="block font-semibold mb-2 text-green-700 dark:text-green-400">
              {ts("Nature Layer:", "Ipele Àdáyébá:")}
            </label>
            <select
              id="layer2Select"
              onChange={playLayeredSound}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded mb-3 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
            >
              <option value="">{ts("-- Select --", "-- Yan --")}</option>
              <option value="flowing_river">{ts("Flowing River", "Odò Tí Ń Sàn")}</option>
              <option value="ocean_blessing_waves">{ts("Ocean Blessing Waves", "Ìgbì Ìbùkún Òkun")}</option>
            </select>
            {layer2Track && (
              <div className="text-sm text-green-600 dark:text-green-400 mb-2">
                {ts("Playing:", "Tí Ń Ṣe:")} {language === 'english' ? layer2Track.name : layer2Track.nameYoruba}
              </div>
            )}
            <audio
              ref={layer2AudioRef}
              controls
              loop
              className="w-full"
              onPlay={() => setLayer2Playing(true)}
              onPause={() => setLayer2Playing(false)}
            />
          </div>
        </div>

        {(layer1Playing || layer2Playing) && (
          <div className="mt-4 p-3 bg-white dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {ts("Layered Experience Active", "Ìrírí Apò Ń Ṣiṣẹ́")}
              </span>
              <Button
                onClick={() => {
                  if (layer1AudioRef.current) {
                    layer1AudioRef.current.pause();
                    setLayer1Track(null);
                    setLayer1Playing(false);
                  }
                  if (layer2AudioRef.current) {
                    layer2AudioRef.current.pause();
                    setLayer2Track(null);
                    setLayer2Playing(false);
                  }
                  // Reset selects
                  const layer1Select = document.getElementById("layer1Select") as HTMLSelectElement;
                  const layer2Select = document.getElementById("layer2Select") as HTMLSelectElement;
                  if (layer1Select) layer1Select.value = "";
                  if (layer2Select) layer2Select.value = "";
                }}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                {ts("Stop All Layers", "Dá Gbogbo Ipele Dúró")}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mood-Based Playlists */}
      <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">
          🌀 {ts("Select a Mood Playlist:", "Yan Àtòjọ Ìpinnu:")}
        </h2>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            onClick={() => playMoodPlaylist('meditation')}
            className={`px-6 py-3 rounded text-white font-medium transition-all ${
              activeMood === 'meditation' 
                ? 'bg-blue-700 ring-2 ring-blue-300' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {ts("Meditation", "Ìjímọ̀")}
          </Button>
          
          <Button
            onClick={() => playMoodPlaylist('ritual')}
            className={`px-6 py-3 rounded text-white font-medium transition-all ${
              activeMood === 'ritual' 
                ? 'bg-red-700 ring-2 ring-red-300' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {ts("Ritual", "Àjọ̀dún")}
          </Button>
          
          <Button
            onClick={() => playMoodPlaylist('healing')}
            className={`px-6 py-3 rounded text-white font-medium transition-all ${
              activeMood === 'healing' 
                ? 'bg-green-700 ring-2 ring-green-300' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {ts("Healing", "Ìwòsàn")}
          </Button>
        </div>

        {/* Playlist Player */}
        {activeMood && (
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-amber-700 dark:text-amber-400">
                  {ts("Now Playing:", "Tí Ń Ṣe Nísinsin:")} {moodDescriptions[activeMood].name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {ts("Track", "Orin")} {playlistIndex + 1} {ts("of", "nínú")} {currentPlaylist.length}
                </p>
              </div>
              <Button
                onClick={stopPlaylist}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                <Pause className="w-4 h-4 mr-2" />
                {ts("Stop Playlist", "Dá Àtòjọ Dúró")}
              </Button>
            </div>
            
            <audio
              ref={playlistAudioRef}
              controls
              className="w-full"
            />
            
            {/* Playlist Progress */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{ts("Playlist Progress", "Ìlọsíwájú Àtòjọ")}</span>
                <span>{Math.round(((playlistIndex + 1) / currentPlaylist.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((playlistIndex + 1) / currentPlaylist.length) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Playlist Saver */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">
          💾 {ts("Save Custom Playlist", "Fi Àtòjọ Aládàáṣe Pamọ́")}
        </h3>
        <div className="flex items-center gap-3 mb-3">
          <input
            id="playlistName"
            type="text"
            placeholder={ts("Playlist name", "Orúkọ àtòjọ")}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
          <Button
            onClick={() => {
              const nameInput = document.getElementById("playlistName") as HTMLInputElement;
              const name = nameInput?.value?.trim();
              if (!name) {
                alert(ts("Enter a playlist name", "Fi orúkọ àtòjọ sí"));
                return;
              }
              
              const tracks = currentPlaylist.length > 0 ? currentPlaylist : 
                           currentTrack ? [currentTrack.id] : [];
              
              if (tracks.length === 0) {
                alert(ts("No tracks to save", "Kò sí orin tí a ó pamọ́"));
                return;
              }

              // Save to localStorage for now
              const savedPlaylists = JSON.parse(localStorage.getItem("savedPlaylists") || "{}");
              savedPlaylists[name] = tracks;
              localStorage.setItem("savedPlaylists", JSON.stringify(savedPlaylists));
              
              alert(ts(`Playlist "${name}" saved!`, `Àtòjọ "${name}" ti pamọ́!`));
              nameInput.value = "";
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {ts("Save", "Pamọ́")}
          </Button>
        </div>
        <p className="text-xs text-blue-600 dark:text-blue-400">
          {ts("Saves currently playing tracks or mood playlist", "Ń pamọ́ àwọn orin tí ń ṣe tàbí àtòjọ ìpinnu")}
        </p>
      </div>
    </div>
  );
}