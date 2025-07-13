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
  
  // Debug: Log track changes
  useEffect(() => {
    console.log('Uploaded tracks changed:', {
      morning: uploadedTracks.morning.length,
      evening: uploadedTracks.evening.length
    });
  }, [uploadedTracks]);
  const [crystalAnimation, setCrystalAnimation] = useState(false);
  const crystalCanvasRef = useRef<HTMLCanvasElement>(null);

  const ts = (english: string, yoruba: string) => 
    language === 'yoruba' ? yoruba : english;

  useEffect(() => {
    return () => {
      stopHealing();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Water crystal animation effect
  useEffect(() => {
    if (!crystalAnimation || !crystalCanvasRef.current) return;

    const canvas = crystalCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    let animationId: number;
    let frame = 0;

    const drawCrystalFormation = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
      gradient.addColorStop(0, 'rgba(173, 216, 230, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 100, 150, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw multiple crystal formations
      const crystalCount = 6;
      for (let i = 0; i < crystalCount; i++) {
        const angle = (i * Math.PI * 2) / crystalCount + frame * 0.01;
        const x = 200 + Math.cos(angle) * (80 + Math.sin(frame * 0.02) * 20);
        const y = 200 + Math.sin(angle) * (80 + Math.cos(frame * 0.02) * 20);
        
        drawCrystal(ctx, x, y, 30 + Math.sin(frame * 0.03 + i) * 10, angle);
      }

      // Central crystal
      drawCrystal(ctx, 200, 200, 50 + Math.sin(frame * 0.02) * 15, frame * 0.005);

      frame++;
      animationId = requestAnimationFrame(drawCrystalFormation);
    };

    const drawCrystal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Crystal structure with 6 points
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Crystal gradient
      const crystalGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      crystalGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      crystalGradient.addColorStop(0.6, 'rgba(173, 216, 230, 0.6)');
      crystalGradient.addColorStop(1, 'rgba(0, 100, 150, 0.3)');
      
      ctx.fillStyle = crystalGradient;
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };

    drawCrystalFormation();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [crystalAnimation]);

  // Authentic 432Hz audio sources for Yemoja water healing
  const authentic432HzSources = {
    morning: [
      "https://www.youtube.com/watch?v=wGHQ2sPFfXk", // 432Hz Water Meditation
      "https://www.youtube.com/watch?v=i11MakqVr7c", // 432Hz Ocean Waves
      "https://www.youtube.com/watch?v=sUHKjej4CRM", // 432Hz Healing Water
      "https://www.youtube.com/watch?v=ze-pxwMJpLo", // User's 432Hz Track
    ],
    evening: [
      "https://www.youtube.com/watch?v=YQQ2StSwg_s", // 432Hz Moon Water
      "https://www.youtube.com/watch?v=E2bMQi2vRHs", // 432Hz Night Healing
      "https://www.youtube.com/watch?v=5qap5aO4i9A", // 432Hz Deep Water
      "https://www.youtube.com/watch?v=ze-pxwMJpLo", // User's 432Hz Track
    ]
  };

  const tryAuthenticAudio = (type: 'morning' | 'evening') => {
    // First try uploaded local files
    const userTracks = uploadedTracks[type];
    console.log(`Trying authentic audio for ${type}. Found ${userTracks.length} tracks`);
    
    if (userTracks.length > 0) {
      const randomTrack = userTracks[Math.floor(Math.random() * userTracks.length)];
      console.log(`Selected track: ${randomTrack.name}, size: ${randomTrack.size} bytes`);
      
      const audio = new Audio();
      audio.volume = volume;
      audio.loop = true;
      
      const objectUrl = URL.createObjectURL(randomTrack);
      audio.src = objectUrl;
      
      audio.addEventListener('canplaythrough', () => {
        console.log('Audio ready to play');
        setUseAuthenticAudio(true);
        audioElementRef.current = audio;
        
        toast({
          title: ts('Authentic Track Loaded', 'Orin Òtítọ́ Ti Gbà'),
          description: ts(`Playing: ${randomTrack.name}`, `Ń dún: ${randomTrack.name}`),
        });
        
        // Start playback immediately with user interaction handling
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log('Audio playback started successfully');
          }).catch((error) => {
            console.error('Audio play failed:', error);
            // Handle autoplay restrictions
            if (error.name === 'NotAllowedError') {
              console.log('Autoplay blocked - user interaction required');
              toast({
                title: ts('Click to Start Audio', 'Tẹ Láti Bẹ̀rẹ̀ Orin'),
                description: ts('Browser requires user interaction to play audio', 'Awọn ayẹwo ayẹwo nilo ibaraẹnisọrọ olumulo lati mu orin'),
              });
              // Keep the audio element ready for manual start
              return;
            }
            // Do NOT fallback to synthetic when authentic tracks are available
            console.log('Audio autoplay blocked but authentic track is ready for manual play');
          });
        }
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
        toast({
          title: ts('Audio File Error', 'Àṣìṣe Fáìlì Orin'),
          description: ts('Try a different file or check the format', 'Gbìyànjú fáìlì mìíràn tàbí ṣàyẹ̀wò fọ́mà'),
          variant: "destructive",
        });
        // Keep authentic mode but don't auto-fallback to synthetic
      });
      
      // Load the audio
      audio.load();
      
      return;
    }
    
    // This should ONLY happen if no tracks are uploaded
    console.log('⚠ WARNING: Using synthetic because no tracks uploaded');
    setUseAuthenticAudio(false);
    generate432HzTone();
    
    toast({
      title: ts('Upload Audio Files', 'Gbé Fáìlì Orin Sókè'),
      description: ts('Add your 432Hz tracks in Audio tab for authentic experience', 
                     'Fi àwọn orin 432Hz sí Audio tab fún ìrírí òtítọ́'),
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
    
    return { oscillator1, oscillator2, oscillator3, lfo, masterGain };
  };

  const startHealing = () => {
    if (!session) return;
    
    setIsPlaying(true);
    setCrystalAnimation(true);
    
    // Debug: Check if we have uploaded tracks
    const userTracks = uploadedTracks[session.type];
    console.log(`=== STARTING HEALING SESSION ===`);
    console.log(`Session type: ${session.type}`);
    console.log(`Found ${userTracks.length} uploaded tracks`);
    console.log('Track details:', userTracks.map(f => ({ name: f.name, size: f.size, type: f.type })));
    console.log(`useAuthenticAudio state: ${useAuthenticAudio}`);
    
    // CRITICAL: Only try authentic if we have tracks
    if (userTracks.length > 0) {
      console.log('✓ Using uploaded tracks - NO SYNTHETIC');
      setUseAuthenticAudio(true);
      tryAuthenticAudio(session.type);
    } else {
      console.log('✗ No uploaded tracks - using synthetic fallback');
      setUseAuthenticAudio(false);
      generate432HzTone();
    }
    
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
    setCrystalAnimation(false);
    
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
    console.log(`handleFileUpload called with:`, { files, type });
    
    if (!files || files.length === 0) {
      console.log('No files provided');
      return;
    }
    
    const audioFiles = Array.from(files).filter(file => {
      const isAudioType = file.type.startsWith('audio/');
      const isAudioExtension = file.name.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i);
      console.log(`File ${file.name}: type=${file.type}, size=${file.size}, isAudio=${isAudioType || isAudioExtension}`);
      return isAudioType || isAudioExtension;
    });
    
    console.log(`Found ${audioFiles.length} audio files out of ${files.length} total files`);
    
    if (audioFiles.length === 0) {
      console.log('No valid audio files found');
      toast({
        title: ts('Invalid Files', 'Àwọn Fáìlì Tí Kò Tọ́'),
        description: ts('Please upload audio files (MP3, WAV, OGG, M4A, AAC, FLAC)', 
                       'Jọ̀wọ́ gbé àwọn fáìlì orin sókè (MP3, WAV, OGG, M4A, AAC, FLAC)'),
        variant: "destructive",
      });
      return;
    }
    
    console.log(`Processing ${audioFiles.length} audio files for ${type} ritual`);
    
    // Add files immediately for better user experience
    setUploadedTracks(prev => {
      const newState = {
        ...prev,
        [type]: [...prev[type], ...audioFiles]
      };
      console.log('Updated uploaded tracks:', newState);
      return newState;
    });
    
    toast({
      title: ts('Tracks Uploaded', 'Àwọn Orin Ti Gbà Sókè'),
      description: ts(`Added ${audioFiles.length} tracks for ${type} ritual`, 
                     `Àwọn orin ${audioFiles.length} ti di kún fún àṣẹ ${type}`),
    });
    
    // Test playability in background
    audioFiles.forEach((file, index) => {
      const testAudio = new Audio();
      const objectUrl = URL.createObjectURL(file);
      testAudio.src = objectUrl;
      
      testAudio.addEventListener('canplaythrough', () => {
        console.log(`✓ File ${index + 1} (${file.name}) is ready to play`);
        URL.revokeObjectURL(objectUrl);
      });
      
      testAudio.addEventListener('error', (e) => {
        console.error(`✗ File ${index + 1} (${file.name}) failed to load:`, e);
        URL.revokeObjectURL(objectUrl);
      });
      
      testAudio.load();
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
                    accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac"
                    onChange={(e) => {
                      console.log('Morning file input changed:', e.target.files);
                      handleFileUpload(e.target.files, 'morning');
                    }}
                    className="hidden"
                    id="morning-upload"
                  />
                  <label htmlFor="morning-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {ts('Click to upload morning healing tracks', 'Tẹ láti gbé àwọn orin ìwòsàn òwúrọ̀ sókè')}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {ts('Supports: MP3, WAV, OGG, M4A, AAC, FLAC', 'Àtìlẹ́yìn: MP3, WAV, OGG, M4A, AAC, FLAC')}
                    </p>
                  </label>
                </div>
                
                {uploadedTracks.morning.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{ts('Uploaded Tracks:', 'Àwọn Orin Tí A Gbà Sókè:')}</p>
                    {uploadedTracks.morning.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-amber-50 p-2 rounded">
                        <div className="flex-1">
                          <span className="text-sm">{file.name}</span>
                          <div className="text-xs text-gray-500">
                            {Math.round(file.size / 1024)} KB • {file.type || 'unknown type'}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              console.log('Testing audio playback for:', file.name);
                              const testAudio = new Audio();
                              const objectUrl = URL.createObjectURL(file);
                              testAudio.src = objectUrl;
                              testAudio.volume = 0.5;
                              testAudio.addEventListener('canplaythrough', () => {
                                console.log('Audio ready, attempting to play');
                                testAudio.play().then(() => {
                                  console.log('Audio playing successfully');
                                  setTimeout(() => {
                                    testAudio.pause();
                                    URL.revokeObjectURL(objectUrl);
                                  }, 3000);
                                }).catch(console.error);
                              });
                              testAudio.addEventListener('error', console.error);
                              testAudio.load();
                            }}
                            className="text-green-600 hover:text-green-700"
                          >
                            ▶
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeTrack('morning', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </Button>
                        </div>
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
                    accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac"
                    onChange={(e) => {
                      console.log('Evening file input changed:', e.target.files);
                      handleFileUpload(e.target.files, 'evening');
                    }}
                    className="hidden"
                    id="evening-upload"
                  />
                  <label htmlFor="evening-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {ts('Click to upload evening healing tracks', 'Tẹ láti gbé àwọn orin ìwòsàn alẹ́ sókè')}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {ts('Supports: MP3, WAV, OGG, M4A, AAC, FLAC', 'Àtìlẹ́yìn: MP3, WAV, OGG, M4A, AAC, FLAC')}
                    </p>
                  </label>
                </div>
                
                {uploadedTracks.evening.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{ts('Uploaded Tracks:', 'Àwọn Orin Tí A Gbà Sókè:')}</p>
                    {uploadedTracks.evening.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-indigo-50 p-2 rounded">
                        <div className="flex-1">
                          <span className="text-sm">{file.name}</span>
                          <div className="text-xs text-gray-500">
                            {Math.round(file.size / 1024)} KB • {file.type || 'unknown type'}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              console.log('Testing audio playback for:', file.name);
                              const testAudio = new Audio();
                              const objectUrl = URL.createObjectURL(file);
                              testAudio.src = objectUrl;
                              testAudio.volume = 0.5;
                              testAudio.addEventListener('canplaythrough', () => {
                                console.log('Audio ready, attempting to play');
                                testAudio.play().then(() => {
                                  console.log('Audio playing successfully');
                                  setTimeout(() => {
                                    testAudio.pause();
                                    URL.revokeObjectURL(objectUrl);
                                  }, 3000);
                                }).catch(console.error);
                              });
                              testAudio.addEventListener('error', console.error);
                              testAudio.load();
                            }}
                            className="text-green-600 hover:text-green-700"
                          >
                            ▶
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeTrack('evening', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </Button>
                        </div>
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
                <CardContent className="space-y-3 text-xs">
                  {/* Featured Track */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-3 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-800 dark:text-blue-200">
                        {ts('Featured 432Hz Track', 'Orin 432Hz Àṣàyàn')}
                      </span>
                    </div>
                    <p className="text-blue-700 dark:text-blue-300 mb-2">
                      {ts('Pure 432Hz Water Healing Frequency - Perfect for Yemoja rituals', 
                          'Ìgbọ̀nsí Ìwòsàn Omi 432Hz Mímọ́ - Pípé fún àwọn àṣẹ Yemọja')}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open('https://www.youtube.com/watch?v=ze-pxwMJpLo&t=65s', '_blank')}
                        className="border-blue-300 text-blue-600 hover:bg-blue-50 text-xs"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {ts('Listen on YouTube', 'Gbọ́ lórí YouTube')}
                      </Button>
                      <span className="text-xs text-blue-600">
                        {ts('Use download tools to save locally', 'Lo àwọn irinṣẹ́ ìgbàsílẹ̀ láti tọ́jú sí agbègbè')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Other Sources */}
                  <div className="space-y-2">
                    <p className="font-medium text-gray-700 dark:text-gray-300">{ts('Other Sources:', 'Àwọn Orísun Mìíràn:')}</p>
                    <p>• {ts('YouTube-DL: Download the featured track with `youtube-dl "https://www.youtube.com/watch?v=ze-pxwMJpLo"`', 'YouTube-DL: Gbà orin àṣàyàn sílẹ̀ pẹ̀lú `youtube-dl "https://www.youtube.com/watch?v=ze-pxwMJpLo"`')}</p>
                    <p>• {ts('Browser Extensions: Use audio downloaders for YouTube videos', 'Àwọn Ẹ̀rọ Àfikún Aláṣẹ: Lo àwọn olùgbàsílẹ̀ orin fún àwọn fídíò YouTube')}</p>
                    <p>• {ts('Screen Recording: Record audio while playing the YouTube track', 'Ìgbóhùn Ojú-ẹ̀rọ: Gba orin sílẹ̀ nígbà tí o ń mu orin YouTube náà dún')}</p>
                    <p>• {ts('Mobile Apps: Use audio recording apps to capture the healing frequency', 'Àwọn Ẹ̀rọ Ìbánisọ̀rọ̀: Lo àwọn ẹ̀rọ ìgbóhùn láti gba ìgbọ̀nsí ìwòsàn náà')}</p>
                  </div>
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

              {/* Water Crystal Visualization */}
              <Card className="bg-white/50 dark:bg-black/20">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-800 dark:text-cyan-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {ts('Interactive Water Crystal Formation', 'Ìdàgbàsókè Kírísítálì Omi Ìbáṣepọ̀')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col lg:flex-row gap-6 items-center">
                    <div className="flex-1 space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {ts('Dr. Masaru Emoto\'s groundbreaking research demonstrated that water crystals respond to sound vibrations. Positive frequencies like 432Hz create harmonious, symmetrical patterns.', 
                            'Ìwádìí ìlọ́sísẹ́ Dr. Masaru Emoto fihàn pé àwọn kírísítálì omi ń dahùn sí àwọn gbígbọ̀n. Àwọn ìgbọ̀nsí rere bí 432Hz ń ṣẹ̀dá àwọn àpẹẹrẹ ìrẹ̀pọ̀ àti símétrìkì.')}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setCrystalAnimation(!crystalAnimation)}
                          className="text-cyan-600 border-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          {crystalAnimation ? 
                            ts('Stop Crystal Animation', 'Dá Ìṣíṣe Kírísítálì Dúró') : 
                            ts('Start Crystal Animation', 'Bẹ̀rẹ̀ Ìṣíṣe Kírísítálì')
                          }
                        </Button>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <canvas
                        ref={crystalCanvasRef}
                        className="border-2 border-cyan-200 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 shadow-lg"
                        width={400}
                        height={400}
                        style={{ width: '240px', height: '240px' }}
                      />
                      {!crystalAnimation && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-white/10 rounded-lg backdrop-blur-sm">
                          <div className="text-center">
                            <Sparkles className="w-12 h-12 mx-auto mb-3 text-cyan-400 animate-pulse" />
                            <p className="text-sm text-cyan-600 dark:text-cyan-300 font-medium">
                              {ts('Click to witness crystal formation', 'Tẹ láti rí ìdàgbàsókè kírísítálì')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
                  {/* Audio Mode Status */}
                  <div className={`p-3 rounded-lg border text-sm ${
                    useAuthenticAudio 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : 'bg-orange-50 border-orange-200 text-orange-800'
                  }`}>
                    <div className="flex items-center">
                      <Music className="w-4 h-4 mr-2" />
                      <span className="font-medium">
                        {useAuthenticAudio 
                          ? ts('🎵 Playing Your Files', '🎵 Ń Dún Àwọn Fáìlì Rẹ')
                          : ts('🔧 Demo Mode (Upload Files)', '🔧 Ọ̀nà Àpẹẹrẹ (Gbé Fáìlì Sókè)')
                        }
                      </span>
                    </div>
                    {session && (
                      <div className="text-xs mt-1">
                        {uploadedTracks[session.type].length > 0 
                          ? ts(`${uploadedTracks[session.type].length} tracks available`, `àwọn orin ${uploadedTracks[session.type].length} wà`)
                          : ts('Upload 432Hz files in Audio tab', 'Gbé àwọn fáìlì 432Hz sí Audio tab')
                        }
                      </div>
                    )}
                  </div>

                  {/* EMERGENCY DEBUG: Direct Audio Test */}
                  {session && uploadedTracks[session.type].length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">🔧 Debug Test</h4>
                      <Button
                        onClick={() => {
                          console.log('=== EMERGENCY DIRECT TEST ===');
                          const tracks = uploadedTracks[session.type];
                          console.log(`Available tracks: ${tracks.length}`);
                          
                          if (tracks.length > 0) {
                            const file = tracks[0];
                            console.log(`Testing: ${file.name}`);
                            
                            // Create completely new audio element
                            const testAudio = new Audio();
                            const url = URL.createObjectURL(file);
                            testAudio.src = url;
                            testAudio.volume = 0.8;
                            
                            testAudio.onloadeddata = () => console.log('✓ Data loaded');
                            testAudio.oncanplaythrough = () => console.log('✓ Can play through');
                            testAudio.onerror = (e) => console.error('✗ Error:', e);
                            
                            testAudio.play().then(() => {
                              console.log('✅ SUCCESS: Audio is playing!');
                              alert('SUCCESS: Your audio file is working!');
                              
                              // Stop after 3 seconds
                              setTimeout(() => {
                                testAudio.pause();
                                URL.revokeObjectURL(url);
                              }, 3000);
                            }).catch(err => {
                              console.error('❌ FAILED:', err);
                              alert(`FAILED: ${err.message}`);
                            });
                          }
                        }}
                        variant="outline"
                        className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                      >
                        🧪 Test First Track
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <Button
                      onClick={isPlaying ? stopHealing : startHealing}
                      className={`${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isPlaying ? ts('Stop', 'Dúró') : ts('Play', 'Dún')}
                    </Button>
                    
                    {/* Manual audio control for uploaded tracks */}
                    {session && uploadedTracks[session.type].length > 0 && (
                      <Button
                        onClick={() => {
                          console.log('Force play button clicked');
                          const tracks = uploadedTracks[session.type];
                          if (tracks.length > 0) {
                            const track = tracks[0]; // Use first track for immediate play
                            const audio = new Audio();
                            const objectUrl = URL.createObjectURL(track);
                            audio.src = objectUrl;
                            audio.volume = volume;
                            audio.loop = true;
                            
                            // Stop any existing audio
                            if (audioElementRef.current) {
                              audioElementRef.current.pause();
                            }
                            
                            audioElementRef.current = audio;
                            setUseAuthenticAudio(true);
                            
                            audio.play().then(() => {
                              console.log('✓ Force play successful');
                              toast({
                                title: ts('Playing Your Track', 'Ń Dún Orin Rẹ'),
                                description: ts(`Now playing: ${track.name}`, `Ń dún: ${track.name}`),
                              });
                            }).catch((error) => {
                              console.error('Force play failed:', error);
                              toast({
                                title: ts('Playback Error', 'Àṣìṣe Ìdún'),
                                description: ts('Unable to play this audio file', 'Kò lè dún fáìlì orin yìí'),
                                variant: "destructive",
                              });
                            });
                          }
                        }}
                        variant="outline"
                        className="border-green-300 text-green-600 hover:bg-green-50"
                      >
                        <Volume2 className="w-4 h-4 mr-1" />
                        {ts('Force Play Uploaded', 'Mu Dún Tí A Gbà')}
                      </Button>
                    )}
                    
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