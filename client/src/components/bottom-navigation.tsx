import { Button } from "@/components/ui/button";
import { Home, Scroll, Search, Heart, ScrollText, BookOpen, User, Mic } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();
  const { ts } = useLanguage();

  const navigation = [
    { id: "today", label: ts("Home", "Ilé"), icon: Home, path: "/" },
    { id: "prayers", label: ts("Prayers", "Ìwúre"), icon: Heart, path: "/prayers" },
    { id: "history", label: ts("History", "Ìtàn"), icon: Scroll, path: "/history" },
    { id: "learn", label: ts("Learn", "Kọ́"), icon: BookOpen, path: "/learn" },
    { id: "oriki", label: ts("Oríkì", "Oríkì"), icon: ScrollText, path: "/oriki" },
    { id: "audio", label: ts("Audio", "Ohùn"), icon: Mic, path: "/audio" },
    { id: "profile", label: ts("Profile", "Àkọsílẹ̀"), icon: User, path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 px-2 py-2 z-50 shadow-lg">
      <div className="container-responsive">
        <div className="flex justify-around items-center">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;

            return (
              <button
                key={item.id}
                onClick={() => setLocation(item.path)}
                className={`flex flex-col items-center py-2 px-2 rounded-xl nav-transition btn-touch ${
                  isActive
                    ? "text-spiritual-blue bg-spiritual-blue/15 scale-105"
                    : "text-gray-500 hover:text-spiritual-blue hover:bg-spiritual-blue/10 dark:text-gray-400 dark:hover:text-spiritual-blue"
                }`}
                aria-label={item.label}
              >
                <Icon className={`h-5 w-5 mb-1 transition-all duration-200 ${isActive ? 'scale-110' : ''}`} />
                <span className={`text-xs font-medium transition-all duration-200 ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
