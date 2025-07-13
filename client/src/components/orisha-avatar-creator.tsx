import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Download, Share2, RefreshCw, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface OrishaData {
  name: string;
  nameYoruba: string;
  element: string;
  elementYoruba: string;
  color: string;
  symbol: string;
  domain: string;
  domainYoruba: string;
  guidance: string;
  guidanceYoruba: string;
}

const ORISHA_DATABASE: OrishaData[] = [
  {
    name: "Ṣàngó",
    nameYoruba: "Ṣàngó",
    element: "Fire & Thunder",
    elementYoruba: "Iná àti Àrá",
    color: "#DC2626",
    symbol: "⚡",
    domain: "Justice, Power, Passion",
    domainYoruba: "Ìdájọ́, Agbára, Ìfẹ́kúfẹ́",
    guidance: "Channel your inner fire with wisdom and justice",
    guidanceYoruba: "Fi ọgbọ́n àti òdodo ṣàkóso iná inú rẹ"
  },
  {
    name: "Ọ̀ṣun",
    nameYoruba: "Ọ̀ṣun",
    element: "Fresh Water",
    elementYoruba: "Omi Tútù",
    color: "#F59E0B",
    symbol: "🌊",
    domain: "Love, Beauty, Fertility",
    domainYoruba: "Ìfẹ́, Ẹwà, Ọlọ́mo",
    guidance: "Flow like water - gentle yet powerful, nurturing yet strong",
    guidanceYoruba: "Ṣàn bí omi - pẹ̀lẹ́ síbẹ̀ lágbára, tọ́jú síbẹ̀ lágbára"
  },
  {
    name: "Ògún",
    nameYoruba: "Ògún",
    element: "Iron & Work",
    elementYoruba: "Irin àti Iṣẹ́",
    color: "#059669",
    symbol: "⚔️",
    domain: "Technology, War, Labor",
    domainYoruba: "Ìmọ̀-ẹ̀rọ, Ogun, Iṣẹ́",
    guidance: "Forge your path with determination and skill",
    guidanceYoruba: "Fi ìpinnu àti ọgbọ́n gbẹ ọ̀nà rẹ"
  },
  {
    name: "Yemọja",
    nameYoruba: "Yemọja",
    element: "Ocean Waters",
    elementYoruba: "Omi Òkun",
    color: "#2563EB",
    symbol: "🌊",
    domain: "Motherhood, Protection, Healing",
    domainYoruba: "Ìyá, Ààbò, Ìwòsàn",
    guidance: "Embrace the nurturing depths of maternal wisdom",
    guidanceYoruba: "Gbà ìjìnlẹ̀ ọgbọ́n ìyá tí ó ń tọ́jú"
  },
  {
    name: "Ọbàtálá",
    nameYoruba: "Ọbàtálá",
    element: "White Light",
    elementYoruba: "Ìmọ́lẹ̀ Funfun",
    color: "#FFFFFF",
    symbol: "☁️",
    domain: "Wisdom, Peace, Creativity",
    domainYoruba: "Ọgbọ́n, Àlàáfíà, Ìṣẹ̀dá",
    guidance: "Seek clarity and peace in all your endeavors",
    guidanceYoruba: "Wá àlàáfíà àti ìmọ̀ nínú gbogbo ohun tí o ṣe"
  },
  {
    name: "Ọ̀rúnmìlà",
    nameYoruba: "Ọ̀rúnmìlà",
    element: "Divine Wisdom",
    elementYoruba: "Ọgbọ́n Ọlọ́run",
    color: "#F59E0B",
    symbol: "📿",
    domain: "Divination, Destiny, Knowledge",
    domainYoruba: "Fífá, Àyànmọ̀, Ìmọ̀",
    guidance: "Your destiny unfolds through wisdom and patience",
    guidanceYoruba: "Àyànmọ̀ rẹ ń ṣí nípasẹ̀ ọgbọ́n àti sùúrù"
  },
  {
    name: "Ọya",
    nameYoruba: "Ọya",
    element: "Wind & Storm",
    elementYoruba: "Afẹ́fẹ́ àti Ìjì",
    color: "#7C3AED",
    symbol: "🌪️",
    domain: "Change, Transformation, Courage",
    domainYoruba: "Ìyípadà, Àtúnṣe, Ìgboyà",
    guidance: "Embrace change as the wind of transformation",
    guidanceYoruba: "Gbà ìyípadà gẹ́gẹ́ bí afẹ́fẹ́ àtúnṣe"
  },
  {
    name: "Olókun",
    nameYoruba: "Olókun",
    element: "Deep Ocean",
    elementYoruba: "Òkun Jíjìn",
    color: "#1E40AF",
    symbol: "🐚",
    domain: "Wealth, Wisdom, Mystery",
    domainYoruba: "Ọrọ̀, Ọgbọ́n, Àṣírí",
    guidance: "Dive deep into the mysteries of existence",
    guidanceYoruba: "Rì jinlẹ̀ sínú àṣírí ìwàláàyè"
  }
];

