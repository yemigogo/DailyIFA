/**
 * Complete 256 Odu Ifá Generator with Traditional Names
 * Generates all major and minor Odu combinations with authentic traditional naming
 */

interface OduData {
  id: number;
  name: string;
  nameYoruba: string;
  category: 'major' | 'minor';
  primaryOdu: string;
  secondaryOdu?: string;
  meaning: string;
  meaningYoruba: string;
  proverb: string;
  proverbYoruba: string;
  audioUrl: string;
  spiritualFocus: string[];
  guidance: string;
  guidanceYoruba: string;
}

// Base Odu names for combinations
const baseOduNames = [
  "Ogbè", "Òyèkú", "Ìwòrì", "Òdí", "Ìròsù", "Ọ̀wọ́nrín", "Ọ̀bàrà", "Ọ̀kànràn",
  "Ògúndá", "Ọ̀sá", "Ìká", "Òtúrúpọ̀n", "Òtúrá", "Ìrẹtẹ̀", "Ọ̀ṣẹ́", "Òfún"
];

// 16 Major Odu data with traditional characteristics
const majorOduData = [
  {
    baseName: "Ogbè",
    meaning: "Light, strength, leadership, divine authority",
    meaningYoruba: "Ìmọ́lẹ̀, agbára, olórí, àṣẹ òrìṣà",
    proverb: "The light that shines brightest illuminates the path for all",
    proverbYoruba: "Ìmọ́lẹ̀ tí ó tàn jù ló ń fi ọ̀nà hàn fún gbogbo ènìyàn",
    spiritualFocus: ["Leadership", "Success", "Divine Connection", "New Beginnings"],
    guidance: "You are called to lead with wisdom and divine light",
    guidanceYoruba: "A pè ọ́ láti darí pẹ̀lú ọgbọ́n àti ìmọ́lẹ̀ òrìṣà"
  },
  {
    baseName: "Òyèkú",
    meaning: "Transformation, death and rebirth, spiritual transition",
    meaningYoruba: "Ìyípadà, ikú àti àtúnbí, ìyípo ẹ̀mí",
    proverb: "From darkness comes the greatest light",
    proverbYoruba: "Láti inú òkùnkùn ni ìmọ́lẹ̀ ńlá jù ń ti jáde",
    spiritualFocus: ["Transformation", "Renewal", "Spiritual Growth", "Endings"],
    guidance: "Embrace change as the pathway to spiritual evolution",
    guidanceYoruba: "Gbà ìyípadà gẹ́gẹ́ bí ọ̀nà sí ìdàgbàsókè ẹ̀mí"
  },
  {
    baseName: "Ìwòrì",
    meaning: "Patience, divination, spiritual knowledge, wisdom",
    meaningYoruba: "Sùúrù, fífá, ìmọ̀ ẹ̀mí, ọgbọ́n",
    proverb: "Patience is the key that opens all doors",
    proverbYoruba: "Sùúrù ni kọ́kọ́rọ́ tí ó ń ṣí gbogbo ẹnu-ọ̀nà",
    spiritualFocus: ["Divination", "Patience", "Spiritual Learning", "Inner Wisdom"],
    guidance: "Seek knowledge through patient spiritual practice",
    guidanceYoruba: "Wá ìmọ̀ nípasẹ̀ ìgbàgbọ́ ẹ̀mí pẹ̀lú sùúrù"
  },
  {
    baseName: "Òdí",
    meaning: "Birth, fertility, creation, new life",
    meaningYoruba: "Ìbímọ, ẹ̀yà, ìdá, ìgbésí ayé tuntun",
    proverb: "Where there is closure, new life begins",
    proverbYoruba: "Níbi tí títì bá wà, ìgbésí ayé tuntun ń bẹ̀rẹ̀",
    spiritualFocus: ["Fertility", "Creation", "New Projects", "Birth"],
    guidance: "Embrace new beginnings with courage and faith",
    guidanceYoruba: "Gbà ìbẹ̀rẹ̀ tuntun pẹ̀lú ìgboyà àti ìgbàgbọ́"
  },
  {
    baseName: "Ìròsù",
    meaning: "Confusion overcome, clarity, mental peace",
    meaningYoruba: "Ìdàrúdàpọ̀ tí a ṣẹ́gun, ìmọ̀ye, àlàáfíà ọkàn",
    proverb: "After the storm comes perfect calm",
    proverbYoruba: "Lẹ́yìn ìjì ni àlàáfíà pípé ń wá",
    spiritualFocus: ["Mental Clarity", "Peace", "Problem Solving", "Understanding"],
    guidance: "Find peace through understanding the nature of confusion",
    guidanceYoruba: "Wá àlàáfíà nípasẹ̀ òye ìdàrúdàpọ̀"
  },
  {
    baseName: "Ọ̀wọ́nrín",
    meaning: "Passion, extremes, careful balance needed",
    meaningYoruba: "Ìfẹ́kúfẹ̀ẹ́, àpọ́nléwajú, ìṣọ́ra àti ìdọ́gbà",
    proverb: "The river that flows too fast destroys its banks",
    proverbYoruba: "Odò tí ó ń sàn kíákíá a ba etí rẹ̀ jẹ́",
    spiritualFocus: ["Balance", "Moderation", "Passion Control", "Harmony"],
    guidance: "Seek balance in all passionate endeavors",
    guidanceYoruba: "Wá ìdọ́gbà nínú gbogbo iṣẹ́ ìfẹ́kúfẹ̀ẹ́"
  },
  {
    baseName: "Ọ̀bàrà",
    meaning: "Bloodline, family, ancestral connections",
    meaningYoruba: "Ìdílé ẹ̀jẹ̀, àwọn èbi, ìbáraẹnisọ̀rọ̀ àwọn baba ńlá",
    proverb: "The tree that forgets its roots will not bear fruit",
    proverbYoruba: "Igi tí ó gbàgbé gbòǹgbò rẹ̀ kì í so èso",
    spiritualFocus: ["Family", "Ancestry", "Blood Relations", "Heritage"],
    guidance: "Honor your ancestors and strengthen family bonds",
    guidanceYoruba: "Bọwọ̀ fún àwọn baba ńlá àti ṣe ìdílé mú"
  },
  {
    baseName: "Ọ̀kànràn",
    meaning: "Warnings, vigilance, spiritual protection",
    meaningYoruba: "Ìkìlọ̀, ìṣọ́ra, ààbò ẹ̀mí",
    proverb: "The wise person heeds the warning before the storm",
    proverbYoruba: "Ẹni tí ó gbọ́n máa ń gbọ́ ìkìlọ̀ kí ìjì tó dé",
    spiritualFocus: ["Warning", "Protection", "Vigilance", "Spiritual Defense"],
    guidance: "Stay alert and heed spiritual warnings for protection",
    guidanceYoruba: "Má ṣọ́ra kí o sì gbọ́ ìkìlọ̀ ẹ̀mí fún ààbò"
  },
  {
    baseName: "Ògúndá",
    meaning: "War, conflict resolution, cutting through obstacles",
    meaningYoruba: "Ogun, ìyànjú ìjà, gígé idà sí àwọn ìdènà",
    proverb: "The warrior fights not for glory but for peace",
    proverbYoruba: "Jagunjagun kì í jà fún ògo bí kò ṣe fún àlàáfíà",
    spiritualFocus: ["Conflict Resolution", "Cutting Obstacles", "Justice", "Protection"],
    guidance: "Face obstacles with courage and strategic thinking",
    guidanceYoruba: "Kojú àwọn ìdènà pẹ̀lú ìgboyà àti ìrò ọgbọ́n"
  },
  {
    baseName: "Ọ̀sá",
    meaning: "Flight, movement, escape from danger, travel",
    meaningYoruba: "Fò, ìgbésípò, àsálà kúrò nínú ewu, ìrìnàjò",
    proverb: "Sometimes wisdom lies in knowing when to move",
    proverbYoruba: "Nígbà míì ọgbọ́n wà nínú mímọ ìgbà tí a má lọ",
    spiritualFocus: ["Movement", "Travel", "Escape", "Strategic Retreat"],
    guidance: "Know when to advance and when to retreat strategically",
    guidanceYoruba: "Mọ ìgbà tí a má tẹ̀síwájú àti ìgbà tí a má padà sẹ́yìn"
  },
  {
    baseName: "Ìká",
    meaning: "Malevolence overcome, protection from evil",
    meaningYoruba: "Ìkà tí a ṣẹ́gun, àábo lọ́wọ́ búburú",
    proverb: "Light dispels all darkness",
    proverbYoruba: "Ìmọ́lẹ̀ ń lé gbogbo òkùnkùn kúrò",
    spiritualFocus: ["Protection", "Overcoming Evil", "Spiritual Defense", "Purification"],
    guidance: "Protect yourself spiritually and overcome negative forces",
    guidanceYoruba: "Dáàbò bo ara rẹ ní ti ẹ̀mí kí o sì ṣẹ́gun àwọn agbára búburú"
  },
  {
    baseName: "Òtúrúpọ̀n",
    meaning: "Healing, medicine, restoration of health",
    meaningYoruba: "Ìwòsàn, oogun, àtúnṣe ìlera",
    proverb: "The medicine that heals the body must first heal the spirit",
    proverbYoruba: "Oogun tí ó ń wo ara gbọ́dọ̀ kọ́kọ́ wo ẹ̀mí",
    spiritualFocus: ["Healing", "Medicine", "Health", "Restoration"],
    guidance: "Seek holistic healing for body, mind, and spirit",
    guidanceYoruba: "Wá ìwòsàn ológbò fún ara, ọkàn, àti ẹ̀mí"
  },
  {
    baseName: "Òtúrá",
    meaning: "Secrets revealed, hidden knowledge, mystical insight",
    meaningYoruba: "Àṣírí tí a tú, ìmọ̀ tí ó pamọ́, òye àjínde",
    proverb: "What is hidden in darkness shall be revealed in light",
    proverbYoruba: "Ohun tí a pamọ́ sínú òkùnkùn ni a ó tú jáde nínú ìmọ́lẹ̀",
    spiritualFocus: ["Hidden Knowledge", "Secrets", "Mystical Insight", "Revelation"],
    guidance: "Be open to receiving hidden wisdom and mystical insights",
    guidanceYoruba: "Ṣí ara rẹ sílẹ̀ láti gba ọgbọ́n tí ó pamọ́ àti òye àjínde"
  },
  {
    baseName: "Ìrẹtẹ̀",
    meaning: "Completeness, perfection, spiritual fulfillment",
    meaningYoruba: "Pípé, òdodo, ìmúnilójú ẹ̀mí",
    proverb: "The circle completes itself when beginning meets end",
    proverbYoruba: "Ìyika pé nígbà tí ìbẹ̀rẹ̀ bá pàdé òpin",
    spiritualFocus: ["Completion", "Perfection", "Fulfillment", "Spiritual Maturity"],
    guidance: "You are approaching spiritual completeness and fulfillment",
    guidanceYoruba: "Ìwọ ń súnmọ́ píparí ẹ̀mí àti ìmúnilójú"
  },
  {
    baseName: "Ọ̀ṣẹ́",
    meaning: "Flow, abundance, rivers of blessing",
    meaningYoruba: "Ṣàn, ọ̀pọ̀lọpọ̀, àwọn odò ìbùkún",
    proverb: "When the river flows freely, all lands are blessed",
    proverbYoruba: "Nígbà tí odò bá ń sàn láìléwu, gbogbo ilẹ̀ ń rí ìbùkún",
    spiritualFocus: ["Abundance", "Flow", "Blessing", "Prosperity"],
    guidance: "Allow abundance to flow freely through your life",
    guidanceYoruba: "Jẹ́ kí ọ̀pọ̀lọpọ̀ máa sàn láì léwu nínú ìgbésí ayé rẹ"
  },
  {
    baseName: "Òfún",
    meaning: "Generosity, giving, spiritual elevation, whiteness/purity",
    meaningYoruba: "Oníláárí, ṣíṣe ẹ̀bùn, ìgbésókè ẹ̀mí, funfun/mímọ́",
    proverb: "The hand that gives is blessed above the hand that receives",
    proverbYoruba: "Ọwọ́ tí ó ń fún ni ìbùkún jù ọwọ́ tí ó ń gba lọ",
    spiritualFocus: ["Generosity", "Giving", "Purity", "Spiritual Elevation"],
    guidance: "Practice generosity and maintain spiritual purity",
    guidanceYoruba: "Ṣe oníláárí kí o sì tọ́jú mímọ́ ẹ̀mí"
  }
];

