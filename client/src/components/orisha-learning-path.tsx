import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  CheckCircle, 
  PlayCircle, 
  Volume2, 
  Award, 
  BookOpen, 
  Clock, 
  Star,
  Trophy,
  Headphones,
  Zap,
  Heart
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { LearningPathWithModules, Achievement } from "@shared/schema";

interface OrishaLearningPathProps {
  userId: string;
}

const availableOrishas = [
  {
    name: "Olókun",
    nameYoruba: "Olókun",
    description: "Ocean deity of wisdom and mysteries",
    descriptionYoruba: "Òrìṣà òkun ọgbọ́n àti àwọn ohun ìjìnlẹ̀",
    color: "blue-500",
    icon: "🌊",
    hasAuthentic: true
  },
  {
    name: "Ọya",
    nameYoruba: "Ọya",
    description: "Wind goddess of transformation",
    descriptionYoruba: "Òrìṣà afẹ́fẹ́ àyípadà",
    color: "gray-500",
    icon: "💨",
    hasAuthentic: true
  },
  {
    name: "Yemọja",
    nameYoruba: "Yemọja",
    description: "Mother of waters and protector",
    descriptionYoruba: "Ìyá omi àti olùdáàbò",
    color: "blue-600",
    icon: "🌊",
    hasAuthentic: true
  },
  {
    name: "Ọ̀ṣun",
    nameYoruba: "Ọ̀ṣun",
    description: "River goddess of love and prosperity",
    descriptionYoruba: "Òrìṣà odò ìfẹ́ àti ọrọ̀",
    color: "amber-500",
    icon: "💛",
    hasAuthentic: true
  },
  {
    name: "Ọbàtálá",
    nameYoruba: "Ọbàtálá",
    description: "Father of creation and wisdom",
    descriptionYoruba: "Baba ìṣẹ̀dá àti ọgbọ́n",
    color: "white",
    icon: "🤍",
    hasAuthentic: true
  }
];

const getBadgeIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Crown, CheckCircle, Volume2, Award, BookOpen, Clock, Star, Trophy, Headphones, Zap, Heart
  };
  return icons[iconName] || Star;
};

export default function OrishaLearningPath({ userId }: OrishaLearningPathProps) {
  const { language, t: ts } = useLanguage();
  const queryClient = useQueryClient();
  const [selectedOrisha, setSelectedOrisha] = useState<string>("");
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  // Fetch user's learning paths
  const { data: learningPaths = [], isLoading: pathsLoading } = useQuery({
    queryKey: [`/api/learning-paths/${userId}`],
    enabled: !!userId
  });

  // Fetch user's achievements
  const { data: achievements = [], isLoading: achievementsLoading } = useQuery({
    queryKey: [`/api/achievements/${userId}`],
    enabled: !!userId
  });

  // Create learning path mutation
  const createPathMutation = useMutation({
    mutationFn: async (orishaName: string) => {
      return apiRequest(`/api/learning-paths`, {
        method: "POST",
        body: {
          userId,
          orishaName,
          currentLevel: "beginner",
          totalProgress: 0,
          preferences: {}
        }
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`/api/learning-paths/${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/achievements/${userId}`] });
      if (data.newAchievements && data.newAchievements.length > 0) {
        setNewAchievements(data.newAchievements);
        setTimeout(() => setNewAchievements([]), 5000);
      }
    }
  });

  const handleStartLearningPath = (orishaName: string) => {
    createPathMutation.mutate(orishaName);
  };

  const getOrishaProgress = (orishaName: string) => {
    const path = learningPaths.find((p: LearningPathWithModules) => p.orishaName === orishaName);
    return path ? path.totalProgress : 0;
  };

  const hasStartedPath = (orishaName: string) => {
    return learningPaths.some((p: LearningPathWithModules) => p.orishaName === orishaName);
  };

  const getCompletedPaths = () => {
    return learningPaths.filter((p: LearningPathWithModules) => p.isCompleted).length;
  };

  const getTotalTimeSpent = () => {
    return learningPaths.reduce((total: number, path: LearningPathWithModules) => {
      return total + (path.userProgress?.reduce((sum: number, progress: any) => sum + (progress.timeSpent || 0), 0) || 0);
    }, 0);
  };

  if (pathsLoading || achievementsLoading) {
    return (
      <div className="container-responsive py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spiritual-blue mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {ts("Loading your learning journey...", "Ń gbé ìrìn àjò ẹ̀kọ́ rẹ wá...")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-8 space-y-8">
      {/* Achievement Notifications */}
      {newAchievements.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {newAchievements.map((achievement) => {
            const IconComponent = getBadgeIcon(achievement.iconName);
            return (
              <Card key={achievement.id} className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 animate-in slide-in-from-right duration-500">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-full ${achievement.isRare ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 'bg-emerald-100 dark:bg-emerald-800'}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-emerald-800 dark:text-emerald-200">
                      {ts("Achievement Unlocked!", "Àṣeyọrí Tuntun!")}
                    </p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      {achievement.badgeName}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-responsive-3xl font-bold text-spiritual-blue dark:text-sacred-gold">
          {ts("Orisha Learning Paths", "Àwọn Ọ̀nà Ẹ̀kọ́ Òrìṣà")}
        </h1>
        <p className="text-responsive-lg text-gray-600 dark:text-gray-400">
          {ts(
            "Embark on personalized journeys to learn about Orisha traditions, earn achievements, and master authentic pronunciations",
            "Bẹ̀rẹ̀ ìrìn àjò ti ara rẹ láti kọ́ nípa àṣà Òrìṣà, gba àwọn àṣeyọrí, kí o sì mọ àwọn ohùn òtítọ́"
          )}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-6 text-center">
            <Crown className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-responsive-2xl font-bold text-blue-700 dark:text-blue-300">
              {learningPaths.length}
            </div>
            <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
              {ts("Paths Started", "Ọ̀nà Tí a Bẹ̀rẹ̀")}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-responsive-2xl font-bold text-emerald-700 dark:text-emerald-300">
              {getCompletedPaths()}
            </div>
            <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
              {ts("Completed", "Tí a Parí")}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <div className="text-responsive-2xl font-bold text-amber-700 dark:text-amber-300">
              {achievements.length}
            </div>
            <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
              {ts("Achievements", "Àwọn Àṣeyọrí")}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-responsive-2xl font-bold text-purple-700 dark:text-purple-300">
              {Math.round(getTotalTimeSpent() / 60)}m
            </div>
            <div className="text-responsive-sm text-gray-600 dark:text-gray-400">
              {ts("Time Spent", "Àkókò Tí a Ná")}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="paths" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="paths">{ts("Learning Paths", "Àwọn Ọ̀nà Ẹ̀kọ́")}</TabsTrigger>
          <TabsTrigger value="achievements">{ts("Achievements", "Àwọn Àṣeyọrí")}</TabsTrigger>
        </TabsList>

        <TabsContent value="paths" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableOrishas.map((orisha) => {
              const progress = getOrishaProgress(orisha.name);
              const started = hasStartedPath(orisha.name);
              
              return (
                <Card key={orisha.name} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{orisha.icon}</div>
                        <div>
                          <CardTitle className="text-responsive-lg">
                            {language === 'yoruba' ? orisha.nameYoruba : orisha.name}
                          </CardTitle>
                          {orisha.hasAuthentic && (
                            <Badge className="mt-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                              ⭐ {ts("Authentic Audio", "Ohùn Òtítọ́")}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {started && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-spiritual-blue dark:text-sacred-gold">
                            {progress}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {ts("Complete", "Parí")}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-responsive-sm text-gray-600 dark:text-gray-400">
                      {language === 'yoruba' ? orisha.descriptionYoruba : orisha.description}
                    </p>
                    
                    {started && (
                      <Progress value={progress} className="w-full" />
                    )}
                    
                    <Button
                      onClick={() => handleStartLearningPath(orisha.name)}
                      disabled={createPathMutation.isPending}
                      className="w-full btn-touch"
                      variant={started ? "outline" : "default"}
                    >
                      {started ? (
                        <>
                          <PlayCircle className="h-4 w-4 mr-2" />
                          {ts("Continue Learning", "Tẹ̀síwájú Ẹ̀kọ́")}
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-4 w-4 mr-2" />
                          {ts("Start Path", "Bẹ̀rẹ̀ Ọ̀nà")}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {achievements.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-responsive-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  {ts("No achievements yet", "Kò sí àṣeyọrí kan síbẹ̀")}
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  {ts("Start learning to earn your first achievement!", "Bẹ̀rẹ̀ ẹ̀kọ́ láti gba àṣeyọrí àkọ́kọ́ rẹ!")}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const IconComponent = getBadgeIcon(achievement.iconName);
                return (
                  <Card key={achievement.id} className={`${achievement.isRare ? 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`mx-auto mb-4 p-3 rounded-full ${achievement.isRare ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 'bg-emerald-100 dark:bg-emerald-800'}`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-responsive-lg mb-2">
                        {achievement.badgeName}
                      </h3>
                      <p className="text-responsive-sm text-gray-600 dark:text-gray-400 mb-3">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {achievement.category}
                        </Badge>
                        {achievement.isRare && (
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs">
                            {ts("Rare", "Tó Ṣòro")}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}