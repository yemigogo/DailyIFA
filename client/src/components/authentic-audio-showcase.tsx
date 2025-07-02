import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, Star, Clock, Waves } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ResponsiveCard from "@/components/responsive-card";

interface AuthenticAudio {
  id: string;
  orisha: string;
  duration: number;
  description: string;
  descriptionYoruba: string;
  audioUrl: string;
  category: string;
}

const authenticRecordings: AuthenticAudio[] = [
  {
    id: "olokun",
    orisha: "Olókun",
    duration: 46,
    description: "Ocean deity, ruler of the sea's depths and mysteries",
    descriptionYoruba: "Òrìṣà òkun, alábojútó ibú omi àti àwọn ohun ìjìnlẹ̀",
    audioUrl: "/static/audio/pronunciation/olokun.mp3",
    category: "Water Deities"
  },
  {
    id: "oya", 
    orisha: "Ọya",
    duration: 51,
    description: "Fierce goddess of wind, storms, and ancestral guardianship",
    descriptionYoruba: "Òrìṣà líle ti afẹ́fẹ́, ìjì àti àbójútó àwọn bàbá ńlá",
    audioUrl: "/static/audio/pronunciation/oya.mp3",
    category: "Storm & Wind"
  },
  {
    id: "yemoja",
    orisha: "Yemọja", 
    duration: 102,
    description: "Nurturing mother of waters, protector of children and families",
    descriptionYoruba: "Ìyá òkun aláàbò, olùdáàbò àwọn ọmọ àti ìdílé",
    audioUrl: "/static/audio/pronunciation/yemoja.mp3",
    category: "Motherhood & Protection"
  },
  {
    id: "osun",
    orisha: "Ọ̀ṣun",
    duration: 66,
    description: "Sweet goddess of rivers, love, fertility, and prosperity",
    descriptionYoruba: "Òrìṣà àwọn odò, ìfẹ́, ìbísí àti ọrọ̀",
    audioUrl: "/static/audio/pronunciation/osun.mp3", 
    category: "Love & Prosperity"
  },
  {
    id: "obatala",
    orisha: "Ọbàtálá",
    duration: 86,
    description: "Father of creation, king of white cloth, divine sculptor of humanity",
    descriptionYoruba: "Baba ìṣẹ̀dá, ọba aṣọ funfun, onísọ̀nà ẹ̀dá ènìyàn",
    audioUrl: "/static/audio/pronunciation/obatala.mp3",
    category: "Creation & Wisdom"
  }
];