// Function to generate traditional Odu name
function generateTraditionalOduName(primaryIndex: number, secondaryIndex: number): {name: string, nameYoruba: string} {
  const primaryName = baseOduNames[primaryIndex];
  const secondaryName = baseOduNames[secondaryIndex];
  
  if (primaryIndex === secondaryIndex) {
    // Major Odu (Méjì)
    const specialNames: Record<string, string> = {
      "Ogbè": "Èjì Ogbè",
      "Òyèkú": "Òyèkú Méjì",
      "Ìwòrì": "Ìwòrì Méjì",
      "Òdí": "Òdí Méjì",
      "Ìròsù": "Ìròsù Méjì",
      "Ọ̀wọ́nrín": "Ọ̀wọ́nrín Méjì",
      "Ọ̀bàrà": "Ọ̀bàrà Méjì",
      "Ọ̀kànràn": "Ọ̀kànràn Méjì",
      "Ògúndá": "Ògúndá Méjì",
      "Ọ̀sá": "Ọ̀sá Méjì",
      "Ìká": "Ìká Méjì",
      "Òtúrúpọ̀n": "Òtúrúpọ̀n Méjì",
      "Òtúrá": "Òtúrá Méjì",
      "Ìrẹtẹ̀": "Ìrẹtẹ̀ Méjì",
      "Ọ̀ṣẹ́": "Ọ̀ṣẹ́ Méjì",
      "Òfún": "Òfún Méjì"
    };
    
    return {
      name: specialNames[primaryName] || `${primaryName} Méjì`,
      nameYoruba: specialNames[primaryName] || `${primaryName} Méjì`
    };
  } else {
    // Minor Odu - traditional combination naming
    return {
      name: `${primaryName} ${secondaryName}`,
      nameYoruba: `${primaryName} ${secondaryName}`
    };
  }
}

// Function to generate all 256 Odu with proper traditional names
export function generateAll256Odu(): OduData[] {
  const allOdu: OduData[] = [];
  let oduId = 1;

  // Generate all 256 combinations (16 x 16)
  baseOduNames.forEach((primaryOdu, primaryIndex) => {
    baseOduNames.forEach((secondaryOdu, secondaryIndex) => {
      const oduNames = generateTraditionalOduName(primaryIndex, secondaryIndex);
      const primaryData = majorOduData[primaryIndex];
      const secondaryData = majorOduData[secondaryIndex];
      
      const isMajor = primaryIndex === secondaryIndex;
      
      allOdu.push({
        id: oduId++,
        name: oduNames.name,
        nameYoruba: oduNames.nameYoruba,
        category: isMajor ? 'major' : 'minor',
        primaryOdu: primaryOdu,
        secondaryOdu: isMajor ? undefined : secondaryOdu,
        meaning: isMajor ? 
          primaryData.meaning : 
          `Combination of ${primaryData.meaning.split(',')[0]} with ${secondaryData.meaning.split(',')[0]}`,
        meaningYoruba: isMajor ? 
          primaryData.meaningYoruba : 
          `Àkópọ̀ ${primaryData.meaningYoruba.split(',')[0]} pẹ̀lú ${secondaryData.meaningYoruba.split(',')[0]}`,
        proverb: isMajor ? 
          primaryData.proverb : 
          generateCombinedProverb(primaryData, secondaryData),
        proverbYoruba: isMajor ? 
          primaryData.proverbYoruba : 
          generateCombinedProverbYoruba(primaryData, secondaryData),
        audioUrl: `/static/audio/odu/${oduNames.name.toLowerCase().replace(/\s+/g, '_').replace(/[àáèéìíòóùúñẹọṣ]/g, (match) => {
          const map: Record<string, string> = {'à':'a','á':'a','è':'e','é':'e','ì':'i','í':'i','ò':'o','ó':'o','ù':'u','ú':'u','ñ':'n','ẹ':'e','ọ':'o','ṣ':'s'};
          return map[match] || match;
        })}.mp3`,
        spiritualFocus: isMajor ? 
          primaryData.spiritualFocus : 
          [...primaryData.spiritualFocus.slice(0, 2), ...secondaryData.spiritualFocus.slice(0, 2)],
        guidance: isMajor ? 
          primaryData.guidance : 
          generateCombinedGuidance(primaryData, secondaryData),
        guidanceYoruba: isMajor ? 
          primaryData.guidanceYoruba : 
          generateCombinedGuidanceYoruba(primaryData, secondaryData)
      });
    });
  });

  return allOdu;
}

