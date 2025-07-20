import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, Zap, Waves, Crown, Star, Wind, Mountain } from "lucide-react";

interface Question {
  id: number;
  text: string;
  yoruba: string;
  options: Array<{
    text: string;
    yoruba: string;
    orisha: string;
    points: number;
  }>;
}

interface OrishaResult {
  name: string;
  yoruba: string;
  description: string;
  yorubaDescription: string;
  dailyGuidance: string;
  yorubaDailyGuidance: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  domain: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Which element calls to your spirit most strongly?",
    yoruba: "Èwo nínú àwọn erùpẹ̀ yìí ló ń pe ẹ̀mí rẹ jùlọ?",
    options: [
      { text: "Ocean depths and flowing waters", yoruba: "Ìjìnlẹ̀ òkun àti omi tí ń sàn", orisha: "yemoja", points: 3 },
      { text: "Thunder, lightning, and fire", yoruba: "Àrá, mọ̀nàmọ́ná, àti iná", orisha: "sango", points: 3 },
      { text: "Pure light and divine wisdom", yoruba: "Ìmọ́lẹ̀ mímọ́ àti ọgbọ́n Ọ̀run", orisha: "obatala", points: 3 },
      { text: "Iron, war, and transformation", yoruba: "Irin, ogun, àti ìyípadà", orisha: "ogun", points: 3 },
      { text: "Fresh water, love, and beauty", yoruba: "Omi tutù, ìfẹ́, àti ẹwà", orisha: "osun", points: 3 }
    ]
  },
  {
    id: 2,
    text: "How do you handle life's challenges?",
    yoruba: "Báwo ni o ṣe ń kojú àwọn ìṣòro ayé?",
    options: [
      { text: "With fierce determination and direct action", yoruba: "Pẹ̀lú ìpinnu líle àti ìṣe tààrà", orisha: "ogun", points: 3 },
      { text: "Through patient wisdom and calm reflection", yoruba: "Nípa ọgbọ́n sùúrù àti ìrònú ìdákẹ́jẹ́", orisha: "obatala", points: 3 },
      { text: "With emotional flow and adaptation", yoruba: "Pẹ̀lú ṣíṣàn ẹ̀dùn àti ìbámu", orisha: "yemoja", points: 3 },
      { text: "Through passionate energy and leadership", yoruba: "Nípa agbára ìtara àti olórí", orisha: "sango", points: 3 },
      { text: "With love, diplomacy, and grace", yoruba: "Pẹ̀lú ìfẹ́, ìgbéjọ́pọ̀, àti oore-ọ̀fẹ́", orisha: "osun", points: 3 }
    ]
  },
  {
    id: 3,
    text: "What role do you naturally take in groups?",
    yoruba: "Iru ipa wo ni o maa n gba ninu awon eniyan?",
    options: [
      { text: "The protector and defender", yoruba: "Aṣáábò àti alágbéde", orisha: "ogun", points: 3 },
      { text: "The wise counselor and mediator", yoruba: "Olùgbọ́n àti alárinrin", orisha: "obatala", points: 3 },
      { text: "The nurturer and emotional support", yoruba: "Olùtọ́jú àti atilẹyìn ẹ̀dùn", orisha: "yemoja", points: 3 },
      { text: "The natural leader and motivator", yoruba: "Olórí àdáyébá àti amilóyè", orisha: "sango", points: 3 },
      { text: "The peacemaker and harmonizer", yoruba: "Aláàfíà àti amuṣẹpọ̀", orisha: "osun", points: 3 }
    ]
  },
  {
    id: 4,
    text: "Which time of day resonates with your energy?",
    yoruba: "Àkókò wo ọjọ́ ni agbára rẹ dára jù?",
    options: [
      { text: "Dawn - the time of new beginnings", yoruba: "Àfẹ̀mọ́júmọ́ - àkókò ìbẹ̀rẹ̀ tuntun", orisha: "obatala", points: 3 },
      { text: "Midday - when the sun is strongest", yoruba: "Ọ̀sán gangan - nígbà tí òòrùn le jù", orisha: "sango", points: 3 },
      { text: "Evening - the reflective twilight", yoruba: "Alẹ́ - àkókò ìṣàlò", orisha: "yemoja", points: 3 },
      { text: "Night - the time of deep work", yoruba: "Òru - àkókò iṣẹ́ jíjìn", orisha: "ogun", points: 3 },
      { text: "Sunset - the golden hour", yoruba: "Ìwọ̀ òòrùn - wákàtí ìgòlọ́", orisha: "osun", points: 3 }
    ]
  },
  {
    id: 5,
    text: "What drives your deepest passions?",
    yoruba: "Kí ni ó ń ru ìfẹ́ rẹ jíjìn sí ṣíṣe?",
    options: [
      { text: "Justice and protecting the innocent", yoruba: "Ìdájọ́ òdodo àti ààbò aláìṣẹ̀", orisha: "ogun", points: 3 },
      { text: "Peace, wisdom, and spiritual growth", yoruba: "Àlàáfíà, ọgbọ́n, àti ìdàgbàsókè ẹ̀mí", orisha: "obatala", points: 3 },
      { text: "Caring for others and emotional healing", yoruba: "Ìtọ́jú àwọn ẹlòmíràn àti ìwòsàn ẹ̀dùn", orisha: "yemoja", points: 3 },
      { text: "Achievement, power, and recognition", yoruba: "Àṣeyọrí, agbára, àti ìdámọ̀", orisha: "sango", points: 3 },
      { text: "Love, beauty, and artistic expression", yoruba: "Ìfẹ́, ẹwà, àti ìfihàn ọnà", orisha: "osun", points: 3 }
    ]
  }
];

