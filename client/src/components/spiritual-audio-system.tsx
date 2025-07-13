import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Play, Pause, RotateCcw, Download, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

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
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

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

  const playFrequency = (track: AudioTrack) => {
    if (!audioContext) return;

    try {
      // Stop any existing audio
      stopAudio();

      // Create new nodes
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      // Connect nodes
      osc.connect(gain);
      gain.connect(audioContext.destination);

      // Configure oscillator
      osc.frequency.value = track.frequency;
      osc.type = 'sine';

      // Configure gain with smooth envelope
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(volume[0] * 0.1, audioContext.currentTime + 2);

      // Start oscillator
      osc.start();

      setOscillator(osc);
      setGainNode(gain);
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
    if (oscillator) {
      try {
        oscillator.stop();
      } catch (e) {
        // Oscillator already stopped
      }
      setOscillator(null);
    }
    if (gainNode) {
      setGainNode(null);
    }
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
    if (gainNode && audioContext) {
      gainNode.gain.setValueAtTime(newVolume[0] * 0.1, audioContext.currentTime);
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
                  <Button onClick={togglePlayPause} size="lg" className="rounded-full">
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