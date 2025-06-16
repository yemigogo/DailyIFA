import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Share, Eye, Star, Leaf } from "lucide-react";
import { DailyReadingWithOdu } from "@shared/schema";
import OduPattern from "./odu-pattern";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/contexts/LanguageContext";

interface DailyReadingProps {
  reading: DailyReadingWithOdu;
}

export default function DailyReading({ reading }: DailyReadingProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  const saveReadingMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/readings/${reading.date}/save`);
    },
    onSuccess: () => {
      toast({
        title: "Reading Saved",
        description: "This reading has been saved to your collection.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/readings"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save reading. Please try again.",
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
          title: "Copied to Clipboard",
          description: "Reading has been copied to your clipboard.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share reading.",
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
              {t("Sacred Pattern", "Àwòrán Mímọ́")}
            </h3>
            <OduPattern pattern={reading.odu.pattern} />
          </div>

          {/* Reading Content */}
          <div className="space-y-4">
            <div>
              <h4 className="font-crimson font-semibold text-spiritual-blue mb-2">
                {t("Today's Message", "Ọ̀rọ̀ Òní")}
              </h4>
              <p className="text-gray-700 leading-relaxed font-crimson text-base">
                {t(reading.odu.message, reading.odu.messageYoruba)}
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
                "{t(reading.odu.reflection, reading.odu.reflectionYoruba)}"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
