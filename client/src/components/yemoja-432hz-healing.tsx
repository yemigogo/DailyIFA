import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Waves, 
  Sun, 
  Moon, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Clock, 
  Droplets,
  Heart,
  Sparkles,
  ChevronRight,
  CheckCircle,
  Info,
  Upload,
  Music,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface YemojaRitual {
  frequency: number;
  steps: string[];
  stepsYoruba: string[];
  duration: number;
  items: string[];
  itemsYoruba: string[];
}

interface RitualSession {
  type: 'morning' | 'evening';
  startTime: Date;
  currentStep: number;
  isActive: boolean;
  completed: boolean;
}

const yemojaRituals: Record<'morning' | 'evening', YemojaRitual> = {
  morning: {
    frequency: 432,
    steps: [
      "Face flowing water (river/sink/shower)",
      "Chant: 'Yemọja ìyá mi, mú kí omi iyẹn dúró fún mi' (Mother Yemoja, let this water heal me)",
      "Sip water while visualizing blue light",
      "Gently wash face with prayer"
    ],
    stepsYoruba: [
      "Kọjú sí omi tí ń sàn (odò/sink/shower)",
      "Kọrin: 'Yemọja ìyá mi, mú kí omi iyẹn dúró fún mi'",
      "Mu omi kékeré pẹ̀lú ìfojúrí ìmọ́lẹ̀ búlúù",
      "Fi omi fọ ojú rẹ pẹ̀lú àdúrà"
    ],
    duration: 7,
    items: ["Running water", "Blue cloth/candle", "Clean drinking water"],
    itemsYoruba: ["Omi tí ń sàn", "Aṣọ búlúù/fìtílà", "Omi mímọ́ mímu"]
  },
  evening: {
    frequency: 432,
    steps: [
      "Fill a blue bowl with water",
      "Add sea salt or flower petals",
      "Place under moonlight",
      "Sing: 'Omi Yemọja, omi ìyẹ̀sẹ̀' (Yemoja's water, healing water)"
    ],
    stepsYoruba: [
      "Kun àwokòtò búlúù pẹ̀lú omi",
      "Fi iyọ̀ òkun tàbí petal òdòdó sínú",
      "Gbé sí abẹ́ ìmọ́lẹ̀ òṣùpá",
      "Kọrin: 'Omi Yemọja, omi ìyẹ̀sẹ̀'"
    ],
    duration: 9,
    items: ["Blue bowl", "Sea salt", "Flower petals", "Moonlight access"],
    itemsYoruba: ["Àwokòtò búlúù", "Iyọ̀ òkun", "Petal òdòdó", "Ìmọ́lẹ̀ òṣùpá"]
  }
};

