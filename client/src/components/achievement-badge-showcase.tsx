import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Crown, 
  Star, 
  Trophy, 
  Award, 
  Zap, 
  Heart, 
  CheckCircle, 
  BookOpen, 
  Volume2,
  Sparkles,
  Target,
  Gem
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Achievement } from "@shared/schema";

interface AchievementBadgeShowcaseProps {
  achievements: Achievement[];
  onBadgeClick?: (achievement: Achievement) => void;
}

const getBadgeIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Crown, Star, Trophy, Award, Zap, Heart, CheckCircle, BookOpen, Volume2, Sparkles, Target, Gem
  };
  return icons[iconName] || Star;
};

const getBadgeColor = (category: string, isRare: boolean) => {
  if (isRare) {
    return "from-amber-400 via-yellow-500 to-amber-600"; // Golden for rare
  }
  
  switch (category) {
    case "pronunciation": return "from-blue-400 via-blue-500 to-blue-600";
    case "learning": return "from-emerald-400 via-emerald-500 to-emerald-600";
    case "practice": return "from-purple-400 via-purple-500 to-purple-600";
    case "spiritual": return "from-indigo-400 via-indigo-500 to-indigo-600";
    default: return "from-gray-400 via-gray-500 to-gray-600";
  }
};

export default function AchievementBadgeShowcase({ achievements, onBadgeClick }: AchievementBadgeShowcaseProps) {
  const { language, t } = useLanguage();
  const [animatingBadges, setAnimatingBadges] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Animate new achievements
    achievements.forEach((achievement, index) => {
      const isNew = new Date(achievement.earnedAt).getTime() > Date.now() - 10000; // Last 10 seconds
      if (isNew) {
        setTimeout(() => {
          setAnimatingBadges(prev => new Set(prev.add(achievement.id)));
          setTimeout(() => {
            setAnimatingBadges(prev => {
              const newSet = new Set(prev);
              newSet.delete(achievement.id);
              return newSet;
            });
          }, 2000);
        }, index * 200);
      }
    });
  }, [achievements]);

  const categorizedAchievements = achievements.reduce((acc, achievement) => {
    const category = achievement.category || "general";
    if (!acc[category]) acc[category] = [];
    acc[category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  const rareAchievements = achievements.filter(a => a.isRare);
  const totalAchievements = achievements.length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-spiritual-blue">{totalAchievements}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t("Total Badges", "Àpapọ̀ Àmì")}
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-amber-500">{rareAchievements.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t("Rare Badges", "Àmì Pàtàkì")}
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-emerald-500">
              {Object.keys(categorizedAchievements).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t("Categories", "Àwọn Ẹ̀ka")}
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-500">
              {Math.round((totalAchievements / 15) * 100)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t("Progress", "Ìlọsíwájú")}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rare Achievements Showcase */}
      {rareAchievements.length > 0 && (
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-amber-700 dark:text-amber-300">
              <Crown className="h-5 w-5" />
              <span>{t("Rare Achievements", "Àwọn Àṣeyọrí Pàtàkì")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {rareAchievements.map((achievement) => {
                const IconComponent = getBadgeIcon(achievement.iconName);
                const isAnimating = animatingBadges.has(achievement.id);
                
                return (
                  <Button
                    key={achievement.id}
                    variant="ghost"
                    className={`h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-all duration-300 ${
                      isAnimating ? 'animate-bounce scale-110' : ''
                    }`}
                    onClick={() => onBadgeClick?.(achievement)}
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getBadgeColor(achievement.category, achievement.isRare)} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{achievement.badgeName}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(achievement.earnedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Achievements by Category */}
      <div className="space-y-4">
        {Object.entries(categorizedAchievements).map(([category, categoryAchievements]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-spiritual-blue" />
                <span>
                  {t(
                    category.charAt(0).toUpperCase() + category.slice(1),
                    category === "pronunciation" ? "Ìpè" :
                    category === "learning" ? "Ẹ̀kọ́" :
                    category === "practice" ? "Àdásẹ" :
                    category === "spiritual" ? "Ẹ̀mí" : "Gbogbogbòò"
                  )}
                </span>
                <Badge variant="secondary">{categoryAchievements.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {categoryAchievements.map((achievement) => {
                  const IconComponent = getBadgeIcon(achievement.iconName);
                  const isAnimating = animatingBadges.has(achievement.id);
                  
                  return (
                    <Button
                      key={achievement.id}
                      variant="ghost"
                      className={`h-auto p-3 flex flex-col items-center space-y-2 hover:scale-105 transition-all duration-200 ${
                        isAnimating ? 'animate-pulse scale-110' : ''
                      }`}
                      onClick={() => onBadgeClick?.(achievement)}
                    >
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getBadgeColor(achievement.category, achievement.isRare)} flex items-center justify-center shadow-md`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium">{achievement.badgeName}</div>
                        <div className="text-xs text-gray-500">
                          {achievement.progress}%
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievement Progress Indicator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-spiritual-blue" />
            <span>{t("Next Achievements", "Àwọn Àṣeyọrí Tókàn")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <Volume2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium">
                    {t("Voice of Tradition", "Ohùn Àṣà")}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {t("Complete 10 pronunciation modules", "Parí àwọn ẹ̀ka ìpè mẹ́wàá")}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">7/10</div>
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}