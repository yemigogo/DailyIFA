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
    text: "When you're stressed, what do you do to cope?",
    yoruba: "Nígbà tí àárẹ̀ bá mú ọ, kí ni o má ń ṣe láti kojú rẹ̀?",
    options: [
      { text: "Retreat and meditate quietly", yoruba: "Yẹra kí n sì ṣàlò ní ìdákẹ́jẹ́", orisha: "obatala", points: 2 },
      { text: "Get angry and take action", yoruba: "Bínú kí n sì gbé ìgbésẹ̀", orisha: "sango", points: 2 },
      { text: "Seek advice from friends", yoruba: "Béèrè ìmọ̀ràn lọ́wọ́ àwọn ọ̀rẹ́", orisha: "orunmila", points: 2 },
      { text: "Turn to music, dance, or creativity", yoruba: "Yí sí orin, ijó, tàbí ìṣẹ̀dá", orisha: "yemoja", points: 2 },
      { text: "Focus on work or survival", yoruba: "Fojú kan iṣẹ́ tàbí ìwàláàyè", orisha: "ogun", points: 2 }
    ]
  },
  {
    id: 2,
    text: "Which of these words resonates most with you?",
    yoruba: "Èwo nínú àwọn ọ̀rọ̀ wọ̀nyí ló dún mọ́ ọ jù?",
    options: [
      { text: "Peace", yoruba: "Àlàáfíà", orisha: "obatala", points: 2 },
      { text: "Strength", yoruba: "Agbára", orisha: "sango", points: 2 },
      { text: "Love", yoruba: "Ìfẹ́", orisha: "osun", points: 2 },
      { text: "Wisdom", yoruba: "Ọgbọ́n", orisha: "orunmila", points: 2 },
      { text: "Protection", yoruba: "Ààbò", orisha: "oya", points: 2 }
    ]
  },
  {
    id: 3,
    text: "You feel most alive when…",
    yoruba: "O ní ìmọ̀lára ayé jù nígbà tí...",
    options: [
      { text: "In nature or near water", yoruba: "Nínú àyíká tàbí nítòsí omi", orisha: "osun", points: 1 },
      { text: "Solving problems or giving advice", yoruba: "Ń yọ́ ìṣòro tàbí fún ni ní ìmọ̀ràn", orisha: "orunmila", points: 2 },
      { text: "Defending someone or standing up for justice", yoruba: "Ń gbèjà ẹnìkan tàbí dìde fún òdodo", orisha: "sango", points: 2 },
      { text: "Creating or expressing yourself", yoruba: "Ń ṣẹ̀dá tàbí fi ara rẹ hàn", orisha: "yemoja", points: 1 },
      { text: "Working with tools or building something", yoruba: "Ń ṣiṣẹ́ pẹ̀lú ohun èlò tàbí kọ́ nǹkan", orisha: "ogun", points: 2 }
    ]
  },
  {
    id: 4,
    text: "What kind of relationships do you value most?",
    yoruba: "Irú ìbáṣepọ̀ wo ni o mọ̀ ọ́n jù?",
    options: [
      { text: "Deep, meaningful, and peaceful", yoruba: "Jíjìn, tí ó ní ìtumọ̀, àti àlàáfíà", orisha: "obatala", points: 2 },
      { text: "Passionate and intense", yoruba: "Ìtara àti kíkan", orisha: "sango", points: 2 },
      { text: "Loving and nurturing", yoruba: "Ìfẹ́ àti ìtọ́jú", orisha: "osun", points: 2 },
      { text: "Intellectual and spiritual", yoruba: "Ọgbọ́n àti ẹ̀mí", orisha: "orunmila", points: 2 },
      { text: "Protective and loyal", yoruba: "Ìṣáábò àti òtítọ́", orisha: "oya", points: 2 }
    ]
  },
  {
    id: 5,
    text: "What is your approach to conflict?",
    yoruba: "Báwo ni o ṣe ń kojú ìjà?",
    options: [
      { text: "Avoid it and seek harmony", yoruba: "Yí kúrò kí n sì wá ìṣọ̀kan", orisha: "obatala", points: 2 },
      { text: "Face it head-on", yoruba: "Kojú rẹ̀ tààrà", orisha: "sango", points: 2 },
      { text: "Try to mediate and bring peace", yoruba: "Gbìyànjú láti ṣàgbò àti mú àlàáfíà wá", orisha: "osun", points: 2 },
      { text: "Analyze and strategize", yoruba: "Ṣàyẹ̀wò kí n sì gbèrò", orisha: "orunmila", points: 2 },
      { text: "Use strength or strategy to overcome", yoruba: "Lo agbára tàbí ọgbọ́n láti borí", orisha: "ogun", points: 2 }
    ]
  }
];

const orishaProfiles: Record<string, OrishaResult> = {
  obatala: {
    name: "Òbàtálá",
    yoruba: "Òbàtálá - Òrìṣà Àlá",
    description: "The father of the Orishas, deity of wisdom, peace, and purity. You are calm, intellectual, and diplomatic.",
    yorubaDescription: "Baba àwọn Òrìṣà, òrìṣà ọgbọ́n, àlàáfíà, àti mímọ́. O jẹ́ onírọ́ra, olóye, àti onífàájì.",
    dailyGuidance: "Seek peace. Let go of ego. Walk in truth.",
    yorubaDailyGuidance: "Wá àlàáfíà. Fi ìgbéraga sílẹ̀. Rìn nínú òtítọ́.",
    icon: Crown,
    color: "white",
    domain: ["Wisdom", "Peace", "Purity", "Justice", "Spiritual Leadership"]
  },
  sango: {
    name: "Ṣàngó",
    yoruba: "Ṣàngó - Ọba Aláṣẹ",
    description: "God of thunder and fire, the royal warrior. You are bold, fiery, and charismatic.",
    yorubaDescription: "Òrìṣà àrá àti iná, jagunjagun ọba. O jẹ́ onígboyà, eléèérí, àti òṣelú.",
    dailyGuidance: "Stand tall. Defend what is right. Harness your power.",
    yorubaDailyGuidance: "Dúró gbàngàn. Gbe ohun tí ó tọ́ ró. Lo agbára rẹ.",
    icon: Zap,
    color: "red",
    domain: ["Leadership", "Justice", "Passion", "Transformation", "Royal Power"]
  },
  osun: {
    name: "Òṣun",
    yoruba: "Òṣun - Òrìṣà Omi Tutù",
    description: "Goddess of fresh water, love, and fertility. You are sensual, nurturing, and artistic.",
    yorubaDescription: "Òrìṣà omi tutù, ìfẹ́, àti ìbísí. O jẹ́ adùn, olùtọ́jú, àti onímọ̀ ọnà.",
    dailyGuidance: "Open your heart. Trust your intuition. Let abundance flow.",
    yorubaDailyGuidance: "Ṣí ọkàn rẹ. Gbẹ́kẹ̀lé àkọsílẹ̀ rẹ. Jẹ́ kí ọ̀pọ̀lọpọ̀ sàn.",
    icon: Heart,
    color: "yellow",
    domain: ["Love", "Diplomacy", "Beauty", "Healing", "Abundance"]
  },
  yemoja: {
    name: "Yemọja",
    yoruba: "Yemọja - Ìyá Àwọn Omo Eja",
    description: "Mother of Waters, the nurturing ocean goddess. You are nurturing, emotional, and powerful.",
    yorubaDescription: "Ìyá Omi, òrìṣà òkun alágbára. O jẹ́ olùtọ́jú, oníìrí, àti alágbára.",
    dailyGuidance: "Honor your inner ocean. Protect your family. Flow with life.",
    yorubaDailyGuidance: "Bu ọlá fún òkun inú rẹ. Dáàbò bo ìdílé rẹ. Bá ayé lọ.",
    icon: Waves,
    color: "blue",
    domain: ["Motherhood", "Emotional Healing", "Intuition", "Protection", "Fertility"]
  },
  orunmila: {
    name: "Òrúnmìlà",
    yoruba: "Òrúnmìlà - Òrìṣà Ìfá",
    description: "God of wisdom and divination, keeper of destiny. You are analytical, spiritual, and insightful.",
    yorubaDescription: "Òrìṣà ọgbọ́n àti àfọ̀ṣẹ, atọ́jú àyànmọ́. O jẹ́ aṣeṣàyẹ́wò, ẹlẹ́mìí, àti onírísí.",
    dailyGuidance: "Seek truth. Follow your destiny. Speak with wisdom.",
    yorubaDailyGuidance: "Wá òtítọ́. Tẹ̀lé àyànmọ́ rẹ. Sọ̀rọ̀ pẹ̀lú ọgbọ́n.",
    icon: Star,
    color: "green",
    domain: ["Wisdom", "Divination", "Truth", "Destiny", "Spiritual Guidance"]
  },
  ogun: {
    name: "Ògún",
    yoruba: "Ògún - Òrìṣà Irin",
    description: "God of iron and war, the divine blacksmith. You are practical, focused, and loyal.",
    yorubaDescription: "Òrìṣà irin àti ogun, alágbẹ̀dé òrun. O jẹ́ òní, ọlọ́kàn-lé, àti olóòtítọ́.",
    dailyGuidance: "Clear the path. Build with strength. Honor your tools.",
    yorubaDailyGuidance: "Ṣí ọ̀nà. Kọ́ pẹ̀lú agbára. Bu ọlá fún ohun èlò rẹ.",
    icon: Mountain,
    color: "black",
    domain: ["Technology", "Protection", "Hard Work", "Innovation", "Strength"]
  },
  oya: {
    name: "Òyá",
    yoruba: "Òyá - Òrìṣà Afẹ́fẹ́",
    description: "Goddess of winds and storms, guardian of the cemetery. You are fierce, independent, and intuitive.",
    yorubaDescription: "Òrìṣà afẹ́fẹ́ àti ìjì, ọlọ́dẹ isà òkú. O jẹ́ aburú, alómìnira, àti onírísí.",
    dailyGuidance: "Embrace change. Protect what's sacred. Burn what must go.",
    yorubaDailyGuidance: "Gbà ìyípadà. Dáàbò bo ohun mímọ́. Sun ohun tí ó gbọdọ̀ lọ.",
    icon: Wind,
    color: "maroon",
    domain: ["Change", "Transformation", "Protection", "Independence", "Spirit Guide"]
  },
  eshu: {
    name: "Èṣù",
    yoruba: "Èṣù - Òrìṣà Òrita",
    description: "Guardian of crossroads and messenger of the gods. You are mischievous, clever, and spiritual.",
    yorubaDescription: "Olùṣọ́ òrita àti ikọ̀ àwọn òrìṣà. O jẹ́ aráyé, ọlọ́gbọ́n, àti ẹlẹ́mìí.",
    dailyGuidance: "Choose wisely. Walk the crossroads. Speak with purpose.",
    yorubaDailyGuidance: "Yan dáadáa. Rìn òrita. Sọ̀rọ̀ pẹ̀lú èròngbà.",
    icon: Sparkles,
    color: "black/red",
    domain: ["Communication", "Crossroads", "Choices", "Trickster", "Divine Messenger"]
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
    osun: 0,
    orunmila: 0,
    oya: 0,
    eshu: 0
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
      osun: 0,
      orunmila: 0,
      oya: 0,
      eshu: 0
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

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4 text-left">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {ts("Daily Guidance:", "Ìtọ́nisọ́nà Ojoojúmọ́:")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {ts(primaryOrisha.dailyGuidance, primaryOrisha.yorubaDailyGuidance)}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4 text-left">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {ts("Meditation:", "Ìṣàlò:")}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {ts(
              `Connect with ${primaryOrisha.name} through 10 minutes of peaceful meditation. Focus on their energy and guidance.`,
              `Darapọ̀ mọ́ ${primaryOrisha.name} nípa ìṣàlò àlàáfíà ìṣẹ́jú 10. Fojú kan agbára àti ìtọ́nisọ́nà wọn.`
            )}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4 text-left">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {ts("Spiritual Calendar:", "Kálẹ́ńdà Ẹ̀mí:")}
          </h3>
          <ul className="text-gray-600 dark:text-gray-300 space-y-1">
            <li>• {ts("Morning prayer to", "Àdúrà òwúrọ̀ sí")} {primaryOrisha.name}</li>
            <li>• {ts("Weekly offering day: Friday", "Ọjọ́ ẹ̀bọ ọ̀sẹ̀: Ẹtì")}</li>
            <li>• {ts("Monthly ritual: New moon meditation", "Àṣẹ oṣù: Ìṣàlò òṣùpá tuntun")}</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => {
              const affirmation = ts(primaryOrisha.dailyGuidance, primaryOrisha.yorubaDailyGuidance);
              if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(affirmation);
                utterance.rate = 0.8;
                utterance.pitch = 1;
                speechSynthesis.speak(utterance);
              } else {
                alert(ts("Speech not supported in this browser", "Òhun kò ṣiṣẹ́ nínú brúsa yìí"));
              }
            }}
            className="w-full py-3 px-6 text-lg font-medium bg-gray-600 hover:bg-gray-700 text-white border-none rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-2"
          >
            🔊 {ts("Speak Affirmation", "Sọ Ìjẹ́rìísí")}
          </button>
          
          <button 
            onClick={restart}
            className="w-full py-3 px-6 text-lg font-medium bg-red-500 hover:bg-red-600 text-white border-none rounded-lg cursor-pointer transition-colors"
          >
            {ts("Retake Assessment", "Túnṣe Ìdánwò")}
          </button>
        </div>
      </div>
    );
  }

  return null;
}