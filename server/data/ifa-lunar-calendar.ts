// Traditional Ifa Lunar Calendar System
// Based on authentic Yoruba lunar cycles and sacred timing

export interface IfaLunarDay {
  dayOfYear: number;
  lunarMonth: number;
  lunarDay: number;
  yorubaDate: string;
  sacredOdu: string;
  lunarPhase: "new" | "waxing" | "full" | "waning";
  spiritualFocus: string;
  spiritualFocusYoruba: string;
  prayer: string;
  prayerYoruba: string;
  blessing: string;
  blessingYoruba: string;
  significance: string;
  significanceYoruba: string;
}

// Traditional Yoruba lunar months (13 months of ~28 days)
const YORUBA_LUNAR_MONTHS = [
  { name: "Ọṣù Àgọ̀", nameEnglish: "Month of Beginning", oduGroup: "Eji Ogbe" },
  { name: "Ọṣù Ògun", nameEnglish: "Month of Iron", oduGroup: "Oyeku Meji" },
  { name: "Ọṣù Òṣóòsì", nameEnglish: "Month of the Hunter", oduGroup: "Iwori Meji" },
  { name: "Ọṣù Ọbàtálá", nameEnglish: "Month of White Cloth", oduGroup: "Odi Meji" },
  { name: "Ọṣù Ọ̀ṣun", nameEnglish: "Month of Sweet Waters", oduGroup: "Irosun Meji" },
  { name: "Ọṣù Ọya", nameEnglish: "Month of Winds", oduGroup: "Owonrin Meji" },
  { name: "Ọṣù Ṣàngó", nameEnglish: "Month of Thunder", oduGroup: "Obara Meji" },
  { name: "Ọṣù Yemọja", nameEnglish: "Month of Ocean Mother", oduGroup: "Okanran Meji" },
  { name: "Ọṣù Ọ̀rúnmìlà", nameEnglish: "Month of Divine Wisdom", oduGroup: "Ogunda Meji" },
  { name: "Ọṣù Ifá", nameEnglish: "Month of Sacred Knowledge", oduGroup: "Osa Meji" },
  { name: "Ọṣù Èṣù", nameEnglish: "Month of Divine Messenger", oduGroup: "Ika Meji" },
  { name: "Ọṣù Ìbejì", nameEnglish: "Month of Sacred Twins", oduGroup: "Oturupon Meji" },
  { name: "Ọṣù Òrì", nameEnglish: "Month of Destiny", oduGroup: "Otura Meji" }
];

// Generate lunar calendar based on traditional cycles
export function generateIfaLunarCalendar(): IfaLunarDay[] {
  const calendar: IfaLunarDay[] = [];
  
  for (let dayOfYear = 1; dayOfYear <= 365; dayOfYear++) {
    // Calculate lunar month (13 months of ~28 days)
    const lunarMonth = Math.floor((dayOfYear - 1) / 28) % 13;
    const lunarDay = ((dayOfYear - 1) % 28) + 1;
    
    // Determine lunar phase (7-day cycles within 28-day month)
    let lunarPhase: "new" | "waxing" | "full" | "waning";
    const phaseDay = lunarDay % 28;
    if (phaseDay <= 7) lunarPhase = "new";
    else if (phaseDay <= 14) lunarPhase = "waxing";
    else if (phaseDay <= 21) lunarPhase = "full";
    else lunarPhase = "waning";
    
    const monthData = YORUBA_LUNAR_MONTHS[lunarMonth];
    const yorubaDate = `${monthData.name} ${lunarDay}`;
    
    // Generate sacred content based on lunar phase and Odu
    const lunarDay_data = generateDailyContent(dayOfYear, lunarMonth, lunarDay, lunarPhase, monthData);
    
    calendar.push({
      dayOfYear,
      lunarMonth: lunarMonth + 1,
      lunarDay,
      yorubaDate,
      sacredOdu: monthData.oduGroup,
      lunarPhase,
      ...lunarDay_data
    });
  }
  
  return calendar;
}

