import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';
import ejiOgbeImage from '@assets/Screenshot_20250710_123846_Instagram_1752166024343.jpg';
import oyekuMejiImage from '@assets/Screenshot_20250710_123808_Instagram_1752166865820.jpg';
import idiMejiImage from '@assets/Screenshot_20250710_123729_Instagram_1752167034304.jpg';
import irosunMejiImage from '@assets/Screenshot_20250710_123701_Instagram_1752167178403.jpg';
import owonrinMejiImage from '@assets/Screenshot_20250710_123637_Instagram_1752167413566.jpg';
import obaraMejiImage from '@assets/Screenshot_20250710_123617_Instagram_1752167558117.jpg';
import iworiMejiImage from '@assets/Screenshot_20250710_121156_Instagram_1752167900326.jpg';
import okanranMejiImage from '@assets/Screenshot_20250710_123552_Instagram_1752168011070.jpg';
import ogundaMejiImage from '@assets/Screenshot_20250710_123529_Instagram (1)_1752168226467.jpg';
import osaMejiImage from '@assets/Screenshot_20250710_123502_Instagram_1752168440315.jpg';
import ikaMejiImage from '@assets/image_1752169327055.png';
import oturuponMejiImage from '@assets/image_1752169509053.png';
import oturaMejiImage from '@assets/image_1752169961583.png';

interface OduPattern {
  name: string;
  nameYoruba: string;
  pattern: boolean[]; // true = broken line, false = solid line
  meaning: string;
  meaningYoruba: string;
  image?: string;
}

const OduVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { language, ts } = useLanguage();
  const [selectedOdu, setSelectedOdu] = useState<string>('eji-ogbe');

  // 16 Major Odu patterns
  const majorOdu: Record<string, OduPattern> = {
    'eji-ogbe': {
      name: 'Eji Ogbe',
      nameYoruba: 'Èjì Ogbè',
      pattern: [false, false, false, false],
      meaning: 'Light, wisdom, divine authority',
      meaningYoruba: 'Ìmọ́lẹ̀, ọgbọ́n, àṣẹ òrìṣà',
      image: ejiOgbeImage
    },
    'oyeku-meji': {
      name: 'Oyeku Meji',
      nameYoruba: 'Òyẹ̀kú Méjì',
      pattern: [true, true, true, true],
      meaning: 'Darkness, mystery, hidden knowledge',
      meaningYoruba: 'Òkùnkùn, àwọn ohun ìjìnlẹ̀, ìmọ̀ ìkọ̀kọ̀',
      image: oyekuMejiImage
    },
    'iwori-meji': {
      name: 'Iwori Meji',
      nameYoruba: 'Ìwòrì Méjì',
      pattern: [true, false, true, false],
      meaning: 'Character, spiritual development',
      meaningYoruba: 'Ìwà, ìdàgbàsókè ẹ̀mí',
      image: iworiMejiImage
    },
    'odi-meji': {
      name: 'Idi Meji',
      nameYoruba: 'Ìdí Méjì',
      pattern: [false, true, false, true],
      meaning: 'Foundation, stability, obstacles overcome',
      meaningYoruba: 'Ìpìlẹ̀, ìdúróṣinṣin, àwọn ìdènà tí a bori',
      image: idiMejiImage
    },
    'irosun-meji': {
      name: 'Irosun Meji',
      nameYoruba: 'Ìrosùn Méjì',
      pattern: [true, true, false, false],
      meaning: 'Healing, medicine, restoration',
      meaningYoruba: 'Ìwòsàn, oògùn, ìmúpadàbọ̀sípò',
      image: irosunMejiImage
    },
    'owonrin-meji': {
      name: 'Owonrin Meji',
      nameYoruba: 'Òwónrín Méjì',
      pattern: [false, false, true, true],
      meaning: 'Chaos, transformation, change',
      meaningYoruba: 'Rúdurùdu, ìyípadà, àtúnṣe',
      image: owonrinMejiImage
    },
    'obara-meji': {
      name: 'Obara Meji',
      nameYoruba: 'Òbàrà Méjì',
      pattern: [true, false, false, true],
      meaning: 'Passion, emotion, relationships',
      meaningYoruba: 'Ìfẹ́kúfẹ́, ìmọ̀lára, àjọṣe',
      image: obaraMejiImage
    },
    'okanran-meji': {
      name: 'Okanran Meji',
      nameYoruba: 'Òkànràn Méjì',
      pattern: [false, true, true, false],
      meaning: 'Protection, defense, boundaries',
      meaningYoruba: 'Ààbò, ìgbéjà, àlà',
      image: okanranMejiImage
    },
    'ogunda-meji': {
      name: 'Ogunda Meji',
      nameYoruba: 'Ògúndá Méjì',
      pattern: [false, false, false, true],
      meaning: 'Warrior spirit, strength, courage',
      meaningYoruba: 'Ẹ̀mí jagunjagun, agbára, ìgboyà',
      image: ogundaMejiImage
    },
    'osa-meji': {
      name: 'Osa Meji',
      nameYoruba: 'Òsá Méjì',
      pattern: [true, false, false, false],
      meaning: 'Intuition, spiritual insight, divination',
      meaningYoruba: 'Ìmọ̀ràn, ìmọ̀ ẹ̀mí, ìfá',
      image: osaMejiImage
    },
    'ika-meji': {
      name: 'Ika Meji',
      nameYoruba: 'Ìká Méjì',
      pattern: [true, true, false, true],
      meaning: 'Transformation, cunning, strategy',
      meaningYoruba: 'Ìyípadà, àrékérekè, ìlànà',
      image: ikaMejiImage
    },
    'oturupon-meji': {
      name: 'Oturupon Meji',
      nameYoruba: 'Òtúrúpọ̀n Méjì',
      pattern: [true, true, false, false],
      meaning: 'Patience, endurance, spiritual growth',
      meaningYoruba: 'Sùúrù, ìfaradà, ìdàgbàsókè ẹ̀mí',
      image: oturuponMejiImage
    },
    'otura-meji': {
      name: 'Otura Meji',
      nameYoruba: 'Òtúrá Méjì',
      pattern: [false, true, false, false],
      meaning: 'Hidden mysteries, spiritual revelation',
      meaningYoruba: 'Àwọn àṣírí tí a fi pamọ́, ìfihàn ẹ̀mí',
      image: oturaMejiImage
    }
  };

  const drawOduPattern = (pattern: boolean[], oduName: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing style
    ctx.strokeStyle = '#8B4513'; // Brown color for traditional look
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    // Canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Drawing parameters
    const lineHeight = 80;
    const lineSpacing = 60;
    const startX = (canvasWidth - (3 * lineSpacing)) / 2;
    const centerY = canvasHeight / 2;

    // Draw title
    ctx.fillStyle = '#4A5568';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(oduName, canvasWidth / 2, 40);

    // Draw pattern
    pattern.forEach((broken, index) => {
      const x = startX + (index * lineSpacing);
      
      if (broken) {
        // Draw broken line (two segments with gap)
        // Left line of pair
        ctx.beginPath();
        ctx.moveTo(x - 5, centerY - lineHeight/2);
        ctx.lineTo(x - 5, centerY - lineHeight/6);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x - 5, centerY + lineHeight/6);
        ctx.lineTo(x - 5, centerY + lineHeight/2);
        ctx.stroke();
        
        // Right line of pair
        ctx.beginPath();
        ctx.moveTo(x + 5, centerY - lineHeight/2);
        ctx.lineTo(x + 5, centerY - lineHeight/6);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x + 5, centerY + lineHeight/6);
        ctx.lineTo(x + 5, centerY + lineHeight/2);
        ctx.stroke();
      } else {
        // Draw solid line
        // Left line of pair
        ctx.beginPath();
        ctx.moveTo(x - 5, centerY - lineHeight/2);
        ctx.lineTo(x - 5, centerY + lineHeight/2);
        ctx.stroke();
        
        // Right line of pair
        ctx.beginPath();
        ctx.moveTo(x + 5, centerY - lineHeight/2);
        ctx.lineTo(x + 5, centerY + lineHeight/2);
        ctx.stroke();
      }
    });

    // Draw meaning below
    const selectedOduData = majorOdu[selectedOdu];
    if (selectedOduData) {
      ctx.fillStyle = '#718096';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      const meaning = language === 'yoruba' ? selectedOduData.meaningYoruba : selectedOduData.meaning;
      ctx.fillText(meaning, canvasWidth / 2, canvasHeight - 20);
    }
  };

  useEffect(() => {
    const selectedOduData = majorOdu[selectedOdu];
    if (selectedOduData) {
      const displayName = language === 'yoruba' ? selectedOduData.nameYoruba : selectedOduData.name;
      drawOduPattern(selectedOduData.pattern, displayName);
    }
  }, [selectedOdu, language]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-spiritual-blue dark:text-sacred-gold">
          {ts("Odu Ifá Visualization", "Àwòrán Odù Ifá")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {ts("Select Odu to Visualize", "Yan Odù tí o fẹ́ wò")}
          </label>
          <Select value={selectedOdu} onValueChange={setSelectedOdu}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(majorOdu).map(([key, odu]) => (
                <SelectItem key={key} value={key}>
                  {language === 'yoruba' ? odu.nameYoruba : odu.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Canvas Visualization */}
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold text-spiritual-blue dark:text-sacred-gold">
              {ts("Pattern Visualization", "Àwòrán Àpẹẹrẹ")}
            </h3>
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            />
          </div>

          {/* Authentic Image */}
          {majorOdu[selectedOdu]?.image && (
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-lg font-semibold text-spiritual-blue dark:text-sacred-gold">
                {ts("Traditional Representation", "Àpẹẹrẹ Àtijọ́")}
              </h3>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <img 
                  src={majorOdu[selectedOdu].image} 
                  alt={`${majorOdu[selectedOdu].name} traditional pattern`}
                  className="max-w-full h-auto max-h-80 object-contain"
                />
              </div>
            </div>
          )}
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {ts("Traditional Ifá divination symbols", "Àwọn àmì fífá Ifá àtijọ́")}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {ts("Solid lines represent Yang energy, broken lines represent Yin energy", 
                "Àwọn ìlà kíkọ́ jẹ́ agbára Yang, àwọn ìlà pínyà jẹ́ agbára Yin")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OduVisualization;