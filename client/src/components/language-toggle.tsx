import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "yoruba" : "english");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-2 bg-spiritual-blue text-white border border-spiritual-blue hover:bg-spiritual-blue/80 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md text-sm font-medium"
    >
      🌍
      <span>
        {language === "english" ? "Yorùbá" : "English"}
      </span>
    </button>
  );
}