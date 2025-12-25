// Complete catalog of all 256 Odu Ifa cards
// This provides metadata for all cards, with rich data from database when available

export interface OduCatalogEntry {
  id: number;
  name: string;
  nameYoruba?: string;
  isMajor: boolean;
  imagePath: string;
  subtitle?: string;
  subtitleYoruba?: string;
  description?: string;
  youthAdvice?: string;   // For Isaiah (Age 0-18)
  adultAdvice?: string;   // For You (Age 19-60)
  elderAdvice?: string;   // For the Agbalagba (Age 61+)
}

// Major Odu names (1-16)
const majorOduNames: Record<number, { name: string; nameYoruba: string; description?: string; youthAdvice?: string; adultAdvice?: string; elderAdvice?: string }> = {
  1: { 
      name: "Eji Ogbe", 
      nameYoruba: "Èjì Ogbè",
      description: "The father of all Odus, representing light and new beginnings.",
      youthAdvice: "Focus on your studies and listen to the guidance of your parents to build a strong foundation.",
      adultAdvice: "This is a time for great leadership and expansion in your career and home life.",
      elderAdvice: "Your role now is to pass down wisdom and maintain the peace of your lineage."
    },
  
  2: { 
  name: "Oyeku Meji", 
  nameYoruba: "Òyẹ̀kú Méjì",
  youthAdvice: "Protection is around you. Avoid risky activities and stay close to your home and family for safety.",
  adultAdvice: "In your trading and work, prioritize risk management. Just as this Odu wards off negativity, you must protect your capital from sudden market volatility.",
  elderAdvice: "Focus on longevity and health. Your role is to provide a shield of wisdom for your family's future."
},
  3: { 
  name: "Iwori Meji", 
  nameYoruba: "Ìwòrì Méjì",
  youthAdvice: "Look deeply into your schoolwork. Do not just look at the surface; understand the 'why' behind what you learn.",
  adultAdvice: "Clear vision is required. Before making a move on a trade or a business deal, look deep into the data (TICK/ADD) to see the true trend beneath the surface.",
  elderAdvice: "Your spiritual insight is at its peak. Use your deep vision to help others see the paths they are missing."
},
  4: { 
      name: "Idi Meji", 
      nameYoruba: "Òdí Méjì",
      youthAdvice: "Be like a rock. Stay firm in your good character even if others try to pressure you into bad choices.",
      adultAdvice: "Build a solid wall around your finances. This Odu represents a stronghold; ensure your trading plan is disciplined and your foundation is unbreakable.",
      elderAdvice: "You are the foundation of your lineage. Stay steadfast in your traditions to ensure the family structure remains strong."
    },
5: { 
      name: "Irosun Meji", 
      nameYoruba: "Ìrosùn Méjì",
      youthAdvice: "Be careful with what you say and who you trust. Focus on your inner light to guide you through confusing times.",
      adultAdvice: "Caution is your best friend today. Do not chase trades out of greed; wait for the clear signal. Avoid 'sunken' investments that do not show immediate promise.",
      elderAdvice: "Ancestral wisdom is calling. Listen to the quiet messages from your lineage to find the clarity you need for your health and peace."
    },
    
  6: { 
      name: "Owonrin Meji", 
      nameYoruba: "Ọ̀wọ́nrin Méjì",
      youthAdvice: "Do not be in a hurry to grow up. Everything has its own time. Focus on doing your chores and schoolwork well today.",
      adultAdvice: "In the markets, this Odu warns against the 'scarcity' mindset. Don't FOMO (Fear Of Missing Out) into a trade. Wait for a clear reversal pattern before committing your capital.",
      elderAdvice: "Focus on the basics of your health. Returning to simple, traditional ways of living will bring you the most peace and strength."
    },
  7: { 
      name: "Obara Meji", 
      nameYoruba: "Ọ̀bàrà Méjì",
      youthAdvice: "Avoid bragging about what you have. True strength is quiet. Let your good grades and kind actions speak for you.",
      adultAdvice: "A sudden change in fortune is possible, but only if you remain humble. In your trading, watch for 'fake-outs' where the price looks strong but lacks true volume support.",
      elderAdvice: "This is a time of spiritual abundance. Share your stories and wisdom with the younger generation to help them avoid the mistakes of pride."
    },
    
  8: { 
      name: "Okanran Meji", 
      nameYoruba: "Ọ̀kànràn Méjì",
      youthAdvice: "If things seem hard or people are being difficult, stay calm. Use your head to solve problems, not your temper.",
      adultAdvice: "Expect market volatility or 'noise.' This Odu represents struggle before a breakthrough. Stay disciplined with your stops; do not let a small loss turn into a big one out of stubbornness.",
      elderAdvice: "Patience is your greatest tool right now. Even if things feel unsettled, your steady presence will keep the family grounded."
    },
9: { 
      name: "Ogunda Meji", 
      nameYoruba: "Ògúndá Méjì",
      youthAdvice: "Be a protector, not a bully. Use your energy for creative projects like coding or building things rather than fighting.",
      adultAdvice: "Take decisive action. Just as Ogun clears the path, you must clear out unproductive trades or habits. If the VIX is spiking, be ready to cut risk immediately.",
      elderAdvice: "Focus on clearing the paths for your children. Your wisdom helps them navigate the 'thick forest' of life without getting lost."
    },
    
10: { 
      name: "Osa Meji", 
      nameYoruba: "Ọ̀sá Méjì",
      youthAdvice: "Do not run away from your responsibilities. Face your challenges directly, and you will find that they aren't as scary as they look.",
      adultAdvice: "Watch for sudden shifts in the wind. The market can turn quickly today. Ensure your 'house' (your portfolio) is protected against sudden downdrafts or gap-downs.",
      elderAdvice: "Spiritually, you are very protected. Do not fear change; the winds are blowing away what you no longer need so new blessings can arrive."
    },
    
11: { 
      name: "Ika Meji", 
      nameYoruba: "Ìká Méjì",
      youthAdvice: "Be careful of the friends you keep and avoid gossiping. Your words have power, so use them to be kind to others at school.",
      adultAdvice: "Avoid market rumors and 'hot tips.' In your trading, stay away from gossip in chat rooms and stick to your own data analysis. Protect your reputation and your capital.",
      elderAdvice: "Focus on bringing peace to your community. Use your wisdom to settle disputes rather than starting them."
    },
    
  12: { 
      name: "Oturupon Meji", 
      nameYoruba: "Òtúrúpọ̀n Méjì",
      youthAdvice: "Stay healthy and active! Eat well and get enough sleep so your mind is sharp for your AI coding projects.",
      adultAdvice: "Check the 'health' of your portfolio. Don't over-leverage or take trades that keep you up at night. Stability is more important than a quick, risky win today.",
      elderAdvice: "Prioritize your physical well-being. This is a time to nurture your health and enjoy the stability you have built for your family."
    },
    13: { 
      name: "Otura Meji", 
      nameYoruba: "Òtúrá Méjì",
      youthAdvice: "Seek clarity in everything you do. If you don't understand something in school, ask questions until the path is clear.",
      adultAdvice: "A clear mind leads to clear trades. Trade only when the market shows a 'peaceful' and obvious direction. If the VIX is causing chaos, wait for the dust to settle.",
      elderAdvice: "Focus on your spiritual devotion. Your peace of mind is your greatest wealth right now. Lead your family with a calm and steady hand."
    },
  14: { 
      name: "Irete Meji", 
      nameYoruba: "Ìrẹtẹ̀ Méjì",
      youthAdvice: "Don't let small failures stop you. If a code doesn't work, 'wash' your mind of the frustration and try again with a fresh perspective.",
      adultAdvice: "Scrub your charts clean. Remove unnecessary indicators and focus on pure price action. Overcoming a loss requires discipline and a clean, fresh start.",
      elderAdvice: "This is a time for spiritual cleansing. Let go of old grievances to make room for new blessings in your lineage."
    },
15: { 
      name: "Ose Meji", 
      nameYoruba: "Ọ̀ṣẹ́ Méjì",
      youthAdvice: "Victory is yours if you stay sweet and kind. Good character (*Ìwà Pẹ̀lẹ́*) will open doors for you that even your skills cannot.",
      adultAdvice: "Small, consistent wins lead to massive success. Be thankful for the 'sweet' profits today and don't let greed ruin a good trading day. Victory comes through patience.",
      elderAdvice: "You are surrounded by blessings. Share the 'sweetness' of your life with your grandchildren and enjoy the fruits of your labor."
    },
  16: { 
      name: "Ofun Meji", 
      nameYoruba: "Òfún Méjì",
      youthAdvice: "Keep your heart and your room clean. Purity and organization will help you see the right answers in your AI coding projects and schoolwork.",
      adultAdvice: "This Odu is the source of all wisdom. In your trading, look for the 'hidden' opportunities others miss. Success today comes from patience and following the quiet signals in the data.",
      elderAdvice: "You are a vessel of ancient light. Your presence alone brings blessings to your family. Continue to lead with purity, silence, and grace."
    },
};

