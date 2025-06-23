import { InsertEboRecommendation } from "@shared/schema";

// Traditional Ẹbọ (offerings/rituals) recommendations for each major Odu
export const eboRecommendations: InsertEboRecommendation[] = [
  // Ogbe Meji - Light and Clarity
  {
    oduId: 1,
    category: "clarity",
    title: "Ẹbọ for Divine Illumination",
    titleYoruba: "Ẹbọ fún Ìmọ́lẹ̀ Ọlọ́run",
    description: "A ritual offering to enhance spiritual clarity and divine guidance. This ebo helps clear mental fog and opens pathways for divine wisdom.",
    descriptionYoruba: "Ẹbọ tí ó ń mú ìmọ̀ ẹ̀mí àti ìtọ́nisọ́nà Ọlọ́run. Ẹbọ yìí ń mú àìmọ̀ inú kúrò, ó sì ń ṣí ọ̀nà fún ọgbọ́n Ọlọ́run.",
    materials: ["White candle", "Honey", "White cloth", "Coconut", "White flowers"],
    materialsYoruba: ["Fìtílà funfun", "Oyin", "Aṣọ funfun", "Àgbọn", "Òdòdó funfun"],
    herbs: ["Basil", "White sage", "Frankincense"],
    herbsYoruba: ["Efinrin", "Seji funfun", "Kundẹ"],
    procedure: "Place white cloth on altar. Light white candle. Offer honey to Orunmila. Place coconut and flowers. Pray for clarity and wisdom. Leave offerings for 3 days.",
    procedureYoruba: "Gbé aṣọ funfun sórí pẹpẹ. Tan fìtílà funfun. Fún Òrúnmìlà ní oyin. Gbé àgbọn àti òdòdó. Gbàdúrà fún ìmọ̀ àti ọgbọ́n. Fi ẹbọ sílẹ̀ fún ọjọ́ mẹ́ta.",
    timing: "Sunday morning at sunrise",
    timingYoruba: "Òwúrọ̀ ọjọ́ Àìkú nígbà ìràwọ̀",
    precautions: ["Fast for 24 hours before ritual", "Maintain spiritual purity", "Avoid negative thoughts"],
    precautionsYoruba: ["Gbẹ́kùn fún wákàtí mẹ́rìnlélógún", "Pa ìwà ẹ̀mí mọ́", "Yàgò fún èrò burúkú"],
    difficulty: "beginner"
  },
  
  // Oyeku Meji - Mystery and Protection
  {
    oduId: 2,
    category: "protection",
    title: "Ẹbọ for Spiritual Protection",
    titleYoruba: "Ẹbọ fún Ààbò Ẹ̀mí",
    description: "A powerful protection ritual to shield against negative energies and spiritual attacks. This ebo creates a strong spiritual barrier around the practitioner.",
    descriptionYoruba: "Ẹbọ agbára fún ààbò lọ́wọ́ agbára búburú àti ìkọlù ẹ̀mí. Ẹbọ yìí ń dá ààbò ẹ̀mí tó lágbára yí ènìyàn ká.",
    materials: ["Black candle", "Sea salt", "Iron nail", "Black cloth", "Palm oil"],
    materialsYoruba: ["Fìtílà dúdú", "Iyọ̀ òkun", "Irin", "Aṣọ dúdú", "Epo pupa"],
    herbs: ["Rue", "Black pepper", "Garlic", "Wormwood"],
    herbsYoruba: ["Ewé ìyàngbà", "Iyẹ̀rẹ̀ dúdú", "Àyù", "Ewé koriko"],
    procedure: "Create salt circle. Place black cloth in center. Light black candle. Drive iron nail into ground. Anoint with palm oil. Recite protection prayers. Bury materials at crossroads.",
    procedureYoruba: "Ṣe àyíká pẹ̀lú iyọ̀. Gbé aṣọ dúdú sí àárín. Tan fìtílà dúdú. Gun irin sínú ilẹ̀. Fi epo pupa kù. Sọ àdúrà ààbò. Sin ohun èlò ní òrìta.",
    timing: "Tuesday at midnight",
    timingYoruba: "Ọjọ́ Ìṣẹ́gun ní àárín òru",
    precautions: ["Work in complete darkness", "Do not look back after burying", "Cleanse thoroughly after ritual"],
    precautionsYoruba: ["Ṣiṣẹ́ nínú òkùnkùn", "Má ṣe bojú lẹ́yìn lẹ́yìn sìnkú", "Wẹ ara dáadáa lẹ́yìn ẹbọ"],
    difficulty: "intermediate"
  },

  // Iwori Meji - Wisdom and Character
  {
    oduId: 3,
    category: "wisdom",
    title: "Ẹbọ for Good Character",
    titleYoruba: "Ẹbọ fún Ìwà Rere",
    description: "A ritual to cultivate good character and moral strength. This ebo helps develop wisdom, patience, and ethical behavior in daily life.",
    descriptionYoruba: "Ẹbọ láti dá ìwà rere àti okun ìwà. Ẹbọ yìí ń ran ni lọ́wọ́ láti ni ọgbọ́n, sùúrù, àti ìwà tó dára.",
    materials: ["Kola nut", "Bitter kola", "White wine", "Cowrie shells", "Fresh palm fronds"],
    materialsYoruba: ["Obì", "Orógbó", "Emu funfun", "Owó eyo", "Mariwo tuntun"],
    herbs: ["Bitter leaf", "Scent leaf", "African pepper"],
    herbsYoruba: ["Ewé ewúrọ", "Ewé ntong", "Uda"],
    procedure: "Arrange kola nuts in pattern of 4. Pour libation of palm wine. Offer prayers for good character. Chew bitter kola while meditating. Scatter cowrie shells for divination. Keep palm fronds as blessing.",
    procedureYoruba: "Tò obì ní ọ̀nà mẹ́rin. Tu emu sílẹ̀ gẹ́gẹ́ bíi ẹbọ. Gbàdúrà fún ìwà rere. Jẹ orógbó nígbà ìsàlò. Fọ́n owó eyo fún àfọ̀ṣẹ. Pa mariwo mọ́ gẹ́gẹ́ bíi ìbùkún.",
    timing: "Wednesday evening",
    timingYoruba: "Àṣálẹ́ ọjọ́ Ọjọ́rú",
    precautions: ["Speak only positive words during ritual", "Share kola with others if possible", "Maintain respectful attitude"],
    precautionsYoruba: ["Sọ ọ̀rọ̀ rere nìkan nígbà ẹbọ", "Pín obì fún àwọn ẹlòmíràn", "Hu ìwà ẹ̀bẹ̀"],
    difficulty: "beginner"
  },

  // Odi Meji - Stability and Foundation
  {
    oduId: 4,
    category: "prosperity",
    title: "Ẹbọ for Business Success",
    titleYoruba: "Ẹbọ fún Àṣeyọrí Òwò",
    description: "A ritual to attract business success and financial stability. This ebo creates a solid foundation for commercial endeavors and attracts prosperity.",
    descriptionYoruba: "Ẹbọ láti fa àṣeyọrí òwò àti ìdúróṣinṣin owó. Ẹbọ yìí ń gbé ìpìlẹ̀ tó dára fún iṣẹ́ òwò, ó sì ń fa ọrọ̀.",
    materials: ["Four cowrie shells", "Honey", "Coins", "Green cloth", "Alligator pepper"],
    materialsYoruba: ["Owó eyo mẹ́rin", "Oyin", "Owó", "Aṣọ aláwọ̀ ewé", "Àtàrẹ"],
    herbs: ["Basil", "Mint", "Bay leaves"],
    herbsYoruba: ["Efinrin", "Mint", "Ewé igi lórí"],
    procedure: "Place green cloth on business altar. Arrange cowrie shells in square. Drizzle honey over coins. Sprinkle alligator pepper. Pray for business growth. Keep in cash register or business space.",
    procedureYoruba: "Gbé aṣọ aláwọ̀ ewé sórí pẹpẹ òwò. Tò owó eyo ní ọ̀nà mẹ́rin. Da oyin sórí owó. Wọ́n àtàrẹ. Gbàdúrà fún ìdàgbàsókè òwò. Pamọ́ ní ibi tí a ti ń pa owó.",
    timing: "Thursday morning",
    timingYoruba: "Òwúrọ̀ ọjọ́ Ọjọ́bọ",
    precautions: ["Keep offering clean and fresh", "Replace monthly", "Give thanks for current blessings"],
    precautionsYoruba: ["Jẹ́ kí ẹbọ wà ní mímọ́", "Yí i padà lóṣooṣu", "Dúpẹ́ fún ìbùkún tí ó wà"],
    difficulty: "beginner"
  },

  // Irosun Meji - Inner Light
  {
    oduId: 5,
    category: "healing",
    title: "Ẹbọ for Emotional Healing",
    titleYoruba: "Ẹbọ fún Ìwòsàn Ọkàn",
    description: "A gentle healing ritual for emotional wounds and heartache. This ebo helps restore inner peace and emotional balance after trauma or loss.",
    descriptionYoruba: "Ẹbọ ìwòsàn fún ọgbẹ́ ọkàn àti ìbànújẹ́. Ẹbọ yìí ń mú àlàáfíà ọkàn padà, ó sì ń ṣe àtúnṣe ọkàn lẹ́yìn ìpalára.",
    materials: ["Rose water", "Pink candle", "Rose quartz", "Soft white cloth", "Lavender oil"],
    materialsYoruba: ["Omi òdòdó", "Fìtílà àwọ̀ òdòdó", "Òkúta òdòdó", "Aṣọ funfun rírọ̀", "Epo lavender"],
    herbs: ["Rose petals", "Chamomile", "Lemon balm"],
    herbsYoruba: ["Òdòdó òdòdó", "Chamomile", "Ewé ọsan dídùn"],
    procedure: "Create sacred space with soft lighting. Light pink candle. Sprinkle rose water around space. Hold rose quartz while breathing deeply. Anoint heart chakra with lavender oil. Meditate on healing and forgiveness.",
    procedureYoruba: "Ṣe àyè mímọ́ pẹ̀lú ìmọ́lẹ̀ rírọ̀. Tan fìtílà òdòdó. Wọ́n omi òdòdó káàkiri. Di òkúta òdòdó mú nígbà mímí. Fi epo lavender kù ojú ọkàn. Ṣàlò lórí ìwòsàn àti ìdáríjì.",
    timing: "Friday evening during new moon",
    timingYoruba: "Àṣálẹ́ ọjọ́ Ẹtì nígbà òṣùpá tuntun",
    precautions: ["Work with pure intentions", "Allow emotions to flow naturally", "Seek professional help if needed"],
    precautionsYoruba: ["Ṣiṣẹ́ pẹ̀lú èrò mímọ́", "Jẹ́ kí ẹ̀dùn jáde lọ́nà", "Wá ìrànlọ́wọ́ àkọ́kọ́ bí ó bá dọ̀rọ̀"],
    difficulty: "beginner"
  },

  // Owonrin Meji - Transformation
  {
    oduId: 6,
    category: "transformation",
    title: "Ẹbọ for Life Changes",
    titleYoruba: "Ẹbọ fún Àyípadà Ayé",
    description: "A powerful ritual for navigating major life transitions and transformations. This ebo helps embrace change and emerge stronger from challenges.",
    descriptionYoruba: "Ẹbọ agbára fún àyípadà ńlá nínú ayé. Ẹbọ yìí ń ran ni lọ́wọ́ láti gba àyípadà, kí a sì di alágbára jù lẹ́yìn àwọn ìpéníjà.",
    materials: ["Butterfly cocoon or shed snake skin", "Flowing water", "Seven different colored candles", "Mirror", "Feather"],
    materialsYoruba: ["Àkọ̀rọ̀ làbalàbá tàbí awọ ejò", "Omi tí ń sàn", "Fìtílà àwọ̀ méje", "Dígí", "Ìyẹ́ eye"],
    herbs: ["Sage", "Cedar", "Sweetgrass"],
    herbsYoruba: ["Seji", "Igi kedari", "Koriko adùn"],
    procedure: "Create medicine wheel with seven candles. Place mirror in center. Light candles in rainbow order. Hold cocoon/skin while stating what you're releasing. Look in mirror and affirm new self. Burn old symbols. Scatter ashes in flowing water.",
    procedureYoruba: "Ṣe kẹ̀kẹ́ oogun pẹ̀lú fìtílà méje. Gbé dígí sí àárín. Tan fìtílà gẹ́gẹ́ bíi òṣùmàrè. Di àkọ̀rọ̀ mú nígbà sísọ ohun tí o fẹ́ fi sílẹ̀. Wo dígí kí o sì sọ ara tuntun. Sun àwọn àmì àtijọ́. Fọ́n eérú sínú omi tí ń sàn.",
    timing: "During full moon",
    timingYoruba: "Nígbà òṣùpá kíkún",
    precautions: ["Be prepared for intense energy", "Have support system ready", "Take time to integrate changes"],
    precautionsYoruba: ["Múra fún agbára líle", "Jẹ́ kí àtìlẹ́yìn wà", "Ya àkókò fún gbígba àyípadà"],
    difficulty: "advanced"
  }
];