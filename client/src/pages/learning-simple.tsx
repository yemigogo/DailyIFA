import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import LearningMascot, { type MascotPersonality } from "@/components/learning-mascot";
import PersonalizedLearningDashboard from "@/components/personalized-learning-dashboard";
import AchievementBadgeShowcase from "@/components/achievement-badge-showcase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Star, Target, Trophy, BookOpen, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LearningStats {
  totalProgress: number;
  completedLessons: number;
  totalLessons: number;
  currentStreak: number;
  recentAchievements: string[];
  activeOrisha: string;
  nextMilestone: string;
}

function LearningSimple() {
  const { ts } = useLanguage();
  const [currentMascotPersonality, setCurrentMascotPersonality] = useState<MascotPersonality | null>(null);
  const [currentTopic, setCurrentTopic] = useState("Ifá Wisdom");
  const [recentAchievement, setRecentAchievement] = useState<string | null>(null);
  
  // Mock learning stats - In real app, this would come from API
  const [learningStats, setLearningStats] = useState<LearningStats>({
    totalProgress: 65,
    completedLessons: 13,
    totalLessons: 20,
    currentStreak: 7,
    recentAchievements: ["Spiritual Seeker", "Voice of Tradition"],
    activeOrisha: "Olókun",
    nextMilestone: "Complete 15 lessons"
  });

  // Get user achievements
  const { data: achievements } = useQuery({
    queryKey: ["/api/learning/achievements"],
    retry: false,
  });

  // Simulate achievement notifications
  useEffect(() => {
    if (learningStats.recentAchievements.length > 0) {
      setRecentAchievement(learningStats.recentAchievements[0]);
      const timer = setTimeout(() => setRecentAchievement(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [learningStats.recentAchievements]);

  const handleMascotPersonalityChange = (personality: MascotPersonality) => {
    setCurrentMascotPersonality(personality);
  };

  const handleTopicChange = (topic: string) => {
    setCurrentTopic(topic);
  };

  const authenticOrishas = [
    { name: "Olókun", nameYoruba: "Olókun", emoji: "🌊", duration: "46s", category: "Ocean Deity" },
    { name: "Ọya", nameYoruba: "Ọya", emoji: "💨", duration: "51s", category: "Wind Goddess" },
    { name: "Yemọja", nameYoruba: "Yemọja", emoji: "💙", duration: "102s", category: "Mother Waters" },
    { name: "Ọ̀ṣun", nameYoruba: "Ọ̀ṣun", emoji: "💛", duration: "66s", category: "River Goddess" },
    { name: "Ọbàtálá", nameYoruba: "Ọbàtálá", emoji: "🤍", duration: "86s", category: "Creator Deity" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-blue/10 via-white to-spiritual-amber/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-spiritual-blue to-spiritual-amber rounded-xl flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-spiritual-blue to-spiritual-amber bg-clip-text text-transparent">
              {ts("Orisha Learning Academy", "Ilé-ẹ̀kọ́ Òrìṣà")}
            </h1>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {ts(
              "Personalized Yoruba spiritual learning with your AI guide",
              "Ẹ̀kọ́ ẹ̀mí Yorùbá pẹ̀lú amọ̀nà AI rẹ"
            )}
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-spiritual-blue">{learningStats.totalProgress}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-spiritual-amber">{learningStats.currentStreak}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-emerald-600">{learningStats.completedLessons}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lessons Done</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{learningStats.recentAchievements.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Achievements</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Learning Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              {ts("Overview", "Ṣoki")}
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {ts("Lessons", "Ẹ̀kọ́")}
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              {ts("Achievements", "Àṣeyọrí")}
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              {ts("Practice", "Àdáṣe")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Current Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-spiritual-blue" />
                  {ts("Your Learning Journey", "Ìrìnàjò Ẹ̀kọ́ Rẹ")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-gray-600">{learningStats.completedLessons}/{learningStats.totalLessons} lessons</span>
                </div>
                <Progress value={learningStats.totalProgress} className="h-3" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Current Focus</div>
                    <Badge variant="secondary" className="bg-spiritual-blue/10 text-spiritual-blue">
                      {learningStats.activeOrisha} Teachings
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Next Milestone</div>
                    <div className="text-sm text-gray-600">{learningStats.nextMilestone}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Authentic Orisha Recordings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-spiritual-amber" />
                  {ts("Authentic Orisha Pronunciations", "Ìpè Òrìṣà Gidi")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {authenticOrishas.map((orisha) => (
                    <motion.div
                      key={orisha.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-spiritual-blue/50 transition-all cursor-pointer"
                      onClick={() => handleTopicChange(`${orisha.name} Studies`)}
                    >
                      <div className="text-center space-y-2">
                        <div className="text-3xl">{orisha.emoji}</div>
                        <div className="font-semibold">{orisha.nameYoruba}</div>
                        <div className="text-sm text-gray-600">{orisha.category}</div>
                        <Badge variant="outline" className="text-xs">
                          {orisha.duration} authentic
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lessons">
            <PersonalizedLearningDashboard onTopicChange={handleTopicChange} />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementBadgeShowcase />
          </TabsContent>

          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle>{ts("Practice Center", "Ilé Àdáṣe")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Zap className="h-12 w-12 text-spiritual-amber mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {ts("Practice Mode Coming Soon", "Ìpò Àdáṣe Ń Bọ̀")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {ts("Interactive practice sessions with your learning mascot", "Àkójọpọ̀ àdáṣe pẹ̀lú amọ̀nà ẹ̀kọ́ rẹ")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Learning Mascot */}
      <LearningMascot
        userProgress={learningStats.totalProgress}
        currentTopic={currentTopic}
        recentAchievement={recentAchievement}
        onPersonalityChange={handleMascotPersonalityChange}
      />
    </div>
  );
}

export default LearningSimple;