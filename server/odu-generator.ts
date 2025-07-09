/**
 * Complete 256 Odu Ifá Generator
 * Generates all major and minor Odu combinations with authentic Yoruba names
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

// 16 Major Odu (Odu Méjì)
const majorOdu = [
  {
    name: "Èjì Ogbè",
    nameYoruba: "Èjì Ogbè",
    meaning: "Light, strength, leadership, divine authority",
    meaningYoruba: "Ìmọ́lẹ̀, agbára, olórí, àṣẹ òrìṣà",
    proverb: "The light that shines brightest illuminates the path for all",
    proverbYoruba: "Ìmọ́lẹ̀ tí ó tàn jù ló ń fi ọ̀nà hàn fún gbogbo ènìyàn",
    spiritualFocus: ["Leadership", "Success", "Divine Connection", "New Beginnings"],
    guidance: "You are called to lead with wisdom and divine light",
    guidanceYoruba: "A pè ọ́ láti darí pẹ̀lú ọgbọ́n àti ìmọ́lẹ̀ òrìṣà"
  },
  {
    name: "Òyèkú Méjì", 
    nameYoruba: "Òyèkú Méjì",
    meaning: "Transformation, death and rebirth, spiritual transition",
    meaningYoruba: "Ìyípadà, ikú àti àtúnbí, ìyípo ẹ̀mí",
    proverb: "From darkness comes the greatest light",
    proverbYoruba: "Láti inú òkùnkùn ni ìmọ́lẹ̀ ńlá jù ń ti jáde",
    spiritualFocus: ["Transformation", "Renewal", "Spiritual Growth", "Endings"],
    guidance: "Embrace change as the pathway to spiritual evolution",
    guidanceYoruba: "Gbà ìyípadà gẹ́gẹ́ bí ọ̀nà sí ìdàgbàsókè ẹ̀mí"
  },
  {
    name: "Ìwòrì Méjì",
    nameYoruba: "Ìwòrì Méjì", 
    meaning: "Patience, divination, spiritual knowledge, wisdom",
    meaningYoruba: "Sùúrù, fífá, ìmọ̀ ẹ̀mí, ọgbọ́n",
    proverb: "Patience is the key that opens all doors",
    proverbYoruba: "Sùúrù ni kọ́kọ́rọ́ tí ó ń ṣí gbogbo ẹnu-ọ̀nà",
    spiritualFocus: ["Divination", "Patience", "Spiritual Learning", "Inner Wisdom"],
    guidance: "Seek knowledge through patient spiritual practice",
    guidanceYoruba: "Wá ìmọ̀ nípasẹ̀ ìgbàgbọ́ ẹ̀mí pẹ̀lú sùúrù"
  },
  {
    name: "Òdí Méjì",
    nameYoruba: "Òdí Méjì",
    meaning: "Birth, fertility, creation, new life",
    meaningYoruba: "Ìbímọ, ẹ̀yà, ìdá, ìgbésí ayé tuntun",
    proverb: "Where there is closure, new life begins",
    proverbYoruba: "Níbi tí títì bá wà, ìgbésí ayé tuntun ń bẹ̀rẹ̀",
    spiritualFocus: ["Fertility", "Creation", "New Projects", "Birth"],
    guidance: "Embrace new beginnings with courage and faith",
    guidanceYoruba: "Gbà ìbẹ̀rẹ̀ tuntun pẹ̀lú ìgboyà àti ìgbàgbọ́"
  },
  {
    name: "Ìròsù Méjì",
    nameYoruba: "Ìròsù Méjì",
    meaning: "Confusion overcome, clarity, mental peace",
    meaningYoruba: "Ìdàrúdàpọ̀ tí a ṣẹ́gun, ìmọ̀ye, àlàáfíà ọkàn",
    proverb: "After the storm comes perfect calm",
    proverbYoruba: "Lẹ́yìn ìjì ni àlàáfíà pípé ń wá",
    spiritualFocus: ["Mental Clarity", "Peace", "Problem Solving", "Understanding"],
    guidance: "Find peace through understanding the nature of confusion",
    guidanceYoruba: "Wá àlàáfíà nípasẹ̀ òye ìdàrúdàpọ̀"
  },
  {
    name: "Ọ̀wọ́nrín Méjì",
    nameYoruba: "Ọ̀wọ́nrín Méjì",
    meaning: "Passion, extremes, careful balance needed",
    meaningYoruba: "Ìfẹ́kúfẹ̀ẹ́, àpọ́nléwajú, ìṣọ́ra àti ìdọ́gbà",
    proverb: "The river that flows too fast destroys its banks",
    proverbYoruba: "Odò tí ó ń sàn kíákíá a ba etí rẹ̀ jẹ́",
    spiritualFocus: ["Balance", "Moderation", "Passion Control", "Harmony"],
    guidance: "Seek balance in all passionate endeavors",
    guidanceYoruba: "Wá ìdọ́gbà nínú gbogbo iṣẹ́ ìfẹ́kúfẹ̀ẹ́"
  },
  {
    name: "Ọ̀bàrà Méjì",
    nameYoruba: "Ọ̀bàrà Méjì",
    meaning: "Bloodline, family, ancestral connections",
    meaningYoruba: "Ìdílé ẹ̀jẹ̀, àwọn èbi, ìbáraẹnisọ̀rọ̀ àwọn baba ńlá",
    proverb: "The tree that forgets its roots will not bear fruit",
    proverbYoruba: "Igi tí ó gbàgbé gbòǹgbò rẹ̀ kì í so èso",
    spiritualFocus: ["Family", "Ancestry", "Blood Relations", "Heritage"],
    guidance: "Honor your ancestors and strengthen family bonds",
    guidanceYoruba: "Bọwọ̀ fún àwọn baba ńlá àti ṣe ìdílé mú"
  },
  {
    name: "Ọ̀kànràn Méjì",
    nameYoruba: "Ọ̀kànràn Méjì",
    meaning: "Loss, hardship, eventual victory through perseverance",
    meaningYoruba: "Òfò, ìpọ́njú, ìṣẹ́gun nípasẹ̀ ìfaradà",
    proverb: "The palm tree bends but does not break",
    proverbYoruba: "Ọ̀pẹ tẹ́ kò fọ́",
    spiritualFocus: ["Perseverance", "Endurance", "Overcoming Loss", "Resilience"],
    guidance: "Endure current hardships knowing victory approaches",
    guidanceYoruba: "Farà da ìpọ́njú tí ó wà nísinsin yìí kí o mọ̀ pé ìṣẹ́gun ń bọ̀"
  },
  {
    name: "Ògúndá Méjì",
    nameYoruba: "Ògúndá Méjì", 
    meaning: "War, conflict resolution, cutting through obstacles",
    meaningYoruba: "Ogun, ìyànjú ìjà, gígé idà sí àwọn ìdènà",
    proverb: "The warrior fights not for glory but for peace",
    proverbYoruba: "Jagunjagun kì í jà fún ògo bí kò ṣe fún àlàáfíà",
    spiritualFocus: ["Conflict Resolution", "Cutting Obstacles", "Justice", "Protection"],
    guidance: "Face obstacles with courage and strategic thinking",
    guidanceYoruba: "Kojú àwọn ìdènà pẹ̀lú ìgboyà àti ìrò ọgbọ́n"
  },
  {
    name: "Ọ̀sá Méjì",
    nameYoruba: "Ọ̀sá Méjì",
    meaning: "Flight, movement, escape from danger, travel",
    meaningYoruba: "Fò, ìgbésípò, àsálà kúrò nínú ewu, ìrìnàjò",
    proverb: "Sometimes wisdom lies in knowing when to move",
    proverbYoruba: "Nígbà míì ọgbọ́n wà nínú mímọ ìgbà tí a má lọ",
    spiritualFocus: ["Movement", "Travel", "Escape", "Strategic Retreat"],
    guidance: "Know when to advance and when to retreat strategically",
    guidanceYoruba: "Mọ ìgbà tí a má tẹ̀síwájú àti ìgbà tí a má padà sẹ́yìn"
  },
  {
    name: "Ìká Méjì",
    nameYoruba: "Ìká Méjì",
    meaning: "Malevolence overcome, protection from evil",
    meaningYoruba: "Ìkà tí a ṣẹ́gun, àábo lọ́wọ́ búburú",
    proverb: "Light dispels all darkness",
    proverbYoruba: "Ìmọ́lẹ̀ ń lé gbogbo òkùnkùn kúrò",
    spiritualFocus: ["Protection", "Overcoming Evil", "Spiritual Defense", "Purification"],
    guidance: "Protect yourself spiritually and overcome negative forces",
    guidanceYoruba: "Dáàbò bo ara rẹ ní ti ẹ̀mí kí o sì ṣẹ́gun àwọn agbára búburú"
  },
  {
    name: "Òtúrúpọ̀n Méjì",
    nameYoruba: "Òtúrúpọ̀n Méjì",
    meaning: "Healing, medicine, restoration of health",
    meaningYoruba: "Ìwòsàn, oogun, àtúnṣe ìlera",
    proverb: "The medicine that heals the body must first heal the spirit",
    proverbYoruba: "Oogun tí ó ń wo ara gbọ́dọ̀ kọ́kọ́ wo ẹ̀mí",
    spiritualFocus: ["Healing", "Medicine", "Health", "Restoration"],
    guidance: "Seek holistic healing for body, mind, and spirit",
    guidanceYoruba: "Wá ìwòsàn ológbò fún ara, ọkàn, àti ẹ̀mí"
  },
  {
    name: "Òtúrá Méjì",
    nameYoruba: "Òtúrá Méjì",
    meaning: "Secrets revealed, hidden knowledge, mystical insight",
    meaningYoruba: "Àṣírí tí a tú, ìmọ̀ tí ó pamọ́, òye àjínde",
    proverb: "What is hidden in darkness shall be revealed in light",
    proverbYoruba: "Ohun tí a pamọ́ sínú òkùnkùn ni a ó tú jáde nínú ìmọ́lẹ̀",
    spiritualFocus: ["Hidden Knowledge", "Secrets", "Mystical Insight", "Revelation"],
    guidance: "Be open to receiving hidden wisdom and mystical insights",
    guidanceYoruba: "Ṣí ara rẹ sílẹ̀ láti gba ọgbọ́n tí ó pamọ́ àti òye àjínde"
  },
  {
    name: "Ìrẹtẹ̀ Méjì",
    nameYoruba: "Ìrẹtẹ̀ Méjì",
    meaning: "Completeness, perfection, spiritual fulfillment",
    meaningYoruba: "Pípé, òdodo, ìmúnilójú ẹ̀mí",
    proverb: "The circle completes itself when beginning meets end",
    proverbYoruba: "Ìyika pé nígbà tí ìbẹ̀rẹ̀ bá pàdé òpin",
    spiritualFocus: ["Completion", "Perfection", "Fulfillment", "Spiritual Maturity"],
    guidance: "You are approaching spiritual completeness and fulfillment",
    guidanceYoruba: "Ìwọ ń súnmọ́ píparí ẹ̀mí àti ìmúnilójú"
  },
  {
    name: "Ọ̀ṣẹ́ Méjì",
    nameYoruba: "Ọ̀ṣẹ́ Méjì", 
    meaning: "Flow, abundance, rivers of blessing",
    meaningYoruba: "Ṣàn, ọ̀pọ̀lọpọ̀, àwọn odò ìbùkún",
    proverb: "When the river flows freely, all lands are blessed",
    proverbYoruba: "Nígbà tí odò bá ń sàn láìléwu, gbogbo ilẹ̀ ń rí ìbùkún",
    spiritualFocus: ["Abundance", "Flow", "Blessing", "Prosperity"],
    guidance: "Allow abundance to flow freely through your life",
    guidanceYoruba: "Jẹ́ kí ọ̀pọ̀lọpọ̀ máa sàn láì léwu nínú ìgbésí ayé rẹ"
  },
  {
    name: "Òfún Méjì",
    nameYoruba: "Òfún Méjì",
    meaning: "Generosity, giving, spiritual elevation, whiteness/purity",
    meaningYoruba: "Oníláárí, ṣíṣe ẹ̀bùn, ìgbésókè ẹ̀mí, funfun/mímọ́",
    proverb: "The hand that gives is blessed above the hand that receives",
    proverbYoruba: "Ọwọ́ tí ó ń fún ni ìbùkún jù ọwọ́ tí ó ń gba lọ",
    spiritualFocus: ["Generosity", "Giving", "Purity", "Spiritual Elevation"],
    guidance: "Practice generosity and maintain spiritual purity",
    guidanceYoruba: "Ṣe oníláárí kí o sì tọ́jú mímọ́ ẹ̀mí"
  }
];

// Function to generate all 256 Odu
export function generateAll256Odu(): OduData[] {
  const allOdu: OduData[] = [];
  let oduId = 1;

  // Generate 16 Major Odu (Méjì)
  majorOdu.forEach((odu, index) => {
    allOdu.push({
      id: oduId++,
      name: odu.name,
      nameYoruba: odu.nameYoruba,
      category: 'major',
      primaryOdu: odu.name,
      meaning: odu.meaning,
      meaningYoruba: odu.meaningYoruba,
      proverb: odu.proverb,
      proverbYoruba: odu.proverbYoruba,
      audioUrl: `/static/audio/odu/${odu.name.toLowerCase().replace(/\s+/g, '_')}.mp3`,
      spiritualFocus: odu.spiritualFocus,
      guidance: odu.guidance,
      guidanceYoruba: odu.guidanceYoruba
    });
  });

  // Generate 240 Minor Odu combinations (15 x 16)
  const majorOduNames = majorOdu.map(odu => odu.name);
  
  majorOduNames.forEach((primaryOdu, primaryIndex) => {
    majorOduNames.forEach((secondaryOdu, secondaryIndex) => {
      // Skip when primary equals secondary (already covered in major Odu)
      if (primaryIndex !== secondaryIndex) {
        const combinedName = `${primaryOdu} ${secondaryOdu}`;
        const combinedNameYoruba = `${majorOdu[primaryIndex].nameYoruba} ${majorOdu[secondaryIndex].nameYoruba}`;
        
        allOdu.push({
          id: oduId++,
          name: combinedName,
          nameYoruba: combinedNameYoruba,
          category: 'minor',
          primaryOdu: primaryOdu,
          secondaryOdu: secondaryOdu,
          meaning: `Combination of ${majorOdu[primaryIndex].meaning} with ${majorOdu[secondaryIndex].meaning}`,
          meaningYoruba: `Àkópọ̀ ${majorOdu[primaryIndex].meaningYoruba} pẹ̀lú ${majorOdu[secondaryIndex].meaningYoruba}`,
          proverb: generateCombinedProverb(majorOdu[primaryIndex], majorOdu[secondaryIndex]),
          proverbYoruba: generateCombinedProverbYoruba(majorOdu[primaryIndex], majorOdu[secondaryIndex]),
          audioUrl: `/static/audio/odu/${combinedName.toLowerCase().replace(/\s+/g, '_')}.mp3`,
          spiritualFocus: [...majorOdu[primaryIndex].spiritualFocus.slice(0, 2), ...majorOdu[secondaryIndex].spiritualFocus.slice(0, 2)],
          guidance: generateCombinedGuidance(majorOdu[primaryIndex], majorOdu[secondaryIndex]),
          guidanceYoruba: generateCombinedGuidanceYoruba(majorOdu[primaryIndex], majorOdu[secondaryIndex])
        });
      }
    });
  });

  return allOdu;
}

function generateCombinedProverb(primary: any, secondary: any): string {
  return `When ${primary.name} meets ${secondary.name}, wisdom flows like rivers converging into the ocean.`;
}

function generateCombinedProverbYoruba(primary: any, secondary: any): string {
  return `Nígbà tí ${primary.nameYoruba} bá pàdé ${secondary.nameYoruba}, ọgbọ́n ń sàn bí odò tí ń papọ̀ sínú òkun.`;
}

function generateCombinedGuidance(primary: any, secondary: any): string {
  return `Balance the energy of ${primary.spiritualFocus[0]} with the wisdom of ${secondary.spiritualFocus[0]} in your spiritual journey.`;
}

function generateCombinedGuidanceYoruba(primary: any, secondary: any): string {
  return `Ṣe ìdọ̀tí agbára ${primary.spiritualFocus[0]} pẹ̀lú ọgbọ́n ${secondary.spiritualFocus[0]} nínú ìrìn àjò ẹ̀mí rẹ.`;
}

// API endpoint for getting all 256 Odu
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