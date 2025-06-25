import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import RhythmRecommendation from "./rhythm-recommendation";

interface DrumPattern {
  name: string;
  nameYoruba: string;
  pattern: number[];
  color: string;
  frequency: number;
  description: string;
  descriptionYoruba: string;
}

const bataDrumPatterns: DrumPattern[] = [
  {
    name: "Iya (Mother Drum)",
    nameYoruba: "Ìyá (Ìlù Ìyá)",
    pattern: [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    color: "#8B4513", // Deep brown for mother drum
    frequency: 80, // Lower frequency for deeper drum sound
    description: "Deep, resonant mother drum providing the foundation",
    descriptionYoruba: "Ìlù Ìyá tó jinlẹ̀, tí ń fi ìpìlẹ̀ sílẹ̀"
  },
  {
    name: "Itotele (Medium Drum)",
    nameYoruba: "Ìtótẹlẹ (Ìlù Àárín)",
    pattern: [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
    color: "#D2691E", // Medium brown for middle drum
    frequency: 150, // Medium frequency for middle drum
    description: "Medium-pitched drum responding to the mother drum",
    descriptionYoruba: "Ìlù àárín tí ń dáhùn sí Ìyá"
  },
  {
    name: "Okonkolo (Small Drum)",
    nameYoruba: "Ọ̀kọ́nkọlọ (Ìlù Kékeré)",
    pattern: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1],
    color: "#DAA520", // Golden brown for small drum
    frequency: 280, // Higher frequency for smaller drum
    description: "High-pitched drum providing rapid rhythmic patterns",
    descriptionYoruba: "Ìlù kékeré tí ń ṣe àwọn ìlù yára"
  }
];

export default function BataRhythmVisualizer() {
  const { language, ts } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [tempo, setTempo] = useState(120); // BPM
  const [selectedPattern, setSelectedPattern] = useState<string>("egungun");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Traditional Batá rhythm patterns
  const rhythmPatterns = {
    egungun: {
      name: "Egungun Ceremony",
      nameYoruba: "Àjọ̀dún Egúngún",
      description: "Traditional rhythm for ancestral worship",
      descriptionYoruba: "Ìlù ìbílẹ̀ fún ìbọrí àwọn bàbá"
    },
    orisha: {
      name: "Orisha Invocation", 
      nameYoruba: "Ìpè Òrìṣà",
      description: "Sacred rhythm for calling the Orishas",
      descriptionYoruba: "Ìlù mímọ́ fún ìpè àwọn Òrìṣà"
    },
    ifa: {
      name: "Ifá Divination",
      nameYoruba: "Ìfá Dídá",
      description: "Ceremonial rhythm for Ifá consultation",
      descriptionYoruba: "Ìlù àjọ̀dún fún ìfá"
    }
  };

  useEffect(() => {
    // Listen for AI rhythm recommendations
    const handleRecommendation = (event: CustomEvent) => {
      const recommendation = event.detail;
      if (recommendation.tempo) {
        setTempo(recommendation.tempo);
      }
      if (recommendation.primaryPattern) {
        // Map AI recommendation to our pattern keys
        const patternKey = recommendation.primaryPattern.toLowerCase().replace(/[^a-z]/g, '_');
        if (rhythmPatterns[patternKey]) {
          setSelectedPattern(patternKey);
        }
      }
    };

    window.addEventListener('applyRhythmRecommendation', handleRecommendation as EventListener);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Clean up audio reference
      if (bataPlayerRef.current) {
        bataPlayerRef.current.pause();
        bataPlayerRef.current = null;
      }
      window.removeEventListener('applyRhythmRecommendation', handleRecommendation as EventListener);
    };
  }, []);

  // Global reference for better audio control
  const bataPlayerRef = useRef<HTMLAudioElement | null>(null);

  const playDrumSound = (frequency: number, duration: number = 0.2) => {
    // Use authentic Bata drum recording with global reference
    if (!bataPlayerRef.current) {
      bataPlayerRef.current = new Audio('/static/audio/soundscapes/bata_egungun_abida.mp3');
      bataPlayerRef.current.volume = 0.4;
      bataPlayerRef.current.preload = 'auto';
    }
    
    const audio = bataPlayerRef.current.cloneNode() as HTMLAudioElement;
    audio.volume = 0.4;
    
    // Map frequency to different starting positions for variation
    const startPosition = (frequency / 300) * 2; // Map 80-280 Hz to 0-2 seconds
    audio.currentTime = startPosition % 3 || 0;
    
    audio.play().catch(e => console.log("Audio playback failed:", e));
    
    // Stop after duration to prevent overlap
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, duration * 1000);
  };

  const startVisualization = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const beatDuration = (60 / tempo / 3) * 1000; // 12/8 time subdivision

    intervalRef.current = setInterval(() => {
      setCurrentBeat((prev) => {
        const nextBeat = (prev + 1) % 12;
        
        // Play drum sounds for active beats
        bataDrumPatterns.forEach((drum) => {
          if (drum.pattern[nextBeat] === 1) {
            playDrumSound(drum.frequency);
          }
        });
        
        return nextBeat;
      });
    }, beatDuration);

    setIsPlaying(true);
  };

  const stopVisualization = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  const resetVisualization = () => {
    stopVisualization();
    setCurrentBeat(0);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopVisualization();
    } else {
      startVisualization();
    }
  };

  return (
    <div className="space-y-6">
      <RhythmRecommendation />
      
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700">
      <CardHeader>
        <CardTitle className="text-amber-700 dark:text-amber-300 flex items-center gap-3">
          <span className="text-2xl">🥁</span>
          {ts("Batá Rhythm Visualizer", "Afarawé Ìlù Bàtá")}
        </CardTitle>
        <p className="text-sm text-amber-600 dark:text-amber-400">
          {ts(
            "Experience the sacred polyrhythms of traditional Yoruba Batá drumming",
            "Ní ìrírí àwọn ìlù Bàtá Yorùbá ìbílẹ̀"
          )}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Pattern Selection */}
        <div>
          <label className="block text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">
            {ts("Ceremonial Pattern:", "Ìlù Àjọ̀dún:")}
          </label>
          <select
            value={selectedPattern}
            onChange={(e) => setSelectedPattern(e.target.value)}
            className="w-full p-2 border border-amber-300 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {Object.entries(rhythmPatterns).map(([key, pattern]) => (
              <option key={key} value={key}>
                {language === "yoruba" ? pattern.nameYoruba : pattern.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
            {language === "yoruba" 
              ? rhythmPatterns[selectedPattern as keyof typeof rhythmPatterns].descriptionYoruba
              : rhythmPatterns[selectedPattern as keyof typeof rhythmPatterns].description
            }
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <Button
            onClick={togglePlayback}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {isPlaying ? (
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
          
          <Button
            onClick={resetVisualization}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {ts("Reset", "Tún Bẹ̀rẹ̀")}
          </Button>

          <div className="flex items-center gap-2">
            <label className="text-sm text-amber-700 dark:text-amber-300">
              {ts("Tempo:", "Àkókò:")}
            </label>
            <input
              type="range"
              min="60"
              max="180"
              value={tempo}
              onChange={(e) => setTempo(Number(e.target.value))}
              className="w-20 accent-amber-600"
            />
            <span className="text-sm text-amber-600 dark:text-amber-400 w-12">
              {tempo} BPM
            </span>
          </div>
        </div>

        {/* Drum Visualizations */}
        <div className="space-y-4">
          {bataDrumPatterns.map((drum, drumIndex) => (
            <div key={drumIndex} className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200">
                  {language === "yoruba" ? drum.nameYoruba : drum.name}
                </h3>
                <span className="text-xs text-amber-600 dark:text-amber-400">
                  {drum.frequency}Hz
                </span>
              </div>
              
              <p className="text-xs text-amber-600 dark:text-amber-400 mb-3">
                {language === "yoruba" ? drum.descriptionYoruba : drum.description}
              </p>
              
              {/* Beat Pattern Visualization */}
              <div className="flex gap-1">
                {drum.pattern.map((beat, beatIndex) => (
                  <div
                    key={beatIndex}
                    className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold
                      transition-all duration-200 transform
                      ${beat === 1 
                        ? `border-amber-500 ${currentBeat === beatIndex 
                          ? 'scale-125 shadow-lg' 
                          : 'scale-100'
                        }` 
                        : 'border-gray-300 dark:border-gray-600'
                      }
                      ${currentBeat === beatIndex 
                        ? beat === 1 
                          ? 'bg-amber-500 text-white shadow-lg ring-4 ring-amber-300' 
                          : 'bg-gray-300 dark:bg-gray-600 ring-2 ring-gray-400'
                        : beat === 1 
                          ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }
                    `}
                    style={{
                      backgroundColor: currentBeat === beatIndex && beat === 1 ? drum.color : undefined
                    }}
                  >
                    {beatIndex + 1}
                  </div>
                ))}
              </div>
              
              {/* Beat Counter */}
              <div className="mt-2 text-xs text-center text-amber-600 dark:text-amber-400">
                {ts("Beat", "Ìlù")} {currentBeat + 1}/12 - 
                {ts(" Count: ", " Kíka: ")}
                <span className="font-mono">
                  {drum.pattern.map((beat, idx) => 
                    idx === currentBeat ? `[${beat}]` : beat
                  ).join(" ")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Polyrhythm Visualization */}
        <div className="p-4 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-lg">
          <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
            {ts("Combined Polyrhythm", "Ìlù Àpapọ̀")}
          </h3>
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 12 }, (_, beatIndex) => {
              const activeDrums = bataDrumPatterns.filter(drum => drum.pattern[beatIndex] === 1);
              const isCurrentBeat = currentBeat === beatIndex;
              
              return (
                <div
                  key={beatIndex}
                  className={`
                    h-12 rounded border-2 flex flex-col items-center justify-center
                    transition-all duration-200 transform
                    ${isCurrentBeat ? 'scale-110 shadow-lg ring-2 ring-purple-400' : 'scale-100'}
                    ${activeDrums.length > 0 
                      ? 'border-purple-500 bg-purple-200 dark:bg-purple-800' 
                      : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700'
                    }
                  `}
                >
                  <div className="text-xs font-bold text-purple-800 dark:text-purple-200">
                    {beatIndex + 1}
                  </div>
                  <div className="flex gap-0.5">
                    {activeDrums.map((drum, idx) => (
                      <div
                        key={idx}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: drum.color }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 text-center">
            {ts(
              "Circles show which drums play together on each beat",
              "Àwọn àyíká fi hàn ìlù tí wọ́n ń ṣe pápọ̀ lórí ìlù kọ̀ọ̀kan"
            )}
          </p>
        </div>

        {/* Legend */}
        <div className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
          <div className="font-semibold">{ts("Legend:", "Àlàyé:")}</div>
          <div>• {ts("Bright circles = Active beats", "Àyíká dídán = Ìlù tí ń ṣiṣẹ́")}</div>
          <div>• {ts("Gray circles = Rest beats", "Àyíká ewé = Ìlù ìsinmi")}</div>
          <div>• {ts("Highlighted = Current beat", "Tí a yàn = Ìlù lọ́wọ́lọ́wọ́")}</div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}