import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Crown, Heart, Zap, Waves, Mountain, Wind, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AssessmentQuestion {
  id: string;
  question: string;
  questionYoruba: string;
  answers: {
    text: string;
    textYoruba: string;
    scores: { [orisha: string]: number };
  }[];
}

interface OrishaProfile {
  name: string;
  description: string;
  descriptionYoruba: string;
  domains: string[];
  domainsYoruba: string[];
  personality: string[];
  personalityYoruba: string[];
  colors: string[];
  element: string;
  elementYoruba: string;
  icon: any;
}

const orishaProfiles: { [key: string]: OrishaProfile } = {
  obatala: {
    name: "Ọbàtálá",
    description: "The Orisha of wisdom, peace, and purity. The great creator and father of all Orishas.",
    descriptionYoruba: "Òrìṣà ọgbọ́n, àlàáfíà, àti mímọ́. Ẹlẹ́dàá ńlá àti bàbá gbogbo Òrìṣà.",
    domains: ["Wisdom", "Peace", "Justice", "Clarity", "Leadership"],
    domainsYoruba: ["Ọgbọ́n", "Àlàáfíà", "Òdodo", "Àṣírí", "Aṣáájú"],
    personality: ["Calm", "Wise", "Fair", "Patient", "Spiritual"],
    personalityYoruba: ["Ọ̀tún", "Ọlọ́gbọ́n", "Òdodo", "Sùúrù", "Ẹ̀mí"],
    colors: ["White", "Silver"],
    element: "Air",
    elementYoruba: "Afẹ́fẹ́",
    icon: Crown
  },
  ogun: {
    name: "Ògún",
    description: "The Orisha of iron, work, and progress. The divine blacksmith and warrior.",
    descriptionYoruba: "Òrìṣà irin, iṣẹ́, àti ìlọsíwájú. Alágbẹ̀dẹ ọlọ́run àti jagunjagun.",
    domains: ["Work", "Technology", "Protection", "Progress", "Strength"],
    domainsYoruba: ["Iṣẹ́", "Ìmọ̀-ẹ̀rọ", "Ààbò", "Ìlọsíwájú", "Agbára"],
    personality: ["Hardworking", "Determined", "Protective", "Innovative", "Strong"],
    personalityYoruba: ["Aṣiṣẹ́", "Pinnu", "Olùdàbòbò", "Afẹ̀mọ́jú", "Agbára"],
    colors: ["Green", "Black"],
    element: "Iron",
    elementYoruba: "Irin",
    icon: Mountain
  },
  oshun: {
    name: "Ọ̀ṣun",
    description: "The Orisha of love, fertility, and rivers. The divine mother and healer.",
    descriptionYoruba: "Òrìṣà ìfẹ́, ìbísí, àti odò. Ìyá ọlọ́run àti onísègùn.",
    domains: ["Love", "Fertility", "Healing", "Beauty", "Prosperity"],
    domainsYoruba: ["Ìfẹ́", "Ìbísí", "Ìwòsàn", "Ẹwà", "Ọrọ̀"],
    personality: ["Loving", "Nurturing", "Beautiful", "Sensual", "Generous"],
    personalityYoruba: ["Olùfẹ́", "Abọ́jútó", "Ẹlẹ́wà", "Arínifẹ́", "Olóore"],
    colors: ["Yellow", "Gold"],
    element: "Water",
    elementYoruba: "Omi",
    icon: Heart
  },
  yemoja: {
    name: "Yemọja",
    description: "The Orisha of the ocean and motherhood. The great mother of all life.",
    descriptionYoruba: "Òrìṣà òkun àti ìyàbí. Ìyá ńlá gbogbo ẹ̀mí.",
    domains: ["Motherhood", "Ocean", "Protection", "Nurturing", "Wisdom"],
    domainsYoruba: ["Ìyàbí", "Òkun", "Ààbò", "Ìtọ́jú", "Ọgbọ́n"],
    personality: ["Maternal", "Protective", "Wise", "Calm", "Powerful"],
    personalityYoruba: ["Abíyamọ", "Olùdàbòbò", "Ọlọ́gbọ́n", "Ọ̀tún", "Agbára"],
    colors: ["Blue", "White"],
    element: "Water",
    elementYoruba: "Omi",
    icon: Waves
  },
  shango: {
    name: "Ṣàngó",
    description: "The Orisha of thunder, lightning, and justice. The divine king and warrior.",
    descriptionYoruba: "Òrìṣà àrá, mọ̀nàmọ́ná, àti òdodo. Ọba ọlọ́run àti jagunjagun.",
    domains: ["Justice", "Power", "Leadership", "Thunder", "Passion"],
    domainsYoruba: ["Òdodo", "Agbára", "Aṣáájú", "Àrá", "Ìfẹ́kúfẹ̀ẹ́"],
    personality: ["Powerful", "Just", "Charismatic", "Passionate", "Regal"],
    personalityYoruba: ["Agbára", "Òdodo", "Afẹ́nilọ́kàn", "Ìfẹ́kúfẹ̀ẹ́", "Ọlọ́lá"],
    colors: ["Red", "White"],
    element: "Fire",
    elementYoruba: "Iná",
    icon: Zap
  },
  oya: {
    name: "Ọya",
    description: "The Orisha of wind, change, and the ancestors. The fierce warrior goddess.",
    descriptionYoruba: "Òrìṣà afẹ́fẹ́, àyípadà, àti àwọn bàbá. Jagunjagun obìnrin líle.",
    domains: ["Change", "Wind", "Death", "Rebirth", "Transformation"],
    domainsYoruba: ["Àyípadà", "Afẹ́fẹ́", "Ikú", "Àtúnbí", "Àyípo"],
    personality: ["Independent", "Strong", "Transformative", "Fierce", "Free"],
    personalityYoruba: ["Òmìnira", "Agbára", "Ayípadà", "Líle", "Òmìnira"],
    colors: ["Purple", "Brown"],
    element: "Wind",
    elementYoruba: "Afẹ́fẹ́",
    icon: Wind
  }
};

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "leadership",
    question: "How do you typically handle leadership situations?",
    questionYoruba: "Báwo ni ìwọ ti ń ṣe pẹ̀lú àwọn ìṣẹ̀lẹ̀ aṣáájú?",
    answers: [
      {
        text: "I lead with wisdom and calm decision-making",
        textYoruba: "Mo ń darí pẹ̀lú ọgbọ́n àti ìpinnu ọ̀tún",
        scores: { obatala: 3, yemoja: 2, shango: 1 }
      },
      {
        text: "I take charge with passion and strength",
        textYoruba: "Mo ń gba ìdarí pẹ̀lú ìfẹ́kúfẹ̀ẹ́ àti agbára",
        scores: { shango: 3, ogun: 2, oya: 1 }
      },
      {
        text: "I guide with love and understanding",
        textYoruba: "Mo ń ṣe itọ́kasí pẹ̀lú ìfẹ́ àti òye",
        scores: { oshun: 3, yemoja: 2, obatala: 1 }
      },
      {
        text: "I prefer to work behind the scenes",
        textYoruba: "Mo fẹ́ràn láti ṣiṣẹ́ ní ìdí",
        scores: { ogun: 2, oshun: 1, yemoja: 1 }
      }
    ]
  },
  {
    id: "conflict",
    question: "How do you handle conflict and challenges?",
    questionYoruba: "Báwo ni ìwọ ti ń kojú ìjà àti àwọn ìdojúkọ?",
    answers: [
      {
        text: "I seek peaceful resolution and understanding",
        textYoruba: "Mo ń wá ìpinnu àlàáfíà àti òye",
        scores: { obatala: 3, oshun: 2, yemoja: 1 }
      },
      {
        text: "I face challenges head-on with determination",
        textYoruba: "Mo ń kojú àwọn ìdojúkọ pẹ̀lú ìpinnu",
        scores: { ogun: 3, shango: 2, oya: 1 }
      },
      {
        text: "I use strategy and adapt to the situation",
        textYoruba: "Mo ń lo ọgbọ́n àti ìbámu sí ìṣẹ̀lẹ̀",
        scores: { oya: 3, yemoja: 2, obatala: 1 }
      },
      {
        text: "I stand firm for justice and what's right",
        textYoruba: "Mo dúró ṣinṣin fún òdodo àti ohun tó tọ́",
        scores: { shango: 3, obatala: 2, ogun: 1 }
      }
    ]
  },
  {
    id: "relationships",
    question: "What role do you play in relationships?",
    questionYoruba: "Ipa wo ni ìwọ ń kó nínú àwọn ìbáṣepọ̀?",
    answers: [
      {
        text: "The nurturer who cares for everyone",
        textYoruba: "Olùtọ́jú tó ń bójútó gbogbo ènìyàn",
        scores: { yemoja: 3, oshun: 2, obatala: 1 }
      },
      {
        text: "The lover who brings joy and beauty",
        textYoruba: "Olùfẹ́ tó ń mú ayọ̀ àti ẹwà wá",
        scores: { oshun: 3, yemoja: 1, shango: 1 }
      },
      {
        text: "The protector who keeps others safe",
        textYoruba: "Olùdàbòbò tó ń pa àwọn ẹlòmíràn mọ́",
        scores: { ogun: 3, shango: 2, yemoja: 1 }
      },
      {
        text: "The wise counselor who gives guidance",
        textYoruba: "Ìgbìmọ̀ ọlọ́gbọ́n tó ń fun ní ìtọ́kasí",
        scores: { obatala: 3, yemoja: 2, oshun: 1 }
      }
    ]
  },
  {
    id: "environment",
    question: "Which environment energizes you most?",
    questionYoruba: "Àyíká wo ni ó ń fún ọ ní agbára jù?",
    answers: [
      {
        text: "Peaceful temples and quiet spaces",
        textYoruba: "Àwọn tẹ́ńpù àlàáfíà àti àwọn ààyè tí ó dákẹ́",
        scores: { obatala: 3, yemoja: 1 }
      },
      {
        text: "Rivers, lakes, and flowing water",
        textYoruba: "Àwọn odò, adágún, àti omi tí ń sàn",
        scores: { oshun: 3, yemoja: 2 }
      },
      {
        text: "Workshops, gyms, and active places",
        textYoruba: "Àwọn ibi iṣẹ́, ibi ìmúlẹ̀, àti àwọn ààyè tí ó ń ṣàkóso",
        scores: { ogun: 3, shango: 1 }
      },
      {
        text: "Open spaces with wind and movement",
        textYoruba: "Àwọn ààyè gbangba pẹ̀lú afẹ́fẹ́ àti ìgbésẹ̀",
        scores: { oya: 3, shango: 1 }
      }
    ]
  },
  {
    id: "values",
    question: "What values are most important to you?",
    questionYoruba: "Àwọn ìye wo ni ó ṣe pàtàkì jù fún ọ?",
    answers: [
      {
        text: "Wisdom, truth, and spiritual growth",
        textYoruba: "Ọgbọ́n, òtítọ́, àti ìdàgbàsókè ẹ̀mí",
        scores: { obatala: 3, yemoja: 1 }
      },
      {
        text: "Love, beauty, and emotional connection",
        textYoruba: "Ìfẹ́, ẹwà, àti àsopọ̀ ẹ̀dùn",
        scores: { oshun: 3, yemoja: 1 }
      },
      {
        text: "Hard work, progress, and achievement",
        textYoruba: "Iṣẹ́ líle, ìlọsíwájú, àti àṣeyọrí",
        scores: { ogun: 3, shango: 1 }
      },
      {
        text: "Justice, power, and making change",
        textYoruba: "Òdodo, agbára, àti ṣíṣe àyípadà",
        scores: { shango: 3, oya: 2, obatala: 1 }
      }
    ]
  }
];

