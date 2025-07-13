import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Crown, 
  Heart, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Clock, 
  CheckCircle,
  Info,
  Upload,
  Music,
  ExternalLink,
  Plus,
  Bird,
  Star
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface ObatalaRitual {
  frequency: number;
  steps: string[];
  stepsYoruba: string[];
  duration: number;
  items: string[];
  itemsYoruba: string[];
}

interface RitualSession {
  type: 'purification' | 'healing' | 'wisdom';
  startTime: Date;
  currentStep: number;
  isActive: boolean;
  completed: boolean;
}

const obatalaRituals: Record<'purification' | 'healing' | 'wisdom', ObatalaRitual> = {
  purification: {
    frequency: 963,
    steps: [
      "Light a white candle or wear white cloth",
      "Chant: 'Òbàtálá bàbá mi, mú kí inú mi mọ́' (Father Obatalá, purify my heart)",
      "Breathe white light into your crown chakra",
      "Visualize divine clarity flowing through you"
    ],
    stepsYoruba: [
      "Tan fìtílà funfun tàbí wọ aṣọ funfun",
      "Kọrin: 'Òbàtálá bàbá mi, mú kí inú mi mọ́'",
      "Mí ìmọ́lẹ̀ funfun sínú adé chakra rẹ",
      "Fojú inú wo bí ìyanjú òrìṣà ti ń sàn nínú rẹ"
    ],
    duration: 10,
    items: ["White candle", "White cloth", "Quiet space"],
    itemsYoruba: ["Fìtílà funfun", "Aṣọ funfun", "Ibi ìdákẹ́jẹ́"]
  },
  healing: {
    frequency: 963,
    steps: [
      "Place white flowers or cloth on altar",
      "Recite: 'Òbàtálá ọba àlà, wo mi sàn' (King Obatalá of purity, heal me)",
      "Focus on emotional peace and DNA repair",
      "Feel divine love dissolving all pain"
    ],
    stepsYoruba: [
      "Gbé òdòdó funfun tàbí aṣọ sórí pẹpẹ",
      "Sọ: 'Òbàtálá ọba àlà, wo mi sàn'",
      "Dójúkọ ìbalẹ̀ ọkàn àti àtúnṣe DNA",
      "Ni ìrílárá pé ìfẹ́ òrìṣà ń pa gbogbo ìrora run"
    ],
    duration: 15,
    items: ["White flowers", "Coconut", "White fabric"],
    itemsYoruba: ["Òdòdó funfun", "Agbọn", "Aṣọ funfun"]
  },
  wisdom: {
    frequency: 963,
    steps: [
      "Sit facing east with white materials",
      "Invoke: 'Òbàtálá ọlọ́gbọ́n, fún mi ní ìmọ̀' (Wise Obatalá, grant me knowledge)",
      "Meditate on divine wisdom and clarity",
      "Ask for guidance on life decisions"
    ],
    stepsYoruba: [
      "Jókòó sí ìhà ìlà-oòrùn pẹ̀lú àwọn ohun funfun",
      "Pè: 'Òbàtálá ọlọ́gbọ́n, fún mi ní ìmọ̀'",
      "Ṣe àṣàrò lórí ọgbọ́n òrìṣà àti ìyanjú",
      "Béèrè fún ìtọ́sọ́nà lórí àwọn ìpinnu ayé"
    ],
    duration: 20,
    items: ["White stones", "Mirror", "Pure water"],
    itemsYoruba: ["Òkúta funfun", "Dígí", "Omi mímọ́"]
  }
};

export const Obatala963HzHealing: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  // Session and timer states
  const [session, setSession] = useState<RitualSession | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  // Audio states
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [useAuthenticAudio, setUseAuthenticAudio] = useState(false);
  const [uploadedTracks, setUploadedTracks] = useState<{
    purification: File[];
    healing: File[];
    wisdom: File[];
  }>({
    purification: [],
    healing: [],
    wisdom: []
  });
  
  // Audio references
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  
  // Crown chakra visualization
  const [crownVisualization, setCrownVisualization] = useState(false);
  
  const ts = (english: string, yoruba: string) => 
    language === 'yoruba' ? yoruba : english;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          
          if (newTime <= 0) {
            setIsTimerActive(false);
            setSession(prev => prev ? { ...prev, completed: true } : null);
            
            // Stop audio
            if (audioElementRef.current) {
              audioElementRef.current.pause();
            }
            if (oscillatorRef.current) {
              oscillatorRef.current.stop();
            }
            
            setIsPlaying(false);
            
            // Divine completion message
            toast({
              title: ts('Àṣẹ! Divine Healing Complete ✨', 'Àṣẹ! Ìwòsàn Òrìṣà Ti Parí ✨'),
              description: ts('Your soul is purified. Feel the divine light within.', 
                             'Ẹ̀mí rẹ ti di mímọ́. Ni ìrílárà ìmọ́lẹ̀ òrìṣà nínú rẹ.'),
              duration: 8000,
            });
            
            console.log('\n👑 OBATALÁ HEALING COMPLETE 👑');
            console.log('Àṣẹ! Your soul is purified and blessed.');
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeRemaining, toast, language]);

  const startRitual = (type: 'purification' | 'healing' | 'wisdom') => {
    const ritual = obatalaRituals[type];
    const durationInSeconds = ritual.duration * 60;
    
    setSession({
      type,
      startTime: new Date(),
      currentStep: 0,
      isActive: true,
      completed: false
    });
    
    setTimeRemaining(durationInSeconds);
    setIsTimerActive(true);
    setCrownVisualization(true);
    
    toast({
      title: ts(`${type.charAt(0).toUpperCase() + type.slice(1)} Ritual Started`, 
                `Àṣẹ ${type === 'purification' ? 'Ìmọ́tótó' : type === 'healing' ? 'Ìwòsàn' : 'Ọgbọ́n'} Ti Bẹ̀rẹ̀`),
      description: ts(`${ritual.duration} minutes of divine connection`, 
                     `Ìṣẹ́jú ${ritual.duration} àjọpọ̀ òrìṣà`),
    });
  };

  const stopRitual = () => {
    setIsTimerActive(false);
    setSession(null);
    setTimeRemaining(0);
    setIsPlaying(false);
    setCrownVisualization(false);
    
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }
  };

  const start963HzHealing = async () => {
    console.log('=== STARTING 963HZ OBATALÁ HEALING ===');
    
    // Try authentic audio first
    if (session && uploadedTracks[session.type].length > 0) {
      console.log(`Found ${uploadedTracks[session.type].length} uploaded tracks`);
      const file = uploadedTracks[session.type][0];
      
      try {
        const audio = new Audio();
        const objectUrl = URL.createObjectURL(file);
        audio.src = objectUrl;
        audio.volume = volume;
        audio.loop = true;
        
        await audio.play();
        
        if (audioElementRef.current) {
          audioElementRef.current.pause();
        }
        audioElementRef.current = audio;
        setUseAuthenticAudio(true);
        setIsPlaying(true);
        
        console.log('✓ Using uploaded authentic 963Hz audio');
        return;
      } catch (error) {
        console.error('Uploaded audio failed:', error);
      }
    }
    
    // Fallback to synthetic 963Hz
    console.log('Using synthetic 963Hz generation');
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      // Stop any existing oscillator
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      
      // Create 963Hz with divine harmonics
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.setValueAtTime(963, audioContextRef.current.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContextRef.current.currentTime + 2);
      
      oscillator.start();
      
      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
      setUseAuthenticAudio(false);
      setIsPlaying(true);
      
      console.log('✓ Synthetic 963Hz "God Frequency" active');
      
    } catch (error) {
      console.error('Audio failed:', error);
      toast({
        title: ts('Audio Issue', 'Ìṣòro Orin'),
        description: ts('Use YouTube option for reliable audio', 'Lo àṣàyàn YouTube fún orin tó dára'),
        variant: "destructive",
      });
    }
  };

  const stopHealing = () => {
    setIsPlaying(false);
    
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    
    console.log('963Hz healing stopped');
  };

  const handleFileUpload = (files: FileList | null, type: 'purification' | 'healing' | 'wisdom') => {
    if (!files || files.length === 0) return;
    
    const audioFiles = Array.from(files).filter(file => 
      file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i)
    );
    
    if (audioFiles.length === 0) {
      toast({
        title: ts('Invalid Files', 'Àwọn Fáìlì Tí Kò Tọ́'),
        description: ts('Please upload audio files', 'Jọ̀wọ́ gbé àwọn fáìlì orin sókè'),
        variant: "destructive",
      });
      return;
    }
    
    setUploadedTracks(prev => ({
      ...prev,
      [type]: [...prev[type], ...audioFiles]
    }));
    
    toast({
      title: ts('963Hz Tracks Uploaded', 'Àwọn Orin 963Hz Ti Gbà Sókè'),
      description: ts(`Added ${audioFiles.length} tracks for ${type}`, 
                     `Àwọn orin ${audioFiles.length} ti di kún fún ${type}`),
    });
  };

  const progress = session ? ((session.isActive ? 
    ((obatalaRituals[session.type].duration * 60 - timeRemaining) / (obatalaRituals[session.type].duration * 60)) * 100 
    : 100)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section with HTML template styling */}
        <div className="text-center py-8 border-l-4 border-pink-300 bg-gray-800/50 rounded-lg p-6">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-4 mb-4">
            🕊️ <span>{ts('Òbàtálá – Love & Healing Frequency (963Hz)', 'Òbàtálá – Ìgbọ̀nsí Ìfẹ́ & Ìwòsàn (963Hz)')}</span> <Crown className="w-10 h-10 text-pink-300" />
          </h1>
        </div>

        {/* Divine Frequency Section */}
        <div className="bg-gray-800/60 p-6 border-l-4 border-pink-300 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            🌸 {ts('Divine Frequency – 963Hz', 'Ìgbọ̀nsí Òrìṣà – 963Hz')}
          </h2>
          <p className="text-blue-100 leading-relaxed">
            {ts(
              'This frequency, known as the "God Frequency," is deeply connected with inner healing, crown chakra activation, and soul-level purification. It perfectly resonates with the energy of Obatalá – Orisha of clarity, peace, and divine wisdom.',
              'Ìgbọ̀nsí yìí, tí a mọ̀ sí "Ìgbọ̀nsí Ọlọ́run," ní ìbátan jinlẹ̀ pẹ̀lú ìwòsàn inú, jíjí adé chakra, àti ìmọ́tótó ẹ̀mí. Ó bára mu pẹ̀lú agbára Òbàtálá – Òrìṣà ìmọ́lẹ̀, àlàáfíà, àti ọgbọ́n òrìṣà.'
            )}
          </p>
        </div>

        {/* Benefits Section from HTML template */}
        <div className="bg-gray-800/60 p-6 border-l-4 border-pink-300 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            ✨ {ts('Benefits of Òbàtálá Frequency', 'Àwọn Àǹfààní Ìgbọ̀nsí Òbàtálá')}
          </h2>
          <ul className="space-y-3 text-blue-100">
            <li className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-pink-300 flex-shrink-0" />
              {ts('Emotional peace and clarity', 'Àlàáfíà ẹ̀mí àti ìmọ́lẹ̀')}
            </li>
            <li className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-pink-300 flex-shrink-0" />
              {ts('Deep spiritual healing and release', 'Ìwòsàn ẹ̀mí jinlẹ̀ àti ìtúsílẹ̀')}
            </li>
            <li className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-pink-300 flex-shrink-0" />
              {ts('DNA repair and crown chakra awakening', 'Àtúnṣe DNA àti jíjí adé chakra')}
            </li>
          </ul>
        </div>

        {/* Audio Section from HTML template */}
        <div className="bg-gray-800/60 p-6 border-l-4 border-pink-300 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            🎧 {ts('Listen to Òbàtálá Meditation Music', 'Gbọ́ Orin Àṣẹ Òbàtálá')}
          </h2>
          <p className="text-blue-100 leading-relaxed mb-6">
            {ts(
              'Play the meditation below, tuned to 963Hz, to enter a space of peace, healing, and universal love:',
              'Dún orin àṣẹ yìí tí a tò sí 963Hz, láti wọ inú àlàáfíà, ìwòsàn, àti ìfẹ́ gbogbo ayé:'
            )}
          </p>
          
          {/* Audio Players for offline support */}
          <div className="space-y-4">
            <audio 
              controls 
              className="w-full rounded-lg bg-gray-700 border border-pink-300/30"
              style={{ filter: 'hue-rotate(280deg) saturate(1.2)' }}
            >
              <source src="/static/audio/obatala_963hz.mp3" type="audio/mpeg" />
              {ts('Your browser does not support the audio element.', 'Ayẹwo rẹ kò ṣe àtìlẹyìn orin yìí.')}
            </audio>
            
            <p className="text-sm text-blue-200 italic">
              {ts('Note: Audio files will be served from your local static folder for offline support', 
                  'Àkíyèsí: Àwọn fáìlì orin yóò wá láti fódà static rẹ fún àtìlẹyìn aláìníìṣípọ̀n')}
            </p>
          </div>
        </div>

      <Tabs defaultValue="rituals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800/80 border border-pink-300/30">
          <TabsTrigger value="rituals" className="flex items-center gap-2 text-blue-100 data-[state=active]:bg-pink-300/20 data-[state=active]:text-white">
            <Crown className="w-4 h-4" />
            {ts('Rituals', 'Àṣẹ')}
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2 text-blue-100 data-[state=active]:bg-pink-300/20 data-[state=active]:text-white">
            <Music className="w-4 h-4" />
            {ts('Audio', 'Orin')}
          </TabsTrigger>
          <TabsTrigger value="science" className="flex items-center gap-2 text-blue-100 data-[state=active]:bg-pink-300/20 data-[state=active]:text-white">
            <Star className="w-4 h-4" />
            {ts('Science', 'Sáyẹnsì')}
          </TabsTrigger>
          <TabsTrigger value="session" className="flex items-center gap-2 text-blue-100 data-[state=active]:bg-pink-300/20 data-[state=active]:text-white">
            <Clock className="w-4 h-4" />
            {ts('Session', 'Ìgbà')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rituals" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(obatalaRituals).map(([type, ritual]) => (
              <Card key={type} className="bg-gray-800/60 border border-pink-300/30 hover:border-pink-300/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    {type === 'purification' && <Sparkles className="w-5 h-5 text-pink-300" />}
                    {type === 'healing' && <Heart className="w-5 h-5 text-pink-300" />}
                    {type === 'wisdom' && <Crown className="w-5 h-5 text-pink-300" />}
                    {ts(type.charAt(0).toUpperCase() + type.slice(1), 
                        type === 'purification' ? 'Ìmọ́tótó' : 
                        type === 'healing' ? 'Ìwòsàn' : 'Ọgbọ́n')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-100">{ts('Steps', 'Àwọn Ìgbésẹ̀')}</h4>
                    <ul className="text-sm space-y-1">
                      {(language === 'yoruba' ? ritual.stepsYoruba : ritual.steps).map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-pink-300 font-mono text-xs mt-0.5">{index + 1}.</span>
                          <span className="text-blue-100">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-pink-300/20 border-pink-300/50 text-white">
                      {ritual.duration} {ts('min', 'ìṣẹ́jú')} • 963Hz
                    </Badge>
                    <Button
                      onClick={() => startRitual(type as 'purification' | 'healing' | 'wisdom')}
                      className="bg-pink-600 hover:bg-pink-700 text-white"
                      disabled={session?.isActive}
                    >
                      {ts('Start', 'Bẹ̀rẹ̀')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                {ts('Upload 963Hz Tracks', 'Gbé Àwọn Orin 963Hz Sókè')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.keys(obatalaRituals).map((type) => (
                <div key={type} className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2">
                    {type === 'purification' && <Sparkles className="w-4 h-4" />}
                    {type === 'healing' && <Heart className="w-4 h-4" />}
                    {type === 'wisdom' && <Crown className="w-4 h-4" />}
                    {ts(type.charAt(0).toUpperCase() + type.slice(1), 
                        type === 'purification' ? 'Ìmọ́tótó' : 
                        type === 'healing' ? 'Ìwòsàn' : 'Ọgbọ́n')}
                  </h3>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      multiple
                      accept="audio/*"
                      onChange={(e) => handleFileUpload(e.target.files, type as 'purification' | 'healing' | 'wisdom')}
                      className="hidden"
                      id={`upload-${type}`}
                    />
                    <label
                      htmlFor={`upload-${type}`}
                      className="cursor-pointer flex flex-col items-center gap-2 text-center"
                    >
                      <Plus className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {ts('Drop 963Hz files or click to upload', 'Gba àwọn fáìlì 963Hz tàbí tẹ láti gbé sókè')}
                      </span>
                    </label>
                  </div>
                  
                  {uploadedTracks[type as keyof typeof uploadedTracks].length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">{ts('Uploaded Files', 'Àwọn Fáìlì Tí A Gbé Sókè')}</h4>
                      {uploadedTracks[type as keyof typeof uploadedTracks].map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <div className="flex-1">
                            <span className="text-sm">{file.name}</span>
                            <div className="text-xs text-gray-500">
                              {Math.round(file.size / 1024)} KB • {file.type || 'audio'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="science" className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                {ts('963Hz - The God Frequency', '963Hz - Ìgbọ̀nsí Ọlọ́run')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                  {ts('Scientific Benefits', 'Àwọn Àǹfààní Sáyẹnsì')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Crown className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <strong>{ts('Crown Chakra Activation', 'Jíjí Adé Chakra')}</strong>
                      <p className="text-sm text-gray-600">
                        {ts('Stimulates the crown chakra for spiritual connection', 
                            'Rú adé chakra sókè fún àjọpọ̀ ẹ̀mí')}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-white mt-0.5" />
                    <div>
                      <strong>{ts('DNA Repair & Cellular Healing', 'Àtúnṣe DNA àti Ìwòsàn Sẹ́ẹ̀lì')}</strong>
                      <p className="text-sm text-gray-600">
                        {ts('Promotes cellular regeneration and genetic repair', 
                            'Ṣe ìrànlọ́wọ́ fún àtúndá sẹ́ẹ̀lì àti àtúnṣe jiini')}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <strong>{ts('Emotional Peace & Clarity', 'Àlàáfíà Ọkàn àti Ìyanjú')}</strong>
                      <p className="text-sm text-gray-600">
                        {ts('Dissolves emotional blockages and promotes inner peace', 
                            'Pa àwọn ìdènà ọkàn run àti ṣe ìgbélarugè àlàáfíà inú')}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Crown Chakra Visualization Toggle */}
              <div className="space-y-4">
                <h3 className="font-semibold">
                  {ts('Crown Chakra Visualization', 'Àpẹẹrẹ Adé Chakra')}
                </h3>
                <div className="relative h-64 bg-gradient-to-t from-purple-100 to-white dark:from-purple-900 dark:to-gray-800 rounded-lg border overflow-hidden">
                  <Button
                    onClick={() => setCrownVisualization(!crownVisualization)}
                    className="absolute top-4 right-4 z-10"
                    variant="outline"
                    size="sm"
                  >
                    {crownVisualization ? ts('Stop', 'Dúró') : ts('Activate', 'Jí')}
                  </Button>
                  
                  {crownVisualization && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {/* Animated crown chakra */}
                        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-300 to-white animate-pulse border-4 border-purple-200"></div>
                        <Crown className="absolute inset-0 w-16 h-16 m-auto text-purple-600 animate-bounce" />
                        {/* Energy rings */}
                        <div className="absolute inset-0 w-40 h-40 -m-4 rounded-full border-2 border-purple-200 animate-ping"></div>
                        <div className="absolute inset-0 w-48 h-48 -m-8 rounded-full border border-purple-100 animate-ping" style={{animationDelay: '0.5s'}}></div>
                      </div>
                    </div>
                  )}
                  
                  {!crownVisualization && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-white/10 backdrop-blur-sm">
                      <div className="text-center">
                        <Crown className="w-12 h-12 mx-auto mb-3 text-purple-400 animate-pulse" />
                        <p className="text-sm text-purple-600 dark:text-purple-300 font-medium">
                          {ts('Click to activate crown chakra visualization', 
                              'Tẹ láti jí àpẹẹrẹ adé chakra')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="session" className="space-y-6">
          {!session ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Crown className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">
                  {ts('No Active Session', 'Kò Sí Ìgbà Tí Ń Ṣiṣẹ́')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {ts('Select a ritual from the Rituals tab to begin divine healing', 
                      'Yan àṣẹ kan láti inú Àṣẹ tab láti bẹ̀rẹ̀ ìwòsàn òrìṣà')}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Session Status */}
              <Card className="border-gray-200 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/20 dark:to-gray-800/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {session.type === 'purification' && <Sparkles className="w-5 h-5" />}
                    {session.type === 'healing' && <Heart className="w-5 h-5" />}
                    {session.type === 'wisdom' && <Crown className="w-5 h-5" />}
                    {ts(`${session.type.charAt(0).toUpperCase() + session.type.slice(1)} Session`, 
                        `Ìgbà ${session.type === 'purification' ? 'Ìmọ́tótó' : 
                                session.type === 'healing' ? 'Ìwòsàn' : 'Ọgbọ́n'}`)}
                    {session.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      963Hz - God Frequency
                    </Badge>
                    <Badge variant="outline">
                      {obatalaRituals[session.type].duration} {ts('minutes', 'ìṣẹ́jú')}
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
                    {ts('963Hz Divine Audio', 'Orin Òrìṣà 963Hz')}
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
                          : ts('🔧 Synthetic Mode', '🔧 Ọ̀nà Ìṣẹ̀dá')
                        }
                      </span>
                    </div>
                    {session && (
                      <div className="text-xs mt-1">
                        {uploadedTracks[session.type].length > 0 
                          ? ts(`${uploadedTracks[session.type].length} tracks available`, `àwọn orin ${uploadedTracks[session.type].length} wà`)
                          : ts('Upload 963Hz files in Audio tab', 'Gbé àwọn fáìlì 963Hz sí Audio tab')
                        }
                      </div>
                    )}
                  </div>

                  {/* RELIABLE YOUTUBE AUDIO OPTION */}
                  <div className="bg-gray-800/60 border border-pink-300/30 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2 flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2 text-pink-300" />
                      {ts('Reliable 963Hz Audio', 'Orin 963Hz Tó Dára')}
                    </h4>
                    <p className="text-sm text-blue-100 mb-3">
                      {ts('Open authentic 963Hz God Frequency in new tab (most reliable)', 
                          'Ṣí ìgbọ̀nsí Ọlọ́run 963Hz òtítọ́ ní tab tuntun (tó dára jùlọ)')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => {
                          const url = "https://www.youtube.com/watch?v=EKTZ151yLnk&autoplay=1";
                          window.open(url, '_blank');
                          
                          toast({
                            title: ts('963Hz Audio Opened', 'Orin 963Hz Ti Ṣí'),
                            description: ts('God Frequency opened in new tab', 'Ìgbọ̀nsí Ọlọ́run ti ṣí ní tab tuntun'),
                          });
                        }}
                        className="bg-pink-600 hover:bg-pink-700 text-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {ts('Open 963Hz God Frequency', 'Ṣí Ìgbọ̀nsí Ọlọ́run 963Hz')}
                      </Button>
                      
                      <Button
                        onClick={() => {
                          const url = "https://www.youtube.com/watch?v=40Hz_Ull2_4&autoplay=1";
                          window.open(url, '_blank');
                          
                          toast({
                            title: ts('Alternative 963Hz Track', 'Orin 963Hz Mìíràn'),
                            description: ts('Opening alternative healing frequency', 'Ń ṣí ìgbọ̀nsí ìwòsàn mìíràn'),
                          });
                        }}
                        variant="outline"
                        className="border-pink-300/50 text-pink-300 hover:bg-pink-300/20"
                      >
                        <Music className="w-4 h-4 mr-2" />
                        {ts('Alternative Track', 'Orin Mìíràn')}
                      </Button>
                    </div>
                    
                    {/* Divine Timer */}
                    {session && (
                      <div className="mt-4 p-3 bg-gray-700/60 rounded-lg border border-pink-300/30">
                        <h5 className="text-sm font-medium text-white mb-2">
                          {ts(`${obatalaRituals[session.type].duration}-Minute Divine Timer`, 
                              `Àkókò Òrìṣà Ìṣẹ́jú ${obatalaRituals[session.type].duration}`)}
                        </h5>
                        <div className="text-center">
                          <div className="text-2xl font-mono text-pink-300 mb-1">
                            {Math.floor(timeRemaining / 60).toString().padStart(2, '0')}:{(timeRemaining % 60).toString().padStart(2, '0')}
                          </div>
                          <div className="text-xs text-blue-200">
                            {ts('remaining', 'tó kù')}
                          </div>
                        </div>
                        <div className="text-xs text-blue-100 mt-2 space-y-1">
                          <div>1. {ts('Allow audio in your browser', 'Gbà orin láàyè nínú ayẹwo rẹ')}</div>
                          <div>2. {ts('Chant: "Òbàtálá bàbá mi, mú kí inú mi mọ́"', 'Kọrin: "Òbàtálá bàbá mi, mú kí inú mi mọ́"')}</div>
                          <div>3. {ts('Focus on crown chakra', 'Dójúkọ adé chakra')}</div>
                          <div>4. {ts('Feel divine light purifying your soul', 'Ni ìrílárá ìmọ́lẹ̀ òrìṣà tí ń mọ ẹ̀mí rẹ')}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      onClick={isPlaying ? stopHealing : start963HzHealing}
                      className={`${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isPlaying ? ts('Stop', 'Dúró') : ts('Play', 'Dún')}
                    </Button>
                    
                    <Button
                      onClick={stopRitual}
                      variant="outline"
                      className="border-gray-300"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {ts('End Session', 'Parí Ìgbà')}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{ts('Volume', 'Ìpọ̀nná Ariwo')}</label>
                    <div className="flex items-center gap-3">
                      <VolumeX className="w-4 h-4 text-gray-400" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <Volume2 className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500 w-8">{Math.round(volume * 100)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default Obatala963HzHealing;