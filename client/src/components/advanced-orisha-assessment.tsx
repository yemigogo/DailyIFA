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
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <Sparkles className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {ts("Discover Your Orisha", "Ṣàwárí Òrìṣà Rẹ")}
          </CardTitle>
          <CardDescription className="text-lg mt-4">
            {ts(
              "Begin your spiritual journey to find your divine connection through authentic Yoruba wisdom.",
              "Bẹ̀rẹ̀ ìrìnàjò ẹ̀mí rẹ láti wa ìsopọ̀ Ọ̀run rẹ nípa ọgbọ́n Yorùbá òtítọ́."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={!isYoruba ? "default" : "outline"}
                onClick={() => setIsYoruba(false)}
                className="btn-touch"
              >
                English
              </Button>
              <Button
                variant={isYoruba ? "default" : "outline"}
                onClick={() => setIsYoruba(true)}
                className="btn-touch"
              >
                Yorùbá
              </Button>
            </div>
          </div>
          <Button 
            onClick={showAncestral}
            className="btn-touch text-lg px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            {ts("Start Assessment", "Bẹ̀rẹ̀ Ìdánwò")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (currentScreen === 'ancestral') {
    return (
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-amber-900 dark:text-amber-100">
            {ts("Your Spiritual Roots", "Gbòngbò Ẹ̀mí Rẹ")}
          </CardTitle>
          <CardDescription className="text-lg mt-4">
            {ts(
              "Do you have a cultural or ancestral connection to the Orishas or Yoruba traditions?",
              "Ṣé o ní ìbátan àṣà tàbí ìdílé pẹ̀lú àwọn Òrìṣà tàbí àṣà Yorùbá?"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => nextStep('yes')}
            className="w-full btn-touch text-lg py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {ts("Yes, I do", "Bẹ́ẹ̀ni, mo ní")}
          </Button>
          <Button 
            onClick={() => nextStep('maybe')}
            className="w-full btn-touch text-lg py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
          >
            {ts("Not sure", "Mi ò mọ̀")}
          </Button>
          <Button 
            onClick={() => nextStep('no')}
            className="w-full btn-touch text-lg py-3 bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700"
          >
            {ts("No", "Bẹ́ẹ̀kọ́")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (currentScreen === 'quiz') {
    const question = questions[currentQuestion];
    return (
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-sm">
              {ts(`Question ${currentQuestion + 1} of ${questions.length}`, `Ìbéèrè ${currentQuestion + 1} nínú ${questions.length}`)}
            </Badge>
            <div className="flex gap-1">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentQuestion ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-blue-900 dark:text-blue-100">
            {ts(question.text, question.yoruba)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option)}
              variant="outline"
              className="w-full text-left p-4 h-auto justify-start bg-white/50 dark:bg-black/30 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-700"
            >
              <div>
                <div className="font-medium text-blue-900 dark:text-blue-100">
                  {ts(option.text, option.yoruba)}
                </div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (currentScreen === 'results') {
    const primaryOrishaKey = getPrimaryOrisha();
    const primaryOrisha = orishaProfiles[primaryOrishaKey];
    const supportingOrishas = getSupportingOrishas();
    const IconComponent = primaryOrisha.icon;

    return (
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full bg-${primaryOrisha.color}-100 dark:bg-${primaryOrisha.color}-900/30`}>
              <IconComponent className={`h-12 w-12 text-${primaryOrisha.color}-600 dark:text-${primaryOrisha.color}-400`} />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {ts("Your Orisha is:", "Òrìṣà Rẹ Ni:")} {primaryOrisha.name}
          </CardTitle>
          <CardDescription className="text-lg mt-4">
            {ts(primaryOrisha.description, primaryOrisha.yorubaDescription)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
              {ts("Spiritual Domains:", "Àwọn Agbègbè Ẹ̀mí:")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {primaryOrisha.domain.map((domain, index) => (
                <Badge key={index} variant="secondary" className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200">
                  {domain}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
              {ts("Supporting Orishas:", "Àwọn Òrìṣà Atìlẹ́yìn:")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {supportingOrishas.map((orishaKey) => {
                const orisha = orishaProfiles[orishaKey];
                const SupportIcon = orisha.icon;
                return (
                  <div key={orishaKey} className="flex items-center gap-2 p-3 rounded-lg bg-white/50 dark:bg-black/30 border border-emerald-200 dark:border-emerald-700">
                    <SupportIcon className={`h-5 w-5 text-${orisha.color}-600 dark:text-${orisha.color}-400`} />
                    <span className="font-medium text-emerald-900 dark:text-emerald-100">{orisha.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
              {ts("Daily Guidance:", "Ìtọ́nisọ́nà Ojoojúmọ́:")}
            </h3>
            <p className="text-emerald-800 dark:text-emerald-200">
              {ts(primaryOrisha.dailyGuidance, primaryOrisha.yorubaDailyGuidance)}
            </p>
          </div>

          <div className="text-center">
            <Button 
              onClick={restart}
              className="btn-touch text-lg px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {ts("Retake Assessment", "Túnṣe Ìdánwò")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}