// Generate complete 256 Odu catalog
export const generateOduCatalog = (): OduCatalogEntry[] => {
  return Array.from({ length: 256 }, (_, index) => {
    const id = index + 1;
    const isMajor = id <= 16;
    
    const entry: OduCatalogEntry = {
      id,
      isMajor,
      imagePath: `/static/odu_cards/odu_card_${id}.png`,
      name: isMajor && majorOduNames[id] 
        ? majorOduNames[id].name 
        : `Odu ${id}`,
      nameYoruba: isMajor && majorOduNames[id] 
        ? majorOduNames[id].nameYoruba 
        : undefined,
      subtitle: isMajor 
        ? "Sacred Major Odu" 
        : "Combined Odu - Wisdom forthcoming",
      subtitleYoruba: isMajor 
        ? "Odù Àkọ́kọ́ Mímọ́" 
        : "Odù Àpapọ̀",
      description: isMajor 
        ? "One of the 16 principal Odu containing foundational wisdom of Ifá tradition" 
        : "Combined Odu representing the interaction of two Major Odu",
    };
    
    return entry;
  });
};

// Get single Odu by ID
export const getOduById = (id: number): OduCatalogEntry | undefined => {
  const catalog = generateOduCatalog();
  return catalog.find(odu => odu.id === id);
};

// Filter catalog by type
export const filterByType = (
  catalog: OduCatalogEntry[], 
  type: "all" | "major" | "minor"
): OduCatalogEntry[] => {
  if (type === "all") return catalog;
  return catalog.filter(odu => type === "major" ? odu.isMajor : !odu.isMajor);
};

// Search catalog by query
export const searchCatalog = (
  catalog: OduCatalogEntry[], 
  query: string
): OduCatalogEntry[] => {
  if (!query.trim()) return catalog;
  
  const normalizedQuery = query.toLowerCase();
  return catalog.filter(odu => 
    odu.name.toLowerCase().includes(normalizedQuery) ||
    odu.nameYoruba?.toLowerCase().includes(normalizedQuery) ||
    odu.subtitle?.toLowerCase().includes(normalizedQuery) ||
    odu.id.toString().padStart(3, '0').includes(normalizedQuery)
  );
};

// Merge API data into catalog
export const mergeCatalogWithApiData = (
  catalog: OduCatalogEntry[],
  apiOdus: any[]
): OduCatalogEntry[] => {
  return catalog.map(catalogEntry => {
    const apiData = apiOdus.find(odu => odu.id === catalogEntry.id);
    
    if (apiData) {
      return {
        ...catalogEntry,
        name: apiData.name || catalogEntry.name,
        nameYoruba: apiData.nameYoruba || catalogEntry.nameYoruba,
        subtitle: apiData.subtitle || catalogEntry.subtitle,
        subtitleYoruba: apiData.subtitleYoruba || catalogEntry.subtitleYoruba,
        description: apiData.description || catalogEntry.description,
      };
    }
    
    return catalogEntry;
  });
};
