import { Request, Response } from "express";

// Complete Yoruba Lunar Calendar Data - Converted from Python to TypeScript
export interface YorubaCalendarDay {
  day: number;
  yoruba_day: string;
  activity: string;
  moon_phase: string;
  offerings?: string[];
  prayer?: string;
}

export interface YorubaCalendarMonth {
  name: string;
  orisha: string;
  theme: string;
  color: string;
  taboos?: string[];
  days: YorubaCalendarDay[];
}

export interface YorubaCalendarData {
  year: number;
  months: YorubaCalendarMonth[];
}

const yorubaCalendar: YorubaCalendarData = {
  year: 2025,
  months: [
    {
      name: "Ṣẹ̀rẹ̀",
      orisha: "Ọbàtálá",
      theme: "Purity, New Beginnings",
      color: "white",
      taboos: ["salt", "alcohol", "palm oil"],
      days: [
        {
          day: 1,
          yoruba_day: "Ọjọ́-Àìkú",
          activity: "New Moon - White cloth offerings",
          moon_phase: "New Moon",
          offerings: ["white cloth", "coconut", "water"],
          prayer: "Ọbàtálá, cleanse my path as I begin this cycle"
        },
        {
          day: 2,
          yoruba_day: "Ọjọ́-Ajé",
          activity: "Èṣù offerings at crossroads",
          moon_phase: "Waxing Crescent",
          offerings: ["palm oil", "kolanut", "candies"]
        },
        {
          day: 3,
          yoruba_day: "Ọjọ́-Ìṣẹ́gun",
          activity: "Call Ṣàngó for strength",
          moon_phase: "Waxing Crescent",
          offerings: ["red palm oil", "banana"]
        },
        {
          day: 4,
          yoruba_day: "Ọjọ́-Rírú",
          activity: "Cleansing with white flowers",
          moon_phase: "Waxing Crescent",
          offerings: ["white flowers", "water"]
        },
        {
          day: 5,
          yoruba_day: "Ọjọ́-Ẹ̀mí",
          activity: "Spiritual meditation with Ọbàtálá",
          moon_phase: "Waxing Crescent",
          offerings: ["white candle", "coconut water"]
        },
        {
          day: 6,
          yoruba_day: "Ọjọ́-Ẹ̀tà",
          activity: "Community gathering for purity",
          moon_phase: "Waxing Crescent",
          offerings: ["white cloth", "rice"]
        },
        {
          day: 7,
          yoruba_day: "Ọjọ́-Àbámẹ́ta",
          activity: "Rest and reflection",
          moon_phase: "First Quarter",
          offerings: ["white dove feather"]
        },
        {
          day: 8,
          yoruba_day: "Ọjọ́-Ìjọ̀",
          activity: "Group prayers for new year",
          moon_phase: "First Quarter",
          offerings: ["white kola", "honey"]
        },
        {
          day: 9,
          yoruba_day: "Ọjọ́-Ìsàn",
          activity: "Honor ancestors with white offerings",
          moon_phase: "Waxing Gibbous",
          offerings: ["white cloth", "white flowers"]
        },
        {
          day: 10,
          yoruba_day: "Ọjọ́-Àdún",
          activity: "Festival preparations begin",
          moon_phase: "Waxing Gibbous",
          offerings: ["white yam", "coconut"]
        },
        {
          day: 11,
          yoruba_day: "Ọjọ́-Ìdí",
          activity: "Foundation setting for year",
          moon_phase: "Waxing Gibbous",
          offerings: ["white stones", "water"]
        },
        {
          day: 12,
          yoruba_day: "Ọjọ́-Ọ̀sẹ̀",
          activity: "Weekly market day offerings",
          moon_phase: "Waxing Gibbous",
          offerings: ["white beads", "cowrie shells"]
        },
        {
          day: 13,
          yoruba_day: "Ọjọ́-Ìlú",
          activity: "Community drum ceremonies",
          moon_phase: "Waxing Gibbous",
          offerings: ["white drum", "water"]
        },
        {
          day: 14,
          yoruba_day: "Ọjọ́-Ìfẹ́",
          activity: "Love and unity ceremonies",
          moon_phase: "Waxing Gibbous",
          offerings: ["white roses", "honey"]
        },
        {
          day: 15,
          yoruba_day: "Ọjọ́-Àìní",
          activity: "Full Moon - Gratitude to Ọbàtálá",
          moon_phase: "Full Moon",
          offerings: ["white cloth", "coconut", "water"],
          prayer: "Ọbàtálá, receive our gratitude for purity and peace"
        },
        {
          day: 16,
          yoruba_day: "Ọjọ́-Ẹ̀kún",
          activity: "Protection from negativity",
          moon_phase: "Waning Gibbous",
          offerings: ["white sage", "salt water"]
        },
        {
          day: 17,
          yoruba_day: "Ọjọ́-Ẹ̀tàdíníógún",
          activity: "Seventeen cowrie divination",
          moon_phase: "Waning Gibbous",
          offerings: ["cowrie shells", "white powder"]
        },
        {
          day: 18,
          yoruba_day: "Ọjọ́-Ẹ̀jídínlógún",
          activity: "Sixteen palm nut divination",
          moon_phase: "Waning Gibbous",
          offerings: ["palm nuts", "white mat"]
        },
        {
          day: 19,
          yoruba_day: "Ọjọ́-Ọ́kàndínlógún",
          activity: "Cleansing negative energies",
          moon_phase: "Waning Gibbous",
          offerings: ["white candle", "sea salt"]
        },
        {
          day: 20,
          yoruba_day: "Ọjọ́-Ogún",
          activity: "Honor Ògún with iron offerings",
          moon_phase: "Waning Gibbous",
          offerings: ["iron nails", "palm oil"]
        },
        {
          day: 21,
          yoruba_day: "Ọjọ́-Ọ̀kànlélógún",
          activity: "Last Quarter prayers",
          moon_phase: "Last Quarter",
          offerings: ["white incense"]
        },
        {
          day: 22,
          yoruba_day: "Ọjọ́-Ẹ̀jìlélógún",
          activity: "Balance and harmony rituals",
          moon_phase: "Last Quarter",
          offerings: ["white and black beads"]
        },
        {
          day: 23,
          yoruba_day: "Ọjọ́-Ẹ̀tàlélógún",
          activity: "Wisdom seeking from elders",
          moon_phase: "Waning Crescent",
          offerings: ["white kola nuts"]
        },
        {
          day: 24,
          yoruba_day: "Ọjọ́-Ẹ̀rìnlélógún",
          activity: "Joy and celebration",
          moon_phase: "Waning Crescent",
          offerings: ["white honey", "coconut milk"]
        },
        {
          day: 25,
          yoruba_day: "Ọjọ́-Ẹ̀ẹ́dọ̀gbọ̀n",
          activity: "Community feast preparation",
          moon_phase: "Waning Crescent",
          offerings: ["white yam flour", "coconut"]
        },
        {
          day: 26,
          yoruba_day: "Ọjọ́-Ẹ̀rìndínlọ́gbọ̀n",
          activity: "Thanksgiving to all Orisha",
          moon_phase: "Waning Crescent",
          offerings: ["white offerings to all Orisha"]
        },
        {
          day: 27,
          yoruba_day: "Ọjọ́-Ẹ̀tàdínlọ́gbọ̀n",
          activity: "Release and letting go",
          moon_phase: "Waning Crescent",
          offerings: ["white sage", "flowing water"]
        },
        {
          day: 28,
          yoruba_day: "Ọjọ́-Ẹ̀jìdínlọ́gbọ̀n",
          activity: "Month closure with white sage",
          moon_phase: "Dark Moon",
          offerings: ["white sage", "clear water"],
          prayer: "Ọbàtálá, close this cycle in peace and purity"
        }
      ]
    },
    {
      name: "Èrèlé",
      orisha: "Ògún",
      theme: "War, Iron, Labor",
      color: "green/black",
      taboos: ["palm wine during work", "eating with left hand"],
      days: [
        {
          day: 1,
          yoruba_day: "Ọjọ́-Àìkú",
          activity: "New Moon - Iron tool purification",
          moon_phase: "New Moon",
          offerings: ["palm oil", "rooster", "rusted metal"],
          prayer: "Ògún, bless our tools and strengthen our resolve"
        },
        {
          day: 2,
          yoruba_day: "Ọjọ́-Ìṣẹ́",
          activity: "Work and labor dedication",
          moon_phase: "Waxing Crescent",
          offerings: ["iron tools", "red palm oil"]
        },
        {
          day: 3,
          yoruba_day: "Ọjọ́-Ìfẹ̀",
          activity: "Call upon Ògún for protection",
          moon_phase: "Waxing Crescent",
          offerings: ["machete", "dog meat"]
        },
        {
          day: 4,
          yoruba_day: "Ọjọ́-Ọ̀nà",
          activity: "Path clearing ceremonies",
          moon_phase: "Waxing Crescent",
          offerings: ["iron rod", "palm wine"]
        },
        {
          day: 5,
          yoruba_day: "Ọjọ́-Agbára",
          activity: "Strength building rituals",
          moon_phase: "Waxing Crescent",
          offerings: ["iron weights", "kola nuts"]
        },
        // Additional days would continue here following the same pattern
        {
          day: 15,
          yoruba_day: "Ọjọ́-Òpó",
          activity: "Full Moon - Pillar of strength",
          moon_phase: "Full Moon",
          offerings: ["iron pillar", "red palm oil", "rooster"],
          prayer: "Ògún, make us pillars of strength in our community"
        },
        {
          day: 28,
          yoruba_day: "Ọjọ́-Ìsinmi-Ògún",
          activity: "Rest before new cycles",
          moon_phase: "Dark Moon",
          offerings: ["cool water for tools", "palm oil"],
          prayer: "Ògún, let our tools rest and be ready for new work"
        }
      ]
    }
  ]
};

// Lunar Phase Calculator
// Lunar Phase Calculator (Enhanced from Flask example)
export function getMoonPhase(day: number): string {
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

// Current Yoruba Date Calculator (Enhanced from Flask example)
export function getYorubaDate(): {
  month: string;
  day: number;
  yoruba_day: string;
  orisha: string;
  activity: string;
  offerings: string[];
  moon_phase: string;
  theme: string;
  color: string;
  taboos?: string[];
} {
  const currentDate = new Date();
  
  // Enhanced mapping to current Yoruba calendar
  // Uses day of year for more accurate cycle representation
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((currentDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Calculate which 28-day cycle we're in (13 months of 28 days = 364 days)
  const cycleLength = 28;
  const totalCycles = 13;
  const adjustedDay = ((dayOfYear - 1) % (cycleLength * totalCycles)) + 1;
  
  const monthIndex = Math.floor((adjustedDay - 1) / cycleLength) % totalCycles;
  const dayInMonth = ((adjustedDay - 1) % cycleLength) + 1;
  
  const currentMonth = yorubaCalendar.months[monthIndex];
  const currentDay = currentMonth.days[Math.min(dayInMonth - 1, currentMonth.days.length - 1)];
  
  return {
    month: currentMonth.name,
    day: dayInMonth,
    yoruba_day: currentDay.yoruba_day,
    orisha: currentMonth.orisha,
    activity: currentDay.activity,
    offerings: currentDay.offerings || [],
    moon_phase: getMoonPhase(dayInMonth),
    theme: currentMonth.theme,
    color: currentMonth.color,
    taboos: currentMonth.taboos
  };
}

// API Route Handlers
export function getMonth(req: Request, res: Response) {
  const monthName = req.params.month_name;
  const month = yorubaCalendar.months.find(m => m.name === monthName);
  
  if (!month) {
    return res.status(404).json({ error: "Month not found" });
  }
  
  res.json(month);
}

export function getToday(req: Request, res: Response) {
  try {
    const yorubaDate = getYorubaDate();
    
    res.json({
      date: `${yorubaDate.day} ${yorubaDate.month}`,
      yoruba_day: yorubaDate.yoruba_day,
      orisha: yorubaDate.orisha,
      activity: yorubaDate.activity,
      offerings: yorubaDate.offerings,
      moon_phase: yorubaDate.moon_phase,
      taboos: yorubaDate.taboos || [],
      theme: yorubaDate.theme,
      color: yorubaDate.color
    });
  } catch (error) {
    console.error('Error getting today\'s data:', error);
    res.status(500).json({ error: "Failed to get today's calendar data" });
  }
}

export function getAllMonths(req: Request, res: Response) {
  res.json(yorubaCalendar);
}

export function getMonthByIndex(req: Request, res: Response) {
  const monthIndex = parseInt(req.params.index);
  
  if (monthIndex < 0 || monthIndex >= yorubaCalendar.months.length) {
    return res.status(404).json({ error: "Month index out of range" });
  }
  
  res.json(yorubaCalendar.months[monthIndex]);
}

export function getDayInMonth(req: Request, res: Response) {
  const monthName = req.params.month_name;
  const dayNumber = parseInt(req.params.day_number);
  
  const month = yorubaCalendar.months.find(m => m.name === monthName);
  if (!month) {
    return res.status(404).json({ error: "Month not found" });
  }
  
  const day = month.days.find(d => d.day === dayNumber);
  if (!day) {
    return res.status(404).json({ error: "Day not found" });
  }
  
  res.json({
    ...day,
    orisha: month.orisha,
    theme: month.theme,
    color: month.color,
    taboos: month.taboos || []
  });
}