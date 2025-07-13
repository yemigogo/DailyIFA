import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Zap, 
  Flame, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  Music,
  Timer,
  Heart,
  Crown,
  Upload,
  X
} from 'lucide-react';

interface SangoHealingProps {
  language: 'english' | 'yoruba';
}

interface ThunderSession {
  type: 'transformation' | 'courage' | 'leadership';
  startTime: number;
  duration: number;
  isActive: boolean;
}

interface UploadedTrack {
  id: string;
  name: string;
  url: string;
}

const Sango528HzHealing: React.FC<SangoHealingProps> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [session, setSession] = useState<ThunderSession | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [uploadedTracks, setUploadedTracks] = useState<UploadedTrack[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { toast } = useToast();

  // Bilingual translation helper
  const ts = (english: string, yoruba: string) => language === 'yoruba' ? yoruba : english;

  // Ṣàngó Thunder Rituals with authentic Yoruba practices
  const sangoRituals = {
    transformation: {
      duration: 12,
      steps: [
        "Light red candle and place red apple offering",
        "Face east and raise hands to sky",
        "Chant: 'Ṣàngó Ọba kòso, mú kí agbára mi pọ̀ si'",
        "Visualize lightning cleansing old patterns",
        "Feel thunder energy transforming your core",
        "Express gratitude to Ṣàngó for transformation"
      ],
      stepsYoruba: [
        "Tan fìtílà pupa sí i, fi òrò pupa lélẹ̀",
        "Kọjú sí ìlà-oòrùn, gbé ọwọ́ sókè sí ọ̀run",
        "Kọrin: 'Ṣàngó Ọba kòso, mú kí agbára mi pọ̀ si'",
        "Wo mọ́nàmọ́ná tí ń mọ àwọn àṣà àtijọ́",
        "Rí agbára àrá tí ń yí ẹ̀mí rẹ padà",
        "Dúpẹ́ lọ́wọ́ Ṣàngó fún ìyípadà"
      ]
    },
    courage: {
      duration: 10,
      steps: [
        "Hold red and white beads in both hands",
        "Strike palms together 6 times (Ṣàngó's number)",
        "Chant: 'Ṣàngó, fun mi ní ìgbòyà ati okun'",
        "Visualize fire filling your heart with courage",
        "Feel thunder drum beats strengthening resolve",
        "Affirm your inner warrior spirit"
      ],
      stepsYoruba: [
        "Dí ìlẹ̀kẹ̀ pupa ati funfun mú ní ọwọ́ méjì",
        "Lu ọwọ́ papọ̀ ní ìgbà mẹ́fà (nọ́mbà Ṣàngó)",
        "Kọrin: 'Ṣàngó, fun mi ní ìgbòyà ati okun'",
        "Wo iná tí ń kún inú ọkàn rẹ pẹ̀lú ìgbòyà",
        "Rí ìlù àrá tí ń mú ìpinnu rẹ lágbára",
        "Jẹ́rìí ẹ̀mí jagunjagun inú rẹ"
      ]
    },
    leadership: {
      duration: 15,
      steps: [
        "Wear red cloth around shoulders like royal cape",
        "Hold wooden staff or stick pointing skyward",
        "Chant: 'Ṣàngó Aláàfin, kọ́ mi ní ọ̀nà àṣẹ'",
        "Visualize crown of fire upon your head",
        "Feel royal authority flowing through you",
        "Command respect through divine thunder power",
        "Pledge to lead with justice and strength"
      ],
      stepsYoruba: [
        "Wo aṣọ pupa ní èjìká bí aṣọ ọba",
        "Dí ọ̀pá igi mú tí ó sọ sókè sí ọ̀run",
        "Kọrin: 'Ṣàngó Aláàfin, kọ́ mi ní ọ̀nà àṣẹ'",
        "Wo adé iná lórí rẹ",
        "Rí àṣẹ ọba tí ń kán ara rẹ",
        "Pàṣẹ ọ̀wọ̀ nípa agbára àrá òrìṣà",
        "Pilẹ̀ láti ṣe àkóso pẹ̀lú òdodo ati agbára"
      ]
    }
  };

  // 528Hz Love Frequency Generator for Ṣàngó's compassionate fire
  const start528HzHealing = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // Create 528Hz base frequency with harmonic overtones for fire energy
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      // Create thunder-like modulation with LFO
      const lfo = audioContextRef.current.createOscillator();
      const lfoGain = audioContextRef.current.createGain();

      oscillator.frequency.setValueAtTime(528, audioContextRef.current.currentTime);
      oscillator.type = 'sine';

      // Thunder modulation effect
      lfo.frequency.setValueAtTime(3, audioContextRef.current.currentTime); // 3Hz for thunder-like pulse
      lfo.type = 'triangle';
      lfoGain.gain.setValueAtTime(10, audioContextRef.current.currentTime); // Moderate modulation

      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);

      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContextRef.current.currentTime + 0.5);

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.start();
      lfo.start();

      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;

      setIsPlaying(true);

      toast({
        title: ts('528Hz Fire Healing Started', 'Ìwòsàn Iná 528Hz Ti Bẹ̀rẹ̀'),
        description: ts('Ṣàngó\'s transformative thunder energy flowing', 'Agbára àrá ìyípadà Ṣàngó ń ṣàn'),
      });

    } catch (error) {
      console.error('Audio Context Error:', error);
      toast({
        title: ts('Audio Error', 'Àṣìṣe Orin'),
        description: ts('Please try again or use YouTube audio', 'Jọ̀wọ́ gbìyànjú lẹ́ẹ̀kan si tàbí lo orin YouTube'),
        variant: 'destructive'
      });
    }
  };

  const stopHealing = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current = null;
    }
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const startRitual = (type: 'transformation' | 'courage' | 'leadership') => {
    const duration = sangoRituals[type].duration * 60; // Convert to seconds
    
    setSession({
      type,
      startTime: Date.now(),
      duration,
      isActive: true
    });
    
    setTimeRemaining(duration);
    
    // Start healing frequency automatically
    start528HzHealing();
    
    // Start countdown timer
    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          stopRitual();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast({
      title: ts(`${type.charAt(0).toUpperCase() + type.slice(1)} Ritual Started`, 
                `Ìgbà ${type === 'transformation' ? 'Ìyípadà' : type === 'courage' ? 'Ìgbòyà' : 'Àṣẹ'} Ti Bẹ̀rẹ̀`),
      description: ts(`${sangoRituals[type].duration}-minute Ṣàngó fire ceremony`, 
                      `Àjọ iná Ṣàngó ìṣẹ́jú ${sangoRituals[type].duration}`),
    });
  };

  const stopRitual = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    stopHealing();
    setSession(null);
    setTimeRemaining(0);

    toast({
      title: ts('Thunder Ritual Complete', 'Àjọ Àrá Ti Parí'),
      description: ts('Ṣàngó\'s blessings received', 'Ìbùkún Ṣàngó ti gba'),
    });
  };

  // File upload handlers
  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        const newTrack: UploadedTrack = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: url
        };
        setUploadedTracks(prev => [...prev, newTrack]);

        toast({
          title: ts('Audio Uploaded', 'Orin Ti Gba'),
          description: ts(`Added ${file.name}`, `Ti fi ${file.name} kun`),
        });
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeTrack = (trackId: string) => {
    setUploadedTracks(prev => {
      const track = prev.find(t => t.id === trackId);
      if (track) {
        URL.revokeObjectURL(track.url);
      }
      return prev.filter(t => t.id !== trackId);
    });
  };

  // Update volume when changed
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume * 0.3, audioContextRef.current!.currentTime);
    }
    if (audioElementRef.current) {
      audioElementRef.current.volume = volume;
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopHealing();
      uploadedTracks.forEach(track => URL.revokeObjectURL(track.url));
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-blue-50 p-3 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        {/* Daily Thunder Affirmation Section - Mobile-first */}
        <div className="bg-gray-800/60 p-4 md:p-6 border-l-4 border-red-400 rounded-lg mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
            🙏 {ts('Daily Thunder Affirmation', 'Àdúrà Àrá Ojoojúmọ́')}
          </h2>
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-4 rounded-lg border border-red-300/20">
            <p className="text-blue-100 italic text-base md:text-lg leading-relaxed text-center">
              {ts(
                '"Thunder courses through my veins. I am strong, courageous, and transforming with Ṣàngó\'s fire."',
                '"Àrá ń sàn nínú iṣan ara mi. Mo lágbára, mo ní ìgbòyà, mo sì ń yípadà pẹ̀lú iná Ṣàngó."'
              )}
            </p>
            <div className="mt-3 pt-3 border-t border-red-300/20">
              <p className="text-xs md:text-sm text-red-200 text-center">
                {ts('Declare this with power during 528Hz thunder meditation', 'Kéde èyí pẹ̀lú agbára ní àsìkò àṣẹ àrá 528Hz')}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="relative">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-red-400" />
              <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-400 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
              {ts('Ṣàngó 528Hz Thunder & Fire', 'Ìwòsàn Àrá àti Iná Ṣàngó 528Hz')}
            </h1>
          </div>
          <p className="text-sm md:text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {ts('Transform through 528Hz love frequency and authentic thunder power rituals.',
                'Yípadà nípa ìgbọ̀nsí ìfẹ́ 528Hz àti àwọn àjọ agbára àrá òtítọ́.')}
          </p>
        </div>

        {/* Benefits Section - Mobile optimized */}
        <div className="mb-6 md:mb-8 bg-gray-800/60 border border-pink-300/30 rounded-lg p-4 md:p-6 border-l-4 border-l-red-500">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
            {ts('Benefits', 'Àwọn Àǹfààní')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-blue-100">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 md:w-4 md:h-4 text-red-400 flex-shrink-0" />
                <span className="text-sm md:text-base">{ts('Personal Transformation', 'Ìyípadà Ara Ẹni')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-3 h-3 md:w-4 md:h-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm md:text-base">{ts('Courage & Confidence', 'Ìgbòyà àti Ìgbẹ́kẹ̀lé')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-sm md:text-base">{ts('Leadership Power', 'Agbára Àṣẹ')}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-3 h-3 md:w-4 md:h-4 text-pink-400 flex-shrink-0" />
                <span className="text-sm md:text-base">{ts('528Hz Love Frequency', 'Ìgbọ̀nsí Ìfẹ́ 528Hz')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-3 h-3 md:w-4 md:h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm md:text-base">{ts('Justice & Balance', 'Òdodo àti Ìdọ̀gba')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-3 h-3 md:w-4 md:h-4 text-purple-400 flex-shrink-0" />
                <span className="text-sm md:text-base">{ts('Thunder Energy', 'Agbára Àrá')}</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="rituals" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-700/50 border border-pink-300/30">
            <TabsTrigger value="rituals" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-xs md:text-sm flex items-center gap-1 md:gap-2">
              <Zap className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">{ts('Rituals', 'Àṣẹ')}</span>
              <span className="sm:hidden">⚡</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-xs md:text-sm flex items-center gap-1 md:gap-2">
              <Music className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">{ts('Audio', 'Orin')}</span>
              <span className="sm:hidden">🎵</span>
            </TabsTrigger>
            <TabsTrigger value="session" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-xs md:text-sm flex items-center gap-1 md:gap-2">
              <Timer className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">{ts('Session', 'Ìgbà')}</span>
              <span className="sm:hidden">⏰</span>
            </TabsTrigger>
            <TabsTrigger value="science" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white text-xs md:text-sm flex items-center gap-1 md:gap-2">
              <Heart className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">{ts('Science', 'Sáyẹ́nsì')}</span>
              <span className="sm:hidden">💖</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">
              <Music className="w-4 h-4 mr-2" />
              {ts('Audio', 'Orin')}
            </TabsTrigger>
            <TabsTrigger value="science" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">
              <Flame className="w-4 h-4 mr-2" />
              {ts('Fire Science', 'Ìmọ̀ Iná')}
            </TabsTrigger>
            <TabsTrigger value="session" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">
              <Timer className="w-4 h-4 mr-2" />
              {ts('Session', 'Ìgbà')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rituals" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(sangoRituals).map(([type, ritual]) => (
                <Card key={type} className="bg-gray-800/60 border border-pink-300/30 hover:border-pink-300/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-white">
                      {type === 'transformation' && <Zap className="w-5 h-5 text-red-400" />}
                      {type === 'courage' && <Flame className="w-5 h-5 text-orange-400" />}
                      {type === 'leadership' && <Crown className="w-5 h-5 text-yellow-500" />}
                      {ts(type.charAt(0).toUpperCase() + type.slice(1), 
                          type === 'transformation' ? 'Ìyípadà' : 
                          type === 'courage' ? 'Ìgbòyà' : 'Àṣẹ')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-100">{ts('Steps', 'Àwọn Ìgbésẹ̀')}</h4>
                      <ul className="text-sm space-y-1">
                        {(language === 'yoruba' ? ritual.stepsYoruba : ritual.steps).map((step, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-400 font-mono text-xs mt-0.5">{index + 1}.</span>
                            <span className="text-blue-100">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-red-300/20 border-red-300/50 text-white">
                        {ritual.duration} {ts('min', 'ìṣẹ́jú')} • 528Hz
                      </Badge>
                      <Button
                        onClick={() => startRitual(type as 'transformation' | 'courage' | 'leadership')}
                        className="bg-red-600 hover:bg-red-700 text-white"
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
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/60 border border-pink-300/30">
                <CardHeader>
                  <CardTitle className="text-white">{ts('Offline Audio Support', 'Àtìlẹ́yìn Orin Aláìlórí')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-700/60 border border-pink-300/30 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">
                      {ts('Local 528Hz Audio', 'Orin 528Hz Ìbílẹ̀')}
                    </h4>
                    <audio 
                      controls 
                      className="w-full"
                      ref={audioElementRef}
                    >
                      <source src="/static/audio/sango_528hz.mp3" type="audio/mpeg" />
                      {ts('Your browser does not support audio playback', 'Ayẹwo rẹ kò ṣe àtìlẹ́yìn fún dídún orin')}
                    </audio>
                    <p className="text-xs text-blue-200 mt-2">
                      {ts('For offline use when internet is unavailable', 'Fún lílo aláìlórí nígbà tí íńtánẹ́ẹ̀tì kò sí')}
                    </p>
                  </div>

                  {/* File Upload Section */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-white">{ts('Upload Your 528Hz Tracks', 'Gba Àwọn Orin 528Hz Rẹ')}</h4>
                    
                    <div 
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        isDragOver 
                          ? 'border-red-400 bg-red-400/10' 
                          : 'border-pink-300/50 hover:border-pink-300/70'
                      }`}
                      onDrop={handleDrop}
                      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                      onDragLeave={() => setIsDragOver(false)}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-8 h-8 text-red-400 mx-auto mb-2" />
                      <p className="text-blue-100 mb-2">
                        {ts('Drop 528Hz audio files here or click to browse', 'Gbé àwọn fáìlì orin 528Hz wá síbí tàbí tẹ láti wa')}
                      </p>
                      <p className="text-xs text-blue-200">
                        {ts('Supports MP3, WAV, OGG, M4A', 'Ṣe àtìlẹ́yìn MP3, WAV, OGG, M4A')}
                      </p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    />

                    {uploadedTracks.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="font-medium text-white">{ts('Uploaded Tracks', 'Àwọn Orin Tí A Gba')}</h5>
                        {uploadedTracks.map(track => (
                          <div key={track.id} className="flex items-center gap-2 bg-gray-700/60 p-2 rounded">
                            <audio controls className="flex-1">
                              <source src={track.url} />
                            </audio>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeTrack(track.id)}
                              className="border-red-300/50 text-red-300 hover:bg-red-300/20"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/60 border border-pink-300/30">
                <CardHeader>
                  <CardTitle className="text-white">{ts('Reliable YouTube Audio', 'Orin YouTube Tó Dára')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-700/60 border border-pink-300/30 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2 flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2 text-red-400" />
                      {ts('Authentic 528Hz Fire Frequencies', 'Àwọn Ìgbọ̀nsí Iná 528Hz Òtítọ́')}
                    </h4>
                    <p className="text-sm text-blue-100 mb-3">
                      {ts('Open powerful 528Hz love frequency in new tab for Ṣàngó fire healing', 
                          'Ṣí ìgbọ̀nsí ìfẹ́ 528Hz alágbára ní tab tuntun fún ìwòsàn iná Ṣàngó')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => {
                          const url = "https://www.youtube.com/watch?v=WPni755-Krg&autoplay=1";
                          window.open(url, '_blank');
                          
                          toast({
                            title: ts('528Hz Fire Audio Opened', 'Orin Iná 528Hz Ti Ṣí'),
                            description: ts('Love frequency opened for transformation', 'Ìgbọ̀nsí ìfẹ́ ti ṣí fún ìyípadà'),
                          });
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {ts('Open 528Hz Love Frequency', 'Ṣí Ìgbọ̀nsí Ìfẹ́ 528Hz')}
                      </Button>
                      
                      <Button
                        onClick={() => {
                          const url = "https://www.youtube.com/watch?v=5z7grsMp9qU&autoplay=1";
                          window.open(url, '_blank');
                          
                          toast({
                            title: ts('Alternative 528Hz Track', 'Orin 528Hz Mìíràn'),
                            description: ts('Opening alternative healing frequency', 'Ń ṣí ìgbọ̀nsí ìwòsàn mìíràn'),
                          });
                        }}
                        variant="outline"
                        className="border-red-300/50 text-red-300 hover:bg-red-300/20"
                      >
                        <Music className="w-4 h-4 mr-2" />
                        {ts('Alternative Track', 'Orin Mìíràn')}
                      </Button>
                    </div>
                    
                    {/* Thunder Timer */}
                    {session && (
                      <div className="mt-4 p-3 bg-gray-700/60 rounded-lg border border-red-300/30">
                        <h5 className="text-sm font-medium text-white mb-2">
                          {ts(`${sangoRituals[session.type].duration}-Minute Thunder Timer`, 
                              `Àkókò Àrá Ìṣẹ́jú ${sangoRituals[session.type].duration}`)}
                        </h5>
                        <div className="text-center">
                          <div className="text-2xl font-mono text-red-400 mb-1">
                            {Math.floor(timeRemaining / 60).toString().padStart(2, '0')}:{(timeRemaining % 60).toString().padStart(2, '0')}
                          </div>
                          <div className="text-xs text-blue-200">
                            {ts('remaining', 'tó kù')}
                          </div>
                        </div>
                        <div className="text-xs text-blue-100 mt-2 space-y-1">
                          <div>1. {ts('Allow audio in your browser', 'Gbà orin láàyè nínú ayẹwo rẹ')}</div>
                          <div>2. {ts('Chant: "Ṣàngó Ọba kòso, mú kí agbára mi pọ̀ si"', 'Kọrin: "Ṣàngó Ọba kòso, mú kí agbára mi pọ̀ si"')}</div>
                          <div>3. {ts('Feel thunder energy in your core', 'Ni ìrílárá agbára àrá nínú ara rẹ')}</div>
                          <div>4. {ts('Visualize fire transforming your spirit', 'Wo iná tí ń yí ẹ̀mí rẹ padà')}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      onClick={isPlaying ? stopHealing : start528HzHealing}
                      className={`${isPlaying ? 'bg-orange-600 hover:bg-orange-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isPlaying ? ts('Stop', 'Dúró') : ts('Play', 'Dún')}
                    </Button>
                    
                    <Button
                      onClick={stopRitual}
                      variant="outline"
                      className="border-red-300/50 text-red-300 hover:bg-red-300/20"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {ts('End Session', 'Parí Ìgbà')}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">{ts('Volume', 'Ìpọ̀nná Ariwo')}</label>
                    <div className="flex items-center gap-3">
                      <VolumeX className="w-4 h-4 text-red-400" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <Volume2 className="w-4 h-4 text-red-400" />
                      <span className="text-xs text-red-300 w-8">{Math.round(volume * 100)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="science" className="space-y-6">
            <Card className="bg-gray-800/60 border border-pink-300/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Flame className="w-6 h-6 text-red-400" />
                  {ts('528Hz Fire Science & Thunder Energy', 'Ìmọ̀ Iná 528Hz àti Agbára Àrá')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-blue-100">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      {ts('528Hz Love Frequency', 'Ìgbọ̀nsí Ìfẹ́ 528Hz')}
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Heart className="w-4 h-4 text-red-400 mt-0.5" />
                        <span>{ts('Known as the "Love Frequency" - repairs DNA and heals relationships', 'Tí a mọ̀ sí "Ìgbọ̀nsí Ìfẹ́" - ń tún DNA ṣe àti ìmúlọ ìbátanú')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-red-400 mt-0.5" />
                        <span>{ts('Resonates with heart chakra, promoting transformation and courage', 'Kọ lu àyà chakra, ń gbé ìyípadà àti ìgbòyà dídé')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Flame className="w-4 h-4 text-orange-400 mt-0.5" />
                        <span>{ts('When combined with Ṣàngó energy, creates powerful transformation fire', 'Nígbà tí a bá dà pọ̀ mọ́ agbára Ṣàngó, ó ń dá iná ìyípadà alágbára')}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      {ts('Ṣàngó Thunder Power', 'Agbára Àrá Ṣàngó')}
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Crown className="w-4 h-4 text-yellow-400 mt-0.5" />
                        <span>{ts('Ṣàngó governs justice, leadership, and personal power', 'Ṣàngó ń ṣàkóso òdodo, àṣẹ, àti agbára ara ẹni')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-red-400 mt-0.5" />
                        <span>{ts('Thunder energy breaks through blockages and old patterns', 'Agbára àrá ń já àwọn ìdènà àti àṣà àtijọ́ kúrò')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Flame className="w-4 h-4 text-orange-400 mt-0.5" />
                        <span>{ts('Fire element purifies and transforms on cellular level', 'Ẹ̀rọ̀ iná ń mọ́ àti yí padà ní ipele sẹ́ẹ̀lì')}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 p-4 rounded-lg border border-red-300/30">
                  <h4 className="font-semibold text-white mb-2">
                    {ts('Scientific Benefits of Thunder Meditation', 'Àwọn Àǹfààní Ìmọ̀ Jinlẹ̀ Ìṣòro Àrá')}
                  </h4>
                  <p className="text-sm text-blue-100">
                    {ts('Research shows that 528Hz frequency can positively affect heart rate variability, reduce cortisol levels, and increase oxytocin production. When combined with thunder meditation practices, these effects are amplified, leading to enhanced emotional regulation, increased confidence, and improved leadership capabilities.',
                        'Ìwádìí fi hàn pé ìgbọ̀nsí 528Hz lè ní ipa rere lórí ìyípadà ìlù ọkàn, din ipele kọtísọọlì kù, àti mu ìdásílẹ̀ oxytocin pọ̀ si. Nígbà tí a bá da pọ̀ mọ́ àwọn àṣà ìṣòro àrá, àwọn ipa wọ̀nyí ń di púpọ̀ si, tí ó ń yọrí sí ìṣàkóso ẹ̀dùn tí ó dára, ìgbẹ́kẹ̀lé tí ó pọ̀ si, àti àwọn agbára àṣẹ tí ó dára sí i.')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="session" className="space-y-6">
            {session ? (
              <Card className="bg-gray-800/60 border border-pink-300/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-red-400" />
                    {ts(`${session.type.charAt(0).toUpperCase() + session.type.slice(1)} Thunder Session`, 
                        `Ìgbà Àrá ${session.type === 'transformation' ? 'Ìyípadà' : session.type === 'courage' ? 'Ìgbòyà' : 'Àṣẹ'}`)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-mono text-red-400 mb-2">
                      {Math.floor(timeRemaining / 60).toString().padStart(2, '0')}:{(timeRemaining % 60).toString().padStart(2, '0')}
                    </div>
                    <p className="text-blue-100">
                      {ts('Time remaining in your thunder ritual', 'Àkókò tí ó kù nínú àjọ àrá rẹ')}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 p-4 rounded-lg border border-red-300/30">
                    <h4 className="font-semibold text-white mb-3">
                      {ts('Current Ritual Steps', 'Àwọn Ìgbésẹ̀ Àjọ Lọ́wọ́lọ́wọ́')}
                    </h4>
                    <div className="space-y-2">
                      {(language === 'yoruba' ? sangoRituals[session.type].stepsYoruba : sangoRituals[session.type].steps).map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="text-red-400 font-bold text-sm mt-0.5">{index + 1}.</span>
                          <span className="text-blue-100 text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <p className="text-lg text-white font-medium">
                      {ts('Feel Ṣàngó\'s thunder power flowing through you', 'Ni ìrílárá agbára àrá Ṣàngó tí ń kán ara rẹ')}
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={stopRitual}
                        variant="outline"
                        className="border-red-300/50 text-red-300 hover:bg-red-300/20"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        {ts('End Session', 'Parí Ìgbà')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-800/60 border border-pink-300/30">
                <CardHeader>
                  <CardTitle className="text-white">{ts('No Active Session', 'Kò Sí Ìgbà Tí Ń Lọ')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 text-center">
                    {ts('Start a thunder ritual from the Rituals tab to begin your Ṣàngó healing session', 
                        'Bẹ̀rẹ̀ àjọ àrá láti táàbù Àwọn Àjọ láti bẹ̀rẹ̀ ìgbà ìwòsàn Ṣàngó rẹ')}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Sango528HzHealing;