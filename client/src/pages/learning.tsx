import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Volume2, Search, Star, Users, Scroll, Brain, Globe, Play, ChevronRight, Sparkles, Server, Database, Download } from 'lucide-react';
import { Link } from 'wouter';
import opeleChainImage from '@assets/image_1752086728408.png';
import oponIfaImage from '@assets/image_1752087156776.png';
import opaIfaImage from '@assets/image_1752089221750.png';
import ikinImage from '@assets/image_1752089487782.png';
import OduVisualization from '@/components/odu-visualization';
import FlaskOduCards from '@/components/flask-odu-cards';
import Complete256OduSystem from '@/components/complete-256-odu-system';
import AuthenticOduCards from '@/components/authentic-odu-cards';
import OfflineMode from '@/components/offline-mode';

interface LearningModule {
  id: string;
  title: string;
  titleYoruba: string;
  description: string;
  descriptionYoruba: string;
  icon: React.ReactNode;
  content: any[];
}

interface OduData {
  id: string;
  name: string;
  meaning: string;
  proverb: string;
  audioUrl?: string;
  category: string;
}

interface GlossaryTerm {
  term: string;
  termYoruba: string;
  definition: string;
  definitionYoruba: string;
  audioUrl?: string;
}

const Learning: React.FC = () => {
  const { language, ts } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('introduction');
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const playAudio = (audioUrl: string, id: string) => {
    setPlayingAudio(id);
    const audio = new Audio(audioUrl);
    audio.play();
    audio.onended = () => setPlayingAudio(null);
  };

  const majorOdu: OduData[] = [
    {
      id: "ejiogbe",
      name: "Èjì Ogbè",
      meaning: "The light of consciousness, new beginnings",
      proverb: "Èjì Ogbè ní: Ọ̀run rere ni mo fẹ́ fún ẹ. (Good fortune I wish for you)",
      category: "Principal Odu"
    },
    {
      id: "oyekumeji",
      name: "Òyẹ̀kú Méjì",
      meaning: "Death and transformation, endings that lead to new life",
      proverb: "Òyẹ̀kú ní: Ikú kò pa tálákà. (Death does not kill the poor)",
      category: "Principal Odu"
    },
    {
      id: "iwori",
      name: "Ìwòrì Méjì",
      meaning: "Patience and character, the virtue of waiting",
      proverb: "Ìwòrì ní: Sùúrù ni baba ìwà. (Patience is the father of character)",
      category: "Principal Odu"
    },
    {
      id: "odi",
      name: "Òdí Méjì",
      meaning: "Obstacles and challenges, paths that seem blocked",
      proverb: "Òdí ní: Ẹni tí ó gbọ́n a rí ọ̀nà. (The wise one will find a way)",
      category: "Principal Odu"
    }
  ];

  const yorubaBasics = [
    {
      category: "Greetings",
      phrases: [
        { yoruba: "Ẹ kú àárọ̀", english: "Good morning", audio: "/static/audio/pronunciation/eku_aaro.mp3" },
        { yoruba: "Ẹ kú ọ̀sán", english: "Good afternoon", audio: "/static/audio/pronunciation/eku_osan.mp3" },
        { yoruba: "Ẹ kú alẹ́", english: "Good evening", audio: "/static/audio/pronunciation/eku_ale.mp3" },
        { yoruba: "Báwo ni?", english: "How are you?", audio: "/static/audio/pronunciation/bawo_ni.mp3" }
      ]
    },
    {
      category: "Orisha Names",
      phrases: [
        { yoruba: "Òrúnmìlà", english: "Oracle of Ifá", audio: "/static/audio/pronunciation/orunmila_oriki_authentic.mp3" },
        { yoruba: "Ṣàngó", english: "Thunder deity", audio: "/static/audio/pronunciation/sango_oriki_authentic.mp3" },
        { yoruba: "Ògún", english: "Iron deity", audio: "/static/audio/pronunciation/ogun_oriki_authentic.mp3" },
        { yoruba: "Ọbàtálá", english: "Creator deity", audio: "/static/audio/pronunciation/obatala.mp3" }
      ]
    }
  ];

  const glossaryTerms: GlossaryTerm[] = [
    {
      term: "Àṣẹ",
      termYoruba: "Àṣẹ",
      definition: "Divine force, spiritual power that makes things happen",
      definitionYoruba: "Àgbára òrìṣà, agbára ẹ̀mí tí ó mú nǹkan ṣẹ"
    },
    {
      term: "Orí",
      termYoruba: "Orí",
      definition: "Personal destiny, inner head, guardian spirit",
      definitionYoruba: "Ìpínlẹ̀ ẹni kọ̀ọ̀kan, orí inú, ẹ̀mí asọ́"
    },
    {
      term: "Ẹbọ",
      termYoruba: "Ẹbọ",
      definition: "Ritual offering, sacrifice to the Orisha",
      definitionYoruba: "Ẹbọ, ìrúbọ sí àwọn Òrìṣà"
    },
    {
      term: "Babaláwo",
      termYoruba: "Babaláwo",
      definition: "Ifá priest, father of mysteries",
      definitionYoruba: "Àlùfáà Ifá, baba àwọn àwọn ohun ìjìnlẹ̀"
    }
  ];

  const divinationTools = [
    {
      name: "Ikin",
      nameYoruba: "Ikin",
      description: "Sacred palm nuts from the Ọ̀pẹ tree, traditionally used in sets of 16 for the most formal Ifá divination ceremonies",
      descriptionYoruba: "Ẹsọ ọ̀pẹ mímọ́ láti igi Ọ̀pẹ, tí a máa ń lò ní ọ̀nà mẹ́rìndínlógún fún àwọn àyẹ̀yẹ fífá Ifá tó ṣe pàtàkì jùlọ",
      image: ikinImage
    },
    {
      name: "Ọpẹlẹ Chain",
      nameYoruba: "Ọpẹlẹ",
      description: "Divination chain with eight half-shells made from seed pods, used for quick spiritual consultation",
      descriptionYoruba: "Ẹ̀wọ̀n fífá pẹ̀lú ìgbín mẹ́jọ tí a ṣe láti inú ẹ̀dá irúgbìn, tí a ń lò fún ìfọ̀rọ̀wérọ̀ ẹ̀mí kíákíá",
      image: opeleChainImage
    },
    {
      name: "Ọ̀pá Ifá",
      nameYoruba: "Ọ̀pá Ifá",
      description: "Sacred carved staff of the Babaláwo with twisted handle and spiritual head, symbol of authority in Ifá divination",
      descriptionYoruba: "Ọ̀pá mímọ́ Babaláwo pẹ̀lú ìmú tí a fín àti orí ẹ̀mí, àmì àṣẹ nínú fífá Ifá",
      image: opaIfaImage
    },
    {
      name: "Ọ̀pón Ifá",
      nameYoruba: "Ọ̀pón Ifá",
      description: "Sacred wooden divination tray with geometric patterns and the face of Ẹṣù, used for casting Ikin palm nuts during Ifá consultation",
      descriptionYoruba: "Àwo igi mímọ́ pẹ̀lú àwọn àpẹẹrẹ àti ojú Ẹṣù, tí a ń lò fún dída ikin nígbà ìfọ̀rọ̀wérọ̀ Ifá",
      image: oponIfaImage
    }
  ];

  const learningModules: LearningModule[] = [
    {
      id: "introduction",
      title: "Introduction to Ifá",
      titleYoruba: "Ìfàhàn sí Ifá",
      description: "Core spiritual principles and daily practice",
      descriptionYoruba: "Àwọn ìlànà ẹ̀mí àti ìṣe ojoojúmọ́",
      icon: <BookOpen className="w-5 h-5" />,
      content: [
        {
          title: "What is Ifá?",
          titleYoruba: "Kí ni Ifá?",
          text: "Ifá is an ancient Yoruba system of divination and spiritual guidance that connects practitioners with divine wisdom through the Oracle of Òrúnmìlà.",
          textYoruba: "Ifá jẹ́ ẹ̀tọ́ àtijọ́ Yorùbá fún fífá àti ìtọ́nisọ́nà ẹ̀mí tí ó so àwọn oníṣe pọ̀ mọ́ ọgbọ́n òrìṣà nípasẹ̀ Òrúnmìlà."
        }
      ]
    },
    {
      id: "cosmology",
      title: "Yorùbá Cosmology",
      titleYoruba: "Ìmọ̀ Nípa Ayé Yorùbá",
      description: "Understanding the spiritual universe",
      descriptionYoruba: "Òye àgbáyé ẹ̀mí",
      icon: <Globe className="w-5 h-5" />,
      content: [
        {
          title: "Olódùmarè",
          titleYoruba: "Olódùmarè",
          text: "The Supreme Being, source of all existence and divine authority",
          textYoruba: "Ọlọ́run Gíga, orísun gbogbo ohun alààyè àti àṣẹ òrìṣà"
        }
      ]
    },
    {
      id: "odu",
      title: "The 256 Odu Ifá",
      titleYoruba: "Àwọn Odù Ifá 256",
      description: "Sacred verses and their meanings",
      descriptionYoruba: "Àwọn ọ̀rọ̀ mímọ́ àti ìtumọ̀ wọn",
      icon: <Scroll className="w-5 h-5" />,
      content: majorOdu
    },
    {
      id: "visualization",
      title: "Odu Visualization",
      titleYoruba: "Àwòrán Odù",
      description: "Interactive visual patterns of major Odu",
      descriptionYoruba: "Àwọn àpẹẹrẹ tí ó ní ìfẹsẹ̀múlẹ̀ ti àwọn Odù pàtàkì",
      icon: <Brain className="w-5 h-5" />,
      content: []
    },
    {
      id: "language",
      title: "Yoruba Language Basics",
      titleYoruba: "Ìpilẹ̀ Èdè Yorùbá",
      description: "Essential phrases and pronunciation",
      descriptionYoruba: "Àwọn ọ̀rọ̀ pàtàkì àti bí a ṣe máa sọ wọ́n",
      icon: <Volume2 className="w-5 h-5" />,
      content: yorubaBasics
    },
    {
      id: "tools",
      title: "Tools of Divination",
      titleYoruba: "Àwọn Ohun Èlò Fífá",
      description: "Sacred instruments and their uses",
      descriptionYoruba: "Àwọn ohun èlò mímọ́ àti lílò wọn",
      icon: <Star className="w-5 h-5" />,
      content: divinationTools
    },
    {
      id: "glossary",
      title: "Sacred Glossary",
      titleYoruba: "Àtumọ̀ Àwọn Ọ̀rọ̀ Mímọ́",
      description: "Key terms and definitions",
      descriptionYoruba: "Àwọn ọ̀rọ̀ pàtàkì àti ìtumọ̀ wọn",
      icon: <Brain className="w-5 h-5" />,
      content: glossaryTerms
    },
    {
      id: "flask-cards",
      title: "Flask Odu Cards",
      titleYoruba: "Àwọn Kádì Odù Flask",
      description: "Traditional Odu cards from Flask backend",
      descriptionYoruba: "Àwọn kádì Odù ìbílẹ̀ láti Flask",
      icon: <Server className="w-5 h-5" />,
      content: []
    },
    {
      id: "complete-256",
      title: "Complete 256 Odu System",
      titleYoruba: "Àwọn Odù Ifá 256 Pípé",
      description: "Full traditional Odu system with authentic naming",
      descriptionYoruba: "Àwọn Odù Ifá 256 pípé pẹ̀lú orúkọ ìbílẹ̀",
      icon: <Database className="w-5 h-5" />,
      content: []
    },
    {
      id: "authentic-cards",
      title: "Authentic Excel Cards",
      titleYoruba: "Àwọn Kádì Excel Òtítọ́",
      description: "Traditional Odu cards generated from your Excel data",
      descriptionYoruba: "Àwọn kádì Odù ìbílẹ̀ láti Excel data rẹ",
      icon: <Sparkles className="w-5 h-5" />,
      content: []
    },
    {
      id: "offline-mode",
      title: "Offline Mode",
      titleYoruba: "Ìṣiṣẹ́ Aláìlérí",
      description: "Download resources for offline access",
      descriptionYoruba: "Gba àwọn ohun èlò sílẹ̀ fún lílo láìsí ìntánẹ́ẹ̀tì",
      icon: <Download className="w-5 h-5" />,
      content: []
    }
  ];

  const filteredGlossary = glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-spiritual-blue dark:text-sacred-gold mb-4">
            {ts("📚 Learning Center", "📚 Ile-Ẹ̀kọ́")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {ts("Deepen your understanding of Ifá wisdom and Yoruba culture", "Jẹ́ kí ó jinlẹ̀ nínú òye Ifá àti àṣà Yorùbá")}
          </p>
        </div>

        {/* Featured: Complete 256 Odu System */}
        <Card className="mb-8 bg-gradient-to-r from-amber-600 to-orange-600 border-none text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">
                    {ts("Complete 256 Odu Ifá System", "Àwọn Odù Ifá 256 Pípé")}
                  </h2>
                </div>
                <p className="text-amber-100 mb-4 max-w-2xl">
                  {ts(
                    "Explore the complete corpus of Ifá wisdom with all 256 Odu combinations. Dynamic Python-generated system with authentic Yoruba names, meanings, and spiritual guidance for the 16 major Odu Méjì and 240 minor combinations.",
                    "Ṣàwárí gbogbo ìmọ̀ Ifá pẹ̀lú àwọn àkópọ̀ Odù 256. Ètò Python tí ó ń ṣẹ̀dá pẹ̀lú àwọn orúkọ Yorùbá òtítọ́, ìtumọ̀, àti ìtọ́nisọ́nà ẹ̀mí fún 16 Odù Méjì àti àkópọ̀ 240."
                  )}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-white/20 text-white border-white/30">16 Major Odu</Badge>
                  <Badge className="bg-white/20 text-white border-white/30">240 Minor Combinations</Badge>
                  <Badge className="bg-white/20 text-white border-white/30">Authentic Pronunciation</Badge>
                  <Badge className="bg-white/20 text-white border-white/30">Bilingual Support</Badge>
                </div>
              </div>
              <div className="ml-6">
                <Link href="/odu-256">
                  <Button 
                    className="bg-white text-amber-600 hover:bg-amber-50 font-semibold px-6 py-3 text-lg"
                    size="lg"
                  >
                    {ts("Explore 256 Odu", "Ṣàwárí Odù 256")}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedModule} onValueChange={setSelectedModule} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-8 mb-8">
            {learningModules.map((module) => (
              <TabsTrigger key={module.id} value={module.id} className="flex items-center gap-2">
                {module.icon}
                <span className="hidden sm:inline">{language === 'yoruba' ? module.titleYoruba : module.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {learningModules.map((module) => (
            <TabsContent key={module.id} value={module.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {module.icon}
                    {language === 'yoruba' ? module.titleYoruba : module.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    {language === 'yoruba' ? module.descriptionYoruba : module.description}
                  </p>
                </CardHeader>
                <CardContent>
                  {module.id === 'odu' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {majorOdu.map((odu) => (
                        <Card key={odu.id} className="border-l-4 border-l-spiritual-blue">
                          <CardHeader>
                            <CardTitle className="text-lg">{odu.name}</CardTitle>
                            <Badge variant="outline">{odu.category}</Badge>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 dark:text-gray-300 mb-3">{odu.meaning}</p>
                            <blockquote className="italic text-amber-700 dark:text-amber-300 border-l-2 border-amber-300 pl-4">
                              {odu.proverb}
                            </blockquote>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {module.id === 'language' && (
                    <div className="space-y-6">
                      {yorubaBasics.map((section, index) => (
                        <div key={index}>
                          <h3 className="text-xl font-semibold mb-4 text-spiritual-blue dark:text-sacred-gold">
                            {section.category}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.phrases.map((phrase, phraseIndex) => (
                              <Card key={phraseIndex} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium text-spiritual-blue dark:text-sacred-gold">
                                        {phrase.yoruba}
                                      </p>
                                      <p className="text-gray-600 dark:text-gray-300">
                                        {phrase.english}
                                      </p>
                                    </div>
                                    {phrase.audio && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => playAudio(phrase.audio, `${index}-${phraseIndex}`)}
                                        className="ml-2"
                                      >
                                        {playingAudio === `${index}-${phraseIndex}` ? (
                                          <Volume2 className="w-4 h-4 animate-pulse" />
                                        ) : (
                                          <Play className="w-4 h-4" />
                                        )}
                                      </Button>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {module.id === 'tools' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {divinationTools.map((tool, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                          {tool.image && (
                            <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
                              <img 
                                src={tool.image} 
                                alt={tool.name}
                                className="max-h-full max-w-full object-contain rounded-lg"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-spiritual-blue/10 rounded-full flex items-center justify-center">
                                <Star className="w-4 h-4 text-spiritual-blue" />
                              </div>
                              {language === 'yoruba' ? tool.nameYoruba : tool.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 dark:text-gray-300">
                              {language === 'yoruba' ? tool.descriptionYoruba : tool.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {module.id === 'visualization' && (
                    <div className="space-y-6">
                      <OduVisualization />
                      <div className="text-center space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {language === 'yoruba' 
                            ? "Àwọn àpẹẹrẹ Odù wọ̀nyí jẹ́ àti ìlànà àtijọ́ ti àwọn ọmọ Yorùbá ti ń lò láti ìgbà àtijọ́"
                            : "These Odu patterns are based on traditional Yoruba divination symbols used for centuries"
                          }
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {language === 'yoruba'
                            ? "Àwọn ìlà kíkọ́ àti pínyà ni wọ́n ń lo láti ṣàpèjúwe àwọn agbára ẹ̀mí"
                            : "Solid and broken lines represent different spiritual energies and meanings"
                          }
                        </p>
                      </div>
                    </div>
                  )}

                  {module.id === 'glossary' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-6">
                        <Search className="w-5 h-5 text-gray-400" />
                        <Input
                          placeholder={ts("Search terms...", "Wá àwọn ọ̀rọ̀...")}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="max-w-sm"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredGlossary.map((term, index) => (
                          <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-spiritual-blue dark:text-sacred-gold mb-2">
                                {term.term}
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300">
                                {language === 'yoruba' ? term.definitionYoruba : term.definition}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {module.id === 'flask-cards' && (
                    <div className="space-y-6">
                      <FlaskOduCards />
                    </div>
                  )}

                  {module.id === 'complete-256' && (
                    <div className="space-y-6">
                      <Complete256OduSystem />
                    </div>
                  )}

                  {module.id === 'authentic-cards' && (
                    <div className="space-y-6">
                      <AuthenticOduCards />
                    </div>
                  )}

                  {module.id === 'offline-mode' && (
                    <div className="space-y-6">
                      <OfflineMode />
                    </div>
                  )}

                  {module.id === 'introduction' && (
                    <div className="space-y-6">
                      <Card className="border-l-4 border-l-amber-500">
                        <CardHeader>
                          <CardTitle>{ts("What is Ifá?", "Kí ni Ifá?")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {ts(
                              "Ifá is an ancient Yoruba system of divination and spiritual guidance that connects practitioners with divine wisdom through the Oracle of Òrúnmìlà.",
                              "Ifá jẹ́ ẹ̀tọ́ àtijọ́ Yorùbá fún fífá àti ìtọ́nisọ́nà ẹ̀mí tí ó so àwọn oníṣe pọ̀ mọ́ ọgbọ́n òrìṣà nípasẹ̀ Òrúnmìlà."
                            )}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                              <BookOpen className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                              <h4 className="font-semibold">{ts("Wisdom", "Ọgbọ́n")}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {ts("Ancient knowledge", "Ìmọ̀ àtijọ́")}
                              </p>
                            </div>
                            <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                              <Users className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                              <h4 className="font-semibold">{ts("Community", "Àwùjọ")}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {ts("Spiritual fellowship", "Ìfẹ́ ẹ̀mí")}</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <Star className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                              <h4 className="font-semibold">{ts("Guidance", "Ìtọ́nisọ́nà")}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {ts("Divine direction", "Ìfàhàn òrìṣà")}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {module.id === 'cosmology' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-l-4 border-l-sacred-gold">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-sacred-gold" />
                              Olódùmarè
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 dark:text-gray-300">
                              {ts(
                                "The Supreme Being, source of all existence and divine authority",
                                "Ọlọ́run Gíga, orísun gbogbo ohun alààyè àti àṣẹ òrìṣà"
                              )}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-spiritual-blue">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Brain className="w-5 h-5 text-spiritual-blue" />
                              Orí
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 dark:text-gray-300">
                              {ts(
                                "Personal destiny, inner head, guardian spirit",
                                "Ìpínlẹ̀ ẹni kọ̀ọ̀kan, orí inú, ẹ̀mí asọ́"
                              )}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Learning;