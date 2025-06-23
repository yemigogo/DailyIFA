import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface OrikiVerse {
  id: string;
  orisha: string;
  orishaYoruba: string;
  title: string;
  titleYoruba: string;
  verses: string[];
  versesYoruba: string[];
  meaning: string;
  meaningYoruba: string;
  audioUrl?: string;
  category: 'praise' | 'invocation' | 'blessing' | 'story';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const orikiData: OrikiVerse[] = [
  {
    id: "orunmila-1",
    orisha: "Òrúnmìlà",
    orishaYoruba: "Òrúnmìlà",
    title: "Òrúnmìlà, Witness of Destiny",
    titleYoruba: "Òrúnmìlà, Ẹlẹ́rìí Ìpín",
    verses: [
      "Òrúnmìlà, witness of destiny",
      "Ajana who knows the day of birth",
      "Ọpá Ìwòrì, staff of wisdom",
      "Akọni lẹ́sẹ̀ọtá, teacher of mysteries",
      "Baba who sees tomorrow today"
    ],
    versesYoruba: [
      "Òrúnmìlà, ẹlẹ́rìí ìpín",
      "Ajana tí ó mọ ọjọ́ ìbí",
      "Ọpá Ìwòrì, ọ̀pá ọgbọ́n",
      "Akọni lẹ́sẹ̀ọtá, olùkọ́ àwọn àṣírí",
      "Bàbá tí ó rí ọ̀la lónìí"
    ],
    meaning: "This praise acknowledges Òrúnmìlà as the divine witness of all destiny, the sage who knows the mysteries of birth and death, and the wise teacher who guides humanity through the wisdom of Ifá.",
    meaningYoruba: "Oríkì yìí ń jẹ́wọ́ Òrúnmìlà gẹ́gẹ́ bí ẹlẹ́rìí ọrun fún gbogbo ìpín, ọlọ́gbọ́n tí ó mọ àṣírí ìbí àti ikú, àti olùkọ́ ọlọ́gbọ́n tí ó ń darí ẹ̀dá ènìyàn nípasẹ̀ ọgbọ́n Ifá.",
    category: "praise",
    difficulty: "intermediate"
  },
  {
    id: "sango-1", 
    orisha: "Ṣàngó",
    orishaYoruba: "Ṣàngó",
    title: "Ṣàngó, Lord of Thunder",
    titleYoruba: "Ṣàngó, Ọba Àrá",
    verses: [
      "Ṣàngó, king who hangs in the sky",
      "Ọba kòso, the king did not hang",
      "Lord of thunder and lightning",
      "Fire spitter, stone thrower",
      "Justice bringer with flaming eyes"
    ],
    versesYoruba: [
      "Ṣàngó, ọba tí ó rọ̀ sókè",
      "Ọba kòso, ọba kò gbe",
      "Olúwa àrá àti mọ̀nàmọ́ná",
      "Atutù iná, asọ òkúta",
      "Amudájú pẹ̀lú ojú iná"
    ],
    meaning: "This praises Ṣàngó as the mighty king of thunder, emphasizing his power over fire and lightning, his role as a bringer of divine justice, and his eternal sovereignty.",
    meaningYoruba: "Èyí ń yin Ṣàngó gẹ́gẹ́ bí alágbára ọba àrá, tí ń tẹnumọ́ agbára rẹ̀ lórí iná àti mọ̀nàmọ́ná, ipò rẹ̀ gẹ́gẹ́ bí amudájú ọ̀run, àti ọbaláṣẹ rẹ̀ láéláé.",
    category: "invocation",
    difficulty: "beginner"
  },
  {
    id: "obatala-1",
    orisha: "Ọbàtálá",
    orishaYoruba: "Ọbàtálá",
    title: "Ọbàtálá, Creator of Human Forms",
    titleYoruba: "Ọbàtálá, Ẹlẹ́dá Ẹni",
    verses: [
      "Ọbàtálá, king of white cloth",
      "Creator who molds human forms",
      "Pure one dressed in white",
      "Father of coolness and wisdom",
      "Protector of those who cannot speak"
    ],
    versesYoruba: [
      "Ọbàtálá, ọba aṣọ funfun",
      "Ẹlẹ́dá tí ó ń mọ ara ènìyàn",
      "Ọ̀tọ́tọ́ tí ó wọ aṣọ funfun",
      "Bàbá ìtura àti ọgbọ́n",
      "Aṣábò àwọn tí kò lè sọ̀rọ̀"
    ],
    meaning: "This honors Ọbàtálá as the pure creator deity who shapes human bodies, emphasizing his wisdom, compassion, and special care for those with disabilities.",
    meaningYoruba: "Èyí ń bu ọlá fún Ọbàtálá gẹ́gẹ́ bí òrìṣà ẹlẹ́dá mímọ́ tí ó ń ṣe ara ènìyàn, tí ń tẹnumọ́ ọgbọ́n rẹ̀, àánú, àti àbójútó pàtàkì fún àwọn tí ó ní àìlágbára.",
    category: "blessing",
    difficulty: "intermediate"
  },
  {
    id: "ogun-1",
    orisha: "Ògún",
    orishaYoruba: "Ògún", 
    title: "Ògún, Master of Iron",
    titleYoruba: "Ògún, Ọga Irin",
    verses: [
      "Ògún, owner of iron and steel",
      "Path clearer, road opener",
      "Warrior who fights for justice",
      "Blacksmith of the divine forge",
      "Guardian of those who work with tools"
    ],
    versesYoruba: [
      "Ògún, olóhun irin àti irin",
      "Atúná, ẹni tí ń ṣí ọ̀nà",
      "Jagunjagun tí ó jà fún òdodo",
      "Agbẹ́dẹ inú ìlé-iṣẹ́ ọ̀run",
      "Aṣábò àwọn tí ó ń ṣiṣẹ́ pẹ̀lú irinṣẹ́"
    ],
    meaning: "This celebrates Ògún as the divine blacksmith and warrior, master of technology and industry, who clears obstacles and protects workers and travelers.",
    meaningYoruba: "Èyí ń ṣe àjọyọ̀ Ògún gẹ́gẹ́ bí agbẹ́dẹ ọ̀run àti jagunjagun, ọga ìmọ̀-ẹrọ àti iṣẹ́-ọnà, tí ó ń mú àwọn ìdènà kúrò tí ó sì ń dáàbò bo àwọn òṣiṣẹ́ àti arìnrìn-àjò.",
    category: "invocation", 
    difficulty: "advanced"
  },
  {
    id: "oshun-1",
    orisha: "Ọ̀ṣun",
    orishaYoruba: "Ọ̀ṣun",
    title: "Ọ̀ṣun, River of Honey",
    titleYoruba: "Ọ̀ṣun, Odò Oyin",
    verses: [
      "Ọ̀ṣun, sweet water that heals",
      "Mother of flowing rivers",
      "Goddess of love and fertility", 
      "She who dances with brass bangles",
      "Provider of children and abundance"
    ],
    versesYoruba: [
      "Ọ̀ṣun, omi dídùn tí ó ń wòsàn",
      "Ìyá àwọn odò tí ń sàn",
      "Òrìṣà ìfẹ́ àti ìbísí",
      "Ẹni tí ó ń jó pẹ̀lú ègé idẹ",
      "Olùpèsè ọmọ àti ọ̀pọ̀lọpọ̀"
    ],
    meaning: "This honors Ọ̀ṣun as the nurturing river goddess, source of fertility, love, and abundance, celebrated for her healing waters and protective motherhood.",
    meaningYoruba: "Èyí ń bu ọlá fún Ọ̀ṣun gẹ́gẹ́ bí òrìṣà odò olùtọ́jú, orísun ìbísí, ìfẹ́, àti ọ̀pọ̀lọpọ̀, tí a ń ṣe àjọyọ̀ rẹ̀ fún omi ìwòsàn àti ìyáni aṣáàbò.",
    category: "blessing",
    difficulty: "beginner"
  },
  {
    id: "oya-1",
    orisha: "Oya",
    orishaYoruba: "Ọya",
    title: "Oya, Lady of the Winds",
    titleYoruba: "Ọya, Ìyálọ́ja Àfẹ́fẹ́",
    verses: [
      "Oya, fierce guardian of the marketplace",
      "Lady of winds and storms",
      "She who dances with lightning",
      "Mother of nine, keeper of the cemetery gates",
      "Warrior queen with the power of tornadoes"
    ],
    versesYoruba: [
      "Ọya, aṣáàbò líle ti ọjà",
      "Ìyálọ́ja àfẹ́fẹ́ àti ìjì",
      "Ẹni tí ó ń jó pẹ̀lú mọ̀nàmọ́ná",
      "Ìyá mẹ́sàn-án, aṣọ́ ẹnu-ọ̀nà isà òkú",
      "Ayaba jagunjagun pẹ̀lú agbára ìjì líle"
    ],
    meaning: "This honors Oya as the powerful Orisha of winds, storms, and transformation, guardian of the marketplace and cemetery gates, known for her fierce protection and warrior spirit.",
    meaningYoruba: "Èyí ń bu ọlá fún Ọya gẹ́gẹ́ bí òrìṣà alágbára ti àfẹ́fẹ́, ìjì, àti ìyípadà, aṣáàbò ọjà àti ẹnu-ọ̀nà isà òkú, tí a mọ̀ fún àgbérò líle àti ẹ̀mí jagunjagun rẹ̀.",
    category: "invocation",
    difficulty: "advanced"
  },
  {
    id: "yemoja-1",
    orisha: "Yemoja",
    orishaYoruba: "Yemọja",
    title: "Yemoja, Mother of Waters",
    titleYoruba: "Yemọja, Ìyá Omi",
    verses: [
      "Yemoja, mother of all waters",
      "She whose children are fish",
      "Ocean mother with flowing breasts",
      "Protector of women and children",
      "Great mother who gives life to the world"
    ],
    versesYoruba: [
      "Yemọja, ìyá gbogbo omi",
      "Ẹni tí àwọn ọmọ rẹ̀ jẹ́ ẹja",
      "Ìyá òkun pẹ̀lú ọmú tí ń sàn",
      "Aṣáàbò àwọn obìnrin àti ọmọdé",
      "Ìyá ńlá tí ó ń fún ayé ní ẹ̀mí"
    ],
    meaning: "This celebrates Yemoja as the great mother of all waters, the ocean goddess who nurtures all life, especially protecting women and children with her infinite maternal love.",
    meaningYoruba: "Èyí ń ṣe àjọyọ̀ Yemọja gẹ́gẹ́ bí ìyá ńlá gbogbo omi, òrìṣà òkun tí ó ń tọ́jú gbogbo ẹ̀mí, pàápàá láti dáàbò bo àwọn obìnrin àti ọmọdé pẹ̀lú ìfẹ́ ìyá àìlopin rẹ̀.",
    category: "blessing",
    difficulty: "intermediate"
  }
];

export default function OrikiPlayback() {
  const { language, ts } = useLanguage();
  const [selectedOriki, setSelectedOriki] = useState<OrikiVerse | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [selectedOrisha, setSelectedOrisha] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const audioRef = useRef<HTMLAudioElement>(null);

  const filteredOrikis = orikiData.filter(oriki => {
    const orishaMatch = selectedOrisha === "all" || oriki.orisha === selectedOrisha;
    const categoryMatch = selectedCategory === "all" || oriki.category === selectedCategory;
    return orishaMatch && categoryMatch;
  });

  const uniqueOrishas = [...new Set(orikiData.map(o => o.orisha))];
  const categories = ["praise", "invocation", "blessing", "story"];

  const playOriki = (oriki: OrikiVerse) => {
    setSelectedOriki(oriki);
    setCurrentVerseIndex(0);
    setIsPlaying(true);
  };

  const pauseOriki = () => {
    setIsPlaying(false);
  };

  const resetOriki = () => {
    setIsPlaying(false);
    setCurrentVerseIndex(0);
  };

  const nextVerse = () => {
    if (selectedOriki && currentVerseIndex < selectedOriki.verses.length - 1) {
      setCurrentVerseIndex(currentVerseIndex + 1);
    } else {
      setIsPlaying(false);
      setCurrentVerseIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-spiritual-blue dark:text-sacred-gold mb-4">
            {ts("Oríkì Playback", "Oríkì Ẹ̀rọ-orin")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {ts(
              "Listen to traditional Yoruba praise poetry for the Orishas. Each Oríkì carries deep spiritual meaning and connects us to ancestral wisdom.",
              "Gbọ́ àwọn ewì ìyìn Yorùbá ìbílẹ̀ fún àwọn Òrìṣà. Oríkì kọ̀ọ̀kan ní ìtumọ̀ ẹ̀mí jinlẹ̀ tí ó sì ń so wá pọ̀ mọ́ ọgbọ́n àwọn bàbá wa."
            )}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <div>
              <label className="block text-sm font-medium mb-2">
                {ts("Select Orisha", "Yan Òrìṣà")}
              </label>
              <select
                value={selectedOrisha}
                onChange={(e) => setSelectedOrisha(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800"
              >
                <option value="all">{ts("All Orishas", "Gbogbo Òrìṣà")}</option>
                {uniqueOrishas.map(orisha => (
                  <option key={orisha} value={orisha}>{orisha}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {ts("Category", "Ìrú")}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800"
              >
                <option value="all">{ts("All Categories", "Gbogbo Ìrú")}</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {ts(
                      category.charAt(0).toUpperCase() + category.slice(1),
                      category === "praise" ? "Ìyìn" :
                      category === "invocation" ? "Ìwúre" :
                      category === "blessing" ? "Ìbùkún" : "Ìtàn"
                    )}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Oriki List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredOrikis.map((oriki) => (
            <Card key={oriki.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-spiritual-blue/10 text-spiritual-blue">
                    {language === 'english' ? oriki.orisha : oriki.orishaYoruba}
                  </Badge>
                  <Badge variant="outline" className={`
                    ${oriki.difficulty === 'beginner' ? 'border-green-500 text-green-600' :
                      oriki.difficulty === 'intermediate' ? 'border-yellow-500 text-yellow-600' :
                      'border-red-500 text-red-600'}
                  `}>
                    {ts(oriki.difficulty, 
                      oriki.difficulty === 'beginner' ? 'Ìbẹ̀rẹ̀' :
                      oriki.difficulty === 'intermediate' ? 'Àrin' : 'Gíga'
                    )}
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  {language === 'english' ? oriki.title : oriki.titleYoruba}
                </CardTitle>
                <CardDescription>
                  {ts(
                    oriki.category.charAt(0).toUpperCase() + oriki.category.slice(1),
                    oriki.category === "praise" ? "Ìyìn" :
                    oriki.category === "invocation" ? "Ìwúre" :
                    oriki.category === "blessing" ? "Ìbùkún" : "Ìtàn"
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {language === 'english' ? oriki.meaning : oriki.meaningYoruba}
                </p>
                <Button
                  onClick={() => playOriki(oriki)}
                  className="w-full bg-spiritual-blue hover:bg-spiritual-blue/90"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {ts("Play Oríkì", "Ṣe Oríkì")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Playback Interface */}
        {selectedOriki && (
          <Card className="fixed bottom-24 left-4 right-4 md:left-8 md:right-8 z-40 shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {language === 'english' ? selectedOriki.title : selectedOriki.titleYoruba}
                  </CardTitle>
                  <CardDescription>
                    {language === 'english' ? selectedOriki.orisha : selectedOriki.orishaYoruba}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetOriki}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedOriki(null)}
                  >
                    ×
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Current Verse Display */}
              <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">
                    {ts("Verse", "Ẹsẹ")} {currentVerseIndex + 1} {ts("of", "nínú")} {selectedOriki.verses.length}
                  </div>
                  <div className="text-lg font-medium mb-2">
                    {language === 'english' 
                      ? selectedOriki.verses[currentVerseIndex]
                      : selectedOriki.versesYoruba[currentVerseIndex]
                    }
                  </div>
                  {language === 'english' && (
                    <div className="text-sm text-gray-600 italic">
                      {selectedOriki.versesYoruba[currentVerseIndex]}
                    </div>
                  )}
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentVerseIndex(Math.max(0, currentVerseIndex - 1))}
                  disabled={currentVerseIndex === 0}
                >
                  ←
                </Button>
                
                <Button
                  onClick={isPlaying ? pauseOriki : () => setIsPlaying(true)}
                  className="bg-spiritual-blue hover:bg-spiritual-blue/90"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextVerse}
                  disabled={currentVerseIndex === selectedOriki.verses.length - 1}
                >
                  →
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-spiritual-blue h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentVerseIndex + 1) / selectedOriki.verses.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Meaning */}
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                <strong>{ts("Meaning:", "Ìtumọ̀:")}</strong>
                <p className="mt-1">
                  {language === 'english' ? selectedOriki.meaning : selectedOriki.meaningYoruba}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}