function generateDailyContent(
  dayOfYear: number, 
  lunarMonth: number, 
  lunarDay: number, 
  lunarPhase: string,
  monthData: any
) {
  const phaseContent = getLunarPhaseContent(lunarPhase);
  const oduContent = getOduContent(monthData.oduGroup, lunarDay);
  
  return {
    spiritualFocus: `${phaseContent.focus} - ${oduContent.focus}`,
    spiritualFocusYoruba: `${phaseContent.focusYoruba} - ${oduContent.focusYoruba}`,
    
    prayer: `Blessed Òrúnmìlà, divine keeper of wisdom, as we honor this ${lunarPhase} moon in ${monthData.nameEnglish}, guide us with the sacred wisdom of ${monthData.oduGroup}. ${phaseContent.prayer} ${oduContent.prayer} May your divine light illuminate our path and bring us closer to our highest destiny. Àṣẹ.`,
    
    prayerYoruba: `Òrúnmìlà alábùkún, aṣọ́ ọgbọ́n ọlọ́run, bí a ṣe ń bu ọlá fún òṣùpá ${lunarPhase} yìí ní ${monthData.name}, fi ọgbọ́n mímọ́ ${monthData.oduGroup} tọ́ wa. ${phaseContent.prayerYoruba} ${oduContent.prayerYoruba} Kí ìmọ́lẹ̀ rẹ ọlọ́run mọ́ ọnà wa kí ó sì mú wa súnmọ́ orí wa tó ga jùlọ. Àṣẹ.`,
    
    blessing: `${phaseContent.blessing} Through ${monthData.oduGroup}, may wisdom, prosperity, and spiritual growth flow abundantly in your life today.`,
    
    blessingYoruba: `${phaseContent.blessingYoruba} Nípasẹ̀ ${monthData.oduGroup}, kí ọgbọ́n, ọrọ̀, àti ìdàgbàsókè ẹ̀mí máa ṣàn ní ìgbé ayé rẹ lónìí.`,
    
    significance: `This ${lunarPhase} moon day in ${monthData.nameEnglish} connects you to the eternal wisdom of ${monthData.oduGroup}, emphasizing ${phaseContent.significance}`,
    
    significanceYoruba: `Ọjọ́ òṣùpá ${lunarPhase} yìí ní ${monthData.name} so ọ́ pọ̀ mọ́ ọgbọ́n láéláé ${monthData.oduGroup}, tí ó tẹnu mọ́ ${phaseContent.significanceYoruba}`
  };
}

