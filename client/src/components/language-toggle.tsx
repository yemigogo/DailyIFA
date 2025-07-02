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
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="px-3 py-2 bg-white dark:bg-gray-800 text-spiritual-blue dark:text-white border-spiritual-blue/30 hover:bg-spiritual-blue hover:text-white dark:hover:bg-spiritual-blue dark:hover:text-white rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {language === "english" ? "Yorùbá" : "English"}
      </span>
    </Button>
  );
}