export default function AuthenticAudioShowcase() {
  const { ts } = useLanguage();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const totalDuration = authenticRecordings.reduce((sum, audio) => sum + audio.duration, 0);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playAudio = async (audio: AuthenticAudio) => {
    if (playingId === audio.id) {
      // Stop current audio
      if (audioRefs.current[audio.id]) {
        audioRefs.current[audio.id].pause();
        setPlayingId(null);
      }
      return;
    }

    // Stop any currently playing audio
    Object.values(audioRefs.current).forEach(audioEl => audioEl.pause());
    setPlayingId(null);

    try {
      if (!audioRefs.current[audio.id]) {
        audioRefs.current[audio.id] = new Audio(audio.audioUrl);
        audioRefs.current[audio.id].onended = () => setPlayingId(null);
      }
      
      // Enhanced settings for authentic pronunciation
      audioRefs.current[audio.id].volume = 0.95;
      audioRefs.current[audio.id].playbackRate = 0.9;
      
      await audioRefs.current[audio.id].play();
      setPlayingId(audio.id);
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Water Deities": return <Waves className="h-4 w-4 text-blue-500" />;
      case "Storm & Wind": return <Volume2 className="h-4 w-4 text-gray-500" />;
      case "Motherhood & Protection": return <Star className="h-4 w-4 text-purple-500" />;
      case "Love & Prosperity": return <Star className="h-4 w-4 text-amber-500" />;
      case "Creation & Wisdom": return <Star className="h-4 w-4 text-white" />;
      default: return <Star className="h-4 w-4 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Statistics */}
      <ResponsiveCard animation="fade">
        <CardHeader className="text-center">
          <CardTitle className="text-spiritual-blue dark:text-white flex items-center justify-center gap-2">
            <Star className="h-6 w-6 text-sacred-gold" />
            {ts("Authentic Orisha Pronunciations", "Àwọn Sísọ Òrìṣà Òtítọ́")}
          </CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <div className="text-responsive-xl font-bold text-emerald-600 dark:text-emerald-400">
                {authenticRecordings.length}
              </div>
              <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
                {ts("Authentic", "Òtítọ́")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-responsive-xl font-bold text-blue-600 dark:text-blue-400">
                {formatTime(totalDuration)}
              </div>
              <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
                {ts("Total Time", "Àkókò Gbogbo")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-responsive-xl font-bold text-purple-600 dark:text-purple-400">
                5
              </div>
              <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
                {ts("Orisha", "Òrìṣà")}
              </div>
            </div>
            <div className="text-center">
              <div className="text-responsive-xl font-bold text-sacred-gold">
                100%
              </div>
              <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
                {ts("Nigerian", "Nàìjíríà")}
              </div>
            </div>
          </div>
        </CardHeader>
      </ResponsiveCard>

      {/* Authentic Recordings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {authenticRecordings.map((audio, index) => (
          <ResponsiveCard 
            key={audio.id} 
            animation="slide" 
            delay={index * 0.1}
            className="border-emerald-200 dark:border-emerald-800"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-spiritual-blue dark:text-white">
                      {audio.orisha}
                    </h3>
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      ⭐ {ts("Authentic", "Òtítọ́")}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {getCategoryIcon(audio.category)}
                    <span className="text-responsive-sm text-gray-600 dark:text-gray-400">
                      {audio.category}
                    </span>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-responsive-sm text-gray-500">
                        {formatTime(audio.duration)}
                      </span>
                    </div>
                  </div>

                  <p className="text-responsive-base text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                    {ts(audio.description, audio.descriptionYoruba)}
                  </p>
                </div>

                <Button
                  onClick={() => playAudio(audio)}
                  variant="outline"
                  size="sm"
                  className="ml-4 nav-transition btn-touch border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400"
                >
                  {playingId === audio.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Audio Waveform Visualization */}
              <div className="relative h-8 bg-gradient-to-r from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex space-x-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-emerald-500 dark:bg-emerald-400 rounded transition-all duration-200 ${
                          playingId === audio.id 
                            ? `h-${Math.floor(Math.random() * 6) + 2} animate-pulse` 
                            : 'h-3'
                        }`}
                        style={{
                          animationDelay: playingId === audio.id ? `${i * 100}ms` : '0ms'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </ResponsiveCard>
        ))}
      </div>

      {/* Spiritual Note */}
      <ResponsiveCard animation="fade" delay={0.5} className="bg-gradient-to-r from-spiritual-blue/5 to-sacred-gold/5">
        <CardContent className="p-6 text-center">
          <p className="text-responsive-base text-gray-700 dark:text-gray-300 leading-relaxed">
            {ts(
              "These authentic pronunciations preserve the sacred tradition of Yoruba spiritual practice, connecting you directly to the ancestral wisdom and cultural heritage of Southwest Nigeria.",
              "Àwọn sísọ òtítọ́ wọ̀nyí ń pa àṣà mímọ́ ti ìṣe ẹ̀mí Yorùbá mọ́, tí ó sì ń so ọ́ pọ̀ tààrà sí ọgbọ́n àwọn bàbá ńlá àti ogún àṣà Gúúsù Ìwọ̀oorùn Nàìjíríà."
            )}
          </p>
        </CardContent>
      </ResponsiveCard>
    </div>
  );
}