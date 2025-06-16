import { createContext, useContext, useState, useEffect } from "react";

type Language = "english" | "yoruba";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (englishText: string, yorubaText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("ifa-language");
    return (saved as Language) || "english";
  });

  useEffect(() => {
    localStorage.setItem("ifa-language", language);
  }, [language]);

  const t = (englishText: string, yorubaText: string): string => {
    return language === "yoruba" ? yorubaText : englishText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}