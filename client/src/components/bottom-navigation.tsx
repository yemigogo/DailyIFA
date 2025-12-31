import { Home, Heart, ScrollText, User, GraduationCap, LogIn } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/use-auth";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();
  const { ts } = useLanguage();
  const { isAuthenticated } = useAuth();

  const navigation = [
    { id: "today", label: ts("Home", "Ilé"), icon: Home, path: "/" },
    { id: "prayers", label: ts("Prayers", "Ìwúre"), icon: Heart, path: "/prayers" },
    { id: "learning", label: ts("Learning", "Ẹ̀kọ́"), icon: GraduationCap, path: "/learning" },
    { id: "oriki", label: ts("Oríkì", "Oríkì"), icon: ScrollText, path: "/oriki" },
    { id: "profile", label: isAuthenticated ? ts("Profile", "Ìwé") : ts("Login", "Wọlé"), icon: isAuthenticated ? User : LogIn, path: isAuthenticated ? "/profile" : "/api/login", isExternal: !isAuthenticated },
  ];

  const handleNavClick = (item: typeof navigation[0]) => {
    if (item.isExternal) {
      window.location.href = item.path;
    } else {
      setLocation(item.path);
    }
  };

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
                data-testid={`nav-${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick(item);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "8px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: isActive ? "#e0f2fe" : "transparent",
                  color: isActive ? "#0ea5e9" : "#6b7280",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: isActive ? "600" : "400"
                }}
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
