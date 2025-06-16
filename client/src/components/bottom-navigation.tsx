import { Button } from "@/components/ui/button";
import { Home, Clock, Book, Settings } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const navigation = [
    { id: "today", label: "Today", icon: Home, path: "/" },
    { id: "history", label: "History", icon: Clock, path: "/history" },
    { id: "learn", label: "Learn", icon: Book, path: "/learn" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
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
