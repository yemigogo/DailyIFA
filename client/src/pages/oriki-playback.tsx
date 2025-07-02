import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";


interface OrikiVerse {
  id: string;
  orisha: string;
  text: string;
  audioUrl: string;
}

const orikiData: OrikiVerse[] = [
  {
    id: "orunmila",
    orisha: "Òrúnmìlà",
    text: "Ẹlẹ́rìí ìpín, agbani nímọ̀ràn, alábáyọ̀. \nThe witness to destiny, provider of wise counsel, bringer of joy.",
    audioUrl: "/static/audio/orunmila.mp3"
  },
  {
    id: "ogun",
    orisha: "Ògún",
    text: "Alágbède méjì, onírin tí ngbé orí lẹ̀sẹ̀. \nBlacksmith of iron, warrior who carries iron on his head.",
    audioUrl: "/static/audio/ogun.mp3"
  },
  {
    id: "obatala",
    orisha: "Ọbàtálá",
    text: "Baba funfun, alágba fún-fún tí ń bọ̀ láti ọ̀run. \nThe white-robed father, the elder in pure white from heaven.",
    audioUrl: "/static/audio/obatala.mp3"
  },
  {
    id: "sango",
    orisha: "Ṣàngó",
    text: "Ọba koso! Aláàfin tó mọ̀ràn ogun, kabiyesi Olú Ayé. \nThe king did not hang! Thunder lord, ruler of war and the world.",
    audioUrl: "/static/audio/sango.mp3"
  },
  {
    id: "yemaya",
    orisha: "Yemoja",
    text: "Ìyá omi, ọmọ yemoja. Tí ngbe omi gangan. \nMother of the ocean, bearer of life, the water nurturer.",
    audioUrl: "/static/audio/pronunciation/yemoja.mp3"
  },
  {
    id: "oshun",
    orisha: "Ọ̀ṣun",
    text: "Ọṣun Ọṣogbo, ayaba omi, alaroye. \nGoddess of sweetness, wealth, and fertility.",
    audioUrl: "/static/audio/oshun.mp3"
  },
  {
    id: "elegba",
    orisha: "Èṣù Ẹlẹ́gbára",
    text: "Ẹlẹ́gbára, onílẹ̀ kúrò. Alágbára orírun ọ̀nà. \nKeeper of the crossroads, opener of doors.",
    audioUrl: "/static/audio/elegba.mp3"
  },
  {
    id: "oya",
    orisha: "Ọya",
    text: "Oya Ìyá, alágbára afẹ́fẹ́. Ọya tó fẹ̀ ẹ̀mí sẹ̀yìn. \nMother of wind, fierce one who sweeps souls to the ancestors.",
    audioUrl: "/static/audio/pronunciation/oya.mp3"
  },
  {
    id: "oshosi",
    orisha: "Ọ̀ṣọ́ọ̀sì",
    text: "Ọ̀ṣọ́ọ̀sì agbani ni 'gba ogun, ọmọ ọdẹ tí í mu ẹyẹ lẹ́sẹ̀. \nỌ̀ṣọ́ọ̀sì, the rescuer in battle, hunter-child who catches birds with his feet.",
    audioUrl: "/static/audio/oshosi.mp3"
  },
  {
    id: "olokun",
    orisha: "Olókun",
    text: "Olókun fi ayé ṣe 'bùkún, oní agbára omi tó jinlẹ̀. \nOlókun, who blesses the world, ruler of the deep ocean's power.",
    audioUrl: "/static/audio/pronunciation/olokun.mp3"
  },
  {
    id: "orishaoko",
    orisha: "Òrìṣà Òkò",
    text: "Òrìṣà Òkò, aláṣẹ ilẹ̀, oní irúgbìn àti àlàfíà. \nDeity of the farm, master of the land, giver of peace and seed.",
    audioUrl: "/static/audio/orishaoko.mp3"
  },
  {
    id: "osanyin",
    orisha: "Ọ̀sányìn",
    text: "Ọ̀sányìn, ọlọ́gbò tí kò leè dá, ọba ewe àti egbo. \nMaster of all herbs, one-legged yet all-seeing, king of healing plants.",
    audioUrl: "/static/audio/osanyin.mp3"
  },
  {
    id: "ayelala",
    orisha: "Ayé-là-là",
    text: "Ayé-là-là, apẹẹrẹ òtítọ́, agbára ajé lórùn. \nThe mighty judge, symbol of truth, spiritual enforcer of justice.",
    audioUrl: "/static/audio/ayelala.mp3"
  }
];