const orishaProfiles: Record<string, OrishaResult> = {
  obatala: {
    name: "Òbàtálá",
    yoruba: "Òbàtálá - Òrìṣà Àlá",
    description: "The father of the Orishas, deity of wisdom, peace, and purity. You embody calm leadership, spiritual wisdom, and the pursuit of higher truth.",
    yorubaDescription: "Baba àwọn Òrìṣà, òrìṣà ọgbọ́n, àlàáfíà, àti mímọ́. O jẹ́ aṣojú ìdárí ìdákẹ́jẹ́, ọgbọ́n ẹ̀mí, àti wíwá òtítọ́ gíga.",
    dailyGuidance: "Seek wisdom before action. Practice patience and meditation. Your calm presence heals others.",
    yorubaDailyGuidance: "Wá ọgbọ́n kí o tó ṣe ohunkóhun. Ṣe àdáṣe sùúrù àti ìṣàlò. Ìwà rẹ tí ó dákẹ́ ń wo àwọn ẹlòmíràn sàn.",
    icon: Crown,
    color: "white",
    domain: ["Wisdom", "Peace", "Purity", "Justice", "Spiritual Leadership"]
  },
  yemoja: {
    name: "Yemọja",
    yoruba: "Yemọja - Ìyá Àwọn Omo Eja",
    description: "Mother of Waters, the nurturing ocean goddess. You possess deep emotional wisdom, protective instincts, and healing powers.",
    yorubaDescription: "Ìyá Omi, òrìṣà òkun alágbára. O ní ọgbọ́n ẹ̀dùn jíjìn, ìwà ìṣáábò, àti agbára ìwòsàn.",
    dailyGuidance: "Trust your intuition. Nurture those around you. Like water, flow around obstacles with grace.",
    yorubaDailyGuidance: "Gbẹ́kẹ̀lé ọgbọ́n inú rẹ. Tọ́jú àwọn tí ó yí ọ ká. Bí omi, máa gba ibi tí ó ṣòro kọjá pẹ̀lú ọlá.",
    icon: Waves,
    color: "blue",
    domain: ["Motherhood", "Emotional Healing", "Intuition", "Protection", "Fertility"]
  },
  sango: {
    name: "Ṣàngó",
    yoruba: "Ṣàngó - Ọba Aláṣẹ",
    description: "God of thunder and fire, the royal warrior. You embody passion, leadership, justice, and transformative power.",
    yorubaDescription: "Òrìṣà àrá àti iná, jagunjagun ọba. O jẹ́ aṣojú ìtara, ìdarí, ìdájọ́ òdodo, àti agbára ìyípadà.",
    dailyGuidance: "Channel your passion constructively. Lead by example. Your fire can light the way for others.",
    yorubaDailyGuidance: "Lo ìtara rẹ ní ọ̀nà tí ó dára. Ṣe aṣíwájú nípa àpẹẹrẹ. Iná rẹ lè ṣe ìtọ́nisọ́nà fún àwọn ẹlòmíràn.",
    icon: Zap,
    color: "red",
    domain: ["Leadership", "Justice", "Passion", "Transformation", "Royal Power"]
  },
  ogun: {
    name: "Ògún",
    yoruba: "Ògún - Òrìṣà Irin",
    description: "God of iron and war, the divine blacksmith. You possess determination, technological mastery, and protective strength.",
    yorubaDescription: "Òrìṣà irin àti ogun, alágbẹ̀dé òrun. O ní ìpinnu, ìmọ̀ ẹ̀rọ, àti agbára ìṣáábò.",
    dailyGuidance: "Work with determination and skill. Protect what you love. Your strength builds the foundation for others.",
    yorubaDailyGuidance: "Ṣiṣẹ́ pẹ̀lú ìpinnu àti ọgbọ́n. Dáàbò bo ohun tí o fẹ́ràn. Agbára rẹ ń ṣe ìpìlẹ̀ fún àwọn ẹlòmíràn.",
    icon: Mountain,
    color: "green",
    domain: ["Technology", "Protection", "Hard Work", "Innovation", "Strength"]
  },
  osun: {
    name: "Òṣun",
    yoruba: "Òṣun - Òrìṣà Omi Tutù",
    description: "Goddess of fresh water, love, and fertility. You embody grace, diplomatic wisdom, and the power of love to heal.",
    yorubaDescription: "Òrìṣà omi tutù, ìfẹ́, àti ìbísí. O jẹ́ aṣojú ọlá, ọgbọ́n ìgbéjọ́pọ̀, àti agbára ìfẹ́ láti wo sàn.",
    dailyGuidance: "Lead with love and diplomacy. Your grace and beauty inspire others. Create harmony wherever you go.",
    yorubaDailyGuidance: "Ṣe aṣíwájú pẹ̀lú ìfẹ́ àti ìgbéjọ́pọ̀. Ọlá àti ẹwà rẹ ń fún àwọn ẹlòmíràn ní ìmísí. Ṣe ìṣẹ̀pọ̀ níbikíbi tí o bá lọ.",
    icon: Heart,
    color: "yellow",
    domain: ["Love", "Diplomacy", "Beauty", "Healing", "Abundance"]
  }
};

export default function AdvancedOrishaAssessment() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'ancestral' | 'quiz' | 'results'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    obatala: 0,
    yemoja: 0,
    sango: 0,
    ogun: 0,
    osun: 0
  });
  const [hasAncestralConnection, setHasAncestralConnection] = useState<string>('');
  const [isYoruba, setIsYoruba] = useState(false);

  const ts = (english: string, yoruba: string) => isYoruba ? yoruba : english;

  const showAncestral = () => {
    setCurrentScreen('ancestral');
  };

  const nextStep = (connection?: string) => {
    if (currentScreen === 'ancestral') {
      setHasAncestralConnection(connection || '');
      setCurrentScreen('quiz');
    }
  };

  const handleAnswer = (option: { orisha: string; points: number }) => {
    const newScores = { ...scores };
    newScores[option.orisha] += option.points;
    
    // Bonus points for ancestral connection
    if (hasAncestralConnection === 'yes') {
      newScores[option.orisha] += 1;
    }
    
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    setCurrentScreen('results');
  };

  const restart = () => {
    setCurrentScreen('welcome');
    setCurrentQuestion(0);
    setScores({
      obatala: 0,
      yemoja: 0,
      sango: 0,
      ogun: 0,
      osun: 0
    });
    setHasAncestralConnection('');
  };

  const getPrimaryOrisha = () => {
    const sortedOrishas = Object.entries(scores).sort(([,a], [,b]) => b - a);
    return sortedOrishas[0][0];
  };

  const getSupportingOrishas = () => {
    const sortedOrishas = Object.entries(scores).sort(([,a], [,b]) => b - a);
    return sortedOrishas.slice(1, 3).map(([orisha]) => orisha);
  };

  if (currentScreen === 'welcome') {
    return (
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 text-center" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div className="flex justify-center mb-6">
          <Sparkles className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {ts("Discover Your Orisha", "Ṣàwárí Òrìṣà Rẹ")}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
          {ts(
            "Begin your spiritual journey to find your divine connection.",
            "Bẹ̀rẹ̀ ìrìnàjò ẹ̀mí rẹ láti wa ìsopọ̀ Ọ̀run rẹ."
          )}
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={!isYoruba ? "default" : "outline"}
              onClick={() => setIsYoruba(false)}
              className="px-6"
            >
              English
            </Button>
            <Button
              variant={isYoruba ? "default" : "outline"}
              onClick={() => setIsYoruba(true)}
              className="px-6"
            >
              Yorùbá
            </Button>
          </div>
        </div>
        
        <button 
          onClick={showAncestral}
          className="w-full py-3 px-6 text-lg font-medium bg-red-500 hover:bg-red-600 text-white border-none rounded-lg cursor-pointer transition-colors"
        >
          {ts("Start Assessment", "Bẹ̀rẹ̀ Ìdánwò")}
        </button>
      </div>
    );
  }

  if (currentScreen === 'ancestral') {
    return (
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 text-center" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {ts("Your Spiritual Roots", "Gbòngbò Ẹ̀mí Rẹ")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
          {ts(
            "Do you have a cultural or ancestral connection to the Orishas?",
            "Ṣé o ní ìbátan àṣà tàbí ìdílé pẹ̀lú àwọn Òrìṣà?"
          )}
        </p>
        
        <div className="space-y-3">
          <button 
            onClick={() => nextStep('yes')}
            className="w-full py-3 px-6 text-lg font-medium bg-red-500 hover:bg-red-600 text-white border-none rounded-lg cursor-pointer transition-colors"
          >
            {ts("Yes, I do", "Bẹ́ẹ̀ni, mo ní")}
          </button>
          <button 
            onClick={() => nextStep('maybe')}
            className="w-full py-3 px-6 text-lg font-medium bg-red-500 hover:bg-red-600 text-white border-none rounded-lg cursor-pointer transition-colors"
          >
            {ts("Not sure", "Mi ò mọ̀")}
          </button>
          <button 
            onClick={() => nextStep('no')}
            className="w-full py-3 px-6 text-lg font-medium bg-red-500 hover:bg-red-600 text-white border-none rounded-lg cursor-pointer transition-colors"
          >
            {ts("No", "Bẹ́ẹ̀kọ́")}
          </button>
        </div>
      </div>
    );
  }

  if (currentScreen === 'quiz') {
    const question = questions[currentQuestion];
    return (
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
            {ts(`Question ${currentQuestion + 1} of ${questions.length}`, `Ìbéèrè ${currentQuestion + 1} nínú ${questions.length}`)}
          </span>
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentQuestion ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          {ts(question.text, question.yoruba)}
        </h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer transition-colors"
            >
              <div className="font-medium text-gray-800 dark:text-white">
                {ts(option.text, option.yoruba)}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (currentScreen === 'results') {
    const primaryOrishaKey = getPrimaryOrisha();
    const primaryOrisha = orishaProfiles[primaryOrishaKey];
    const supportingOrishas = getSupportingOrishas();
    const IconComponent = primaryOrisha.icon;

    return (
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 text-center" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/30">
            <IconComponent className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {ts("Your Orisha is:", "Òrìṣà Rẹ Ni:")} <span className="text-red-600">{primaryOrisha.name}</span>
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {ts(primaryOrisha.description, primaryOrisha.yorubaDescription)}
        </p>

        <div className="text-left mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            {ts("Supporting Orishas:", "Àwọn Òrìṣà Atìlẹ́yìn:")}
          </h3>
          <ul className="space-y-2">
            {supportingOrishas.map((orishaKey) => {
              const orisha = orishaProfiles[orishaKey];
              const SupportIcon = orisha.icon;
              return (
                <li key={orishaKey} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <SupportIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="font-medium text-gray-800 dark:text-white">{orisha.name}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 text-left">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {ts("Daily Guidance:", "Ìtọ́nisọ́nà Ojoojúmọ́:")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {ts(primaryOrisha.dailyGuidance, primaryOrisha.yorubaDailyGuidance)}
          </p>
        </div>

        <button 
          onClick={restart}
          className="w-full py-3 px-6 text-lg font-medium bg-red-500 hover:bg-red-600 text-white border-none rounded-lg cursor-pointer transition-colors"
        >
          {ts("Retake Assessment", "Túnṣe Ìdánwò")}
        </button>
      </div>
    );
  }

  return null;
}