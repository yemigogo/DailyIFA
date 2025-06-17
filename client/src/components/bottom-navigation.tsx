import { Button } from "@/components/ui/button";
import { Home, Scroll, Search, Heart } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();
  const { ts } = useLanguage();

  const navigation = [
    { id: "today", label: ts("Today", "Òní"), icon: Home, path: "/" },
    { id: "prayers", label: ts("Prayers", "Ìwúre"), icon: Heart, path: "/prayers" },
    { id: "problems", label: ts("Problems", "Iṣoro"), icon: Search, path: "/problems" },
    { id: "history", label: ts("Timeline", "Àtòkọ́tàn"), icon: Scroll, path: "/history" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-md mx-auto flex justify-around">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;

          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setLocation(item.path)}
              className={`flex flex-col items-center py-2 px-3 ${
                isActive
                  ? "text-spiritual-blue"
                  : "text-gray-400 hover:text-spiritual-blue"
              } transition-colors`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