function generateCombinedProverb(primary: any, secondary: any): string {
  return `When ${primary.baseName} meets ${secondary.baseName}, wisdom flows like rivers converging into the ocean.`;
}

function generateCombinedProverbYoruba(primary: any, secondary: any): string {
  return `Nígbà tí ${primary.baseName} bá pàdé ${secondary.baseName}, ọgbọ́n ń sàn bí odò tí ń papọ̀ sínú òkun.`;
}

function generateCombinedGuidance(primary: any, secondary: any): string {
  return `Balance the energy of ${primary.spiritualFocus[0]} with the wisdom of ${secondary.spiritualFocus[0]} in your spiritual journey.`;
}

function generateCombinedGuidanceYoruba(primary: any, secondary: any): string {
  return `Ṣe ìdọ̀tí agbára ${primary.spiritualFocus[0]} pẹ̀lú ọgbọ́n ${secondary.spiritualFocus[0]} nínú ìrìn àjò ẹ̀mí rẹ.`;
}

// API endpoint for getting all 256 Odu with pagination
export function getOduPaginated(page: number = 1, limit: number = 16): {
  odus: OduData[];
  totalPages: number;
  currentPage: number;
  totalOdus: number;
} {
  const allOdus = generateAll256Odu();
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    odus: allOdus.slice(startIndex, endIndex),
    totalPages: Math.ceil(allOdus.length / limit),
    currentPage: page,
    totalOdus: allOdus.length
  };
}

// Search Odu by name or meaning
export function searchOdu(query: string): OduData[] {
  const allOdus = generateAll256Odu();
  const searchTerm = query.toLowerCase();
  
  return allOdus.filter(odu => 
    odu.name.toLowerCase().includes(searchTerm) ||
    odu.nameYoruba.toLowerCase().includes(searchTerm) ||
    odu.meaning.toLowerCase().includes(searchTerm) ||
    odu.spiritualFocus.some(focus => focus.toLowerCase().includes(searchTerm))
  );
}

// Get Odu by category
export function getOduByCategory(category: 'major' | 'minor'): OduData[] {
  const allOdus = generateAll256Odu();
  return allOdus.filter(odu => odu.category === category);
}

// Get random Odu for daily reading
export function getRandomOdu(): OduData {
  const allOdus = generateAll256Odu();
  const randomIndex = Math.floor(Math.random() * allOdus.length);
  return allOdus[randomIndex];
}