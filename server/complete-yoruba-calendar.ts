import { Request, Response } from "express";

// Complete Yoruba Calendar Data - Generated from Python script pattern
export interface CompleteYorubaDay {
  day: number;
  yoruba_day: string;
  activity: string;
  moon_phase: string;
  offerings: string[];
  prayer?: string;
}

export interface CompleteYorubaMonth {
  name: string;
  orisha: string;
  theme: string;
  color: string;
  taboos: string[];
  days: CompleteYorubaDay[];
}

export interface CompleteYorubaCalendar {
  year: number;
  months: CompleteYorubaMonth[];
}

// Enhanced moon phase calculator with 8 distinct phases
export function getCompleteMoonPhase(day: number): string {
  if (day === 1) return "New Moon";
  if (day === 15) return "Full Moon";
  if (day === 28) return "Dark Moon";
  if (day >= 2 && day <= 7) return "Waxing Crescent";
  if (day >= 8 && day <= 14) return "Waxing Gibbous";
  if (day === 7 || day === 21) return "First Quarter";
  if (day === 14 || day === 22) return "Last Quarter";
  if (day >= 16 && day <= 21) return "Waning Gibbous";
  if (day >= 22 && day <= 27) return "Waning Crescent";
  return "Waning Moon";
}

// Yoruba day patterns for 28-day cycle
const yorubaDayPatterns = [
  "Ọjọ́-Àìkú", "Ọjọ́-Ajé", "Ọjọ́-Ìṣẹ́gun", "Ọjọ́-Rírú", "Ọjọ́-Ẹ̀mí", "Ọjọ́-Ẹ̀tà", "Ọjọ́-Àbámẹ́ta",
  "Ọjọ́-Ìjọ̀", "Ọjọ́-Ìsàn", "Ọjọ́-Àdún", "Ọjọ́-Ìdí", "Ọjọ́-Ọ̀sẹ̀", "Ọjọ́-Ìlú", "Ọjọ́-Ìfẹ́", "Ọjọ́-Ìmọ̀",
  "Ọjọ́-Àbámẹ́rìn", "Ọjọ́-Àbámẹ́ta-odún", "Ọjọ́-Àbámẹ́jọ", "Ọjọ́-Àbámọ́kàn", "Ọjọ́-Àbámọ́rin",
  "Ọjọ́-Àbámẹ́ta-ìlọ́", "Ọjọ́-Àbámẹ́jì-ìlọ́", "Ọjọ́-Àbámẹ́ta-ìlọ́", "Ọjọ́-Àbámẹ́rin-ìlọ́", 
  "Ọjọ́-Àbámẹ́rùn-ìlọ́", "Ọjọ́-Àbámẹ́fà-ìlọ́", "Ọjọ́-Àbámẹ́je-ìlọ́", "Ọjọ́-Àbámẹ́jọ-ìlọ́"
];

// Activity patterns for each Orisha
const activityPatterns: Record<string, string[]> = {
  "Ọbàtálá": [
    "White cloth meditation", "Purity rituals", "Cleansing ceremonies", "Peace offerings", "Elder wisdom",
    "Community unity", "Spiritual reflection", "Clarity seeking", "Divine connection", "Sacred rest",
    "White light meditation", "Ancestral honors", "Peaceful gathering", "Full moon ceremony", "Sacred cleansing",
    "Unity prayers", "Wisdom sharing", "Pure water rituals", "White flower offerings", "Sacred silence",
    "Community healing", "Peace making", "Spirit cleansing", "Divine gratitude", "Sacred preparation",
    "Rest and renewal", "Final cleansing", "Deep reflection"
  ],
  "Ògún": [
    "Tool blessing", "Iron purification", "Work preparation", "Strength building", "Path clearing",
    "Obstacle removal", "Metal working", "Tool sharpening", "Work dedication", "Labor blessing",
    "Strength seeking", "Tool maintenance", "Iron ceremonies", "Full moon forging", "Work completion",
    "Tool blessing", "Strength renewal", "Metal purification", "Work planning", "Tool preparation",
    "Labor dedication", "Strength building", "Tool blessing", "Work completion", "Metal working",
    "Tool rest", "Work reflection", "Tool preparation"
  ],
  "Ṣàngó": [
    "Thunder calling", "Fire ceremonies", "Justice seeking", "Truth speaking", "Power building",
    "Lightning meditation", "Fire blessing", "Justice work", "Thunder drums", "Power seeking",
    "Fire ceremonies", "Lightning calling", "Thunder dancing", "Full moon fire", "Justice rituals",
    "Power building", "Fire blessing", "Thunder calling", "Lightning work", "Fire meditation",
    "Power seeking", "Thunder ceremonies", "Fire blessing", "Lightning calling", "Thunder work",
    "Fire rest", "Power reflection", "Thunder preparation"
  ],
  "Ọya": [
    "Wind calling", "Change embracing", "Transformation ritual", "Wind meditation", "Change preparation",
    "Wind ceremony", "Transformation work", "Change seeking", "Wind blessing", "Transformation prayer",
    "Wind calling", "Change ritual", "Transformation ceremony", "Full moon winds", "Change blessing",
    "Wind meditation", "Transformation work", "Change calling", "Wind blessing", "Transformation seeking",
    "Change preparation", "Wind ceremony", "Transformation blessing", "Change calling", "Wind work",
    "Change rest", "Wind reflection", "Transformation preparation"
  ],
  "Yemọja": [
    "Water blessing", "Mother prayers", "Fertility ritual", "Ocean calling", "Mother meditation",
    "Water ceremony", "Mother blessing", "Fertility seeking", "Ocean prayer", "Mother work",
    "Water calling", "Mother ritual", "Fertility ceremony", "Full moon waters", "Mother blessing",
    "Water meditation", "Mother work", "Fertility calling", "Ocean blessing", "Mother seeking",
    "Water preparation", "Mother ceremony", "Fertility blessing", "Ocean calling", "Mother work",
    "Water rest", "Mother reflection", "Fertility preparation"
  ],
  "Ọ̀ṣun": [
    "River blessing", "Love ceremony", "Prosperity ritual", "River calling", "Love meditation",
    "River ceremony", "Love blessing", "Prosperity seeking", "River prayer", "Love work",
    "River calling", "Love ritual", "Prosperity ceremony", "Full moon rivers", "Love blessing",
    "River meditation", "Love work", "Prosperity calling", "River blessing", "Love seeking",
    "River preparation", "Love ceremony", "Prosperity blessing", "River calling", "Love work",
    "River rest", "Love reflection", "Prosperity preparation"
  ],
  "Èṣù": [
    "Crossroads ritual", "Message carrying", "Opportunity seeking", "Path opening", "Communication blessing",
    "Crossroads ceremony", "Message work", "Opportunity ritual", "Path blessing", "Communication seeking",
    "Crossroads calling", "Message ritual", "Opportunity ceremony", "Full moon crossroads", "Path blessing",
    "Crossroads meditation", "Message work", "Opportunity calling", "Path blessing", "Communication seeking",
    "Crossroads preparation", "Message ceremony", "Opportunity blessing", "Path calling", "Communication work",
    "Crossroads rest", "Message reflection", "Opportunity preparation"
  ],
  "Ọ̀sányìn": [
    "Herb gathering", "Healing ritual", "Medicine preparation", "Plant blessing", "Healing meditation",
    "Herb ceremony", "Healing work", "Medicine seeking", "Plant prayer", "Healing blessing",
    "Herb calling", "Healing ritual", "Medicine ceremony", "Full moon healing", "Plant blessing",
    "Herb meditation", "Healing work", "Medicine calling", "Plant blessing", "Healing seeking",
    "Herb preparation", "Healing ceremony", "Medicine blessing", "Plant calling", "Healing work",
    "Herb rest", "Healing reflection", "Medicine preparation"
  ],
  "Olókun": [
    "Ocean meditation", "Deep wisdom", "Mystery seeking", "Ocean calling", "Wisdom meditation",
    "Ocean ceremony", "Wisdom work", "Mystery ritual", "Ocean prayer", "Wisdom blessing",
    "Ocean calling", "Wisdom ritual", "Mystery ceremony", "Full moon ocean", "Wisdom blessing",
    "Ocean meditation", "Wisdom work", "Mystery calling", "Ocean blessing", "Wisdom seeking",
    "Ocean preparation", "Wisdom ceremony", "Mystery blessing", "Ocean calling", "Wisdom work",
    "Ocean rest", "Wisdom reflection", "Mystery preparation"
  ],
  "Òrìṣà Òkò": [
    "Earth blessing", "Farming ritual", "Harvest preparation", "Earth calling", "Farming meditation",
    "Earth ceremony", "Farming work", "Harvest seeking", "Earth prayer", "Farming blessing",
    "Earth calling", "Farming ritual", "Harvest ceremony", "Full moon farming", "Earth blessing",
    "Earth meditation", "Farming work", "Harvest calling", "Earth blessing", "Farming seeking",
    "Earth preparation", "Farming ceremony", "Harvest blessing", "Earth calling", "Farming work",
    "Earth rest", "Farming reflection", "Harvest preparation"
  ],
  "Ọ̀ṣọ́ọ̀sì": [
    "Forest calling", "Hunting ritual", "Tracking ceremony", "Forest blessing", "Hunting meditation",
    "Forest ceremony", "Hunting work", "Tracking seeking", "Forest prayer", "Hunting blessing",
    "Forest calling", "Hunting ritual", "Tracking ceremony", "Full moon hunting", "Forest blessing",
    "Forest meditation", "Hunting work", "Tracking calling", "Forest blessing", "Hunting seeking",
    "Forest preparation", "Hunting ceremony", "Tracking blessing", "Forest calling", "Hunting work",
    "Forest rest", "Hunting reflection", "Tracking preparation"
  ],
  "Ọba": [
    "River unity", "Marriage blessing", "Loyalty ritual", "Unity calling", "Marriage meditation",
    "Unity ceremony", "Marriage work", "Loyalty seeking", "Unity prayer", "Marriage blessing",
    "Unity calling", "Marriage ritual", "Loyalty ceremony", "Full moon unity", "Marriage blessing",
    "Unity meditation", "Marriage work", "Loyalty calling", "Unity blessing", "Marriage seeking",
    "Unity preparation", "Marriage ceremony", "Loyalty blessing", "Unity calling", "Marriage work",
    "Unity rest", "Marriage reflection", "Loyalty preparation"
  ],
  "Òrúnmìlà": [
    "Divination ritual", "Wisdom seeking", "Knowledge ceremony", "Oracle calling", "Wisdom meditation",
    "Oracle ceremony", "Wisdom work", "Knowledge seeking", "Oracle prayer", "Wisdom blessing",
    "Oracle calling", "Wisdom ritual", "Knowledge ceremony", "Full moon divination", "Oracle blessing",
    "Oracle meditation", "Wisdom work", "Knowledge calling", "Oracle blessing", "Wisdom seeking",
    "Oracle preparation", "Wisdom ceremony", "Knowledge blessing", "Oracle calling", "Wisdom work",
    "Oracle rest", "Wisdom reflection", "Knowledge preparation"
  ]
};

// Offering patterns for each Orisha
const offeringPatterns: Record<string, string[]> = {
  "Ọbàtálá": ["white cloth", "coconut", "water", "white beads", "cowrie shells", "white candles", "white flowers", "white kola", "coconut water", "white light"],
  "Ògún": ["palm oil", "rooster", "iron tools", "palm wine", "iron nails", "metal objects", "red palm oil", "machete", "iron filings", "cool water"],
  "Ṣàngó": ["red palm oil", "banana", "bitter kola", "red cloth", "fire wood", "thunder stones", "red candles", "dried corn", "palm wine", "red flowers"],
  "Ọya": ["purple cloth", "eggplant", "wind chimes", "maroon beads", "purple candles", "dried leaves", "tornado shells", "wind instruments", "purple flowers", "storm water"],
  "Yemọja": ["blue cloth", "fish", "ocean water", "blue beads", "shells", "blue candles", "water plants", "mother symbols", "blue flowers", "sea salt"],
  "Ọ̀ṣun": ["honey", "yellow cloth", "gold jewelry", "yellow flowers", "river water", "yellow beads", "gold coins", "sweet perfume", "golden candles", "yellow fruits"],
  "Èṣù": ["palm oil", "kolanut", "candies", "rum", "red palm oil", "crossroad dirt", "pennies", "cigars", "hot peppers", "black coffee"],
  "Ọ̀sányìn": ["healing herbs", "medicinal plants", "green candles", "herb bundles", "healing stones", "plant medicine", "green cloth", "herb tea", "forest leaves", "healing water"],
  "Olókun": ["ocean water", "deep blue cloth", "pearls", "sea shells", "deep blue candles", "ocean plants", "whale songs", "deep water", "ocean crystals", "blue gems"],
  "Òrìṣà Òkò": ["yams", "farming tools", "earth", "brown cloth", "harvest fruits", "seeds", "farming implements", "soil", "green plants", "harvest offerings"],
  "Ọ̀ṣọ́ọ̀sì": ["forest fruits", "hunting arrows", "green cloth", "forest plants", "hunting tools", "animal tracks", "forest leaves", "wild honey", "hunting charms", "forest water"],
  "Ọba": ["river water", "yellow flowers", "unity symbols", "marriage rings", "loyalty tokens", "unity candles", "river stones", "marriage symbols", "unity cloth", "loyalty offerings"],
  "Òrúnmìlà": ["palm nuts", "divination tools", "green and yellow beads", "wisdom symbols", "oracle bones", "divination cloth", "wisdom water", "knowledge symbols", "oracle tools", "wisdom offerings"]
};

// Complete 13-month Yoruba calendar
export const completeYorubaCalendar: CompleteYorubaCalendar = {
  year: 2025,
  months: [
    {
      name: "Ṣẹ̀rẹ̀",
      orisha: "Ọbàtálá",
      theme: "Purity, New Beginnings",
      color: "white",
      taboos: ["salt", "alcohol", "palm oil"],
      days: []
    },
    {
      name: "Èrèlé",
      orisha: "Ògún",
      theme: "War, Iron, Labor",
      color: "green/black",
      taboos: ["laziness", "dull tools"],
      days: []
    },
    {
      name: "Ẹrẹ̀nà",
      orisha: "Ṣàngó",
      theme: "Thunder, Fire, Justice",
      color: "red/white",
      taboos: ["injustice", "lies"],
      days: []
    },
    {
      name: "Ìgbè",
      orisha: "Ọya",
      theme: "Winds, Change, Transformation",
      color: "maroon/purple",
      taboos: ["stagnation", "fear of change"],
      days: []
    },
    {
      name: "Ebi",
      orisha: "Yemọja",
      theme: "Waters, Motherhood, Fertility",
      color: "blue/white",
      taboos: ["harming children", "polluting water"],
      days: []
    },
    {
      name: "Òkúdu",
      orisha: "Ọ̀ṣun",
      theme: "Rivers, Love, Prosperity",
      color: "yellow/gold",
      taboos: ["hatred", "greed"],
      days: []
    },
    {
      name: "Agẹmọ",
      orisha: "Èṣù",
      theme: "Crossroads, Communication, Opportunity",
      color: "black/red",
      taboos: ["closed minds", "refusing guidance"],
      days: []
    },
    {
      name: "Ògún",
      orisha: "Ọ̀sányìn",
      theme: "Healing, Herbs, Medicine",
      color: "green/white",
      taboos: ["ignoring illness", "refusing healing"],
      days: []
    },
    {
      name: "Owèwè",
      orisha: "Olókun",
      theme: "Ocean Depths, Wisdom, Mysteries",
      color: "deep blue/white",
      taboos: ["shallow thinking", "disrespecting ocean"],
      days: []
    },
    {
      name: "Ọ̀wàrà",
      orisha: "Òrìṣà Òkò",
      theme: "Agriculture, Earth, Harvest",
      color: "brown/green",
      taboos: ["wasting food", "neglecting land"],
      days: []
    },
    {
      name: "Bélú",
      orisha: "Ọ̀ṣọ́ọ̀sì",
      theme: "Hunting, Forest, Tracking",
      color: "green/brown",
      taboos: ["destroying forests", "wasteful hunting"],
      days: []
    },
    {
      name: "Ọ̀pẹ̀",
      orisha: "Ọba",
      theme: "River Unity, Marriage, Loyalty",
      color: "yellow/brown",
      taboos: ["betrayal", "breaking vows"],
      days: []
    },
    {
      name: "Ọ̀pẹ̀lú",
      orisha: "Òrúnmìlà",
      theme: "Wisdom, Divination, Knowledge",
      color: "green/yellow",
      taboos: ["ignorance", "refusing wisdom"],
      days: []
    }
  ]
};

