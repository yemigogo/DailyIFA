export interface YorubaDay {
  day: number;
  yoruba_day: string;
  activity: string;
  moon_phase: string;
  offerings?: string[];
}

export interface YorubaMonth {
  name: string;
  orisha: string;
  theme: string;
  days: YorubaDay[];
}

export interface YorubaCalendar {
  year: number;
  months: YorubaMonth[];
}

// Helper functions for calendar operations
export function getMonthInfo(monthName: string): YorubaMonth | null {
  for (const month of yorubaCalendar2025.months) {
    if (month.name === monthName) {
      return month;
    }
  }
  return null;
}

export function getDayActivities(monthName: string, dayNumber: number): YorubaDay | null {
  const month = getMonthInfo(monthName);
  if (month) {
    for (const day of month.days) {
      if (day.day === dayNumber) {
        return day;
      }
    }
  }
  return null;
}

export function getTodayInfo(): { month: YorubaMonth; day: YorubaDay } | null {
  const currentDate = new Date();
  const monthIndex = Math.floor((currentDate.getMonth()) % 13);
  const dayInMonth = Math.min(currentDate.getDate(), 28);
  
  const month = yorubaCalendar2025.months[monthIndex];
  const day = month.days[dayInMonth - 1];
  
  return month && day ? { month, day } : null;
}

export const yorubaCalendar2025: YorubaCalendar = {
  "year": 2025,
  "months": [
    {
      "name": "Ṣẹ̀rẹ̀",
      "orisha": "Ọbàtálá",
      "theme": "Purity, New Beginnings",
      "days": [
        { "day": 1, "yoruba_day": "Ọjọ́-Àìkú", "activity": "New Moon - White cloth offerings to Ọbàtálá", "moon_phase": "New Moon", "offerings": ["white cloth", "coconut", "water"] },
        { "day": 2, "yoruba_day": "Ọjọ́-Ajé", "activity": "Pray to Èṣù for open roads", "moon_phase": "Waxing Crescent", "offerings": ["palm oil", "kolanut"] },
        { "day": 3, "yoruba_day": "Ọjọ́-Ìṣẹ́gun", "activity": "Call Ṣàngó for strength", "moon_phase": "Waxing Crescent" },
        { "day": 4, "yoruba_day": "Ọjọ́-Rírú", "activity": "Cleansing with white flowers and water", "moon_phase": "Waxing Crescent" },
        { "day": 5, "yoruba_day": "Ọjọ́-Ẹ̀mí", "activity": "Spiritual meditation with Ọbàtálá", "moon_phase": "Waxing Crescent" },
        { "day": 6, "yoruba_day": "Ọjọ́-Ẹ̀tà", "activity": "Community gathering for purity rituals", "moon_phase": "Waxing Crescent" },
        { "day": 7, "yoruba_day": "Ọjọ́-Àbámẹ́ta", "activity": "Rest and reflection", "moon_phase": "First Quarter" },
        { "day": 8, "yoruba_day": "Ọjọ́-Ìjọ̀", "activity": "Group prayers for new year blessings", "moon_phase": "First Quarter" },
        { "day": 9, "yoruba_day": "Ọjọ́-Ìsàn", "activity": "Honor ancestors with white offerings", "moon_phase": "Waxing Gibbous" },
        { "day": 10, "yoruba_day": "Ọjọ́-Àdún", "activity": "Festival preparations begin", "moon_phase": "Waxing Gibbous" },
        { "day": 11, "yoruba_day": "Ọjọ́-Ìdí", "activity": "Foundation setting for year ahead", "moon_phase": "Waxing Gibbous" },
        { "day": 12, "yoruba_day": "Ọjọ́-Ọ̀sẹ̀", "activity": "Weekly market day offerings", "moon_phase": "Waxing Gibbous" },
        { "day": 13, "yoruba_day": "Ọjọ́-Ìlú", "activity": "Community drum ceremonies", "moon_phase": "Waxing Gibbous" },
        { "day": 14, "yoruba_day": "Ọjọ́-Ìfẹ́", "activity": "Full Moon – Love and unity ceremonies", "moon_phase": "Full Moon" },
        { "day": 15, "yoruba_day": "Ọjọ́-Àìní", "activity": "Gratitude offerings to Ọbàtálá", "moon_phase": "Full Moon" },
        { "day": 16, "yoruba_day": "Ọjọ́-Ẹ̀kún", "activity": "Prayers for protection from negativity", "moon_phase": "Waning Gibbous" },
        { "day": 17, "yoruba_day": "Ọjọ́-Ẹ̀tàdíníógún", "activity": "Seventeen cowrie divination", "moon_phase": "Waning Gibbous" },
        { "day": 18, "yoruba_day": "Ọjọ́-Ẹ̀jídínlógún", "activity": "Sixteen palm nut divination", "moon_phase": "Waning Gibbous" },
        { "day": 19, "yoruba_day": "Ọjọ́-Ọ́kàndínlógún", "activity": "Cleansing negative energies", "moon_phase": "Waning Gibbous" },
        { "day": 20, "yoruba_day": "Ọjọ́-Ogún", "activity": "Honor Ògún with iron offerings", "moon_phase": "Waning Gibbous" },
        { "day": 21, "yoruba_day": "Ọjọ́-Ọ̀kànlélógún", "activity": "Last Quarter prayers", "moon_phase": "Last Quarter" },
        { "day": 22, "yoruba_day": "Ọjọ́-Ẹ̀jìlélógún", "activity": "Balance and harmony rituals", "moon_phase": "Last Quarter" },
        { "day": 23, "yoruba_day": "Ọjọ́-Ẹ̀tàlélógún", "activity": "Wisdom seeking from elders", "moon_phase": "Waning Crescent" },
        { "day": 24, "yoruba_day": "Ọjọ́-Ẹ̀rìnlélógún", "activity": "Joy and celebration", "moon_phase": "Waning Crescent" },
        { "day": 25, "yoruba_day": "Ọjọ́-Ẹ̀ẹ́dọ̀gbọ̀n", "activity": "Community feast preparation", "moon_phase": "Waning Crescent" },
        { "day": 26, "yoruba_day": "Ọjọ́-Ẹ̀rìndínlọ́gbọ̀n", "activity": "Thanksgiving to all Orisha", "moon_phase": "Waning Crescent" },
        { "day": 27, "yoruba_day": "Ọjọ́-Ẹ̀tàdínlọ́gbọ̀n", "activity": "Release and letting go ceremonies", "moon_phase": "Waning Crescent" },
        { "day": 28, "yoruba_day": "Ọjọ́-Ẹ̀jìdínlọ́gbọ̀n", "activity": "Month closure with white sage", "moon_phase": "New Moon" }
      ]
    },
    {
      "name": "Èrèlé", 
      "orisha": "Ògún",
      "theme": "War, Iron, Labor",
      "days": [
        { "day": 1, "yoruba_day": "Ọjọ́-Àìkú", "activity": "Offer iron tools to Ògún", "moon_phase": "New Moon", "offerings": ["palm oil", "rooster"] },
        { "day": 2, "yoruba_day": "Ọjọ́-Ìṣẹ́", "activity": "Work and labor dedication", "moon_phase": "New Moon" },
        { "day": 3, "yoruba_day": "Ọjọ́-Ìfẹ̀", "activity": "Call upon Ògún for protection", "moon_phase": "Waxing Crescent" },
        { "day": 4, "yoruba_day": "Ọjọ́-Ọ̀nà", "activity": "Path clearing ceremonies", "moon_phase": "Waxing Crescent" },
        { "day": 5, "yoruba_day": "Ọjọ́-Agbára", "activity": "Strength building rituals", "moon_phase": "Waxing Crescent" },
        { "day": 6, "yoruba_day": "Ọjọ́-Ẹ̀rín", "activity": "Joy in labor and achievement", "moon_phase": "Waxing Crescent" },
        { "day": 7, "yoruba_day": "Ọjọ́-Ìsinmi", "activity": "Rest day with iron protection", "moon_phase": "First Quarter" },
        { "day": 8, "yoruba_day": "Ọjọ́-Ọ̀rẹ́", "activity": "Friendship and brotherhood", "moon_phase": "First Quarter" },
        { "day": 9, "yoruba_day": "Ọjọ́-Ìgbéga", "activity": "Progress and advancement", "moon_phase": "Waxing Gibbous" },
        { "day": 10, "yoruba_day": "Ọjọ́-Àṣẹ", "activity": "Divine power invocation", "moon_phase": "Waxing Gibbous" },
        { "day": 11, "yoruba_day": "Ọjọ́-Ìdárayá", "activity": "Entertainment and social gathering", "moon_phase": "Waxing Gibbous" },
        { "day": 12, "yoruba_day": "Ọjọ́-Ọ̀wọ́", "activity": "Hand work and craftsmanship", "moon_phase": "Waxing Gibbous" },
        { "day": 13, "yoruba_day": "Ọjọ́-Ẹ̀sẹ̀", "activity": "Foot paths and journeys", "moon_phase": "Waxing Gibbous" },
        { "day": 14, "yoruba_day": "Ọjọ́-Òpó", "activity": "Full Moon – Pillar of strength", "moon_phase": "Full Moon" },
        { "day": 15, "yoruba_day": "Ọjọ́-Agbára-Nlá", "activity": "Great power manifestation", "moon_phase": "Full Moon" },
        { "day": 16, "yoruba_day": "Ọjọ́-Ìjàkadì", "activity": "Warrior spirit awakening", "moon_phase": "Waning Gibbous" },
        { "day": 17, "yoruba_day": "Ọjọ́-Ìdámu", "activity": "Protection from obstacles", "moon_phase": "Waning Gibbous" },
        { "day": 18, "yoruba_day": "Ọjọ́-Ọ̀gbọ̀n", "activity": "Wisdom in work", "moon_phase": "Waning Gibbous" },
        { "day": 19, "yoruba_day": "Ọjọ́-Ìmọ̀", "activity": "Knowledge and skill development", "moon_phase": "Waning Gibbous" },
        { "day": 20, "yoruba_day": "Ọjọ́-Ọ̀tún", "activity": "Renewal and repair", "moon_phase": "Waning Gibbous" },
        { "day": 21, "yoruba_day": "Ọjọ́-Òsì", "activity": "Last Quarter balance", "moon_phase": "Last Quarter" },
        { "day": 22, "yoruba_day": "Ọjọ́-Ìdọ̀tí", "activity": "Cleansing work spaces", "moon_phase": "Last Quarter" },
        { "day": 23, "yoruba_day": "Ọjọ́-Àlááfíà", "activity": "Peace and harmony", "moon_phase": "Waning Crescent" },
        { "day": 24, "yoruba_day": "Ọjọ́-Ẹ̀bẹ", "activity": "Petition and supplication", "moon_phase": "Waning Crescent" },
        { "day": 25, "yoruba_day": "Ọjọ́-Àṣẹkára", "activity": "Divine blessing on tools", "moon_phase": "Waning Crescent" },
        { "day": 26, "yoruba_day": "Ọjọ́-Ìrètí", "activity": "Hope and expectation", "moon_phase": "Waning Crescent" },
        { "day": 27, "yoruba_day": "Ọjọ́-Ìparí", "activity": "Completion of projects", "moon_phase": "Waning Crescent" },
        { "day": 28, "yoruba_day": "Ọjọ́-Ìsinmi-Ògún", "activity": "Rest before new cycles", "moon_phase": "New Moon" }
      ]
    },
    {
      "name": "Ẹrẹ̀nà",
      "orisha": "Ọ̀ṣun",
      "theme": "Love, Fertility, Sweet Waters",
      "days": [
        { "day": 1, "yoruba_day": "Ọjọ́-Ọ̀ṣun", "activity": "New Moon – Honey and river offerings", "moon_phase": "New Moon" },
        { "day": 2, "yoruba_day": "Ọjọ́-Ìfẹ́", "activity": "Love and affection rituals", "moon_phase": "New Moon" },
        { "day": 3, "yoruba_day": "Ọjọ́-Ọ̀yún", "activity": "Fertility and conception blessings", "moon_phase": "Waxing Crescent" },
        { "day": 4, "yoruba_day": "Ọjọ́-Ọmí", "activity": "Sweet water ceremonies", "moon_phase": "Waxing Crescent" },
        { "day": 5, "yoruba_day": "Ọjọ́-Ẹwà", "activity": "Beauty and grace enhancement", "moon_phase": "Waxing Crescent" },
        { "day": 6, "yoruba_day": "Ọjọ́-Àdùn", "activity": "Sweetness and pleasure", "moon_phase": "Waxing Crescent" },
        { "day": 7, "yoruba_day": "Ọjọ́-Ẹ̀yẹ", "activity": "Bird and river spirit communion", "moon_phase": "First Quarter" },
        { "day": 8, "yoruba_day": "Ọjọ́-Ọlà", "activity": "Wealth and prosperity", "moon_phase": "First Quarter" },
        { "day": 9, "yoruba_day": "Ọjọ́-Ìyá", "activity": "Motherhood and nurturing", "moon_phase": "Waxing Gibbous" },
        { "day": 10, "yoruba_day": "Ọjọ́-Ọmọ", "activity": "Children's blessings", "moon_phase": "Waxing Gibbous" },
        { "day": 11, "yoruba_day": "Ọjọ́-Àṣọ", "activity": "Beautiful clothing and adornment", "moon_phase": "Waxing Gibbous" },
        { "day": 12, "yoruba_day": "Ọjọ́-Ìlẹ̀kẹ̀", "activity": "Beads and jewelry blessing", "moon_phase": "Waxing Gibbous" },
        { "day": 13, "yoruba_day": "Ọjọ́-Orin", "activity": "Songs and dance for Ọ̀ṣun", "moon_phase": "Waxing Gibbous" },
        { "day": 14, "yoruba_day": "Ọjọ́-Osùn-Nlá", "activity": "Full Moon – Great river ceremony", "moon_phase": "Full Moon" },
        { "day": 15, "yoruba_day": "Ọjọ́-Ìfẹ́-Nlá", "activity": "Great love manifestation", "moon_phase": "Full Moon" },
        { "day": 16, "yoruba_day": "Ọjọ́-Ìrọ̀kẹ́", "activity": "Prosperity and abundance", "moon_phase": "Waning Gibbous" },
        { "day": 17, "yoruba_day": "Ọjọ́-Àbùjá", "activity": "Relationship healing", "moon_phase": "Waning Gibbous" },
        { "day": 18, "yoruba_day": "Ọjọ́-Ẹ̀dá", "activity": "Creative expression", "moon_phase": "Waning Gibbous" },
        { "day": 19, "yoruba_day": "Ọjọ́-Ìtàn", "activity": "Storytelling and oral tradition", "moon_phase": "Waning Gibbous" },
        { "day": 20, "yoruba_day": "Ọjọ́-Àpẹ̀rẹ̀", "activity": "Example and modeling", "moon_phase": "Waning Gibbous" },
        { "day": 21, "yoruba_day": "Ọjọ́-Àárín", "activity": "Last Quarter harmony", "moon_phase": "Last Quarter" },
        { "day": 22, "yoruba_day": "Ọjọ́-Ìbálẹ̀", "activity": "Respect and reverence", "moon_phase": "Last Quarter" },
        { "day": 23, "yoruba_day": "Ọjọ́-Ẹ̀tọ́", "activity": "Rights and dignity", "moon_phase": "Waning Crescent" },
        { "day": 24, "yoruba_day": "Ọjọ́-Ìwà", "activity": "Character and behavior", "moon_phase": "Waning Crescent" },
        { "day": 25, "yoruba_day": "Ọjọ́-Ẹ̀kọ́", "activity": "Teaching and learning", "moon_phase": "Waning Crescent" },
        { "day": 26, "yoruba_day": "Ọjọ́-Ìgbàgbọ́", "activity": "Faith and belief", "moon_phase": "Waning Crescent" },
        { "day": 27, "yoruba_day": "Ọjọ́-Ìròyìn", "activity": "Good news and communication", "moon_phase": "Waning Crescent" },
        { "day": 28, "yoruba_day": "Ọjọ́-Ìsinmi-Ọ̀ṣun", "activity": "Rest in sweet waters", "moon_phase": "New Moon" }
      ]
    },
    {
      "name": "Igbé",
      "orisha": "Ọrunmila",
      "theme": "Wisdom, Divination, Knowledge",
      "days": [
        { "day": 1, "yoruba_day": "Ọjọ́-Ọrunmila", "activity": "New Moon – Ifá divination and wisdom", "moon_phase": "New Moon" },
        { "day": 2, "yoruba_day": "Ọjọ́-Ifá", "activity": "Sacred verses recitation", "moon_phase": "New Moon" },
        { "day": 3, "yoruba_day": "Ọjọ́-Ọ̀gbọ̀n", "activity": "Wisdom seeking and learning", "moon_phase": "Waxing Crescent" },
        { "day": 4, "yoruba_day": "Ọjọ́-Ìmọ̀", "activity": "Knowledge and understanding", "moon_phase": "Waxing Crescent" },
        { "day": 5, "yoruba_day": "Ọjọ́-Àkọ́kọ́", "activity": "Teaching and instruction", "moon_phase": "Waxing Crescent" },
        { "day": 6, "yoruba_day": "Ọjọ́-Ìdíje", "activity": "Competition and excellence", "moon_phase": "Waxing Crescent" },
        { "day": 7, "yoruba_day": "Ọjọ́-Ìṣirò", "activity": "Mathematics and calculation", "moon_phase": "First Quarter" },
        { "day": 8, "yoruba_day": "Ọjọ́-Ìwádìí", "activity": "Research and investigation", "moon_phase": "First Quarter" },
        { "day": 9, "yoruba_day": "Ọjọ́-Òye", "activity": "Understanding and comprehension", "moon_phase": "Waxing Gibbous" },
        { "day": 10, "yoruba_day": "Ọjọ́-Àṣẹ-Ifá", "activity": "Divine power of Ifá", "moon_phase": "Waxing Gibbous" },
        { "day": 11, "yoruba_day": "Ọjọ́-Ẹ̀kọ́", "activity": "Learning and education", "moon_phase": "Waxing Gibbous" },
        { "day": 12, "yoruba_day": "Ọjọ́-Ìlẹ̀-Ifá", "activity": "Sacred Ifá ground blessing", "moon_phase": "Waxing Gibbous" },
        { "day": 13, "yoruba_day": "Ọjọ́-Ọ̀rọ̀", "activity": "Sacred words and speech", "moon_phase": "Waxing Gibbous" },
        { "day": 14, "yoruba_day": "Ọjọ́-Ifá-Nlá", "activity": "Full Moon – Great Ifá ceremony", "moon_phase": "Full Moon" },
        { "day": 15, "yoruba_day": "Ọjọ́-Ọ̀gbọ̀n-Nlá", "activity": "Great wisdom manifestation", "moon_phase": "Full Moon" },
        { "day": 16, "yoruba_day": "Ọjọ́-Àkósẹ", "activity": "Prophecy and prediction", "moon_phase": "Waning Gibbous" },
        { "day": 17, "yoruba_day": "Ọjọ́-Ìtànkálẹ̀", "activity": "Historical foundations", "moon_phase": "Waning Gibbous" },
        { "day": 18, "yoruba_day": "Ọjọ́-Ẹ̀sẹ-Ifá", "activity": "Ifá verses and poetry", "moon_phase": "Waning Gibbous" },
        { "day": 19, "yoruba_day": "Ọjọ́-Ìtumọ̀", "activity": "Meanings and interpretations", "moon_phase": "Waning Gibbous" },
        { "day": 20, "yoruba_day": "Ọjọ́-Àlàyé", "activity": "Explanations and clarity", "moon_phase": "Waning Gibbous" },
        { "day": 21, "yoruba_day": "Ọjọ́-Ìbámu", "activity": "Last Quarter harmony", "moon_phase": "Last Quarter" },
        { "day": 22, "yoruba_day": "Ọjọ́-Ìṣòro", "activity": "Problem solving", "moon_phase": "Last Quarter" },
        { "day": 23, "yoruba_day": "Ọjọ́-Àbájáde", "activity": "Revelation and discovery", "moon_phase": "Waning Crescent" },
        { "day": 24, "yoruba_day": "Ọjọ́-Ìfẹ̀hìntì", "activity": "Love and affection wisdom", "moon_phase": "Waning Crescent" },
        { "day": 25, "yoruba_day": "Ọjọ́-Ìgbìmọ̀", "activity": "Council and consultation", "moon_phase": "Waning Crescent" },
        { "day": 26, "yoruba_day": "Ọjọ́-Ìpinnu", "activity": "Decision and judgment", "moon_phase": "Waning Crescent" },
        { "day": 27, "yoruba_day": "Ọjọ́-Àyẹyẹ", "activity": "Celebration of wisdom", "moon_phase": "Waning Crescent" },
        { "day": 28, "yoruba_day": "Ọjọ́-Ìsinmi-Ifá", "activity": "Rest in divine wisdom", "moon_phase": "New Moon" }
      ]
    },
    {
      "name": "Ẹ̀bìbí",
      "orisha": "Yemoja",
      "theme": "Motherhood, Ocean, Protection",
      "days": [
        { "day": 1, "yoruba_day": "Ọjọ́-Yemoja", "activity": "New Moon – Ocean mother offerings", "moon_phase": "New Moon" },
        { "day": 2, "yoruba_day": "Ọjọ́-Òkun", "activity": "Ocean and sea ceremonies", "moon_phase": "New Moon" },
        { "day": 3, "yoruba_day": "Ọjọ́-Ìyá-Àgbà", "activity": "Elder mother reverence", "moon_phase": "Waxing Crescent" },
        { "day": 4, "yoruba_day": "Ọjọ́-Ọmọ-Ìyá", "activity": "Children and maternal bonds", "moon_phase": "Waxing Crescent" },
        { "day": 5, "yoruba_day": "Ọjọ́-Ìdáàbò", "activity": "Protection and safety", "moon_phase": "Waxing Crescent" },
        { "day": 6, "yoruba_day": "Ọjọ́-Ìtọ́jú", "activity": "Care and nurturing", "moon_phase": "Waxing Crescent" },
        { "day": 7, "yoruba_day": "Ọjọ́-Àtúnṣe", "activity": "Healing and restoration", "moon_phase": "First Quarter" },
        { "day": 8, "yoruba_day": "Ọjọ́-Ìfẹ́-Ìyá", "activity": "Maternal love expression", "moon_phase": "First Quarter" },
        { "day": 9, "yoruba_day": "Ọjọ́-Ọ̀rọ̀-Ìyá", "activity": "Mother's wisdom sharing", "moon_phase": "Waxing Gibbous" },
        { "day": 10, "yoruba_day": "Ọjọ́-Ìbínú-Ìyá", "activity": "Righteous maternal anger", "moon_phase": "Waxing Gibbous" },
        { "day": 11, "yoruba_day": "Ọjọ́-Ìfọ̀rọ̀-Ìyá", "activity": "Forgiveness and mercy", "moon_phase": "Waxing Gibbous" },
        { "day": 12, "yoruba_day": "Ọjọ́-Èèwọ̀-Ìyá", "activity": "Mother's taboos and respect", "moon_phase": "Waxing Gibbous" },
        { "day": 13, "yoruba_day": "Ọjọ́-Àṣọ-Ìyá", "activity": "Mother's clothing and dignity", "moon_phase": "Waxing Gibbous" },
        { "day": 14, "yoruba_day": "Ọjọ́-Ìyá-Nlá", "activity": "Full Moon – Great Mother ceremony", "moon_phase": "Full Moon" },
        { "day": 15, "yoruba_day": "Ọjọ́-Ìfẹ́-Òkun", "activity": "Ocean love manifestation", "moon_phase": "Full Moon" },
        { "day": 16, "yoruba_day": "Ọjọ́-Àìsí", "activity": "Abundance and overflow", "moon_phase": "Waning Gibbous" },
        { "day": 17, "yoruba_day": "Ọjọ́-Ìtọ́wọ́", "activity": "Guidance and support", "moon_phase": "Waning Gibbous" },
        { "day": 18, "yoruba_day": "Ọjọ́-Ìbínú", "activity": "Righteous protection", "moon_phase": "Waning Gibbous" },
        { "day": 19, "yoruba_day": "Ọjọ́-Ìrọ̀rùn", "activity": "Comfort and consolation", "moon_phase": "Waning Gibbous" },
        { "day": 20, "yoruba_day": "Ọjọ́-Ìgbàlà", "activity": "Salvation and rescue", "moon_phase": "Waning Gibbous" },
        { "day": 21, "yoruba_day": "Ọjọ́-Àlábọ́sí", "activity": "Last Quarter protection", "moon_phase": "Last Quarter" },
        { "day": 22, "yoruba_day": "Ọjọ́-Ìwòsàn", "activity": "Healing and wellness", "moon_phase": "Last Quarter" },
        { "day": 23, "yoruba_day": "Ọjọ́-Ọ̀nà-Òkun", "activity": "Ocean pathways opening", "moon_phase": "Waning Crescent" },
        { "day": 24, "yoruba_day": "Ọjọ́-Ìtẹ́wọ́gbà", "activity": "Acceptance and embracing", "moon_phase": "Waning Crescent" },
        { "day": 25, "yoruba_day": "Ọjọ́-Ìdúró", "activity": "Standing firm and stable", "moon_phase": "Waning Crescent" },
        { "day": 26, "yoruba_day": "Ọjọ́-Ọ̀run-Òkun", "activity": "Heaven and ocean unity", "moon_phase": "Waning Crescent" },
        { "day": 27, "yoruba_day": "Ọjọ́-Ìbéèrè", "activity": "Questioning and seeking", "moon_phase": "Waning Crescent" },
        { "day": 28, "yoruba_day": "Ọjọ́-Ìsinmi-Yemoja", "activity": "Rest in ocean mother's arms", "moon_phase": "New Moon" }
      ]
    },
    {
      "name": "Òkúdù",
      "orisha": "Ṣàngó",
      "theme": "Thunder, Justice, Royal Power",
      "days": [
        { "day": 1, "yoruba_day": "Ọjọ́-Ṣàngó", "activity": "New Moon – Thunder and lightning ceremony", "moon_phase": "New Moon" },
        { "day": 2, "yoruba_day": "Ọjọ́-Àrá", "activity": "Thunder invocation", "moon_phase": "New Moon" },
        { "day": 3, "yoruba_day": "Ọjọ́-Mọ̀nàmọ́ná", "activity": "Lightning protection rituals", "moon_phase": "Waxing Crescent" },
        { "day": 4, "yoruba_day": "Ọjọ́-Ọba", "activity": "Royal authority and kingship", "moon_phase": "Waxing Crescent" },
        { "day": 5, "yoruba_day": "Ọjọ́-Ìdájọ́", "activity": "Justice and judgment", "moon_phase": "Waxing Crescent" },
        { "day": 6, "yoruba_day": "Ọjọ́-Àgbára", "activity": "Power and might", "moon_phase": "Waxing Crescent" },
        { "day": 7, "yoruba_day": "Ọjọ́-Ẹ̀tọ́", "activity": "Rights and justice", "moon_phase": "First Quarter" },
        { "day": 8, "yoruba_day": "Ọjọ́-Ṣíṣọ", "activity": "Truth telling and honesty", "moon_phase": "First Quarter" },
        { "day": 9, "yoruba_day": "Ọjọ́-Ìgbéraga", "activity": "Pride and dignity", "moon_phase": "Waxing Gibbous" },
        { "day": 10, "yoruba_day": "Ọjọ́-Adé", "activity": "Crown and royal regalia", "moon_phase": "Waxing Gibbous" },
        { "day": 11, "yoruba_day": "Ọjọ́-Àpáta", "activity": "Stone and thunderstone power", "moon_phase": "Waxing Gibbous" },
        { "day": 12, "yoruba_day": "Ọjọ́-Agadá", "activity": "Cutlass and warrior strength", "moon_phase": "Waxing Gibbous" },
        { "day": 13, "yoruba_day": "Ọjọ́-Ilú", "activity": "Drum rhythms and celebration", "moon_phase": "Waxing Gibbous" },
        { "day": 14, "yoruba_day": "Ọjọ́-Ṣàngó-Nlá", "activity": "Full Moon – Great thunder ceremony", "moon_phase": "Full Moon" },
        { "day": 15, "yoruba_day": "Ọjọ́-Àṣẹ-Ọba", "activity": "Royal divine power", "moon_phase": "Full Moon" },
        { "day": 16, "yoruba_day": "Ọjọ́-Ìgbé-inú", "activity": "Pride and inner strength", "moon_phase": "Waning Gibbous" },
        { "day": 17, "yoruba_day": "Ọjọ́-Ìjòyè", "activity": "Chieftaincy and leadership", "moon_phase": "Waning Gibbous" },
        { "day": 18, "yoruba_day": "Ọjọ́-Ìṣẹ̀lú", "activity": "Government and administration", "moon_phase": "Waning Gibbous" },
        { "day": 19, "yoruba_day": "Ọjọ́-Àdúrà-Ọba", "activity": "Royal prayers and blessings", "moon_phase": "Waning Gibbous" },
        { "day": 20, "yoruba_day": "Ọjọ́-Ìfẹ́-Ọba", "activity": "Love for the king", "moon_phase": "Waning Gibbous" },
        { "day": 21, "yoruba_day": "Ọjọ́-Òfin", "activity": "Last Quarter law and order", "moon_phase": "Last Quarter" },
        { "day": 22, "yoruba_day": "Ọjọ́-Ìlana", "activity": "Rules and regulations", "moon_phase": "Last Quarter" },
        { "day": 23, "yoruba_day": "Ọjọ́-Ìtẹ̀síwájú", "activity": "Progress and advancement", "moon_phase": "Waning Crescent" },
        { "day": 24, "yoruba_day": "Ọjọ́-Ìgbéga", "activity": "Elevation and promotion", "moon_phase": "Waning Crescent" },
        { "day": 25, "yoruba_day": "Ọjọ́-Ọlá", "activity": "Honor and dignity", "moon_phase": "Waning Crescent" },
        { "day": 26, "yoruba_day": "Ọjọ́-Ẹ̀yì", "activity": "Praise and adoration", "moon_phase": "Waning Crescent" },
        { "day": 27, "yoruba_day": "Ọjọ́-Àìnídìí", "activity": "Fearlessness and courage", "moon_phase": "Waning Crescent" },
        { "day": 28, "yoruba_day": "Ọjọ́-Ìsinmi-Ṣàngó", "activity": "Rest in royal power", "moon_phase": "New Moon" }
      ]
    },
    {
      "name": "Agẹmọ",
      "orisha": "Ọrunmila",
      "theme": "Ancient Wisdom, Sacred Knowledge",
      "days": [
        { "day": 1, "yoruba_day": "Ọjọ́-Agẹmọ", "activity": "New Moon – Ancient wisdom invocation", "moon_phase": "New Moon" },
        { "day": 2, "yoruba_day": "Ọjọ́-Àtijọ́", "activity": "Ancient traditions and customs", "moon_phase": "New Moon" },
        { "day": 3, "yoruba_day": "Ọjọ́-Ìjìnlẹ̀", "activity": "Deep mysteries exploration", "moon_phase": "Waxing Crescent" },
        { "day": 4, "yoruba_day": "Ọjọ́-Àgbà", "activity": "Elder wisdom and respect", "moon_phase": "Waxing Crescent" },
        { "day": 5, "yoruba_day": "Ọjọ́-Àsíkò-Àtijọ́", "activity": "Time immemorial knowledge", "moon_phase": "Waxing Crescent" },
        { "day": 6, "yoruba_day": "Ọjọ́-Òyè-Àgbà", "activity": "Elder understanding", "moon_phase": "Waxing Crescent" },
        { "day": 7, "yoruba_day": "Ọjọ́-Ìgbà-Àtijọ́", "activity": "Ancient times reflection", "moon_phase": "First Quarter" },
        { "day": 8, "yoruba_day": "Ọjọ́-Àṣá-Ìbílẹ̀", "activity": "Native traditions and culture", "moon_phase": "First Quarter" },
        { "day": 9, "yoruba_day": "Ọjọ́-Ìran-Àtijọ́", "activity": "Ancient genealogy", "moon_phase": "Waxing Gibbous" },
        { "day": 10, "yoruba_day": "Ọjọ́-Ìtàn-Àgbà", "activity": "Elder stories and histories", "moon_phase": "Waxing Gibbous" },
        { "day": 11, "yoruba_day": "Ọjọ́-Àjọgbé", "activity": "Sacred gathering of elders", "moon_phase": "Waxing Gibbous" },
        { "day": 12, "yoruba_day": "Ọjọ́-Ìṣẹ-Àtijọ́", "activity": "Ancient work and practices", "moon_phase": "Waxing Gibbous" },
        { "day": 13, "yoruba_day": "Ọjọ́-Ọ̀rọ̀-Àgbà", "activity": "Ancient words and sayings", "moon_phase": "Waxing Gibbous" },
        { "day": 14, "yoruba_day": "Ọjọ́-Agẹmọ-Nlá", "activity": "Full Moon – Great ancient wisdom", "moon_phase": "Full Moon" },
        { "day": 15, "yoruba_day": "Ọjọ́-Ìmọ̀-Àtijọ́", "activity": "Ancient knowledge manifestation", "moon_phase": "Full Moon" },
        { "day": 16, "yoruba_day": "Ọjọ́-Àkókò-Àtijọ́", "activity": "Primordial time connection", "moon_phase": "Waning Gibbous" },
        { "day": 17, "yoruba_day": "Ọjọ́-Àṣírí-Àgbà", "activity": "Ancient secrets revelation", "moon_phase": "Waning Gibbous" },
        { "day": 18, "yoruba_day": "Ọjọ́-Òhun-Àtijọ́", "activity": "Ancient artifacts and symbols", "moon_phase": "Waning Gibbous" },
        { "day": 19, "yoruba_day": "Ọjọ́-Ẹ̀kọ́-Àgbà", "activity": "Elder teachings and lessons", "moon_phase": "Waning Gibbous" },
        { "day": 20, "yoruba_day": "Ọjọ́-Ìwà-Àtijọ́", "activity": "Ancient character and virtue", "moon_phase": "Waning Gibbous" },
        { "day": 21, "yoruba_day": "Ọjọ́-Ìlana-Àgbà", "activity": "Last Quarter ancient ways", "moon_phase": "Last Quarter" },
        { "day": 22, "yoruba_day": "Ọjọ́-Ọ̀nà-Àtijọ́", "activity": "Ancient paths and roads", "moon_phase": "Last Quarter" },
        { "day": 23, "yoruba_day": "Ọjọ́-Àkọ́nilẹ́rìí", "activity": "Learning from witnesses", "moon_phase": "Waning Crescent" },
        { "day": 24, "yoruba_day": "Ọjọ́-Ìròyìn-Àgbà", "activity": "Ancient news and messages", "moon_phase": "Waning Crescent" },
        { "day": 25, "yoruba_day": "Ọjọ́-Àbísọ", "activity": "Prophetic announcements", "moon_phase": "Waning Crescent" },
        { "day": 26, "yoruba_day": "Ọjọ́-Àkọsílẹ̀", "activity": "Ancient record keeping", "moon_phase": "Waning Crescent" },
        { "day": 27, "yoruba_day": "Ọjọ́-Àgbéyẹ̀wò", "activity": "Ancient examination and study", "moon_phase": "Waning Crescent" },
        { "day": 28, "yoruba_day": "Ọjọ́-Ìsinmi-Agẹmọ", "activity": "Rest in ancient wisdom", "moon_phase": "New Moon" }
      ]
    },
    {
      "name": "Ògún",
      "orisha": "Ògún",
      "theme": "Iron, Technology, Hard Work",
      "days": [
        { "day": 1, "yoruba_day": "Ọjọ́-Ògún-Tuntun", "activity": "New Moon – New iron tools blessing", "moon_phase": "New Moon" },
        { "day": 2, "yoruba_day": "Ọjọ́-Irin", "activity": "Iron and metal work", "moon_phase": "New Moon" },
        { "day": 3, "yoruba_day": "Ọjọ́-Ìmọ̀-Ẹ̀rọ", "activity": "Technology and innovation", "moon_phase": "Waxing Crescent" },
        { "day": 4, "yoruba_day": "Ọjọ́-Ìṣẹ́-Ọwọ́", "activity": "Hand work and labor", "moon_phase": "Waxing Crescent" },
        { "day": 5, "yoruba_day": "Ọjọ́-Àṣeyọrí", "activity": "Achievement and success", "moon_phase": "Waxing Crescent" },
        { "day": 6, "yoruba_day": "Ọjọ́-Ọ̀nà-Irin", "activity": "Iron pathways and roads", "moon_phase": "Waxing Crescent" },
        { "day": 7, "yoruba_day": "Ọjọ́-Ìsinmi-Òṣìṣẹ́", "activity": "Workers' rest and recovery", "moon_phase": "First Quarter" },
        { "day": 8, "yoruba_day": "Ọjọ́-Ágbájọ", "activity": "Cooperation and teamwork", "moon_phase": "First Quarter" },
        { "day": 9, "yoruba_day": "Ọjọ́-Ìgbọ́nwọ́", "activity": "Skill development", "moon_phase": "Waxing Gibbous" },
        { "day": 10, "yoruba_day": "Ọjọ́-Òògùn", "activity": "Medicine and healing tools", "moon_phase": "Waxing Gibbous" },
        { "day": 11, "yoruba_day": "Ọjọ́-Ṣiṣẹ́-Líle", "activity": "Hard work and dedication", "moon_phase": "Waxing Gibbous" },
        { "day": 12, "yoruba_day": "Ọjọ́-Ohun-Èlò", "activity": "Tools and instruments", "moon_phase": "Waxing Gibbous" },
        { "day": 13, "yoruba_day": "Ọjọ́-Àgbékalẹ̀", "activity": "Foundation laying", "moon_phase": "Waxing Gibbous" },
        { "day": 14, "yoruba_day": "Ọjọ́-Ògún-Nlá", "activity": "Full Moon – Great iron ceremony", "moon_phase": "Full Moon" },
        { "day": 15, "yoruba_day": "Ọjọ́-Agbára-Irin", "activity": "Iron power manifestation", "moon_phase": "Full Moon" },
        { "day": 16, "yoruba_day": "Ọjọ́-Ìdáná-Iná", "activity": "Fire forging and creation", "moon_phase": "Waning Gibbous" },
        { "day": 17, "yoruba_day": "Ọjọ́-Ìgbékalẹ̀", "activity": "Building and construction", "moon_phase": "Waning Gibbous" },
        { "day": 18, "yoruba_day": "Ọjọ́-Àtúnṣe", "activity": "Repair and maintenance", "moon_phase": "Waning Gibbous" },
        { "day": 19, "yoruba_day": "Ọjọ́-Ìdàgbàsókè", "activity": "Progress and development", "moon_phase": "Waning Gibbous" },
        { "day": 20, "yoruba_day": "Ọjọ́-Àbájáde", "activity": "Innovation and invention", "moon_phase": "Waning Gibbous" },
        { "day": 21, "yoruba_day": "Ọjọ́-Ìgbépọ̀", "activity": "Last Quarter unity and joining", "moon_phase": "Last Quarter" },
        { "day": 22, "yoruba_day": "Ọjọ́-Àdàpọ̀", "activity": "Combining and merging", "moon_phase": "Last Quarter" },
        { "day": 23, "yoruba_day": "Ọjọ́-Ìtọ́kasí", "activity": "Reference and guidance", "moon_phase": "Waning Crescent" },
        { "day": 24, "yoruba_day": "Ọjọ́-Àdániwọ́", "activity": "Testing and examination", "moon_phase": "Waning Crescent" },
        { "day": 25, "yoruba_day": "Ọjọ́-Ìṣẹ̀dá", "activity": "Creation and making", "moon_phase": "Waning Crescent" },
        { "day": 26, "yoruba_day": "Ọjọ́-Àgbékalẹ̀-Ọ̀tún", "activity": "New foundation setting", "moon_phase": "Waning Crescent" },
        { "day": 27, "yoruba_day": "Ọjọ́-Ìparí-Iṣẹ́", "activity": "Work completion", "moon_phase": "Waning Crescent" },
        { "day": 28, "yoruba_day": "Ọjọ́-Ìsinmi-Ògún", "activity": "Rest before new work", "moon_phase": "New Moon" }
      ]
    },
    {
      "name": "Owéwé",
      "orisha": "Yemoja",
      "theme": "Harvest, Abundance, Maternal Care",
      "days": [
        { "day": 1, "yoruba_day": "Ọjọ́-Ìkórè", "activity": "New Moon – Harvest blessing ceremony", "moon_phase": "New Moon" },
        { "day": 2, "yoruba_day": "Ọjọ́-Èso", "activity": "Fruits and produce blessing", "moon_phase": "New Moon" },
        { "day": 3, "yoruba_day": "Ọjọ́-Ọ̀gbìn", "activity": "Farming and agriculture", "moon_phase": "Waxing Crescent" },
        { "day": 4, "yoruba_day": "Ọjọ́-Àkúnya", "activity": "Gathering and collection", "moon_phase": "Waxing Crescent" },
        { "day": 5, "yoruba_day": "Ọjọ́-Ọpọ́", "activity": "Abundance and plenty", "moon_phase": "Waxing Crescent" },
        { "day": 6, "yoruba_day": "Ọjọ́-Ìbùkún-Oko", "activity": "Farm and field blessings", "moon_phase": "Waxing Crescent" },
        { "day": 7, "yoruba_day": "Ọjọ́-Àgbẹ̀", "activity": "Farmer appreciation day", "moon_phase": "First Quarter" },
        { "day": 8, "yoruba_day": "Ọjọ́-Ìgbin", "activity": "Snail and slow growth wisdom", "moon_phase": "First Quarter" },
        { "day": 9, "yoruba_day": "Ọjọ́-Àsíkò-Ìkórè", "activity": "Harvest time celebration", "moon_phase": "Waxing Gibbous" },
        { "day": 10, "yoruba_day": "Ọjọ́-Ajé-Ọpọ́", "activity": "Wealth and prosperity", "moon_phase": "Waxing Gibbous" },
        { "day": 11, "yoruba_day": "Ọjọ́-Ìfẹ́-Àgbẹ̀", "activity": "Love for farmers", "moon_phase": "Waxing Gibbous" },
        { "day": 12, "yoruba_day": "Ọjọ́-Ọ̀pá-Ọ̀gbìn", "activity": "Farming tools blessing", "moon_phase": "Waxing Gibbous" },
        { "day": 13, "yoruba_day": "Ọjọ́-Irúgbìn", "activity": "Seeds and planting", "moon_phase": "Waxing Gibbous" },
        { "day": 14, "yoruba_day": "Ọjọ́-Ìkórè-Nlá", "activity": "Full Moon – Great harvest ceremony", "moon_phase": "Full Moon" },
        { "day": 15, "yoruba_day": "Ọjọ́-Ọpọ́-Nlá", "activity": "Great abundance manifestation", "moon_phase": "Full Moon" },
        { "day": 16, "yoruba_day": "Ọjọ́-Ìtọ́jú-Èso", "activity": "Fruit care and preservation", "moon_phase": "Waning Gibbous" },
        { "day": 17, "yoruba_day": "Ọjọ́-Àkójọ", "activity": "Gathering and storing", "moon_phase": "Waning Gibbous" },
        { "day": 18, "yoruba_day": "Ọjọ́-Ìpín", "activity": "Sharing and distribution", "moon_phase": "Waning Gibbous" },
        { "day": 19, "yoruba_day": "Ọjọ́-Ọrẹ́", "activity": "Friendship and community", "moon_phase": "Waning Gibbous" },
        { "day": 20, "yoruba_day": "Ọjọ́-Àtẹ́jíṣẹ́", "activity": "Eating together", "moon_phase": "Waning Gibbous" },
        { "day": 21, "yoruba_day": "Ọjọ́-Ìdáàbò-Òkun", "activity": "Last Quarter ocean protection", "moon_phase": "Last Quarter" },
        { "day": 22, "yoruba_day": "Ọjọ́-Àdúpẹ́", "activity": "Thanksgiving and gratitude", "moon_phase": "Last Quarter" },
        { "day": 23, "yoruba_day": "Ọjọ́-Ọpẹ́", "activity": "Appreciation and thanks", "moon_phase": "Waning Crescent" },
        { "day": 24, "yoruba_day": "Ọjọ́-Ìfọ̀rọ̀yín", "activity": "Forgiveness and mercy", "moon_phase": "Waning Crescent" },
        { "day": 25, "yoruba_day": "Ọjọ́-Ìrántí", "activity": "Remembrance and memory", "moon_phase": "Waning Crescent" },
        { "day": 26, "yoruba_day": "Ọjọ́-Ìkéde", "activity": "Announcement and proclamation", "moon_phase": "Waning Crescent" },
        { "day": 27, "yoruba_day": "Ọjọ́-Àyẹyẹ-Ìkórè", "activity": "Harvest celebration", "moon_phase": "Waning Crescent" },
        { "day": 28, "yoruba_day": "Ọjọ́-Ìsinmi-Ìkórè", "activity": "Rest after harvest", "moon_phase": "New Moon" }
      ]
    },
    {
      "name": "Ọ̀wàrà",
      "orisha": "Ọya",
      "theme": "Wind, Change, Ancestral Communication",
      "days": [
        { "day": 1, "yoruba_day": "Ọjọ́-Ọya", "activity": "New Moon – Wind and change ceremony", "moon_phase": "New Moon" },
        { "day": 2, "yoruba_day": "Ọjọ́-Afẹ́fẹ́", "activity": "Wind and air invocation", "moon_phase": "New Moon" },
        { "day": 3, "yoruba_day": "Ọjọ́-Àyípadà", "activity": "Change and transformation", "moon_phase": "Waxing Crescent" },
        { "day": 4, "yoruba_day": "Ọjọ́-Ìjì", "activity": "Storm and powerful winds", "moon_phase": "Waxing Crescent" },
        { "day": 5, "yoruba_day": "Ọjọ́-Ẹgun", "activity": "Ancestral communication", "moon_phase": "Waxing Crescent" },
        { "day": 6, "yoruba_day": "Ọjọ́-Òkú", "activity": "Death and transition", "moon_phase": "Waxing Crescent" },
        { "day": 7, "yoruba_day": "Ọjọ́-Àwọn-Òkú", "activity": "Communion with the deceased", "moon_phase": "First Quarter" },
        { "day": 8, "yoruba_day": "Ọjọ́-Ìmú-Dìde", "activity": "Rising and awakening", "moon_phase": "First Quarter" },
        { "day": 9, "yoruba_day": "Ọjọ́-Àgbára-Afẹ́fẹ́", "activity": "Power of wind", "moon_phase": "Waxing Gibbous" },
        { "day": 10, "yoruba_day": "Ọjọ́-Ìjìnlẹ̀-Ẹgun", "activity": "Deep ancestral wisdom", "moon_phase": "Waxing Gibbous" },
        { "day": 11, "yoruba_day": "Ọjọ́-Àṣírí-Òkú", "activity": "Secrets of the dead", "moon_phase": "Waxing Gibbous" },
        { "day": 12, "yoruba_day": "Ọjọ́-Ọ̀rọ̀-Ẹgun", "activity": "Ancestral messages", "moon_phase": "Waxing Gibbous" },
        { "day": 13, "yoruba_day": "Ọjọ́-Ìgbàgbọ́", "activity": "Faith and belief", "moon_phase": "Waxing Gibbous" },
        { "day": 14, "yoruba_day": "Ọjọ́-Ọya-Nlá", "activity": "Full Moon – Great wind ceremony", "moon_phase": "Full Moon" },
        { "day": 15, "yoruba_day": "Ọjọ́-Àyípadà-Nlá", "activity": "Great transformation", "moon_phase": "Full Moon" },
        { "day": 16, "yoruba_day": "Ọjọ́-Ìpàdàsí", "activity": "Return and coming back", "moon_phase": "Waning Gibbous" },
        { "day": 17, "yoruba_day": "Ọjọ́-Ìrànlọ́wọ́", "activity": "Helping and assistance", "moon_phase": "Waning Gibbous" },
        { "day": 18, "yoruba_day": "Ọjọ́-Àjòjì", "activity": "Strange and mysterious", "moon_phase": "Waning Gibbous" },
        { "day": 19, "yoruba_day": "Ọjọ́-Àmì", "activity": "Signs and omens", "moon_phase": "Waning Gibbous" },
        { "day": 20, "yoruba_day": "Ọjọ́-Àfihàn", "activity": "Revelation and showing", "moon_phase": "Waning Gibbous" },
        { "day": 21, "yoruba_day": "Ọjọ́-Ìdàrúdàpọ̀", "activity": "Last Quarter mixing and blending", "moon_phase": "Last Quarter" },
        { "day": 22, "yoruba_day": "Ọjọ́-Àdánidá", "activity": "Testing and proving", "moon_phase": "Last Quarter" },
        { "day": 23, "yoruba_day": "Ọjọ́-Ìwá-Àjòjì", "activity": "Strange behavior and mystery", "moon_phase": "Waning Crescent" },
        { "day": 24, "yoruba_day": "Ọjọ́-Àgbéyẹ̀wò-Ẹgun", "activity": "Ancestral visitation", "moon_phase": "Waning Crescent" },
        { "day": 25, "yoruba_day": "Ọjọ́-Ìmúkúrò", "activity": "Resurrection and revival", "moon_phase": "Waning Crescent" },
        { "day": 26, "yoruba_day": "Ọjọ́-Àtùnwá", "activity": "Reincarnation and return", "moon_phase": "Waning Crescent" },
        { "day": 27, "yoruba_day": "Ọjọ́-Àpamọ́", "activity": "Storage and keeping", "moon_phase": "Waning Crescent" },
        { "day": 28, "yoruba_day": "Ọjọ́-Ìsinmi-Ọya", "activity": "Rest in the wind", "moon_phase": "New Moon" }
      ]
    },
    {
      "name": "Ọ̀pẹ̀",
      "orisha": "Òrìṣà Òkò",
      "theme": "Agriculture, Earth, Fertile Fields",
      "days": [
        { "day": 1, "yoruba_day": "Ọjọ́-Òrìṣà-Òkò", "activity": "New Moon – Earth and agriculture ceremony", "moon_phase": "New Moon" },
        { "day": 2, "yoruba_day": "Ọjọ́-Ilẹ̀", "activity": "Earth and soil blessing", "moon_phase": "New Moon" },
        { "day": 3, "yoruba_day": "Ọjọ́-Oko", "activity": "Farm and field cultivation", "moon_phase": "Waxing Crescent" },
        { "day": 4, "yoruba_day": "Ọjọ́-Àgbàdo", "activity": "Corn and grain planting", "moon_phase": "Waxing Crescent" },
        { "day": 5, "yoruba_day": "Ọjọ́-Ẹ̀wà", "activity": "Beans and legumes", "moon_phase": "Waxing Crescent" },
        { "day": 6, "yoruba_day": "Ọjọ́-Ìṣu", "activity": "Yam and tuber cultivation", "moon_phase": "Waxing Crescent" },
        { "day": 7, "yoruba_day": "Ọjọ́-Ìsinmi-Àgbẹ̀", "activity": "Farmer's rest day", "moon_phase": "First Quarter" },
        { "day": 8, "yoruba_day": "Ọjọ́-Òjò", "activity": "Rain and water blessing", "moon_phase": "First Quarter" },
        { "day": 9, "yoruba_day": "Ọjọ́-Ìbàjẹ́", "activity": "Fertilizer and soil enrichment", "moon_phase": "Waxing Gibbous" },
        { "day": 10, "yoruba_day": "Ọjọ́-Àgbẹ̀-Ìfẹ́", "activity": "Love for farming", "moon_phase": "Waxing Gibbous" },
        { "day": 11, "yoruba_day": "Ọjọ́-Ìgbín-Ọkọ", "activity": "Garden snails and slow growth", "moon_phase": "Waxing Gibbous" },
        { "day": 12, "yoruba_day": "Ọjọ́-Àádá", "activity": "Cutlass and farming tools", "moon_phase": "Waxing Gibbous" },
        { "day": 13, "yoruba_day": "Ọjọ́-Ọ̀kọ", "activity": "Hoe and cultivation", "moon_phase": "Waxing Gibbous" },
        { "day": 14, "yoruba_day": "Ọjọ́-Òkò-Nlá", "activity": "Full Moon – Great agriculture ceremony", "moon_phase": "Full Moon" },
        { "day": 15, "yoruba_day": "Ọjọ́-Ilẹ̀-Nlá", "activity": "Great earth blessing", "moon_phase": "Full Moon" },
        { "day": 16, "yoruba_day": "Ọjọ́-Ìdàgbàsókè-Oko", "activity": "Farm development and progress", "moon_phase": "Waning Gibbous" },
        { "day": 17, "yoruba_day": "Ọjọ́-Àjàkálẹ̀-Árá", "activity": "Fighting drought and challenges", "moon_phase": "Waning Gibbous" },
        { "day": 18, "yoruba_day": "Ọjọ́-Ìtọ́jú-Oko", "activity": "Farm care and maintenance", "moon_phase": "Waning Gibbous" },
        { "day": 19, "yoruba_day": "Ọjọ́-Àbùdá", "activity": "Boundary setting and marking", "moon_phase": "Waning Gibbous" },
        { "day": 20, "yoruba_day": "Ọjọ́-Àkóso", "activity": "Management and supervision", "moon_phase": "Waning Gibbous" },
        { "day": 21, "yoruba_day": "Ọjọ́-Ìpín-Oko", "activity": "Last Quarter land division", "moon_phase": "Last Quarter" },
        { "day": 22, "yoruba_day": "Ọjọ́-Àjáde", "activity": "Harvest and profit", "moon_phase": "Last Quarter" },
        { "day": 23, "yoruba_day": "Ọjọ́-Àkúnya-Èso", "activity": "Fruit gathering", "moon_phase": "Waning Crescent" },
        { "day": 24, "yoruba_day": "Ọjọ́-Ìfẹ́hàn", "activity": "Love and demonstration", "moon_phase": "Waning Crescent" },
        { "day": 25, "yoruba_day": "Ọjọ́-Àgbérù", "activity": "Carrying and transportation", "moon_phase": "Waning Crescent" },
        { "day": 26, "yoruba_day": "Ọjọ́-Àkójọpọ̀", "activity": "Gathering together", "moon_phase": "Waning Crescent" },
        { "day": 27, "yoruba_day": "Ọjọ́-Àdúpẹ́-Ilẹ̀", "activity": "Thanksgiving to earth", "moon_phase": "Waning Crescent" },
        { "day": 28, "yoruba_day": "Ọjọ́-Ìsinmi-Òkò", "activity": "Rest from farming", "moon_phase": "New Moon" }
      ]
    },
    {
      "name": "Òpá",
      "orisha": "Òṣányìn",
      "theme": "Herbs, Medicine, Healing",
      "days": [
        { "day": 1, "yoruba_day": "Ọjọ́-Òṣányìn", "activity": "New Moon – Herbs and medicine ceremony", "moon_phase": "New Moon" },
        { "day": 2, "yoruba_day": "Ọjọ́-Ewé", "activity": "Leaves and herbal medicine", "moon_phase": "New Moon" },
        { "day": 3, "yoruba_day": "Ọjọ́-Òògùn", "activity": "Medicine and healing", "moon_phase": "Waxing Crescent" },
        { "day": 4, "yoruba_day": "Ọjọ́-Àgbo", "activity": "Herbal concoctions", "moon_phase": "Waxing Crescent" },
        { "day": 5, "yoruba_day": "Ọjọ́-Ìwòsàn", "activity": "Healing and wellness", "moon_phase": "Waxing Crescent" },
        { "day": 6, "yoruba_day": "Ọjọ́-Àtọ́sí", "activity": "Treatment and therapy", "moon_phase": "Waxing Crescent" },
        { "day": 7, "yoruba_day": "Ọjọ́-Ìgbẹ́", "activity": "Forest and wilderness", "moon_phase": "First Quarter" },
        { "day": 8, "yoruba_day": "Ọjọ́-Igi", "activity": "Trees and woody plants", "moon_phase": "First Quarter" },
        { "day": 9, "yoruba_day": "Ọjọ́-Àjẹ́", "activity": "Witchcraft and mystical power", "moon_phase": "Waxing Gibbous" },
        { "day": 10, "yoruba_day": "Ọjọ́-Àṣírí-Ewé", "activity": "Secret herbal knowledge", "moon_phase": "Waxing Gibbous" },
        { "day": 11, "yoruba_day": "Ọjọ́-Iṣẹ́-Òògùn", "activity": "Medicine making", "moon_phase": "Waxing Gibbous" },
        { "day": 12, "yoruba_day": "Ọjọ́-Àkókò-Ewé", "activity": "Herb gathering time", "moon_phase": "Waxing Gibbous" },
        { "day": 13, "yoruba_day": "Ọjọ́-Ìlera", "activity": "Health and wellness", "moon_phase": "Waxing Gibbous" },
        { "day": 14, "yoruba_day": "Ọjọ́-Òṣányìn-Nlá", "activity": "Full Moon – Great healing ceremony", "moon_phase": "Full Moon" },
        { "day": 15, "yoruba_day": "Ọjọ́-Òògùn-Nlá", "activity": "Great medicine manifestation", "moon_phase": "Full Moon" },
        { "day": 16, "yoruba_day": "Ọjọ́-Àgbékalẹ̀-Ìlera", "activity": "Foundation of health", "moon_phase": "Waning Gibbous" },
        { "day": 17, "yoruba_day": "Ọjọ́-Ìtọ́jú-Ara", "activity": "Body care and maintenance", "moon_phase": "Waning Gibbous" },
        { "day": 18, "yoruba_day": "Ọjọ́-Àpójù", "activity": "Recovery and restoration", "moon_phase": "Waning Gibbous" },
        { "day": 19, "yoruba_day": "Ọjọ́-Ìrètí-Ìlera", "activity": "Hope for health", "moon_phase": "Waning Gibbous" },
        { "day": 20, "yoruba_day": "Ọjọ́-Àìkù", "activity": "Immortality and long life", "moon_phase": "Waning Gibbous" },
        { "day": 21, "yoruba_day": "Ọjọ́-Àtúnwòsàn", "activity": "Last Quarter re-healing", "moon_phase": "Last Quarter" },
        { "day": 22, "yoruba_day": "Ọjọ́-Àtúnbí", "activity": "Regeneration and renewal", "moon_phase": "Last Quarter" },
        { "day": 23, "yoruba_day": "Ọjọ́-Ìdáàbò-Ara", "activity": "Body protection", "moon_phase": "Waning Crescent" },
        { "day": 24, "yoruba_day": "Ọjọ́-Àwòrán-Ìlera", "activity": "Image of health", "moon_phase": "Waning Crescent" },
        { "day": 25, "yoruba_day": "Ọjọ́-Ìjọba-Ìlera", "activity": "Reign of health", "moon_phase": "Waning Crescent" },
        { "day": 26, "yoruba_day": "Ọjọ́-Àgbà-Òògùn", "activity": "Elder medicine wisdom", "moon_phase": "Waning Crescent" },
        { "day": 27, "yoruba_day": "Ọjọ́-Àyẹyẹ-Ìlera", "activity": "Celebration of health", "moon_phase": "Waning Crescent" },
        { "day": 28, "yoruba_day": "Ọjọ́-Ìsinmi-Òṣányìn", "activity": "Rest in herbal healing", "moon_phase": "New Moon" }
      ]
    }
  ]
};