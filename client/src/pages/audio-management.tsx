import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Play, Pause, CheckCircle, Volume2, Mic, Loader2, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ResponsiveCard from "@/components/responsive-card";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AuthenticAudioShowcase from "@/components/authentic-audio-showcase";

interface AudioFile {
  id: string;
  name: string;
  yorubaText: string;
  englishTranslation: string;
  category: 'orisha' | 'odu' | 'spiritual-terms' | 'prayers';
  isAuthentic: boolean;
  audioUrl?: string;
  duration?: number;
}

export default function AudioManagement() {
  const { language, ts } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [divinationAudioLoading, setDivinationAudioLoading] = useState(true);
  const [divinationAudioError, setDivinationAudioError] = useState(false);
  const [newAudio, setNewAudio] = useState({
    name: '',
    yorubaText: '',
    englishTranslation: '',
    category: 'orisha' as AudioFile['category']
  });
  
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Fetch audio library from API
  const { data: audioFiles = [], isLoading } = useQuery({
    queryKey: ['/api/audio/library'],
    queryFn: async () => {
      const response = await fetch('/api/audio/library');
      if (!response.ok) throw new Error('Failed to fetch audio library');
      return response.json();
    }
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type.includes('audio') || file.name.endsWith('.opus'))) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !newAudio.yorubaText || !newAudio.englishTranslation) {
      toast({
        title: ts("Error", "Aṣiṣe"),
        description: ts("Please fill all fields and select an audio file", "Jọ̀wọ́ fi gbogbo aaye kún àti yan fáìlì ohùn"),
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('audioFile', selectedFile);
      formData.append('yorubaText', newAudio.yorubaText);
      formData.append('englishTranslation', newAudio.englishTranslation);
      formData.append('category', newAudio.category);

      const response = await fetch('/api/audio/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();
      
      toast({
        title: ts("Success", "Àṣeyọrí"),
        description: result.message,
        variant: "default"
      });

      // Reset form
      setSelectedFile(null);
      setNewAudio({ name: '', yorubaText: '', englishTranslation: '', category: 'orisha' });
      
      // Refresh audio library
      queryClient.invalidateQueries({ queryKey: ['/api/audio/library'] });
      
      // Reset file input
      const fileInput = document.getElementById('audio-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: ts("Error", "Aṣiṣe"),
        description: error instanceof Error ? error.message : 'Upload failed',
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const playAudio = async (audioFile: AudioFile) => {
    if (isPlaying === audioFile.id) {
      // Stop current audio
      if (audioRefs.current[audioFile.id]) {
        audioRefs.current[audioFile.id].pause();
        setIsPlaying(null);
      }
      return;
    }

    // Stop any currently playing audio
    Object.values(audioRefs.current).forEach(audio => audio.pause());
    setIsPlaying(null);

    if (audioFile.audioUrl) {
      try {
        if (!audioRefs.current[audioFile.id]) {
          audioRefs.current[audioFile.id] = new Audio(audioFile.audioUrl);
          audioRefs.current[audioFile.id].onended = () => setIsPlaying(null);
        }
        
        await audioRefs.current[audioFile.id].play();
        setIsPlaying(audioFile.id);
      } catch (error) {
        console.error('Audio playback failed:', error);
      }
    }
  };

  const getCategoryColor = (category: AudioFile['category']) => {
    switch (category) {
      case 'orisha': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'odu': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'spiritual-terms': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'prayers': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const authenticCount = audioFiles.filter((f: AudioFile) => f.isAuthentic).length;
  const totalCount = audioFiles.length;

  return (
    <div className="container-responsive py-8 spacing-mobile">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-crimson text-responsive-2xl font-bold text-spiritual-blue dark:text-white mb-4">
          🎤 {ts("Authentic Audio Management", "Ìṣàkóso Ohùn Òtítọ́")}
        </h1>
        <p className="text-responsive-base text-gray-600 dark:text-gray-400 text-mobile-optimized max-w-2xl mx-auto">
          {ts(
            "Manage and upload authentic Yoruba pronunciations to enhance the spiritual experience with genuine Nigerian voices.",
            "Ṣàkóso àti gbe ohùn Yorùbá òtítọ́ sókè láti mú ìrírí ẹ̀mí dára sí i pẹ̀lú ohùn àwọn ará Nàìjíríà gidi."
          )}
        </p>
      </div>

      {/* Featured: Sophie Oluwole - Oro Isiti */}
      <Card className="mb-8 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <Volume2 className="h-6 w-6 text-purple-600" />
            <CardTitle className="text-gray-900 dark:text-white">
              🎓 {ts("Featured: Sophie Oluwole - Oro Isiti", "Àkọ́kọ́: Sophie Oluwole - Oro Isiti")}
            </CardTitle>
            <Badge className="bg-purple-600 text-white text-xs">FEATURED</Badge>
          </div>
          <CardDescription className="text-lg">
            {ts(
              "Renowned Nigerian philosopher discussing Yoruba philosophy and indigenous knowledge systems",
              "Ọmọluwabi onímọ̀-ìjìnlẹ̀ Nàìjíríà tó ń sọ̀rọ̀ nípa ìmọ̀-ìjìnlẹ̀ Yorùbá àti ètò ìmọ̀ ìbílẹ̀"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  {ts("Combined Sophie Oluwole - Oro Isiti Discourse", "Ọ̀rọ̀ Sophie Oluwole - Oro Isiti Ti A Da Pọ̀")}
                </h3>
                <p className="text-purple-700 dark:text-purple-200 text-sm mb-3">
                  {ts(
                    "Authentic discourse on Yoruba philosophical traditions and indigenous wisdom systems by Prof. Sophie Oluwole, Nigeria's first female professor of philosophy.",
                    "Ọ̀rọ̀ òtítọ́ nípa àṣà ìmọ̀-ìjìnlẹ̀ Yorùbá àti ètò ọgbọ́n ìbílẹ̀ látọwọ́ Prof. Sophie Oluwole, obìnrin àkọ́kọ́ tó jẹ́ prófésọ̀ ìmọ̀-ìjìnlẹ̀ ní Nàìjíríà."
                  )}
                </p>
                
                <audio 
                  controls 
                  preload="metadata"
                  controlsList="nodownload"
                  className="w-full rounded-lg bg-purple-100 dark:bg-purple-800 border border-purple-300/30 h-12 mb-3"
                  onError={(e) => {
                    const audio = e.currentTarget as HTMLAudioElement;
                    console.error('❌ Sophie Oluwole audio ERROR');
                    console.error('Error code:', audio.error?.code);
                    console.error('Error message:', audio.error?.message);
                    console.error('Network state:', audio.networkState);
                    console.error('Ready state:', audio.readyState);
                    console.error('Audio source:', '/static/audio/sophie_oluwole_oro_isiti_combined.mp3');
                  }}
                  onLoadedMetadata={(e) => {
                    const audio = e.currentTarget as HTMLAudioElement;
                    console.log('✅ Sophie Oluwole audio loaded successfully');
                    console.log('Duration:', audio.duration, 'seconds');
                  }}
                  onCanPlay={() => console.log('🎵 Sophie Oluwole audio can play')}
                  onStalled={() => console.warn('⚠️ Sophie Oluwole audio stalled')}
                  onSuspend={() => console.log('⏸️ Sophie Oluwole audio suspended')}
                  data-testid="audio-sophie-oluwole"
                >
                  <source src="/static/audio/sophie_oluwole_oro_isiti_combined.mp3" type="audio/mpeg" />
                  {ts('Your browser does not support the audio element.', 'Ayẹwo rẹ kò ṣe àtìlẹyìn orin yìí.')}
                </audio>

                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded border border-purple-300/20">
                  <p className="text-xs text-purple-800 dark:text-purple-200">
                    <strong>{ts('Academic Context:', 'Àyíká Ẹ̀kọ́:')}</strong> {ts('Prof. Sophie Oluwole (1935-2018) was a pioneering philosopher who championed indigenous African knowledge systems. Her work on Oro Isiti (philosophy) demonstrates the depth and sophistication of Yoruba intellectual traditions, bridging ancient wisdom with contemporary academic discourse.', 
                      'Prof. Sophie Oluwole (1935-2018) jẹ́ onímọ̀-ìjìnlẹ̀ àkọ́kọ́ tó mú kí ètò ìmọ̀ Áfíríkà ìbílẹ̀ gbé jáde. Iṣẹ́ rẹ̀ lórí Oro Isiti (ìmọ̀-ìjìnlẹ̀) fi hàn bí àṣà ìmọ̀ Yorùbá ṣe jin àti pé ó mọ́gbọ́n, ó sì da ọgbọ́n àtijọ́ pọ̀ mọ́ ìjírọrò ẹ̀kọ́ òde òní.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* YouTube Video Integration */}
      <Card className="mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <Play className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-gray-900 dark:text-white">
              🎥 {ts("Educational Video: Yoruba Spiritual Wisdom", "Fídíò Ẹ̀kọ́: Ọgbọ́n Ẹ̀mí Yorùbá")}
            </CardTitle>
            <Badge className="bg-blue-600 text-white text-xs">VIDEO</Badge>
          </div>
          <CardDescription className="text-lg">
            {ts(
              "Comprehensive video guide exploring Yoruba spiritual traditions and sacred knowledge systems",
              "Itọ́nisọ́nà fídíò tí ó kójọ nípa àṣà ẹ̀mí Yorùbá àti ètò ìmọ̀ mímọ́"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                {ts("Yoruba Spiritual Education Video", "Fídíò Ẹ̀kọ́ Ẹ̀mí Yorùbá")}
              </h3>
              <p className="text-blue-700 dark:text-blue-200 text-sm mb-4">
                {ts(
                  "This educational video provides insights into Yoruba spiritual practices, traditional wisdom, and sacred teachings that complement our audio learning resources.",
                  "Fídíò ẹ̀kọ́ yìí ń fún wa ní òye sí àṣà ẹ̀mí Yorùbá, ọgbọ́n ìbílẹ̀, àti ẹ̀kọ́ mímọ́ tí ó bá àwọn ohun èlò ẹ̀kọ́ ohùn wa mu."
                )}
              </p>
              
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/b4X4BgAh_0Q?enablejsapi=1&origin=https://replit.app"
                  title="Yoruba Spiritual Wisdom"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  style={{
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                  data-testid="video-yoruba-wisdom"
                ></iframe>
              </div>
              
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded border border-blue-300/20 mt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      <strong>{ts('Multimedia Learning:', 'Ẹ̀kọ́ Amóhunmáwòrán:')}</strong> {ts('This video complements our authentic audio collection by providing visual context and deeper understanding of Yoruba spiritual traditions. Use it alongside our audio resources for a comprehensive learning experience.', 
                        'Fídíò yìí ń ṣàfikún sí ìkójọ ohùn òtítọ́ wa nípa fífún wa ní àyíká àwòrán àti òye jíjìn sí àṣà ẹ̀mí Yorùbá. Lo ọ́ pẹ̀lú àwọn ohun èlò ohùn wa fún ìrírí ẹ̀kọ́ tí ó ní ìdámọ̀.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Third YouTube Video Integration */}
      <Card className="mb-8 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <Play className="h-6 w-6 text-teal-600" />
            <CardTitle className="text-gray-900 dark:text-white">
              🎥 {ts("Advanced Yoruba Studies Video", "Fídíò Ẹ̀kọ́ Yorùbá Gíga")}
            </CardTitle>
            <Badge className="bg-teal-600 text-white text-xs">ADVANCED</Badge>
          </div>
          <CardDescription className="text-lg">
            {ts(
              "Deep dive into advanced Yoruba spiritual concepts and traditional knowledge systems",
              "Ìwádi jíjìn sí àwọn èrò ẹ̀mí Yorùbá gíga àti ètò ìmọ̀ ìbílẹ̀"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg border border-teal-200 dark:border-teal-700">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-teal-900 dark:text-teal-100 mb-2">
                {ts("Advanced Yoruba Knowledge Systems", "Ètò Ìmọ̀ Yorùbá Gíga")}
              </h3>
              <p className="text-teal-700 dark:text-teal-200 text-sm mb-4">
                {ts(
                  "This advanced video explores deeper aspects of Yoruba spirituality and traditional knowledge, perfect for those seeking comprehensive understanding of indigenous wisdom systems.",
                  "Fídíò gíga yìí ń ṣàwárí àwọn abala jíjìn ti ẹ̀mí Yorùbá àti ìmọ̀ ìbílẹ̀, ó dára fún àwọn tí ó ń wá òye pípé nípa ètò ọgbọ́n ìbílẹ̀."
                )}
              </p>
              
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/S7RvqBpqcNY?enablejsapi=1&origin=https://replit.app"
                  title="Advanced Yoruba Knowledge Systems"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  style={{
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                  data-testid="video-advanced-yoruba"
                ></iframe>
              </div>
              
              <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded border border-teal-300/20 mt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-teal-100 dark:bg-teal-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-teal-800 dark:text-teal-200">
                      <strong>{ts('Progressive Learning:', 'Ẹ̀kọ́ Ìlọsíwájú:')}</strong> {ts('This video represents the next level in your Yoruba spiritual education journey. Combined with our audio resources and previous videos, it creates a comprehensive multimedia learning path from basic concepts to advanced knowledge systems.', 
                        'Fídíò yìí dúró fún ipele tókàn nínú ìrìn ẹ̀kọ́ ẹ̀mí Yorùbá rẹ. Tí a bá da pọ̀ mọ́ àwọn ohun èlò ohùn wa àti àwọn fídíò tẹ́lẹ̀, ó ń ṣẹ̀dá ọ̀nà ẹ̀kọ́ amóhunmáwòrán tí ó kún láti àwọn èrò ìpilẹ̀ dé ètò ìmọ̀ gíga.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Fourth YouTube Video Integration */}
      <Card className="mb-8 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <Play className="h-6 w-6 text-purple-600" />
            <CardTitle className="text-gray-900 dark:text-white">
              🎥 {ts("Yoruba Spiritual Practices & Traditional Wisdom", "Àwọn Ìṣe Ẹ̀mí Yorùbá àti Ọgbọ́n Ìbílẹ̀")}
            </CardTitle>
            <Badge className="bg-purple-600 text-white text-xs">SPIRITUAL PRACTICES</Badge>
          </div>
          <CardDescription className="text-lg">
            {ts(
              "Explore authentic Yoruba spiritual practices and traditional wisdom systems through this comprehensive educational video",
              "Ṣàwárí àwọn ìṣe ẹ̀mí Yorùbá òtítọ́ àti ètò ọgbọ́n ìbílẹ̀ nípa fídíò ẹ̀kọ́ tí ó ní ìdámọ̀ yìí"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
                {ts("Traditional Spiritual Practices", "Àwọn Ìṣe Ẹ̀mí Ìbílẹ̀")}
              </h3>
              <p className="text-purple-700 dark:text-purple-200 text-sm mb-4">
                {ts(
                  "This video provides an in-depth exploration of traditional Yoruba spiritual practices, offering valuable insights into ancestral wisdom and cultural preservation.",
                  "Fídíò yìí ń pèsè ìwádi jíjìn sí àwọn ìṣe ẹ̀mí Yorùbá ìbílẹ̀, ó ń fún wa ní òye pàtàkì sí ọgbọ́n àwọn baba ńlá àti ìtọ́jú àṣà."
                )}
              </p>
              
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/cYIifliDmS4?enablejsapi=1&origin=https://replit.app"
                  title="Yoruba Spiritual Practices & Traditional Wisdom"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  style={{
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                  data-testid="video-spiritual-practices"
                ></iframe>
              </div>
              
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded border border-purple-300/20 mt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-purple-800 dark:text-purple-200">
                      <strong>{ts('Cultural Preservation:', 'Ìtọ́jú Àṣà:')}</strong> {ts('This video serves as an important resource for understanding and preserving traditional Yoruba spiritual practices. It complements our authentic audio collection by providing comprehensive context about the cultural significance and practical applications of ancient wisdom traditions.', 
                        'Fídíò yìí ń ṣiṣẹ́ gẹ́gẹ́ bí ohun èlò pàtàkì fún òye àti ìtọ́jú àwọn ìṣe ẹ̀mí Yorùbá ìbílẹ̀. Ó ń ṣàfikún sí ìkójọ ohùn òtítọ́ wa nípa fífún wa ní àyíká tí ó ní ìdámọ̀ nípa pàtàkì àṣà àti ìlò gidi ti àwọn ìṣe ọgbọ́n àtijọ́.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fifth YouTube Video Integration */}
      <Card className="mb-8 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <Play className="h-6 w-6 text-rose-600" />
            <CardTitle className="text-gray-900 dark:text-white">
              🎥 {ts("Yoruba Cultural Heritage & Spiritual Wisdom", "Ogún Àṣà Yorùbá àti Ọgbọ́n Ẹ̀mí")}
            </CardTitle>
            <Badge className="bg-rose-600 text-white text-xs">CULTURAL HERITAGE</Badge>
          </div>
          <CardDescription className="text-lg">
            {ts(
              "Discover the rich cultural heritage and profound spiritual wisdom of the Yoruba people through this enlightening documentary",
              "Ṣàwárí ogún àṣà tí ó lọ́rọ̀ àti ọgbọ́n ẹ̀mí jíjìn ti àwọn ọmọ Yorùbá nípa àkọsílẹ̀ tí ó ń fún ni ní ìmọ̀lára yìí"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg border border-rose-200 dark:border-rose-700">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-rose-900 dark:text-rose-100 mb-2">
                {ts("Cultural Heritage & Wisdom Documentary", "Àkọsílẹ̀ Ogún Àṣà àti Ọgbọ́n")}
              </h3>
              <p className="text-rose-700 dark:text-rose-200 text-sm mb-4">
                {ts(
                  "This comprehensive documentary explores the deep cultural foundations and spiritual wisdom that form the cornerstone of Yoruba civilization, offering insights into traditional knowledge systems and cultural continuity.",
                  "Àkọsílẹ̀ tí ó ní ìdámọ̀ yìí ń ṣàwárí àwọn ìpilẹ̀ àṣà jíjìn àti ọgbọ́n ẹ̀mí tí ó jẹ́ òkúta ìpilẹ̀ ọlá Yorùbá, ó ń fún wa ní òye sí àwọn ètò ìmọ̀ ìbílẹ̀ àti ìtẹ̀síwájú àṣà."
                )}
              </p>
              
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/BldVL0wcSv8?enablejsapi=1&origin=https://replit.app"
                  title="Yoruba Cultural Heritage & Spiritual Wisdom"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  style={{
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                  data-testid="video-cultural-heritage"
                ></iframe>
              </div>
              
              <div className="bg-rose-100 dark:bg-rose-900/30 p-3 rounded border border-rose-300/20 mt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-rose-100 dark:bg-rose-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-rose-600 dark:text-rose-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-rose-800 dark:text-rose-200">
                      <strong>{ts('Heritage Documentation:', 'Àkọsílẹ̀ Ogún:')}</strong> {ts('This documentary serves as a comprehensive archive of Yoruba cultural heritage and spiritual wisdom. It provides essential context for understanding the historical foundations that inform our authentic audio collection and traditional spiritual practices featured throughout this platform.', 
                        'Àkọsílẹ̀ yìí ń ṣiṣẹ́ gẹ́gẹ́ bí àkọjọ-ìkówé tí ó ní ìdámọ̀ ti ogún àṣà Yorùbá àti ọgbọ́n ẹ̀mí. Ó ń pèsè àyíká pàtàkì fún òye àwọn ìpilẹ̀ ìtàn tí ó ń kọ́ ìkójọ ohùn òtítọ́ wa àti àwọn ìṣe ẹ̀mí ìbílẹ̀ tí a ṣàfihàn nínú ètò yìí.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sixth YouTube Video Integration */}
      <Card className="mb-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <Play className="h-6 w-6 text-amber-600" />
            <CardTitle className="text-gray-900 dark:text-white">
              🎥 {ts("Advanced Yoruba Philosophy & Ancient Wisdom", "Filosofi Yorùbá Gíga àti Ọgbọ́n Àtijọ́")}
            </CardTitle>
            <Badge className="bg-amber-600 text-white text-xs">PHILOSOPHY</Badge>
          </div>
          <CardDescription className="text-lg">
            {ts(
              "Explore profound philosophical concepts and ancient wisdom teachings from the Yoruba intellectual tradition",
              "Ṣàwárí àwọn èrò ọgbọ́n jíjìn àti ẹ̀kọ́ ọgbọ́n àtijọ́ láti inú àṣà ọgbọ́n Yorùbá"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
                {ts("Philosophical Foundations & Ancient Knowledge", "Ìpilẹ̀ Filosofi àti Ìmọ̀ Àtijọ́")}
              </h3>
              <p className="text-amber-700 dark:text-amber-200 text-sm mb-4">
                {ts(
                  "This enlightening video delves into the sophisticated philosophical systems and ancient knowledge traditions that have guided Yoruba thought for millennia, revealing timeless wisdom for modern understanding.",
                  "Fídíò tí ó ń fún ni ní ìmọ̀lára yìí ń wọlé sí àwọn ètò ọgbọ́n tí ó ní ìmọ̀ràn àti àwọn àṣà ìmọ̀ àtijọ́ tí ó ti ń darí ìrònú Yorùbá fún ẹgbẹ̀rún ọdún, ó ń ṣàfihàn ọgbọ́n àìkú fún òye ode òní."
                )}
              </p>
              
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/5ZLlTmojk1k?enablejsapi=1&origin=https://replit.app"
                  title="Advanced Yoruba Philosophy & Ancient Wisdom"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  style={{
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                  data-testid="video-philosophy"
                ></iframe>
              </div>
              
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded border border-amber-300/20 mt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-amber-800 dark:text-amber-200">
                      <strong>{ts('Ancient Philosophy:', 'Filosofi Àtijọ́:')}</strong> {ts('This video completes our comprehensive educational journey by exploring the deep philosophical foundations underlying all Yoruba spiritual practices. It connects the practical applications in our previous videos with the timeless wisdom that has shaped this ancient civilization for thousands of years.', 
                        'Fídíò yìí ń parí ìrìn ẹ̀kọ́ wa tí ó ní ìdámọ̀ nípa ṣíṣàwárí àwọn ìpilẹ̀ ọgbọ́n jíjìn tí ó wà lábẹ́ gbogbo àwọn ìṣe ẹ̀mí Yorùbá. Ó ń so àwọn ìlò gidi nínú àwọn fídíò wa tẹ́lẹ̀ pọ̀ mọ́ ọgbọ́n àìkú tí ó ti ń ṣe ọlá yìí fún ẹgbẹ̀rún ọdún.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ifá Divination Audio */}
      <Card className="mb-8 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <Volume2 className="h-6 w-6 text-emerald-600" />
            <CardTitle className="text-gray-900 dark:text-white">
              🔮 {ts("Ifá Divination: How Yoruba Priests Speak to the Spirit World", "Ifá Àfọ̀ṣẹ: Bí Àwọn Àlùfáà Yorùbá Ṣe Ń Bá Ayé Ẹ̀mí Sọ̀rọ̀")}
            </CardTitle>
            <Badge className="bg-emerald-600 text-white text-xs">DIVINATION</Badge>
          </div>
          <CardDescription className="text-lg">
            {ts(
              "Authentic audio exploring the sacred art of Ifá divination and the spiritual communication practices of traditional Yoruba priests",
              "Ohùn òtítọ́ tí ó ń ṣàwárí iṣẹ́ mímọ́ àfọ̀ṣẹ Ifá àti àwọn ìṣe ìbánisọ̀rọ̀ ẹ̀mí ti àwọn àlùfáà Yorùbá ìbílẹ̀"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/50 dark:bg-black/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                {ts("Sacred Divination Practices Audio", "Ohùn Àwọn Ìṣe Àfọ̀ṣẹ Mímọ́")}
              </h3>
              <p className="text-emerald-700 dark:text-emerald-200 text-sm mb-4">
                {ts(
                  "This comprehensive audio guide reveals the profound spiritual practices of Ifá divination, exploring how traditional Yoruba priests communicate with the spirit world through sacred rituals and ancient wisdom.",
                  "Itọ́nisọ́nà ohùn tí ó kún yìí ń ṣàfihàn àwọn ìṣe ẹ̀mí jíjìn ti àfọ̀ṣẹ Ifá, ó ń ṣàwárí bí àwọn àlùfáaa Yorùbá ìbílẹ̀ ṣe ń bá ayé ẹ̀mí sọ̀rọ̀ nípa àwọn ìjọ́sìn mímọ́ àti ọgbọ́n àtijọ́."
                )}
              </p>
              
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                {divinationAudioLoading && (
                  <div className="flex items-center gap-2 mb-3 p-2 bg-emerald-50 dark:bg-emerald-950 rounded border border-emerald-300 dark:border-emerald-700">
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                    <span className="text-xs text-emerald-700 dark:text-emerald-300">
                      {ts("Loading 29-minute audio file (41.8 MB)...", "Ń ṣe ifáàyè fáìlì ohùn ìṣẹ́jú 29 (41.8 MB)...")}
                    </span>
                  </div>
                )}
                
                {divinationAudioError && (
                  <div className="mb-3 p-3 bg-red-50 dark:bg-red-950 rounded border border-red-300 dark:border-red-700">
                    <p className="text-xs text-red-700 dark:text-red-300">
                      ❌ {ts("Audio failed to load. Please refresh the page or try again later.", "Àṣìṣe ń ṣe fáìlì ohùn. Jọ̀wọ́ tun ojú-ìwé náà ṣe tàbí gbìyànjú lẹ́ẹ̀kan si.")}
                    </p>
                  </div>
                )}
                
                <audio 
                  controls 
                  className="w-full mb-4"
                  preload="auto"
                  controlsList="nodownload"
                  crossOrigin="anonymous"
                  onLoadStart={() => {
                    console.log('📥 Ifá divination audio started loading');
                    console.log('Current URL:', window.location.href);
                    console.log('Audio src:', '/static/audio/ifa_divination_priests_spirit_world.mp3');
                    setDivinationAudioLoading(true);
                    setDivinationAudioError(false);
                  }}
                  onError={(e) => {
                    const audio = e.currentTarget as HTMLAudioElement;
                    console.error('❌ Ifá divination audio ERROR');
                    console.error('Error code:', audio.error?.code);
                    console.error('Error message:', audio.error?.message);
                    console.error('Error MEDIA_ERR codes:');
                    console.error('  1 = MEDIA_ERR_ABORTED (user aborted)');
                    console.error('  2 = MEDIA_ERR_NETWORK (network error)');
                    console.error('  3 = MEDIA_ERR_DECODE (decode error)');
                    console.error('  4 = MEDIA_ERR_SRC_NOT_SUPPORTED (format not supported)');
                    console.error('Network state:', audio.networkState, '(0=EMPTY, 1=IDLE, 2=LOADING, 3=NO_SOURCE)');
                    console.error('Ready state:', audio.readyState, '(0=NOTHING, 1=METADATA, 2=CURRENT_DATA, 3=FUTURE_DATA, 4=ENOUGH_DATA)');
                    console.error('Audio source:', audio.src);
                    console.error('Current time:', audio.currentTime);
                    setDivinationAudioLoading(false);
                    setDivinationAudioError(true);
                  }}
                  onLoadedMetadata={(e) => {
                    const audio = e.currentTarget as HTMLAudioElement;
                    console.log('✅ Ifá divination audio metadata loaded successfully');
                    console.log('Duration:', audio.duration, 'seconds (', Math.floor(audio.duration / 60), 'min', Math.floor(audio.duration % 60), 'sec)');
                    console.log('Ready state:', audio.readyState);
                    setDivinationAudioLoading(false);
                    setDivinationAudioError(false);
                  }}
                  onCanPlay={() => {
                    console.log('🎵 Ifá divination audio can play now');
                    setDivinationAudioLoading(false);
                  }}
                  onCanPlayThrough={() => {
                    console.log('✅ Ifá divination audio can play through without buffering');
                  }}
                  onProgress={(e) => {
                    const audio = e.currentTarget as HTMLAudioElement;
                    if (audio.buffered.length > 0) {
                      const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
                      const duration = audio.duration;
                      if (duration > 0) {
                        const percentBuffered = (bufferedEnd / duration) * 100;
                        console.log(`📊 Buffered: ${percentBuffered.toFixed(1)}% (${Math.floor(bufferedEnd)}s of ${Math.floor(duration)}s)`);
                      }
                    }
                  }}
                  onStalled={() => console.warn('⚠️ Ifá divination audio stalled - waiting for data')}
                  onSuspend={() => console.log('⏸️ Ifá divination audio suspended - browser stopped downloading')}
                  onWaiting={() => console.log('⏳ Ifá divination audio waiting for data')}
                  data-testid="audio-ifa-divination"
                >
                  <source src="/static/audio/ifa_divination_priests_spirit_world.mp3" type="audio/mpeg" />
                  {ts("Your browser does not support the audio element.", "Awáriiwò rẹ kò ṣàtìlẹ́yìn fún ohun ìgbọ́hùn yìí.")}
                </audio>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mic className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-emerald-800 dark:text-emerald-200">
                      <strong>{ts('Spiritual Communication:', 'Ìbánisọ̀rọ̀ Ẹ̀mí:')}</strong> {ts('This authentic audio provides deep insights into the sacred art of Ifá divination, revealing how traditional priests establish communication with the spirit world through time-honored practices and spiritual protocols.', 
                        'Ohùn òtítọ́ yìí ń fún wa ní òye jíjìn sí iṣẹ́ mímọ́ àfọ̀ṣẹ Ifá, ó ń ṣàfihàn bí àwọn àlùfáà ìbílẹ̀ ṣe ń ṣètò ìbánisọ̀rọ̀ pẹ̀lú ayé ẹ̀mí nípa àwọn ìṣe tí a ti ń ṣe láti ìgbà àtijọ́ àti ìlànà ẹ̀mí.')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-3 rounded border border-emerald-300/30">
                <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                  {ts("Sacred Divination Insights", "Òye Àfọ̀ṣẹ Mímọ́")}
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-200">
                  {ts(
                    "Learn about the intricate spiritual processes, ritual preparations, and sacred protocols that enable traditional Yoruba priests to access divine wisdom and communicate with ancestral spirits through Ifá divination.",
                    "Kọ́ nípa àwọn ìlànà ẹ̀mí tí ó níye lórí, ìmúrasílẹ̀ ìjọ́sìn, àti àwọn ìlànà mímọ́ tí ó jẹ́ kí àwọn àlùfáaa Yorùbá ìbílẹ̀ lè wọlé sí ọgbọ́n Ọ̀run àti bá àwọn ẹ̀mí àwọn baba ńlá sọ̀rọ̀ nípa àfọ̀ṣẹ Ifá."
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <ResponsiveCard animation="fade" className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-responsive-xl font-bold text-emerald-600 dark:text-emerald-400">
                {authenticCount}
              </div>
              <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
                {ts("Authentic", "Òtítọ́")}
              </div>
            </div>
            <div>
              <div className="text-responsive-xl font-bold text-blue-600 dark:text-blue-400">
                {totalCount - authenticCount}
              </div>
              <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
                {ts("Synthetic", "Ìṣẹ̀dá")}
              </div>
            </div>
            <div>
              <div className="text-responsive-xl font-bold text-purple-600 dark:text-purple-400">
                {audioFiles.filter((f: AudioFile) => f.category === 'orisha').length}
              </div>
              <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
                {ts("Orisha", "Òrìṣà")}
              </div>
            </div>
            <div>
              <div className="text-responsive-xl font-bold text-sacred-gold">
                35
              </div>
              <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
                {ts("Total Files", "Àpapọ̀ Fáìlì")}
              </div>
            </div>
          </div>
        </CardContent>
      </ResponsiveCard>

      {/* Upload New Audio */}
      <ResponsiveCard animation="slide" delay={0.2} className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-spiritual-blue dark:text-white">
            <Upload className="h-5 w-5" />
            {ts("Upload New Authentic Audio", "Gbe Ohùn Òtítọ́ Tuntun")}
          </CardTitle>
          <CardDescription>
            {ts(
              "Add authentic Nigerian Yoruba pronunciations to improve cultural accuracy.",
              "Fi ohùn Yorùbá àwọn ará Nàìjíríà òtítọ́ kún un láti mú àṣà gbé jáde."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="yoruba-text">{ts("Yoruba Text", "Ọ̀rọ̀ Yorùbá")}</Label>
              <Input
                id="yoruba-text"
                value={newAudio.yorubaText}
                onChange={(e) => setNewAudio(prev => ({ ...prev, yorubaText: e.target.value }))}
                placeholder={ts("e.g., Ògún", "bí àpẹẹrẹ, Ògún")}
                className="btn-touch"
              />
            </div>
            <div>
              <Label htmlFor="english-translation">{ts("English Translation", "Ìtumọ̀ Gẹ̀ẹ́sì")}</Label>
              <Input
                id="english-translation"
                value={newAudio.englishTranslation}
                onChange={(e) => setNewAudio(prev => ({ ...prev, englishTranslation: e.target.value }))}
                placeholder={ts("e.g., Orisha of Iron", "bí àpẹẹrẹ, Òrìṣà Iron")}
                className="btn-touch"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="audio-file">{ts("Audio File", "Fáìlì Ohùn")} (.opus, .mp3, .wav)</Label>
            <Input
              id="audio-file"
              type="file"
              accept="audio/*,.opus"
              onChange={handleFileSelect}
              className="btn-touch"
            />
          </div>

          <Button 
            onClick={handleUpload}
            className="w-full nav-transition btn-touch bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={!selectedFile || !newAudio.yorubaText || !newAudio.englishTranslation || isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Mic className="h-4 w-4 mr-2" />
            )}
            {isUploading 
              ? ts("Processing...", "Ńṣe...")
              : ts("Process & Integrate Audio", "Ṣe Àti Darapọ̀ Ohùn")
            }
          </Button>
        </CardContent>
      </ResponsiveCard>

      {/* Audio Library */}
      <ResponsiveCard animation="slide" delay={0.4}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-spiritual-blue dark:text-white">
            <Volume2 className="h-5 w-5" />
            {ts("Audio Library", "Ilé-ìkọ́wé Ohùn")}
          </CardTitle>
          <CardDescription>
            {ts(
              "Browse and test existing pronunciation files. Authentic recordings are highlighted.",
              "Wá àti dán àwọn fáìlì sísọ tí ó wà. Àwọn gbígbóhùn òtítọ́ ni a sàmì."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {audioFiles.map((audioFile: AudioFile) => (
              <div
                key={audioFile.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 card-smooth"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-spiritual-blue dark:text-white text-responsive-base">
                      {audioFile.yorubaText}
                    </h3>
                    {audioFile.isAuthentic && (
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        ⭐ {ts("Authentic", "Òtítọ́")}
                      </Badge>
                    )}
                    <Badge className={getCategoryColor(audioFile.category)}>
                      {audioFile.category}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-responsive-sm">
                    {audioFile.englishTranslation}
                  </p>
                  {audioFile.duration && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {ts("Duration", "Ìgbà")}: {audioFile.duration}s
                    </p>
                  )}
                </div>
                
                <Button
                  onClick={() => playAudio(audioFile)}
                  variant="outline"
                  size="sm"
                  className="ml-4 nav-transition btn-touch"
                  disabled={!audioFile.audioUrl}
                >
                  {isPlaying === audioFile.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </ResponsiveCard>

      {/* Authentic Audio Showcase */}
      <AuthenticAudioShowcase />
    </div>
  );
}