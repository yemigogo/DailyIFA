import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, CheckCircle, BookOpen, Trophy, TrendingUp } from 'lucide-react';

interface LocalProgressData {
  sectionId: string;
  sectionTitle: string;
  completedAt: string;
  timeSpent: number;
  language: string;
}

interface CosmologyProgressTrackerProps {
  sectionId: string;
  sectionTitle: string;
  onComplete?: () => void;
}

export const CosmologyProgressTracker: React.FC<CosmologyProgressTrackerProps> = ({
  sectionId,
  sectionTitle,
  onComplete
}) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [progressData, setProgressData] = useState<LocalProgressData[]>([]);

  // Load progress data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cosmology-progress');
    if (stored) {
      try {
        setProgressData(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing stored progress:', error);
      }
    }
  }, []);

  // Start session timer when component mounts
  useEffect(() => {
    setSessionStartTime(new Date());
  }, []);

  const saveProgress = (newProgress: LocalProgressData) => {
    const updated = [...progressData, newProgress];
    setProgressData(updated);
    localStorage.setItem('cosmology-progress', JSON.stringify(updated));
  };

  const completeSection = () => {
    if (!sessionStartTime) return;

    const timeSpent = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000);
    
    const newProgress: LocalProgressData = {
      sectionId,
      sectionTitle,
      completedAt: new Date().toISOString(),
      timeSpent,
      language: language || 'english'
    };

    saveProgress(newProgress);

    toast({
      title: "Section completed!",
      description: `You've completed the ${sectionTitle} section. Great progress!`,
    });

    if (onComplete) onComplete();
  };

  // Calculate stats from local data
  const sectionProgress = progressData.filter(p => p.sectionId === sectionId);
  const uniqueSections = new Set(progressData.map(p => p.sectionId));
  const totalSessions = progressData.length;
  const completedSections = uniqueSections.size;
  const totalTimeSpent = progressData.reduce((sum, p) => sum + p.timeSpent, 0);
  const currentSectionCount = sectionProgress.length;
  const totalSections = 4; // spiritual_universe, spirit_domains, cosmic_laws, realm_quiz
  const overallProgress = (completedSections / totalSections) * 100;
  const lastStudySession = progressData.length > 0 ? new Date(progressData[progressData.length - 1].completedAt) : null;

  return (
    <Card className="mb-6 border-purple-200 dark:border-purple-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-purple-600" />
          Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Overall Cosmology Progress</span>
            <span className="font-medium">{completedSections}/{totalSections} sections</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Section-specific stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>This section: {currentSectionCount} {currentSectionCount === 1 ? 'visit' : 'visits'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Total time: {Math.floor(totalTimeSpent / 60)}m</span>
          </div>
        </div>

        {/* Achievement badges */}
        <div className="flex flex-wrap gap-2">
          {totalSessions >= 5 && (
            <Badge variant="secondary" className="text-xs">
              <Trophy className="h-3 w-3 mr-1" />
              Dedicated Student
            </Badge>
          )}
          {completedSections >= 2 && (
            <Badge variant="secondary" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Making Progress
            </Badge>
          )}
          {totalTimeSpent >= 300 && ( // 5+ minutes
            <Badge variant="secondary" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Time Invested
            </Badge>
          )}
        </div>

        {/* Complete section button */}
        <Button 
          onClick={completeSection}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          Mark Section Complete
        </Button>

        {/* Last study session */}
        {lastStudySession && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Last studied: {lastStudySession.toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CosmologyProgressTracker;