// Generate complete days for all months
completeYorubaCalendar.months.forEach((month, monthIndex) => {
  const activities = activityPatterns[month.orisha];
  const offerings = offeringPatterns[month.orisha];
  
  for (let dayNum = 1; dayNum <= 28; dayNum++) {
    const yorubaDay = yorubaDayPatterns[dayNum - 1];
    const activity = activities[dayNum - 1];
    const offeringList = [
      offerings[(dayNum - 1) % offerings.length], 
      offerings[(dayNum + 1) % offerings.length]
    ];
    
    const dayData: CompleteYorubaDay = {
      day: dayNum,
      yoruba_day: yorubaDay,
      activity: activity,
      moon_phase: getCompleteMoonPhase(dayNum),
      offerings: offeringList
    };
    
    // Add special prayers for key days
    if (dayNum === 1) {
      dayData.prayer = `${month.orisha}, guide me through this sacred cycle of ${month.theme.toLowerCase()}`;
    } else if (dayNum === 15) {
      dayData.prayer = `At this full moon, ${month.orisha}, let your power shine through me`;
    } else if (dayNum === 28) {
      dayData.prayer = `${month.orisha}, as this cycle ends, prepare my spirit for renewal`;
    }
    
    month.days.push(dayData);
  }
});

// Enhanced current Yoruba date calculator
export function getCompleteYorubaDate(): {
  month: string;
  day: number;
  yoruba_day: string;
  orisha: string;
  activity: string;
  offerings: string[];
  moon_phase: string;
  theme: string;
  color: string;
  taboos: string[];
  prayer?: string;
} {
  const currentDate = new Date();
  
  // Enhanced day-of-year calculation for accurate lunar cycles
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((currentDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Calculate which 28-day cycle we're in (13 months of 28 days = 364 days)
  const cycleLength = 28;
  const totalCycles = 13;
  const adjustedDay = ((dayOfYear - 1) % (cycleLength * totalCycles)) + 1;
  
  const monthIndex = Math.floor((adjustedDay - 1) / cycleLength) % totalCycles;
  const dayInMonth = ((adjustedDay - 1) % cycleLength) + 1;
  
  const currentMonth = completeYorubaCalendar.months[monthIndex];
  const currentDay = currentMonth.days[dayInMonth - 1];
  
  return {
    month: currentMonth.name,
    day: dayInMonth,
    yoruba_day: currentDay.yoruba_day,
    orisha: currentMonth.orisha,
    activity: currentDay.activity,
    offerings: currentDay.offerings,
    moon_phase: currentDay.moon_phase,
    theme: currentMonth.theme,
    color: currentMonth.color,
    taboos: currentMonth.taboos,
    prayer: currentDay.prayer
  };
}

// API Route Handlers for complete calendar
export function getCompleteToday(req: Request, res: Response) {
  try {
    const yorubaDate = getCompleteYorubaDate();
    
    res.json({
      date: `${yorubaDate.day} ${yorubaDate.month}`,
      yoruba_day: yorubaDate.yoruba_day,
      orisha: yorubaDate.orisha,
      activity: yorubaDate.activity,
      offerings: yorubaDate.offerings,
      moon_phase: yorubaDate.moon_phase,
      taboos: yorubaDate.taboos,
      theme: yorubaDate.theme,
      color: yorubaDate.color,
      prayer: yorubaDate.prayer
    });
  } catch (error) {
    console.error('Error getting complete today\'s data:', error);
    res.status(500).json({ error: "Failed to get today's calendar data" });
  }
}

export function getCompleteAllMonths(req: Request, res: Response) {
  res.json(completeYorubaCalendar);
}

export function getCompleteMonth(req: Request, res: Response) {
  const monthName = req.params.month_name;
  const month = completeYorubaCalendar.months.find(m => m.name === monthName);
  
  if (!month) {
    return res.status(404).json({ error: "Month not found" });
  }
  
  res.json(month);
}

export function getCompleteMonthByIndex(req: Request, res: Response) {
  const monthIndex = parseInt(req.params.index);
  
  if (isNaN(monthIndex) || monthIndex < 0 || monthIndex >= completeYorubaCalendar.months.length) {
    return res.status(400).json({ error: "Invalid month index" });
  }
  
  res.json(completeYorubaCalendar.months[monthIndex]);
}

export function getCompleteDayInMonth(req: Request, res: Response) {
  const monthName = req.params.month_name;
  const dayNumber = parseInt(req.params.day_number);
  
  const month = completeYorubaCalendar.months.find(m => m.name === monthName);
  if (!month) {
    return res.status(404).json({ error: "Month not found" });
  }
  
  const day = month.days.find(d => d.day === dayNumber);
  if (!day) {
    return res.status(404).json({ error: "Day not found" });
  }
  
  res.json({
    month: monthName,
    orisha: month.orisha,
    theme: month.theme,
    color: month.color,
    taboos: month.taboos,
    ...day
  });
}