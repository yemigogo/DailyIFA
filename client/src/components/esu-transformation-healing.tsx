import { useState, useRef, useEffect } from 'react';
import { Flame, Volume2, VolumeX, Download, Share2, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

export default function EsuTransformationHealing() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const { toast } = useToast();

  // Èṣù transformation frequencies - fire and transformation energy
  const transformationFrequencies = [
    { freq: 285, name: "Transformation", color: "from-red-900 to-orange-900" },
    { freq: 417, name: "Change", color: "from-orange-900 to-yellow-900" },
    { freq: 741, name: "Awakening", color: "from-yellow-900 to-red-900" },
    { freq: 852, name: "Intuition", color: "from-red-800 to-orange-800" },
  ];

  const [selectedFrequency, setSelectedFrequency] = useState(transformationFrequencies[0]);

  // Yoruba affirmations for Èṣù
  const yorubaAffirmations = [
    {
      yoruba: "Èṣù rere, ṣi ilẹ̀kùn àyọ̀ sílẹ̀ fún mi.",
      english: "Good Èṣù, open the door of joy for me.",
      meaning: "Inviting positive transformation and opportunities"
    },
    {
      yoruba: "Mo yọ ara mi kúrò nínú ẹ̀rù àti ìbànújẹ.",
      english: "I free myself from fear and sorrow.",
      meaning: "Liberation from limiting emotions"
    },
    {
      yoruba: "Pẹlu iná rẹ, yí ayé mi padà.",
      english: "With your fire, transform my world.",
      meaning: "Embracing the transformative power of Èṣù"
    }
  ];

  // Transformation rituals
  const transformationRituals = [
    {
      name: "Crossroads Meditation",
      duration: "15 minutes",
      description: "Meditate at symbolic crossroads to invoke Èṣù's guidance",
      steps: [
        "Find a quiet crossroads (physical or visualized)",
        "Light a red or black candle",
        "Recite Èṣù invocations",
        "Meditate on transformation needed",
        "Offer gratitude for guidance"
      ]
    },
    {
      name: "Fire Cleansing Ritual",
      duration: "20 minutes", 
      description: "Use fire energy to burn away negative patterns",
      steps: [
        "Prepare small fire-safe bowl",
        "Write limitations on paper",
        "Invoke Èṣù's transformative fire",
        "Safely burn the papers",
        "Visualize new pathways opening"
      ]
    },
    {
      name: "Path Opening Ceremony",
      duration: "30 minutes",
      description: "Open new spiritual and life pathways with Èṣù",
      steps: [
        "Create altar with red and black items",
        "Place crossroads symbol or image",
        "Recite path-opening prayers",
        "Meditate on desired changes",
        "Thank Èṣù for opening ways"
      ]
    }
  ];

  const initializeAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playFrequency = (frequency: number) => {
    const audioContext = initializeAudio();
    
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }

    oscillatorRef.current = audioContext.createOscillator();
    gainNodeRef.current = audioContext.createGain();

    oscillatorRef.current.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillatorRef.current.type = 'sine';
    
    gainNodeRef.current.gain.setValueAtTime(volume[0] / 100 * 0.3, audioContext.currentTime);
    
    oscillatorRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContext.destination);
    
    oscillatorRef.current.start();
    setIsPlaying(true);
  };

  const stopFrequency = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopFrequency();
    } else {
      playFrequency(selectedFrequency.freq);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVolume[0] / 100 * 0.3, audioContextRef.current!.currentTime);
    }
  };

  const shareTransformation = async () => {
    const shareData = {
      title: 'Èṣù Transformation Healing - 285Hz Fire Energy',
      text: `Experience the transformative power of Èṣù with ${selectedFrequency.freq}Hz healing frequency. Guardian of crossroads and opener of paths. 🔥`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        toast({
          title: "Copied to clipboard",
          description: "Transformation healing info copied to clipboard",
        });
      }
    } catch (error) {
      console.error('Sharing failed:', error);
    }
  };

  const downloadCard = async () => {
    try {
      // Import the asset image path
      const imageUrl = (await import('@assets/image_1752430300487.png')).default;
      
      // Create a canvas to download the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Esu_Fire_Transformation_Card.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
          }
        });
      };
      
      img.src = imageUrl;
      
      toast({
        title: "Card Downloaded",
        description: "Èṣù Fire Transformation Card saved to your device",
      });
    } catch (error) {
      toast({
        title: "Download Error",
        description: "Unable to download card. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-blue-100 p-3 md:p-6">
      {/* Header Section */}
      <div className="text-center py-4 md:py-6 border-l-4 border-red-500 bg-gray-800/60 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
          <Flame className="w-8 h-8 md:w-12 md:h-12 text-red-400" />
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-red-200 mb-1 md:mb-2">
              Èṣù Transformation Healing
            </h1>
            <p className="text-lg md:text-xl text-red-300 italic">
              ìwòsàn àti ìyípadà Èṣù
            </p>
          </div>
        </div>
        
        {/* Daily Affirmation */}
        <div className="text-center py-3 md:py-4 bg-gradient-to-r from-red-900/20 via-orange-900/20 to-red-900/20 rounded-lg border border-red-500/20">
          <p className="text-base md:text-lg italic" style={{ color: '#ffddaa' }}>
            "I embrace the fire of transformation. Fear dissolves, and new paths open before me."
          </p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        {/* Èṣù Transformation Card Display */}
        <div className="w-full rounded-lg overflow-hidden border border-red-500/20 shadow-lg">
          <img 
            src="/assets/image_1752430300487.png" 
            alt="Èṣù - Guardian of Crossroads and Fire Transformation"
            className="w-full h-auto object-contain"
            style={{
              maxHeight: '600px',
              filter: 'brightness(0.95) contrast(1.1)'
            }}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="rituals" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-800/50 border border-red-500/20">
            <TabsTrigger value="rituals" className="text-xs md:text-sm">
              <span className="hidden md:inline">Transformation Rituals</span>
              <span className="md:hidden">🔥 Rituals</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="text-xs md:text-sm">
              <span className="hidden md:inline">Fire Frequencies</span>
              <span className="md:hidden">🎵 Audio</span>
            </TabsTrigger>
            <TabsTrigger value="affirmations" className="text-xs md:text-sm">
              <span className="hidden md:inline">Sacred Affirmations</span>
              <span className="md:hidden">📿 Words</span>
            </TabsTrigger>
            <TabsTrigger value="wisdom" className="text-xs md:text-sm">
              <span className="hidden md:inline">Èṣù Wisdom</span>
              <span className="md:hidden">🌟 Wisdom</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rituals" className="space-y-4 md:space-y-6">
            <div className="grid gap-4 md:gap-6">
              {transformationRituals.map((ritual, index) => (
                <Card key={index} className="bg-gray-800/60 border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-red-200 text-lg md:text-xl">{ritual.name}</CardTitle>
                    <CardDescription className="text-red-300">
                      Duration: {ritual.duration} | {ritual.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 md:space-y-3">
                      {ritual.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-2 md:gap-3">
                          <span className="text-red-400 font-semibold text-sm md:text-base">
                            {stepIndex + 1}.
                          </span>
                          <span className="text-blue-100 text-sm md:text-base">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4 md:space-y-6">
            {/* Fire Frequency Generator */}
            <Card className="bg-gray-800/60 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-200">🔥 Fire Frequency Generator</CardTitle>
                <CardDescription className="text-red-300">
                  Transformation frequencies to ignite change and open pathways
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                {/* Frequency Selection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                  {transformationFrequencies.map((freq) => (
                    <Button
                      key={freq.freq}
                      variant={selectedFrequency.freq === freq.freq ? "default" : "outline"}
                      className={`h-16 md:h-20 flex flex-col justify-center ${
                        selectedFrequency.freq === freq.freq 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'border-red-500/30 text-red-200 hover:bg-red-900/30'
                      }`}
                      onClick={() => setSelectedFrequency(freq)}
                    >
                      <span className="text-xs md:text-sm font-semibold">{freq.freq}Hz</span>
                      <span className="text-xs">{freq.name}</span>
                    </Button>
                  ))}
                </div>

                {/* Audio Controls */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <Button
                    onClick={togglePlayback}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${
                      isPlaying 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {isPlaying ? 
                      <Pause className="w-5 h-5 md:w-6 md:h-6" /> : 
                      <Play className="w-5 h-5 md:w-6 md:h-6" />
                    }
                  </Button>

                  <div className="flex-1 space-y-2 md:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm md:text-base text-red-200">
                        {selectedFrequency.name} - {selectedFrequency.freq}Hz
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-red-300 hover:text-red-200"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs md:text-sm text-red-300">
                        <span>Volume</span>
                        <span>{volume[0]}%</span>
                      </div>
                      <Slider
                        value={volume}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Sharing Controls */}
                <div className="flex flex-wrap gap-2 md:gap-4">
                  <Button
                    variant="outline"
                    onClick={shareTransformation}
                    className="border-red-500/30 text-red-200 hover:bg-red-900/30"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    <span className="hidden md:inline">Share Transformation</span>
                    <span className="md:hidden">Share</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={downloadCard}
                    className="border-red-500/30 text-red-200 hover:bg-red-900/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    <span className="hidden md:inline">Download Card</span>
                    <span className="md:hidden">Download</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="affirmations" className="space-y-4 md:space-y-6">
            <div className="grid gap-4 md:gap-6">
              {yorubaAffirmations.map((affirmation, index) => (
                <Card key={index} className="bg-gray-800/60 border-red-500/20">
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-3 md:space-y-4">
                      <div className="text-center">
                        <p className="text-lg md:text-xl font-semibold text-red-200 mb-2">
                          {affirmation.yoruba}
                        </p>
                        <p className="text-base md:text-lg text-blue-200 italic">
                          {affirmation.english}
                        </p>
                      </div>
                      <div className="border-t border-red-500/20 pt-3">
                        <p className="text-sm md:text-base text-red-300 text-center">
                          <strong>Meaning:</strong> {affirmation.meaning}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wisdom" className="space-y-4 md:space-y-6">
            <Card className="bg-gray-800/60 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-200">The Wisdom of Èṣù</CardTitle>
                <CardDescription className="text-red-300">
                  Guardian of crossroads, mediator between realms, opener of paths
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-red-200">Sacred Domains</h3>
                    <ul className="space-y-2 text-sm md:text-base text-blue-100">
                      <li>• Guardian of the crossroads</li>
                      <li>• Mediator between heaven and earth</li>
                      <li>• Liberator from guilt and fear</li>
                      <li>• Transformer of negative energy</li>
                      <li>• Opener of spiritual paths</li>
                      <li>• Witness to all destinies</li>
                      <li>• Balancer of karma and justice</li>
                      <li>• Activator of divine destiny</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-lg md:text-xl font-semibold text-red-200">Transformation Practice</h3>
                    <p className="text-sm md:text-base text-blue-100">
                      Èṣù teaches us that every ending is a beginning, every obstacle a doorway. 
                      Work with Èṣù when you need to break free from limiting patterns, 
                      open new opportunities, or navigate major life transitions.
                    </p>
                    <p className="text-sm md:text-base text-red-300 italic">
                      "At the crossroads, all possibilities exist. Choose your path with wisdom and courage."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}