export const OrishaAvatarCreator: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedOrisha, setSelectedOrisha] = useState<OrishaData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [avatarCreated, setAvatarCreated] = useState(false);

  const generateSpiritualAssessment = () => {
    // Spiritual assessment questions (simplified for demo)
    const assessmentQuestions = [
      {
        question: language === 'yoruba' ? 'Kí ni ó mú ọkàn rẹ balẹ̀?' : 'What brings peace to your heart?',
        answers: ['nature', 'creativity', 'helping others', 'learning']
      },
      {
        question: language === 'yoruba' ? 'Irú agbára wo ni ó fẹ́ mú?' : 'What type of energy do you want to cultivate?',
        answers: ['passionate', 'nurturing', 'protective', 'wise']
      }
    ];

    // Simple algorithm to match with Orisha
    const elements = ['fire', 'water', 'earth', 'air'];
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    
    let matchedOrisha: OrishaData;
    
    switch (randomElement) {
      case 'fire':
        matchedOrisha = ORISHA_DATABASE.find(o => o.name === 'Ṣàngó') || ORISHA_DATABASE[0];
        break;
      case 'water':
        matchedOrisha = ORISHA_DATABASE.find(o => o.name === 'Ọ̀ṣun') || ORISHA_DATABASE[1];
        break;
      case 'earth':
        matchedOrisha = ORISHA_DATABASE.find(o => o.name === 'Ọbàtálá') || ORISHA_DATABASE[4];
        break;
      default:
        matchedOrisha = ORISHA_DATABASE.find(o => o.name === 'Ọya') || ORISHA_DATABASE[6];
    }
    
    setSelectedOrisha(matchedOrisha);
    return matchedOrisha;
  };

  const createAvatarImage = (orisha: OrishaData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    // Create gradient background
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
    gradient.addColorStop(0, orisha.color + '40');
    gradient.addColorStop(1, orisha.color + '10');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);

    // Add sacred geometry pattern
    ctx.strokeStyle = orisha.color;
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const x1 = 200 + Math.cos(angle) * 150;
      const y1 = 200 + Math.sin(angle) * 150;
      const x2 = 200 + Math.cos(angle) * 100;
      const y2 = 200 + Math.sin(angle) * 100;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Add central circle
    ctx.beginPath();
    ctx.arc(200, 200, 80, 0, Math.PI * 2);
    ctx.fillStyle = orisha.color + '80';
    ctx.fill();
    ctx.strokeStyle = orisha.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Add Orisha symbol
    ctx.font = '48px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(orisha.symbol, 200, 220);

    // Add Orisha name
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = orisha.color;
    ctx.fillText(orisha.name, 200, 280);

    // Add element
    ctx.font = '16px Arial';
    ctx.fillStyle = '#666666';
    ctx.fillText(language === 'yoruba' ? orisha.elementYoruba : orisha.element, 200, 305);

    // Add domain
    ctx.font = '14px Arial';
    ctx.fillText(language === 'yoruba' ? orisha.domainYoruba : orisha.domain, 200, 330);

    // Add timestamp
    ctx.font = '12px Arial';
    ctx.fillStyle = '#999999';
    ctx.fillText(`Generated: ${new Date().toLocaleDateString()}`, 200, 380);
  };

  const generateAvatar = async () => {
    setIsGenerating(true);
    
    // Simulate spiritual assessment
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const orisha = generateSpiritualAssessment();
    createAvatarImage(orisha);
    setAvatarCreated(true);
    setIsGenerating(false);

    toast({
      title: language === 'yoruba' ? 'Àfigbà ti ṣẹ̀dá!' : 'Avatar Created!',
      description: `${language === 'yoruba' ? 'Òrìṣà rẹ:' : 'Your guiding Orisha:'} ${orisha.name}`,
    });
  };

  const downloadAvatar = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `orisha-avatar-${selectedOrisha?.name}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: language === 'yoruba' ? 'Ti gba sílẹ̀' : 'Downloaded',
      description: language === 'yoruba' ? 'Àfigbà ti wa ní Downloads' : 'Avatar saved to Downloads',
    });
  };

  const shareAvatar = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedOrisha) return;

    try {
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const shareText = `🌟 My spiritual guide is ${selectedOrisha.name} (${selectedOrisha.element})!\n\n"${language === 'yoruba' ? selectedOrisha.guidanceYoruba : selectedOrisha.guidance}"\n\n✨ Discover your Orisha guide at: ${window.location.href}`;

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'avatar.png', { type: 'image/png' })] })) {
          await navigator.share({
            title: `My Orisha Guide: ${selectedOrisha.name}`,
            text: shareText,
            files: [new File([blob], 'avatar.png', { type: 'image/png' })]
          });
        } else {
          // Fallback: copy text to clipboard
          await navigator.clipboard.writeText(shareText);
          toast({
            title: language === 'yoruba' ? 'Ti ṣàda sí clipboard' : 'Copied to Clipboard',
            description: language === 'yoruba' ? 'Pín ọ̀rọ̀ náà láti ra àwòrán' : 'Share text copied. Download image separately',
          });
        }
      }, 'image/png');
    } catch (error) {
      console.error('Sharing failed:', error);
      toast({
        title: language === 'yoruba' ? 'Àṣìṣe pípín' : 'Sharing Failed',
        description: language === 'yoruba' ? 'Gba àfigbà sílẹ̀ kí o sì pín pẹ̀lú ọwọ́' : 'Please download and share manually',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            {language === 'yoruba' ? 'Ẹ̀dá Àfigbà Òrìṣà' : 'Orisha Avatar Creator'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Introduction */}
          <Card className="bg-white/50 dark:bg-black/20">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'yoruba' 
                  ? 'Ṣẹ̀dá àfigbà òrìṣà tí ó dá lórí ìmọ̀ ẹ̀mí rẹ. Ètò wa máa béèrè àwọn ìbéèrè kékeré láti rí òrìṣà tí ó bá ẹ̀mí rẹ mu.'
                  : 'Create a personalized Orisha avatar based on your spiritual essence. Our system will ask brief questions to match you with your guiding Orisha.'
                }
              </p>
            </CardContent>
          </Card>

          {/* Avatar Generation */}
          {!avatarCreated ? (
            <div className="text-center space-y-4">
              <div className="mb-6">
                <User className="w-24 h-24 mx-auto text-purple-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'yoruba' ? 'Ṣètàn láti ṣẹ̀dá àfigbà rẹ?' : 'Ready to discover your spiritual guide?'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {language === 'yoruba' 
                    ? 'Tẹ bọ́tín náà láti bẹ̀rẹ̀ ìrìn àjò ẹ̀mí rẹ'
                    : 'Click the button below to begin your spiritual journey'
                  }
                </p>
              </div>
              
              <Button 
                onClick={generateAvatar}
                disabled={isGenerating}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    {language === 'yoruba' ? 'Ó ń ṣẹ̀dá...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    {language === 'yoruba' ? 'Ṣẹ̀dá Àfigbà Mi' : 'Create My Avatar'}
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Avatar Display */}
              <div className="text-center">
                <canvas
                  ref={canvasRef}
                  className="mx-auto border-2 border-purple-200 rounded-lg shadow-lg"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>

              {/* Orisha Information */}
              {selectedOrisha && (
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl font-bold" style={{ color: selectedOrisha.color }}>
                        {selectedOrisha.name}
                      </h3>
                      <div className="flex justify-center gap-2 flex-wrap">
                        <Badge style={{ backgroundColor: selectedOrisha.color + '20', color: selectedOrisha.color }}>
                          {language === 'yoruba' ? selectedOrisha.elementYoruba : selectedOrisha.element}
                        </Badge>
                        <Badge variant="outline">
                          {language === 'yoruba' ? selectedOrisha.domainYoruba : selectedOrisha.domain}
                        </Badge>
                      </div>
                      <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                        "{language === 'yoruba' ? selectedOrisha.guidanceYoruba : selectedOrisha.guidance}"
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center flex-wrap">
                <Button onClick={downloadAvatar} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'yoruba' ? 'Gba Sílẹ̀' : 'Download'}
                </Button>
                <Button onClick={shareAvatar} variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  {language === 'yoruba' ? 'Pín' : 'Share'}
                </Button>
                <Button onClick={() => { setAvatarCreated(false); setSelectedOrisha(null); }} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {language === 'yoruba' ? 'Tún Ṣe' : 'Create New'}
                </Button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200">
            <CardContent className="p-4">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                {language === 'yoruba' 
                  ? '✨ Àfigbà rẹ ṣe àfihàn òrìṣà tí ó bá ẹ̀mí rẹ mu. Pín pẹ̀lú àwọn ẹlòmíràn láti jẹ́ kí wọ́n mọ ìtọ́nisọ́nà ẹ̀mí rẹ!'
                  : '✨ Your avatar represents the Orisha that resonates with your spiritual essence. Share it with others to spread your spiritual guidance!'
                }
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrishaAvatarCreator;