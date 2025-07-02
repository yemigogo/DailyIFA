import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  User, 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  BookOpen, 
  Volume2, 
  Brain,
  Calendar,
  Star,
  Zap,
  ChevronRight,
  PlayCircle,
  CheckCircle
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import AchievementBadgeShowcase from "./achievement-badge-showcase";
import type { LearningPathWithModules, Achievement, LearningPath } from "@shared/schema";

interface PersonalizedLearningDashboardProps {
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
    hasAuthentic: true,
    difficulty: "intermediate"
  },
  {
    name: "Ọya",
    nameYoruba: "Ọya",
    description: "Wind goddess of transformation",
    descriptionYoruba: "Òrìṣà afẹ́fẹ́ àyípadà",
    color: "gray-500",
    icon: "💨",
    hasAuthentic: true,
    difficulty: "advanced"
  },
  {
    name: "Yemọja",
    nameYoruba: "Yemọja",
    description: "Motherly waters and fertility",
    descriptionYoruba: "Ọmọ omi àti ìbísí",
    color: "blue-600",
    icon: "💙",
    hasAuthentic: true,
    difficulty: "beginner"
  },
  {
    name: "Ọ̀ṣun",
    nameYoruba: "Ọ̀ṣun",
    description: "River goddess of love and abundance",
    descriptionYoruba: "Òrìṣà odò ìfẹ́ àti ọ̀pọ̀lọpọ̀",
    color: "yellow-500",
    icon: "💛",
    hasAuthentic: true,
    difficulty: "beginner"
  },
  {
    name: "Ọbàtálá",
    nameYoruba: "Ọbàtálá",
    description: "Father of creation and wisdom",
    descriptionYoruba: "Baba ìṣẹ̀dá àti ọgbọ́n",
    color: "white",
    icon: "🤍",
    hasAuthentic: true,
    difficulty: "advanced"
  }
];

export default function PersonalizedLearningDashboard({ userId }: PersonalizedLearningDashboardProps) {
  const { language, t } = useLanguage();
  const queryClient = useQueryClient();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showNewBadgeDialog, setShowNewBadgeDialog] = useState(false);
  const [newBadges, setNewBadges] = useState<Achievement[]>([]);

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
      const response = await apiRequest(`/api/learning-paths`, {
        method: "POST",
        body: {
          userId,
          orishaName,
          currentLevel: "beginner",
          totalProgress: 0,
          preferences: {}
        }
      });
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`/api/learning-paths/${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/achievements/${userId}`] });
      
      if (data.newAchievements && data.newAchievements.length > 0) {
        setNewBadges(data.newAchievements);
        setShowNewBadgeDialog(true);
      }
    }
  });

  // Calculate user statistics
  const totalModulesCompleted = learningPaths.reduce((acc: number, path: any) => {
    return acc + (path.modules?.filter((m: any) => m.isCompleted).length || 0);
  }, 0);

  const totalTimeSpent = learningPaths.reduce((acc: number, path: any) => {
    return acc + (path.modules?.reduce((moduleAcc: number, m: any) => {
      return moduleAcc + (m.timeSpent || 0);
    }, 0) || 0);
  }, 0);

  const averageScore = learningPaths.length > 0 ? 
    learningPaths.reduce((acc: number, path: any) => acc + (path.totalProgress || 0), 0) / learningPaths.length : 0;

  const activePaths = learningPaths.filter((path: any) => !path.isCompleted);
  const completedPaths = learningPaths.filter((path: any) => path.isCompleted);

  // Get recommended next steps
  const getPersonalizedRecommendations = () => {
    if (learningPaths.length === 0) {
      return [
        { 
          title: t("Start Your Journey", "Bẹ̀rẹ̀ Ìrìn Àjò Rẹ"),
          description: t("Begin with Yemọja - perfect for beginners", "Bẹ̀rẹ̀ pẹ̀lú Yemọja - dára fún àwọn tuntun"),
          action: "start_yemoja",
          icon: "💙",
          priority: "high"
        }
      ];
    }

    const recommendations = [];
    
    // Check for incomplete paths
    activePaths.forEach((path: any) => {
      if (path.totalProgress < 50) {
        recommendations.push({
          title: t(`Continue ${path.orishaName}`, `Tẹ̀síwájú ${path.orishaName}`),
          description: t(`${path.totalProgress}% complete`, `${path.totalProgress}% parí`),
          action: `continue_${path.orishaName.toLowerCase()}`,
          icon: availableOrishas.find(o => o.name === path.orishaName)?.icon || "⭐",
          priority: "medium"
        });
      }
    });

    // Suggest new paths based on completed ones
    if (completedPaths.length > 0 && activePaths.length < 3) {
      const unstarted = availableOrishas.filter(orisha => 
        !learningPaths.some((path: any) => path.orishaName === orisha.name)
      );
      
      if (unstarted.length > 0) {
        const next = unstarted[0];
        recommendations.push({
          title: t(`Explore ${next.name}`, `Ṣawárí ${next.name}`),
          description: t(next.description, next.descriptionYoruba),
          action: `start_${next.name.toLowerCase()}`,
          icon: next.icon,
          priority: "low"
        });
      }
    }

    return recommendations;
  };

  const recommendations = getPersonalizedRecommendations();

  const handleStartPath = (orishaName: string) => {
    createPathMutation.mutate(orishaName);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "text-green-600 bg-green-100";
      case "intermediate": return "text-yellow-600 bg-yellow-100";
      case "advanced": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  if (pathsLoading || achievementsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spiritual-blue mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {t("Loading your learning journey...", "Ń gbé ìrìn àjò ẹ̀kọ́ rẹ wá...")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="container mx-auto max-w-7xl space-y-8">
        
        {/* Header with User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-spiritual-blue to-sacred-gold rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-spiritual-blue dark:text-sacred-gold">
                      {t("Your Learning Journey", "Ìrìn Àjò Ẹ̀kọ́ Rẹ")}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t(`${learningPaths.length} active paths • ${achievements.length} badges earned`, 
                         `Àwọn ọ̀nà ${learningPaths.length} tó ń lọ • Àmì ${achievements.length} tí a gba`)}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="hidden md:block">
                  {t(`Level ${Math.floor(averageScore / 20) + 1}`, `Ipele ${Math.floor(averageScore / 20) + 1}`)}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Quick Stats */}
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-600 mb-1">{Math.round(averageScore)}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t("Avg Progress", "Ìlọsíwájú Àpapọ̀")}
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 mb-1">{Math.round(totalTimeSpent / 60)}h</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t("Time Spent", "Àkókò Lò")}
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600 mb-1">{totalModulesCompleted}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t("Modules Done", "Àwọn Ẹ̀ka Parí")}
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Award className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-600 mb-1">{achievements.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t("Badges", "Àwọn Àmì")}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="paths" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="paths" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>{t("Learning Paths", "Àwọn Ọ̀nà Ẹ̀kọ́")}</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>{t("Achievements", "Àwọn Àṣeyọrí")}</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>{t("Recommendations", "Àwọn Ìmọ̀ràn")}</span>
            </TabsTrigger>
          </TabsList>

          {/* Learning Paths Tab */}
          <TabsContent value="paths" className="space-y-6">
            {learningPaths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningPaths.map((path: any) => {
                  const orisha = availableOrishas.find(o => o.name === path.orishaName);
                  const completedModules = path.modules?.filter((m: any) => m.isCompleted).length || 0;
                  const totalModules = path.modules?.length || 4;
                  
                  return (
                    <Card key={path.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{orisha?.icon}</div>
                            <div>
                              <CardTitle className="text-lg">{path.orishaName}</CardTitle>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {language === "english" ? orisha?.description : orisha?.descriptionYoruba}
                              </p>
                            </div>
                          </div>
                          {path.isCompleted && (
                            <Badge className="bg-emerald-500 text-white">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {t("Complete", "Parí")}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>{t("Progress", "Ìlọsíwájú")}</span>
                              <span>{path.totalProgress}%</span>
                            </div>
                            <Progress value={path.totalProgress} className="h-2" />
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span>{t(`${completedModules}/${totalModules} modules`, `Àwọn ẹ̀ka ${completedModules}/${totalModules}`)}</span>
                            <Badge className={getDifficultyColor(orisha?.difficulty || "beginner")}>
                              {t(orisha?.difficulty || "beginner", 
                                 orisha?.difficulty === "beginner" ? "tuntun" :
                                 orisha?.difficulty === "intermediate" ? "àárín" : "gíga")}
                            </Badge>
                          </div>
                          
                          <Button className="w-full" variant={path.isCompleted ? "outline" : "default"}>
                            <PlayCircle className="h-4 w-4 mr-2" />
                            {t(path.isCompleted ? "Review" : "Continue", path.isCompleted ? "Àtúnyẹ̀wò" : "Tẹ̀síwájú")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {t("Start Your Learning Journey", "Bẹ̀rẹ̀ Ìrìn Àjò Ẹ̀kọ́ Rẹ")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t("Choose an Orisha to begin your personalized learning path", 
                       "Yan Òrìṣà kan láti bẹ̀rẹ̀ ọ̀nà ẹ̀kọ́ ti ara rẹ")}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {availableOrishas.map((orisha) => (
                      <Button
                        key={orisha.name}
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center space-y-2"
                        onClick={() => handleStartPath(orisha.name)}
                        disabled={createPathMutation.isPending}
                      >
                        <div className="text-2xl">{orisha.icon}</div>
                        <div className="text-center">
                          <div className="font-medium">{orisha.name}</div>
                          <div className="text-xs text-gray-500">
                            {t(orisha.difficulty, 
                               orisha.difficulty === "beginner" ? "tuntun" :
                               orisha.difficulty === "intermediate" ? "àárín" : "gíga")}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <AchievementBadgeShowcase 
              achievements={achievements} 
              onBadgeClick={setSelectedAchievement}
            />
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-spiritual-blue" />
                  <span>{t("Personalized Recommendations", "Àwọn Ìmọ̀ràn Ti Ara Rẹ")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{rec.icon}</div>
                        <div>
                          <h4 className="font-medium">{rec.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          rec.priority === "high" ? "default" :
                          rec.priority === "medium" ? "secondary" : "outline"
                        }>
                          {t(rec.priority, rec.priority === "high" ? "kókó" : rec.priority === "medium" ? "àárín" : "kékeré")}
                        </Badge>
                        <Button size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Achievement Details Dialog */}
        <Dialog open={!!selectedAchievement} onOpenChange={() => setSelectedAchievement(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-amber-500" />
                <span>{selectedAchievement?.badgeName}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>{selectedAchievement?.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span>{t("Earned on", "Gbà ní")}</span>
                <span>{selectedAchievement?.earnedAt ? new Date(selectedAchievement.earnedAt).toLocaleDateString() : ""}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>{t("Category", "Ẹ̀ka")}</span>
                <Badge>{selectedAchievement?.category}</Badge>
              </div>
              {selectedAchievement?.isRare && (
                <Badge className="bg-amber-500 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  {t("Rare Achievement", "Àṣeyọrí Pàtàkì")}
                </Badge>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* New Badge Celebration Dialog */}
        <Dialog open={showNewBadgeDialog} onOpenChange={setShowNewBadgeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                {t("New Achievement Unlocked!", "Àṣeyọrí Tuntun Ṣí!")}
              </DialogTitle>
            </DialogHeader>
            <div className="text-center space-y-4">
              {newBadges.map((badge) => (
                <div key={badge.id} className="space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{badge.badgeName}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{badge.description}</p>
                </div>
              ))}
              <Button onClick={() => setShowNewBadgeDialog(false)} className="w-full">
                {t("Awesome!", "Ó dára!")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}