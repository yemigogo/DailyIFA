import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Pause, Volume2, Crown, Zap, Waves, Wind, Hammer, Sun, Heart, TreePine, Trophy, Mountain, Leaf, Fish, Moon, Shield } from 'lucide-react';

interface OrishaCharacter {
  id: string;
  name: string;
  nameYoruba: string;
  title: string;
  titleYoruba: string;
  domain: string;
  domainYoruba: string;
  colors: string[];
  symbols: string[];
  personality: string;
  personalityYoruba: string;
  powers: string[];
  powersYoruba: string[];
  audioUrl?: string;
  hasAuthentic: boolean;
  characterTraits: {
    strength: number;
    wisdom: number;
    compassion: number;
    power: number;
    mystery: number;
  };
  animationStyle: string;
  icon: React.ReactNode;
}

const OrishaCharacterProfiles: React.FC = () => {
  const { language, ts } = useLanguage();
  const [selectedOrisha, setSelectedOrisha] = useState<string>('orunmila');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [animationActive, setAnimationActive] = useState<boolean>(false);

  const playAudio = (audioUrl: string, id: string) => {
    if (isPlaying === id) {
      setIsPlaying(null);
      return;
    }
    setIsPlaying(id);
    const audio = new Audio(audioUrl);
    audio.play();
    audio.onended = () => setIsPlaying(null);
  };

  const orishaCharacters: OrishaCharacter[] = [
    {
      id: 'orunmila',
      name: 'Òrúnmìlà',
      nameYoruba: 'Òrúnmìlà',
      title: 'Oracle of Ifá',
      titleYoruba: 'Ẹlẹ́rìí Ìpín',
      domain: 'Divination & Wisdom',
      domainYoruba: 'Fífá àti Ọgbọ́n',
      colors: ['green', 'yellow'],
      symbols: ['palm nuts', 'divination chain', 'staff'],
      personality: 'Wise, patient, all-knowing oracle who guides humanity through divine wisdom',
      personalityYoruba: 'Ọlọ́gbọ́n, onísùúrù, mọ̀-gbogbo-nǹkan tí ó ń darí ènìyàn nípasẹ̀ ọgbọ́n òrìṣà',
      powers: ['Divination', 'Prophecy', 'Spiritual Guidance', 'Destiny Reading'],
      powersYoruba: ['Fífá', 'Àsọtẹ́lẹ̀', 'Ìtọ́nisọ́nà Ẹ̀mí', 'Kíka Ìpín'],
      audioUrl: '/static/audio/pronunciation/orunmila_oriki_authentic.mp3',
      hasAuthentic: true,
      characterTraits: {
        strength: 85,
        wisdom: 100,
        compassion: 95,
        power: 90,
        mystery: 100
      },
      animationStyle: 'gentle-glow',
      icon: <Crown className="w-6 h-6 text-yellow-600" />
    },
    {
      id: 'sango',
      name: 'Ṣàngó',
      nameYoruba: 'Ṣàngó',
      title: 'King of Thunder',
      titleYoruba: 'Ọba Àrá',
      domain: 'Thunder & Justice',
      domainYoruba: 'Àrá àti Òdodo',
      colors: ['red', 'white'],
      symbols: ['double axe', 'lightning', 'castle'],
      personality: 'Powerful, passionate, just ruler with fiery temperament and strong sense of justice',
      personalityYoruba: 'Alágbára, onífẹ̀ẹ́, ọba òdodo pẹ̀lú ìwà iná àti òye òdodo líle',
      powers: ['Thunder Control', 'Lightning Strikes', 'Justice Delivery', 'Royal Authority'],
      powersYoruba: ['Ìṣàkóso Àrá', 'Mọ̀nàmọ́ná', 'Fífún Òdodo', 'Àṣẹ Ọba'],
      audioUrl: '/static/audio/pronunciation/sango_oriki_authentic.mp3',
      hasAuthentic: true,
      characterTraits: {
        strength: 100,
        wisdom: 80,
        compassion: 70,
        power: 100,
        mystery: 75
      },
      animationStyle: 'lightning-pulse',
      icon: <Zap className="w-6 h-6 text-red-600" />
    },
    {
      id: 'yemoja',
      name: 'Yemọja',
      nameYoruba: 'Yemọja',
      title: 'Mother of Waters',
      titleYoruba: 'Ìyá Omi',
      domain: 'Motherhood & Rivers',
      domainYoruba: 'Ìyàbí àti Odò',
      colors: ['blue', 'white', 'silver'],
      symbols: ['cowrie shells', 'fish', 'flowing water'],
      personality: 'Nurturing, protective mother figure with deep compassion and healing powers',
      personalityYoruba: 'Onítọ́jú, aláàbò ìyá pẹ̀lú àánú jinlẹ̀ àti agbára ìwòsàn',
      powers: ['Water Healing', 'Fertility Blessings', 'Emotional Cleansing', 'Maternal Protection'],
      powersYoruba: ['Ìwòsàn Omi', 'Ìbùkún Ọmọbíbí', 'Ìwẹ̀nù Ẹ̀dùn', 'Àbò Ìyá'],
      audioUrl: '/static/audio/pronunciation/yemoja.mp3',
      hasAuthentic: true,
      characterTraits: {
        strength: 85,
        wisdom: 90,
        compassion: 100,
        power: 85,
        mystery: 80
      },
      animationStyle: 'water-flow',
      icon: <Waves className="w-6 h-6 text-blue-600" />
    },
    {
      id: 'oya',
      name: 'Ọya',
      nameYoruba: 'Ọya',
      title: 'Goddess of Wind',
      titleYoruba: 'Òrìṣà Afẹ́fẹ́',
      domain: 'Wind & Ancestors',
      domainYoruba: 'Afẹ́fẹ́ àti Eégún',
      colors: ['maroon', 'burgundy', 'purple'],
      symbols: ['whirlwind', 'lightning', 'marketplace'],
      personality: 'Fierce, independent warrior with power over storms and connection to ancestors',
      personalityYoruba: 'Ológun, aládáa-ni-òun pẹ̀lú agbára lórí ìjì àti ìbásọ àwọn eégún',
      powers: ['Storm Control', 'Ancestral Communication', 'Tornado Creation', 'Market Protection'],
      powersYoruba: ['Ìṣàkóso Ìjì', 'Ìbánisọ̀rọ̀ Eégún', 'Ṣíṣẹ̀dá Ẹ̀fúùfù', 'Àbò Ọjà'],
      audioUrl: '/static/audio/pronunciation/oya.mp3',
      hasAuthentic: true,
      characterTraits: {
        strength: 95,
        wisdom: 85,
        compassion: 75,
        power: 95,
        mystery: 90
      },
      animationStyle: 'wind-swirl',
      icon: <Wind className="w-6 h-6 text-purple-600" />
    },
    {
      id: 'ogun',
      name: 'Ògún',
      nameYoruba: 'Ògún',
      title: 'God of Iron',
      titleYoruba: 'Òrìṣà Irin',
      domain: 'War & Technology',
      domainYoruba: 'Ogun àti Ìmọ̀-ẹ̀rọ',
      colors: ['green', 'black'],
      symbols: ['iron tools', 'machete', 'hammer'],
      personality: 'Strong, determined warrior and craftsman who forges both tools and destiny',
      personalityYoruba: 'Alágbára, onípinnu jagunjagun àti oníṣọ́nà tí ń rọ méjèèjì ohun èlò àti ìpín',
      powers: ['Metal Forging', 'War Strategy', 'Technology Innovation', 'Path Clearing'],
      powersYoruba: ['Rírọ Irin', 'Ọgbọ́n Ogun', 'Ìṣẹ̀dá Ìmọ̀-ẹ̀rọ', 'Fífún Ọ̀nà'],
      audioUrl: '/static/audio/pronunciation/ogun_oriki_authentic.mp3',
      hasAuthentic: true,
      characterTraits: {
        strength: 100,
        wisdom: 80,
        compassion: 65,
        power: 95,
        mystery: 70
      },
      animationStyle: 'forge-fire',
      icon: <Hammer className="w-6 h-6 text-green-700" />
    },
    {
      id: 'oshun',
      name: 'Ọ̀ṣun',
      nameYoruba: 'Ọ̀ṣun',
      title: 'Goddess of Love',
      titleYoruba: 'Òrìṣà Ìfẹ́',
      domain: 'Love & Fertility',
      domainYoruba: 'Ìfẹ́ àti Ọmọbíbí',
      colors: ['yellow', 'gold', 'amber'],
      symbols: ['honey', 'peacock feathers', 'mirror'],
      personality: 'Graceful, sensual goddess of love with sweet disposition and healing powers',
      personalityYoruba: 'Alárinrin, òrìṣà ìfẹ́ onídùn pẹ̀lú ìwà dídùn àti agbára ìwòsàn',
      powers: ['Love Magic', 'Fertility Blessings', 'Sweet Waters', 'Beauty Enhancement'],
      powersYoruba: ['Àjẹ́ Ìfẹ́', 'Ìbùkún Ọmọbíbí', 'Omi Dídùn', 'Ìdí Ẹwà'],
      audioUrl: '/static/audio/pronunciation/osun.mp3',
      hasAuthentic: true,
      characterTraits: {
        strength: 75,
        wisdom: 85,
        compassion: 95,
        power: 80,
        mystery: 85
      },
      animationStyle: 'honey-flow',
      icon: <Heart className="w-6 h-6 text-yellow-600" />
    },
    {
      id: 'obatala',
      name: 'Ọbàtálá',
      nameYoruba: 'Ọbàtálá',
      title: 'Creator of Bodies',
      titleYoruba: 'Ẹlẹ́dá Ara',
      domain: 'Creation & Wisdom',
      domainYoruba: 'Ìṣẹ̀dá àti Ọgbọ́n',
      colors: ['white', 'silver'],
      symbols: ['white cloth', 'elephant', 'snail'],
      personality: 'Ancient, wise creator deity with pure intentions and calm demeanor',
      personalityYoruba: 'Àgbà, ọlọ́gbọ́n ẹlẹ́dá pẹ̀lú èrò mímọ́ àti ìwà tútù',
      powers: ['Creation Magic', 'Purification', 'Wisdom Granting', 'Peace Bringing'],
      powersYoruba: ['Àjẹ́ Ìṣẹ̀dá', 'Ìwẹ̀nù', 'Fífún Ọgbọ́n', 'Mímú Àlàáfíà'],
      audioUrl: '/static/audio/pronunciation/obatala.mp3',
      hasAuthentic: true,
      characterTraits: {
        strength: 80,
        wisdom: 100,
        compassion: 100,
        power: 90,
        mystery: 95
      },
      animationStyle: 'pure-light',
      icon: <Sun className="w-6 h-6 text-white" />
    },
    {
      id: 'esu',
      name: 'Èṣù Ẹlẹ́gbára',
      nameYoruba: 'Èṣù Ẹlẹ́gbára',
      title: 'Divine Messenger',
      titleYoruba: 'Ìránṣẹ́ Òrìṣà',
      domain: 'Communication & Crossroads',
      domainYoruba: 'Ìbánisọ̀rọ̀ àti Orítamẹta',
      colors: ['black', 'red'],
      symbols: ['crossroads', 'keys', 'cowrie shells'],
      personality: 'Trickster messenger who opens and closes pathways, facilitating communication with divine',
      personalityYoruba: 'Ẹlẹ́tàn ìránṣẹ́ tí ó ń ṣí àti tì àwọn ọ̀nà, tí ó ń mú ìbánisọ̀rọ̀ pẹ̀lú àwọn òrìṣà',
      powers: ['Pathway Opening', 'Divine Communication', 'Luck Transformation', 'Barrier Removal'],
      powersYoruba: ['Ṣíṣí Ọ̀nà', 'Ìbánisọ̀rọ̀ Òrìṣà', 'Yíyí Orí Padà', 'Ìmú Ìdínà Kúrò'],
      audioUrl: '/static/audio/pronunciation/esu.mp3',
      hasAuthentic: false,
      characterTraits: {
        strength: 85,
        wisdom: 95,
        compassion: 70,
        power: 90,
        mystery: 100
      },
      animationStyle: 'crossroads-spin',
      icon: <Shield className="w-6 h-6 text-red-600" />
    },
    {
      id: 'osanyin',
      name: 'Ọ̀sányìn',
      nameYoruba: 'Ọ̀sányìn',
      title: 'Master of Herbs',
      titleYoruba: 'Ọlọ́run Ewé',
      domain: 'Medicine & Plants',
      domainYoruba: 'Oògùn àti Ewé',
      colors: ['green', 'brown'],
      symbols: ['herbs', 'mortar', 'healing leaves'],
      personality: 'Wise herbalist with knowledge of all plants and their healing properties for body and spirit',
      personalityYoruba: 'Ọlọ́gbọ́n onísègùn pẹ̀lú ìmọ̀ gbogbo ewé àti agbára wọn fún ìwòsàn ara àti ẹ̀mí',
      powers: ['Herbal Medicine', 'Plant Communication', 'Disease Healing', 'Nature Balance'],
      powersYoruba: ['Oògùn Ewé', 'Ìbánisọ̀rọ̀ Ewé', 'Ìwòsàn Àrùn', 'Ìdọ̀tí Àdáyéba'],
      audioUrl: '/static/audio/pronunciation/osanyin.mp3',
      hasAuthentic: false,
      characterTraits: {
        strength: 75,
        wisdom: 100,
        compassion: 90,
        power: 85,
        mystery: 95
      },
      animationStyle: 'leaf-growth',
      icon: <Leaf className="w-6 h-6 text-green-600" />
    },
    {
      id: 'olokun',
      name: 'Olókun',
      nameYoruba: 'Olókun',
      title: 'Lord of the Ocean',
      titleYoruba: 'Ọlọ́run Òkun',
      domain: 'Ocean & Wealth',
      domainYoruba: 'Òkun àti Ọrọ̀',
      colors: ['blue', 'white', 'silver'],
      symbols: ['ocean waves', 'serpent', 'cowrie shells'],
      personality: 'Ancient ocean deity with vast wisdom and control over wealth from the depths of the sea',
      personalityYoruba: 'Òrìṣà òkun àtijọ́ pẹ̀lú ọgbọ́n nípòn àti ìṣàkóso ọrọ̀ láti ìsàlẹ̀ òkun',
      powers: ['Ocean Control', 'Wealth Manifestation', 'Deep Wisdom', 'Water Purification'],
      powersYoruba: ['Ìṣàkóso Òkun', 'Ìfárawé Ọrọ̀', 'Ọgbọ́n Jíjìn', 'Ìwẹ̀nù Omi'],
      audioUrl: '/static/audio/pronunciation/olokun.mp3',
      hasAuthentic: true,
      characterTraits: {
        strength: 90,
        wisdom: 100,
        compassion: 85,
        power: 95,
        mystery: 100
      },
      animationStyle: 'ocean-depth',
      icon: <Fish className="w-6 h-6 text-blue-700" />
    },
    {
      id: 'orisa-oko',
      name: 'Òrìṣà Òkò',
      nameYoruba: 'Òrìṣà Òkò',
      title: 'God of Agriculture',
      titleYoruba: 'Òrìṣà Ọgbìn',
      domain: 'Farming & Harvest',
      domainYoruba: 'Ọgbìn àti Ìkórè',
      colors: ['brown', 'green', 'white'],
      symbols: ['plow', 'yam', 'fertile soil'],
      personality: 'Patient farmer deity who ensures bountiful harvests and teaches sustainable agriculture',
      personalityYoruba: 'Òrìṣà àgbẹ̀ onísùúrù tí ó ń rí dájú ìkórè púpọ̀ àti kíkọ́ ọgbìn tó dúró',
      powers: ['Crop Growth', 'Soil Fertility', 'Harvest Blessing', 'Agricultural Wisdom'],
      powersYoruba: ['Ìdàgbà Irúgbìn', 'Ọlọ́rọ̀ Ilẹ̀', 'Ìbùkún Ìkórè', 'Ọgbọ́n Ọgbìn'],
      audioUrl: '/static/audio/pronunciation/orisa-oko.mp3',
      hasAuthentic: false,
      characterTraits: {
        strength: 80,
        wisdom: 85,
        compassion: 95,
        power: 80,
        mystery: 70
      },
      animationStyle: 'earth-growth',
      icon: <Mountain className="w-6 h-6 text-amber-700" />
    },
    {
      id: 'oshosi',
      name: 'Ọ̀ṣọ́ọ̀sì',
      nameYoruba: 'Ọ̀ṣọ́ọ̀sì',
      title: 'Divine Hunter',
      titleYoruba: 'Ọdẹ Òrìṣà',
      domain: 'Hunting & Justice',
      domainYoruba: 'Ọdẹ àti Òdodo',
      colors: ['blue', 'yellow', 'green'],
      symbols: ['bow and arrow', 'forest animals', 'tracking'],
      personality: 'Skilled hunter and tracker who brings justice and provides sustenance from the forest',
      personalityYoruba: 'Ọdẹ ọlọ́gbọ́n àti atọ̀nà tí ó mú òdodo àti tí ó ń pèsè oúnjẹ láti igbó',
      powers: ['Precise Targeting', 'Forest Navigation', 'Justice Delivery', 'Wildlife Protection'],
      powersYoruba: ['Ifojúsùn Déédéé', 'Ìrìn Igbó', 'Fífún Òdodo', 'Àbò Ẹranko Igbó'],
      audioUrl: '/static/audio/pronunciation/oshosi.mp3',
      hasAuthentic: false,
      characterTraits: {
        strength: 90,
        wisdom: 80,
        compassion: 85,
        power: 85,
        mystery: 75
      },
      animationStyle: 'arrow-precision',
      icon: <TreePine className="w-6 h-6 text-green-700" />
    },
    {
      id: 'aye-lala',
      name: 'Ayé-là-là',
      nameYoruba: 'Ayé-là-là',
      title: 'Earth Mother',
      titleYoruba: 'Ìyá Ayé',
      domain: 'Earth & Stability',
      domainYoruba: 'Ayé àti Ìdúró',
      colors: ['brown', 'green', 'black'],
      symbols: ['earth', 'mountains', 'clay'],
      personality: 'Grounding earth mother who provides stability, foundation, and connection to ancestral land',
      personalityYoruba: 'Ìyá ayé ìfọwọ́sowọ́pọ̀ tí ó ń pèsè ìdúró, ìpìlẹ̀ àti ìbásọ̀pọ̀ sí ilẹ̀ baba',
      powers: ['Earth Stabilization', 'Foundation Building', 'Ancestral Connection', 'Grounding Energy'],
      powersYoruba: ['Ìmúlẹ̀dúró Ayé', 'Ìkọ́lé Ìpìlẹ̀', 'Ìbásọ̀pọ̀ Eégún', 'Agbára Ìfọwọ́sowọ́pọ̀'],
      audioUrl: '/static/audio/pronunciation/aye-lala.mp3',
      hasAuthentic: false,
      characterTraits: {
        strength: 85,
        wisdom: 90,
        compassion: 100,
        power: 80,
        mystery: 85
      },
      animationStyle: 'earth-pulse',
      icon: <Mountain className="w-6 h-6 text-amber-800" />
    },
    {
      id: 'oba',
      name: 'Ọba',
      nameYoruba: 'Ọba',
      title: 'River Guardian',
      titleYoruba: 'Olùṣọ́ Odò',
      domain: 'River & Marriage',
      domainYoruba: 'Odò àti Ìgbéyàwó',
      colors: ['yellow', 'orange', 'brown'],
      symbols: ['river current', 'wedding crown', 'flowing water'],
      personality: 'Devoted river goddess who embodies loyalty, sacrifice, and the transformative power of love',
      personalityYoruba: 'Òrìṣà odò olóore tí ó dúró fún òdodo, ìrúbọ àti agbára ìyípadà ìfẹ́',
      powers: ['River Flow Control', 'Marriage Blessing', 'Loyalty Strengthening', 'Emotional Healing'],
      powersYoruba: ['Ìṣàkóso Ṣiṣan Odò', 'Ìbùkún Ìgbéyàwó', 'Ìmúlẹ̀ Òdodo', 'Ìwòsàn Ẹ̀dùn'],
      audioUrl: '/static/audio/pronunciation/oba.mp3',
      hasAuthentic: false,
      characterTraits: {
        strength: 80,
        wisdom: 85,
        compassion: 100,
        power: 75,
        mystery: 80
      },
      animationStyle: 'river-devotion',
      icon: <Moon className="w-6 h-6 text-yellow-600" />
    }
  ];

  const selectedCharacter = orishaCharacters.find(orisha => orisha.id === selectedOrisha) || orishaCharacters[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationActive(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getAnimationClass = (style: string) => {
    if (!animationActive) return '';
    
    switch (style) {
      case 'gentle-glow': return 'gentle-glow';
      case 'lightning-pulse': return 'lightning-pulse';
      case 'water-flow': return 'water-flow';
      case 'wind-swirl': return 'wind-swirl';
      case 'forge-fire': return 'forge-fire';
      case 'honey-flow': return 'honey-flow';
      case 'pure-light': return 'pure-light';
      case 'crossroads-spin': return 'crossroads-spin';
      case 'leaf-growth': return 'leaf-growth';
      case 'ocean-depth': return 'ocean-depth';
      case 'earth-growth': return 'earth-growth';
      case 'arrow-precision': return 'arrow-precision';
      case 'earth-pulse': return 'earth-pulse';
      case 'river-devotion': return 'river-devotion';
      default: return 'gentle-glow';
    }
  };

  const getTraitColor = (value: number) => {
    if (value >= 90) return 'bg-emerald-500';
    if (value >= 80) return 'bg-blue-500';
    if (value >= 70) return 'bg-amber-500';
    return 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-spiritual-blue dark:text-sacred-gold mb-4">
          {ts("🎭 Orisha Character Profiles", "🎭 Àwọn Àpèjúwe Òrìṣà")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {ts("Interactive animated profiles of the divine Orisha", "Àwọn àpèjúwe ìfàkàyé àwọn Òrìṣà òrìṣà")}
        </p>
      </div>

      {/* Character Selection */}
      <div className="grid grid-cols-4 md:grid-cols-7 lg:grid-cols-13 gap-2 mb-8">
        {orishaCharacters.map((orisha) => (
          <button
            key={orisha.id}
            onClick={() => setSelectedOrisha(orisha.id)}
            className={`p-3 rounded-lg border-2 transition-all duration-300 ${
              selectedOrisha === orisha.id
                ? 'border-spiritual-blue bg-spiritual-blue/10 shadow-lg scale-105'
                : 'border-gray-300 dark:border-gray-600 hover:border-spiritual-blue/50'
            }`}
          >
            <div className={`text-center ${getAnimationClass(orisha.animationStyle)}`}>
              {orisha.icon}
              <p className="text-xs mt-1 font-medium">
                {language === 'yoruba' ? orisha.nameYoruba : orisha.name}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Character Profile Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Character Avatar & Basic Info */}
        <Card className="lg:col-span-1 orisha-character-card">
          <CardHeader className="text-center">
            <div className={`mx-auto mb-4 w-32 h-32 rounded-full bg-gradient-to-br from-spiritual-blue/20 to-sacred-gold/20 flex items-center justify-center border-4 border-spiritual-blue/30 ${getAnimationClass(selectedCharacter.animationStyle)}`}>
              <div className="text-6xl">
                {selectedCharacter.icon}
              </div>
            </div>
            <CardTitle className="text-2xl">
              {language === 'yoruba' ? selectedCharacter.nameYoruba : selectedCharacter.name}
            </CardTitle>
            <p className="text-lg text-spiritual-blue dark:text-sacred-gold">
              {language === 'yoruba' ? selectedCharacter.titleYoruba : selectedCharacter.title}
            </p>
            <Badge variant="outline" className="mx-auto">
              {language === 'yoruba' ? selectedCharacter.domainYoruba : selectedCharacter.domain}
            </Badge>
          </CardHeader>
          <CardContent>
            {/* Colors */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">{ts("Sacred Colors", "Àwọn Àwọ̀ Mímọ́")}</h4>
              <div className="flex gap-2">
                {selectedCharacter.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 border-gray-300`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Audio Playback */}
            {selectedCharacter.hasAuthentic && selectedCharacter.audioUrl && (
              <div className="mb-4">
                <Button
                  onClick={() => playAudio(selectedCharacter.audioUrl!, selectedCharacter.id)}
                  className="w-full"
                  variant={isPlaying === selectedCharacter.id ? "secondary" : "outline"}
                >
                  {isPlaying === selectedCharacter.id ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      {ts("Playing Oríkì", "Ń ṣe Oríkì")}
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      {ts("Play Authentic Oríkì", "Ṣe Oríkì Òtítọ́")}
                    </>
                  )}
                </Button>
                {selectedCharacter.hasAuthentic && (
                  <Badge className="mt-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    ⭐ {ts("Authentic Recording", "Gbóhùn Òtítọ́")}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Character Details */}
        <Card className="lg:col-span-2 orisha-character-card">
          <CardHeader>
            <CardTitle>{ts("Character Profile", "Àpèjúwe Ìwà")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personality */}
            <div>
              <h4 className="font-semibold mb-2 text-spiritual-blue dark:text-sacred-gold">
                {ts("Personality", "Ìwà")}
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {language === 'yoruba' ? selectedCharacter.personalityYoruba : selectedCharacter.personality}
              </p>
            </div>

            {/* Character Traits */}
            <div>
              <h4 className="font-semibold mb-3 text-spiritual-blue dark:text-sacred-gold">
                {ts("Character Traits", "Àwọn Àbùdá")}
              </h4>
              <div className="space-y-3">
                {Object.entries(selectedCharacter.characterTraits).map(([trait, value]) => (
                  <div key={trait} className="flex items-center justify-between">
                    <span className="capitalize font-medium">
                      {ts(trait, trait === 'strength' ? 'Agbára' : trait === 'wisdom' ? 'Ọgbọ́n' : trait === 'compassion' ? 'Àánú' : trait === 'power' ? 'Àṣẹ' : 'Àsírí')}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-3 trait-bar">
                        <div
                          className={`h-3 rounded-full transition-all duration-1000 ${getTraitColor(value)}`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Powers */}
            <div>
              <h4 className="font-semibold mb-3 text-spiritual-blue dark:text-sacred-gold">
                {ts("Divine Powers", "Àwọn Àṣẹ Òrìṣà")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(language === 'yoruba' ? selectedCharacter.powersYoruba : selectedCharacter.powers).map((power, index) => (
                  <Badge key={index} variant="secondary" className="justify-center p-2">
                    <Trophy className="w-3 h-3 mr-1" />
                    {power}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sacred Symbols */}
            <div>
              <h4 className="font-semibold mb-3 text-spiritual-blue dark:text-sacred-gold">
                {ts("Sacred Symbols", "Àwọn Àmì Mímọ́")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCharacter.symbols.map((symbol, index) => (
                  <Badge key={index} variant="outline" className="capitalize">
                    {symbol}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrishaCharacterProfiles;