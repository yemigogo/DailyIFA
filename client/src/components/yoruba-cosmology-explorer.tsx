import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Crown, 
  Globe, 
  Waves, 
  ChevronRight, 
  Trophy, 
  BookOpen,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';

// ======================
// COSMIC REALMS DATABASE
// ======================
interface CosmicRealm {
  description: string;
  descriptionYoruba: string;
  orishas: string[];
  symbol: string;
  color: string;
  gate: string;
  gateYoruba: string;
  icon: React.ElementType;
}

const cosmicRealms: Record<string, CosmicRealm> = {
  "Òrun": {
    description: "The 7-layered heavenly realm where Orishas dwell",
    descriptionYoruba: "Ilẹ̀ ọrun meje ti àwọn Òrìṣà ń gbé",
    orishas: ["Ọbàtálá", "Olódùmarè", "Òrúnmìlà"],
    symbol: "⬆️",
    color: "#4B0082",
    gate: "Àjàlá-Òrun (Gate of Rebirth)",
    gateYoruba: "Àjàlá-Òrun (Ẹnu-ọ̀nà Àtúnbí)",
    icon: Crown
  },
  "Ayé": {
    description: "Earthly marketplace where souls fulfill destinies",
    descriptionYoruba: "Ọjà ayé níbi tí àwọn ẹ̀mí ń mú àyànmọ́ wọn ṣẹ",
    orishas: ["Ṣàngó", "Ọ̀ṣun", "Ọya"],
    symbol: "🌍",
    color: "#228B22",
    gate: "Ilẹ̀-Ifẹ̀ (Sacred City)",
    gateYoruba: "Ilẹ̀-Ifẹ̀ (Ìlú Mímọ́)",
    icon: Globe
  },
  "Ilẹ̀-Ọkùn": {
    description: "Oceanic abyss ruled by Olókun",
    descriptionYoruba: "Ọ̀gbun òkun tí Olókun ń jẹ ọba rẹ̀",
    orishas: ["Olókun", "Yemọja"],
    symbol: "🌊",
    color: "#1E90FF",
    gate: "Ọ̀nà Ilẹ̀ (Path to the Deep)",
    gateYoruba: "Ọ̀nà Ilẹ̀ (Ọ̀nà sí Ìsàlẹ̀)",
    icon: Waves
  }
};

const cosmicProverbs = {
  "Òrun": [
    ["Òrun ni àṣẹ wà, ayé ni a ó ṣe", "Heaven holds authority, Earth executes it"],
    ["Ọ̀run l'àwa ti wá, ọ̀run l'àwa ó padà", "From heaven we came, to heaven we return"]
  ],
  "Ayé": [
    ["Ayé lọja, òrun nilẹ̀", "Earth is a market, Heaven is home"],
    ["Ayé gbogbo l'ọjà, kò sí tí ó dára ju èyí lọ", "All the world is a marketplace, none better than this"]
  ],
  "Ilẹ̀-Ọkùn": [
    ["Olókun ṣe ilẹ̀ adiye", "Olókun makes the ocean floor solid"],
    ["Òkun kì í gbẹ títí", "The ocean never dries completely"]
  ]
};

interface QuizQuestion {
  question: string;
  questionYoruba: string;
  options: string[];
  optionsYoruba: string[];
  correctAnswer: number;
  explanation: string;
  explanationYoruba: string;
}

const cosmicQuestions: QuizQuestion[] = [
  {
    question: "Where do souls choose their destiny before birth?",
    questionYoruba: "Níbo ni àwọn ẹ̀mí ti ń yan àyànmọ́ wọn kí wọ́n tó bí?",
    options: ["Ayé", "Òrun", "Ilẹ̀-Ọkùn"],
    optionsYoruba: ["Ayé", "Òrun", "Ilẹ̀-Ọkùn"],
    correctAnswer: 1,
    explanation: "In Òrun, souls choose their destiny with Àjàlá before descending to Earth",
    explanationYoruba: "Ní Òrun, àwọn ẹ̀mí yan àyànmọ́ wọn pẹ̀lú Àjàlá kí wọ́n tó sọ̀kalẹ̀ wá sí ayé"
  },
  {
    question: "Which realm connects to all others through the palm tree?",
    questionYoruba: "Àgbáyé wo ni ó so mọ́ gbogbo àwọn míràn nípa igi ọ̀pẹ?",
    options: ["Ayé only", "Òrun only", "Both Ayé and Òrun"],
    optionsYoruba: ["Ayé nìkan", "Òrun nìkan", "Ayé àti Òrun méjèèjì"],
    correctAnswer: 2,
    explanation: "The palm tree serves as the cosmic bridge connecting all realms",
    explanationYoruba: "Igi ọ̀pẹ jẹ́ àfárá àgbáyé tí ó so gbogbo àgbáyé pọ̀"
  },
  {
    question: "Who rules the oceanic abyss of Ilẹ̀-Ọkùn?",
    questionYoruba: "Ta ni ó jẹ ọba ọ̀gbun òkun Ilẹ̀-Ọkùn?",
    options: ["Yemọja", "Olókun", "Ọ̀ṣun"],
    optionsYoruba: ["Yemọja", "Olókun", "Ọ̀ṣun"],
    correctAnswer: 1,
    explanation: "Olókun is the supreme deity of the ocean depths and mysteries",
    explanationYoruba: "Olókun ni òrìṣà àgbà ọ̀gbun òkun àti àwọn àṣírí"
  }
];

