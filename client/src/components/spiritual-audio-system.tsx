import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Play, Pause, RotateCcw, Download, Share2, Clock, Timer } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import EnhancedSharingSystem from './enhanced-sharing-system';

interface SpiritualAudioSystemProps {
  className?: string;
}

interface AudioTrack {
  id: string;
  name: string;
  nameYoruba: string;
  frequency: number;
  duration: number;
  description: string;
  descriptionYoruba: string;
  orisha: string;
  element: string;
  color: string;
}

const SPIRITUAL_FREQUENCIES: AudioTrack[] = [
  {
    id: 'love',
    name: 'Love & Healing',
    nameYoruba: 'Ìfẹ́ àti Ìwòsàn',
    frequency: 528,
    duration: 300,
    description: 'The Love Frequency - promotes healing, peace, and DNA repair',
    descriptionYoruba: 'Ìgbọ̀nsí Ìfẹ́ - igbelaruge iwosan, alaafia, ati atunse DNA',
    orisha: 'Ọbàtálá',
    element: 'Light',
    color: '#FFFFFF'
  },
  {
    id: 'healing',
    name: 'Natural Healing',
    nameYoruba: 'Ìwòsàn Àdáyebá',
    frequency: 432,
    duration: 300,
    description: 'Earth frequency for deep healing and spiritual connection',
    descriptionYoruba: 'Ìgbọ̀nsí ayé fún ìwòsàn jin àti àjọpọ̀ ẹ̀mí',
    orisha: 'Yemọja',
    element: 'Water',
    color: '#2563EB'
  },
  {
    id: 'transformation',
    name: 'Transformation',
    nameYoruba: 'Ìyípadà',
    frequency: 396,
    duration: 300,
    description: 'Liberation from guilt, fear, and negative energy',
    descriptionYoruba: 'Ìdásílẹ̀ láti ẹ̀bi, ẹ̀rù, àti agbára àìtọ́',
    orisha: 'Èṣù',
    element: 'Fire',
    color: '#EF4444'
  },
  {
    id: 'intuition',
    name: 'Intuition',
    nameYoruba: 'Ìmọ̀ Inú',
    frequency: 741,
    duration: 300,
    description: 'Awakening intuition and psychic abilities',
    descriptionYoruba: 'Jíjí ìmọ̀ inú àti agbára àfojúinu',
    orisha: 'Ọ̀rúnmìlà',
    element: 'Wisdom',
    color: '#F59E0B'
  },
  {
    id: 'connection',
    name: 'Divine Connection',
    nameYoruba: 'Àjọpọ̀ Ọlọ́run',
    frequency: 963,
    duration: 300,
    description: 'Connecting with higher consciousness and divine realm',
    descriptionYoruba: 'Àjọpọ̀ pẹ̀lú ọkàn gíga àti agbègbè ọlọ́run',
    orisha: 'Ọlórun',
    element: 'Spirit',
    color: '#7C3AED'
  }
];

