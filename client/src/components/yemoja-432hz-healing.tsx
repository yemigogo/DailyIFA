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
  Info
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

  const ts = (english: string, yoruba: string) => 
    language === 'yoruba' ? yoruba : english;

  useEffect(() => {
    return () => {
      stopHealing();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
    const tones = generate432HzTone();
    
    const ritual = yemojaRituals[session.type];
    const stepDuration = (ritual.duration * 60 * 1000) / ritual.steps.length;
    
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rituals" className="flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            {ts('Rituals', 'Àṣẹ')}
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
                  
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p>{ts('Playing 432Hz with harmonic overtones for water healing', 
                          'Ń dún 432Hz pẹ̀lú àwọn ìgbọ̀nsí ìbámu fún ìwòsàn omi')}</p>
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