function getLunarPhaseContent(phase: string) {
  switch (phase) {
    case "new":
      return {
        focus: "New Beginnings and Intention Setting",
        focusYoruba: "Ìbẹ̀rẹ̀ Tuntun àti Ìgbéró Èrò",
        prayer: "Bless our new intentions and plant seeds of wisdom in our hearts.",
        prayerYoruba: "Bùkún àwọn èrò tuntun wa kí o sì gbin irúgbìn ọgbọ́n sí ọkàn wa.",
        blessing: "May new opportunities and divine guidance manifest in your life.",
        blessingYoruba: "Kí àwọn àǹfààní tuntun àti ìtọ́nisọ́nà ọlọ́run máa farahàn ní ìgbé ayé rẹ.",
        significance: "the power of fresh starts and divine potential",
        significanceYoruba: "agbára ìbẹ̀rẹ̀ tuntun àti àgbàrá ọlọ́run"
      };
    case "waxing":
      return {
        focus: "Growth and Development",
        focusYoruba: "Ìdàgbàsókè àti Ìtẹ̀síwájú",
        prayer: "Support our spiritual and material growth with your divine wisdom.",
        prayerYoruba: "Ṣe àtìlẹyìn ìdàgbàsókè ẹ̀mí àti ti ayé wa pẹ̀lú ọgbọ́n rẹ ọlọ́run.",
        blessing: "May your efforts be blessed with steady progress and abundance.",
        blessingYoruba: "Kí àwọn ìgbìyànjú rẹ gba ìbùkún ìlọsíwájú àti ọ̀pọ̀lọpọ̀.",
        significance: "the importance of consistent effort and steady progress",
        significanceYoruba: "pàtàkì ìgbìyànjú ìgbàkọ̀ọ̀gbà àti ìlọsíwájú ìgbàkọ̀ọ̀gbà"
      };
    case "full":
      return {
        focus: "Manifestation and Completion",
        focusYoruba: "Ìmúṣẹ àti Ìparí",
        prayer: "Help us manifest our highest good and complete sacred works.",
        prayerYoruba: "Ràn wá lọ́wọ́ láti mú rere wa tó ga jùlọ ṣẹ àti parí àwọn iṣẹ́ mímọ́.",
        blessing: "May your projects reach fruition and your prayers be answered.",
        blessingYoruba: "Kí àwọn iṣẹ́ rẹ ó máa so èso kí àwọn àdúrà rẹ sì ní ìdáhùn.",
        significance: "the peak of spiritual power and divine connection",
        significanceYoruba: "òkè agbára ẹ̀mí àti ìdàpọ̀ ọlọ́run"
      };
    case "waning":
      return {
        focus: "Release and Wisdom Integration",
        focusYoruba: "Ìtúsílẹ̀ àti Ìdàpọ̀ Ọgbọ́n",
        prayer: "Guide us to release what no longer serves and integrate divine wisdom.",
        prayerYoruba: "Tọ́ wa láti tú ohun tí kò bá wa lọ nù kí a sì da ọgbọ́n ọlọ́run pọ̀.",
        blessing: "May you find peace in letting go and wisdom in reflection.",
        blessingYoruba: "Kí o rí àlàáfíà nínú ìtúsílẹ̀ àti ọgbọ́n nínú ìrònú.",
        significance: "the wisdom found in release and spiritual reflection",
        significanceYoruba: "ọgbọ́n tí a rí nínú ìtúsílẹ̀ àti ìrònú ẹ̀mí"
      };
    default:
      return {
        focus: "Sacred Awareness",
        focusYoruba: "Ìmọ̀ Mímọ́",
        prayer: "Keep us in sacred awareness of your divine presence.",
        prayerYoruba: "Jẹ́ kí a wà nínú ìmọ̀ mímọ́ ìwàsí rẹ ọlọ́run.",
        blessing: "May divine awareness guide your day.",
        blessingYoruba: "Kí ìmọ̀ ọlọ́run máa darí ọjọ́ rẹ.",
        significance: "connection to divine consciousness",
        significanceYoruba: "ìdàpọ̀ sí àǹfààní ọlọ́run"
      };
  }
}

