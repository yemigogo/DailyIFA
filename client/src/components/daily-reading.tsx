import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Share, Eye, Star, Leaf, Volume2 } from "lucide-react";
import { DailyReadingWithOdu } from "@shared/schema";
import OduTraditionalImage from "./odu-traditional-image";
import SimpleAudioPlayer from "./simple-audio-player";
// import { AutoLinkText } from "./encyclopedia/auto-link-text";


import HerbsMaterials from "./herbs-materials";
import AffirmationGenerator from "./affirmation-generator";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import { useLanguage } from "@/contexts/LanguageContext";
import InteractiveYorubaText from "./interactive-yoruba-text";

interface DailyReadingProps {
  reading: DailyReadingWithOdu;
}

export default function DailyReading({ reading }: DailyReadingProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t, ts } = useLanguage();

  // Get the same Odu card number used in home page
  const getOduCardNumber = (): number => {
    if (!reading?.odu) return 1;
    
    // Map Odu names to their correct card numbers based on actual card content
    const oduNameToCardMap: Record<string, number> = {
      // Major Odu (1-16)
      'Eji Ogbe': 1, 'Oyeku Meji': 2, 'Iwori Meji': 3, 'Idi Meji': 4,
      'Irosun Meji': 5, 'Owonrin Meji': 6, 'Obara Meji': 7, 'Okanran Meji': 8,
      'Ogunda Meji': 9, 'Osa Meji': 10, 'Ika Meji': 11, 'Oturupon Meji': 12,
      'Otura Meji': 13, 'Irete Meji': 14, 'Ose Meji': 15, 'Ofun Meji': 16,
      
      // Combined Odu - map names to cards that actually contain those names
      'Iwori Odi': 75,  // Found at 075_IWORI_ODI.png
      'Odi Irosun': 101, // Found at 101_ODI_IROSUN.png  
      'Irosun Owonrin': 70, // Found at 070_Irosun_Owonrin.png
      'Owonrin Obara': 87,  // Found at 087_Owonrin_Obara.png
      'Obara Okanran': 167, // Found at 167_OBARA_OKANRAN.png
      'Okanran Ogunda': 185, // Found at 185_OKANRAN_OGUNDA.png
      'Ogunda Osa': 201, // Found at 201_OGUNDA_OSA.png  
      'Osa Ika': 215, // Found at 215_OSA_IKA.png
      
      // Alternative spellings
      'Odi Iwori': 75
    };

    // Check if we have a specific mapping for this Odu name
    if (oduNameToCardMap[reading.odu.name]) {
      const cardNumber = oduNameToCardMap[reading.odu.name];
      console.log(`Daily Reading - Date: ${reading.date}, Odu: "${reading.odu.name}" -> Mapped to card ${cardNumber}`);
      return cardNumber;
    }
    
    // Fallback: use Odu ID if no specific mapping found
    const cardNumber = reading.odu.id;
    console.log(`Daily Reading - Date: ${reading.date}, Odu: "${reading.odu.name}" (ID: ${reading.odu.id}) -> Using ID as card: ${cardNumber}`);
    
    // Ensure card number is within valid range
    if (cardNumber && cardNumber >= 1 && cardNumber <= 256) {
      return cardNumber;
    }
    
    // Final fallback
    console.log(`Invalid card number ${cardNumber}, using default card 1`);
    return 1;
  };

  const currentOduCard = getOduCardNumber();

  // Fetch audio data for the Odu
  const { data: audioData } = useQuery({
    queryKey: [`/api/odu/${reading.odu.id}/audio`],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const saveReadingMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/readings/${reading.date}/save`);
    },
    onSuccess: () => {
      toast({
        title: ts("Reading Saved", "Kika Ti Pamọ"),
        description: ts("This reading has been saved to your collection.", "A ti fi kika yii pamọ si akojọ rẹ."),
      });
      queryClient.invalidateQueries({ queryKey: ["/api/readings"] });
    },
    onError: () => {
      toast({
        title: ts("Error", "Aṣiṣe"),
        description: ts("Failed to save reading. Please try again.", "Ko le pamọ kika. Jọwọ gbiyanju lẹẹkansi."),
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    saveReadingMutation.mutate();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Ifá Daily - ${reading.odu.name}`,
          text: reading.odu.message,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          `${reading.odu.name}: ${reading.odu.message}`
        );
        toast({
          title: ts("Copied to Clipboard", "Ti daakọ si Clipboard"),
          description: ts("Reading has been copied to your clipboard.", "A ti daakọ kika si clipboard rẹ."),
        });
      }
    } catch (error) {
      toast({
        title: ts("Error", "Aṣiṣe"),
        description: ts("Failed to share reading.", "Ko le pin kika."),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-sacred-gold/10">
        {/* Reading Header */}
        <div className="bg-gradient-to-r from-spiritual-blue to-spiritual-blue/90 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-geometric-pattern opacity-20"></div>
          <div className="relative z-10">
            <h2 className="font-crimson text-2xl font-bold mb-2">
              {t(reading.odu.name, reading.odu.nameYoruba)}
            </h2>
            <p className="text-blue-100 text-sm">{t(reading.odu.subtitle, reading.odu.subtitleYoruba)}</p>
            <div className="mt-4 flex items-center space-x-4 text-sm">
              <span className="flex items-center space-x-1">
                <Eye className="h-4 w-4 text-sacred-gold" />
                <span>{t(reading.odu.element, reading.odu.elementYoruba)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-sacred-gold" />
                <span>{t(reading.odu.energy, reading.odu.energyYoruba)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Sacred Symbols */}
        <CardContent className="p-6 bg-gradient-to-b from-cream/30 to-white">
          <div className="text-center mb-6">
            <h3 className="font-crimson text-lg font-semibold text-spiritual-blue mb-3">
              {t("Sacred Odu Ifa", "Odù Ifá Mímọ́")}
            </h3>
            <div className="flex justify-center mb-4">
              <div className="relative w-36 h-48 rounded-xl overflow-hidden shadow-lg bg-black/5 border-2 border-sacred-gold/30">
                <img
                  src={`/static/odu_cards/odu_card_${currentOduCard}.png?t=${Date.now()}`}
                  alt={`Authentic Odu Ifá Card: ${reading.odu.name}`}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
                  onError={(e) => {
                    console.error(`Failed to load authentic Odu card: odu_card_${currentOduCard}.png`);
                  }}
                  onLoad={() => {
                    console.log(`Successfully loaded authentic Odu card in daily reading: odu_card_${currentOduCard}.png for "${reading.odu.name}"`);
                  }}
                />
                {/* Overlay with card number */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-semibold">
                  {currentOduCard}/256
                </div>
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                {t("Today's guiding Odu:", "Odù tí ń ṣe ìtọ́nisọ́nà òní:")} <span className="font-bold">{reading.odu.name}</span>
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                {t(reading.odu.subtitle, reading.odu.subtitleYoruba)}
              </p>
            </div>
          </div>

          {/* Reading Content */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-4 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-crimson font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                <Star className="h-4 w-4" />
                {t("Ese Ifa (Sacred Verse)", "Ese Ifá (Ọ̀rọ̀ Mímọ́)")}
              </h4>
              <p className="text-amber-800 dark:text-amber-200 text-sm italic leading-relaxed font-medium">
                "{t(reading.odu.eseIfa, reading.odu.eseIfaYoruba) as string}"
              </p>
            </div>

            <div>
              <h4 className="font-crimson font-semibold text-spiritual-blue mb-2">
                {t("Today's Message", "Ọ̀rọ̀ Òní")}
              </h4>
              <p className="text-gray-700 leading-relaxed font-crimson text-base">
                {t(reading.odu.message, reading.odu.messageYoruba) as string}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-crimson font-semibold text-spiritual-blue mb-2">
                {t("Guidance for Today", "Ìtọ́sọ́nà fún Òní")}
              </h4>
              <ul className="space-y-2 text-gray-700">
                {(t(reading.odu.guidance, reading.odu.guidanceYoruba) as string[]).map((guidance, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Leaf className="h-4 w-4 text-sage-green mt-1 flex-shrink-0" />
                    <span>{guidance}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-crimson font-semibold text-spiritual-blue mb-2">
                {t("Reflection", "Ìrònú")}
              </h4>
              <p className="text-gray-600 text-sm italic">
                "{t(reading.odu.reflection, reading.odu.reflectionYoruba) as string}"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio Pronunciation */}
      {audioData && (
        <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <h4 className="text-emerald-800 dark:text-emerald-200 font-semibold mb-2">
            Audio Pronunciation
          </h4>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                const audio = new Audio(`/api/odu/${reading.odu.id}/audio`);
                audio.volume = 0.9;
                audio.playbackRate = 0.9;
                audio.play();
              }}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              🔊 Play {reading.odu.nameYoruba}
            </button>
            <span className="text-sm text-emerald-600 dark:text-emerald-400">
              Authentic African pronunciation
            </span>
          </div>
        </div>
      )}

      {/* Audio Player */}
      <SimpleAudioPlayer 
        oduName={reading.odu.name} 
        oduId={reading.odu.id} 
      />

      {/* Traditional Herbs & Materials */}
      <HerbsMaterials oduId={reading.odu.id} oduName={reading.odu.name} />



      {/* Personal Affirmation Generator */}
      <AffirmationGenerator currentOdu={reading.odu} />



      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={handleSave}
          disabled={reading.saved || saveReadingMutation.isPending}
          className="bg-sage-green text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-sage-green/90 transition-colors"
        >
          <Bookmark className="h-4 w-4" />
          <span>{reading.saved ? t("Saved", "Ti pamọ") : t("Save Reading", "Pamọ Kika")}</span>
        </Button>
        <Button
          onClick={handleShare}
          className="bg-spiritual-blue text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-spiritual-blue/90 transition-colors"
        >
          <Share className="h-4 w-4" />
          <span>{t("Share", "Pín")}</span>
        </Button>
      </div>
    </div>
  );
}
