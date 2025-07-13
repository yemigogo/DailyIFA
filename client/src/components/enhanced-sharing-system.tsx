import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Share2, Download, Copy, Twitter, Facebook, MessageCircle, Link, QrCode, Heart, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface EnhancedSharingSystemProps {
  spiritualContent?: {
    type: 'odu' | 'frequency' | 'meditation' | 'avatar' | 'cosmic-realm';
    title: string;
    description: string;
    data: any;
  };
  className?: string;
}

interface SharingTemplate {
  id: string;
  name: string;
  nameYoruba: string;
  template: string;
  templateYoruba: string;
  icon: React.ElementType;
  color: string;
}

const SHARING_TEMPLATES: SharingTemplate[] = [
  {
    id: 'daily-wisdom',
    name: 'Daily Wisdom',
    nameYoruba: 'Ọgbọ́n Ojoojúmọ́',
    template: '🌟 Today\'s Ifá wisdom: "{content}" - May this guidance bring clarity to your path. #IfaWisdom #SpiritualGuidance',
    templateYoruba: '🌟 Ọgbọ́n Ifá òní: "{content}" - Kí ìtọ́nisọ́nà yìí mú ìmọ̀ wá sí ọ̀nà rẹ. #OgbonIfa #ItonisonaEmi',
    icon: Star,
    color: '#F59E0B'
  },
  {
    id: 'frequency-healing',
    name: 'Frequency Healing',
    nameYoruba: 'Ìwòsàn Ìgbọ̀nsí',
    template: '🎵 Experiencing healing with {frequency}Hz - {description}. Sacred vibrations for spiritual wellness. #SacredFrequency #Healing',
    templateYoruba: '🎵 Ní ìrírí ìwòsàn pẹ̀lú {frequency}Hz - {description}. Àwọn gbígbọn mímọ́ fún ìlera ẹ̀mí. #IgbonsiMimo #Iwosan',
    icon: Heart,
    color: '#EF4444'
  },
  {
    id: 'meditation-session',
    name: 'Meditation Session',
    nameYoruba: 'Àkókò Ìpamọ́',
    template: '🧘‍♀️ Completed {duration} minutes of ancestral meditation. "Ibá ọ, àwọn baba ńlá wa" - Honoring the wisdom of our ancestors. #Meditation #Ancestors',
    templateYoruba: '🧘‍♀️ Parí ìpamọ́ {duration} ìṣẹ́jú pẹ̀lú àwọn baba. "Ibá ọ, àwọn baba ńlá wa" - Ọ̀wọ̀ fún ọgbọ́n àwọn baba wa. #Ipamo #AwonBaba',
    icon: MessageCircle,
    color: '#3B82F6'
  },
  {
    id: 'cosmic-exploration',
    name: 'Cosmic Exploration',
    nameYoruba: 'Àyẹ̀wò Àgbáyé',
    template: '🌌 Exploring the cosmic realms of Yorùbá spirituality - Òrun (Heaven), Ayé (Earth), and Ilẹ̀-Ọkùn (Ocean Abyss). Ancient wisdom meets modern technology. #CosmicRealms #YorubaSpirituality',
    templateYoruba: '🌌 Àyẹ̀wò àwọn àgbáyé ẹ̀mí Yorùbá - Òrun, Ayé, àti Ilẹ̀-Ọkùn. Ọgbọ́n àtijọ́ pàdé ìmọ̀-ẹ̀rọ òde òní. #AgbayeKosmiki #EmiYoruba',
    icon: Share2,
    color: '#7C3AED'
  }
];