export default function OrishaAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>({});
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<{ [orisha: string]: number }>({});
  const { ts, language } = useLanguage();

  const handleAnswer = (answerIndex: number) => {
    const question = assessmentQuestions[currentQuestion];
    const newAnswers = { ...answers, [question.id]: answerIndex };
    setAnswers(newAnswers);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: { [questionId: string]: number }) => {
    const scores: { [orisha: string]: number } = {
      obatala: 0,
      ogun: 0,
      oshun: 0,
      yemoja: 0,
      shango: 0,
      oya: 0
    };

    assessmentQuestions.forEach((question) => {
      const answerIndex = finalAnswers[question.id];
      const answer = question.answers[answerIndex];
      
      Object.entries(answer.scores).forEach(([orisha, score]) => {
        scores[orisha] += score;
      });
    });

    setResults(scores);
    setIsComplete(true);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
    setResults({});
  };

  const getSortedResults = () => {
    return Object.entries(results)
      .sort(([,a], [,b]) => b - a)
      .map(([orisha, score]) => ({
        orisha,
        profile: orishaProfiles[orisha],
        score,
        percentage: Math.round((score / Math.max(...Object.values(results))) * 100)
      }));
  };

  const getOrishaColor = (orisha: string) => {
    const colors: { [key: string]: string } = {
      obatala: "bg-gray-100 border-gray-300 text-gray-800",
      ogun: "bg-green-100 border-green-300 text-green-800",
      oshun: "bg-yellow-100 border-yellow-300 text-yellow-800",
      yemoja: "bg-blue-100 border-blue-300 text-blue-800",
      shango: "bg-red-100 border-red-300 text-red-800",
      oya: "bg-purple-100 border-purple-300 text-purple-800"
    };
    return colors[orisha] || "bg-gray-100 border-gray-300 text-gray-800";
  };

  if (isComplete) {
    const sortedResults = getSortedResults();
    const topOrisha = sortedResults[0];

    return (
      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
            <Crown className="h-5 w-5" />
            {ts("Your Orisha Compatibility Results", "Àwọn Èsì Ìbámu Òrìṣà Rẹ")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Orisha */}
          <div className="text-center space-y-4">
            <div className={`mx-auto w-20 h-20 rounded-full border-4 flex items-center justify-center ${getOrishaColor(topOrisha.orisha)}`}>
              <topOrisha.profile.icon className="h-10 w-10" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                {topOrisha.profile.name}
              </h2>
              <p className="text-amber-700 dark:text-amber-300 mb-2">
                {ts("Your Primary Orisha Alignment", "Ìbámu Òrìṣà Àkọ́kọ́ Rẹ")} ({topOrisha.percentage}%)
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                {language === "english" ? topOrisha.profile.description : topOrisha.profile.descriptionYoruba}
              </p>
            </div>
          </div>

          {/* Domains & Personality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                {ts("Sacred Domains", "Àwọn Agbègbè Mímọ́")}
              </h4>
              <div className="flex flex-wrap gap-1">
                {(language === "english" ? topOrisha.profile.domains : topOrisha.profile.domainsYoruba).map((domain, index) => (
                  <Badge key={index} variant="secondary" className={getOrishaColor(topOrisha.orisha)}>
                    {domain}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                {ts("Personality Traits", "Àwọn Ìwà")}
              </h4>
              <div className="flex flex-wrap gap-1">
                {(language === "english" ? topOrisha.profile.personality : topOrisha.profile.personalityYoruba).map((trait, index) => (
                  <Badge key={index} variant="outline" className="border-amber-300">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* All Results */}
          <div>
            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
              {ts("Complete Compatibility Profile", "Àkópọ̀ Ìbámu Kíkún")}
            </h4>
            <div className="space-y-3">
              {sortedResults.map(({ orisha, profile, percentage }) => {
                const Icon = profile.icon;
                return (
                  <div key={orisha} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getOrishaColor(orisha)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-amber-900 dark:text-amber-100">
                          {profile.name}
                        </span>
                        <span className="text-sm text-amber-600 dark:text-amber-400">
                          {percentage}%
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guidance */}
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
              {ts("Spiritual Guidance", "Ìtọ́kasí Ẹ̀mí")}
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
              {ts(
                "Based on your assessment, you have a strong connection to",
                "Dá lórí àyẹ̀wò rẹ, o ní àsopọ̀ tó lágbára pẹ̀lú"
              )} {topOrisha.profile.name}. 
              {ts(
                " Consider incorporating their colors, elements, and values into your spiritual practice.",
                " Rò láti fi àwọn àwọ̀, àwọn erún, àti àwọn ìye wọn sínú àṣà ẹ̀mí rẹ."
              )}
            </p>
            <div className="flex gap-2">
              <Badge className={getOrishaColor(topOrisha.orisha)}>
                {ts("Element:", "Erún:")} {language === "english" ? topOrisha.profile.element : topOrisha.profile.elementYoruba}
              </Badge>
              <Badge className={getOrishaColor(topOrisha.orisha)}>
                {ts("Colors:", "Àwọn Àwọ̀:")} {topOrisha.profile.colors.join(", ")}
              </Badge>
            </div>
          </div>

          <Button onClick={resetAssessment} variant="outline" className="w-full border-amber-300">
            {ts("Take Assessment Again", "Ṣe Àyẹ̀wò Lẹ́ẹ̀kan Sí i")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
  const question = assessmentQuestions[currentQuestion];

  return (
    <Card className="border-amber-200 dark:border-amber-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
          <Crown className="h-5 w-5" />
          {ts("Orisha Compatibility Assessment", "Àyẹ̀wò Ìbámu Òrìṣà")}
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-amber-600 dark:text-amber-400">
            <span>{ts("Question", "Ìbéèrè")} {currentQuestion + 1} {ts("of", "nínú")} {assessmentQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
            {language === "english" ? question.question : question.questionYoruba}
          </h3>
          
          <div className="space-y-3">
            {question.answers.map((answer, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full h-auto p-4 text-left border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                onClick={() => handleAnswer(index)}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-amber-900 dark:text-amber-100">
                    {language === "english" ? answer.text : answer.textYoruba}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
          <p className="text-xs text-amber-700 dark:text-amber-300">
            {ts(
              "This assessment helps identify which Orisha energies resonate most with your personality and spiritual path. Answer honestly for the most accurate results.",
              "Àyẹ̀wò yìí ń ran ọ lọ́wọ́ láti mọ àwọn agbára Òrìṣà wo ni ó bá ìwà àti ọ̀nà ẹ̀mí rẹ mu jù. Dáhùn ní òtítọ́ fún àwọn èsì tó péye jù."
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}