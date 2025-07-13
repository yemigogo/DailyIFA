import { useState, useRef, useEffect } from 'react';
import { Eye, Brain, Download, Share2, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

export default function OrunmilaWisdomHealing() {
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

  // Òrúnmìlà wisdom frequencies - divine consciousness and intuition
  const wisdomFrequencies = [
    { freq: 741, name: "Awakening", color: "from-amber-900 to-yellow-900", description: "Spiritual awakening and consciousness" },
    { freq: 852, name: "Intuition", color: "from-yellow-900 to-gold", description: "Enhanced intuitive abilities" },
    { freq: 963, name: "Divine Mind", color: "from-gold to-amber-800", description: "Connection to divine wisdom" },
    { freq: 1111, name: "Unity", color: "from-amber-800 to-yellow-800", description: "Cosmic consciousness alignment" },
  ];

  const [selectedFrequency, setSelectedFrequency] = useState(wisdomFrequencies[0]);

  // Yoruba affirmations for Òrúnmìlà
  const yorubaAffirmations = [
    {
      yoruba: "Òrúnmìlà, ṣí ojú ọkàn mi sí ìmọ̀ ọlọ́run.",
      english: "Òrúnmìlà, open my mind to divine knowledge.",
      meaning: "Seeking divine wisdom and understanding"
    },
    {
      yoruba: "Ọ̀nà mi kedere; ẹ̀mí mi ni ìtọ́nisọ́nà.",
      english: "My path is clear; my spirit is guided.",
      meaning: "Trusting in divine guidance and direction"
    },
    {
      yoruba: "Mo jí àgbàtàn inú mi dìde.",
      english: "I awaken the intuition within me.",
      meaning: "Activating inner knowing and wisdom"
    },
    {
      yoruba: "Ìmọ̀ àti òye ń sàn nínú mi.",
      english: "Knowledge and understanding flow through me.",
      meaning: "Opening to divine wisdom and clarity"
    }
  ];

  // Òrúnmìlà wisdom practices
  const wisdomPractices = [
    {
      name: "Divination Meditation",
      duration: "20 minutes",
      description: "Connect with Òrúnmìlà's divination wisdom and inner sight",
      steps: [
        "Sit quietly facing east (direction of wisdom)",
        "Light a white or gold candle for clarity",
        "Hold palm nuts or divination tools if available",
        "Chant 'Òrúnmìlà, baba mi' (Òrúnmìlà, my father)",
        "Ask for guidance on a specific question",
        "Listen for insights and inner knowing",
        "Record any visions or messages received"
      ]
    },
    {
      name: "Odu Study Contemplation", 
      duration: "15 minutes",
      description: "Reflect on Odu wisdom and spiritual teachings",
      steps: [
        "Choose one Odu verse for contemplation",
        "Read the verse slowly and mindfully",
        "Reflect on its meaning for your life",
        "Journal insights and personal applications",
        "Give thanks to Òrúnmìlà for wisdom shared"
      ]
    },
    {
      name: "Wisdom Integration Ritual",
      duration: "25 minutes", 
      description: "Integrate divine wisdom into daily consciousness",
      steps: [
        "Create sacred space with yellow/gold items",
        "Offer honey, palm wine, or kola nuts",
        "Speak your gratitude for wisdom received",
        "Set intentions for applying divine guidance",
        "Meditate on becoming a vessel of wisdom",
        "Close with prayers of thanksgiving"
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

  const shareWisdom = async () => {
    const shareData = {
      title: 'Òrúnmìlà Wisdom Healing - Divine Consciousness',
      text: `Experience the divine wisdom of Òrúnmìlà with ${selectedFrequency.freq}Hz healing frequency. Custodian of divine knowledge and master of intuitive sight. 🧠✨`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        toast({
          title: "Copied to clipboard",
          description: "Wisdom healing info copied to clipboard",
        });
      }
    } catch (error) {
      console.error('Sharing failed:', error);
    }
  };

  const downloadCard = async () => {
    try {
      const link = document.createElement('a');
      link.href = '/static/images/orunmila_wisdom_card.png';
      link.download = 'Orunmila_Wisdom_Card.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Card Downloaded",
        description: "Òrúnmìlà Wisdom Card saved to your device",
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
      <div className="text-center py-4 md:py-6 border-l-4 border-yellow-500 bg-gray-800/60 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
          <div className="flex items-center gap-3">
            <Eye className="w-8 h-8 md:w-12 md:h-12 text-yellow-400" />
            <Brain className="w-8 h-8 md:w-12 md:h-12 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-yellow-200 mb-1 md:mb-2">
              Òrúnmìlà Wisdom & Intuition
            </h1>
            <p className="text-lg md:text-xl text-yellow-300 italic">
              Ìmọ̀ àti Àgbàtàn Òrúnmìlà
            </p>
          </div>
        </div>
        
        {/* Daily Affirmation */}
        <div className="text-center py-3 md:py-4 bg-gradient-to-r from-yellow-900/20 via-amber-900/20 to-yellow-900/20 rounded-lg border border-yellow-500/20">
          <p className="text-base md:text-lg italic" style={{ color: '#fff3aa' }}>
            "I am open to divine wisdom. My inner sight awakens to truth and clarity."
          </p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
        {/* Òrúnmìlà Wisdom Card Display */}
        <div className="w-full rounded-lg overflow-hidden border border-yellow-500/20 shadow-lg">
          <img 
            src="/static/images/orunmila_wisdom_card.png" 
            alt="Òrúnmìlà - Custodian of Divine Wisdom"
            className="w-full h-auto object-contain"
            style={{
              maxHeight: '600px',
              filter: 'brightness(0.95) contrast(1.1)'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
          <Button onClick={downloadCard} variant="outline" className="border-yellow-500/30 text-yellow-200 hover:bg-yellow-500/10">
            <Download className="w-4 h-4 mr-2" />
            Download Card
          </Button>
          <Button onClick={shareWisdom} variant="outline" className="border-yellow-500/30 text-yellow-200 hover:bg-yellow-500/10">
            <Share2 className="w-4 h-4 mr-2" />
            Share Wisdom
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="frequencies" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 md:mb-6">
            <TabsTrigger value="frequencies" className="text-xs md:text-sm">
              🎵 Frequencies
            </TabsTrigger>
            <TabsTrigger value="practices" className="text-xs md:text-sm">
              🧘 Practices
            </TabsTrigger>
            <TabsTrigger value="affirmations" className="text-xs md:text-sm">
              💬 Affirmations
            </TabsTrigger>
            <TabsTrigger value="wisdom" className="text-xs md:text-sm">
              📚 Wisdom
            </TabsTrigger>
          </TabsList>

          <TabsContent value="frequencies" className="space-y-4 md:space-y-6">
            <Card className="bg-gray-800/60 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-200 flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Divine Wisdom Frequencies
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Sacred sound frequencies to activate divine consciousness and intuitive wisdom
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                {/* Frequency Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {wisdomFrequencies.map((freq) => (
                    <Card 
                      key={freq.freq}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedFrequency.freq === freq.freq 
                          ? 'bg-gradient-to-r ' + freq.color + ' border-yellow-400' 
                          : 'bg-gray-700/50 border-gray-600 hover:border-yellow-500/50'
                      }`}
                      onClick={() => setSelectedFrequency(freq)}
                    >
                      <CardContent className="p-3 md:p-4">
                        <h3 className="font-semibold text-sm md:text-base mb-1">{freq.freq}Hz - {freq.name}</h3>
                        <p className="text-xs md:text-sm text-gray-300">{freq.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Audio Controls */}
                <div className="space-y-3 md:space-y-4 p-3 md:p-4 bg-gray-700/30 rounded-lg border border-yellow-500/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-semibold text-yellow-200">
                      {selectedFrequency.freq}Hz - {selectedFrequency.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={togglePlayback}
                        size="sm"
                        className="bg-yellow-600 hover:bg-yellow-500 text-black"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={stopFrequency}
                        size="sm"
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-200"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <VolumeX className="w-4 h-4 text-yellow-400" />
                      <Slider
                        value={volume}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <Volume2 className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-yellow-200 min-w-[3rem]">{volume[0]}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practices" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6">
              {wisdomPractices.map((practice, index) => (
                <Card key={index} className="bg-gray-800/60 border-yellow-500/20">
                  <CardHeader>
                    <CardTitle className="text-yellow-200 flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      {practice.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {practice.description} • Duration: {practice.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-yellow-300 text-sm md:text-base">Steps:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-xs md:text-sm text-gray-300">
                        {practice.steps.map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="affirmations" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {yorubaAffirmations.map((affirmation, index) => (
                <Card key={index} className="bg-gray-800/60 border-yellow-500/20">
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-3">
                      <div className="text-yellow-200 font-semibold text-sm md:text-base italic">
                        "{affirmation.yoruba}"
                      </div>
                      <div className="text-gray-300 text-sm md:text-base">
                        "{affirmation.english}"
                      </div>
                      <div className="text-xs md:text-sm text-yellow-400 border-l-2 border-yellow-500 pl-3">
                        {affirmation.meaning}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wisdom" className="space-y-4 md:space-y-6">
            <Card className="bg-gray-800/60 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-200 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Òrúnmìlà's Divine Attributes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-yellow-300">Wisdom Domains:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Custodian of divine wisdom</li>
                      <li>• Master of intuitive sight</li>
                      <li>• Seer of destinies and hidden truths</li>
                      <li>• Guide to inner knowing and clarity</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-yellow-300">Spiritual Gifts:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Channel for Orí (divine consciousness)</li>
                      <li>• Bringer of balance and insight</li>
                      <li>• Teacher of spiritual laws</li>
                      <li>• Guardian of Odu Ifá wisdom</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                  <h4 className="font-semibold text-yellow-200 mb-2">Divination Prayer:</h4>
                  <p className="text-sm text-gray-300 italic">
                    "Òrúnmìlà, baba àgbàlagbà, ẹlẹ́rìí ìpín. Open the pathways of wisdom within me. 
                    Let your divine sight become my inner vision. Guide me to truth, clarity, and right action."
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}