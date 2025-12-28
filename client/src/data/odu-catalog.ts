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
    17: { 
      name: "Ogbe Yeku", 
      nameYoruba: "Ogbè Ìyẹ̀kú",
      youthAdvice: "Don't fear the unknown or things you haven't learned yet. Stay curious; your knowledge is the light that clears confusion in your schoolwork.",
      adultAdvice: "A reversal in trend is likely. Watch for 'death crosses' on your charts. Protect your capital by tightening your stops today.",
      elderAdvice: "Focus on spiritual transition and legacy. Help the family move through changes with grace and ancestral protection."
    },
    18: { 
      name: "Ogbe Iwori", 
      nameYoruba: "Ogbè Ìwòrì",
      youthAdvice: "Use your imagination for good! Your creative ideas for AI and coding are blessed today—write down your biggest dreams.",
      adultAdvice: "Expansion is possible, but check the 'depth' of the move. Don't buy a breakout unless the volume on QQQ confirms it is real.",
      elderAdvice: "Your vision for the family is clear. Use this time to set long-term goals that will benefit your grandchildren."
    },
    19: { 
      name: "Ogbe Di", 
      nameYoruba: "Ogbè Òdí",
      youthAdvice: "Build a strong fence around your time. Don't let video games or distractions keep you from your coding practice today.",
      adultAdvice: "The market is range-bound and 'choppy.' Protect your edges and don't overtrade. Wait for the breakout from the stronghold.",
      elderAdvice: "You are the gatekeeper of your traditions. Ensure the walls of your family values remain strong and uncompromised."
    },
    20: { 
      name: "Ogbe Irosun", 
      nameYoruba: "Ogbè Ìrosùn",
      youthAdvice: "Be honest in all you do. Even if a mistake is made, telling the truth will bring you the protection of the ancestors.",
      adultAdvice: "Hidden risks are present. Read the fine print on any business deal. Stay alert for news that hasn't hit the main tape yet.",
      elderAdvice: "Quiet reflection will reveal the truth. Listen to your inner voice today; it is speaking the wisdom of your lineage."
    },
    21: {
      name: "Ogbe Owanrin",
      nameYoruba: "Ogbè Owánrín",
      youthAdvice: "Practice makes perfect. Don't get discouraged if a Python script doesn't work the first time; debugging is where the real learning happens.",
      adultAdvice: "Watch for volatility. The 'Owanrin' energy suggests sudden movements. Keep your position sizes small until the VIX stabilizes.",
      elderAdvice: "Encourage the younger generation to stay persistent. Your life experience shows that setbacks are just setups for greater comebacks."
    },
    22: {
      name: "Ogbe Obara",
      nameYoruba: "Ogbè Ọbàrà",
      youthAdvice: "Speak your dreams clearly. When you talk about your AI projects with confidence, you invite the support of those who can help you grow.",
      adultAdvice: "Don't be fooled by 'fake-outs.' The market may look like it's soaring, but ensure the underlying data supports the price action before you commit.",
      elderAdvice: "Your words carry the weight of authority. Use them to bring peace to the family and to guide the youth toward honorable paths."
    },
    23: {
      name: "Ogbe Okanran",
      nameYoruba: "Ogbè Ọkànràn",
      youthAdvice: "Listen twice as much as you speak today. There is a hidden lesson in what your teachers or parents say that will help your coding later.",
      adultAdvice: "Heavy resistance is ahead. If SPY or QQQ hits a major psychological level, consider taking partial profits rather than hoping for a breakthrough.",
      elderAdvice: "Patience is your greatest strength today. Let others rush while you remain steady; the correct path will reveal itself to those who wait."
    },
    24: {
      name: "Ogbe Ogunda",
      nameYoruba: "Ogbè Ògúndá",
      youthAdvice: "Remove obstacles with a clear plan. Break your big coding goals into small pieces so you don't feel overwhelmed.",
      adultAdvice: "Be decisive. Today requires the 'clear cut' of a blade—either you are in the trade or you are out. No hesitating on the sidelines.",
      elderAdvice: "Clear the path for the family. Make the tough decisions today with a clean heart and a focused mind."
    },
    25: {
      name: "Ogbe Osa",
      nameYoruba: "Ogbè Òsá",
      youthAdvice: "Be ready for change. A new opportunity to learn a different coding language or tool might appear—be brave and try it!",
      adultAdvice: "Sudden 'winds' of news may shift the market. Ensure your internet connection and trading platform are running fast and stable today.",
      elderAdvice: "The winds of time are changing. Protect the traditions of the home while allowing the family to adapt to new seasons."
    },
    26: {
      name: "Ogbe Irete",
      nameYoruba: "Ogbè Ìretè",
      youthAdvice: "Cleanliness brings clarity. Organize your desk and your computer files; a clean workspace helps you think better when coding in Thonny.",
      adultAdvice: "Deep research is needed. Don't just look at the surface price; dig into the quarterly earnings or technical indicators before making your move.",
      elderAdvice: "The foundation must be solid. Ensure the family legacy and documentation are in order; your attention to detail protects the future."
    },
    27: {
      name: "Ogbe Oshe",
      nameYoruba: "Ogbè Òsé",
    youthAdvice: "Success comes through character. Be kind to your friends and helpful at home; good character will open doors that even your skills cannot.",
    adultAdvice: "A day for 'sweet' profits. If you see a gain that hits your target, take it. Don't let greed turn a winning trade into a loss.",
    elderAdvice: "You are the salt of the earth. Your presence brings a cooling effect to any room and keeps the family bonds strong."
    },
    28: {
      name: "Ogbe Ofun",
      nameYoruba: "Ogbè Òfún",
      youthAdvice: "Keep your heart and your room clean. Purity and organization will help you see the right answers in your AI coding projects.",
      adultAdvice: "This Odu is the source of all wisdom. In your trading, look for the 'hidden' opportunities others miss by following the quiet signals.",
      elderAdvice: "You are a vessel of ancient light. Your presence alone brings blessings to your family. Continue to lead with purity and silence."
    },
    29: {
      name: "Yeku Ogbe",
      nameYoruba: "Ìyẹ̀kú Ogbè",
      youthAdvice: "You are a natural leader. Show your friends what is possible with AI, but stay humble and always offer to help those who are struggling.",
      adultAdvice: "Power and clarity are present. This is a day to trust your primary indicators (QQQ/SPY) if they are both moving in the same direction.",
      elderAdvice: "The double blessing is upon you. Share your abundance with the family and ensure the lineage is well-provided for today."
    },
    30: {
      name: "Yeku Oyeku",
      nameYoruba: "Ìyẹ̀kú Ọ̀yẹ̀kú",
      youthAdvice: "Honor your ancestors and elders today. Their wisdom is like a backup drive for your life—it protects you from making mistakes.",
      adultAdvice: "The trend is shifting. If you see signs of a 'death cross' or a breakdown in support, do not hesitate to exit and protect your capital.",
      elderAdvice: "You are the gatekeeper of history. Help the family move through sudden changes with grace and ensure the ancestral protection is felt."
    },
    31: {
      name: "Yeku Iwori",
      nameYoruba: "Ìyẹ̀kú Ìwòrì",
      youthAdvice: "Use your imagination for good! Your creative ideas for AI and coding are blessed today—write down your biggest dreams in your notebook.",
      adultAdvice: "Expansion is possible, but check the 'depth' of the move. Don't buy a breakout unless the volume on QQQ confirms it is a real trend change.",
      elderAdvice: "Your vision for the family is clear. Use this time to set long-term goals that will benefit your grandchildren for years to come."
    },
    32: {
      name: "Yeku Odi",
      nameYoruba: "Ìyẹ̀kú Òdí",
      youthAdvice: "Build a strong fence around your time. Don't let video games or distractions keep you from your coding practice and schoolwork today.",
      adultAdvice: "The market is testing your patience. If your trade is hitting resistance, wait for a clear signal before adding more size. Don't fight the trend.",
      elderAdvice: "A time of quiet reflection. Look back at the lessons of your ancestors to find the solution to a current family challenge."
    },
    33: {
    name: "Ogbe Irosun",
    nameYoruba: "Ogbè Ìrosùn",
    youthAdvice: "Be honest in all you do. Even if a mistake is made in your code, telling the truth will bring you the protection of the ancestors.",
    adultAdvice: "Hidden risks are present. Read the fine print on any business deal. Stay alert for news that hasn't hit the main tape yet.",
    elderAdvice: "Quiet reflection will reveal the truth about a family matter. Listen to your inner voice today; it is speaking the wisdom of your lineage."
    },
    34: {
      name: "Yeku Irosun",
      nameYoruba: "Ìyẹ̀kú Ìrosùn",
      youthAdvice: "Small actions lead to big results. One line of code at a time will build your entire app; don't rush, just stay consistent.",
      adultAdvice: "Expect the unexpected. Sudden volatility is likely today. Ensure your stop-losses are set and don't over-leverage your positions.",
      elderAdvice: "A sudden change in family plans may occur. Remain the steady rock for everyone and offer your wisdom to calm any confusion."
    },
    35: {
      name: "Yeku Owonrin",
      nameYoruba: "Ìyẹ̀kú Ọ̀wọ́nrín",
      youthAdvice: "Be careful not to over-promise. If you tell someone you can build a script, make sure you do the work first. Actions speak much louder than words!",
      adultAdvice: "Beware of 'false' breakouts today. The market may look like it's taking off, but if the internal data is weak, it's an empty move. Stay disciplined.",
      elderAdvice: "Your words carry authority in the household. Use your voice today to settle any small arguments and remind everyone of family unity."
    },
    36: {
      name: "Yeku Obara",
      nameYoruba: "Ìyẹ̀kú Ọ̀bàrà",
      youthAdvice: "Silence is powerful. You don't need to show everyone your code until it is ready; work quietly and let your success make the noise.",
      adultAdvice: "The market is testing your resolve. If the price action is choppy and going nowhere, the best trade is often no trade at all. Sit on your hands.",
      elderAdvice: "Patience is a wall of protection for your spirit. Let the world rush and worry while you remain steady in your faith and your traditions."
    },
    37: {
      name: "Yeku Okanran",
      nameYoruba: "Ìyẹ̀kú Ọ̀kànràn",
      youthAdvice: "Face your challenges head-on. If a math problem or a coding bug is hard, don't run away. You have the strength to solve it today.",
      adultAdvice: "Clear the path. Remove any losing trades that are dragging down your portfolio. Today requires a fresh start and a clear strategy.",
      elderAdvice: "The family depends on your strength. Stand firm in your decisions today to ensure the household remains protected and orderly."
    },
    38: {
      name: "Yeku Ogunda",
      nameYoruba: "Ìyẹ̀kú Ògúndá",
      youthAdvice: "Stay calm even if school feels busy today. Take deep breaths and focus on one task at a time; your mind is sharper when it isn't rushing.",
      adultAdvice: "Major shifts are coming. Watch the macro-economic news for signs of a 'flight to safety.' Keep your capital liquid and be ready to move quickly.",
      elderAdvice: "Protect the home from outside influence. Focus on the internal peace of the family and keep your traditional values at the center."
    },
    39: {
      name: "Yeku Osa",
      nameYoruba: "Ìyẹ̀kú Òsá",
      youthAdvice: "Avoid gossip and negative talk. Surround yourself with friends who encourage your coding and school goals.",
      adultAdvice: "Be careful of who you follow. In the trading world, many speak but few know. Trust your own data and indicators over social media hype.",
      elderAdvice: "Watch over the family's health and wellness today. Your guidance on nutrition and rest will prevent future problems for the grandchildren."
    },
    40: {
      name: "Yeku Ika",
      nameYoruba: "Ìyẹ̀kú Ìká",
      youthAdvice: "Stay grounded and humble. Even as you become a great coder, remember to thank your parents and teachers for their constant support.",
      adultAdvice: "The market is in a phase of consolidation. This is a time to build your watchlists rather than forcing new trades in a flat market.",
      elderAdvice: "Your presence is a blessing of stability. Sit with the family today and share the quiet strength that comes from a life well-lived."
    },
    41: {
      name: "Yeku Oturupon",
    {  nameYoruba: "Ìyẹ̀kú Òtúrúpọ̀n",
      youthAdvice: "Health is wealth! Eat well and get enough rest so your brain has the energy to solve complex math and coding problems.",
      adultAdvice: "Physical endurance is required today. The market may stay open and active longer than usual—maintain your stamina and focus.",
      elderAdvice: "Ancestral vitality flows through you. Share health and wellness wisdom with the children to ensure the strength of the bloodline."
    },
    42: {
      {name: "Yeku Otura",
      nameYoruba: "Ìyẹ̀kú Òtúrá",
      youthAdvice: "Seek peace and balance. If you feel frustrated with a school project, take a break and breathe. A calm mind finds the best solutions.",
      adultAdvice: "A day for communication. Reach out to your trading mentors or network; sharing insights on SPY movements could lead to a better strategy.",
      elderAdvice: "You are the diplomat. Use your wisdom to bring peace between conflicting parties. Your presence brings a cooling effect to any room."
    }
};

// Generate complete 256 Odu catalog
export const generateOduCatalog = (): OduCatalogEntry[] => {
  return Array.from({ length: 256 }, (_, index) => {
    const id = index + 1;
    const isMajor = id <= 16;
    
    {const entry: OduCatalogEntry = {
      id,
      isMajor,
      imagePath: `/static/odu_cards/odu_card_${id}.png`,
      name: isMajor && majorOduNames[id] 
        ? majorOduNames[id].name 
        : `Odu ${id}`,
     { nameYoruba: isMajor && majorOduNames[id] 
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
      youthAdvice: isMajor && majorOduNames[id]?.youthAdvice,
      adultAdvice: isMajor && majorOduNames[id]?.adultAdvice,
      elderAdvice: isMajor && majorOduNames[id]?.elderAdvice,
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
    odu.id.toString().padStart(3, "0").includes(normalizedQuery)
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

