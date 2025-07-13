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
  Music
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
  const [showScience, setShowScience] = useState(false);
  
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

  const ts = (english: string, yoruba: string) => 
    language === 'yoruba' ? yoruba : english;

  useEffect(() => {
    return () => {
      stopHealing();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Authentic 432Hz audio sources for Yemoja water healing
  const authentic432HzSources = {
    morning: [
      "https://www.youtube.com/watch?v=wGHQ2sPFfXk", // 432Hz Water Meditation
      "https://www.youtube.com/watch?v=i11MakqVr7c", // 432Hz Ocean Waves
      "https://www.youtube.com/watch?v=sUHKjej4CRM", // 432Hz Healing Water
    ],
    evening: [
      "https://www.youtube.com/watch?v=YQQ2StSwg_s", // 432Hz Moon Water
      "https://www.youtube.com/watch?v=E2bMQi2vRHs", // 432Hz Night Healing
      "https://www.youtube.com/watch?v=5qap5aO4i9A", // 432Hz Deep Water
    ]
  };

  const tryAuthenticAudio = (type: 'morning' | 'evening') => {
    // First try uploaded local files
    const userTracks = uploadedTracks[type];
    if (userTracks.length > 0) {
      const randomTrack = userTracks[Math.floor(Math.random() * userTracks.length)];
      const audio = new Audio();
      audio.volume = volume;
      audio.loop = true;
      
      const objectUrl = URL.createObjectURL(randomTrack);
      audio.src = objectUrl;
      
      audio.addEventListener('loadeddata', () => {
        setUseAuthenticAudio(true);
        audioElementRef.current = audio;
        
        toast({
          title: ts('Authentic Track Loaded', 'Orin Òtítọ́ Ti Gbà'),
          description: ts(`Playing: ${randomTrack.name}`, `Ń dún: ${randomTrack.name}`),
        });
      });
      
      audio.addEventListener('error', () => {
        setUseAuthenticAudio(false);
        generate432HzTone();
      });
      
      audio.play().catch(() => {
        setUseAuthenticAudio(false);
        generate432HzTone();
      });
      
      return;
    }
    
    // Fallback to synthetic generation for demo purposes
    setUseAuthenticAudio(false);
    generate432HzTone();
    
    toast({
      title: ts('Synthetic 432Hz Active', 'Ìṣẹ̀dá 432Hz Ń Ṣiṣẹ́'),
      description: ts('Upload your own 432Hz tracks for authentic healing experience', 
                     'Gbé àwọn orin 432Hz tirẹ sókè fún ìrírí ìwòsàn òtítọ́'),
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
    
    return { oscillator1, oscillator2, oscillator3, lfo, masterGain };
  };

  const startHealing = () => {
    if (!session) return;
    
    setIsPlaying(true);
    
    // Try authentic audio first, fallback to synthetic
    tryAuthenticAudio(session.type);
    
    const ritual = yemojaRituals[session.type];
    
    // Progress tracking
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (ritual.duration * 60));
        if (newProgress >= 100) {
          completeRitual();
          return 100;
        }
        return newProgress;
      });
    }, 1000);
    
    intervalRef.current = progressInterval;
    
    toast({
      title: ts('Healing Started', 'Ìwòsàn Bẹ̀rẹ̀'),
      description: ts(`432Hz frequencies now playing for ${ritual.duration} minutes`, 
                     `Àwọn ìgbọ̀nsí 432Hz ń dún fún ìṣẹ́jú ${ritual.duration}`),
    });
  };

  const stopHealing = () => {
    setIsPlaying(false);
    
    // Stop authentic audio if playing
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current = null;
    }
    
    // Stop synthetic audio if playing
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setUseAuthenticAudio(false);
  };

  const completeRitual = () => {
    if (!session) return;
    
    setSession(prev => prev ? { ...prev, completed: true, isActive: false } : null);
    setIsPlaying(false);
    setProgress(100);
    
    stopHealing();
    
    toast({
      title: ts('Ritual Complete! Àṣẹ Yemọja!', 'Àṣẹ Parí! Àṣẹ Yemọja!'),
      description: ts('Dispose of ritual water by returning it to nature', 
                     'Dà omi àṣẹ náà sí ọ̀nà àdáyébá'),
    });
  };

  const startRitual = (type: 'morning' | 'evening') => {
    setSession({
      type,
      startTime: new Date(),
      currentStep: 0,
      isActive: true,
      completed: false
    });
    setProgress(0);
    setSelectedRitual(type);
  };

  const updateVolume = (newVolume: number) => {
    setVolume(newVolume);
    
    // Update authentic audio volume
    if (audioElementRef.current) {
      audioElementRef.current.volume = newVolume;
    }
    
    // Update synthetic audio volume
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newVolume;
    }
  };

  const nextStep = () => {
    if (!session) return;
    const ritual = yemojaRituals[session.type];
    
    if (session.currentStep < ritual.steps.length - 1) {
      setSession(prev => prev ? { ...prev, currentStep: prev.currentStep + 1 } : null);
    }
  };

  const handleFileUpload = (files: FileList | null, type: 'morning' | 'evening') => {
    if (!files) return;
    
    const audioFiles = Array.from(files).filter(file => 
      file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|ogg|m4a)$/i)
    );
    
    if (audioFiles.length === 0) {
      toast({
        title: ts('Invalid Files', 'Àwọn Fáìlì Tí Kò Tọ́'),
        description: ts('Please upload audio files (MP3, WAV, OGG, M4A)', 
                       'Jọ̀wọ́ gbé àwọn fáìlì orin sókè (MP3, WAV, OGG, M4A)'),
        variant: "destructive",
      });
      return;
    }
    
    setUploadedTracks(prev => ({
      ...prev,
      [type]: [...prev[type], ...audioFiles]
    }));
    
    toast({
      title: ts('Tracks Uploaded', 'Àwọn Orin Ti Gbà Sókè'),
      description: ts(`Added ${audioFiles.length} tracks for ${type} ritual`, 
                     `Àwọn orin ${audioFiles.length} ti di kún fún àṣẹ ${type}`),
    });
  };

  const removeTrack = (type: 'morning' | 'evening', index: number) => {
    setUploadedTracks(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
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
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Waves className="w-8 h-8" />
            {ts('Yemọja 432Hz Water Healing', 'Ìwòsàn Omi Yemọja 432Hz')}
          </CardTitle>
          <p className="text-blue-100">
            {ts('Sacred water rituals at the healing frequency of 432Hz', 
                'Àwọn àṣẹ omi mímọ́ ní ìgbọ̀nsí ìwòsàn 432Hz')}
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="rituals" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rituals" className="flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            {ts('Rituals', 'Àṣẹ')}
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <Music className="w-4 h-4" />
            {ts('Audio', 'Orin')}
          </TabsTrigger>
          <TabsTrigger value="science" className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            {ts('Science', 'Sáyẹ́nsì')}
          </TabsTrigger>
          <TabsTrigger value="session" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            {ts('Session', 'Ìgbà')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rituals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Morning Ritual */}
            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-600" />
                  {ts('Morning Cleansing', 'Ìwẹ̀ Òwúrọ̀')}
                  <Badge variant="outline" className="ml-2">7 {ts('mins', 'ìṣẹ́jú')}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200">
                    {ts('Required Items:', 'Àwọn Nǹkan Tó Nílò:')}
                  </h4>
                  <ul className="text-sm space-y-1">
                    {yemojaRituals.morning.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        {language === 'yoruba' ? yemojaRituals.morning.itemsYoruba[index] : item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200">
                    {ts('Ritual Steps:', 'Àwọn Ìgbésẹ̀ Àṣẹ:')}
                  </h4>
                  <ul className="text-sm space-y-1">
                    {yemojaRituals.morning.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-amber-600 font-semibold">{index + 1}.</span>
                        <span>{language === 'yoruba' ? yemojaRituals.morning.stepsYoruba[index] : step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  onClick={() => startRitual('morning')}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  disabled={session?.isActive}
                >
                  <Sun className="w-4 h-4 mr-2" />
                  {ts('Start Morning Ritual', 'Bẹ̀rẹ̀ Àṣẹ Òwúrọ̀')}
                </Button>
              </CardContent>
            </Card>

            {/* Evening Ritual */}
            <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-indigo-600" />
                  {ts('Moon Water Blessing', 'Ìbùkún Omi Òṣùpá')}
                  <Badge variant="outline" className="ml-2">9 {ts('mins', 'ìṣẹ́jú')}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-indigo-800 dark:text-indigo-200">
                    {ts('Required Items:', 'Àwọn Nǹkan Tó Nílò:')}
                  </h4>
                  <ul className="text-sm space-y-1">
                    {yemojaRituals.evening.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        {language === 'yoruba' ? yemojaRituals.evening.itemsYoruba[index] : item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-indigo-800 dark:text-indigo-200">
                    {ts('Ritual Steps:', 'Àwọn Ìgbésẹ̀ Àṣẹ:')}
                  </h4>
                  <ul className="text-sm space-y-1">
                    {yemojaRituals.evening.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-indigo-600 font-semibold">{index + 1}.</span>
                        <span>{language === 'yoruba' ? yemojaRituals.evening.stepsYoruba[index] : step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  onClick={() => startRitual('evening')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  disabled={session?.isActive}
                >
                  <Moon className="w-4 h-4 mr-2" />
                  {ts('Start Evening Ritual', 'Bẹ̀rẹ̀ Àṣẹ Alẹ́')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audio" className="space-y-6">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-600" />
                {ts('Upload Authentic 432Hz Tracks', 'Gbé Àwọn Orin 432Hz Òtítọ́ Sókè')}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {ts('Upload your own 432Hz water healing tracks for the most authentic experience', 
                    'Gbé àwọn orin ìwòsàn omi 432Hz tirẹ sókè fún ìrírí òtítọ́ jùlọ')}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Morning Tracks Upload */}
              <div className="space-y-4">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  {ts('Morning Ritual Tracks', 'Àwọn Orin Àṣẹ Òwúrọ̀')}
                </h3>
                
                <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="audio/*"
                    onChange={(e) => handleFileUpload(e.target.files, 'morning')}
                    className="hidden"
                    id="morning-upload"
                  />
                  <label htmlFor="morning-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {ts('Click to upload morning healing tracks', 'Tẹ láti gbé àwọn orin ìwòsàn òwúrọ̀ sókè')}
                    </p>
                  </label>
                </div>
                
                {uploadedTracks.morning.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{ts('Uploaded Tracks:', 'Àwọn Orin Tí A Gbà Sókè:')}</p>
                    {uploadedTracks.morning.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-amber-50 p-2 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeTrack('morning', index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Evening Tracks Upload */}
              <div className="space-y-4">
                <h3 className="font-semibold text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  {ts('Evening Ritual Tracks', 'Àwọn Orin Àṣẹ Alẹ́')}
                </h3>
                
                <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="audio/*"
                    onChange={(e) => handleFileUpload(e.target.files, 'evening')}
                    className="hidden"
                    id="evening-upload"
                  />
                  <label htmlFor="evening-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {ts('Click to upload evening healing tracks', 'Tẹ láti gbé àwọn orin ìwòsàn alẹ́ sókè')}
                    </p>
                  </label>
                </div>
                
                {uploadedTracks.evening.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{ts('Uploaded Tracks:', 'Àwọn Orin Tí A Gbà Sókè:')}</p>
                    {uploadedTracks.evening.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-indigo-50 p-2 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeTrack('evening', index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommended Tracks Info */}
              <Card className="bg-white/50 dark:bg-black/20">
                <CardHeader>
                  <CardTitle className="text-sm text-purple-800 dark:text-purple-200">
                    {ts('Recommended 432Hz Sources', 'Àwọn Orísun 432Hz Tí A Ṣe Àfidájú')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <p>• {ts('YouTube: Search "432Hz water meditation" and download with youtube-dl', 'YouTube: Wá "432Hz water meditation" kí o sì gbà sílẹ̀ pẹ̀lú youtube-dl')}</p>
                  <p>• {ts('Spotify: Look for "432Hz Healing" playlists and use recording software', 'Spotify: Wá àwọn playlist "432Hz Healing" kí o sì lo software ìgbóhùn')}</p>
                  <p>• {ts('SoundCloud: Many free 432Hz tracks available for download', 'SoundCloud: Ọ̀pọ̀lọpọ̀ orin 432Hz ọ̀fẹ́ wà fún ìgbà sílẹ̀')}</p>
                  <p>• {ts('Local recordings: Record yourself chanting with 432Hz tuning', 'Àwọn ìgbóhùn agbègbè: Gba ara rẹ sílẹ̀ tí o ń kọrin pẹ̀lú ìgbọ̀nsí 432Hz')}</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="science" className="space-y-6">
          <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-600" />
                {waterScienceInfo.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {waterScienceInfo.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                    <p className="text-gray-700 dark:text-gray-300">{point}</p>
                  </div>
                ))}
              </div>
              
              <Card className="bg-white/50 dark:bg-black/20">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-800 dark:text-cyan-200">
                    {waterScienceInfo.experiment.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {waterScienceInfo.experiment.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-cyan-600 font-semibold">{index + 1}.</span>
                        <span className="text-gray-700 dark:text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="session" className="space-y-6">
          {!session ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Waves className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">
                  {ts('No Active Session', 'Kò Sí Ìgbà Tí Ń Ṣiṣẹ́')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {ts('Select a ritual from the Rituals tab to begin', 
                      'Yan àṣẹ kan láti inú Àṣẹ tab láti bẹ̀rẹ̀')}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Session Status */}
              <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {session.type === 'morning' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    {ts(`${session.type === 'morning' ? 'Morning' : 'Evening'} Ritual Session`, 
                        `Ìgbà Àṣẹ ${session.type === 'morning' ? 'Òwúrọ̀' : 'Alẹ́'}`)}
                    {session.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      432Hz
                    </Badge>
                    <Badge variant="outline">
                      {yemojaRituals[session.type].duration} {ts('minutes', 'ìṣẹ́jú')}
                    </Badge>
                    <Badge variant={session.completed ? "default" : "secondary"}>
                      {session.completed ? ts('Completed', 'Parí') : ts('Active', 'Ń Ṣiṣẹ́')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {ts('Progress', 'Ìlọsíwájú')}
                      </span>
                      <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Audio Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5" />
                    {ts('432Hz Healing Audio', 'Ọ̀rín Ìwòsàn 432Hz')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={isPlaying ? stopHealing : startHealing}
                      className={`${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isPlaying ? ts('Stop', 'Dúró') : ts('Play', 'Dún')}
                    </Button>
                    
                    <div className="flex items-center gap-2 flex-1">
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
                  
                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <p>{ts('Playing 432Hz with harmonic overtones for water healing', 
                          'Ń dún 432Hz pẹ̀lú àwọn ìgbọ̀nsí ìbámu fún ìwòsàn omi')}</p>
                    
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${useAuthenticAudio ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <span className="text-xs">
                        {useAuthenticAudio 
                          ? ts('Authentic 432Hz Track', 'Orin 432Hz Òtítọ́')
                          : ts('Synthetic 432Hz Generation', 'Ìṣẹ̀dá 432Hz')
                        }
                      </span>
                    </div>
                    
                    <p className="text-xs italic">
                      {ts('Note: For authentic tracks, upload local 432Hz files or use streaming services', 
                          'Àkíyèsí: Fún orin òtítọ́, gbé àwọn fáìlì 432Hz àgbègbè sókè tàbí lo àwọn iṣẹ́ streaming')}
                    </p>
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