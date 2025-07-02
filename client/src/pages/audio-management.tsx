import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Play, Pause, CheckCircle, Volume2, Mic, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ResponsiveCard from "@/components/responsive-card";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

  const authenticCount = audioFiles.filter(f => f.isAuthentic).length;
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
                {audioFiles.filter(f => f.category === 'orisha').length}
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
            className="w-full nav-transition btn-touch bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={!selectedFile || !newAudio.yorubaText || !newAudio.englishTranslation}
          >
            <Mic className="h-4 w-4 mr-2" />
            {ts("Process & Integrate Audio", "Ṣe Àti Darapọ̀ Ohùn")}
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
            {audioFiles.map((audioFile) => (
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
    </div>
  );
}