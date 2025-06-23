import { Button } from "@/components/ui/button";
import { Home, Scroll, Search, Heart, ScrollText, BookOpen, User } from "lucide-react";
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
    { id: "search", label: ts("Search", "Wá"), icon: Search, path: "/search" },
    { id: "oriki", label: ts("Oríkì", "Oríkì"), icon: ScrollText, path: "/oriki" },
    { id: "profile", label: ts("Profile", "Àkọsílẹ̀"), icon: User, path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="max-w-full mx-auto flex justify-around">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;

          return (
            <button
              key={item.id}
              onClick={() => setLocation(item.path)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg ${
                isActive
                  ? "text-spiritual-blue bg-spiritual-blue/10"
                  : "text-gray-400 hover:text-spiritual-blue hover:bg-spiritual-blue/5"
              } transition-colors`}
            >
              <Icon className="h-4 w-4 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