interface ExplorerProgress {
  realmsExplored: string[];
  quizzesTaken: number;
  bestScore: number;
  lastStudied: string;
  totalTimeSpent: number;
}

export const YorubaCosmologyExplorer: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<'menu' | 'explore' | 'quiz' | 'progress'>('menu');
  const [selectedRealm, setSelectedRealm] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [progress, setProgress] = useState<ExplorerProgress>({
    realmsExplored: [],
    quizzesTaken: 0,
    bestScore: 0,
    lastStudied: '',
    totalTimeSpent: 0
  });
  const [sessionStart, setSessionStart] = useState<Date | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cosmology-explorer-progress');
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
    setSessionStart(new Date());
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: ExplorerProgress) => {
    setProgress(newProgress);
    localStorage.setItem('cosmology-explorer-progress', JSON.stringify(newProgress));
  };

  const exploreRealm = (realmName: string) => {
    setSelectedRealm(realmName);
    setCurrentView('explore');
    
    // Update progress
    const newProgress = { ...progress };
    if (!newProgress.realmsExplored.includes(realmName)) {
      newProgress.realmsExplored.push(realmName);
    }
    newProgress.lastStudied = new Date().toISOString();
    saveProgress(newProgress);

    toast({
      title: `Exploring ${realmName}`,
      description: "Realm knowledge added to your cosmic understanding",
    });
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentView('quiz');
  };

  const answerQuestion = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === cosmicQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < cosmicQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const newProgress = { ...progress };
    newProgress.quizzesTaken += 1;
    newProgress.bestScore = Math.max(newProgress.bestScore, score);
    newProgress.lastStudied = new Date().toISOString();
    if (sessionStart) {
      const timeSpent = Math.floor((new Date().getTime() - sessionStart.getTime()) / 1000);
      newProgress.totalTimeSpent += timeSpent;
    }
    saveProgress(newProgress);

    toast({
      title: "Quiz Complete!",
      description: `Score: ${score}/${cosmicQuestions.length} - ${score === cosmicQuestions.length ? 'Perfect! Àṣẹ!' : 'Study more to master cosmology'}`,
    });

    setQuizStarted(false);
    setCurrentView('menu');
  };

  const getRandomProverb = (realmName: string) => {
    const proverbs = cosmicProverbs[realmName];
    return proverbs[Math.floor(Math.random() * proverbs.length)];
  };

  const renderMenu = () => (
    <div className="space-y-6">
      <div className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-lg blur-xl"></div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4 relative z-10 animate-gradient">
          {language === 'yoruba' ? 'ÀWỌN ÀGBÁYÉ YORÙBÁ' : 'YORÙBÁ COSMOLOGY EXPLORER'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 relative z-10 text-lg">
          {language === 'yoruba' 
            ? 'Ṣe àyẹ̀wò àwọn àgbáyé àtijọ́ Yorùbá' 
            : 'Explore the ancient Yorùbá cosmic realms'}
        </p>
        
        {/* Floating cosmic symbols */}
        <div className="absolute top-0 left-1/4 text-purple-300 opacity-50 animate-float">⭐</div>
        <div className="absolute top-4 right-1/4 text-blue-300 opacity-50 animate-float animation-delay-1000">🌙</div>
        <div className="absolute -top-2 right-1/3 text-emerald-300 opacity-50 animate-float animation-delay-2000">✨</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-purple-200 hover:border-purple-400"
          onClick={() => setCurrentView('explore')}
        >
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {language === 'yoruba' ? 'Ṣe Àyẹ̀wò Àwọn Àgbáyé' : 'Explore Realms'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {language === 'yoruba' 
                ? 'Kọ́ nípa Òrun, Ayé, àti Ilẹ̀-Ọkùn' 
                : 'Learn about Òrun, Ayé, and Ilẹ̀-Ọkùn'}
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-emerald-200 hover:border-emerald-400"
          onClick={startQuiz}
        >
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {language === 'yoruba' ? 'Ìdánwò Àgbáyé' : 'Cosmic Quiz'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {language === 'yoruba' 
                ? 'Dán ìmọ̀ àgbáyé rẹ wò' 
                : 'Test your cosmic knowledge'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-600" />
            {language === 'yoruba' ? 'Ìlọsíwájú Rẹ' : 'Your Progress'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{progress.realmsExplored.length}/3</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'yoruba' ? 'Àgbáyé' : 'Realms'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">{progress.quizzesTaken}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'yoruba' ? 'Ìdánwò' : 'Quizzes'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{progress.bestScore}/{cosmicQuestions.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'yoruba' ? 'Àmì Dára Jù' : 'Best Score'}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-600">{Math.floor(progress.totalTimeSpent / 60)}m</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'yoruba' ? 'Àkókò' : 'Time'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderExploreView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={() => setCurrentView('menu')}
          className="flex items-center gap-2"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          {language === 'yoruba' ? 'Padà' : 'Back'}
        </Button>
        <h2 className="text-2xl font-bold">
          {language === 'yoruba' ? 'Àwọn Àgbáyé Kọ́smíkì' : 'Cosmic Realms'}
        </h2>
      </div>

      {selectedRealm ? (
        <div className="space-y-6">
          {/* Realm Details */}
          <Card className="border-2" style={{ borderColor: cosmicRealms[selectedRealm].color }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {React.createElement(cosmicRealms[selectedRealm].icon, { 
                  className: "h-8 w-8", 
                  style: { color: cosmicRealms[selectedRealm].color } 
                })}
                <span className="text-2xl">{selectedRealm}</span>
                <span className="text-2xl">{cosmicRealms[selectedRealm].symbol}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                {language === 'yoruba' 
                  ? cosmicRealms[selectedRealm].descriptionYoruba 
                  : cosmicRealms[selectedRealm].description}
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">
                  {language === 'yoruba' ? 'Ẹnu-ọ̀nà:' : 'Gate:'}
                </h4>
                <p>{language === 'yoruba' 
                  ? cosmicRealms[selectedRealm].gateYoruba 
                  : cosmicRealms[selectedRealm].gate}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">
                  {language === 'yoruba' ? 'Àwọn Òrìṣà:' : 'Orishas:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cosmicRealms[selectedRealm].orishas.map((orisha, index) => (
                    <Badge key={index} variant="secondary">
                      {orisha}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Random Proverb */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-lg border-l-4 border-l-amber-500">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-600" />
                  {language === 'yoruba' ? 'Òwe:' : 'Wisdom:'}
                </h4>
                {(() => {
                  const proverb = getRandomProverb(selectedRealm);
                  return (
                    <div>
                      <p className="font-medium text-amber-700 dark:text-amber-300 italic mb-1">
                        "{proverb[0]}"
                      </p>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        ({proverb[1]})
                      </p>
                    </div>
                  );
                })()}
              </div>

              <Button 
                onClick={() => setSelectedRealm(null)}
                className="w-full"
                style={{ backgroundColor: cosmicRealms[selectedRealm].color }}
              >
                {language === 'yoruba' ? 'Ṣe Àyẹ̀wò Àgbáyé Míràn' : 'Explore Another Realm'}
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(cosmicRealms).map(([name, realm]) => (
            <Card 
              key={name}
              className="cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 hover:scale-105 group relative overflow-hidden backdrop-blur-sm"
              style={{ 
                borderColor: realm.color + '60',
                background: `linear-gradient(135deg, ${realm.color}15, ${realm.color}05, transparent)`
              }}
              onClick={() => exploreRealm(name)}
            >
              {/* Animated background glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"
                style={{ 
                  background: `radial-gradient(circle at 50% 50%, ${realm.color}40, transparent 70%)` 
                }}
              />
              
              <CardContent className="p-6 text-center relative z-10">
                <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {React.createElement(realm.icon, { 
                    className: "h-16 w-16 mx-auto drop-shadow-lg filter group-hover:drop-shadow-2xl", 
                    style: { color: realm.color } 
                  })}
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-shadow-lg transition-all duration-300" 
                    style={{ color: realm.color }}>
                  {name}
                </h3>
                
                <p className="text-3xl mb-2 group-hover:animate-bounce" style={{ color: realm.color }}>
                  {realm.symbol}
                </p>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {language === 'yoruba' ? realm.descriptionYoruba : realm.description}
                </p>
                
                <div className="mt-4">
                  {progress.realmsExplored.includes(name) ? (
                    <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 shadow-md text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {language === 'yoruba' ? 'Ti Ṣe Àyẹ̀wò' : 'Explored'}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="group-hover:shadow-lg transition-shadow duration-300 text-xs" 
                           style={{ borderColor: realm.color, color: realm.color }}>
                      <Star className="h-3 w-3 mr-1" />
                      {language === 'yoruba' ? 'Ṣe Àyẹ̀wò' : 'Explore'}
                    </Badge>
                  )}
                </div>
              </CardContent>
              
              {/* Corner decoration */}
              <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: realm.color }}></div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderQuizView = () => {
    if (!quizStarted) {
      return (
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold">
            {language === 'yoruba' ? 'Ìdánwò Àgbáyé Kọ́smíkì' : 'Cosmic Knowledge Quiz'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'yoruba' 
              ? 'Dán ìmọ̀ àgbáyé Yorùbá rẹ wò pẹ̀lú ìbéèrè mẹ́ta'
              : 'Test your Yorùbá cosmology knowledge with three questions'}
          </p>
          <Button onClick={startQuiz} size="lg">
            {language === 'yoruba' ? 'Bẹ̀rẹ̀ Ìdánwò' : 'Start Quiz'}
          </Button>
        </div>
      );
    }

    const question = cosmicQuestions[currentQuestion];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => {
              setQuizStarted(false);
              setCurrentView('menu');
            }}
          >
            {language === 'yoruba' ? 'Padà' : 'Back'}
          </Button>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {language === 'yoruba' 
              ? `Ìbéèrè ${currentQuestion + 1} nínú ${cosmicQuestions.length}`
              : `Question ${currentQuestion + 1} of ${cosmicQuestions.length}`}
          </div>
        </div>

        <Progress value={((currentQuestion + 1) / cosmicQuestions.length) * 100} className="mb-6" />

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {language === 'yoruba' ? question.questionYoruba : question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full text-left justify-start p-4 h-auto"
                  onClick={() => answerQuestion(index)}
                  disabled={showExplanation}
                >
                  <span className="mr-3 font-bold">{index + 1}.</span>
                  {language === 'yoruba' ? question.optionsYoruba[index] : option}
                </Button>
              ))}
            </div>

            {showExplanation && (
              <div className="mt-6 space-y-4">
                <div className={`p-4 rounded-lg ${
                  selectedAnswer === question.correctAnswer 
                    ? 'bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700' 
                    : 'bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700'
                }`}>
                  <p className="font-semibold">
                    {selectedAnswer === question.correctAnswer 
                      ? (language === 'yoruba' ? '✅ Òtítọ́!' : '✅ Correct!') 
                      : (language === 'yoruba' ? '❌ Òtítọ́ ni:' : '❌ The correct answer is:')} 
                    {selectedAnswer !== question.correctAnswer && 
                      ` ${language === 'yoruba' ? question.optionsYoruba[question.correctAnswer] : question.options[question.correctAnswer]}`}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-300 dark:border-blue-700">
                  <p className="text-sm">
                    {language === 'yoruba' ? question.explanationYoruba : question.explanation}
                  </p>
                </div>

                <Button onClick={nextQuestion} className="w-full">
                  {currentQuestion < cosmicQuestions.length - 1 
                    ? (language === 'yoruba' ? 'Ìbéèrè Tókàn' : 'Next Question')
                    : (language === 'yoruba' ? 'Parí Ìdánwò' : 'Finish Quiz')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          {language === 'yoruba' ? `Àmì Lọ́wọ́lọ́wọ́: ${score}/${currentQuestion + (showExplanation ? 1 : 0)}` : `Current Score: ${score}/${currentQuestion + (showExplanation ? 1 : 0)}`}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      {/* Enhanced background with cosmic theme */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      {currentView === 'menu' && renderMenu()}
      {currentView === 'explore' && renderExploreView()}
      {currentView === 'quiz' && renderQuizView()}
      {currentView === 'progress' && renderProgressView()}
    </div>
  );
};