export const SpiritualAudioSystem: React.FC<SpiritualAudioSystemProps> = ({ 
  className = "" 
}) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [volume, setVolume] = useState([0.5]);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [activeOscillators, setActiveOscillators] = useState<OscillatorNode[]>([]);
  const [activeGains, setActiveGains] = useState<GainNode[]>([]);
  const [masterGain, setMasterGain] = useState<GainNode | null>(null);
  const [meditationTimer, setMeditationTimer] = useState(0);
  const [meditationDuration, setMeditationDuration] = useState(15); // minutes
  const [meditationLevel, setMeditationLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [isMeditating, setIsMeditating] = useState(false);
  const [showSharing, setShowSharing] = useState(false);

  useEffect(() => {
    // Initialize Web Audio API
    if (!audioContext && typeof window !== 'undefined') {
      try {
        const ctx = new AudioContext();
        setAudioContext(ctx);
      } catch (e) {
        console.log('Web Audio API not supported');
      }
    }
  }, [audioContext]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrack.duration) {
            stopAudio();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  // Meditation timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMeditating) {
      interval = setInterval(() => {
        setMeditationTimer(prev => {
          const newTime = prev + 1;
          const totalSeconds = meditationDuration * 60;
          
          // Play interval chime every 5 minutes (300 seconds)
          if (newTime % 300 === 0 && newTime < totalSeconds) {
            playChime(432); // Earth healing frequency for intervals
          }
          
          // Complete meditation
          if (newTime >= totalSeconds) {
            completeMeditation();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMeditating, meditationDuration]);

  // Helper function to create harmonically rich sound
  const createHarmonicSound = (
    ctx: AudioContext,
    baseFreq: number, 
    waveTypes: OscillatorType[], 
    harmonicLevels: number[],
    oscArray: OscillatorNode[],
    gainArray: GainNode[],
    masterGain: GainNode
  ) => {
    harmonicLevels.forEach((level, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Frequency: base frequency with harmonic overtones
      osc.frequency.value = baseFreq * (index + 1);
      
      // Alternate wave types for richness
      osc.type = waveTypes[index % waveTypes.length];
      
      // Volume decreases with each harmonic
      const harmVolume = level * volume[0] * 0.15;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(harmVolume, ctx.currentTime + 2);
      
      // Connect: oscillator → gain → master gain → destination
      osc.connect(gain);
      gain.connect(masterGain);
      
      osc.start();
      oscArray.push(osc);
      gainArray.push(gain);
    });
  };

  const playFrequency = (track: AudioTrack) => {
    if (!audioContext) return;

    try {
      // Stop any existing audio
      stopAudio();

      // Create frequency-specific soundscape with harmonics and unique characteristics
      const oscillators: OscillatorNode[] = [];
      const gains: GainNode[] = [];
      const masterGain = audioContext.createGain();

      // Configure unique sound for each frequency
      switch (track.id) {
        case 'love': // 528Hz - Love & Healing - Warm, rich harmonics
          createHarmonicSound(audioContext, 528, ['sine', 'triangle'], [1.0, 0.5, 0.3, 0.2], oscillators, gains, masterGain);
          break;
        
        case 'healing': // 432Hz - Natural Healing - Deep, earthy resonance
          createHarmonicSound(audioContext, 432, ['sine', 'sawtooth'], [1.0, 0.4, 0.25], oscillators, gains, masterGain);
          break;
        
        case 'transformation': // 396Hz - Transformation - Dynamic, evolving pulse
          createHarmonicSound(audioContext, 396, ['square', 'triangle'], [1.0, 0.6, 0.4, 0.3], oscillators, gains, masterGain);
          // Add tremolo effect for transformation
          const lfo = audioContext.createOscillator();
          const lfoGain = audioContext.createGain();
          lfo.frequency.value = 4; // 4Hz pulsation
          lfoGain.gain.value = 0.3;
          lfo.connect(lfoGain);
          lfoGain.connect(masterGain.gain);
          lfo.start();
          oscillators.push(lfo);
          break;
        
        case 'intuition': // 741Hz - Intuition - Bright, crystalline clarity
          createHarmonicSound(audioContext, 741, ['sine', 'triangle'], [1.0, 0.7, 0.5, 0.4, 0.3], oscillators, gains, masterGain);
          break;
        
        case 'connection': // 963Hz - Divine Connection - Ethereal, celestial shimmer
          createHarmonicSound(audioContext, 963, ['sine'], [1.0, 0.6, 0.5, 0.4, 0.35, 0.3], oscillators, gains, masterGain);
          // Add subtle vibrato for divine quality
          const vibrato = audioContext.createOscillator();
          const vibratoGain = audioContext.createGain();
          vibrato.frequency.value = 6; // 6Hz vibrato
          vibratoGain.gain.value = 10;
          vibrato.connect(vibratoGain);
          vibratoGain.connect(oscillators[0].frequency);
          vibrato.start();
          oscillators.push(vibrato);
          break;
      }

      // Connect master gain to destination
      masterGain.connect(audioContext.destination);
      masterGain.gain.setValueAtTime(1, audioContext.currentTime);

      // Store ALL oscillators, gains, and master gain for proper cleanup
      setActiveOscillators(oscillators);
      setActiveGains(gains);
      setMasterGain(masterGain);
      setCurrentTrack(track);
      setIsPlaying(true);
      setCurrentTime(0);

      toast({
        title: language === 'yoruba' ? 'Ìgbọ̀nsí bẹ̀rẹ̀' : 'Frequency Started',
        description: `${track.frequency}Hz - ${language === 'yoruba' ? track.nameYoruba : track.name}`,
      });

    } catch (error) {
      console.error('Error playing frequency:', error);
      toast({
        title: language === 'yoruba' ? 'Àṣìṣe ohùn' : 'Audio Error',
        description: language === 'yoruba' ? 'Kò lè ṣe ohùn náà' : 'Cannot play audio',
        variant: 'destructive'
      });
    }
  };

  const stopAudio = () => {
    // Stop and disconnect ALL oscillators
    activeOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Oscillator already stopped or disconnected
      }
    });
    
    // Disconnect all gain nodes
    activeGains.forEach(gain => {
      try {
        gain.disconnect();
      } catch (e) {
        // Already disconnected
      }
    });
    
    // Clean up master gain
    if (masterGain && audioContext) {
      try {
        masterGain.gain.cancelAndHoldAtTime(audioContext.currentTime);
        masterGain.disconnect();
      } catch (e) {
        // Already disconnected
      }
    }
    
    // Clear all references
    setActiveOscillators([]);
    setActiveGains([]);
    setMasterGain(null);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      stopAudio();
    } else if (currentTrack) {
      playFrequency(currentTrack);
    }
  };

  const updateVolume = (newVolume: number[]) => {
    setVolume(newVolume);
    
    // Update master gain if playing
    if (masterGain && audioContext) {
      masterGain.gain.setValueAtTime(newVolume[0], audioContext.currentTime);
    }
    
    // Also update individual gain nodes for live adjustment
    if (audioContext && activeGains.length > 0 && currentTrack) {
      activeGains.forEach((gain, index) => {
        const baseLevel = index === 0 ? 1.0 : 1.0 / (index + 1); // Decreasing harmonics
        const harmVolume = baseLevel * newVolume[0] * 0.15;
        gain.gain.setValueAtTime(harmVolume, audioContext.currentTime);
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const shareFrequency = async (track: AudioTrack) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${track.frequency}Hz - ${track.name}`,
          text: `Experience healing with ${track.frequency}Hz frequency for ${track.description}`,
          url: window.location.href
        });
      } catch (e) {
        // Fallback to clipboard
        copyToClipboard(track);
      }
    } else {
      copyToClipboard(track);
    }
  };

  const copyToClipboard = (track: AudioTrack) => {
    const text = `🎵 ${track.frequency}Hz - ${track.name}\n${track.description}\n\nTry it at: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: language === 'yoruba' ? 'Ó ti ṣàda' : 'Copied!',
        description: language === 'yoruba' ? 'Ìfojúsíi ti wa ní àdàkò' : 'Frequency info copied to clipboard',
      });
    });
  };

  const playChime = (frequency: number) => {
    if (!audioContext) return;
    
    try {
      const chimeOsc = audioContext.createOscillator();
      const chimeGain = audioContext.createGain();
      
      chimeOsc.connect(chimeGain);
      chimeGain.connect(audioContext.destination);
      
      chimeOsc.frequency.value = frequency;
      chimeOsc.type = 'sine';
      
      // Quick chime envelope
      chimeGain.gain.setValueAtTime(0, audioContext.currentTime);
      chimeGain.gain.linearRampToValueAtTime(volume[0] * 0.3, audioContext.currentTime + 0.1);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);
      
      chimeOsc.start();
      chimeOsc.stop(audioContext.currentTime + 1.5);
      
    } catch (error) {
      console.error('Error playing chime:', error);
    }
  };

  const startMeditation = () => {
    setIsMeditating(true);
    setMeditationTimer(0);
    
    toast({
      title: language === 'yoruba' ? 'Ìpamọ́ bẹ̀rẹ̀' : 'Meditation Started',
      description: `${meditationDuration} ${language === 'yoruba' ? 'ìṣẹ́jú' : 'minutes'} - ${meditationLevel}`,
    });
  };

  const stopMeditation = () => {
    setIsMeditating(false);
    setMeditationTimer(0);
  };

  const completeMeditation = () => {
    setIsMeditating(false);
    playChime(528); // Love frequency for completion
    
    toast({
      title: language === 'yoruba' ? 'Ìpamọ́ parí!' : 'Meditation Complete!',
      description: language === 'yoruba' 
        ? 'Ó ti parí ìpamọ́ rẹ. Ẹ kú iṣẹ́!' 
        : 'You have completed your meditation session. Well done!',
    });
  };

  const formatMeditationTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-purple-600" />
            {language === 'yoruba' ? 'Ètò Ohùn Ẹ̀mí' : 'Spiritual Audio System'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Track Display */}
          {currentTrack && (
            <Card className="bg-white/50 dark:bg-black/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: currentTrack.color }}>
                      {language === 'yoruba' ? currentTrack.nameYoruba : currentTrack.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Badge variant="outline">{currentTrack.frequency}Hz</Badge>
                      <Badge variant="outline">{currentTrack.orisha}</Badge>
                      <Badge variant="outline">{currentTrack.element}</Badge>
                    </div>
                  </div>
                  <div className="text-2xl font-mono">
                    {formatTime(currentTime)} / {formatTime(currentTrack.duration)}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(currentTime / currentTrack.duration) * 100}%`,
                      backgroundColor: currentTrack.color
                    }}
                  ></div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                 <Button onClick={togglePlayPause} size="lg" className="roun ded-full">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button onClick={stopAudio} variant="outline" size="lg" className="rounded-full">
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                  <Button 
                    onClick={() => shareFrequency(currentTrack)} 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Volume Control */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <VolumeX className="w-4 h-4" />
            <Slider
              value={volume}
              onValueChange={updateVolume}
              max={1}
              step={0.1}
              className="flex-1"
            />
            <Volume2 className="w-4 h-4" />
            <span className="text-sm font-mono w-8">{Math.round(volume[0] * 100)}</span>
          </div>

          {/* Frequency Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SPIRITUAL_FREQUENCIES.map((track) => (
              <Card 
                key={track.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  currentTrack?.id === track.id ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => playFrequency(track)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: track.color }}
                      ></div>
                      <span className="font-semibold">
                        {language === 'yoruba' ? track.nameYoruba : track.name}
                      </span>
                    </div>
                    <Badge variant="secondary">{track.frequency}Hz</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {language === 'yoruba' ? track.descriptionYoruba : track.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" style={{ borderColor: track.color }}>
                      {track.orisha}
                    </Badge>
                    <Badge variant="outline">{track.element}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Meditation Timer */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-indigo-600" />
                {language === 'yoruba' ? 'Àkànṣe Ìpamọ́ Gíga' : 'Enhanced Meditation Timer'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Meditation Level Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {language === 'yoruba' ? 'Yan Ìpele Ìpamọ́' : 'Select Meditation Level'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['beginner', 'intermediate', 'advanced'].map((level) => (
                    <Button
                      key={level}
                      variant={meditationLevel === level ? "default" : "outline"}
                      onClick={() => setMeditationLevel(level as any)}
                      className="text-xs"
                    >
                      {language === 'yoruba' 
                        ? (level === 'beginner' ? 'Ìbẹ̀rẹ̀' : level === 'intermediate' ? 'Àárín' : 'Gíga')
                        : level.charAt(0).toUpperCase() + level.slice(1)
                      }
                    </Button>
                  ))}
                </div>
              </div>

              {/* Duration Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {language === 'yoruba' ? 'Àkókò (Ìṣẹ́jú)' : 'Duration (Minutes)'}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 15, 30, 60].map((duration) => (
                    <Button
                      key={duration}
                      variant={meditationDuration === duration ? "default" : "outline"}
                      onClick={() => setMeditationDuration(duration)}
                      className="text-xs"
                    >
                      {duration}m
                    </Button>
                  ))}
                </div>
              </div>

              {/* Meditation Display */}
              {isMeditating && (
                <div className="text-center space-y-4">
                  <div className="text-4xl font-mono">
                    {formatMeditationTime(meditationTimer)}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
                      style={{ 
                        width: `${(meditationTimer / (meditationDuration * 60)) * 100}%`
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {language === 'yoruba' 
                      ? '"Ibá ọ, àwọn baba ńlá wa" - Ọ̀wọ̀ fún àwọn baba wa'
                      : '"Honor to you, great ancestors" - Traditional meditation prayer'
                    }
                  </p>
                </div>
              )}

              {/* Meditation Controls */}
              <div className="flex gap-2 justify-center">
                {!isMeditating ? (
                  <Button onClick={startMeditation} className="bg-indigo-600 hover:bg-indigo-700">
                    <Play className="w-4 h-4 mr-2" />
                    {language === 'yoruba' ? 'Bẹ̀rẹ̀ Ìpamọ́' : 'Start Meditation'}
                  </Button>
                ) : (
                  <Button onClick={stopMeditation} variant="outline">
                    <Pause className="w-4 h-4 mr-2" />
                    {language === 'yoruba' ? 'Dá Ìpamọ́ Dúró' : 'Stop Meditation'}
                  </Button>
                )}
                <Button 
                  onClick={() => setShowSharing(!showSharing)} 
                  variant="outline"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {language === 'yoruba' ? 'Pín' : 'Share'}
                </Button>
              </div>

              <p className="text-xs text-center text-gray-500">
                {language === 'yoruba' 
                  ? '⏰ Chimes ní ìṣẹ́jú márùn-ún (432Hz), Gong ní ìparí (528Hz)'
                  : '⏰ Interval chimes every 5 minutes (432Hz), Completion gong (528Hz)'
                }
              </p>
            </CardContent>
          </Card>

          {/* Enhanced Sharing System */}
          {showSharing && (
            <EnhancedSharingSystem 
              spiritualContent={{
                type: currentTrack ? 'frequency' : 'meditation',
                title: currentTrack ? currentTrack.name : 'Meditation Session',
                description: currentTrack ? currentTrack.description : `${meditationDuration} minute ${meditationLevel} meditation`,
                data: currentTrack || { duration: meditationDuration, level: meditationLevel }
              }}
            />
          )}

          {/* Instructions */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
            <CardContent className="p-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {language === 'yoruba' 
                  ? '🎵 Tẹ kárù ìgbọ̀nsí láti gbọ́ ohùn ìwòsàn. Ìgbọ̀nsí kọ̀ọ̀kan ní agbára ìyàtọ̀ fún ìrínṣẹ́ ẹ̀mí.'
                  : '🎵 Click any frequency card to experience healing sounds. Each frequency has unique spiritual benefits for meditation and healing.'
                }
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpiritualAudioSystem;