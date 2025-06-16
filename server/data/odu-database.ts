import { InsertOdu } from "@shared/schema";

// Helper function to add problems to each Odu based on traditional wisdom
function addProblemsToOdu(baseOdu: any, problems: string[], problemsYoruba: string[]): InsertOdu {
  return {
    ...baseOdu,
    problems,
    problemsYoruba
  };
}

export const oduDatabase: InsertOdu[] = [
  {
    name: "Ogbe Meji",
    nameYoruba: "Ogbe Meji",
    subtitle: "The Odu of Light and Clarity",
    subtitleYoruba: "Odu ti Imole ati Aseyori",
    element: "Light",
    elementYoruba: "Imole",
    energy: "Illumination",
    energyYoruba: "Ìtanná",
    message: "Light pierces through darkness, revealing the path forward. Today brings clarity to situations that have been clouded. Trust in your inner wisdom and allow truth to guide your decisions. Like the sun that rises each morning, your understanding will illuminate new possibilities.",
    messageYoruba: "Imole gbona nipasẹ okunkun, o si ṣafihan ọna iwaju. Oni mu aseyori wa si awọn ipo ti o ti wa ni awọsanma. Gbẹkẹle ọgbọn inu rẹ ki o si jẹ ki otitọ ṣe itọsọna awọn ipinnu rẹ. Bi orun ti n yo ni gbogbo owurọ, oye rẹ yoo tan imole si awọn aye tuntun.",
    guidance: [
      "Seek clarity in communication with others",
      "Trust your intuition in important decisions",
      "Share your knowledge generously"
    ],
    guidanceYoruba: [
      "Wa aseyori ninu ibaraẹnisọrọ pẹlu awọn ẹlomiran",
      "Gbẹkẹle oye inu rẹ ninu awọn ipinnu pataki",
      "Pin imọ rẹ ni ọpọlọpọ"
    ],
    reflection: "How can I bring more light and understanding to my current situation?",
    reflectionYoruba: "Bawo ni mo ṣe le mu imole ati oye diẹ sii wa si ipo mi lọwọlọwọ?",
    pattern: [[true, true, true, true], [true, true, true, true]],
    description: "Ogbe Meji represents divine light, clarity, and truth. It is the first of the major Odu and speaks to new beginnings, spiritual illumination, and the power of clear vision.",
    descriptionYoruba: "Ogbe Meji n duro fun imole Ọlọrun, aseyori, ati otitọ. O jẹ akọkọ ninu awọn Odu pataki o si sọrọ si awọn ibẹrẹ tuntun, imole ẹmi, ati agbara ti iran kedere.",
    keywords: ["clarity", "light", "truth", "new beginnings", "wisdom"],
    keywordsYoruba: ["aseyori", "imole", "otitọ", "awọn ibẹrẹ tuntun", "ọgbọn"],
    problems: ["confusion", "lack of direction", "spiritual darkness", "uncertainty", "blocked vision"],
    problemsYoruba: ["iporuru", "aidanimọ ọna", "okunkun ẹmi", "aidaniloju", "iran dina"]
  },
  {
    name: "Oyeku Meji",
    nameYoruba: "Oyeku Meji",
    subtitle: "The Odu of Mystery and Reflection",
    subtitleYoruba: "Odu ti Ohun Ijinle ati Ìronu",
    element: "Darkness",
    elementYoruba: "Okunkun",
    energy: "Introspection",
    energyYoruba: "Ìronu Inu",
    message: "In the depths of darkness, profound wisdom is found. Today calls for quiet reflection and inner contemplation. The mysteries of life reveal themselves to those who look within. Embrace the unknown and find strength in uncertainty.",
    messageYoruba: "Ninu ijinle okunkun, ọgbọn jinlẹ ni a ri. Oni npe fun ìronu idakẹjẹ ati ìronu inu. Awọn ohun ijinle ti aye ṣafihan ara wọn fun awọn ti o wo inu. Gba ohun aimọ naa ki o si wa agbara ninu aidaniloju.",
    guidance: [
      "Take time for quiet meditation and reflection",
      "Honor your ancestors and their wisdom",
      "Be patient with situations that remain unclear"
    ],
    guidanceYoruba: [
      "Ya akoko fun ìronu ati ìronu idakẹjẹ",
      "Bu ọla fun awọn baba nla rẹ ati ọgbọn wọn",
      "Ni suuru pẹlu awọn ipo ti ko kedere"
    ],
    reflection: "What hidden truths am I ready to discover within myself?",
    reflectionYoruba: "Kini awọn otitọ ti o pamọ ti mo ti ṣetan lati ṣawari ninu ara mi?",
    pattern: [[false, false, false, false], [false, false, false, false]],
    description: "Oyeku Meji represents the feminine principle, mystery, and the power of the unknown. It speaks to the importance of patience, reflection, and trusting in divine timing.",
    descriptionYoruba: "Oyeku Meji duro fun ilana obinrin, ohun ijinle, ati agbara ohun aimọ. O sọrọ si pataki ti suuru, ìronu, ati gbigbekele akoko Ọlọrun.",
    keywords: ["mystery", "reflection", "patience", "ancestors", "feminine energy"],
    keywordsYoruba: ["ohun ijinle", "ìronu", "suuru", "awọn baba nla", "agbara obinrin"]
  },
  {
    name: "Iwori Meji",
    nameYoruba: "Iwori Meji",
    subtitle: "The Odu of Spiritual Transformation",
    subtitleYoruba: "Odu ti Iyipada Ẹmi",
    element: "Spirit",
    elementYoruba: "Ẹmi",
    energy: "Transformation",
    energyYoruba: "Iyipada",
    message: "Spiritual forces are at work in your life, bringing transformation and renewal. Today marks a significant shift in your spiritual journey. Embrace the changes that are unfolding and trust in the divine plan that guides your path.",
    messageYoruba: "Awọn agbara ẹmi n ṣiṣẹ ninu aye rẹ, ti n mu iyipada ati isọdọtun wa. Oni ṣe ami iyipada pataki kan ninu irin-ajo ẹmi rẹ. Gba awọn ayipada ti n ṣẹlẹ ki o si gbẹkẹle ero Ọlọrun ti n ṣe itọsọna ọna rẹ.",
    guidance: [
      "Open yourself to spiritual guidance and signs",
      "Release old patterns that no longer serve you",
      "Seek harmony between your physical and spiritual nature"
    ],
    guidanceYoruba: [
      "Ṣi ara rẹ fun itọsọna ẹmi ati awọn ami",
      "Tu awọn ilana atijọ ti ko si sin ọ mọ silẹ",
      "Wa ibaramu laarin iseda ara ati ẹmi rẹ"
    ],
    reflection: "How is my spirit calling me to grow and transform?",
    reflectionYoruba: "Bawo ni ẹmi mi ṣe n pe mi lati dagba ati yipada?",
    pattern: [[false, true, false, false], [false, true, false, false]],
    description: "Iwori Meji represents spiritual transformation, divine intervention, and the connection between physical and spiritual realms. It speaks to profound change and spiritual awakening.",
    descriptionYoruba: "Iwori Meji duro fun iyipada ẹmi, kikọlu Ọlọrun, ati asopọ laarin awọn agbegbe ara ati ẹmi. O sọrọ si iyipada jinlẹ ati ijigbona ẹmi.",
    keywords: ["transformation", "spirituality", "divine intervention", "renewal", "awakening"],
    keywordsYoruba: ["iyipada", "ẹmi", "kikọlu Ọlọrun", "isọdọtun", "ijigbona"]
  },
  {
    name: "Idi Meji",
    nameYoruba: "Idi Meji",
    subtitle: "The Odu of Foundation and Stability",
    subtitleYoruba: "Odu ti Ipilẹ ati Iduroṣinṣin",
    element: "Earth",
    elementYoruba: "Ilẹ",
    energy: "Grounding",
    energyYoruba: "Ifidimulẹ",
    message: "Strong foundations are essential for lasting success. Today emphasizes the importance of building on solid ground. Whether in relationships, work, or personal growth, ensure your efforts are rooted in truth and integrity.",
    messageYoruba: "Awọn ipilẹ ti o lagbara jẹ pataki fun aṣeyọri ti o pẹ. Oni tẹnumọ pataki ti kikọ lori ilẹ ti o lagbara. Yala ninu awọn ibatan, iṣẹ, tabi idagbasoke ti ara ẹni, rii daju pe awọn igbiyanju rẹ wa ni gbongbo ninu otitọ ati ododo.",
    guidance: [
      "Focus on building strong, lasting foundations",
      "Take practical steps toward your goals",
      "Honor commitments and maintain integrity"
    ],
    guidanceYoruba: [
      "Dojukọ kikọ awọn ipilẹ ti o lagbara ati ti o pẹ",
      "Gbe awọn igbesẹ ti o wulo si awọn ibi-afẹde rẹ",
      "Bu ọla fun awọn adehun ki o si ṣe iduroṣinṣin ododo"
    ],
    reflection: "What foundations in my life need strengthening or rebuilding?",
    reflectionYoruba: "Awọn ipilẹ wo ninu igbesi aye mi ni o nilo okun tabi atunkọ?",
    pattern: [[true, false, true, false], [true, false, true, false]],
    description: "Idi Meji represents stability, foundation, and the importance of building on solid ground. It speaks to practical wisdom, commitment, and the power of steady progress.",
    descriptionYoruba: "Idi Meji duro fun iduroṣinṣin, ipilẹ, ati pataki ti kikọ lori ilẹ ti o lagbara. O sọrọ si ọgbọn ti o wulo, adehun, ati agbara ti ilọsiwaju ti o duro.",
    keywords: ["foundation", "stability", "commitment", "integrity", "practical wisdom"],
    keywordsYoruba: ["ipilẹ", "iduroṣinṣin", "adehun", "ododo", "ọgbọn ti o wulo"]
  },
  {
    name: "Irosun Meji",
    nameYoruba: "Irosun Meji",
    subtitle: "The Odu of Healing and Renewal",
    subtitleYoruba: "Odu ti Iwosan ati Isọdọtun",
    element: "Water",
    elementYoruba: "Omi",
    energy: "Healing",
    energyYoruba: "Iwosan",
    message: "Healing energies flow through your life today. Past wounds are ready to be transformed into wisdom. Allow the cleansing power of forgiveness to wash away old hurts. Renewal and restoration are within reach.",
    messageYoruba: "Awọn agbara iwosan n san nipasẹ igbesi aye rẹ loni. Awọn ọgbẹ atijọ ti ṣetan lati yipada si ọgbọn. Jẹ ki agbara ifọmọ ti idariji wẹ awọn ipalara atijọ kuro. Isọdọtun ati imupadabọ wa laarin ọwọ.",
    guidance: [
      "Practice forgiveness toward yourself and others",
      "Seek healing for old emotional wounds",
      "Trust in your body's natural ability to heal"
    ],
    guidanceYoruba: [
      "Ṣe idariji si ara rẹ ati awọn ẹlomiran",
      "Wa iwosan fun awọn ọgbẹ ẹdun atijọ",
      "Gbẹkẹle agbara adayeba ara rẹ lati san"
    ],
    reflection: "What aspects of my life are ready for healing and renewal?",
    reflectionYoruba: "Awọn abala wo ti igbesi aye mi ti ṣetan fun iwosan ati isọdọtun?",
    pattern: [[true, true, false, true], [true, true, false, true]],
    description: "Irosun Meji represents healing, cleansing, and emotional renewal. It speaks to the power of forgiveness, the importance of emotional health, and the healing of ancestral patterns.",
    descriptionYoruba: "Irosun Meji duro fun iwosan, ifọmọ, ati isọdọtun ẹdun. O sọrọ si agbara idariji, pataki ti ilera ẹdun, ati iwosan awọn ilana idile.",
    keywords: ["healing", "forgiveness", "renewal", "cleansing", "emotional health"],
    keywordsYoruba: ["iwosan", "idariji", "isọdọtun", "ifọmọ", "ilera ẹdun"]
  },
  {
    name: "Owonrin Meji",
    nameYoruba: "Owonrin Meji",
    subtitle: "The Odu of Chaos and Change",
    subtitleYoruba: "Odu ti Rudurudu ati Ayipada",
    element: "Wind",
    elementYoruba: "Afẹfẹ",
    energy: "Movement",
    energyYoruba: "Iṣipopada",
    message: "Change sweeps through your life like wind across the plains. What seems chaotic now is actually divine reorganization. Trust the process of transformation, even when the path seems unclear. New opportunities arise from apparent disorder.",
    messageYoruba: "Ayipada gba igbesi aye rẹ kọja bi afẹfẹ ti n kọja ni awọn pẹtẹlẹ. Ohun ti o dabi rudurudu ni bayi ni atunto Ọlọrun gangan. Gbẹkẹle ilana iyipada, paapaa nigbati ọna ko han kedere. Awọn aye tuntun dide lati rudurudu ti o han.",
    guidance: [
      "Remain flexible and adaptable to change",
      "Look for opportunities hidden within challenges",
      "Trust that apparent chaos serves a higher purpose"
    ],
    guidanceYoruba: [
      "Jẹ onirọrun ati alamọdaju si ayipada",
      "Wo awọn aye ti o pamọ laarin awọn italaya",
      "Gbẹkẹle pe rudurudu ti o han n sin idi giga kan"
    ],
    reflection: "How can I find stability and opportunity within the changes occurring in my life?",
    reflectionYoruba: "Bawo ni mo ṣe le ri iduroṣinṣin ati aye laarin awọn ayipada ti n ṣẹlẹ ninu igbesi aye mi?",
    pattern: [[false, false, true, true], [false, false, true, true]],
    description: "Owonrin Meji represents change, movement, and the transformative power of chaos. It speaks to adaptability, hidden opportunities, and finding order within disorder.",
    descriptionYoruba: "Owonrin Meji duro fun ayipada, iṣipopada, ati agbara iyipada ti rudurudu. O sọrọ si alamọdaju, awọn aye ti o pamọ, ati wiwa eto laarin rudurudu.",
    keywords: ["change", "adaptability", "transformation", "opportunity", "movement"],
    keywordsYoruba: ["ayipada", "alamọdaju", "iyipada", "aye", "iṣipopada"]
  },
  {
    name: "Obara Meji",
    nameYoruba: "Obara Meji",
    subtitle: "The Odu of Passion and Vitality",
    subtitleYoruba: "Odu ti Ife ati Agbara",
    element: "Fire",
    elementYoruba: "Ina",
    energy: "Passion",
    energyYoruba: "Ife",
    message: "The fire of passion burns brightly within you today. Your enthusiasm and vitality are powerful forces for positive change. Channel this energy wisely and let your passion inspire others. Great achievements are possible when heart and mind unite.",
    messageYoruba: "Ina ife n jo gidigidi ninu rẹ loni. Itara ati agbara rẹ jẹ awọn ipa ti o lagbara fun ayipada ti o dara. Ṣe itọkasi agbara yi ni ọgbọn ki o si jẹ ki ife rẹ gba awọn ẹlomiran lọkan. Awọn aṣeyọri nla ṣee ṣe nigbati ọkan ati ọgbọn ba dapọ.",
    guidance: [
      "Channel your passion into meaningful pursuits",
      "Inspire others through your enthusiasm",
      "Balance emotional intensity with practical wisdom"
    ],
    guidanceYoruba: [
      "Ṣe itọkasi ife rẹ si awọn iṣẹ ti o ni itumọ",
      "Gba awọn ẹlomiran lọkan nipasẹ itara rẹ",
      "Ṣe iwọntunwọnsi agbara ẹdun pẹlu ọgbọn ti o wulo"
    ],
    reflection: "How can I best honor and channel the passionate energy within me?",
    reflectionYoruba: "Bawo ni mo ṣe le bu ọla ti o dara julọ ki n si ṣe itọkasi agbara ife ti o wa ninu mi?",
    pattern: [[true, false, false, true], [true, false, false, true]],
    description: "Obara Meji represents passion, vitality, and the power of emotional energy. It speaks to enthusiasm, inspiration, and the importance of balancing heart and mind.",
    descriptionYoruba: "Obara Meji duro fun ife, agbara, ati ipa agbara ẹdun. O sọrọ si itara, igbani lọkan, ati pataki ti iwọntunwọnsi ọkan ati ọgbọn.",
    keywords: ["passion", "vitality", "enthusiasm", "inspiration", "emotional energy"],
    keywordsYoruba: ["ife", "agbara", "itara", "igbani lọkan", "agbara ẹdun"]
  },
  {
    name: "Okanran Meji",
    nameYoruba: "Okanran Meji",
    subtitle: "The Odu of Perseverance and Endurance",
    subtitleYoruba: "Odu ti Ifarada ati Ifarabale",
    element: "Mountain",
    elementYoruba: "Oke",
    energy: "Endurance",
    energyYoruba: "Ifarabale",
    message: "Like a mountain that withstands all storms, your strength and perseverance will see you through current challenges. Today requires patience and steady determination. Trust in your ability to endure and overcome obstacles.",
    messageYoruba: "Bi oke ti n koju gbogbo iji, okun ati ifarada rẹ yoo gbe ọ kọja awọn italaya lọwọlọwọ. Oni nilo suuru ati ipinnu ti o duro. Gbẹkẹle agbara rẹ lati faraba ati bori awọn idiwọ.",
    guidance: [
      "Draw upon your inner strength and resilience",
      "Persist through challenges with steady determination",
      "Remember that endurance builds character and wisdom"
    ],
    guidanceYoruba: [
      "Fa agbara inu ati atunra rẹ",
      "Faraba nipasẹ awọn italaya pẹlu ipinnu ti o duro",
      "Ranti pe ifarabale n kọ iwa ati ọgbọn"
    ],
    reflection: "What inner strengths can I call upon to persevere through current challenges?",
    reflectionYoruba: "Awọn okun inu wo ni mo le pe lati faraba nipasẹ awọn italaya lọwọlọwọ?",
    pattern: [[false, true, true, false], [false, true, true, false]],
    description: "Okanran Meji represents perseverance, endurance, and inner strength. It speaks to resilience, determination, and the wisdom gained through overcoming obstacles.",
    descriptionYoruba: "Okanran Meji duro fun ifarada, ifarabale, ati okun inu. O sọrọ si atunra, ipinnu, ati ọgbọn ti a gba nipasẹ biba awọn idiwọ kọja.",
    keywords: ["perseverance", "endurance", "strength", "resilience", "determination"],
    keywordsYoruba: ["ifarada", "ifarabale", "okun", "atunra", "ipinnu"]
  },
  {
    name: "Ogunda Meji",
    nameYoruba: "Ogunda Meji",
    subtitle: "The Odu of Warrior Spirit",
    subtitleYoruba: "Odu ti Ẹmi Jagunjagun",
    element: "Iron",
    elementYoruba: "Irin",
    energy: "Courage",
    energyYoruba: "Igboya",
    message: "The warrior spirit awakens within you today. This is a time for courage, action, and standing up for what is right. Face your challenges with bravery and determination. Victory comes to those who fight with honor and righteousness.",
    messageYoruba: "Ẹmi jagunjagun ji ninu rẹ loni. Eyi jẹ akoko fun igboya, iṣe, ati diduro fun ohun ti o tọ. Koji awọn italaya rẹ pẹlu igboya ati ipinnu. Iṣẹgun wa fun awọn ti o ja pẹlu ọla ati ododo.",
    guidance: [
      "Stand up for your beliefs and values",
      "Take decisive action when necessary",
      "Fight for justice with courage and honor"
    ],
    guidanceYoruba: [
      "Duro fun awọn igbagbọ ati awọn iye rẹ",
      "Gbe iṣe ipinnu nigbati o ba ṣe pataki",
      "Ja fun ododo pẹlu igboya ati ọla"
    ],
    reflection: "Where in my life do I need to embody the courage and strength of a spiritual warrior?",
    reflectionYoruba: "Nibo ni igbesi aye mi ni mo nilo lati ṣe afihan igboya ati okun jagunjagun ẹmi?",
    pattern: [[true, true, true, false], [true, true, true, false]],
    description: "Ogunda Meji represents the warrior spirit, courage, and righteous action. It speaks to standing up for justice, taking decisive action, and fighting for what is right.",
    descriptionYoruba: "Ogunda Meji duro fun ẹmi jagunjagun, igboya, ati iṣe ododo. O sọrọ si diduro fun idajọ, gbigbe iṣe ipinnu, ati jija fun ohun ti o tọ.",
    keywords: ["courage", "warrior", "justice", "action", "righteousness"],
    keywordsYoruba: ["igboya", "jagunjagun", "idajọ", "iṣe", "ododo"]
  },
  {
    name: "Osa Meji",
    nameYoruba: "Osa Meji",
    subtitle: "The Odu of Time and Patience",
    subtitleYoruba: "Odu ti Akoko ati Suuru",
    element: "Moon",
    elementYoruba: "Oṣupa",
    energy: "Timing",
    energyYoruba: "Akoko",
    message: "Divine timing governs all things in life. Today reminds you that patience is a sacred virtue. What you seek will manifest in its proper time. Trust in the natural rhythms of life and allow events to unfold as they should.",
    messageYoruba: "Akoko Ọlọrun n darí gbogbo nkan ninu aye. Oni leti rẹ pe suuru jẹ iwa rere mimọ. Ohun ti o n wa yoo farahẹ ni akoko rẹ ti o tọ. Gbẹkẹle awọn ịlù adayeba ti aye ki o si jẹ ki awọn iṣẹlẹ ṣẹlẹ bi o ti yẹ.",
    guidance: [
      "Trust in divine timing for all matters",
      "Practice patience with yourself and others",
      "Recognize that some things cannot be rushed"
    ],
    guidanceYoruba: [
      "Gbẹkẹle akoko Ọlọrun fun gbogbo ọrọ",
      "Ṣe suuru pẹlu ara rẹ ati awọn ẹlomiran",
      "Mọ pe awọn nkan miiran ko le yara"
    ],
    reflection: "How can I better align myself with the natural timing of my life's unfolding?",
    reflectionYoruba: "Bawo ni mo ṣe le ṣe atunto ara mi daradara pẹlu akoko adayeba ti ṣiṣi igbesi aye mi?",
    pattern: [[false, false, false, true], [false, false, false, true]],
    description: "Osa Meji represents divine timing, patience, and the wisdom of natural rhythms. It speaks to trusting the process, waiting for the right moment, and understanding that all things have their season.",
    descriptionYoruba: "Osa Meji duro fun akoko Ọlọrun, suuru, ati ọgbọn awọn ịlù adayeba. O sọrọ si gbigbekele ilana naa, dide fun akoko ti o tọ, ati oye pe gbogbo nkan ni akoko wọn.",
    keywords: ["timing", "patience", "rhythm", "trust", "natural cycles"],
    keywordsYoruba: ["akoko", "suuru", "ịlu", "igbekele", "awọn iyipo adayeba"]
  },
  {
    name: "Ika Meji",
    nameYoruba: "Ika Meji",
    subtitle: "The Odu of Destiny and Purpose",
    subtitleYoruba: "Odu ti Oriire ati Idi",
    element: "Star",
    elementYoruba: "Irawọ",
    energy: "Destiny",
    energyYoruba: "Oriire",
    message: "Your destiny calls to you with clarity today. The path of your life purpose becomes more visible. Trust in the unique gifts you bring to the world and step boldly into your destined role. The universe supports your highest calling.",
    messageYoruba: "Oriire rẹ n pe ọ pẹlu aseyori loni. Ọna idi igbesi aye rẹ di kedere diẹ sii. Gbẹkẹle awọn ẹbun alailẹgbẹ ti o mu wa si aye ki o si tẹ igboya sinu ipa oriire rẹ. Agbaiye n ṣe atilẹyin ipe giga rẹ.",
    guidance: [
      "Align your actions with your life purpose",
      "Trust in your unique gifts and abilities",
      "Take steps toward fulfilling your destiny"
    ],
    guidanceYoruba: [
      "Ṣe atunto awọn iṣe rẹ pẹlu idi igbesi aye rẹ",
      "Gbẹkẹle awọn ẹbun ati agbara alailẹgbẹ rẹ",
      "Gbe awọn igbesẹ si imuṣẹ oriire rẹ"
    ],
    reflection: "How can I better align my daily actions with my soul's deeper purpose?",
    reflectionYoruba: "Bawo ni mo ṣe le ṣe atunto awọn iṣe ojoojumọ mi daradara pẹlu idi jinlẹ ọkàn mi?",
    pattern: [[true, false, true, true], [true, false, true, true]],
    description: "Ika Meji represents destiny, life purpose, and the fulfillment of one's spiritual mission. It speaks to recognizing your unique path and having the courage to follow it.",
    descriptionYoruba: "Ika Meji duro fun oriire, idi igbesi aye, ati imuṣẹ iṣẹ apinfunni ẹmi ẹni. O sọrọ si mimọ ọna alailẹgbẹ rẹ ati nini igboya lati tẹle e.",
    keywords: ["destiny", "purpose", "calling", "gifts", "mission"],
    keywordsYoruba: ["oriire", "idi", "ipe", "awọn ẹbun", "iṣẹ apinfunni"]
  },
  {
    name: "Oturupon Meji",
    nameYoruba: "Oturupon Meji",
    subtitle: "The Odu of Wisdom and Teaching",
    subtitleYoruba: "Odu ti Ọgbọn ati Ikọni",
    element: "Book",
    elementYoruba: "Iwe",
    energy: "Wisdom",
    energyYoruba: "Ọgbọn",
    message: "You are called to be both student and teacher today. Wisdom flows through you from ancient sources. Share your knowledge generously and remain open to learning from others. True wisdom grows when it is given away.",
    messageYoruba: "A n pe ọ lati jẹ mejeeji ọmọ ile-iwe ati olukọ loni. Ọgbọn n san nipasẹ rẹ lati awọn orisun atijọ. Pin imọ rẹ ni ọpọlọpọ ki o si wa ni ṣiṣi si kikọ lati ọdọ awọn ẹlomiran. Ọgbọn gidi n dagba nigbati a ba fi fun ni.",
    guidance: [
      "Share your knowledge and wisdom with others",
      "Remain humble and open to learning",
      "Honor the teachers who have guided you"
    ],
    guidanceYoruba: [
      "Pin imọ ati ọgbọn rẹ pẹlu awọn ẹlomiran",
      "Wa ni onirẹlẹ ki o si ṣii si ẹkọ",
      "Bu ọla fun awọn olukọ ti o ti ṣe itọsọna rẹ"
    ],
    reflection: "What wisdom do I carry that could benefit others, and what do I still need to learn?",
    reflectionYoruba: "Ọgbọn wo ni mo gbe ti o le ṣe anfani fun awọn ẹlomiran, ati kini mo tun nilo lati kọ?",
    pattern: [[false, true, false, true], [false, true, false, true]],
    description: "Oturupon Meji represents wisdom, teaching, and the sharing of knowledge. It speaks to the responsibility of passing on what we have learned and remaining open to continued growth.",
    descriptionYoruba: "Oturupon Meji duro fun ọgbọn, ikọni, ati pinpin imọ. O sọrọ si ojuṣe ti fifun ni ohun ti a ti kọ ati ṣiṣi si idagbasoke ti o tẹsiwaju.",
    keywords: ["wisdom", "teaching", "knowledge", "learning", "sharing"],
    keywordsYoruba: ["ọgbọn", "ikọni", "imọ", "ẹkọ", "pinpin"]
  },
  {
    name: "Otura Meji",
    nameYoruba: "Otura Meji",
    subtitle: "The Odu of Spiritual Fire",
    subtitleYoruba: "Odu ti Ina Ẹmi",
    element: "Sacred Fire",
    elementYoruba: "Ina Mimọ",
    energy: "Purification",
    energyYoruba: "Ifọmọ",
    message: "Sacred fire burns within your spirit today, purifying and transforming your being. This is a powerful time for spiritual cleansing and renewal. Let go of what no longer serves you and embrace your spiritual evolution.",
    messageYoruba: "Ina mimọ n jo ninu ẹmi rẹ loni, ti n fọ ati yi eniyan rẹ pada. Eyi jẹ akoko ti o lagbara fun ifọmọ ẹmi ati isọdọtun. Tu ohun ti ko si sin ọ mọ silẹ ki o si gba idagbasoke ẹmi rẹ.",
    guidance: [
      "Engage in spiritual purification practices",
      "Release old patterns and negative energies",
      "Embrace your spiritual transformation"
    ],
    guidanceYoruba: [
      "Ṣe awọn iṣe ifọmọ ẹmi",
      "Tu awọn ilana atijọ ati awọn agbara odi silẹ",
      "Gba iyipada ẹmi rẹ"
    ],
    reflection: "What aspects of my life are ready to be purified and transformed by spiritual fire?",
    reflectionYoruba: "Awọn abala wo ti igbesi aye mi ti ṣetan lati di ifọ ati yipada nipasẹ ina ẹmi?",
    pattern: [[true, true, false, false], [true, true, false, false]],
    description: "Otura Meji represents spiritual fire, purification, and divine transformation. It speaks to the burning away of what is no longer needed and the emergence of spiritual purity.",
    descriptionYoruba: "Otura Meji duro fun ina ẹmi, ifọmọ, ati iyipada Ọlọrun. O sọrọ si sisun ohun ti ko nilo mọ ati ifarahan mimọ ẹmi.",
    keywords: ["purification", "spiritual fire", "transformation", "cleansing", "renewal"],
    keywordsYoruba: ["ifọmọ", "ina ẹmi", "iyipada", "ifọmọ", "isọdọtun"]
  },
  {
    name: "Irete Meji",
    nameYoruba: "Irete Meji",
    subtitle: "The Odu of Determination and Will",
    subtitleYoruba: "Odu ti Ipinnu ati Ife",
    element: "Thunder",
    elementYoruba: "Ara",
    energy: "Determination",
    energyYoruba: "Ipinnu",
    message: "Your will is your power today. Like thunder that shakes the earth, your determination can move mountains. Set clear intentions and pursue them with unwavering focus. Success comes to those who persist with purpose.",
    messageYoruba: "Ife rẹ ni agbara rẹ loni. Bi ara ti n mi ile, ipinnu rẹ le gbe awọn oke. Ṣeto awọn ero ti o han kedere ki o si lepa wọn pẹlu idojukọ ti ko yẹ. Aṣeyọri wa fun awọn ti o faraba pẹlu idi.",
    guidance: [
      "Set clear goals and pursue them with focus",
      "Use your willpower to overcome obstacles",
      "Maintain determination even when facing resistance"
    ],
    guidanceYoruba: [
      "Ṣeto awọn ibi-afẹde ti o han kedere ki o si lepa wọn pẹlu idojukọ",
      "Lo agbara ife rẹ lati bori awọn idiwọ",
      "Ṣe iduroṣinṣin ipinnu paapaa nigbati o ba koju atako"
    ],
    reflection: "How can I better harness my willpower to achieve my most important goals?",
    reflectionYoruba: "Bawo ni mo ṣe le lo agbara ife mi daradara lati ṣaṣeyọri awọn ibi-afẹde mi ti o ṣe pataki julọ?",
    pattern: [[false, false, true, false], [false, false, true, false]],
    description: "Irete Meji represents determination, willpower, and the strength to overcome any obstacle. It speaks to the power of focused intention and unwavering commitment.",
    descriptionYoruba: "Irete Meji duro fun ipinnu, agbara ife, ati okun lati bori eyikeyi idiwọ. O sọrọ si agbara ero ti o dojukọ ati adehun ti ko yẹ.",
    keywords: ["determination", "willpower", "focus", "intention", "persistence"],
    keywordsYoruba: ["ipinnu", "agbara ife", "idojukọ", "ero", "ifarada"]
  },
  {
    name: "Ose Meji",
    nameYoruba: "Ose Meji",
    subtitle: "The Odu of Abundance and Flow",
    subtitleYoruba: "Odu ti Ọpọlọpọ ati Ṣiṣan",
    element: "River",
    elementYoruba: "Odo",
    energy: "Abundance",
    energyYoruba: "Ọpọlọpọ",
    message: "Abundance flows into your life like a mighty river. Today brings opportunities for prosperity and growth. Open your heart to receive the gifts the universe offers. Share your abundance and it will multiply.",
    messageYoruba: "Ọpọlọpọ n san sinu igbesi aye rẹ bi odo nla. Oni mu awọn aye wa fun ọrọ ati idagbasoke. Ṣii ọkan rẹ lati gba awọn ẹbun ti agbaiye n funni. Pin ọpọlọpọ rẹ ki yoo si pọ si.",
    guidance: [
      "Open yourself to receiving abundance",
      "Share your blessings with others",
      "Trust in the continuous flow of prosperity"
    ],
    guidanceYoruba: [
      "Ṣii ara rẹ si gbigba ọpọlọpọ",
      "Pin awọn ibukun rẹ pẹlu awọn ẹlomiran",
      "Gbẹkẹle ṣiṣan lemọlemọ ti ọrọ"
    ],
    reflection: "How can I better align myself with the natural flow of abundance in my life?",
    reflectionYoruba: "Bawo ni mo ṣe le ṣe atunto ara mi daradara pẹlu ṣiṣan adayeba ti ọpọlọpọ ninu igbesi aye mi?",
    pattern: [[true, false, false, false], [true, false, false, false]],
    description: "Ose Meji represents abundance, prosperity, and the generous flow of life's blessings. It speaks to receiving and sharing wealth in all its forms - material, emotional, and spiritual.",
    descriptionYoruba: "Ose Meji duro fun ọpọlọpọ, ọrọ, ati ṣiṣan oninurere ti awọn ibukun aye. O sọrọ si gbigba ati pinpin ọrọ ni gbogbo awọn irisi rẹ - ohun ini, ẹdun, ati ẹmi.",
    keywords: ["abundance", "prosperity", "flow", "generosity", "blessings"],
    keywordsYoruba: ["ọpọlọpọ", "ọrọ", "ṣiṣan", "oninurere", "awọn ibukun"]
  },
  {
    name: "Ofun Meji",
    nameYoruba: "Ofun Meji",
    subtitle: "The Odu of Peace and Harmony",
    subtitleYoruba: "Odu ti Alaafia ati Ibaramu",
    element: "White Light",
    elementYoruba: "Imole Funfun",
    energy: "Peace",
    energyYoruba: "Alaafia",
    message: "Divine peace descends upon your life today. Harmony replaces discord, and understanding replaces confusion. You are blessed with the gift of bringing peace to situations and people. Share this gift freely.",
    messageYoruba: "Alaafia Ọlọrun ba si igbesi aye rẹ loni. Ibaramu dipo aiyede, ati oye dipo iporuru. O ni ibukun pẹlu ẹbun mimu alaafia wa si awọn ipo ati eniyan. Pin ẹbun yi ni ọfẹ.",
    guidance: [
      "Seek harmony in all your relationships",
      "Be a peacemaker in conflicts around you",
      "Cultivate inner peace through spiritual practice"
    ],
    guidanceYoruba: [
      "Wa ibaramu ninu gbogbo awọn ibatan rẹ",
      "Jẹ aṣalaafia ninu awọn aiyede ti o yika ọ",
      "Ṣe idagbasoke alaafia inu nipasẹ iṣe ẹmi"
    ],
    reflection: "How can I contribute to greater peace and harmony in my world?",
    reflectionYoruba: "Bawo ni mo ṣe le ṣe alabapin si alaafia ati ibaramu ti o tobi si ni agbaiye mi?",
    pattern: [[false, true, true, true], [false, true, true, true]],
    description: "Ofun Meji represents peace, harmony, and divine blessing. It speaks to the power of peaceful resolution, the gift of bringing harmony to chaos, and the blessing of divine grace.",
    descriptionYoruba: "Ofun Meji duro fun alaafia, ibaramu, ati ibukun Ọlọrun. O sọrọ si agbara ipinnu alaafia, ẹbun mimu ibaramu wa si rudurudu, ati ibukun ti ore-ọfẹ Ọlọrun.",
    keywords: ["peace", "harmony", "blessing", "grace", "unity"],
    keywordsYoruba: ["alaafia", "ibaramu", "ibukun", "ore-ọfẹ", "iṣọkan"]
  },
  // Additional Odu combinations for more comprehensive yearly coverage
  {
    name: "Ogbe Oyeku",
    nameYoruba: "Ogbe Oyeku",
    subtitle: "The Odu of Dawn Breaking",
    subtitleYoruba: "Odu ti Alẹ n Mọ",
    element: "Dawn",
    elementYoruba: "Alẹ",
    energy: "Transition",
    energyYoruba: "Iyipada",
    message: "The transition from darkness to light brings new understanding. What was hidden is now being revealed. Trust the process of gradual illumination in your life.",
    messageYoruba: "Iyipada lati okunkun si imole mu oye tuntun wa. Ohun ti o pamọ ni a n ṣafihan bayi. Gbẹkẹle ilana imole diẹdiẹ ninu igbesi aye rẹ.",
    guidance: [
      "Be patient with gradual revelations",
      "Prepare for positive changes ahead", 
      "Trust your growing awareness"
    ],
    guidanceYoruba: [
      "Ni suru pẹlu awọn ifihan diẹdiẹ",
      "Mura silẹ fun awọn ayipada rere ti o nbọ",
      "Gbẹkẹle akiyesi rẹ ti n dagba"
    ],
    reflection: "What new awareness is emerging in my life right now?",
    reflectionYoruba: "Iru akiyesi tuntun wo ni o n jade ninu igbesi aye mi ni bayi?",
    pattern: [[true, true, true, true], [false, false, false, false]],
    description: "Ogbe Oyeku represents the sacred transition from darkness to light, mystery to clarity, and the dawning of new consciousness.",
    descriptionYoruba: "Ogbe Oyeku duro fun iyipada mimo lati okunkun si imole, ohun ijinle si aseyori, ati alẹ ti ori-inu tuntun.",
    keywords: ["transition", "dawn", "revelation", "awareness", "emergence"],
    keywordsYoruba: ["iyipada", "alẹ", "ifihan", "akiyesi", "jade"]
  },
  {
    name: "Oyeku Iwori",
    nameYoruba: "Oyeku Iwori",
    subtitle: "The Odu of Deep Wisdom",
    subtitleYoruba: "Odu ti Ọgbọn Jinlẹ",
    element: "Deep Waters",
    elementYoruba: "Omi Jinlẹ",
    energy: "Wisdom",
    energyYoruba: "Ọgbọn",
    message: "Ancient wisdom rises from the depths of your being. Listen to the voice of your ancestors and the knowledge within your soul. Deep understanding comes through patience and reflection.",
    messageYoruba: "Ọgbọn atijọ dide lati ijinle ẹda rẹ. Gbọ ohun awọn baba nla rẹ ati imọ ti o wa ninu ọkan rẹ. Oye jinlẹ wa nipasẹ suru ati ìronu.",
    guidance: [
      "Seek wisdom from elder teachings",
      "Trust your ancestral knowledge",
      "Practice deep contemplation"
    ],
    guidanceYoruba: [
      "Wa ọgbọn lati awọn ẹkọ agbalagba",
      "Gbẹkẹle imọ awọn baba rẹ",
      "Ṣe ìronu jinlẹ"
    ],
    reflection: "What ancient wisdom is my soul trying to share with me?",
    reflectionYoruba: "Iru ọgbọn atijọ wo ni ọkan mi n gbiyanju lati pin pẹlu mi?",
    pattern: [[false, false, false, false], [true, false, true, false]],
    description: "Oyeku Iwori speaks to the depths of ancestral wisdom and the profound knowledge that emerges from inner reflection and spiritual connection.",
    descriptionYoruba: "Oyeku Iwori sọrọ si ijinle ọgbọn awọn baba ati imọ jinlẹ ti o jade lati ìronu inu ati asopọ ẹmi.",
    keywords: ["ancestral wisdom", "depth", "soul knowledge", "contemplation", "tradition"],
    keywordsYoruba: ["ọgbọn baba", "ijinle", "imọ ọkan", "ìronu", "aṣa"]
  },
  {
    name: "Iwori Odi",
    nameYoruba: "Iwori Odi",
    subtitle: "The Odu of Sacred Boundaries",
    subtitleYoruba: "Odu ti Awọn Ala Mimo",
    element: "Earth",
    elementYoruba: "Ilẹ",
    energy: "Protection",
    energyYoruba: "Aabo",
    message: "Sacred boundaries protect what is precious. Today calls for establishing healthy limits and protecting your energy. Know when to say yes and when to say no.",
    messageYoruba: "Awọn ala mimo n daabobo ohun ti o ṣe pataki. Oni npe fun fifi awọn ala ilera kalẹ ati didaabobo agbara rẹ. Mọ igba ti o yẹ ki o wi bẹẹni ati igba ti o yẹ ki o wi rara.",
    guidance: [
      "Set clear boundaries in relationships",
      "Protect your energy and resources",
      "Honor your personal space"
    ],
    guidanceYoruba: [
      "Ṣeto awọn ala kedere ninu awọn ibatan",
      "Daabobo agbara ati awọn ohun ini rẹ",
      "Bọwọ fun aaye ti ara rẹ"
    ],
    reflection: "Where do I need to establish healthier boundaries in my life?",
    reflectionYoruba: "Nibo ni mo nilo lati fi awọn ala ti o ni ilera kalẹ ninu igbesi aye mi?",
    pattern: [[true, false, true, false], [false, true, false, false]],
    description: "Iwori Odi teaches the importance of sacred boundaries, self-protection, and the wisdom of knowing when to engage and when to withdraw.",
    descriptionYoruba: "Iwori Odi kọ pataki awọn ala mimo, idaabobo ara ẹni, ati ọgbọn mimọ igba ti o yẹ ki o lọwọ ati igba ti o yẹ ki o yọkuro.",
    keywords: ["boundaries", "protection", "limits", "self-care", "wisdom"],
    keywordsYoruba: ["awọn ala", "aabo", "awọn iye", "itọju ara ẹni", "ọgbọn"]
  },
  {
    name: "Odi Irosun",
    nameYoruba: "Odi Irosun",
    subtitle: "The Odu of Healing Waters",
    subtitleYoruba: "Odu ti Omi Iwosan",
    element: "Healing Water",
    elementYoruba: "Omi Iwosan",
    energy: "Purification",
    energyYoruba: "Ifọmọ",
    message: "Healing waters wash away old wounds and purify your spirit. Allow emotional cleansing to occur naturally. What has been blocking your flow is now being cleared.",
    messageYoruba: "Omi iwosan n wẹ awọn ọgbẹ atijọ kuro ti n sọ ẹmi rẹ di mimọ. Jẹ ki ifọmọ ẹdun ṣẹlẹ ni adayeba. Ohun ti o ti n dina ṣiṣan rẹ ni a n ko kuro bayi.",
    guidance: [
      "Allow emotional healing to flow",
      "Release what no longer serves you",
      "Embrace spiritual purification"
    ],
    guidanceYoruba: [
      "Jẹ ki iwosan ẹdun ṣan",
      "Tu ohun ti ko ṣe iranwọ fun ọ mọ silẹ",
      "Gba ifọmọ ẹmi",
      ],
    reflection: "What emotional wounds are ready to be healed in my life?",
    reflectionYoruba: "Awọn ọgbẹ ẹdun wo ni o ti ṣetan lati san ninu igbesi aye mi?",
    pattern: [[false, true, false, false], [true, true, false, true]],
    description: "Odi Irosun represents the healing power of water, emotional purification, and the release of old traumas that block spiritual flow.",
    descriptionYoruba: "Odi Irosun duro fun agbara iwosan ti omi, ifọmọ ẹdun, ati itusilẹ awọn ipalara atijọ ti o n dina ṣiṣan ẹmi.",
    keywords: ["healing", "purification", "emotional release", "cleansing", "flow"],
    keywordsYoruba: ["iwosan", "ifọmọ", "itusilẹ ẹdun", "iwẹ", "ṣiṣan"]
  },
  // Extended Odu combinations for comprehensive 365-day coverage
  {
    name: "Irosun Owonrin",
    nameYoruba: "Irosun Owonrin",
    subtitle: "The Odu of Flowing Change",
    subtitleYoruba: "Odu ti Ayipada Ṣiṣan",
    element: "Moving Water",
    elementYoruba: "Omi Gígbe",
    energy: "Adaptation",
    energyYoruba: "Bamọ",
    message: "Like water flowing around obstacles, you find new paths forward. Change is your ally today. Embrace flexibility and allow life's currents to guide you toward unexpected opportunities.",
    messageYoruba: "Bi omi ti n ṣan yi awọn idiwọ kọja, o ri awọn ọna tuntun siwaju. Ayipada jẹ ọrẹ rẹ loni. Gba irọrun ki o si jẹ ki awọn ṣiṣan aye tọ ọ si awọn aye ti a ko nireti.",
    guidance: [
      "Remain flexible in your approach to challenges",
      "Look for alternative pathways when blocked",
      "Trust in natural timing and flow"
    ],
    guidanceYoruba: [
      "Jẹ onirọrun ninu ọna rẹ si awọn italaya",
      "Wa awọn ọna miiran nigbati o ba ni idiwọ",
      "Gbẹkẹle akoko adayeba ati ṣiṣan"
    ],
    reflection: "How can I flow more gracefully with life's changes today?",
    reflectionYoruba: "Bawo ni mo ṣe le ṣan pẹlu awọn ayipada aye ni ọna oore loni?",
    pattern: [[true, true, false, true], [false, false, true, true]],
    description: "Irosun Owonrin teaches the art of graceful adaptation, flowing with change like water, and finding opportunity within transition.",
    descriptionYoruba: "Irosun Owonrin kọ iṣẹ bamọ oore, ṣiṣan pẹlu ayipada bi omi, ati wiwa aye laarin iyipada.",
    keywords: ["flow", "adaptation", "flexibility", "change", "opportunity"],
    keywordsYoruba: ["ṣiṣan", "bamọ", "irọrun", "ayipada", "aye"]
  },
  {
    name: "Owonrin Obara",
    nameYoruba: "Owonrin Obara",
    subtitle: "The Odu of Creative Fire",
    subtitleYoruba: "Odu ti Ina Ẹda",
    element: "Creative Fire",
    elementYoruba: "Ina Ẹda",
    energy: "Innovation",
    energyYoruba: "Imotuntun",
    message: "Creative fire burns within you today. Your unique vision has the power to transform situations and inspire others. Trust your innovative spirit and express your authentic self boldly.",
    messageYoruba: "Ina ẹda n jo ninu rẹ loni. Iran pataki rẹ ni agbara lati yi awọn ipo pada ati lati ru awọn ẹlomiran soke. Gbẹkẹle ẹmi imotuntun rẹ ki o si ṣafihan ara rẹ gangan ni igboya.",
    guidance: [
      "Express your creativity without fear",
      "Share your unique perspective with others",
      "Take bold action on innovative ideas"
    ],
    guidanceYoruba: [
      "Ṣafihan ẹda rẹ laisi ẹru",
      "Pin iran pataki rẹ pẹlu awọn ẹlomiran",
      "Ṣe igbese igboya lori awọn imọran imotuntun"
    ],
    reflection: "What creative vision is seeking expression through me today?",
    reflectionYoruba: "Iru iran ẹda wo ni o n wa ifihan nipasẹ mi loni?",
    pattern: [[false, false, true, true], [false, true, false, false]],
    description: "Owonrin Obara ignites the creative fire within, encouraging bold self-expression and innovative solutions to life's challenges.",
    descriptionYoruba: "Owonrin Obara tan ina ẹda ninu, iwari ifihan ara ẹni igboya ati awọn ojutu imotuntun si awọn italaya aye.",
    keywords: ["creativity", "innovation", "self-expression", "boldness", "vision"],
    keywordsYoruba: ["ẹda", "imotuntun", "ifihan ara ẹni", "igboya", "iran"]
  },
  {
    name: "Obara Okanran",
    nameYoruba: "Obara Okanran",
    subtitle: "The Odu of Inner Strength",
    subtitleYoruba: "Odu ti Okun Inu",
    element: "Iron",
    elementYoruba: "Irin",
    energy: "Fortitude",
    energyYoruba: "Okun",
    message: "Inner strength is your greatest asset today. Like iron forged in fire, you have been strengthened by past challenges. Stand firm in your convictions and trust in your resilience.",
    messageYoruba: "Okun inu ni ohun ini ti o tobi julọ loni. Bi irin ti a rọ ninu ina, awọn italaya atijọ ti mu ọ le. Duro ṣinṣin ninu awọn igbagbọ rẹ ki o si gbẹkẹle agbara atunpadabọ rẹ.",
    guidance: [
      "Draw upon your inner reserves of strength",
      "Stand firm in your values and beliefs",
      "Trust in your ability to overcome obstacles"
    ],
    guidanceYoruba: [
      "Fa lati awọn ipamọ okun inu rẹ",
      "Duro ṣinṣin ninu awọn iye ati igbagbọ rẹ",
      "Gbẹkẹle agbara rẹ lati bori awọn idiwọ"
    ],
    reflection: "How can I better access and trust my inner strength today?",
    reflectionYoruba: "Bawo ni mo ṣe le wọle daradara si okun inu mi ki n si gbẹkẹle loni?",
    pattern: [[false, true, false, false], [true, false, false, false]],
    description: "Obara Okanran reveals the unbreakable strength that lies within, forged through experience and tempered by wisdom.",
    descriptionYoruba: "Obara Okanran ṣafihan okun ti ko le fọ ti o wa ninu, ti a rọ nipasẹ iriri ti a si fi ọgbọn ṣe.",
    keywords: ["inner strength", "resilience", "fortitude", "determination", "endurance"],
    keywordsYoruba: ["okun inu", "agbara atunpadabọ", "okun", "ipinnu", "ifarada"]
  },
  {
    name: "Okanran Ogunda",
    nameYoruba: "Okanran Ogunda",
    subtitle: "The Odu of Warrior's Wisdom",
    subtitleYoruba: "Odu ti Ọgbọn Jagunjagun",
    element: "Steel",
    elementYoruba: "Irin Líle",
    energy: "Strategic Power",
    energyYoruba: "Agbara Eto",
    message: "Warrior's wisdom guides your actions today. True strength lies not in conflict but in strategic thinking and measured response. Fight only battles worth winning, and choose your ground wisely.",
    messageYoruba: "Ọgbọn jagunjagun n tọ awọn iṣe rẹ loni. Okun gangan ko wa ninu ija ṣugbọn ninu ironu eto ati idahun ti a wọn. Ja awọn ija ti o yẹ lati ṣẹgun nikan, ki o si yan ilẹ rẹ ni ọgbọn.",
    guidance: [
      "Think strategically before taking action",
      "Choose your battles wisely",
      "Use wisdom rather than force to solve problems"
    ],
    guidanceYoruba: [
      "Ronu ni eto ṣaaju ṣiṣe",
      "Yan awọn ija rẹ ni ọgbọn",
      "Lo ọgbọn dipo agbara lati yanju awọn iṣoro"
    ],
    reflection: "What battles in my life are truly worth fighting?",
    reflectionYoruba: "Awọn ija wo ninu igbesi aye mi ni o yẹ lati ja gangan?",
    pattern: [[true, false, false, false], [true, true, false, false]],
    description: "Okanran Ogunda embodies the wisdom of the spiritual warrior, teaching strategic action and the power of focused intent.",
    descriptionYoruba: "Okanran Ogunda ṣe akawe ọgbọn jagunjagun ẹmi, kiko iṣe eto ati agbara ero ti o dojukọ.",
    keywords: ["strategy", "wisdom", "warrior spirit", "focus", "calculated action"],
    keywordsYoruba: ["eto", "ọgbọn", "ẹmi jagunjagun", "idojukọ", "iṣe iṣiro"]
  },
  {
    name: "Ogunda Osa",
    nameYoruba: "Ogunda Osa",
    subtitle: "The Odu of Divine Victory",
    subtitleYoruba: "Odu ti Iṣẹgun Ọlọrun",
    element: "Lightning",
    elementYoruba: "Mọnamọna",
    energy: "Triumph",
    energyYoruba: "Iṣẹgun",
    message: "Divine victory is within your reach. The universe aligns to support your righteous endeavors. Stay true to your path and trust that justice and truth will prevail.",
    messageYoruba: "Iṣẹgun Ọlọrun wa laarin ọwọ rẹ. Agbaiye ṣeto lati ṣe atilẹyin awọn iṣe ododo rẹ. Jẹ olootitọ si ọna rẹ ki o si gbẹkẹle pe idajọ ati otitọ yoo ṣẹgun.",
    guidance: [
      "Maintain integrity in all your actions",
      "Trust in divine justice and timing",
      "Celebrate your victories with humility"
    ],
    guidanceYoruba: [
      "Ṣe iduroṣinṣin otitọ ninu gbogbo awọn iṣe rẹ",
      "Gbẹkẹle idajọ Ọlọrun ati akoko",
      "Ṣe ayẹyẹ awọn iṣẹgun rẹ pẹlu irẹlẹ"
    ],
    reflection: "How can I align my actions with divine will and justice?",
    reflectionYoruba: "Bawo ni mo ṣe le ṣe atunto awọn iṣe mi pẹlu ife Ọlọrun ati idajọ?",
    pattern: [[true, true, false, false], [false, false, false, true]],
    description: "Ogunda Osa represents divine triumph over adversity, the victory of truth over falsehood, and the power of righteous action.",
    descriptionYoruba: "Ogunda Osa duro fun iṣẹgun Ọlọrun lori wahala, iṣẹgun otitọ lori eke, ati agbara iṣe ododo.",
    keywords: ["victory", "divine justice", "triumph", "righteousness", "truth"],
    keywordsYoruba: ["iṣẹgun", "idajọ Ọlọrun", "iṣẹgun", "ododo", "otitọ"]
  },
  {
    name: "Osa Ika",
    nameYoruba: "Osa Ika",
    subtitle: "The Odu of Penetrating Insight",
    subtitleYoruba: "Odu ti Oye Gunguno",
    element: "Sharp Wind",
    elementYoruba: "Afẹfẹ Dimu",
    energy: "Clarity",
    energyYoruba: "Aseyori",
    message: "Penetrating insight cuts through illusion today. Your ability to see beyond surface appearances reveals hidden truths. Trust your discernment and act upon your deepest knowing.",
    messageYoruba: "Oye gunguno ge illusioni kọja loni. Agbara rẹ lati ri ju awọn irisi oju wa ifihan awọn otitọ ti o pamọ. Gbẹkẹle iyasọtọ rẹ ki o si ṣe lori imọ ti o jinlẹ julọ.",
    guidance: [
      "Look beyond surface appearances",
      "Trust your intuitive insights",
      "Use discernment in all relationships"
    ],
    guidanceYoruba: [
      "Wo ju awọn irisi oju lọ",
      "Gbẹkẹle awọn oye inu rẹ",
      "Lo iyasọtọ ninu gbogbo awọn ibatan"
    ],
    reflection: "What hidden truths is my intuition revealing to me today?",
    reflectionYoruba: "Awọn otitọ ti o pamọ wo ni oye inu mi n fi han mi loni?",
    pattern: [[false, false, false, true], [true, false, true, false]],
    description: "Osa Ika provides the gift of penetrating insight, allowing one to see through deception and understand the deeper currents of truth.",
    descriptionYoruba: "Osa Ika funni ni ẹbun oye gunguno, gbigba ẹnikan laaye lati ri nipasẹ ẹtan ati oye awọn ṣiṣan otitọ ti o jinlẹ.",
    keywords: ["insight", "discernment", "truth", "perception", "clarity"],
    keywordsYoruba: ["oye", "iyasọtọ", "otitọ", "iyalenu", "aseyori"]
  }
];