export default function OrikiPlayback() {
  const { language, ts } = useLanguage();
  const [selectedOriki, setSelectedOriki] = useState<OrikiVerse | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [selectedOrisha, setSelectedOrisha] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const audioRef = useRef<HTMLAudioElement>(null);
  const weeklyAudioRef = useRef<HTMLAudioElement>(null);
  const [weeklyIsPlaying, setWeeklyIsPlaying] = useState(false);

  const filteredOrikis = orikiData.filter(oriki => {
    return selectedOrisha === "" || oriki.id === selectedOrisha;
  });

  const uniqueOrishas = Array.from(new Set(orikiData.map(o => o.orisha)));

  // Get week number using accurate calculation
  const getWeekNumber = (date: Date): number => {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - firstJan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstJan.getDay() + 1) / 7);
  };

  // Get Oríkì of the Week based on current week number
  const getWeeklyOriki = () => {
    const currentWeek = getWeekNumber(new Date());
    const index = currentWeek % orikiData.length;
    return orikiData[index];
  };

  const weeklyOriki = getWeeklyOriki();

  const playOriki = (oriki: OrikiVerse) => {
    setSelectedOriki(oriki);
    setCurrentVerseIndex(0);
    setIsPlaying(false);
  };

  const pauseOriki = () => {
    setIsPlaying(false);
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

        {/* Oríkì of the Week */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl shadow-md mb-8 max-w-2xl mx-auto">
          <h2 className="text-lg font-bold mb-4 text-indigo-800 dark:text-indigo-400 flex items-center">
            🌟 {ts("Oríkì of the Week", "Oríkì Ọ̀sẹ̀ yìí")}
          </h2>
          <div className="mb-4">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
              {weeklyOriki.orisha}
            </h3>
            <p className="italic text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
              {weeklyOriki.text}
            </p>
            <audio
              ref={weeklyAudioRef}
              src={weeklyOriki.audioUrl}
              controls
              className="w-full rounded-lg"
              onPlay={() => setWeeklyIsPlaying(true)}
              onPause={() => setWeeklyIsPlaying(false)}
              onEnded={() => setWeeklyIsPlaying(false)}
            />
          </div>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                if (weeklyAudioRef.current) {
                  if (weeklyIsPlaying) {
                    weeklyAudioRef.current.pause();
                  } else {
                    weeklyAudioRef.current.play();
                  }
                }
              }}
              variant="outline"
              className="border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400"
            >
              {weeklyIsPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {weeklyIsPlaying ? ts("Pause", "Dúró") : ts("Play Weekly Oríkì", "Ṣe Oríkì Ọ̀sẹ̀")}
            </Button>
          </div>
        </div>

        {/* Main Orisha Selector */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-red-700 dark:text-red-400 flex items-center">
            🎤 {ts("Oríkì Playback", "Oríkì Ẹ̀rọ-orin")}
          </h2>
          
          <div className="mb-4">
            <label htmlFor="orishaSelect" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              {ts("Choose an Orisha:", "Yan Òrìṣà kan:")}
            </label>
            <select
              id="orishaSelect"
              value={selectedOrisha}
              onChange={(e) => {
                setSelectedOrisha(e.target.value);
                if (e.target.value) {
                  const selectedData = orikiData.find(oriki => oriki.id === e.target.value);
                  if (selectedData) {
                    setSelectedOriki(selectedData);
                    setCurrentVerseIndex(0);
                    setIsPlaying(false);
                  }
                } else {
                  setSelectedOriki(null);
                }
              }}
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="">{ts("-- Select --", "-- Yan --")}</option>
              <option value="orunmila">Òrúnmìlà</option>
              <option value="ogun">Ògún</option>
              <option value="obatala">Ọbàtálá</option>
              <option value="sango">Ṣàngó</option>
              <option value="yemaya">Yemọja ⭐ {ts("(Authentic Audio)", "(Ohùn Òtítọ́)")}</option>
              <option value="oshun">Ọ̀ṣun</option>
              <option value="elegba">Èṣù Ẹlẹ́gbára</option>
              <option value="oya">Ọya ⭐ {ts("(Authentic Audio)", "(Ohùn Òtítọ́)")}</option>
              <option value="oshosi">Ọ̀ṣọ́ọ̀sì</option>
              <option value="olokun">Olókun ⭐ {ts("(Authentic Audio)", "(Ohùn Òtítọ́)")}</option>
              <option value="orishaoko">Òrìṣà Òkò</option>
              <option value="osanyin">Ọ̀sányìn</option>
              <option value="ayelala">Ayé-là-là</option>
            </select>
          </div>

          {/* Oriki Display */}
          {selectedOriki && (
            <div className="mb-4">
              <div className="text-gray-800 dark:text-gray-200 italic bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-3 text-spiritual-blue dark:text-sacred-gold flex items-center gap-2">
                  Oríkì {selectedOriki.orisha}
                  {(selectedOriki.id === 'olokun' || selectedOriki.id === 'oya' || selectedOriki.id === 'yemaya') && (
                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      ⭐ {ts("Authentic", "Òtítọ́")}
                    </Badge>
                  )}
                </h3>
                <div className="whitespace-pre-line text-base leading-relaxed">
                  {selectedOriki.text}
                </div>
              </div>
            </div>
          )}

          {/* Audio Player */}
          {selectedOriki && (
            <div className="mb-4">
              <audio
                ref={audioRef}
                src={selectedOriki.audioUrl}
                controls
                className="w-full mb-4 rounded-lg"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button
                  onClick={() => {
                    if (audioRef.current) {
                      if (isPlaying) {
                        audioRef.current.pause();
                      } else {
                        audioRef.current.play();
                      }
                    }
                  }}
                  className="bg-spiritual-blue hover:bg-spiritual-blue/90"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span className="ml-2">
                    {isPlaying ? ts("Pause", "Dúró") : ts("Play Audio", "Ṣe Ohùn")}
                  </span>
                </Button>
              </div>
            </div>
          )}
        </div>



        {/* Browse All Orikis */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-spiritual-blue dark:text-sacred-gold">
            {ts("Browse All Oríkì", "Wá Gbogbo Oríkì")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredOrikis.map((oriki) => (
            <Card key={oriki.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-spiritual-blue dark:text-sacred-gold">
                  {oriki.orisha}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-4 whitespace-pre-line">
                  {oriki.text}
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
        </div>



        {/* Closing Message */}
        <div className="text-center mt-12 max-w-md mx-auto">
          <p className="text-gray-600 dark:text-gray-400">
            {ts(
              "May the wisdom of the Orishas guide your path. Àṣẹ!",
              "Kí ọgbọ́n àwọn Òrìṣà tọ́ ọ sí ọ̀nà rẹ. Àṣẹ!"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}