export const Yemoja432HzHealing: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedRitual, setSelectedRitual] = useState<'morning' | 'evening'>('morning');
  const [session, setSession] = useState<RitualSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [useAuthenticAudio, setUseAuthenticAudio] = useState(false);
  const [uploadedTracks, setUploadedTracks] = useState<{morning: File[], evening: File[]}>({
    morning: [],
    evening: []
  });
  
  const [crystalAnimation, setCrystalAnimation] = useState(false);
  const crystalCanvasRef = useRef<HTMLCanvasElement>(null);

  const ts = (english: string, yoruba: string) => 
    language === 'yoruba' ? yoruba : english;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopHealing();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // 3-tier audio system: Uploaded tracks → Royalty-free → Synthetic
  const startHealing = () => {
    console.log('🎵 Starting Yemoja 432Hz healing with 3-tier audio system');
    
    // Tier 1: Try uploaded tracks first
    const currentTracks = uploadedTracks[selectedRitual];
    if (currentTracks.length > 0) {
      console.log('✓ Using uploaded authentic tracks (Tier 1)');
      playUploadedTrack(currentTracks[0]);
      return;
    }
    
    // Tier 2: Try royalty-free audio
    console.log('→ Trying royalty-free audio (Tier 2)');
    tryRoyaltyFreeAudio();
  };

  const tryRoyaltyFreeAudio = () => {
    const audioFiles = selectedRitual === 'morning' 
      ? ['/static/audio/yemoja_432hz_morning_free.mp3']
      : ['/static/audio/yemoja_432hz_evening_free.mp3'];
    
    const audio = new Audio(audioFiles[0]);
    audio.volume = volume;
    audio.loop = true;
    
    audio.addEventListener('loadeddata', () => {
      console.log('✓ Royalty-free audio loaded, starting playback');
      setUseAuthenticAudio(true);
      setIsPlaying(true);
      
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      audioElementRef.current = audio;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('✓ Royalty-free audio playback started');
          toast({
            title: ts('Playing Royalty-Free 432Hz', 'Ń Dún 432Hz Ọ̀fẹ́'),
            description: ts('Authentic water healing frequencies from Pixabay', 'Àwọn ìgbọ̀nsí ìwòsàn omi òtítọ́ láti Pixabay'),
          });
        }).catch(() => {
          console.log('→ Royalty-free failed, falling back to synthetic (Tier 3)');
          generate432HzAudio();
        });
      }
    });
    
    audio.addEventListener('error', () => {
      console.log('→ Royalty-free failed, falling back to synthetic (Tier 3)');
      generate432HzAudio();
    });
  };

  const generate432HzAudio = () => {
    console.log('🎛️ Generating synthetic 432Hz audio (Tier 3)');
    setUseAuthenticAudio(false);
    generate432HzTone();
    
    toast({
      title: ts('Synthetic 432Hz Generated', 'Orin 432Hz Àgbélẹ̀wá Ti Jáde'),
      description: ts('Upload your tracks in Audio tab for authentic experience', 
                     'Gbé àwọn orin rẹ sí Audio tab fún ìrírí òtítọ́'),
      variant: "default",
    });
  };

  const generate432HzTone = () => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
    }

    const audioContext = audioContextRef.current;
    
    // Create water-like tone using multiple frequencies
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const oscillator3 = audioContext.createOscillator();
    
    const gainNode = audioContext.createGain();
    const masterGain = audioContext.createGain();
    
    // 432Hz base frequency with harmonics for water-like sound
    oscillator1.frequency.value = 432;
    oscillator2.frequency.value = 432 * 1.5; // Perfect fifth
    oscillator3.frequency.value = 432 * 2; // Octave
    
    // Create flowing water effect
    oscillator1.type = 'sine';
    oscillator2.type = 'triangle';
    oscillator3.type = 'sine';
    
    // Connect oscillators
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    oscillator3.connect(gainNode);
    gainNode.connect(masterGain);
    masterGain.connect(audioContext.destination);
    
    // Set volumes for harmonious blend
    gainNode.gain.value = 0.3;
    masterGain.gain.value = volume;
    
    // Add gentle modulation for flowing effect
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();
    lfo.frequency.value = 0.1; // Slow modulation
    lfoGain.gain.value = 5;
    
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator1.frequency);
    
    oscillator1.start();
    oscillator2.start();
    oscillator3.start();
    lfo.start();
    
    oscillatorRef.current = oscillator1;
    gainNodeRef.current = masterGain;
    setIsPlaying(true);
    
    return { oscillator1, oscillator2, oscillator3, lfo, masterGain };
  };

  const playUploadedTrack = (track: File) => {
    const url = URL.createObjectURL(track);
    const audio = new Audio(url);
    audio.volume = volume;
    audio.loop = true;
    
    audio.addEventListener('loadeddata', () => {
      console.log('✓ Uploaded track loaded');
      setUseAuthenticAudio(true);
      setIsPlaying(true);
      
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      audioElementRef.current = audio;
      
      audio.play().then(() => {
        toast({
          title: ts('Playing Your Track', 'Ń Dún Orin Rẹ'),
          description: ts(`Now playing: ${track.name}`, `Ń dún: ${track.name}`),
        });
      }).catch(() => {
        console.log('→ Uploaded track failed, trying royalty-free');
        tryRoyaltyFreeAudio();
      });
    });
    
    audio.addEventListener('error', () => {
      console.log('→ Uploaded track failed, trying royalty-free');
      tryRoyaltyFreeAudio();
    });
  };

  const stopHealing = () => {
    setIsPlaying(false);
    setProgress(0);
    
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (e) {
        console.log('Oscillator already stopped');
      }
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    oscillatorRef.current = null;
    gainNodeRef.current = null;
  };

  const updateVolume = (newVolume: number) => {
    setVolume(newVolume);
    
    if (audioElementRef.current) {
      audioElementRef.current.volume = newVolume;
    }
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'morning' | 'evening') => {
    const files = Array.from(event.target.files || []);
    const audioFiles = files.filter(file => file.type.startsWith('audio/'));
    
    if (audioFiles.length === 0) {
      toast({
        title: ts('Invalid File Type', 'Irúfẹ́ Fáìlì Tí Kò Tọ́'),
        description: ts('Please upload audio files (MP3, WAV, OGG, M4A)', 'Jọ̀wọ́ gbé àwọn fáìlì orin (MP3, WAV, OGG, M4A)'),
        variant: "destructive",
      });
      return;
    }
    
    setUploadedTracks(prev => ({
      ...prev,
      [type]: [...prev[type], ...audioFiles]
    }));
    
    toast({
      title: ts('Audio Files Uploaded', 'Àwọn Fáìlì Orin Ti Gba'),
      description: ts(`Added ${audioFiles.length} files to ${type} ritual`, `Fi ${audioFiles.length} fáìlì kun àpọ̀ àṣẹ ${type}`),
    });
  };

  const removeTrack = (type: 'morning' | 'evening', index: number) => {
    setUploadedTracks(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const startRitual = (type: 'morning' | 'evening') => {
    setSession({
      type,
      startTime: new Date(),
      currentStep: 0,
      isActive: true,
      completed: false
    });
    
    setSelectedRitual(type);
    startHealing();
  };

  const nextStep = () => {
    if (!session) return;
    
    const nextStepIndex = session.currentStep + 1;
    const totalSteps = yemojaRituals[session.type].steps.length;
    
    if (nextStepIndex >= totalSteps) {
      setSession(prev => prev ? { ...prev, completed: true, isActive: false } : null);
      stopHealing();
      
      toast({
        title: ts('Ritual Complete', 'Àṣẹ Parí'),
        description: ts('Yemoja\'s blessing flows through you', 'Ìbùkún Yemoja ń sàn nínú rẹ'),
      });
    } else {
      setSession(prev => prev ? { ...prev, currentStep: nextStepIndex } : null);
    }
  };

  const waterScienceInfo = {
    title: ts('Science of 432Hz & Water', 'Sáyẹ́nsì 432Hz & Omi'),
    points: [
      ts('432Hz resonates with water\'s molecular structure', '432Hz bá ètò mólíkúlà omi mu'),
      ts('Dr. Masaru Emoto\'s research shows water responds to prayer', 'Ìwádìí Dr. Masaru Emoto fihàn pé omi dáhùn sí àdúrà'),
      ts('Yemọja\'s energy amplifies in blue environments', 'Agbára Yemọja pọ̀ sí i nínú àyíká búlúù'),
    ],
    experiment: {
      title: ts('Water Crystal Experiment', 'Ìdánwò Kírísítálì Omi'),
      steps: [
        ts('Speak blessings to two water containers', 'Sọ ìbùkún sí àwokòtò omi méjì'),
        ts('Play 432Hz for one, random noise for another', 'Dún 432Hz fún ọ̀kan, ariwo lásán fún èkejì'),
        ts('Freeze and compare crystal formations', 'Dì wọ́n kí o sì fi àwọn kírísítálì wé ara wọn'),
      ]
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-6">
      {/* Daily Affirmation Section - Mobile-first */}
      <div className="bg-gray-800/60 p-4 md:p-6 border-l-4 border-cyan-300 rounded-lg mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
          🙏 {ts('Daily Water Blessing', 'Ìbùkún Omi Ojoojúmọ́')}
        </h2>
        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-4 rounded-lg border border-cyan-300/20">
          <p className="text-blue-100 italic text-base md:text-lg leading-relaxed text-center">
            {ts(
              '"Waters of Yemọja flow through me. I am cleansed, healed, and renewed with each breath."',
              '"Omi Yemọja ń sàn nínú mi. Mo ti di mímọ́, mo ti san, mo sì ti di tuntun pẹ̀lú gbogbo èémí."'
            )}
          </p>
          <div className="mt-3 pt-3 border-t border-cyan-300/20">
            <p className="text-xs md:text-sm text-cyan-200 text-center">
              {ts('Speak this blessing while touching water during 432Hz meditation', 'Sọ ìbùkún yìí nígbà tí o bá fi ọwọ́ kan omi ní àsìkò àṣẹ 432Hz')}
            </p>
          </div>
        </div>
      </div>

      {/* Header - Mobile optimized */}
      <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-none">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-xl md:text-2xl">
            <Waves className="w-6 h-6 md:w-8 md:h-8" />
            <span className="text-center md:text-left">
              {ts('Yemọja 432Hz Water Healing + Water Loop', 'Ìwòsàn Omi Yemọja 432Hz + Omi Títún')}
            </span>
          </CardTitle>
          <p className="text-blue-100 text-sm md:text-base text-center md:text-left">
            {ts('Sacred water rituals at the healing frequency of 432Hz', 'Àwọn àṣẹ omi mímọ́ ní ìgbọ̀nsí ìwòsàn 432Hz')}
          </p>
        </CardHeader>
      </Card>

      {/* Main Content Tabs - Mobile-first */}
      <Tabs defaultValue="meditation" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-1 md:gap-2 h-auto p-1">
          <TabsTrigger value="rituals" className="text-xs md:text-sm p-2 md:p-3 flex flex-col md:flex-row items-center gap-1 md:gap-2">
            <Droplets className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">{ts('Rituals', 'Àṣẹ')}</span>
            <span className="md:hidden">💧</span>
          </TabsTrigger>
          <TabsTrigger value="meditation" className="text-xs md:text-sm p-2 md:p-3 flex flex-col md:flex-row items-center gap-1 md:gap-2 relative">
            <Heart className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">{ts('Meditation', 'Ìjìnlẹ̀')}</span>
            <span className="md:hidden">🧘</span>
            <Badge variant="secondary" className="absolute -top-1 -right-1 text-xs px-1 py-0.5 bg-red-500 text-white animate-pulse">UPDATED</Badge>
          </TabsTrigger>
          <TabsTrigger value="audio" className="text-xs md:text-sm p-2 md:p-3 flex flex-col md:flex-row items-center gap-1 md:gap-2">
            <Music className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">{ts('Audio', 'Orin')}</span>
            <span className="md:hidden">🎵</span>
          </TabsTrigger>
          <TabsTrigger value="science" className="text-xs md:text-sm p-2 md:p-3 flex flex-col md:flex-row items-center gap-1 md:gap-2">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">{ts('Science', 'Sáyẹ́nsì')}</span>
            <span className="md:hidden">✨</span>
          </TabsTrigger>
          <TabsTrigger value="session" className="text-xs md:text-sm p-2 md:p-3 flex flex-col md:flex-row items-center gap-1 md:gap-2">
            <Clock className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden md:inline">{ts('Session', 'Àkókò')}</span>
            <span className="md:hidden">⏰</span>
          </TabsTrigger>
        </TabsList>

        {/* Rituals Tab */}
        <TabsContent value="rituals" className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Morning Ritual */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Sun className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
                  {ts('Morning Cleansing', 'Ìwẹ̀ Òwúrọ̀')}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  {yemojaRituals.morning.duration} {ts('minutes', 'ìṣẹ́jú')}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm md:text-base">{ts('Steps:', 'Àwọn Ìgbésẹ̀:')}</h4>
                  <ul className="space-y-1 text-xs md:text-sm">
                    {yemojaRituals.morning.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-600 font-bold text-xs">{index + 1}.</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {language === 'yoruba' ? yemojaRituals.morning.stepsYoruba[index] : step}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm md:text-base">{ts('Items needed:', 'Ohun tí a nílò:')}</h4>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {yemojaRituals.morning.items.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {language === 'yoruba' ? yemojaRituals.morning.itemsYoruba[index] : item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button 
                  onClick={() => startRitual('morning')}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                  disabled={isPlaying}
                >
                  <Sun className="w-4 h-4 mr-2" />
                  {ts('Start Morning Ritual', 'Bẹ̀rẹ̀ Àṣẹ Òwúrọ̀')}
                </Button>
              </CardContent>
            </Card>

            {/* Evening Ritual */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Moon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  {ts('Evening Moon Water', 'Omi Òṣùpá Àṣálẹ́')}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  {yemojaRituals.evening.duration} {ts('minutes', 'ìṣẹ́jú')}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm md:text-base">{ts('Steps:', 'Àwọn Ìgbésẹ̀:')}</h4>
                  <ul className="space-y-1 text-xs md:text-sm">
                    {yemojaRituals.evening.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold text-xs">{index + 1}.</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {language === 'yoruba' ? yemojaRituals.evening.stepsYoruba[index] : step}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm md:text-base">{ts('Items needed:', 'Ohun tí a nílò:')}</h4>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {yemojaRituals.evening.items.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {language === 'yoruba' ? yemojaRituals.evening.itemsYoruba[index] : item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button 
                  onClick={() => startRitual('evening')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isPlaying}
                >
                  <Moon className="w-4 h-4 mr-2" />
                  {ts('Start Evening Ritual', 'Bẹ̀rẹ̀ Àṣẹ Àṣálẹ́')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Meditation Tab */}
        <TabsContent value="meditation" className="space-y-4 md:space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                <Heart className="w-6 h-6 text-blue-600" />
                {ts('Yemoja Meditation - 10 Minutes', 'Ìjìnlẹ̀ Yemoja - Ìṣẹ́jú Mẹ́wàá')}
              </CardTitle>
              <p className="text-blue-700 dark:text-blue-300">
                {ts('Authentic guided meditation with sacred Yoruba prayers', 'Ìjìnlẹ̀ tí a tọ́ sí pẹ̀lú àwọn àdúrà Yorùbá mímọ́')}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title Image */}
              <div className="text-center">
                <img 
                  src="/static/images/Yemoja_Title.png" 
                  alt="Yemoja Meditation Title"
                  className="w-full max-w-lg mx-auto rounded-lg shadow-md"
                />
              </div>

              {/* Audio Players */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{ts('10-Minute Guided Meditation', 'Ìjìnlẹ̀ Tí A Tọ́ Sí (10 Ìṣẹ́jú)')}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {ts('Complete meditation with prayers', 'Ìjìnlẹ̀ pípé pẹ̀lú àwọn àdúrà')}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <audio 
                      controls 
                      className="w-full"
                      src="/static/audio/Yemoja_Meditation_10min_Soft.mp3"
                    >
                      {ts('Your browser does not support the audio element.', 'Browser rẹ kò ṣe àtìlẹ́yìn fún ohun tí a gbé.')}
                    </audio>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50/50 dark:bg-blue-900/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{ts('Water Loop Meditation', 'Ìjìnlẹ̀ Omi Títún')}</CardTitle>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {ts('Continuous water sounds for extended meditation', 'Ohùn omi títún fún ìjìnlẹ̀ gígùn')}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <audio 
                      controls 
                      loop
                      className="w-full"
                      src="/static/audio/water_loop.wav"
                    >
                      {ts('Your browser does not support the audio element.', 'Browser rẹ kò ṣe àtìlẹ́yìn fún ohun tí a gbé.')}
                    </audio>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                      {ts('Perfect for extended meditation sessions', 'Dára fún àwọn ìjìnlẹ̀ gígùn')}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Yoruba Prayers */}
              <Card className="bg-cyan-50 dark:bg-cyan-900/20">
                <CardHeader>
                  <CardTitle className="text-lg">{ts('Sacred Prayers (Yoruba)', 'Àwọn Àdúrà Mímọ́ (Yorùbá)')}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {ts('Follow along with these authentic Yoruba prayers during meditation', 'Tẹ̀lé àwọn àdúrà Yorùbá òtítọ́ wọ̀nyí ní àsìkò ìjìnlẹ̀')}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">{ts('Opening Prayer', 'Àdúrà Ìbẹ̀rẹ̀')}</h4>
                      <p className="text-sm italic mb-1">"Ìyá omi, má bọ̀, má gbà mí"</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{ts('Mother of waters, come to me, save me', 'Ìyá omi, wá sí ọ̀dọ̀ mi, gbà mí')}</p>
                    </div>
                    
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">{ts('Release Prayer', 'Àdúrà Ìtúsílẹ̀')}</h4>
                      <p className="text-sm italic mb-1">"Pẹ̀lú ìgbi omi kọọkan, mo fi ohun tí kò yẹ mí sílẹ̀"</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{ts('With each wave, I release what no longer serves me', 'Pẹ̀lú ìgbi kọọkan, mo fi ohun tí kò yẹ mí sílẹ̀')}</p>
                    </div>
                    
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">{ts('Flow Prayer', 'Àdúrà Ìsàn')}</h4>
                      <p className="text-sm italic mb-1">"Bí omi ṣe ń rìnrìn àjò rẹ̀, àlàáfíà ń padà tọ mí wá"</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{ts('As water flows on its journey, peace returns to me', 'Bí omi ṣe ń rìnrìn àjò rẹ̀, àlàáfíà ń padà tọ mí wá')}</p>
                    </div>
                    
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">{ts('Healing Prayer', 'Àdúrà Ìwòsàn')}</h4>
                      <p className="text-sm italic mb-1">"Yemoja, omi àlàáfíà, omi ìwòsàn"</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{ts('Yemoja, water of peace, water of healing', 'Yemoja, omi àlàáfíà, omi ìwòsàn')}</p>
                    </div>
                    
                    <div className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">{ts('Closing Prayer', 'Àdúrà Ìparí')}</h4>
                      <p className="text-sm italic mb-1">"Olókun omi, Yemoja má bá wa gbe. Àṣẹ"</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{ts('Olokun of waters, Yemoja support us. Ashe', 'Olókun omi, Yemoja má bá wa gbe. Àṣẹ')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Closing Image */}
              <div className="text-center">
                <img 
                  src="/static/images/Yemoja_Closing.png" 
                  alt="Yemoja Meditation Closing"
                  className="w-full max-w-lg mx-auto rounded-lg shadow-md"
                />
              </div>

              {/* Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-blue-100 dark:bg-blue-900/30">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">{ts('Guided Meditation (10 min)', 'Ìjìnlẹ̀ Tí A Tọ́ Sí (10 ìṣẹ́jú)')}</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">1.</span>
                        <span>{ts('Find a quiet space near water if possible', 'Wá ibi ìdákẹ́jẹ́ tí omi bá wà níbẹ̀ bí ó bá ṣe é ṣe')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">2.</span>
                        <span>{ts('Listen to the 10-minute guided meditation', 'Gbọ́ ìjìnlẹ̀ tí a tọ́ sí fún ìṣẹ́jú mẹ́wàá')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">3.</span>
                        <span>{ts('Repeat the Yoruba prayers along with the audio', 'Tún àwọn àdúrà Yorùbá náà sọ pẹ̀lú ohùn náà')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">4.</span>
                        <span>{ts('Visualize flowing water cleansing your spirit', 'Fojú inú rí omi tí ń sàn tí ń fọ ẹ̀mí rẹ')}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-cyan-100 dark:bg-cyan-900/30">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">{ts('Water Loop Meditation', 'Ìjìnlẹ̀ Omi Títún')}</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-600 font-bold">1.</span>
                        <span>{ts('Play the water loop audio with repeat enabled', 'Ṣí ohùn omi títún pẹ̀lú ìtúnsọ')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-600 font-bold">2.</span>
                        <span>{ts('Meditate for as long as desired', 'Ṣe ìjìnlẹ̀ fún àkókò tí o bá fẹ́')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-600 font-bold">3.</span>
                        <span>{ts('Focus on the flowing water sounds', 'Gbojú sórí ohùn omi tí ń ṣàn')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-600 font-bold">4.</span>
                        <span>{ts('Use the Yoruba prayers as mantras', 'Lo àwọn àdúrà Yorùbá gẹ́gẹ́ bí mantra')}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audio Tab */}
        <TabsContent value="audio" className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  {ts('Upload 432Hz Tracks', 'Gbé Àwọn Orin 432Hz')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Sun className="w-4 h-4 text-yellow-600" />
                    {ts('Morning Tracks', 'Àwọn Orin Òwúrọ̀')}
                  </h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="audio/*"
                      multiple
                      onChange={(e) => handleFileUpload(e, 'morning')}
                      className="hidden"
                      id="morning-upload"
                    />
                    <label htmlFor="morning-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {ts('Click to upload morning 432Hz tracks', 'Tẹ láti gbé àwọn orin 432Hz òwúrọ̀')}
                      </p>
                    </label>
                  </div>
                  {uploadedTracks.morning.length > 0 && (
                    <div className="space-y-2">
                      {uploadedTracks.morning.map((track, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm truncate">{track.name}</span>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => removeTrack('morning', index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Moon className="w-4 h-4 text-blue-600" />
                    {ts('Evening Tracks', 'Àwọn Orin Àṣálẹ́')}
                  </h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="audio/*"
                      multiple
                      onChange={(e) => handleFileUpload(e, 'evening')}
                      className="hidden"
                      id="evening-upload"
                    />
                    <label htmlFor="evening-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {ts('Click to upload evening 432Hz tracks', 'Tẹ láti gbé àwọn orin 432Hz àṣálẹ́')}
                      </p>
                    </label>
                  </div>
                  {uploadedTracks.evening.length > 0 && (
                    <div className="space-y-2">
                      {uploadedTracks.evening.map((track, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm truncate">{track.name}</span>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => removeTrack('evening', index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Audio Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  {ts('Audio Controls', 'Àwọn Ìṣàkóso Orin')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={isPlaying ? stopHealing : startHealing}
                      className="flex-1"
                      variant={isPlaying ? "destructive" : "default"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isPlaying ? ts('Stop', 'Dákẹ́') : ts('Play 432Hz', 'Dún 432Hz')}
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <VolumeX className="w-4 h-4" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => updateVolume(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{ts('Audio Priority System', 'Ètò Àṣẹ Orin')}</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>1. {ts('Uploaded tracks (highest quality)', 'Àwọn orin tí a gbà (tó dára jù)')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>2. {ts('Royalty-free Pixabay audio', 'Orin Pixabay tí kò ní owó')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>3. {ts('Synthetic 432Hz generation', 'Ìṣẹ̀dá 432Hz àgbélẹ̀wá')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${useAuthenticAudio ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                    <span className="text-sm font-medium">
                      {useAuthenticAudio 
                        ? ts('Currently: Authentic Audio', 'Lọ́wọ́lọ́wọ́: Orin Òtítọ́')
                        : ts('Currently: Synthetic Audio', 'Lọ́wọ́lọ́wọ́: Orin Àgbélẹ̀wá')
                      }
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {ts('System automatically uses the best available audio source for optimal healing experience', 
                        'Ètò náà máa lo orísun orin tó dára jù fún ìrírí ìwòsàn tó dára jù')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Authentic Yemoja Cantigas Audio */}
            <Card className="bg-gradient-to-br from-cyan-900/80 to-blue-900/80 border border-cyan-300/30">
              <CardHeader>
                <CardTitle className="text-cyan-200 flex items-center gap-2">
                  <Waves className="w-5 h-5 text-cyan-400" />
                  🎤 {ts('Yemoja Cantigas', 'Orin Yemoja')}
                  <Badge className="bg-emerald-100 text-emerald-800 text-xs animate-pulse">NEW</Badge>
                </CardTitle>
                <p className="text-cyan-300 text-sm">
                  {ts('Authentic Cantigas de Yemaya - Traditional water praise songs (7.7MB)', 'Orin Yemoja Òtítọ́ - Àwọn orin ìyìn omi àtọwọ́dọ́wọ́ (7.7MB)')}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-black/30 p-4 rounded-lg border border-cyan-500/20">
                  <p className="text-xs text-cyan-200 mb-3 font-medium">
                    {ts('Traditional Cantigas de Yemaya', 'Orin Yemoja Àtọwọ́dọ́wọ́')}
                  </p>
                  <audio 
                    controls 
                    preload="metadata"
                    className="w-full mb-3"
                    style={{ filter: 'sepia(10%) hue-rotate(180deg) saturate(1.2)' }}
                    onError={(e) => {
                      console.error('Yemoja Cantigas audio loading error:', e);
                      const target = e.target as HTMLAudioElement;
                      console.log('Failed source:', target.src);
                    }}
                    onCanPlay={() => console.log('Yemoja Cantigas audio ready to play')}
                  >
                    <source src="/static/audio/yemoja_cantigas_authentic.mp3" type="audio/mpeg" />
                    <source src="/static/audio/yemoja_cantigas_authentic.mp3" type="audio/mp3" />
                    {ts('Your browser does not support audio playback.', 'Àṣáwòrán rẹ kò ṣàtìlẹ́yìn dídún orin.')} <a href="/static/audio/yemoja_cantigas_authentic.mp3" target="_blank" className="text-cyan-300 underline">{ts('Download the Cantigas audio file', 'Gbà fáìlì orin Cantigas')}</a>
                  </audio>
                  
                  {/* Audio Test Buttons */}
                  <div className="flex gap-2 mb-3">
                    <button 
                      onClick={() => {
                        const audio = new Audio('/static/audio/yemoja_cantigas_authentic.mp3');
                        audio.play().catch(e => console.error('Direct Cantigas audio play error:', e));
                      }}
                      className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white text-xs rounded"
                    >
                      {ts('Test Cantigas Audio', 'Ṣàyẹ̀wò Orin Cantigas')}
                    </button>
                    <a 
                      href="/static/audio/yemoja_cantigas_authentic.mp3" 
                      target="_blank"
                      className="px-3 py-1 bg-cyan-800 hover:bg-cyan-900 text-white text-xs rounded"
                    >
                      {ts('Direct Link', 'Ọ̀nà Tàárà')}
                    </a>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-cyan-300 italic">
                      {ts('"Cantigas de Yemaya - Traditional water praise songs..."', '"Orin Yemoja - Àwọn orin ìyìn omi àtọwọ́dọ́wọ́..."')}
                    </p>
                    <p className="text-xs text-cyan-200">
                      {ts('Traditional Cantigas celebrating Yemoja\'s dominion over waters, emotions, and maternal protection.', 'Orin àtọwọ́dọ́wọ́ tí ń ṣàjọyọ̀ ìjọba Yemoja lórí omi, ìmọ̀lára, àti àabo ìyá.')}
                    </p>
                    <div className="mt-3 p-2 bg-cyan-900/20 rounded border border-cyan-500/20">
                      <p className="text-xs text-cyan-200 font-medium mb-1">{ts('Spiritual Practice:', 'Àṣẹ Ẹ̀mí:')}</p>
                      <p className="text-xs text-cyan-300">
                        {ts('Play these Cantigas during water meditation or when calling upon Yemoja\'s nurturing energy for emotional healing.', 'Dún àwọn Cantigas yìí nígbà àṣẹ omi tàbí nígbà tí o bá ń pe agbára tọ́jú Yemoja fún ìwòsàn ìmọ̀lára.')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Science Tab */}
        <TabsContent value="science" className="space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                {waterScienceInfo.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">{ts('Scientific Facts', 'Àwọn Òtítọ́ Sáyẹ́nsì')}</h4>
                <ul className="space-y-2">
                  {waterScienceInfo.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">{waterScienceInfo.experiment.title}</h4>
                <div className="space-y-2">
                  {waterScienceInfo.experiment.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold text-sm">{index + 1}.</span>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  {ts('Water Crystal Visualization', 'Ìfihàn Kírísítálì Omi')}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {ts('432Hz creates beautiful hexagonal water crystal formations, similar to Dr. Emoto\'s research', 
                      '432Hz ń ṣẹ̀dá àwọn kírísítálì omi onígun mẹ́fà tó lẹ́wà, bí ìwádìí Dr. Emoto')}
                </p>
                <Button 
                  onClick={() => setCrystalAnimation(!crystalAnimation)}
                  variant="outline"
                  className="w-full"
                >
                  {crystalAnimation ? ts('Stop Animation', 'Dá Animation Dúró') : ts('Start Animation', 'Bẹ̀rẹ̀ Animation')}
                </Button>
                {crystalAnimation && (
                  <div className="mt-3 flex justify-center">
                    <canvas 
                      ref={crystalCanvasRef}
                      className="border rounded-lg max-w-full h-auto"
                      style={{ maxWidth: '300px', maxHeight: '300px' }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Session Tab */}
        <TabsContent value="session" className="space-y-4 md:space-y-6">
          {!session ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {ts('Start a Water Healing Session', 'Bẹ̀rẹ̀ Àkókò Ìwòsàn Omi')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {ts('Choose a ritual to begin your guided 432Hz water healing session', 
                      'Yan àṣẹ kan láti bẹ̀rẹ̀ àkókò ìwòsàn omi 432Hz tí a máa tọ́ ọ sí')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => startRitual('morning')}
                    className="h-auto p-4 bg-yellow-600 hover:bg-yellow-700"
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <Sun className="w-5 h-5" />
                        {ts('Morning Cleansing', 'Ìwẹ̀ Òwúrọ̀')}
                      </div>
                      <p className="text-sm opacity-90">
                        {ts('7-minute flowing water ritual', 'Àṣẹ omi tí ń sàn fún ìṣẹ́jú 7')}
                      </p>
                    </div>
                  </Button>
                  <Button 
                    onClick={() => startRitual('evening')}
                    className="h-auto p-4 bg-blue-600 hover:bg-blue-700"
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <Moon className="w-5 h-5" />
                        {ts('Evening Moon Water', 'Omi Òṣùpá Àṣálẹ́')}
                      </div>
                      <p className="text-sm opacity-90">
                        {ts('9-minute moonlight blessing', 'Ìbùkún ìmọ́lẹ̀ òṣùpá fún ìṣẹ́jú 9')}
                      </p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Session Header */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {session.type === 'morning' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    {ts(`${session.type === 'morning' ? 'Morning' : 'Evening'} Session Active`, 
                        `Àkókò ${session.type === 'morning' ? 'Òwúrọ̀' : 'Àṣálẹ́'} Ń Lọ`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {ts('Duration:', 'Ìgbà:')} {yemojaRituals[session.type].duration} {ts('minutes', 'ìṣẹ́jú')}
                    </span>
                    <Badge variant={session.completed ? "default" : "secondary"}>
                      {session.completed ? ts('Completed', 'Parí') : ts('In Progress', 'Ń Lọ')}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Current Step */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {ts('Current Step', 'Ìgbésẹ̀ Lọ́wọ́lọ́wọ́')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {yemojaRituals[session.type].steps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          index === session.currentStep
                            ? 'bg-blue-50 border-2 border-blue-200 dark:bg-blue-900/20'
                            : 'bg-gray-50 dark:bg-gray-800'
                        }`}
                      >
                        <span className={`font-semibold ${
                          index === session.currentStep ? 'text-blue-600' : 'text-gray-400'
                        }`}>
                          {index + 1}.
                        </span>
                        <span className={index === session.currentStep ? 'font-medium' : 'text-gray-600 dark:text-gray-400'}>
                          {language === 'yoruba' ? yemojaRituals[session.type].stepsYoruba[index] : step}
                        </span>
                        {index === session.currentStep && (
                          <ChevronRight className="w-4 h-4 text-blue-600 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {session.currentStep < yemojaRituals[session.type].steps.length - 1 && (
                    <Button onClick={nextStep} className="w-full">
                      {ts('Next Step', 'Ìgbésẹ̀ Tókàn')}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Yemoja432HzHealing;