export const EnhancedSharingSystem: React.FC<EnhancedSharingSystemProps> = ({ 
  spiritualContent,
  className = "" 
}) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<SharingTemplate>(SHARING_TEMPLATES[0]);
  const [customMessage, setCustomMessage] = useState('');
  const [shareUrl, setShareUrl] = useState(window.location.href);

  const generateShareContent = (template: SharingTemplate) => {
    let content = language === 'yoruba' ? template.templateYoruba : template.template;
    
    if (spiritualContent) {
      content = content.replace('{content}', spiritualContent.description);
      if (spiritualContent.type === 'frequency') {
        content = content.replace('{frequency}', spiritualContent.data.frequency || '528');
        content = content.replace('{description}', spiritualContent.data.description || 'healing vibration');
      }
      if (spiritualContent.type === 'meditation') {
        content = content.replace('{duration}', spiritualContent.data.duration || '15');
      }
    }
    
    return content;
  };

  const shareToSocial = async (platform: string) => {
    const shareText = customMessage || generateShareContent(selectedTemplate);
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let shareLink = '';
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
      
      toast({
        title: language === 'yoruba' ? 'Pín pẹ̀lú àwọn ẹlòmíràn' : 'Shared Successfully',
        description: `${language === 'yoruba' ? 'Ti pín sí' : 'Shared to'} ${platform}`,
      });
    }
  };

  const copyToClipboard = async () => {
    const shareText = customMessage || generateShareContent(selectedTemplate);
    const fullContent = `${shareText}\n\n${shareUrl}`;
    
    try {
      await navigator.clipboard.writeText(fullContent);
      toast({
        title: language === 'yoruba' ? 'Ti ṣàda sí clipboard' : 'Copied to Clipboard',
        description: language === 'yoruba' ? 'Àkóónú ti wa ní clipboard' : 'Content copied successfully',
      });
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      toast({
        title: language === 'yoruba' ? 'Ti ṣàda' : 'Copied',
        description: language === 'yoruba' ? 'Àkóónú ti wa ní clipboard' : 'Content copied to clipboard',
      });
    }
  };

  const generateQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;
    
    // Create QR code modal or new window
    const qrWindow = window.open('', '_blank', 'width=300,height=350');
    if (qrWindow) {
      qrWindow.document.write(`
        <html>
          <head><title>QR Code</title></head>
          <body style="text-align: center; padding: 20px; font-family: Arial;">
            <h3>${language === 'yoruba' ? 'QR Code láti pín' : 'QR Code to Share'}</h3>
            <img src="${qrUrl}" alt="QR Code" style="border: 1px solid #ccc;" />
            <p style="font-size: 12px; color: #666; margin-top: 10px;">
              ${language === 'yoruba' ? 'Scan pẹ̀lú fóònù rẹ' : 'Scan with your phone'}
            </p>
          </body>
        </html>
      `);
    }
  };

  const downloadContent = () => {
    const shareText = customMessage || generateShareContent(selectedTemplate);
    const content = `${shareText}\n\nShared from: ${shareUrl}\nGenerated: ${new Date().toLocaleString()}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spiritual-share-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: language === 'yoruba' ? 'Ti gba sílẹ̀' : 'Downloaded',
      description: language === 'yoruba' ? 'Faili ti wa ní Downloads' : 'File saved to Downloads',
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-600" />
            {language === 'yoruba' ? 'Ètò Pínpín Gíga' : 'Enhanced Sharing System'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {language === 'yoruba' ? 'Yan Àwòṣe Pínpín' : 'Choose Sharing Template'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {SHARING_TEMPLATES.map((template) => {
                const IconComponent = template.icon;
                return (
                  <Button
                    key={template.id}
                    variant={selectedTemplate.id === template.id ? "default" : "outline"}
                    onClick={() => setSelectedTemplate(template)}
                    className="h-auto p-4 justify-start"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5" style={{ color: template.color }} />
                      <div className="text-left">
                        <div className="font-medium">
                          {language === 'yoruba' ? template.nameYoruba : template.name}
                        </div>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {language === 'yoruba' ? 'Àkọsílẹ̀ Pínpín' : 'Share Preview'}
            </h3>
            <Card className="bg-white/50 dark:bg-black/20">
              <CardContent className="p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {generateShareContent(selectedTemplate)}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Link className="w-3 h-3" />
                  <span>{shareUrl}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Custom Message */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {language === 'yoruba' ? 'Ọ̀rọ̀ Àdání (Optional)' : 'Custom Message (Optional)'}
            </h3>
            <Textarea
              placeholder={language === 'yoruba' 
                ? 'Kọ ọ̀rọ̀ àdání rẹ níbí...' 
                : 'Write your custom message here...'}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Share URL */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {language === 'yoruba' ? 'Link Pínpín' : 'Share URL'}
            </h3>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                onChange={(e) => setShareUrl(e.target.value)}
                placeholder="https://..."
              />
              <Button onClick={copyToClipboard} variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {language === 'yoruba' ? 'Pín sí Àwọn Média' : 'Share to Social Media'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                onClick={() => shareToSocial('twitter')}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button 
                onClick={() => shareToSocial('facebook')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              <Button 
                onClick={() => shareToSocial('whatsapp')}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button 
                onClick={() => shareToSocial('linkedin')}
                className="bg-blue-700 hover:bg-blue-800 text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={generateQRCode} variant="outline" className="flex-1">
              <QrCode className="w-4 h-4 mr-2" />
              {language === 'yoruba' ? 'QR Code' : 'Generate QR'}
            </Button>
            <Button onClick={downloadContent} variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              {language === 'yoruba' ? 'Gba sílẹ̀' : 'Download'}
            </Button>
            <Button onClick={copyToClipboard} variant="outline" className="flex-1">
              <Copy className="w-4 h-4 mr-2" />
              {language === 'yoruba' ? 'Ṣàda' : 'Copy All'}
            </Button>
          </div>

          {/* Instructions */}
          <Card className="bg-teal-50 dark:bg-teal-900/20 border-teal-200">
            <CardContent className="p-4">
              <p className="text-sm text-teal-700 dark:text-teal-300">
                {language === 'yoruba' 
                  ? '💫 Pín ìrírí ẹ̀mí rẹ pẹ̀lú àwọn ẹlòmíràn. Àwọn àwòṣe wa ní àwọn ọ̀rọ̀ àti àwọn hastag tó yẹ fún pípín lórí àwọn média.'
                  : '💫 Share your spiritual experiences with others. Our templates include appropriate language and hashtags for social media sharing.'
                }
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSharingSystem;