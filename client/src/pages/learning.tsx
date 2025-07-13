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
import CosmologyProgressTracker from '@/components/cosmology-progress-tracker';

import OfflineMode from '@/components/offline-mode';
import { WisdomSection } from '@/components/wisdom-section';

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

  console.log("Learning modules loading...");
  
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
          text: "Ifá is a sacred Yoruba spiritual and philosophical system rooted in the divine teachings of Òrúnmìlà, the Orisha of wisdom, foresight, and destiny. It is more than divination — it is a holistic guide to living in harmony with Ìwà Pẹ̀lẹ́ (gentle character), the earth, and ancestral wisdom.",
          textYoruba: "Ifá jẹ́ ẹ̀tọ́ àtijọ́ Yorùbá fún fífá àti ìtọ́nisọ́nà ẹ̀mí tí ó so àwọn oníṣe pọ̀ mọ́ ọgbọ́n òrìṣà nípasẹ̀ Òrúnmìlà."
        },
        {
          title: "Core Elements of Ifá",
          titleYoruba: "Àwọn Ẹ̀yà Pàtàkì Ifá",
          elements: [
            {
              name: "Wisdom (Ọgbọ́n)",
              description: "Timeless knowledge preserved through oral traditions and sacred verses (Ẹsẹ Ifá).",
              nameYoruba: "Ọgbọ́n",
              descriptionYoruba: "Ìmọ̀ àtijọ́ tí a pa mọ́ nípasẹ̀ àṣà ẹnu àti àwọn ẹsẹ mímọ́ (Ẹsẹ Ifá)."
            },
            {
              name: "Guidance (Ìtọ́sọ́nà)",
              description: "Direction from the divine to help navigate life's crossroads through the Odu Ifá.",
              nameYoruba: "Ìtọ́sọ́nà",
              descriptionYoruba: "Ìtọ́sọ́nà láti ọ̀run láti ṣe ìrànlọ́wọ́ nínú àwọn ọ̀nà ayé nípasẹ̀ Odù Ifá."
            },
            {
              name: "Character (Ìwà Pẹ̀lẹ́)",
              description: "The highest virtue in Ifá, emphasizing patience, humility, and good conduct.",
              nameYoruba: "Ìwà Pẹ̀lẹ́",
              descriptionYoruba: "Ìwà tí ó ga jù nínú Ifá, tí ó tẹnu mọ́ sùúrù, ìrẹ̀lẹ̀, àti ìwà rere."
            },
            {
              name: "Community (Àjọṣe)",
              description: "Connection to lineage, elders, initiates, and the global Ifá family.",
              nameYoruba: "Àjọṣe",
              descriptionYoruba: "Àsopọ̀ pẹ̀lú ìdílé, àwọn àgbà, àwọn ìyàwó, àti ẹbí Ifá gbogbo ayé."
            },
            {
              name: "Destiny (Àyànmọ̀)",
              description: "The personal spiritual path every soul chooses before birth — revealed and aligned through Ifá divination.",
              nameYoruba: "Àyànmọ̀",
              descriptionYoruba: "Ọ̀nà ẹ̀mí tí gbogbo ẹ̀mí yan kí ó tó bí — tí a fihàn àti tí a mu pọ̀ nípasẹ̀ fífá Ifá."
            }
          ]
        },
        {
          title: "Daily Practice in Ifá",
          titleYoruba: "Ìṣe Ojoojúmọ́ nínú Ifá",
          practices: [
            {
              name: "Ọ̀rọ̀ Òní (Word of the Day)",
              description: "A proverb or Ẹsẹ Ifá with reflection.",
              nameYoruba: "Ọ̀rọ̀ Òní",
              descriptionYoruba: "Òwe tàbí Ẹsẹ Ifá pẹ̀lú ìrònú."
            },
            {
              name: "Morning Salutation",
              description: "Short invocations to Òrúnmìlà or the ancestors (Egúngún).",
              nameYoruba: "Ìkíni Òwúrọ̀",
              descriptionYoruba: "Àwọn ìpè kúkúrú sí Òrúnmìlà tàbí àwọn baba (Egúngún)."
            },
            {
              name: "Character Prompt",
              description: "How can I embody Ìwà Pẹ̀lẹ́ today?",
              nameYoruba: "Ìbéèrè Ìwà",
              descriptionYoruba: "Báwo ni mo ṣe lè ṣe àfihàn Ìwà Pẹ̀lẹ́ lónìí?"
            }
          ]
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
        },
        {
          title: "The Spiritual Universe Structure",
          titleYoruba: "Ètò Àgbáyé Ẹ̀mí",
          text: "The Yorùbá cosmological framework reveals five interconnected realms that form the complete spiritual universe:",
          textYoruba: "Ìlànà àgbáyé Yorùbá fihàn àwọn àgbáyé márùn-ún tí wọ́n so ara wọn pọ̀ tí wọ́n sì dá àgbáyé ẹ̀mí pípé:",
          cosmologyStructure: [
            {
              realm: "ÒRUN (Heavenly Realm)",
              realmYoruba: "ÒRUN (Àgbáyé Ọ̀run)",
              description: "The divine heaven where Olódùmarè resides with the Òrìṣà and blessed ancestors",
              descriptionYoruba: "Ọ̀run mímọ́ níbi tí Olódùmarè ń gbé pẹ̀lú àwọn Òrìṣà àti àwọn egun ìbùkún"
            },
            {
              realm: "Àjàlá-Òrun (Gate of Rebirth)",
              realmYoruba: "Àjàlá-Òrun (Ẹnu-ọ̀nà Àtúnbí)",
              description: "The celestial portal where souls choose their destiny before entering earthly life",
              descriptionYoruba: "Àlà ọ̀run níbi tí àwọn ẹ̀mí ti ń yan àyànmọ̀ wọn kí wọ́n tó wọ ayé"
            },
            {
              realm: "Ayé (Earthly Realm)",
              realmYoruba: "Ayé (Àgbáyé Ilẹ̀)",
              description: "The physical world where humans live, learn, and fulfill their spiritual purpose",
              descriptionYoruba: "Àgbáyé tí àwọn ènìyàn ń gbé, tí wọ́n ń kọ́, tí wọ́n sì ń mú ète ẹ̀mí wọn ṣẹ"
            },
            {
              realm: "Ilẹ̀-Ọkùn (Oceanic Abyss)",
              realmYoruba: "Ilẹ̀-Ọkùn (Ọ̀gbun Òkun)",
              description: "The deep oceanic realm of Olókun, source of wisdom, wealth, and primordial waters",
              descriptionYoruba: "Àgbáyé òkun jíjìn ti Olókun, orísun ọgbọ́n, ọrọ̀, àti omi àtètè"
            },
            {
              realm: "Ọ̀nà (Ancestral Paths)",
              realmYoruba: "Ọ̀nà (Àwọn Ọ̀nà Àwọn Baba)",
              description: "The sacred pathways connecting all realms, traveled by ancestors and spiritual messengers",
              descriptionYoruba: "Àwọn ọ̀nà mímọ́ tí ó so gbogbo àgbáyé pọ̀, tí àwọn baba àti àwọn ìránṣẹ́ ẹ̀mí ń rìn"
            }
          ]
        },
        {
          title: "Spirits by Domain",
          titleYoruba: "Àwọn Ẹ̀mí Gẹ́gẹ́ bí Agbègbè",
          text: "The spiritual universe is populated by different categories of beings, each serving specific roles in maintaining cosmic balance:",
          textYoruba: "Àgbáyé ẹ̀mí kún fún oríṣìí àwọn ẹ̀dá, ọ̀kọ̀ọ̀kan ń ṣe iṣẹ́ pàtó nínú dídúró ìwọ̀ntúnwọ̀sì àgbáyé:",
          spiritDomains: [
            {
              domain: "Irúnmalẹ̀ (Light Beings)",
              domainYoruba: "Irúnmalẹ̀ (Àwọn Ẹ̀mí Ìmọ́lẹ̀)",
              description: "Divine light beings who emanate pure spiritual energy and guide humanity toward enlightenment",
              descriptionYoruba: "Àwọn ẹ̀mí ìmọ́lẹ̀ òrìṣà tí wọ́n ń tan agbára ẹ̀mí mímọ́ tí wọ́n sì ń darí ọmọ ènìyàn sí ìmọ̀lára",
              spirits: ["Ọbàtálá", "Ọ̀ṣun", "Ṣàngó"]
            },
            {
              domain: "Ajogun (Chaos Forces)",
              domainYoruba: "Ajogun (Àwọn Agbára Rúdurùdu)",
              description: "Challenging forces that test human character and spiritual growth through obstacles and trials",
              descriptionYoruba: "Àwọn agbára nira tí wọ́n ń dán ìwà ọmọ ènìyàn àti ìdàgbàsókè ẹ̀mí wò nípasẹ̀ àwọn ìdiwọ́ àti ìdánwò",
              spirits: ["Ìyà", "Àrùn", "Òfò"]
            },
            {
              domain: "Ẹgbẹ́ Ọ̀run (Ancestors)",
              domainYoruba: "Ẹgbẹ́ Ọ̀run (Àwọn Baba)",
              description: "Elevated souls of the departed who watch over their descendants and provide wisdom from the spiritual realm",
              descriptionYoruba: "Àwọn ẹ̀mí tí wọ́n ti gbéga ti àwọn tí wọ́n ti kú tí wọ́n ń ṣọ́ àwọn ọmọ wọn tí wọ́n sì ń fún ni ọgbọ́n láti àgbáyé ẹ̀mí",
              spirits: ["Ará Òrun", "Egúngún"]
            }
          ]
        },
        {
          title: "Cosmic Laws",
          titleYoruba: "Àwọn Òfin Àgbáyé",
          text: "The spiritual universe operates according to fundamental laws that govern the flow of divine energy and human interaction with the sacred:",
          textYoruba: "Àgbáyé ẹ̀mí ń ṣiṣẹ́ gẹ́gẹ́ bí àwọn òfin ìpìlẹ̀ tí ó ń ṣàkóso ṣíṣàn agbára òrìṣà àti ìbáṣepọ̀ ọmọ ènìyàn pẹ̀lú ohun mímọ́:",
          cosmicLaws: [
            {
              law: "Àṣẹ",
              lawYoruba: "Àṣẹ",
              meaning: "Divine authority flows through spoken words",
              meaningYoruba: "Àṣẹ òrìṣà ń sàn nípasẹ̀ àwọn ọ̀rọ̀ tí a sọ",
              description: "The sacred force that manifests divine will through conscious speech and intention",
              descriptionYoruba: "Agbára mímọ́ tí ó ń ṣàfihàn ìfẹ́ òrìṣà nípasẹ̀ ọ̀rọ̀ àti èrò"
            },
            {
              law: "Ètùtù",
              lawYoruba: "Ètùtù",
              meaning: "Every action has equal reaction (spiritual karma)",
              meaningYoruba: "Gbogbo ìṣe ní ìdáhùn dọ́gba (ìpadàbọ̀ ẹ̀mí)",
              description: "The cosmic principle ensuring all actions return to their source with equal measure",
              descriptionYoruba: "Ìlànà àgbáyé tí ó ń rí dájú pé gbogbo ìṣe dá padà sí orísun rẹ̀ pẹ̀lú ìwọ̀n kan náà"
            },
            {
              law: "Ìwà",
              lawYoruba: "Ìwà",
              meaning: "Good character attracts Orisha blessings",
              meaningYoruba: "Ìwà rere ń fa ìbùkún òrìṣà",
              description: "The fundamental law that righteous conduct aligns one with divine favor and protection",
              descriptionYoruba: "Òfin ìpìlẹ̀ pé ìṣe òtítọ́ ń mú ọmọ ènìyàn bá ojúrere àti ààbò òrìṣà mu"
            }
          ]
        },
        {
          title: "Discover Your Realm",
          titleYoruba: "Ṣàwárí Àgbáyé Rẹ",
          text: "Take this spiritual assessment to discover which realm of the Yorùbá cosmology you're most aligned with:",
          textYoruba: "Ṣe àyẹ̀wò ẹ̀mí yìí láti ṣàwárí àgbáyé wo nínú àgbáyé Yorùbá tí o bá mu jùlọ:",
          realmQuiz: [
            {
              question: "You prefer solving conflicts",
              questionYoruba: "O fẹ́ràn yanju àwọn ìjà",
              realm: "Ayé (Earthly Realm)",
              realmYoruba: "Ayé (Àgbáyé Ilẹ̀)",
              description: "You are grounded in practical wisdom and worldly matters",
              descriptionYoruba: "O dá lórí ọgbọ́n tó ṣe pàtàkì àti àwọn ọ̀rọ̀ ayé"
            },
            {
              question: "You dream of ancestors often",
              questionYoruba: "O máa ń lá àlá àwọn baba nígbà gbogbo",
              realm: "Ọ̀nà (Ancestral Paths)",
              realmYoruba: "Ọ̀nà (Àwọn Ọ̀nà Àwọn Baba)",
              description: "You have a strong connection to spiritual lineage and inherited wisdom",
              descriptionYoruba: "O ní ìbáṣepọ̀ tó lágbára pẹ̀lú ìran ẹ̀mí àti ọgbọ́n tí a jogún"
            },
            {
              question: "You crave spiritual knowledge",
              questionYoruba: "O ń fẹ́ ìmọ̀ ẹ̀mí",
              realm: "Òrun (Heavenly Realm)",
              realmYoruba: "Òrun (Àgbáyé Ọ̀run)",
              description: "You are naturally drawn to divine wisdom and higher consciousness",
              descriptionYoruba: "O ní ìfẹ́ àdánidá sí ọgbọ́n òrìṣà àti ìmọ̀lára gíga"
            },
            {
              question: "You feel most peaceful near water",
              questionYoruba: "O ní àlàáfíà jùlọ ní ẹ̀bá omi",
              realm: "Ilẹ̀-Ọkùn (Oceanic Abyss)",
              realmYoruba: "Ilẹ̀-Ọkùn (Ọ̀gbun Òkun)",
              description: "You resonate with deep emotional wisdom and primordial energies",
              descriptionYoruba: "O bá ọgbọ́n ìmọ̀lára jíjìn àti agbára àtètè mu"
            },
            {
              question: "You often contemplate your life purpose",
              questionYoruba: "O máa ń ronú nípa ète ayé rẹ",
              realm: "Àjàlá-Òrun (Gate of Rebirth)",
              realmYoruba: "Àjàlá-Òrun (Ẹnu-ọ̀nà Àtúnbí)",
              description: "You are deeply connected to destiny and soul purpose",
              descriptionYoruba: "O ní ìbáṣepọ̀ jíjìn pẹ̀lú àyànmọ̀ àti ète ẹ̀mí"
            }
          ]
        }
      ]
    },
    {
      id: "wisdom",
      title: "Wisdom (Ancient Knowledge)",
      titleYoruba: "Ọgbọ́n (Ìmọ̀ Àtijọ́)",
      description: "Timeless wisdom from ancient Yoruba civilization",
      descriptionYoruba: "Ọgbọ́n àìlópin láti ọmọ Yorùbá àtijọ́",
      icon: <Brain className="w-5 h-5" />,
      content: [
        {
          title: "Ancient Knowledge System",
          titleYoruba: "Ètò Ìmọ̀ Àtijọ́",
          text: "Ifá is one of the oldest systems of knowledge known to humanity, rooted in the Yoruba civilization of West Africa. Long before written records, Ifá preserved its sacred teachings through oral chants called Ẹsẹ Ifá, passed from Babaláwo to apprentice for generations.",
          textYoruba: "Ifá jẹ́ ọ̀kan lára àwọn ètò ìmọ̀ àtijọ́ tí ènìyàn mọ̀, tí ó gbẹsẹ̀ sí ọmọ Yorùbá ní Ìwọ̀ oorùn Áfríkà. Kí àwọn ìwé tó dé, Ifá ti pa àwọn ẹ̀kọ́ rẹ̀ mọ́ nípasẹ̀ àwọn orin mímọ́ tí a ń pè ní Ẹsẹ Ifá."
        },
        {
          title: "Historical Roots",
          titleYoruba: "Àwọn Gbòngbò Ìtàn",
          historicalPoints: [
            {
              point: "Ifá emerged from Ilé-Ifẹ̀, the spiritual heart of the Yoruba people.",
              pointYoruba: "Ifá ti Ilé-Ifẹ̀ jáde, ọkàn ẹ̀mí àwọn ọmọ Yorùbá.",
              highlight: "Ilé-Ifẹ̀"
            },
            {
              point: "Revealed by Òrúnmìlà, the Orisha of wisdom and destiny.",
              pointYoruba: "Òrúnmìlà ló fihàn, Òrìṣà ọgbọ́n àti àyànmọ̀.",
              highlight: "Òrúnmìlà"
            },
            {
              point: "Wisdom is encoded in 256 sacred patterns called Odu Ifá.",
              pointYoruba: "Ọgbọ́n wà nínú àwọn àpẹẹrẹ mímọ́ 256 tí a ń pè ní Odù Ifá.",
              highlight: "Odu Ifá"
            }
          ]
        },
        {
          title: "The Wisdom of Ifá",
          titleYoruba: "Ọgbọ́n Ifá",
          wisdomPrinciples: [
            {
              principle: "Ètò àṣẹ",
              meaning: "The law of spiritual cause and effect.",
              meaningYoruba: "Òfin ìdí àti èsì ẹ̀mí."
            },
            {
              principle: "Ìwà lẹ̀wà",
              meaning: "Character is the ultimate beauty.",
              meaningYoruba: "Ìwà ni ẹwà tí ó ga jù."
            },
            {
              principle: "àṣẹ",
              meaning: "Nature and all things carry àṣẹ – the sacred force of life.",
              meaningYoruba: "Àdáyébá àti gbogbo nǹkan ló ní àṣẹ – agbára mímọ́ ẹ̀mí.",
              highlight: "àṣẹ"
            }
          ],
          sacredQuote: "Ìwà Pẹ̀lẹ́ ni oríṣà ń gbà",
          sacredQuoteTranslation: "It is good character the Orisha accepts."
        },
        {
          title: "Why Ancient Wisdom Still Matters",
          titleYoruba: "Ìdí Tí Ọgbọ́n Àtijọ́ Ṣe Ṣe Pàtàkì Síbẹ̀",
          modernRelevance: "Even in today's digital world, Ifá offers answers to timeless questions:",
          modernRelevanceYoruba: "Bí ó tilẹ̀ jẹ́ pé wa ń gbé ní àsìkò dijítálì, Ifá ṣì ń fún wa ní ìdáhùn sí àwọn ìbéèrè àìlópin:",
          timelessQuestions: [
            {
              question: "How should I live?",
              questionYoruba: "Báwo ni mo ṣe gbé ayé mi?"
            },
            {
              question: "How do I align with my purpose?",
              questionYoruba: "Báwo ni mo ṣe lè bá èrò mi mu?"
            },
            {
              question: "How can I resolve conflict and restore balance?",
              questionYoruba: "Báwo ni mo ṣe lè yanjú àríyànjiyàn kí n sì mú ìwọ̀ntúnwọ̀nsí padà?"
            }
          ],
          conclusion: "Ifá wisdom encourages reflection, connection, and spiritual clarity in everyday life.",
          conclusionYoruba: "Ọgbọ́n Ifá ń gba ìrònú, àsopọ̀, àti ìmọ̀ ẹ̀mí níyànjú nínú ìgbé ayé ojoojúmọ́."
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
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 mb-8">
            {learningModules.map((module) => (
              <TabsTrigger key={module.id} value={module.id} className="flex items-center gap-2 text-xs">
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
                  {module.id === 'introduction' && (
                    <div className="space-y-8">
                      {module.content.map((section: any, index: number) => (
                        <div key={index} className="space-y-6">
                          {section.text && (
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-lg border-l-4 border-l-amber-500">
                              <h3 className="text-xl font-semibold mb-3 text-amber-800 dark:text-amber-200">
                                🌿 {language === 'yoruba' ? section.titleYoruba : section.title}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {language === 'yoruba' ? section.textYoruba : section.text}
                              </p>
                            </div>
                          )}
                          
                          {section.elements && (
                            <div className="space-y-4">
                              <h3 className="text-xl font-semibold mb-4 text-amber-800 dark:text-amber-200">
                                ✨ {language === 'yoruba' ? section.titleYoruba : section.title}
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {section.elements.map((element: any, elemIndex: number) => (
                                  <Card key={elemIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-l-4 border-l-amber-500">
                                    <CardContent className="p-4">
                                      <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div>
                                          <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                                            {language === 'yoruba' ? element.nameYoruba : element.name}
                                          </h4>
                                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            {language === 'yoruba' ? element.descriptionYoruba : element.description}
                                          </p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {section.practices && (
                            <div className="space-y-4">
                              <h3 className="text-xl font-semibold mb-4 text-amber-800 dark:text-amber-200">
                                🧭 {language === 'yoruba' ? section.titleYoruba : section.title}
                              </h3>
                              <div className="space-y-3">
                                {section.practices.map((practice: any, practiceIndex: number) => (
                                  <Card key={practiceIndex} className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-l-blue-500">
                                    <CardContent className="p-4">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                          <BookOpen className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                                            {language === 'yoruba' ? practice.nameYoruba : practice.name}
                                          </h4>
                                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            {language === 'yoruba' ? practice.descriptionYoruba : practice.description}
                                          </p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {module.id === 'cosmology' && (
                    <div className="space-y-8">
                      {module.content.map((section: any, index: number) => (
                        <div key={index} className="space-y-6">
                          {section.text && !section.cosmologyStructure && (
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border-l-4 border-l-purple-500">
                              <h3 className="text-xl font-semibold mb-3 text-purple-800 dark:text-purple-200">
                                🌌 {language === 'yoruba' ? section.titleYoruba : section.title}
                              </h3>
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {language === 'yoruba' ? section.textYoruba : section.text}
                              </p>
                            </div>
                          )}
                          
                          {section.cosmologyStructure && (
                            <div className="space-y-6">
                              <CosmologyProgressTracker 
                                sectionId="spiritual_universe"
                                sectionTitle={language === 'yoruba' ? section.titleYoruba : section.title}
                              />
                              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border-l-4 border-l-indigo-500">
                                <h3 className="text-xl font-semibold mb-3 text-indigo-800 dark:text-indigo-200">
                                  ✨ {language === 'yoruba' ? section.titleYoruba : section.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                  {language === 'yoruba' ? section.textYoruba : section.text}
                                </p>
                                
                                <div className="space-y-4">
                                  {section.cosmologyStructure.map((realm: any, realmIndex: number) => (
                                    <div key={realmIndex} className="relative">
                                      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-l-4 border-l-spiritual-blue">
                                        <CardContent className="p-4">
                                          <div className="flex items-center gap-3 mb-2">
                                            <div className="w-3 h-3 bg-spiritual-blue rounded-full"></div>
                                            <h4 className="font-bold text-spiritual-blue dark:text-sacred-gold text-lg">
                                              {language === 'yoruba' ? realm.realmYoruba : realm.realm}
                                            </h4>
                                          </div>
                                          <p className="text-gray-600 dark:text-gray-400 text-sm pl-6">
                                            {language === 'yoruba' ? realm.descriptionYoruba : realm.description}
                                          </p>
                                        </CardContent>
                                      </Card>
                                      
                                      {realmIndex < section.cosmologyStructure.length - 1 && (
                                        <div className="flex justify-center my-2">
                                          <div className="w-0.5 h-4 bg-gradient-to-b from-spiritual-blue to-sacred-gold"></div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {section.spiritDomains && (
                            <div className="space-y-6">
                              <CosmologyProgressTracker 
                                sectionId="spirit_domains"
                                sectionTitle={language === 'yoruba' ? section.titleYoruba : section.title}
                              />
                              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-lg border-l-4 border-l-emerald-500">
                                <h3 className="text-xl font-semibold mb-3 text-emerald-800 dark:text-emerald-200">
                                  ✨ {language === 'yoruba' ? section.titleYoruba : section.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                  {language === 'yoruba' ? section.textYoruba : section.text}
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {section.spiritDomains.map((domain: any, domainIndex: number) => (
                                    <Card key={domainIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-l-4 border-l-emerald-500">
                                      <CardContent className="p-4">
                                        <div className="mb-3">
                                          <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-lg mb-2">
                                            {language === 'yoruba' ? domain.domainYoruba : domain.domain}
                                          </h4>
                                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                                            {language === 'yoruba' ? domain.descriptionYoruba : domain.description}
                                          </p>
                                        </div>
                                        <div className="space-y-2">
                                          <h5 className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
                                            {language === 'yoruba' ? 'Àwọn Ẹ̀mí:' : 'Spirits:'}
                                          </h5>
                                          <div className="flex flex-wrap gap-2">
                                            {domain.spirits.map((spirit: string, spiritIndex: number) => (
                                              <span key={spiritIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100">
                                                {spirit}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {section.cosmicLaws && (
                            <div className="space-y-6">
                              <CosmologyProgressTracker 
                                sectionId="cosmic_laws"
                                sectionTitle={language === 'yoruba' ? section.titleYoruba : section.title}
                              />
                              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-6 rounded-lg border-l-4 border-l-amber-500">
                                <h3 className="text-xl font-semibold mb-3 text-amber-800 dark:text-amber-200">
                                  ⚖️ {language === 'yoruba' ? section.titleYoruba : section.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                  {language === 'yoruba' ? section.textYoruba : section.text}
                                </p>
                                
                                <div className="space-y-4">
                                  {section.cosmicLaws.map((law: any, lawIndex: number) => (
                                    <Card key={lawIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-l-4 border-l-amber-500">
                                      <CardContent className="p-5">
                                        <div className="flex items-start gap-4">
                                          <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                                          </div>
                                          <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                              <h4 className="font-bold text-amber-700 dark:text-amber-300 text-lg">
                                                {language === 'yoruba' ? law.lawYoruba : law.law}
                                              </h4>
                                            </div>
                                            <p className="text-amber-600 dark:text-amber-400 font-medium mb-2 italic">
                                              "{language === 'yoruba' ? law.meaningYoruba : law.meaning}"
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                              {language === 'yoruba' ? law.descriptionYoruba : law.description}
                                            </p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {section.realmQuiz && (
                            <div className="space-y-6">
                              <CosmologyProgressTracker 
                                sectionId="realm_quiz"
                                sectionTitle={language === 'yoruba' ? section.titleYoruba : section.title}
                              />
                              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border-l-4 border-l-purple-500">
                                <h3 className="text-xl font-semibold mb-3 text-purple-800 dark:text-purple-200">
                                  🔮 {language === 'yoruba' ? section.titleYoruba : section.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                  {language === 'yoruba' ? section.textYoruba : section.text}
                                </p>
                                
                                <div className="space-y-4">
                                  {section.realmQuiz.map((quiz: any, quizIndex: number) => (
                                    <Card key={quizIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
                                      <CardContent className="p-5">
                                        <div className="flex items-start gap-4">
                                          <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">
                                              {quizIndex + 1}
                                            </span>
                                          </div>
                                          <div className="flex-1">
                                            <div className="mb-3">
                                              <h4 className="font-semibold text-purple-700 dark:text-purple-300 text-base mb-1">
                                                {language === 'yoruba' ? quiz.questionYoruba : quiz.question}
                                              </h4>
                                              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                                                ➜ {language === 'yoruba' ? quiz.realmYoruba : quiz.realm}
                                              </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                              {language === 'yoruba' ? quiz.descriptionYoruba : quiz.description}
                                            </p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                                
                                <div className="mt-6 p-4 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
                                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                                    {language === 'yoruba' ? '✨ Ìtọ́nisọ́nà' : '✨ Spiritual Guidance'}
                                  </h4>
                                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                                    {language === 'yoruba' 
                                      ? 'Gbogbo àgbáyé ló wà nínú wa. Àyẹ̀wò yìí ń ṣe ìtọ́nisọ́nà fún ọ láti mọ ibi tí ẹ̀mí rẹ gbé lé.' 
                                      : 'All realms exist within us. This assessment helps guide you to understand where your spirit feels most at home.'
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {module.id === 'wisdom' && <WisdomSection />}

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
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-spiritual-blue dark:text-sacred-gold mb-2">
                          {ts("Complete Odu Ifá Visualization System", "Ètò Àwòrán Odù Ifá Pípé")}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {ts("Explore both the 16 major Odu and the complete 256 Odu system with interactive visualization and search capabilities", 
                              "Ṣàwárí méjìlá Odù pàtàkì àti àwọn Odù 256 pípé pẹ̀lú àwòrán tí ó ní ìfẹsẹ̀múlẹ̀ àti agbára wíwá")}
                        </p>
                      </div>
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
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold text-spiritual-blue">Flask Odu Cards System</h3>
                        <p className="text-gray-600">Authentic traditional cards from Flask backend</p>
                      </div>
                      <FlaskOduCards />
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