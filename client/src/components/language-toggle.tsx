import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "yoruba" : "english");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="p-2 text-spiritual-blue hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-1"
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs font-medium">
        {language === "english" ? "Yorùbá" : "English"}
      </span>
    </Button>
  );
}