function getOduContent(oduGroup: string, lunarDay: number) {
  // Each Odu has specific wisdom for different days of the lunar month
  const oduWisdom: { [key: string]: any } = {
    "Eji Ogbe": {
      focus: "Divine Leadership and Light",
      focusYoruba: "Aṣáájú Ọlọ́run àti Ìmọ́lẹ̀",
      prayer: "Illuminate our path with your divine light and grant us the wisdom to lead with righteousness.",
      prayerYoruba: "Fi ìmọ́lẹ̀ rẹ ọlọ́run mọ́ ọnà wa kí o sì fún wa ní ọgbọ́n láti ṣe aṣáájú pẹ̀lú òdodo."
    },
    "Oyeku Meji": {
      focus: "Ancestral Wisdom and Mystery",
      focusYoruba: "Ọgbọ́n Àwọn Baba Ńlá àti Àṣírí",
      prayer: "Connect us to ancestral wisdom and help us understand the sacred mysteries of existence.",
      prayerYoruba: "So wá pọ̀ mọ́ ọgbọ́n àwọn baba ńlá kí o sì ràn wa lọ́wọ́ láti lóye àwọn àṣírí mímọ́ ìwàláàyè."
    },
    "Iwori Meji": {
      focus: "Sacred Knowledge and Revelation",
      focusYoruba: "Ìmọ̀ Mímọ́ àti Ìfihàn",
      prayer: "Reveal hidden knowledge and grant us the wisdom to understand your divine teachings.",
      prayerYoruba: "Fihàn ìmọ̀ tí ó pamọ́ kí o sì fún wa ní ọgbọ́n láti lóye àwọn ẹ̀kọ́ rẹ ọlọ́run."
    },
    "Odi Meji": {
      focus: "Stability and Foundation",
      focusYoruba: "Ìdúróṣinṣin àti Ìpìlẹ̀",
      prayer: "Grant us stability in our spiritual journey and help us build strong foundations for our future.",
      prayerYoruba: "Fún wa ní ìdúróṣinṣin nínú ìrìn àjò ẹ̀mí wa kí o sì ràn wa lọ́wọ́ láti kọ́ ìpìlẹ̀ tó lágbára fún ọjọ́ iwájú wa."
    },
    "Irosun Meji": {
      focus: "Healing and Purification",
      focusYoruba: "Ìwòsàn àti Ìfọ̀mọ́",
      prayer: "Heal our bodies, minds, and spirits, and purify our hearts to receive your divine blessings.",
      prayerYoruba: "Wo ara, ọkàn àti ẹ̀mí wa sàn, kí o sì fọ ọkàn wa mọ́ láti gba àwọn ìbùkún rẹ ọlọ́run."
    },
    "Owonrin Meji": {
      focus: "Transformation and Change",
      focusYoruba: "Ìyípadà àti Àyípo",
      prayer: "Guide us through necessary changes and transformations with wisdom and grace.",
      prayerYoruba: "Darí wa nípasẹ̀ àwọn ìyípadà àti àyípo tó ṣe pàtàkì pẹ̀lú ọgbọ́n àti oore-ọ̀fẹ́."
    },
    "Obara Meji": {
      focus: "Community and Relationships",
      focusYoruba: "Àgbègbè àti Ìbáṣepọ̀",
      prayer: "Strengthen our bonds with family and community, and help us serve others with love.",
      prayerYoruba: "Mú ìdàpọ̀ wa pọ̀ mọ́ ìdílé àti àgbègbè, kí o sì ràn wa lọ́wọ́ láti sin àwọn mìíràn pẹ̀lú ìfẹ́."
    },
    "Okanran Meji": {
      focus: "Patience and Perseverance",
      focusYoruba: "Sùúrù àti Ìfaradà",
      prayer: "Grant us patience in difficult times and the strength to persevere through challenges.",
      prayerYoruba: "Fún wa ní sùúrù ní àkókò tó ṣòro kí o sì fún wa ní agbára láti kojú àwọn nìjà."
    },
    "Ogunda Meji": {
      focus: "Courage and Protection",
      focusYoruba: "Ìgboyà àti Àábo",
      prayer: "Give us courage to face our challenges and protect us from all harm and negativity.",
      prayerYoruba: "Fún wa ní ìgboyà láti kojú àwọn nìjà wa kí o sì dáàbò bò wa kúrò lọ́wọ́ gbogbo ibi àti ohun búburú."
    },
    "Osa Meji": {
      focus: "Intuition and Spiritual Gifts",
      focusYoruba: "Àkọ́sọ̀rí àti Ẹ̀bùn Ẹ̀mí",
      prayer: "Enhance our intuitive abilities and help us develop our spiritual gifts for divine service.",
      prayerYoruba: "Mú agbára àkọ́sọ̀rí wa pọ̀ sí i kí o sì ràn wa lọ́wọ́ láti mú àwọn ẹ̀bùn ẹ̀mí wa dàgbà fún iṣẹ́ ọlọ́run."
    },
    "Ika Meji": {
      focus: "Ethics and Moral Strength",
      focusYoruba: "Ìhùwàsí àti Agbára Ìwà",
      prayer: "Strengthen our moral character and help us always choose the path of righteousness.",
      prayerYoruba: "Mú ìwà wa lágbára kí o sì ràn wa lọ́wọ́ láti máa yan ọnà òdodo nígbà gbogbo."
    },
    "Oturupon Meji": {
      focus: "Balance and Harmony",
      focusYoruba: "Ìdọ̀gbà àti Ìbámu",
      prayer: "Help us maintain balance in all aspects of our lives and live in harmony with divine will.",
      prayerYoruba: "Ràn wa lọ́wọ́ láti ṣe ìdọ̀gbà ní gbogbo ẹ̀yà ìgbé ayé wa kí a sì máa gbé ní ìbámu pẹ̀lú ìfẹ́ ọlọ́run."
    },
    "Otura Meji": {
      focus: "Destiny and Divine Purpose",
      focusYoruba: "Orí àti Èròńgbà Ọlọ́run",
      prayer: "Align us with our divine destiny and help us fulfill our sacred purpose on earth.",
      prayerYoruba: "So wa dọ́gba pẹ̀lú orí ọlọ́run wa kí o sì ràn wa lọ́wọ́ láti mú èròńgbà mímọ́ wa ṣẹ lórí ayé."
    }
  };

  return oduWisdom[oduGroup] || oduWisdom["Eji Ogbe"];
}