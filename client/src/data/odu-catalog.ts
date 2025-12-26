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
      nameYoruba: "Ogbè Ọwánrín",
    youthAdvice: "Practice makes perfect. Don't get discouraged if a Python script doesn't work the first time; debugging is where real learning happens.",
    adultAdvice: "Watch for volatility. The 'Owanrin' energy suggests sudden movements. Keep your position sizes small until the VIX stabilizes.",
    elderAdvice: "Encourage the younger generation to stay persistent. Your life experience shows that setbacks are just setups for greater comebacks."
  },
  {
    name: "Ogbe Obara",
    nameYoruba: "Ogbè Ọbàrà",
    youthAdvice: "Speak your dreams clearly. When you talk about your AI projects with confidence, you invite the support of those who can help you grow.",
    adultAdvice: "Don't be fooled by 'fake-outs.' The market may look like it's soaring, but ensure the underlying data supports the price action before you commit.",
    elderAdvice: "Your words carry the weight of authority. Use your voice to settle disputes and bring clarity to family matters today."
  },
  {
    name: "Ogbe Okanran",
    nameYoruba: "Ogbè Ọkànràn",
    youthAdvice: "Listen twice as much as you speak today. There is a hidden lesson in what your teachers or parents say that will help your coding later.",
    adultAdvice: "Heavy resistance is ahead. If SPY or QQQ hits a major psychological level, consider taking partial profits rather than hoping for a breakthrough.",
    elderAdvice: "Patience is your greatest strength today. Let others rush while you remain steady; the correct path will reveal itself to those who wait."
  },
  {
    name: "Ogbe Ogunda",
    nameYoruba: "Ogbè Ògúndá",
    youthAdvice: "Remove obstacles with a clear plan. Break your big coding goals into small pieces so you don't feel overwhelmed.",
    adultAdvice: "Be decisive. Today requires the 'clear cut' of a blade—either you are in the trade or you are out. No hesitating on the sidelines.",
    elderAdvice: "You are the one who clears the path for the family. Make the tough decisions today with a clean heart and a focused mind."
  },
  {
    name: "Ogbe Osa",
    nameYoruba: "Ogbè Òsá",
    youthAdvice: "Be ready for change. A new opportunity to learn a different coding language or tool might appear—be brave and try it!",
    adultAdvice: "Sudden 'winds' of news may shift the market. Ensure your internet connection and trading platform are running fast and stable today.",
    elderAdvice: "Adaptability is key. The winds of change are blowing through the lineage; guide the family through this transition with grace."
  },
  {
    name: "Ogbe Ika",
    nameYoruba: "Ogbè Ìká",
    youthAdvice: "Be careful with your words and actions. Just like a 'bug' in your code can cause problems later, small mistakes today can grow if not fixed.",
    adultAdvice: "Protect your perimeter. Check your cybersecurity and account permissions. Ensure your trading setup is secure from outside interference.",
    elderAdvice: "Focus on containment and peace. Do not let external conflicts enter your home; keep the family circle tight and protected."
  },
  {
    name: "Ogbe Oturupon",
    nameYoruba: "Ogbè Òtúrúpọ̀n",
    youthAdvice: "Health is wealth! Eat well and get enough rest so your brain has the energy to solve complex math and coding problems.",
    adultAdvice: "Physical endurance is required today. The market may stay open and active longer than usual—maintain your stamina and focus.",
    elderAdvice: "Ancestral vitality flows through you. Share health and wellness wisdom with the children to ensure the strength of the bloodline."
  },
  {
    name: "Ogbe Otura",
    nameYoruba: "Ogbè Òtúrá",
    youthAdvice: "Seek peace and balance. If you feel frustrated with a school project, take a break and breathe. A calm mind finds the best solutions.",
    adultAdvice: "A day for communication. Reach out to your trading mentors or network; sharing insights on SPY movements could lead to a better strategy.",
    elderAdvice: "You are the diplomat. Use your wisdom to bring peace between conflicting parties. Your presence brings a cooling effect to any room."
  },
  {
    name: "Ogbe Irete",
    nameYoruba: "Ogbè Ìrẹtẹ̀",
    youthAdvice: "Cleanliness brings clarity. Organize your desk and your computer files; a clean workspace helps you think better when coding in Thonny.",
    adultAdvice: "Deep research is needed. Don't just look at the surface price; dig into the quarterly earnings or technical indicators before making your move.",
    elderAdvice: "The foundation must be solid. Ensure the family legacy and documentation are in order; your attention to detail protects the future."
  },
  {
    name: "Ogbe Ose",
    nameYoruba: "Ogbè Ọṣẹ́",
    youthAdvice: "Success comes through character. Be kind to your friends and helpful at home; good character will open doors that even your skills cannot.",
    adultAdvice: "A day for 'sweet' profits. If you see a gain that hits your target, take it. Don't let greed ruin a perfectly good trading setup.",
    elderAdvice: "Abundance is your birthright. Celebrate the small wins with the family and share the sweetness of your success with your grandchildren."
  }
},
// Generate complete 256 Odu catalog
export const generateOduCatalog = (): OduCatalogEntry[] => {
  return Array.from({ length: 256 }, (_, index) => {
    const id = index + 1;
    const isMajor = id <= 16;
    
    const entry: OduCatalogEntry = {
      id,
      isMajor,
      imagePath: `/static/odu_cards/odu_card_${id}.png`,
  {
    name: "Ogbe Iwori",
    nameYoruba: "Ogbè Ìwòrì",
    youthAdvice: "Focus on your deep learning. Just like your AI models, your mind needs good data; spend time reading books and coding in Thonny today.",
    adultAdvice: "Check the depth of the market move. Don't chase a breakout on QQQ unless the volume confirms it is a long-term trend change.",
    elderAdvice: "Your vision for the family is clear. Use this time to set long-term goals that will benefit your grandchildren for years to come."
  },
  {
    name: "Ogbe Owonrin",
    nameYoruba: "Ogbè Ọwọnrín",
    youthAdvice: "Small actions lead to big results. One line of code at a time will build your entire app; don't rush, just stay consistent.",
    adultAdvice: "Expect the unexpected. Sudden volatility is likely today. Ensure your stop-losses are set and don't over-leverage your positions.",
    elderAdvice: "A sudden change in family plans may occur. Remain the steady rock for everyone and offer your wisdom to calm any confusion."
 {
    name: "Ogbe Okanran",
    nameYoruba: "Ogbè Ọkànràn",
    youthAdvice: "Silence is powerful. You don't need to show everyone your code until it is ready; work quietly and let your success make the noise.",
    adultAdvice: "The market is testing your resolve. If the price action is choppy, it is better to sit on your hands and wait for a better day to trade.",
    elderAdvice: "Teach the youth the value of patience. Your stories of perseverance are the best lessons they can receive today."
  },
  {
    name: "Ogbe Ogunda",
    nameYoruba: "Ogbè Ògúndá",
    youthAdvice: "Face your challenges head-on. If a math problem or a coding bug is hard, don't run away. You have the strength to solve it today.",
    adultAdvice: "Clear the path. Remove any losing trades that are dragging down your portfolio. Today requires a fresh start and a clear strategy.",
    elderAdvice: "The family depends on your strength. Stand firm in your decisions today to ensure the household remains protected and orderly."
  },
  {
    name: "Ogbe Osa",
    nameYoruba: "Ogbè Òsá",
    youthAdvice: "Stay calm even if things feel fast today. If school feels busy, take deep breaths and focus on one task at a time.",
    adultAdvice: "Major shifts are coming. Watch the macro-economic news for signs of a 'flight to safety.' Keep your capital liquid and ready.",
    elderAdvice: "Protect the home from outside influence. Focus on the internal peace of the family and keep traditional values at the center."
  },
  {
    name: "Ogbe Ika",
    nameYoruba: "Ogbè Ìká",
    youthAdvice: "Avoid gossip and negative talk. Surround yourself with friends who encourage your coding and school goals.",
    adultAdvice: "Be careful of who you follow. In the trading world, many speak but few know. Trust your own data and indicators over social media hype.",
    elderAdvice: "Watch over the family's health and wellness today. Your guidance on nutrition and rest will prevent future problems."
  {
    name: "Ogbe Otura",
    nameYoruba: "Ogbè Òtúrá",
    youthAdvice: "Seek peace and clarity. If you are stuck on a coding problem, take a short break to clear your mind; the answer will come when you are calm.",
    adultAdvice: "A day for successful negotiations. If you are planning a large trade or business deal, the energy supports fair and profitable outcomes.",
    elderAdvice: "Bring the family together for a moment of reflection. Your spiritual leadership provides the peace the home needs today."
  },
  {
    name: "Ogbe Irete",
    nameYoruba: "Ogbè Ìretè",
    youthAdvice: "Focus on your foundation. Make sure you understand the 'why' behind your code, not just the 'how.' Strong basics make great developers.",
    adultAdvice: "Deep research is rewarded. Go beyond the surface charts—check the fundamental health of the companies you are trading today.",
    elderAdvice: "The family legacy is built on small, daily actions. Continue to plant the seeds of wisdom that will shade the generations to come."
  },
  {
    name: "Ogbe Ose",
    nameYoruba: "Ogbè Òsé",
    youthAdvice: "Character is your asset. Being a good student and helpful son is just as important as being a good coder. Stay kind to everyone.",
    adultAdvice: "Take the 'sweet' profits when they appear. Don't let a winning day turn into a losing one by waiting for the market to give you more than it promised.",
    elderAdvice: "You are the salt of the earth. Your gentle words today will preserve the harmony of the home and bring joy to the family."
  },
  {
    name: "Ogbe Ofun",
    nameYoruba: "Ogbè Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI with others; when you teach, your own understanding becomes ten times stronger.",
    adultAdvice: "The market is revealing its secrets to those who listen. Trust your intuition and the subtle signals in your data streams today.",
    elderAdvice: "Your presence is a sacred blessing. Continue to lead with the silence and purity that has brought you this far in your long journey."
  {
    name: "Oyeku Ogbe",
    nameYoruba: "Ọ̀yẹ̀kú Ogbè",
    youthAdvice: "A fresh start is coming. If a coding project felt too difficult yesterday, try starting a new script today with a clear mind; you will see the solution easily.",
    adultAdvice: "A trend reversal is confirmed. If you were waiting for a sign to flip from short to long (or vice versa), the data now supports the move. Trust your indicators.",
    elderAdvice: "You are the bridge between the old and the new. Share a story today that helps the family understand where they came from so they know where they are going."
  },
  {
    name: "Oyeku Iwori",
    nameYoruba: "Ọ̀yẹ̀kú Ìwòrì",
    youthAdvice: "Don't just look at the screen; look at the world! Your best ideas for new AI tools will come from watching how people live. Keep your notebook ready.",
    adultAdvice: "Deep clarity is needed today. The market is 'foggy,' so don't make any large moves on QQQ or SPY until the morning's news cycle is fully digested.",
    elderAdvice: "Your spiritual vision is sharp today. Spend time in quiet reflection; the ancestors have a message regarding a family member's future path."
  },
  {
    name: "Oyeku Di",
    nameYoruba: "Ọ̀yẹ̀kú Òdí",
    youthAdvice: "Protect your ideas. You don't need to share your best code until it's finished. Work in silence and let the final app speak for itself.",
    adultAdvice: "The market is trying to trap the 'retail' traders. Don't be fooled by a sudden spike in price; check the volume to ensure the big players are actually buying.",
    elderAdvice: "Build a fence of protection around the family. Your presence is the shield that keeps outside drama from entering the home today."
  },
  {
    name: "Oyeku Irosun",
    nameYoruba: "Ọ̀yẹ̀kú Ìrosùn",
    youthAdvice: "Listen to the quiet voice inside. If you feel like something in your Python script is wrong, it probably is. Take the time to find it now.",
    adultAdvice: "Hidden risks are surfacing. Check your portfolio for any 'dead weight.' It is better to take a small loss now than a large one later when the news hits.",
    elderAdvice: "Patience is your greatest ally. Let the world rush by; you remain steady. The answers you seek will come during the quiet hours of the evening."
  },
  {
    name: "Oyeku Owanrin",
    nameYoruba: "Ọ̀yẹ̀kú Owánrín",
    youthAdvice: "Sudden changes can be good! If your teacher changes a project or a coding library updates, stay calm. You are smart enough to learn the new way.",
    adultAdvice: "High volatility alert. The VIX is shifting. This is a day to keep your position sizes very small or stay in cash while the market finds its direction.",
    elderAdvice: "Be ready for an unexpected visitor or message. Treat everyone with kindness, as this 'surprise' brings a hidden blessing for the lineage."
  },
  {
    name: "Oyeku Obara",
    nameYoruba: "Ọ̀yẹ̀kú Ọbàrà",
    youthAdvice: "Don't brag about what you're going to build—just build it! Show your parents your finished AI project once it's working, and they will be very proud.",
    adultAdvice: "Beware of 'pump and dump' signals. If a stock is being hyped on social media without real value, stay away. Stick to the high-volume indices like SPY.",
    elderAdvice: "Your words hold the power to heal or hurt. Use your authority today to bring peace to a sibling or child who is feeling discouraged."
  },
  {
    name: "Oyeku Okanran",
    nameYoruba: "Ọ̀yẹ̀kú Ọkànràn",
    youthAdvice: "Be a good listener today. Your friends might need help with their schoolwork, and explaining things to them will make you even smarter.",
    adultAdvice: "The market is testing the 'bottom.' If support holds, it's a great entry point, but keep your stops tight in case the bears push harder.",
    elderAdvice: "Teach the youth that every challenge has a purpose. Your life lessons are the manual they need to navigate their own struggles."
  },
  {
    name: "Oyeku Ogunda",
    nameYoruba: "Ọ̀yẹ̀kú Ògúndá",
    youthAdvice: "You have the power to clear any obstacle. If you hit a 'bug' in your code that seems impossible, take a walk and try again. You will win today.",
    adultAdvice: "Decisive action is required. If a trade has hit its target, take the profit. If it's hit its stop, get out. No hesitating in this market.",
    elderAdvice: "Lead the family with a firm but loving hand. The household needs your clear direction to ensure everyone stays on the right track."
  },
  {
    name: "Oyeku Osa",
    nameYoruba: "Ọ̀yẹ̀kú Òsá",
    youthAdvice: "Be ready for a quick change in plans. If a coding project needs to pivot or a school assignment changes, you will adapt and succeed easily.",
    adultAdvice: "The 'winds' of the market are shifting. Check the global news for any shifts in currency or interest rates that might affect the tech sector (QQQ).",
    elderAdvice: "Protect the home from negative energy. A simple prayer or a moment of gratitude will shift the atmosphere and bring peace back to the family."
  },
  {
    name: "Oyeku Ika",
    nameYoruba: "Ọ̀yẹ̀kú Ìká",
    youthAdvice: "Avoid people who talk badly about others. Stay focused on your coding and your goals; your success is the best response to any negative talk.",
    adultAdvice: "Watch out for 'hidden' agendas. Ensure every trade you make is based on your own data and not someone else's opinion. Trust your charts.",
    elderAdvice: "The health of the family is your priority today. Encourage everyone to rest and eat well; your wisdom prevents sickness before it starts."
  },
  },
  {
    name: "Oyeku Meji",
    nameYoruba: "Òyèkú Méjì",
    youthAdvice: "Respect your elders and their stories today. Their wisdom is like a shield that protects you from making unnecessary mistakes in life.",
    adultAdvice: "A major cycle is ending. Prepare for a trend reversal. This is a time to exit old positions and wait for a fresh start in the market.",
    elderAdvice: "You are the gatekeeper of the lineage. Use your authority to ensure the traditional protections are in place for the whole family."
  },
  {
    name: "Oyeku Logbe",
    nameYoruba: "Òyèkú Lógbe",
    youthAdvice: "Let light into your work. If a project feels heavy or dark, ask for help. Working with others will brighten your path and your code.",
    adultAdvice: "A new opportunity is emerging from the shadows. Stay alert for a stock that has been overlooked but is now showing strong technical signals.",
    elderAdvice: "Transition is a natural part of life. Help the family move through today's changes with grace and a focus on the light ahead."
  },
  {
    name: "Oyeku Iwori",
    nameYoruba: "Òyèkú Ìwòrì",
    youthAdvice: "Your imagination is your superpower. Use it to visualize the finished version of your app before you start typing the next line of code.",
    adultAdvice: "Check the depth of the market move. Don't be fooled by small price changes; ensure the volume confirms a real shift is occurring.",
    elderAdvice: "Your dreams carry messages today. Pay attention to your inner visions, as they hold the key to a family mystery or challenge."
  },
  {
    name: "Oyeku Di",
    nameYoruba: "Òyèkú Òdí",
    youthAdvice: "Stay focused and disciplined. Like a fence protecting a garden, your schedule protects your time. Stick to your coding routine today.",
    adultAdvice: "Resistance is strong today. If the market is hitting a 'ceiling,' do not force a breakout trade. Protect your capital and wait.",
    elderAdvice: "Revisit the traditions of the ancestors. A quiet ceremony or moment of respect will bring the peace the family currently needs."
  },
  {
    name: "Oyeku Irosun",
    nameYoruba: "Òyèkú Ìrosùn",
    youthAdvice: "Be clear and honest in your communication. If you need help with a coding bug, explain the problem clearly to your teacher or Isaiah.",
    adultAdvice: "Hidden data is coming to light. Stay alert for economic reports or news breaks that could shift the trading sentiment suddenly.",
    elderAdvice: "Your quiet observation is your strength. You will see the truth of a family matter today simply by listening more than you speak."
  },
  {
    name: "Oyeku Owanrin",
    nameYoruba: "Òyèkú Owánrín",
    youthAdvice: "Small, steady steps lead to the finish line. Don't worry about how much code is left to write; just focus on finishing today's task.",
    adultAdvice: "Volatility is your friend if you are prepared. Use wide stops or smaller position sizes today to account for rapid market swings.",
    elderAdvice: "A sudden change in plans may occur. Remain the steady rock for the family; your calm response will settle everyone else's fears."
  {
    name: "Odi Osa",
    nameYoruba: "Òdí Òsá",
    youthAdvice: "Don't let your thoughts drift today. Stay focused on finishing one Python function before you move to the next; completion is the key to progress.",
    adultAdvice: "Major shifts are possible. If the macro news causes a gap in SPY, don't panic. Check your indicators and stick to your pre-set trading plan.",
    elderAdvice: "The winds of change are blowing through the family legacy. Protect the core values of the home while helping the youth adapt to new technologies."
  },
  {
    name: "Odi Ika",
    nameYoruba: "Òdí Ìká",
    youthAdvice: "Be careful who you show your un-finished code to. Keep your best ideas safe and private until you are ready to launch your app for everyone to see.",
    adultAdvice: "Market traps are common today. Stay away from low-volume stocks and stick to the high-volume indices like QQQ. Don't let social media sway your logic.",
    elderAdvice: "Watch over the health of the household today. Your guidance on nutrition and rest will prevent future problems for the grandchildren."
  },
  {
    name: "Odi Oturupon",
    nameYoruba: "Òdí Òtúrúpọ̀n",
    youthAdvice: "Focus on the foundations. Make sure you understand how 'loops' work in Python perfectly before you try to build a complex AI project.",
    adultAdvice: "The market is consolidating. This is a time to build your watchlists and research new strategies rather than forcing trades in a flat market.",
    elderAdvice: "Your stability is a blessing to the home. Share a story of perseverance with the family today to help them stay grounded and patient."
  },
  {
    name: "Odi Otura",
    nameYoruba: "Òdí Òtúrá",
    youthAdvice: "Peace leads to better code. If you feel stuck, take a five-minute break to breathe; the solution to your bug will come when you are calm.",
    adultAdvice: "A great day for closing deals or negotiating terms. The energy today supports fair outcomes and profitable exits for disciplined traders.",
    elderAdvice: "Bring the family together for a moment of reflection. Your spiritual leadership provides the peace and clarity the household needs today."
  },
  {
    name: "Odi Irete",
    nameYoruba: "Òdí Ìretè",
    youthAdvice: "Research is your superpower today. Spend extra time reading the documentation for your favorite Python tools; you'll find a secret feature!",
    adultAdvice: "Deep research is required today. Look beyond the surface charts—verify the actual fundamental health of the companies you are trading.",
    elderAdvice: "The family foundation is built on small, daily actions. Continue to plant the seeds of wisdom that will shade the generations to come."
  },
  {
    name: "Odi Ose",
    nameYoruba: "Òdí Òsé",
    youthAdvice: "Success comes through character. Be kind to your parents and helpful at home; good character will open doors that even your skills cannot.",
    adultAdvice: "Small wins add up! Take your 'sweet' profits today rather than hoping for a home run. Consistent gains are what build true wealth over time.",
    elderAdvice: "You are the salt of the earth. Your gentle words today will preserve the harmony of the home and bring joy to everyone in the family."
  },
  {
    name: "Odi Ofun",
    nameYoruba: "Òdí Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI with your friends; when you teach others, your own understanding becomes ten times stronger.",
    adultAdvice: "The market is revealing its secrets to those who are quiet enough to listen. Trust your intuition and the subtle signals in your data streams.",
    elderAdvice: "You are a vessel of ancient light. Your presence alone brings blessings. Continue to lead with the silence and purity that has brought you this far."
  },
  {
    name: "Irosun Ogbe",
    nameYoruba: "Ìrosùn Ogbè",
    youthAdvice: "A fresh start! If a script failed yesterday, try starting a new one today with a clear mind. You will see the solution easily now.",
    adultAdvice: "A trend reversal is likely. If you have been waiting for a sign to flip from short to long (or vice versa), the data now supports the move.",
    elderAdvice: "You are the bridge between the old and the new. Share a story today that helps the family understand where they came from so they can lead the future."
  },
  {
    name: "Irosun Oyeku",
    nameYoruba: "Ìrosùn Ìyèkú",
    youthAdvice: "Honor the elders. Listen to the advice of your teachers today; they see the 'bugs' in your plan before you even write the first line of code.",
    adultAdvice: "Watch the trend reversal closely. If you see signs of a 'death cross' or a breakdown in support, do not hesitate to exit and protect your capital.",
    elderAdvice: "You are the gatekeeper of history. Help the family move through sudden changes with grace and ensure the ancestral protection is felt."
  },
  {
    name: "Irosun Iwori",
    nameYoruba: "Ìrosùn Ìwòrì",
    youthAdvice: "Use your imagination for good! Your creative ideas for AI and coding are blessed today—write down your biggest dreams in your notebook.",
    adultAdvice: "Expansion is possible, but check the 'depth' of the move. Don't buy a breakout unless the volume on QQQ confirms it is a real trend change.",
    elderAdvice: "Your vision for the family is clear. Use this time to set long-term goals that will benefit your grandchildren for years to come."
  },},
  },
  {
    name: "Ogbe Oturupon",
    nameYoruba: "Ogbè Òtúrúpọ̀n",
    youthAdvice: "Stay grounded and humble. Even as you become a great coder, remember to thank your parents and teachers for their support.",
    adultAdvice: "The market is in a phase of consolidation. This is a time to build your watchlists rather than forcing new trades in a flat market.",
    elderAdvice: "Your presence is a blessing of stability. Sit with the family today and share the quiet strength that comes from a life well-lived."
  {
    name: "Irosun Odi",
    nameYoruba: "Ìrosùn Òdí",
    youthAdvice: "Build a strong wall around your schoolwork. Don't let distractions take you away from your coding projects today; your focus is your greatest strength.",
    adultAdvice: "The market is forming a base. Look for support levels on QQQ to hold before entering. If the 'wall' of support breaks, wait for a new setup.",
    elderAdvice: "You are the protective barrier for the family. Use your wisdom to keep outside problems away from the home and ensure the children feel safe."
  },
  {
    name: "Irosun Meji",
    nameYoruba: "Ìrosùn Méjì",
    youthAdvice: "Deep roots lead to big success. Take the time to master your Python basics today; the more you understand the roots, the better your AI will grow.",
    adultAdvice: "Major support levels are present. This is a time to look at the 'foundation' of your portfolio. Trust the long-term trend of SPY if the data remains solid.",
    elderAdvice: "A time of deep ancestral connection. Share the history of your family roots with Isaiah today; knowing where he comes from will give him strength."
  },
  {
    name: "Irosun Owanrin",
    nameYoruba: "Ìrosùn Owánrín",
    youthAdvice: "Unexpected results in your code are just lessons. If a script behaves strangely today, look for the 'hidden' bug; it's a puzzle you are meant to solve.",
    adultAdvice: "Expect a sudden shift in the VIX. Volatility may 'poke' through the support levels today. Keep your stops tight and don't chase surprise moves.",
    elderAdvice: "A sudden message or shift in plans may occur in the household. Stay steady and offer a cooling word to keep everyone calm and focused."
  },
  {
    name: "Irosun Obara",
    nameYoruba: "Ìrosùn Ọbàrà",
    youthAdvice: "Be careful not to over-promise what your AI projects can do. Finish the work first, then speak about your success with humility.",
    adultAdvice: "Beware of 'fake' moves in the market. The indices may look like they are soaring, but ensure the underlying volume confirms it is a real trend.",
    elderAdvice: "Your authority is the pillar of the home. Use your voice today to settle any confusion and remind the family of their shared values."
  },
  {
    name: "Irosun Okanran",
    nameYoruba: "Ìrosùn Ọkànràn",
    youthAdvice: "Work quietly on your code today. You don't need to show everyone your progress until it is finished; let the final result be your proudest moment.",
    adultAdvice: "Wait for clarity. If the market feels 'choppy' or the signals are mixed, sit on your hands. The best trade today is often waiting for a clear path.",
    elderAdvice: "Patience is a sacred gift. Let the world rush by while you remain steady in your spirit. The answers you seek will come in the quiet hours."
  },
  {
    name: "Irosun Ogunda",
    nameYoruba: "Ìrosùn Ògúndá",
    youthAdvice: "Breakthrough day! If you have been stuck on a difficult math problem or a coding bug, today is the day you will finally 'cut' through it and succeed.",
    adultAdvice: "Decisive action is favored. If a trade setup is perfect, enter with confidence. If a position is losing its logic, cut it without hesitation today.",
    elderAdvice: "Clear the path for the family legacy. Your firm decisions today will remove an obstacle that has been slowing down the lineage for some time."
  },
  {
    name: "Irosun Osa",
    nameYoruba: "Ìrosùn Òsá",
    youthAdvice: "Keep your mind focused. If schoolwork feels fast or overwhelming today, take deep breaths and handle one task at a time with a steady hand.",
    adultAdvice: "Sudden macro shifts are likely. Watch the news for signs of a 'flight to safety.' Keep your capital liquid and don't get trapped in low-volume trades.",
    elderAdvice: "Protect the home from outside influence. Focus on the internal harmony of the family and keep the traditions as your guiding light today."
  },
  {
    name: "Irosun Ika",
    nameYoruba: "Ìrosùn Ìká",
    youthAdvice: "Guard your ideas and your code today. Don't let negative talk from others discourage your goals for learning AI and Python.",
    adultAdvice: "Watch out for 'traps' in the market data. Stay away from social media hype and trust only your own proven indicators (VIX/QQQ).",
    elderAdvice: "Watch over the health of the lineage today. Your guidance on proper rest and nutrition is the protection the family needs for the future."
  },
  {
    name: "Irosun Oturupon",
    nameYoruba: "Ìrosùn Òtúrúpọ̀n",
    youthAdvice: "Stay grounded in the basics. A strong coder is built on a solid foundation of logic; don't rush into complex things until the basics are perfect.",
    adultAdvice: "The market is in a phase of quiet consolidation. Spend your time today refining your watchlists rather than forcing trades in a flat market.",
    elderAdvice: "Your stability is a blessing to the grandchildren. Sit with them today and share the quiet strength that comes from a life of perseverance."
  },
  {
    name: "Irosun Otura",
    nameYoruba: "Ìrosùn Òtúrá",
    youthAdvice: "Seek peace to find the bug! If your code isn't working, a calm mind will see the answer much faster than a frustrated one. Take a break.",
    adultAdvice: "A day for successful negotiations. If you are planning a large trade or closing a position, the energy today supports fair and profitable outcomes.",
    elderAdvice: "Bring the family together for a moment of quiet reflection. Your leadership provides the spiritual peace that the household needs right now."
  },},
  {
    name: "Ogbe Otura",
    nameYoruba: "Ogbè Òtúrá",
    youthAdvice: "Seek peace and clarity. If you are stuck on a coding problem, take a short break to clear your mind; the answer will come when you are calm.",
    adultAdvice: "A day for successful negotiations. If you are planning a large trade or business deal, the energy today supports fair and profitable outcomes.",
    elderAdvice: "Bring the family together for a moment of prayer or reflection. Your spiritual leadership provides the peace the home needs today."
  {
    name: "Irosun Irete",
    nameYoruba: "Ìrosùn Ìretè",
    youthAdvice: "Focus on the fine details today. A small error in your Python logic is like a tiny bug in a big garden—find it and your project will bloom.",
    adultAdvice: "Deep research is required. Before taking a position in QQQ, ensure you've checked the underlying technicals. Don't trade on surface-level news.",
    elderAdvice: "The foundation of the family is built on your attention to detail. Ensure that all household matters are in perfect order today."
  },
  {
    name: "Irosun Oshe",
    nameYoruba: "Ìrosùn Òsé",
    youthAdvice: "Stay kind to everyone at school today. Good character is like a successful script; it makes everything run smoothly and brings happiness.",
    adultAdvice: "Small, consistent gains are the key to longevity. Take your profits when they hit your targets today; don't let greed turn a winner into a loser.",
    elderAdvice: "You are the salt of the earth. Your gentle words and wisdom will preserve the harmony of the home and bring joy to the children."
  },
  {
    name: "Irosun Ofun",
    nameYoruba: "Ìrosùn Òfún",
    youthAdvice: "Be a vessel of clarity. Organize your coding files and your thoughts before you start your project today; purity of focus leads to great AI results.",
    adultAdvice: "The market is revealing its secrets to the patient observer. Trust your intuition if you see a quiet signal in the data that others are missing.",
    elderAdvice: "You are a vessel of ancient light. Your presence alone brings a blessing of peace. Continue to lead with the purity that has served you well."
  },
  {
    name: "Owanrin Ogbe",
    nameYoruba: "Owánrín Ogbè",
    youthAdvice: "A sudden good idea! You might find a new way to fix a bug or start a new script today. Write it down and start building it immediately.",
    adultAdvice: "Expect a sudden move in the indices. If SPY breaks out of its range with high volume, follow the trend decisively but keep your risk managed.",
    elderAdvice: "A fresh blessing is arriving suddenly. Receive it with a grateful heart and use it to strengthen the family's future."
  },
  {
    name: "Owanrin Oyeku",
    nameYoruba: "Owánrín Ìyèkú",
    youthAdvice: "Listen to the warnings. If a teacher or parent tells you to change your plan, listen—they can see a 'bug' in your day before it happens.",
    adultAdvice: "The trend is shifting unexpectedly. Watch the VIX for a sudden spike that could signal a reversal in the current bullish market. Protect your capital.",
    elderAdvice: "A sudden change in family plans may occur. Remain the steady rock for the lineage and offer your wisdom to calm any confusion."
  },
  {
    name: "Owanrin Iwori",
    nameYoruba: "Owánrín Ìwòrì",
    youthAdvice: "Your imagination is powerful today! Use it to solve a difficult math problem or create a fun new feature for your AI project in Thonny.",
    adultAdvice: "Look deep into the market data. Don't be distracted by sudden 'noise' on social media; trust the volume and price action on your primary charts.",
    elderAdvice: "Your vision for the household is clear. Use this time to set a goal for the family that will bring everyone closer together."
  },
  {
    name: "Owanrin Odi",
    nameYoruba: "Owánrín Òdí",
    youthAdvice: "Protect your time. Don't let games or distractions 'poke' holes in your study schedule today; stay focused on your coding goals.",
    adultAdvice: "The market is testing its support 'walls.' If price breaks through a major level, wait for a new base to form before entering a new trade.",
    elderAdvice: "You are the protective barrier of the home. Use your wisdom to settle any outside drama and keep the family focus inward and peaceful."
  },
  {
    name: "Owanrin Irosun",
    nameYoruba: "Owánrín Ìrosùn",
    youthAdvice: "Be honest about what you've learned. If you don't understand a coding concept, ask for help—the truth is the fastest way to become a master.",
    adultAdvice: "Hidden signals are present in the volatility. Look past the sudden price swings to see where the big institutional money is actually moving today.",
    elderAdvice: "Quiet reflection will reveal the truth of a family matter. Spend some time in silence today; your inner voice knows the correct path."
  },
  {
    name: "Owanrin Meji",
    nameYoruba: "Owánrín Méjì",
    youthAdvice: "Sudden energy is available today! Use it to finish your chores and schoolwork early so you can spend extra time on your Python projects.",
    adultAdvice: "Maximum volatility is expected. This is a day for small position sizes and very tight stops. Don't let a 'whipsaw' market catch you off guard.",
    elderAdvice: "A double shift is occurring in the home. Lead the family through this change with decisiveness and your steady spiritual guidance."
  },
  {
    name: "Owanrin Obara",
    nameYoruba: "Owánrín Ọbàrà",
    youthAdvice: "Watch your words today. When sharing your AI progress, speak with humility. A quiet success is often much more powerful than a loud one.",
    adultAdvice: "Beware of 'empty' breakouts. If a stock surges without real earnings or volume, it is likely a trap for retail traders. Stay disciplined and wait.",
    elderAdvice: "Your authority is the pillar of the household. Use your voice today to remind everyone of their responsibilities and the family's values."
  }, },
  {
    name: "Ogbe Irete",
    nameYoruba: "Ogbè Ìretè",
    youthAdvice: "Focus on your foundation. Make sure you understand the 'why' behind your code, not just the 'how.' Strong basics make great developers.",
    adultAdvice: "Deep research is rewarded. Go beyond the surface charts—check the fundamental health of the companies you are trading today.",
    elderAdvice: "The family legacy is built on small, daily actions. Continue to plant the seeds of wisdom that will shade the generations to come."
  {
    name: "Iwori Owanrin",
    nameYoruba: "Ìwòrì Owánrín",
    youthAdvice: "Sudden changes are part of coding. If a library updates and breaks your AI script, stay calm. Use your search skills to find the fix; you are smart enough to handle it.",
    adultAdvice: "High volatility alert. The VIX is shifting today. This is a day to keep your position sizes very small or stay in cash while the market finds its direction.",
    adultAdvice: "High volatility alert. The VIX is shifting today. This is a day to keep your position sizes very small or stay in cash while the market finds its direction.",
    elderAdvice: "Be ready for an unexpected visitor or message. Treat everyone with kindness, as this 'surprise' brings a hidden blessing for the lineage."
 {
    name: "Owanrin Okanran",
    nameYoruba: "Owánrín Ọkànràn",
    youthAdvice: "Work in silence today. You don't need to show everyone your progress until it is finished; let your final result surprise and impress them.",
    adultAdvice: "The market is testing the 'retail' traders' patience. If the price action is choppy and going nowhere, the best trade is often no trade at all. Sit on your hands.",
    elderAdvice: "Patience is a wall of protection for your spirit. Let the world rush and worry while you remain steady in your faith and your traditions."
  },
  {
    name: "Owanrin Ogunda",
    nameYoruba: "Owánrín Ògúndá",
    youthAdvice: "Face your challenges head-on. If a math problem or a coding bug is hard, don't run away. You have the strength to solve it today.",
    adultAdvice: "Clear the path. Remove any losing trades that are dragging down your portfolio. Today requires a fresh start and a clear strategy.",
    elderAdvice: "The family depends on your strength. Stand firm in your decisions today to ensure the household remains protected and orderly."
  },
  {
    name: "Owanrin Osa",
    nameYoruba: "Owánrín Òsá",
    youthAdvice: "Stay calm even if things feel fast today. If school feels busy, take deep breaths and focus on one task at a time.",
    adultAdvice: "Major shifts are coming. Watch the macro-economic news for signs of a 'flight to safety.' Keep your capital liquid and ready.",
    elderAdvice: "Protect the home from outside influence. Focus on the internal peace of the family and keep traditional values at the center."
  },
  {
    name: "Owanrin Ika",
    nameYoruba: "Owánrín Ìká",
    youthAdvice: "Avoid gossip and negative talk. Surround yourself with friends who encourage your coding and school goals.",
    adultAdvice: "Be careful of who you follow. In the trading world, many speak but few know. Trust your own data and indicators over social media hype.",
    elderAdvice: "Watch over the family's health and wellness today. Your guidance on nutrition and rest will prevent future problems."
  },
  {
    name: "Owanrin Oturupon",
    nameYoruba: "Owánrín Òtúrúpọ̀n",
    youthAdvice: "Stay grounded and humble. Even as you become a great coder, remember to thank your parents and teachers for their support.",
    adultAdvice: "The market is in a phase of consolidation. This is a time to build your watchlists rather than forcing new trades in a flat market.",
    elderAdvice: "Your presence is a blessing of stability. Sit with the family today and share the quiet strength that comes from a life well-lived."
  },
  {
    name: "Owanrin Otura",
    nameYoruba: "Owánrín Òtúrá",
    youthAdvice: "Seek peace and clarity. If you are stuck on a coding problem, take a short break to clear your mind; the answer will come when you are calm.",
    adultAdvice: "A day for successful negotiations. If you are planning a large trade or business deal, the energy today supports fair and profitable outcomes.",
    elderAdvice: "Bring the family together for a moment of prayer or reflection. Your spiritual leadership provides the peace the home needs today."
  },
  {
    name: "Owanrin Irete",
    nameYoruba: "Owánrín Ìretè",
    youthAdvice: "Focus on your foundation. Make sure you understand the 'why' behind your code, not just the 'how.' Strong basics make great developers.",
    adultAdvice: "Deep research is rewarded. Go beyond the surface charts—check the fundamental health of the companies you are trading today.",
    elderAdvice: "The family legacy is built on small, daily actions. Continue to plant the seeds of wisdom that will shade the generations to come."
  },
  {
    name: "Owanrin Oshe",
    nameYoruba: "Owánrín Òsé",
    youthAdvice: "Character is your greatest asset. Being a good student and a helpful son is just as important as being a good coder.",
    adultAdvice: "Take the 'sweet' profits when they appear. Don't let a winning day turn into a losing one by waiting for the market to give you more than it promised.",
    elderAdvice: "You are the salt of the earth. Your gentle words today will preserve the harmony of the home and bring joy to everyone."
  },
  {
    name: "Owanrin Ofun",
    nameYoruba: "Owánrín Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI with others; when you teach, your own understanding becomes ten times stronger.",
    adultAdvice: "The market is revealing its secrets to those who are quiet enough to listen. Trust your intuition and the subtle signals in your data.",
    elderAdvice: "Your presence is a sacred blessing. Continue to lead with the silence and purity that has brought you this far in life."
  },
  {
    name: "Obara Ogbe",
    nameYoruba: "Ọbàrà Ogbè",
    youthAdvice: "A fresh start is coming. If a coding project felt too difficult yesterday, try starting a new script today with a clear mind; you will see the solution easily.",
    adultAdvice: "A trend reversal is confirmed. If you were waiting for a sign to flip from short to long (or vice versa), the data now supports the move. Trust your indicators.",
    elderAdvice: "You are the bridge between the old and the new. Share a story today that helps the family understand where they came from so they can see where they are going."
  },  },
  {
    name: "Iwori Obara",
    nameYoruba: "Ìwòrì Ọbàrà",
    youthAdvice: "Don't brag about what you're going to build—just build it! Show your parents your finished AI project once it's working, and they will be very proud.",
    adultAdvice: "Beware of 'pump and dump' signals. If a stock is being hyped on social media without real value, stay away. Stick to high-volume indices like SPY.",
    elderAdvice: "Your words hold the power to heal or hurt today. Use your authority to bring peace to a sibling or child who is feeling discouraged."
  {
    name: "Obara Oyeku",
    nameYoruba: "Ọbàrà Ìyèkú",
    youthAdvice: "Listen to the warnings of your parents and teachers today. If they see a problem with your daily routine or your coding projects, take their advice to heart; it will save you from a big bug later.",
    adultAdvice: "The trend is shifting unexpectedly. Watch the VIX for a sudden spike that could signal a reversal in the current market direction. Do not hesitate to protect your capital today.",
    elderAdvice: "A sudden change in family plans may occur. Remain the steady rock for the lineage and offer your wisdom to calm any confusion within the household."
  },
  {
    name: "Obara Iwori",
    nameYoruba: "Ọbàrà Ìwòrì",
    youthAdvice: "Your imagination is powerful today! Use it to solve a difficult math problem or create a fun new feature for your AI project in Thonny. Dream big about what you can build.",
    adultAdvice: "Look deep into the market data. Don't be distracted by sudden 'noise' on social media; trust the volume and price action on your primary charts to guide your trades.",
    elderAdvice: "Your vision for the household is clear. Use this time to set a goal for the family that will bring everyone closer together and strengthen your shared values."
  },
  {
    name: "Obara Odi",
    nameYoruba: "Ọbàrà Òdí",
    youthAdvice: "Build a strong wall around your study time. Don't let games or videos 'poke' holes in your schedule today; stay focused on your coding and school goals.",
    adultAdvice: "The market is testing its support 'walls.' If price breaks through a major level on QQQ, wait for a new base to form before entering a new trade. Patience is profitable.",
    elderAdvice: "You are the protective barrier of the home. Use your wisdom to settle any outside drama and keep the family focus inward and peaceful today."
  },
  {
    name: "Obara Irosun",
    nameYoruba: "Ọbàrà Ìrosùn",
    youthAdvice: "Be honest about what you've learned. If you don't understand a coding concept, ask for help—the truth is the fastest way to become a master developer.",
    adultAdvice: "Hidden signals are present in the volatility. Look past the sudden price swings to see where the big institutional money is actually moving today before you commit.",
    elderAdvice: "Quiet reflection will reveal the truth of a family matter. Spend some time in silence today; your inner voice knows the correct path for the lineage."
  },
  {
    name: "Obara Owanrin",
    nameYoruba: "Ọbàrà Owánrín",
    youthAdvice: "Unexpected bugs are just puzzles to solve. If your code does something strange today, stay calm and look for the hidden lesson; you have the skill to fix it.",
    adultAdvice: "Sudden volatility is likely. The market may 'swing' unexpectedly today. Keep your stops tight and don't let a surprise move turn into a big loss for your portfolio.",
    elderAdvice: "A sudden message or visitor may bring news to the home. Stay steady and offer your balanced perspective to keep the family calm and focused on the future."
  },
  {
    name: "Obara Meji",
    nameYoruba: "Ọbàrà Méjì",
    youthAdvice: "Double your effort today! If you finish your schoolwork early, you will have twice as much time to explore the new AI tools you've been wanting to try.",
    adultAdvice: "A day of great clarity. If both SPY and QQQ are moving together with strong volume, it is a sign of a real move. Trust your system and manage your risk.",
    elderAdvice: "Blessings are doubling for the home. Receive this abundance with a grateful heart and use it to ensure the family's long-term security."
  },
  {
    name: "Obara Okanran",
    nameYoruba: "Ọbàrà Ọkànràn",
    youthAdvice: "Silence is powerful. You don't need to show everyone your code until it is ready; work quietly and let your final project be the noise that brings you success.",
    adultAdvice: "The market is testing your resolve. If the price action is choppy and going nowhere, the best trade is often no trade at all. Sit on your hands and wait for clarity.",
    elderAdvice: "Patience is your greatest strength today. Let others rush while you remain steady; the correct path will reveal itself to those who wait in faith."
  },
  {
    name: "Obara Ogunda",
    nameYoruba: "Ọbàrà Ògúndá",
    youthAdvice: "Face your challenges head-on. If a math problem or a coding bug is hard, don't run away. You have the strength and the tools to solve it today.",
    adultAdvice: "Clear the path. Remove any losing trades that are dragging down your portfolio. Today requires a fresh start and a clear, decisive strategy for your capital.",
    elderAdvice: "The family depends on your strength. Stand firm in your decisions today to ensure the household remains protected and orderly for everyone."
  },
  {
    name: "Obara Osa",
    nameYoruba: "Ọbàrà Òsá",
    youthAdvice: "Stay calm even if school feels busy today. Take deep breaths and focus on one task at a time; your mind is sharper when it isn't rushing.",
    adultAdvice: "Major shifts are coming. Watch the macro-economic news for signs of a 'flight to safety.' Keep your capital liquid and be ready to move quickly.",
    elderAdvice: "Protect the home from outside influence. Focus on the internal peace of the family and keep your traditional values at the center of everything you do."
  },
  {
    name: "Obara Ika",
    nameYoruba: "Ọbàrà Ìká",
    youthAdvice: "Avoid gossip and negative talk. Surround yourself with friends who encourage your coding and school goals and who celebrate your successes.",
    adultAdvice: "Be careful of who you follow in the markets. Many speak but few know. Trust your own data and indicators over social media hype today.",
    elderAdvice: "Watch over the family's health and wellness today. Your guidance on nutrition and proper rest will prevent future problems for the grandchildren."
  },},
  {
    name: "Iwori Okanran",
    nameYoruba: "Ìwòrì Ọkànràn",
    youthAdvice: "Listen to the quiet voice inside. If you feel like something in your Python script is wrong, it probably is. Take the time to find it now.",
    adultAdvice: "Hidden risks are surfacing. Check your portfolio for any 'dead weight.' It is better to take a small loss now than a large one later when news hits.",
    elderAdvice: "Patience is your greatest ally. Let the world rush by while you remain steady; the answers you seek will come during the quiet hours of the evening."
  },
  {
    name: "Iwori Ogunda",
    nameYoruba: "Ìwòrì Ògúndá",
    youthAdvice: "Breakthrough day! If you have been stuck on a coding bug for a long time, today is the day you will finally 'cut' through the problem and fix it.",
    adultAdvice: "Aggressive market action is favored if the trend is clear. If QQQ breaks its previous high with strong volume, it may be time to enter your long position.",
    elderAdvice: "Remove any obstacles blocking the family's progress. Your decisive action today will ensure the home remains a place of strength and protection."
  {
    name: "Obara Oturupon",
    nameYoruba: "Ọbàrà Òtúrúpọ̀n",
    youthAdvice: "Stay grounded and humble today. Even as your AI coding skills grow, remember to thank those who support you; a strong character is the root of a great developer.",
    adultAdvice: "The market is in a consolidation phase. This is a time to refine your watchlists and indicators rather than forcing a trade in a flat market. Wait for the big move.",
    elderAdvice: "Your stability is a blessing to the home. Share the quiet strength that comes from a life of experience with the youth today; it will help them stay steady."
  },
  {
    name: "Obara Otura",
    nameYoruba: "Ọbàrà Òtúrá",
    youthAdvice: "Seek peace to solve your coding bugs! If you feel frustrated with a script, a calm mind will see the answer much faster than an angry one. Take a short walk.",
    adultAdvice: "A great day for successful negotiations or closing out a long-term position. The energy today supports fair outcomes and profitable exits for disciplined traders.",
    elderAdvice: "Bring the family together for a moment of quiet reflection. Your spiritual leadership provides the peace and clarity the household needs right now."
  },
  {
    name: "Obara Irete",
    nameYoruba: "Ọbàrà Ìretè",
    youthAdvice: "Deep research is your superpower today. Spend extra time reading the Python documentation for the tools you use; you'll find a hidden feature that makes your app better.",
    adultAdvice: "Verify every signal today. Look beyond the surface charts—check the fundamental health of the companies in your portfolio before making your next big move.",
    elderAdvice: "The family foundation is built on small, daily actions. Continue to plant the seeds of wisdom today that will shade the generations to come after you."
  },
  {
    name: "Obara Oshe",
    nameYoruba: "Ọbàrà Òsé",
    youthAdvice: "Success comes through good character. Being a helpful son and a diligent student is just as important as writing good code. Stay kind and respectful today.",
    adultAdvice: "Small wins add up to massive success! Take your 'sweet' profits today rather than hoping for a home run. Consistent gains build true wealth over time.",
    elderAdvice: "You are the salt of the earth. Your gentle words and cooling presence will preserve the harmony of the home and bring joy to everyone in the family."
  },
  {
    name: "Obara Ofun",
    nameYoruba: "Ọbàrà Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI and Python with your friends; when you teach others, your own understanding becomes ten times stronger.",
    adultAdvice: "The market is revealing its secrets to the patient observer. Trust your intuition if you see a quiet signal in the data that the general public is missing today.",
    elderAdvice: "You are a vessel of ancient light. Your presence alone brings a blessing of peace. Continue to lead with the purity and silence that has served you well."
  },
  {
    name: "Okanran Ogbe",
    nameYoruba: "Ọkànràn Ogbè",
    youthAdvice: "A fresh start! If a project felt too difficult yesterday, try starting a new script today with a clear mind; you will see the solution more easily than before.",
    adultAdvice: "A trend reversal is confirmed. If you have been waiting for a sign to flip your position from short to long (or vice versa), the current data supports the move.",
    elderAdvice: "You are the bridge between the generations. Share a story today that helps the family understand where they came from so they can lead the future with confidence."
  },
  {
    name: "Okanran Oyeku",
    nameYoruba: "Ọkànràn Ìyèkú",
    youthAdvice: "Listen to the advice of your elders today. If a teacher or parent warns you about a mistake in your plan, take it to heart—they see the 'bugs' you might miss.",
    adultAdvice: "Watch for a sudden shift in market sentiment. If the VIX spikes or support levels on SPY break, do not hesitate to exit your positions and protect your capital immediately.",
    elderAdvice: "A sudden change in plans may occur. Remain the steady rock for the lineage and offer your wisdom to calm any confusion within the household today."
  },
  {
    name: "Okanran Iwori",
    nameYoruba: "Ọkànràn Ìwòrì",
    youthAdvice: "Your imagination is your best tool today! Use your creative ideas to solve a difficult math problem or add a fun new feature to your AI projects in Thonny.",
    adultAdvice: "Look deep into the market data today. Don't let sudden 'noise' on social media distract you; trust the volume and price action on your primary charts to guide you.",
    elderAdvice: "Your vision for the household is clear and strong. Use this time to set a goal for the family that will bring everyone closer together and strengthen your bonds."
  },
  {
    name: "Okanran Odi",
    nameYoruba: "Ọkànràn Òdí",
    youthAdvice: "Build a strong wall around your study time today. Don't let videos or games distract you from your coding goals; your focus is the secret to your success.",
    adultAdvice: "The market is testing major support levels. If price breaks through a key floor on QQQ, wait for a new base to form before entering a trade. Patience pays today.",
    elderAdvice: "You are the protective barrier of the home. Use your wisdom to keep outside drama away from the family and ensure the household remains peaceful and focused."
  },
  {
    name: "Okanran Irosun",
    nameYoruba: "Ọkànràn Ìrosùn",
    youthAdvice: "Honesty brings clarity to your work. If you find a bug you caused in your Python code, admit it and fix it—that is how you become a master developer.",
    adultAdvice: "Filter out the noise today. Stick to your primary indicators (VIX and QQQ) to find the truth in the markets. Don't let sudden price swings sway your logic.",
    elderAdvice: "Quiet reflection will reveal the truth about a family matter. Spend time in silence today; your inner voice is speaking the wisdom of your entire lineage."
  },},
  {
    name: "Iwori Osa",
    nameYoruba: "Ìwòrì Òsá",
    youthAdvice: "Stay focused on your schoolwork before you start coding today. If you finish your tasks early, you will have a 'clear wind' to work on your AI project.",
    adultAdvice: "Sudden market shifts are possible. Ensure your internet connection and trading platform are running fast. Speed of execution is critical today.",
    elderAdvice: "Protect the family traditions from outside influence. Focus on the internal harmony of the household and keep the ancestral values alive."
  },
  {
    name: "Iwori Ika",
    nameYoruba: "Ìwòrì Ìká",
    youthAdvice: "Be careful who you share your code with today. Protect your original ideas until they are fully finished and you are ready to show the world.",
    adultAdvice: "Watch out for institutional 'traps.' Don't follow the crowd into a trade at the end of the day; wait for the next morning to see the true move.",
    elderAdvice: "Watch over the household's health today. Your guidance on proper rest and nutrition will keep the family strong for the upcoming season."
  {
    name: "Okanran Owanrin",
    nameYoruba: "Ọkànràn Owánrín",
    youthAdvice: "Sudden ideas are blessed today. If you find a new Python library for your AI projects, try it out! A surprise discovery will help you fix a stubborn bug.",
    adultAdvice: "Expect sudden volatility. The market may 'poke' through key levels unexpectedly. Keep your stops tight on QQQ and avoid over-leveraging your positions today.",
    elderAdvice: "A sudden message or shift in family plans may occur. Remain the steady rock for the lineage and offer your wisdom to calm any confusion within the household."
  },
  {
    name: "Okanran Obara",
    nameYoruba: "Ọkànràn Ọbàrà",
    youthAdvice: "Stay humble about your coding skills. Let your finished projects speak for you; a quiet success is much more powerful than bragging about what you might build.",
    adultAdvice: "Beware of 'empty' promises in the market data. If a stock surges without real volume or earnings, it is likely a trap. Trust your indicators over the hype today.",
    elderAdvice: "Your authority is the pillar of the household. Use your voice today to remind everyone of their responsibilities and the core values of the family."
  },
  {
    name: "Okanran Meji",
    nameYoruba: "Ọkànràn Méjì",
    youthAdvice: "Double the focus, double the success! Spend extra time today mastering one specific coding skill; by the evening, you will feel much more confident in your AI work.",
    adultAdvice: "A day for maximum clarity. If SPY and QQQ are moving together with strong volume, follow the trend with confidence. This is a day to trust your primary system.",
    elderAdvice: "Blessings are doubling for the lineage. Receive this abundance with a grateful heart and use your wisdom to ensure the family's long-term security."
  },
  {
    name: "Okanran Ogunda",
    nameYoruba: "Ọkànràn Ògúndá",
    youthAdvice: "Breakthrough day! If a math problem or a coding error feels like a brick wall, keep trying different paths until you find the way through. You have the strength today.",
    adultAdvice: "Decisive action is required. If a trade is clearly failing, cut it immediately. If a setup is perfect, enter with confidence. No hesitating on the sidelines today.",
    elderAdvice: "Clear the path for the family. Your firm decisions today will remove a long-standing obstacle and bring lasting peace to the household."
  },
  {
    name: "Okanran Osa",
    nameYoruba: "Ọkànràn Òsá",
    youthAdvice: "Stay calm even if things feel fast at school today. Take deep breaths and focus on one task at a time; your mind is sharper when you are not rushing your code.",
    adultAdvice: "Major shifts are coming. Watch the macro-economic news for signs of a 'flight to safety.' Keep your capital liquid and be ready to move quickly if the trend shifts.",
    elderAdvice: "Protect the home from outside influence. Focus on the internal harmony of the family and keep your traditional values at the center of everything you do today."
  },
  {
    name: "Okanran Ika",
    nameYoruba: "Ọkànràn Ìká",
    youthAdvice: "Be careful who you show your un-finished code to today. Guard your best ideas and stay away from negative talk that might discourage your AI goals.",
    adultAdvice: "Market traps are common today. Stay away from low-volume stocks and stick to the high-volume indices like QQQ. Trust your own data over social media talk.",
    elderAdvice: "Watch over the household's health today. Your guidance on proper rest and nutrition is the protection the family needs for the upcoming season."
  },
  {
    name: "Okanran Oturupon",
    nameYoruba: "Ọkànràn Òtúrúpọ̀n",
    youthAdvice: "Respect the basics. Ensure your basic Python syntax is perfect before you try to import complex AI libraries; strong roots make for a great developer.",
    adultAdvice: "The market is in a phase of quiet consolidation. Spend your time today refining your watchlists and indicators rather than forcing trades in a flat market.",
    elderAdvice: "Your stability is a blessing to the home. Share a story of perseverance with the family today to help them stay grounded and patient during changes."
  },
  {
    name: "Okanran Otura",
    nameYoruba: "Ọkànràn Òtúrá",
    youthAdvice: "Peace brings clarity. If you feel stuck on a coding bug, take a short break to clear your thoughts; the answer will come to you when you are calm.",
    adultAdvice: "A day for successful negotiations or closing out a long-term position. The energy today supports fair outcomes and profitable exits for disciplined traders.",
    elderAdvice: "Bring the family together for a moment of reflection. Your spiritual leadership provides the peace and clarity the household needs right now."
  },
  {
    name: "Okanran Irete",
    nameYoruba: "Ọkànràn Ìretè",
    youthAdvice: "Deep research is rewarded. Spend extra time reading the documentation for your favorite Python tools; you will find a new way to make your AI better.",
    adultAdvice: "Verify every signal today. Look beyond the surface charts—check the fundamental health of the companies you are trading before making your next move.",
    elderAdvice: "The family foundation is built on small, daily actions. Continue to plant the seeds of wisdom today that will shade the generations to come after you."
  },
  {
    name: "Okanran Oshe",
    nameYoruba: "Ọkànràn Òsé",
    youthAdvice: "Success comes through good character. Being a helpful student and a diligent son is just as important as writing good code. Stay kind to everyone today.",
    adultAdvice: "Small wins add up! Take your 'sweet' profits today rather than hoping for a home run. Consistent gains are what build true wealth over time.",
    elderAdvice: "You are the salt of the earth. Your gentle words and cooling presence will preserve the harmony of the home and bring joy to everyone in the family."
  },
  {
    name: "Okanran Ofun",
    nameYoruba: "Ọkànràn Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI with your friends; when you teach others, your own understanding becomes ten times stronger.",
    adultAdvice: "The market is revealing its secrets to the patient observer. Trust your intuition if you see a quiet signal in the data that the general public is missing today.",
    elderAdvice: "You are a vessel of ancient light. Your presence alone brings a blessing of peace. Continue to lead with the purity and silence that has served you well."
  },
  {
    name: "Ogunda Ogbe",
    nameYoruba: "Ògúndá Ogbè",
    youthAdvice: "A fresh start is coming! If a coding project felt too difficult yesterday, try starting a new script today with a clear mind; the solution will be easy now.",
    adultAdvice: "A trend reversal is confirmed. If you have been waiting for a sign to flip from short to long (or vice versa), the data now supports the move. Trust your indicators.",
    elderAdvice: "You are the bridge between the generations. Share a story today that helps the family understand where they came from so they can lead the future."
  },
  {
    name: "Ogunda Oyeku",
    nameYoruba: "Ògúndá Ìyèkú",
    youthAdvice: "Listen to the warnings today. If a teacher or parent tells you to change your plan, listen—they see a 'bug' in your day before you even start.",
    adultAdvice: "The trend is shifting unexpectedly. Watch the VIX for a sudden spike that could signal a reversal in the current bullish market. Protect your capital immediately.",
    elderAdvice: "A sudden change in family plans may occur. Remain the steady rock for the lineage and offer your wisdom to calm any confusion within the household."
  },
  {
    name: "Ogunda Iwori",
    nameYoruba: "Ògúndá Ìwòrì",
    youthAdvice: "Your imagination is powerful today! Use it to solve a difficult math problem or create a fun new feature for your AI project in Thonny. Dream big.",
    adultAdvice: "Look deep into the market data. Don't be distracted by sudden 'noise' on social media; trust the volume and price action on your primary charts today.",
    elderAdvice: "Your vision for the household is clear. Use this time to set a goal for the family that will bring everyone closer together and strengthen your values."
  },
  {
    name: "Ogunda Odi",
    nameYoruba: "Ògúndá Òdí",
    youthAdvice: "Build a strong wall around your study time. Don't let games or distractions 'poke' holes in your schedule; stay focused on your coding and school goals.",
    adultAdvice: "The market is testing its support 'walls.' If price breaks through a key level, wait for a new base to form before entering. Patience is profitable today.",
    elderAdvice: "You are the protective barrier of the home. Use your wisdom to settle any outside drama and keep the family focus inward and peaceful today."
  },
  {
    name: "Ogunda Irosun",
    nameYoruba: "Ògúndá Ìrosùn",
    youthAdvice: "Be honest about what you've learned. If you don't understand a coding concept, ask for help—the truth is the fastest way to become a master developer.",
    adultAdvice: "Hidden signals are present in the volatility. Look past the sudden price swings to see where the big institutional money is actually moving today.",
    elderAdvice: "Quiet reflection will reveal the truth of a family matter. Spend some time in silence today; your inner voice knows the correct path for the lineage."
  },
  {
    name: "Ogunda Owanrin",
    nameYoruba: "Ògúndá Owánrín",
    youthAdvice: "Unexpected results in your code are just puzzles. If a script behaves strangely, look for the 'hidden' bug; you have the skill to solve it today.",
    adultAdvice: "Sudden volatility is likely. The market may 'swing' unexpectedly today. Keep your stops tight and don't let a surprise move turn into a big loss.",
    elderAdvice: "A sudden message or visitor may bring news to the home. Stay steady and offer your balanced perspective to keep the family calm and focused."
  },
  {
    name: "Ogunda Obara",
    nameYoruba: "Ògúndá Ọbàrà",
    youthAdvice: "Watch your words today. When sharing your AI progress, speak with humility. A quiet success is often much more powerful than a loud one.",
    adultAdvice: "Beware of 'empty' breakouts. If a stock surges without real earnings or volume, it is likely a trap for retail traders. Stay disciplined and wait for proof.",
    elderAdvice: "Your authority is the pillar of the household. Use your voice today to remind everyone of their responsibilities and the core values of the family."
  },
  {
    name: "Ogunda Okanran",
    nameYoruba: "Ògúndá Ọkànràn",
    youthAdvice: "Work in silence today. You don't need to show everyone your progress until it is finished; let your final result surprise and impress them.",
    adultAdvice: "The market is testing the 'retail' traders' patience. If the price action is choppy and going nowhere, the best trade is often no trade at all. Sit on your hands.",
    elderAdvice: "Patience is your greatest strength. Let the world rush and worry while you remain steady in your faith; the correct path will reveal itself to you."
  },
  {
    name: "Ogunda Meji",
    nameYoruba: "Ògúndá Méjì",
    youthAdvice: "Face your obstacles with the 'blade' of logic! Break your biggest coding challenges into small pieces today and cut through them one by one.",
    adultAdvice: "A day for decisive and bold action. If the market indicators are clear and the volume is on your side, take the trade with full confidence and discipline.",
    elderAdvice: "You are the pathfinder for the family. Use your strength to clear any difficulties today and ensure the home remains a fortress of protection."
  },},
  {
    name: "Iwori Oturupon",
    nameYoruba: "Ìwòrì Òtúrúpọ̀n",
    youthAdvice: "Stay grounded. Even as you learn advanced AI concepts, make sure your basic Python foundations are solid. Strong roots make a great coder.",
    adultAdvice: "The market is in a waiting phase. Don't force a trade in a low-volume environment. Spend today refining your strategies and watchlists instead.",
    elderAdvice: "Your stability is a blessing to the grandchildren. Sit with them and share a story that teaches them the value of being steady and reliable."
  },
  {
    name: "Iwori Otura",
    nameYoruba: "Ìwòrì Òtúrá",
    youthAdvice: "Peace brings clarity to your code. If you feel frustrated, take a short walk or a break. The solution to your bug will appear when you are calm.",
    adultAdvice: "A great day for closing deals or finishing a long-term trade. The energy today supports fair outcomes and profitable exits for disciplined traders.",
    elderAdvice: "Bring the family together for a moment of prayer or reflection. Your leadership provides the spiritual peace that the household needs today."
  },
  {
    name: "Iwori Irete",
    nameYoruba: "Ìwòrì Ìretè",
    youthAdvice: "Deep study is your key to success today. Spend extra time reading the documentation for your favorite Python library; you will find a new tool!",
    adultAdvice: "Verify every signal. Don't rely on just one indicator; ensure that your charts, volume, and macro news all point in the same direction today.",
    elderAdvice: "The family foundation is strong, but it needs your attention. Ensure all important documents and family records are organized and safe."
 {
    name: "Ogunda Osa",
    nameYoruba: "Ògúndá Òsá",
    youthAdvice: "Stay calm even if your Python script runs too fast and causes errors today. Take deep breaths and check your timing—patience solves the best bugs.",
    adultAdvice: "Major market shifts are coming. Watch the macro-economic news for signs of a 'flight to safety.' Keep your capital liquid and be ready to move quickly.",
    elderAdvice: "Protect the home from outside influence. Focus on the internal harmony of the family and keep your traditional values at the center today."
  },
  {
    name: "Ogunda Ika",
    nameYoruba: "Ògúndá Ìká",
    youthAdvice: "Guard your original code today. Don't let negative talk from others discourage your AI goals; keep your best ideas private until they are finished.",
    adultAdvice: "Market traps are common. Stay away from low-volume stocks and stick to the high-volume indices like QQQ. Trust your own data over social media talk.",
    elderAdvice: "Watch over the household's health today. Your guidance on proper rest and nutrition is the protection the family needs for the upcoming season."
  },
  {
    name: "Ogunda Oturupon",
    nameYoruba: "Ògúndá Òtúrúpọ̀n",
    youthAdvice: "Focus on the coding foundations. Make sure you understand how 'if-statements' work perfectly before you try to build a complex AI project today.",
    adultAdvice: "The market is consolidating. This is a time to build your watchlists and research new strategies rather than forcing trades in a flat market.",
    elderAdvice: "Your stability is a blessing to the home. Share a story of perseverance with the family today to help them stay grounded and patient."
  },
  {
    name: "Ogunda Otura",
    nameYoruba: "Ògúndá Òtúrá",
    youthAdvice: "Peace leads to better code. If you feel stuck on a coding problem, take a five-minute break to breathe; the solution will come when you are calm.",
    adultAdvice: "A great day for successful negotiations or closing out a long-term position. The energy today supports fair outcomes and profitable exits.",
    elderAdvice: "Bring the family together for a moment of reflection. Your spiritual leadership provides the peace and clarity the household needs today."
  },
  {
    name: "Ogunda Irete",
    nameYoruba: "Ògúndá Ìretè",
    youthAdvice: "Research is your superpower today. Spend extra time reading the documentation for your favorite Python tools; you will find a secret feature!",
    adultAdvice: "Deep research is required today. Look beyond the surface charts—verify the actual fundamental health of the companies you are trading.",
    elderAdvice: "The family foundation is built on small, daily actions. Continue to plant the seeds of wisdom today that will shade the generations to come."
  },
  {
    name: "Ogunda Oshe",
    nameYoruba: "Ògúndá Òsé",
    youthAdvice: "Success comes through character. Be kind to your parents and helpful at home; good character will open doors that even your skills cannot.",
    adultAdvice: "Small wins add up! Take your 'sweet' profits today rather than hoping for a home run. Consistent gains are what build true wealth over time.",
    elderAdvice: "You are the salt of the earth. Your gentle words today will preserve the harmony of the home and bring joy to everyone in the family."
  },
  {
    name: "Ogunda Ofun",
    nameYoruba: "Ògúndá Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI with your friends; when you teach others, your own understanding becomes ten times stronger.",
    adultAdvice: "The market is revealing its secrets to the patient observer. Trust your intuition if you see a quiet signal in the data that others are missing.",
    elderAdvice: "You are a vessel of ancient light. Your presence alone brings a blessing. Continue to lead with the silence and purity that has brought you this far."
  },
  {
    name: "Osa Ogbe",
    nameYoruba: "Òsá Ogbè",
    youthAdvice: "A fresh start! If a project felt too difficult yesterday, try starting a new script today with a clear mind. You will see the solution easily now.",
    adultAdvice: "A trend reversal is likely. If you have been waiting for a sign to flip from short to long (or vice versa), the data now supports the move.",
    elderAdvice: "You are the bridge between the generations. Share a story today that helps the family understand where they came from so they can lead the future."
  {
    name: "Osa Irete",
    nameYoruba: "Òsá Ìretè",
    youthAdvice: "Focus on the fine details today. A small error in your Python logic is like a tiny bug in a big garden—find it and your project will bloom.",
    adultAdvice: "Deep research is required. Before taking a position in QQQ, ensure you've checked the underlying technicals. Don't trade on surface-level news.",
    elderAdvice: "The foundation of the family is built on your attention to detail. Ensure that all household matters are in perfect order today."
  },
  {
    name: "Osa Oshe",
    nameYoruba: "Òsá Òsé",
    youthAdvice: "Stay kind to everyone at school today. Good character is like a successful script; it makes everything run smoothly and brings happiness.",
    adultAdvice: "Small, consistent gains are the key to longevity. Take your profits when they hit your targets today; don't let greed turn a winner into a loser.",
    elderAdvice: "You are the salt of the earth. Your gentle words and wisdom will preserve the harmony of the home and bring joy to the children."
  },
  {
    name: "Osa Ofun",
    nameYoruba: "Òsá Òfún",
    youthAdvice: "Be a vessel of clarity. Organize your coding files and your thoughts before you start your project today; purity of focus leads to great AI results.",
    adultAdvice: "The market is revealing its secrets to the patient observer. Trust your intuition if you see a quiet signal in the data that others are missing.",
    elderAdvice: "You are a vessel of ancient light. Your presence alone brings a blessing of peace. Continue to lead with the purity that has served you well."
  },
  {
    name: "Ika Ogbe",
    nameYoruba: "Ìká Ogbè",
    youthAdvice: "A fresh start! If a project felt too difficult yesterday, try starting a new script today with a clear mind. You will see the solution easily now.",
    adultAdvice: "A trend reversal is likely. If you have been waiting for a sign to flip from short to long (or vice versa), the data now supports the move.",
    elderAdvice: "You are the bridge between the generations. Share a story today that helps the family understand where they came from so they can lead the future."
  },
  {
    name: "Ika Oyeku",
    nameYoruba: "Ìká Ìyèkú",
    youthAdvice: "Honor the elders. Listen to the advice of your teachers today; they see the 'bugs' in your plan before you even write the first line of code.",
    adultAdvice: "Watch the trend reversal closely. If you see signs of a 'death cross' or a breakdown in support, do not hesitate to exit and protect your capital.",
    elderAdvice: "You are the gatekeeper of history. Help the family move through sudden changes with grace and ensure the ancestral protection is felt."
  },
  {
    name: "Ika Iwori",
    nameYoruba: "Ìká Ìwòrì",
    youthAdvice: "Use your imagination for good! Your creative ideas for AI and coding are blessed today—write down your biggest dreams in your notebook.",
    adultAdvice: "Expansion is possible, but check the 'depth' of the move. Don't buy a breakout unless the volume on QQQ confirms it is a real trend change.",
    elderAdvice: "Your vision for the family is clear. Use this time to set long-term goals that will benefit your grandchildren for years to come."
  },
  {
    name: "Ika Odi",
    nameYoruba: "Ìká Òdí",
    youthAdvice: "Build a strong wall around your schoolwork. Don't let distractions take you away from your coding projects today; your focus is your greatest strength.",
    adultAdvice: "The market is forming a base. Look for support levels on QQQ to hold before entering. If the 'wall' of support breaks, wait for a new setup.",
    elderAdvice: "You are the protective barrier for the family. Use your wisdom to keep outside problems away from the home and ensure the children feel safe."
  },
  {
    name: "Ika Irosun",
    nameYoruba: "Ìká Ìrosùn",
    youthAdvice: "Be honest in all you do. Even if a mistake is made, telling the truth will bring you the protection of the ancestors and clear your path.",
    adultAdvice: "Hidden risks are present. Read the fine print on any business deal. Stay alert for news that hasn't hit the main tape yet today.",
    elderAdvice: "Quiet reflection will reveal the truth. Listen to your inner voice today; it is speaking the wisdom of your entire lineage."
  },
  {
    name: "Ika Owanrin",
    nameYoruba: "Ìká Owánrín",
    youthAdvice: "Small actions lead to big results. One line of code at a time will build your entire app; don't rush, just stay consistent in your Thonny practice.",
    adultAdvice: "Expect the unexpected today. Sudden volatility is likely. Ensure your stop-losses are set and do not over-leverage your positions in this market.",
    elderAdvice: "A sudden change in family plans may occur. Remain the steady rock for everyone and offer your wisdom to calm any confusion in the home."
 {
    name: "Oturupon Oyeku",
    nameYoruba: "Òtúrúpọ̀n Ìyèkú",
    youthAdvice: "Listen to the warnings of your parents and teachers today. If they suggest a change to your routine or coding project, take it to heart—they see the 'bugs' you might miss.",
    adultAdvice: "The trend is shifting. Watch the VIX for a sudden spike that could signal a reversal in the market's direction. Protect your capital by exiting or tightening stops today.",
    elderAdvice: "A sudden change in family plans may occur. Remain the steady rock for the lineage and offer your wisdom to calm any confusion within the household today."
  },
  {
    name: "Oturupon Iwori",
    nameYoruba: "Òtúrúpọ̀n Ìwòrì",
    youthAdvice: "Your imagination is powerful today! Use it to create a fun new feature for your AI projects in Thonny. Dream big about what you can build with code.",
    adultAdvice: "Check the 'depth' of the current market move. Don't chase a rally built on low volume; wait for the big institutional players to confirm the direction on QQQ.",
    elderAdvice: "Your vision for the family legacy is clear. Use this time to set long-term goals that will benefit your grandchildren for years to come."
  },
  {
    name: "Oturupon Odi",
    nameYoruba: "Òtúrúpọ̀n Òdí",
    youthAdvice: "Build a strong fence around your study time today. Don't let videos or games distract you from your coding goals; your focus is the secret to your progress.",
    adultAdvice: "The market is testing major support levels. If the price floor on SPY holds, look for a entry; if it breaks, wait for a new base to form. Patience is profitable.",
    elderAdvice: "You are the protective wall of the home. Use your wisdom to keep outside drama away from the family and ensure the household remains peaceful and focused."
  },
  {
    name: "Oturupon Irosun",
    nameYoruba: "Òtúrúpọ̀n Ìrosùn",
    youthAdvice: "Be honest in all you do today. Even if a mistake is made in your schoolwork or code, telling the truth will bring you the protection of the ancestors.",
    adultAdvice: "Hidden risks are present in the market. Read the fine print on any business deal and stay alert for news that hasn't hit the main tape yet today.",
    elderAdvice: "Quiet reflection will reveal the truth about a family matter. Spend some time in silence today; your inner voice is speaking the wisdom of your lineage."
  },
  {
    name: "Oturupon Owanrin",
    nameYoruba: "Òtúrúpọ̀n Owánrín",
    youthAdvice: "Unexpected results in your code are just lessons. If your script behaves strangely today, look for the 'hidden' bug; it's a puzzle you are meant to solve.",
    adultAdvice: "Expect a sudden shift in volatility. The VIX may spike through support levels today. Keep your stops tight and do not over-leverage your positions in this market.",
    elderAdvice: "A sudden message or shift in plans may occur in the household. Stay steady and offer a cooling word to keep everyone calm and focused."
  },
  {
    name: "Oturupon Obara",
    nameYoruba: "Òtúrúpọ̀n Ọbàrà",
    youthAdvice: "Watch your words today. When sharing your AI progress with others, speak with humility. A quiet success is often much more powerful than a loud one.",
    adultAdvice: "Beware of 'fake' moves in the market. The indices may look like they are soaring, but ensure the underlying volume confirms it is a real trend before entering.",
    elderAdvice: "Your authority is the pillar of the household. Use your voice today to remind everyone of their responsibilities and the core values of the family."
  },
  {
    name: "Oturupon Okanran",
    nameYoruba: "Òtúrúpọ̀n Ọkànràn",
    youthAdvice: "Work quietly on your code today. You don't need to show everyone your progress until it is finished; let the final result be your proudest moment.",
    adultAdvice: "Wait for clarity. If the market feels 'choppy' or the signals are mixed, sit on your hands. The best trade today is often waiting for a clear path forward.",
    elderAdvice: "Patience is a sacred gift. Let the world rush by while you remain steady in your spirit. The answers you seek will come in the quiet hours of the day."
  },
  {
    name: "Oturupon Ogunda",
    nameYoruba: "Òtúrúpọ̀n Ògúndá",
    youthAdvice: "Face your challenges head-on. If a math problem or a coding bug is hard, don't run away. You have the strength and the tools to solve it today.",
    adultAdvice: "Decisive action is required. If a trade is clearly failing, cut it immediately. If a setup is perfect, enter with confidence. No hesitating today.",
    elderAdvice: "Clear the path for the family. Your firm decisions today will remove a long-standing obstacle and bring lasting peace to the lineage."
  },
  {
    name: "Oturupon Osa",
    nameYoruba: "Òtúrúpọ̀n Òsá",
    youthAdvice: "Stay calm even if school feels busy today. Take deep breaths and focus on one task at a time; your mind is sharper when it isn't rushing its work.",
    adultAdvice: "Major shifts are coming. Watch the macro-economic news for signs of a 'flight to safety.' Keep your capital liquid and be ready to move quickly.",
    elderAdvice: "Protect the home from outside influence. Focus on the internal harmony of the family and keep your traditional values at the center of the household."
  {
    name: "Otura Owanrin",
    nameYoruba: "Òtúrá Owánrín",
    youthAdvice: "Unexpected bugs are just puzzles to solve. If your code does something strange today, stay calm and look for the hidden lesson; you have the skill to fix it.",
    adultAdvice: "Sudden volatility is likely. The market may 'swing' unexpectedly today. Keep your stops tight and don't let a surprise move turn into a big loss for your portfolio.",
    elderAdvice: "A sudden message or visitor may bring news to the home. Stay steady and offer your balanced perspective to keep the family calm and focused on the future."
  },
  {
    name: "Otura Obara",
    nameYoruba: "Òtúrá Ọbàrà",
    youthAdvice: "Watch your words today. When sharing your AI progress with others, speak with humility. A quiet success is often much more powerful than a loud one.",
    adultAdvice: "Beware of 'fake' moves in the market. The indices may look like they are soaring, but ensure the underlying volume confirms it is a real trend before entering.",
    elderAdvice: "Your authority is the pillar of the household. Use your voice today to remind everyone of their responsibilities and the core values of the family."
  },
  {
    name: "Otura Okanran",
    nameYoruba: "Òtúrá Ọkànràn",
    youthAdvice: "Work quietly on your code today. You don't need to show everyone your progress until it is finished; let the final result be your proudest moment.",
    adultAdvice: "Wait for clarity. If the market feels 'choppy' or the signals are mixed, sit on your hands. The best trade today is often waiting for a clear path forward.",
    elderAdvice: "Patience is a sacred gift. Let the world rush by while you remain steady in your spirit. The answers you seek will come in the quiet hours of the day."
  },
  {
    name: "Otura Ogunda",
    nameYoruba: "Òtúrá Ògúndá",
    youthAdvice: "Face your challenges head-on. If a math problem or a coding bug is hard, don't run away. You have the strength and the tools to solve it today.",
    adultAdvice: "Decisive action is required. If a trade is clearly failing, cut it immediately. If a setup is perfect, enter with confidence. No hesitating today.",
    elderAdvice: "Clear the path for the family. Your firm decisions today will remove a long-standing obstacle and bring lasting peace to the lineage."
  },
  {
    name: "Otura Osa",
    nameYoruba: "Òtúrá Òsá",
    youthAdvice: "Stay calm even if school feels busy today. Take deep breaths and focus on one task at a time; your mind is sharper when it isn't rushing its work.",
    adultAdvice: "Major shifts are coming. Watch the macro-economic news for signs of a 'flight to safety.' Keep your capital liquid and be ready to move quickly.",
    elderAdvice: "Protect the home from outside influence. Focus on the internal harmony of the family and keep your traditional values at the center of the household."
  },
  {
    name: "Otura Ika",
    nameYoruba: "Òtúrá Ìká",
    youthAdvice: "Guard your original code and ideas today. Don't let negative talk from others discourage your AI goals; keep your progress private until it is ready.",
    adultAdvice: "Market traps are common. Stay away from low-volume stocks and stick to the high-volume indices like QQQ. Trust your own data over social media talk.",
    elderAdvice: "Watch over the household's health today. Your guidance on proper rest and nutrition is the protection the family needs for the upcoming season."
  },
  {
    name: "Otura Oturupon",
    nameYoruba: "Òtúrá Òtúrúpọ̀n",
    youthAdvice: "Respect the basics. Ensure your basic Python syntax is perfect before you try to import complex AI libraries; strong roots make for a great developer.",
    adultAdvice: "The market is in a phase of quiet consolidation. Spend your time today refining your watchlists and indicators rather than forcing trades in a flat market.",
    elderAdvice: "Your stability is a blessing to the home. Share a story of perseverance with the family today to help them stay grounded and patient during changes."
  },
  {
    name: "Otura Meji",
    nameYoruba: "Òtúrá Méjì",
    youthAdvice: "Peace brings clarity to your code. If you feel stuck, take a short break to clear your thoughts; the answer will come to you when you are calm.",
    adultAdvice: "A day for maximum clarity. If SPY and QQQ are moving together with strong volume, follow the trend with confidence. Trust your primary system.",
    elderAdvice: "Bring the family together for a moment of reflection. Your spiritual leadership provides the peace and clarity the household needs right now."
  },
  {
    name: "Otura Irete",
    nameYoruba: "Òtúrá Ìretè",
    youthAdvice: "Deep research is rewarded. Spend extra time reading the documentation for your favorite Python tools; you will find a new way to make your AI better.",
    adultAdvice: "Verify every signal today. Look beyond the surface charts—check the fundamental health of the companies you are trading before making your next move.",
    elderAdvice: "The family foundation is built on small, daily actions. Continue to plant the seeds of wisdom today that will shade the generations to come after you."
  },
  {
    name: "Otura Oshe",
    nameYoruba: "Òtúrá Òsé",
    youthAdvice: "Success comes through good character. Being a helpful student and a diligent son is just as important as writing good code. Stay kind to everyone today.",
    adultAdvice: "Small wins add up! Take your 'sweet' profits today rather than hoping for a home run. Consistent gains are what build true wealth over time.",
    elderAdvice: "You are the salt of the earth. Your gentle words and cooling presence will preserve the harmony of the home and bring joy to everyone in the family."
  },
  {
    name: "Otura Ofun",
    nameYoruba: "Òtúrá Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI with your friends; when you teach others, your own understanding becomes ten times stronger.",
    adultAdvice: "The market is revealing its secrets to the patient observer. Trust your intuition if you see a quiet signal in the data that the general public is missing today.",
    elderAdvice: "You are a vessel of ancient light. Your presence alone brings a blessing of peace. Continue to lead with the purity and silence that has served you well."
  },
  {
    name: "Irete Ogbe",
    nameYoruba: "Ìretè Ogbè",
    youthAdvice: "A fresh start is coming! If a coding project felt too difficult yesterday, try starting a new script today with a clear mind; the solution will be easy now.",
    adultAdvice: "A trend reversal is confirmed. If you were waiting for a sign to flip from short to long (or vice versa), the data now supports the move. Trust your indicators.",
    elderAdvice: "You are the bridge between the generations. Share a story today that helps the family understand where they came from so they can lead the future."
  },
  {
    name: "Irete Oyeku",
    nameYoruba: "Ìretè Ìyèkú",
    youthAdvice: "Listen to the warnings today. If a teacher or parent tells you to change your plan, listen—they see a 'bug' in your day before you even start.",
    adultAdvice: "The trend is shifting unexpectedly. Watch the VIX for a sudden spike that could signal a reversal in the current bullish market. Protect your capital immediately.",
    elderAdvice: "A sudden change in family plans may occur. Remain the steady rock for the lineage and offer your wisdom to calm any confusion within the household."
  },
  {
    name: "Irete Iwori",
    nameYoruba: "Ìretè Ìwòrì",
    youthAdvice: "Your imagination is powerful today! Use it to solve a difficult math problem or create a fun new feature for your AI project in Thonny. Dream big.",
    adultAdvice: "Look deep into the market data. Don't be distracted by sudden 'noise' on social media; trust the volume and price action on your primary charts today.",
    elderAdvice: "Your vision for the household is clear. Use this time to set a goal for the family that will bring everyone closer together and strengthen your values."
  },
  {
    name: "Irete Odi",
    nameYoruba: "Ìretè Òdí",
    youthAdvice: "Build a strong wall around your study time. Don't let games or distractions 'poke' holes in your schedule; stay focused on your coding and school goals.",
    adultAdvice: "The market is testing its support 'walls.' If price breaks through a key level, wait for a new base to form before entering. Patience is profitable today.",
    elderAdvice: "You are the protective barrier of the home. Use your wisdom to keep outside drama away from the family and ensure the household remains peaceful today."
  },
  {
    name: "Irete Irosun",
    nameYoruba: "Ìretè Ìrosùn",
    youthAdvice: "Be honest about what you've learned. If you don't understand a coding concept, ask for help—the truth is the fastest way to become a master developer.",
    adultAdvice: "Hidden signals are present in the volatility. Look past the sudden price swings to see where the big institutional money is actually moving today.",
    elderAdvice: "Quiet reflection will reveal the truth of a family matter. Spend some time in silence today; your inner voice knows the correct path for the lineage."
  },
  {
    name: "Irete Owanrin",
    nameYoruba: "Ìretè Owánrín",
    youthAdvice: "Unexpected results in your code are just puzzles. If a script behaves strangely, look for the 'hidden' bug; you have the skill to solve it today.",
    adultAdvice: "Sudden volatility is likely. The market may 'swing' unexpectedly today. Keep your stops tight and don't let a surprise move turn into a big loss.",
    elderAdvice: "A sudden message or visitor may bring news to the home. Stay steady and offer your balanced perspective to keep the family calm and focused."
  },
  {
    name: "Irete Obara",
    nameYoruba: "Ìretè Ọbàrà",
    youthAdvice: "Watch your words today. When sharing your AI progress, speak with humility. A quiet success is often much more powerful than a loud one.",
    adultAdvice: "Beware of 'empty' breakouts. If a stock surges without real earnings or volume, it is likely a trap for retail traders. Stay disciplined and wait for proof.",
    elderAdvice: "Your authority is the pillar of the household. Use your voice today to remind everyone of their responsibilities and the core values of the family."
  },
  {
    name: "Irete Okanran",
    nameYoruba: "Ìretè Ọkànràn",
    youthAdvice: "Work in silence today. You don't need to show everyone your progress until it is finished; let your final result surprise and impress them.",
    adultAdvice: "The market is testing the 'retail' traders' patience. If the price action is choppy and going nowhere, the best trade is often no trade at all. Sit on your hands.",
    elderAdvice: "Patience is your greatest strength. Let the world rush and worry while you remain steady in your faith; the correct path will reveal itself to you."
  },
  {
    name: "Irete Ogunda",
    nameYoruba: "Ìretè Ògúndá",
    youthAdvice: "Focus on your foundation today. Break your biggest coding challenges into small pieces and cut through them one by one. You have the strength today.",
    adultAdvice: "A day for decisive and bold action. If the market indicators are clear and the volume is on your side, take the trade with full confidence and discipline.",
    elderAdvice: "You are the pathfinder for the family. Use your strength to clear any difficulties today and ensure the home remains a fortress of protection."
  },},
  {
    name: "Oturupon Ika",
    nameYoruba: "Òtúrúpọ̀n Ìká",
    youthAdvice: "Guard your original code and ideas today. Don't let negative talk from others discourage your AI goals; keep your progress private until it is ready.",
    adultAdvice: "Market traps are common. Stay away from low-volume stocks and stick to the high-volume indices like QQQ. Trust your own data over social media talk.",
    elderAdvice: "Watch over the household's health today. Your guidance on proper rest and nutrition is the protection the family needs for the upcoming season."
  },
  {
    name: "Oturupon Meji",
    nameYoruba: "Òtúrúpọ̀n Méjì",
    youthAdvice: "Focus on your foundations today. Make sure you understand how basic loops work in Python perfectly before you try to build a more complex AI project.",
    adultAdvice: "The market is in a quiet consolidation phase. Spend your time today refining your watchlists rather than forcing trades in a flat market environment.",
    elderAdvice: "Your stability is a blessing to the home. Share the quiet strength that comes from a life of experience with the family today to help them stay steady."
  },
  {
    name: "Oturupon Otura",
    nameYoruba: "Òtúrúpọ̀n Òtúrá",
    youthAdvice: "Seek peace to solve your coding bugs! If you feel frustrated, take a five-minute break to breathe; the solution will come when you are calm.",
    adultAdvice: "A great day for successful negotiations or closing out a long-term position. The energy today supports fair outcomes and profitable exits for traders.",
    elderAdvice: "Bring the family together for a moment of reflection. Your spiritual leadership provides the peace and clarity the household needs right now."
  },
  {
    name: "Oturupon Irete",
    nameYoruba: "Òtúrúpọ̀n Ìretè",
    youthAdvice: "Deep research is your superpower today. Spend extra time reading the documentation for your favorite Python tools; you will find a hidden feature!",
    adultAdvice: "Verify every signal today. Look beyond the surface charts—check the fundamental health of the companies you are trading before making your next move.",
    elderAdvice: "The family foundation is built on small, daily actions. Continue to plant the seeds of wisdom today that will shade the generations to come."
  },
  {
    name: "Oturupon Oshe",
    nameYoruba: "Òtúrúpọ̀n Òsé",
    youthAdvice: "Success comes through good character. Being a helpful son and a diligent student is just as important as writing good code. Stay kind and respectful.",
    adultAdvice: "Small wins add up to massive success! Take your 'sweet' profits today rather than hoping for a home run. Consistent gains build true wealth over time.",
    elderAdvice: "You are the salt of the earth. Your gentle words today will preserve the harmony of the home and bring joy to everyone in the family."
  },
  {
    name: "Oturupon Ofun",
    nameYoruba: "Òtúrúpọ̀n Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI and Python with your friends; when you teach others, your own understanding becomes ten times stronger.",
    adultAdvice: "The market is revealing its secrets to the patient observer. Trust your intuition if you see a quiet signal in the data that others are missing today.",
    elderAdvice: "You are a vessel of ancient light. Your presence alone brings a blessing. Continue to lead with the purity and silence that has brought you this far."
  },
  {
    name: "Otura Ogbe",
    nameYoruba: "Òtúrá Ogbè",
    youthAdvice: "A fresh start is coming! If a coding project felt too difficult yesterday, try starting a new script today with a clear mind; you will see the solution easily.",
    adultAdvice: "A trend reversal is confirmed. If you were waiting for a sign to flip from short to long (or vice versa), the data now supports the move. Trust your indicators.",
    elderAdvice: "You are the bridge between the generations. Share a story today that helps the family understand where they came from so they can see where they are going."
  },
  {
    name: "Otura Oyeku",
    nameYoruba: "Òtúrá Ìyèkú",
    youthAdvice: "Listen to the warnings of your parents and teachers today. If they suggest a change to your routine, take it to heart—it will save you from a 'bug' later.",
    adultAdvice: "The trend is shifting unexpectedly. Watch the VIX for a sudden spike that could signal a reversal in the market. Protect your capital immediately.",
    elderAdvice: "A sudden change in family plans may occur. Remain the steady rock for the lineage and offer your wisdom to calm any confusion within the household."
  },
  {
    name: "Otura Iwori",
    nameYoruba: "Òtúrá Ìwòrì",
    youthAdvice: "Your imagination is powerful today! Use it to create a fun new feature for your AI projects in Thonny. Dream big about what you can build.",
    adultAdvice: "Look deep into the market data. Don't be distracted by sudden 'noise' on social media; trust the volume and price action on your primary charts.",
    elderAdvice: "Your vision for the household is clear. Use this time to set a goal for the family that will bring everyone closer together and strengthen your shared values."
  },
  {
    name: "Otura Odi",
    nameYoruba: "Òtúrá Òdí",
    youthAdvice: "Build a strong fence around your study time today. Don't let games or videos distract you from your coding goals; focus is the secret to your progress.",
    adultAdvice: "The market is testing major support levels. If the price floor holds on QQQ, look for a setup; if it breaks, wait for a new base to form. Patience pays.",
    elderAdvice: "You are the protective barrier of the home. Use your wisdom to keep outside drama away from the family and ensure the household remains peaceful."
  },
  {
    name: "Otura Irosun",
    nameYoruba: "Òtúrá Ìrosùn",
    youthAdvice: "Honesty brings clarity to your work. If you find a bug you caused in your code, admit it and fix it—that is how you become a master developer.",
    adultAdvice: "Hidden signals are present in the volatility. Look past the sudden price swings to see where the big institutional money is actually moving today.",
    elderAdvice: "Quiet reflection will reveal the truth about a family matter. Spend some time in silence today; your inner voice knows the correct path for the lineage."
  }, },
  {
    name: "Ika Obara",
    nameYoruba: "Ìká Ọbàrà",
    youthAdvice: "Be careful not to over-promise. If you tell someone you can build a script, make sure you do the work first. Actions speak much louder than words!",
    adultAdvice: "Beware of 'false' breakouts today. The market may look like it's taking off, but if the internal data is weak, it's an empty move. Stay disciplined.",
    elderAdvice: "Your words carry authority in the household. Use your voice to settle any small arguments today and remind everyone of family unity."
  },
  {
    name: "Ika Okanran",
    nameYoruba: "Ìká Ọkànràn",
    youthAdvice: "Work in silence today. You don't need to show everyone your progress until it is finished; let your final result surprise and impress them.",
    adultAdvice: "The market is testing the traders' patience. If the price action is choppy and going nowhere, the best trade is often no trade at all. Wait for clarity.",
    elderAdvice: "Patience is a wall of protection for your spirit. Let the world rush and worry while you remain steady in your faith and traditions."
  },
  {
    name: "Ika Ogunda",
    nameYoruba: "Ìká Ògúndá",
    youthAdvice: "Face your challenges head-on. If a math problem or a coding bug is hard, don't run away. You have the strength to solve it today.",
    adultAdvice: "Clear the path. Remove any losing trades that are dragging down your portfolio. Today requires a fresh start and a clear strategy.",
    elderAdvice: "The family depends on your strength. Stand firm in your decisions today to ensure the household remains protected and orderly."
  },
  {
    name: "Ika Osa",
    nameYoruba: "Ìká Òsá",
    youthAdvice: "Stay calm even if school feels busy today. Take deep breaths and focus on one task at a time; your mind is sharper when it isn't rushing.",
    adultAdvice: "Major shifts are coming. Watch the macro-economic news for signs of a 'flight to safety.' Keep your capital liquid and be ready to move quickly.",
    elderAdvice: "Protect the home from outside influence. Focus on the internal peace of the family and keep your traditional values at the center."
  },
  {
    name: "Ika Meji",
    nameYoruba: "Ìká Méjì",
    youthAdvice: "Don't let your mind wander too far today. Stay focused on finishing your current script in Thonny before you start a new AI project.",
    adultAdvice: "Market manipulation alert. Stay away from social media 'pump' talk and trust your own data. Stick to high-volume indices like SPY.",
    elderAdvice: "Watch over the family's health and wellness today. Your guidance on nutrition and rest will prevent future problems for the grandchildren."
  },
  {
    name: "Ika Oturupon",
    nameYoruba: "Ìká Òtúrúpọ̀n",
    youthAdvice: "Stay grounded and humble. Even as you become a great coder, remember to thank your parents and teachers for their constant support.",
    adultAdvice: "The market is in a phase of consolidation. This is a time to build your watchlists rather than forcing new trades in a flat market.",
    elderAdvice: "Your presence is a blessing of stability. Sit with the family today and share the quiet strength that comes from a life well-lived."
  },
  {
    name: "Ika Otura",
    nameYoruba: "Ìká Òtúrá",
    youthAdvice: "Seek peace and clarity. If you are stuck on a coding problem, take a short break to clear your mind; the answer will come when you are calm.",
    adultAdvice: "A day for successful negotiations. If you are planning a large trade or business deal, the energy today supports fair outcomes.",
    elderAdvice: "Bring the family together for a moment of prayer or reflection. Your spiritual leadership provides the peace the home needs today."
  },
  {
    name: "Ika Irete",
    nameYoruba: "Ìká Ìretè",
    youthAdvice: "Deep research is your superpower today. Spend extra time reading the Python documentation for the tools you use; you'll find a hidden feature!",
    adultAdvice: "Verify every signal today. Look beyond the surface charts—check the fundamental health of the companies in your portfolio before acting.",
    elderAdvice: "The family foundation is built on small, daily actions. Continue to plant the seeds of wisdom today that will shade the generations to come."
  },
  {
    name: "Ika Oshe",
    nameYoruba: "Ìká Òsé",
    youthAdvice: "Success comes through good character. Being a helpful son and a diligent student is just as important as writing good code. Stay kind today.",
    adultAdvice: "Small wins add up to massive success! Take your 'sweet' profits today rather than hoping for a home run. Consistent gains build true wealth.",
    elderAdvice: "You are the salt of the earth. Your gentle words and cooling presence will preserve the harmony of the home and bring joy to everyone."
  },
  {
    name: "Ika Ofun",
    nameYoruba: "Ìká Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI and Python with your friends; when you teach others, your own understanding becomes stronger.",
    adultAdvice: "The market is revealing its secrets to the patient observer. Trust your intuition if you see a quiet signal in the data that others are missing.",
    elderAdvice: "You are a vessel of ancient light. Your presence alone brings a blessing of peace. Continue to lead with the purity that has served you well."
  },
  {
    name: "Oturupon Ogbe",
    nameYoruba: "Òtúrúpọ̀n Ogbè",
    youthAdvice: "A fresh start! If a project felt too difficult yesterday, try starting a new script today with a clear mind. You will see the solution easily now.",
    adultAdvice: "A trend reversal is likely. If you have been waiting for a sign to flip from short to long (or vice versa), the data now supports the move.",
    elderAdvice: "You are the bridge between the generations. Share a story today that helps the family understand where they came from so they can lead the future."
  },},
  {
    name: "Osa Oyeku",
    nameYoruba: "Òsá Ìyèkú",
    youthAdvice: "Listen to the warnings. If a teacher or parent tells you to change your plan, listen—they see a 'bug' in your day before it even happens.",
    adultAdvice: "The trend is shifting unexpectedly. Watch the VIX for a sudden spike that could signal a reversal in the current bullish market. Protect your capital.",
    elderAdvice: "A sudden change in family plans may occur. Remain the steady rock for the lineage and offer your wisdom to calm any confusion."
  },
  {
    name: "Osa Iwori",
    nameYoruba: "Òsá Ìwòrì",
    youthAdvice: "Your imagination is powerful today! Use it to solve a difficult math problem or create a fun new feature for your AI project in Thonny.",
    adultAdvice: "Look deep into the market data. Don't be distracted by sudden 'noise' on social media; trust the volume and price action on your primary charts.",
    elderAdvice: "Your vision for the household is clear. Use this time to set a goal for the family that will bring everyone closer together today."
  },
  {
    name: "Osa Odi",
    nameYoruba: "Òsá Òdí",
    youthAdvice: "Protect your time. Don't let games or distractions 'poke' holes in your study schedule today; stay focused on your coding and school goals.",
    adultAdvice: "The market is testing its support 'walls.' If price breaks through a key level, wait for a new base to form before entering a new trade.",
    elderAdvice: "You are the protective barrier of the home. Use your wisdom to settle any outside drama and keep the family focus inward and peaceful."
  },
  {
    name: "Osa Irosun",
    nameYoruba: "Òsá Ìrosùn",
    youthAdvice: "Be honest about what you've learned. If you don't understand a coding concept, ask for help—the truth is the fastest way to become a master.",
    adultAdvice: "Hidden signals are present in the volatility. Look past the sudden price swings to see where the big institutional money is actually moving today.",
    elderAdvice: "Quiet reflection will reveal the truth of a family matter. Spend some time in silence today; your inner voice knows the correct path."
  },
  {
    name: "Osa Owanrin",
    nameYoruba: "Òsá Owánrín",
    youthAdvice: "Unexpected bugs are just puzzles to solve. If your code does something strange today, stay calm and look for the hidden lesson; you can fix it.",
    adultAdvice: "Sudden volatility is likely. The market may 'swing' unexpectedly today. Keep your stops tight and don't let a surprise move turn into a loss.",
    elderAdvice: "A sudden message or visitor may bring news to the home. Stay steady and offer your balanced perspective to keep the family calm."
  },
  {
    name: "Osa Obara",
    nameYoruba: "Òsá Ọbàrà",
    youthAdvice: "Watch your words today. When sharing your AI progress, speak with humility. A quiet success is often much more powerful than a loud one.",
    adultAdvice: "Beware of 'empty' breakouts. If a stock surges without real earnings or volume, it is likely a trap for retail traders. Stay disciplined.",
    elderAdvice: "Your authority is the pillar of the household. Use your voice today to remind everyone of their responsibilities and the family's values."
  },
  {
    name: "Osa Okanran",
    nameYoruba: "Òsá Ọkànràn",
    youthAdvice: "Work in silence today. You don't need to show everyone your progress until it is finished; let your final result surprise and impress them.",
    adultAdvice: "The market is testing the traders' patience. If the price action is choppy and going nowhere, the best trade is often no trade at all.",
    elderAdvice: "Patience is a wall of protection for your spirit. Let the world rush and worry while you remain steady in your faith and traditions."
  },
  {
    name: "Osa Ogunda",
    nameYoruba: "Òsá Ògúndá",
    youthAdvice: "Face your challenges head-on. If a math problem or a coding bug is hard, don't run away. You have the strength to solve it today.",
    adultAdvice: "Clear the path. Remove any losing trades that are dragging down your portfolio. Today requires a fresh start and a clear strategy.",
    elderAdvice: "The family depends on your strength. Stand firm in your decisions today to ensure the household remains protected and orderly."
  },
  {
    name: "Osa Meji",
    nameYoruba: "Òsá Méjì",
    youthAdvice: "You are moving with the speed of the wind today! Use this energy to finish your school projects early so you can focus on your AI.",
    adultAdvice: "Rapid movements are expected in the indices. Ensure your execution is fast and your internet is stable. Trade only the clearest trends today.",
    elderAdvice: "A sudden change of fortune or a quick move for the family is possible. Lead the way with courage and your steady spiritual wisdom."
  },
  {
    name: "Osa Ika",
    nameYoruba: "Òsá Ìká",
    youthAdvice: "Avoid negative talk today. Surround yourself with friends who encourage your coding goals and who celebrate your school success.",
    adultAdvice: "Be careful of who you follow. In the trading world, many speak but few know. Trust your own data over social media hype today.",
    elderAdvice: "Watch over the family's health and wellness today. Your guidance on nutrition and rest will prevent future problems for the grandchildren."
  },
  {
    name: "Osa Oturupon",
    nameYoruba: "Òsá Òtúrúpọ̀n",
    youthAdvice: "Stay grounded and humble. Even as you become a great coder, remember to thank your parents and teachers for their constant support.",
    adultAdvice: "The market is in a phase of consolidation. This is a time to build your watchlists rather than forcing new trades in a flat market.",
    elderAdvice: "Your presence is a blessing of stability. Sit with the family today and share the quiet strength that comes from a life well-lived."
  },
  {
    name: "Osa Otura",
    nameYoruba: "Òsá Òtúrá",
    youthAdvice: "Seek peace and clarity. If you are stuck on a coding problem, take a short break to clear your mind; the answer will come when you are calm.",
    adultAdvice: "A day for successful negotiations. If you are planning a large trade or business deal, the energy today supports fair outcomes.",
    elderAdvice: "Bring the family together for a moment of prayer or reflection. Your spiritual leadership provides the peace the home needs today."
  },},
  {
    name: "Iwori Oshe",
    nameYoruba: "Ìwòrì Òsé",
    youthAdvice: "Your character is more important than your coding skills. Stay kind to everyone today, and you will find that people are more willing to help you.",
    adultAdvice: "Small wins add up! Take your 'sweet' profits today rather than hoping for a home run. Consistent gains are what build true wealth over time.",
    elderAdvice: "You are the salt of the earth. Your gentle advice today will preserve the harmony of the home and bring a smile to everyone's face."
  },},
  {
    name: "Ogbe Ose",
    nameYoruba: "Ogbè Òsé",
    youthAdvice: "Character is your greatest asset. Being a good student and a helpful son is just as important as being a good coder.",
    adultAdvice: "Take the 'sweet' profits when they appear. Don't let a winning day turn into a losing one by waiting for the market to give you more than it promised.",
    elderAdvice: "You are the salt of the earth. Your gentle words today will preserve the harmony of the home and bring joy to everyone.",
  },
  {
    name: "Ogbe Ofun",
    nameYoruba: "Ogbè Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI with others; when you teach, your own understanding becomes ten times stronger.",
    adultAdvice: "The market is revealing its secrets to those who are quiet enough to listen. Trust your intuition and the subtle signals in your data.",
    elderAdvice: "Your presence is a sacred blessing. Continue to lead with the silence and purity that has brought you this far in life."
  },
  {
    name: "Ogbe Meji",
    nameYoruba: "Ogbè Méjì",
    youthAdvice: "You have double the energy today! Use it to finish your schoolwork early so you have extra time for your coding projects.",
    adultAdvice: "Maximum clarity is present. If QQQ and SPY are both showing strength, follow the trend with confidence, but remain disciplined.",
    elderAdvice: "A double blessing is coming to the household. Receive it with a grateful heart and use it to provide for the family's future."
  },
      {
    name: "Ogbe Okanran",
    nameYoruba: "Ogbè Ọkànràn",
    youthAdvice: "Silence is powerful. You don't need to show everyone your code until it is ready; work quietly and let your success make the noise.",
    adultAdvice: "The market is testing your resolve. If the price action is choppy, it is better to sit on your hands and wait for a better day to trade.",
    elderAdvice: "Teach the youth the value of patience. Your stories of perseverance are the best lessons they can receive t
  {
    name: "Ogbe Ogunda",
    nameYoruba: "Ogbè Ògúndá",
    youthAdvice: "Face your challenges head-on. If a math problem or a coding bug is hard, don't run away. You have the strength to solve it today.",
    adultAdvice: "Clear the path. Remove any losing trades that are dragging down your portfolio. Today requires a fresh start and a clear strategy.",
    elderAdvice: "The family depends on your strength. Stand firm in your decisions today to ensure the household remains protected and orderly."
  },
  {
    name: "Ogbe Osa",
    nameYoruba: "Ogbè Òsá",
    youthAdvice: "Stay calm even if things feel fast today. If school feels busy, take deep breaths and focus on one task at a time.",
    adultAdvice: "Major shifts are coming. Watch the macro-economic news for signs of a 'flight to safety.' Keep your capital liquid and ready.",
    elderAdvice: "Protect the home from outside influence. Focus on the internal peace of the family and keep traditional values at the center."
  },
  {
    name: "Ogbe Ika",
    nameYoruba: "Ogbè Ìká",
    youthAdvice: "Avoid gossip and negative talk. Surround yourself with friends who encourage your coding and school goals.",
    adultAdvice: "Be careful of who you follow. In the trading world, many speak but few know. Trust your own data and indicators over social media hype.",
    elderAdvice: "Watch over the family's health and wellness today. Your guidance on nutrition and rest will prevent future problems."
  },
  {
    name: "Ogbe Oturupon",
    nameYoruba: "Ogbè Òtúrúpọ̀n",
    youthAdvice: "Stay grounded and humble. Even as you become a great coder, remember to thank your parents and teachers for their support.",
    adultAdvice: "The market is in a phase of consolidation. This is a time to build your watchlists rather than forcing new trades in a flat market.",
    elderAdvice: "Your presence is a blessing of stability. Sit with the family today and share the quiet strength that comes from a life well-lived."
  },
  {
    name: "Ogbe Otura",
    nameYoruba: "Ogbè Òtúrá",
    youthAdvice: "Seek peace and clarity. If you are stuck on a coding problem, take a short break to clear your mind; the answer will come when you are calm.",
    adultAdvice: "A day for successful negotiations. If you are planning a large trade or business deal, the energy today supports fair and profitable outcomes.",
    elderAdvice: "Bring the family together for a moment of prayer or reflection. Your spiritual leadership provides the peace the home needs today."
  },
  {
    name: "Ogbe Irete",
    nameYoruba: "Ogbè Ìretè",
    youthAdvice: "Focus on your foundation. Make sure you understand the 'why' behind your code, not just the 'how.' Strong basics make great developers.",
    adultAdvice: "Deep research is rewarded. Go beyond the surface charts—check the fundamental health of the companies you are trading today.",
    elderAdvice: "The family legacy is built on small, daily actions. Continue to plant the seeds of wisdom that will shade the generations to come."
  },
  {
    name: "Ogbe Ose",
    nameYoruba: "Ogbè Òsé",
    youthAdvice: "Character is your greatest asset. Being a good student and a helpful son is just as important as being a good coder.",
    adultAdvice: "Take the 'sweet' profits when they appear. Don't let a winning day turn into a losing one by waiting for the market to give you more than it promised.",
    elderAdvice: "You are the salt of the earth. Your gentle words today will preserve the harmony of the home and bring joy to everyone.",
 {
    name: "Irete Osa",
    nameYoruba: "Ìretè Òsá",
    youthAdvice: "Stay calm even if things feel fast at school today. Take deep breaths and focus on one task at a time; your mind is sharper when it isn't rushing its work.",
    adultAdvice: "Major shifts are coming. Watch the macro-economic news for signs of a 'flight to safety.' Keep your capital liquid and be ready to move quickly.",
    elderAdvice: "Protect the home from outside influence. Focus on the internal harmony of the family and keep your traditional values at the center of the household."
  },
  {
    name: "Irete Ika",
    nameYoruba: "Ìretè Ìká",
    youthAdvice: "Guard your original code and ideas today. Don't let negative talk from others discourage your AI goals; keep your progress private until it is ready.",
    adultAdvice: "Market traps are common. Stay away from low-volume stocks and stick to the high-volume indices like QQQ. Trust your own data over social media talk.",
    elderAdvice: "Watch over the household's health today. Your guidance on proper rest and nutrition is the protection the family needs for the upcoming season."
  },
  {
    name: "Irete Oturupon",
    nameYoruba: "Ìretè Òtúrúpọ̀n",
    youthAdvice: "Focus on your foundations today. Make sure you understand how basic loops work in Python perfectly before you try to build a more complex AI project.",
    adultAdvice: "The market is in a quiet consolidation phase. Spend your time today refining your watchlists rather than forcing trades in a flat market environment.",
    elderAdvice: "Your stability is a blessing to the home. Share the quiet strength that comes from a life of experience with the family today to help them stay steady."
  },
  {
    name: "Irete Otura",
    nameYoruba: "Ìretè Òtúrá",
    youthAdvice: "Seek peace to solve your coding bugs! If you feel frustrated, take a five-minute break to breathe; the solution will come when you are calm.",
    adultAdvice: "A great day for successful negotiations or closing out a long-term position. The energy today supports fair outcomes and profitable exits for traders.",
    elderAdvice: "Bring the family together for a moment of reflection. Your spiritual leadership provides the peace and clarity the household needs right now."
  },
  {
    name: "Irete Meji",
    nameYoruba: "Ìretè Méjì",
    youthAdvice: "Deep roots lead to big success. Take the time to master your Python basics today; the more you understand the roots, the better your AI will grow.",
    adultAdvice: "Major support levels are present. This is a time to look at the 'foundation' of your portfolio. Trust the long-term trend of SPY if the data remains solid.",
    elderAdvice: "A time of deep ancestral connection. Share the history of your family roots with Isaiah today; knowing where he comes from will give him strength."
  },
  {
    name: "Irete Oshe",
    nameYoruba: "Ìretè Òsé",
    youthAdvice: "Success comes through good character. Being a helpful son and a diligent student is just as important as writing good code. Stay kind and respectful.",
    adultAdvice: "Small wins add up to massive success! Take your 'sweet' profits today rather than hoping for a home run. Consistent gains build true wealth over time.",
    elderAdvice: "You are the salt of the earth. Your gentle words today will preserve the harmony of the home and bring joy to everyone in the family."
  },
  {
    name: "Irete Ofun",
    nameYoruba: "Ìretè Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI and Python with your friends; when you teach others, your own understanding becomes ten times stronger.",
    adultAdvice: "The market is revealing its secrets to the patient observer. Trust your intuition if you see a quiet signal in the data that others are missing today.",
    elderAdvice: "You are a vessel of ancient light. Your presence alone brings a blessing. Continue to lead with the purity and silence that has served you well."
  },
  {
    name: "Oshe Ogbe",
    nameYoruba: "Òsé Ogbè",
    youthAdvice: "A fresh start is coming! If a coding project felt too difficult yesterday, try starting a new script today with a clear mind; you will see the solution easily.",
    adultAdvice: "A trend reversal is confirmed. If you were waiting for a sign to flip from short to long (or vice versa), the data now supports the move. Trust your indicators.",
    elderAdvice: "You are the bridge between the generations. Share a story today that helps the family understand where they came from so they can see where they are going."
  },
  {
    name: "Oshe Oyeku",
    nameYoruba: "Òsé Ìyèkú",
    youthAdvice: "Listen to the warnings of your parents and teachers today. If they suggest a change to your routine, take it to heart—it will save you from a 'bug' later.",
    adultAdvice: "The trend is shifting unexpectedly. Watch the VIX for a sudden spike that could signal a reversal in the market. Protect your capital immediately.",
    elderAdvice: "A sudden change in family plans may occur. Remain the steady rock for the lineage and offer your wisdom to calm any confusion within the household."
  },
  {
    name: "Oshe Iwori",
    nameYoruba: "Òsé Ìwòrì",
    youthAdvice: "Your imagination is powerful today! Use it to create a fun new feature for your AI projects in Thonny. Dream big about what you can build.",
    adultAdvice: "Look deep into the market data. Don't be distracted by sudden 'noise' on social media; trust the volume and price action on your primary charts.",
    elderAdvice: "Your vision for the household is clear. Use this time to set a goal for the family that will bring everyone closer together and strengthen your shared values."
  },
  {
    name: "Oshe Odi",
    nameYoruba: "Òsé Òdí",
    youthAdvice: "Build a strong fence around your study time today. Don't let games or videos distract you from your coding goals; focus is the secret to your progress.",
    adultAdvice: "The market is testing major support levels. If the price floor holds on QQQ, look for a setup; if it breaks, wait for a new base to form. Patience pays.",
    elderAdvice: "You are the protective barrier of the home. Use your wisdom to keep outside drama away from the family and ensure the household remains peaceful."
  },
  {
    name: "Oshe Irosun",
    nameYoruba: "Òsé Ìrosùn",
    youthAdvice: "Honesty brings clarity to your work. If you find a bug you caused in your code, admit it and fix it—that is how you become a master developer.",
    adultAdvice: "Hidden signals are present in the volatility. Look past the sudden price swings to see where the big institutional money is actually moving today.",
    elderAdvice: "Quiet reflection will reveal the truth about a family matter. Spend some time in silence today; your inner voice knows the correct path for the lineage."
  },
  {
    name: "Oshe Owanrin",
    nameYoruba: "Òsé Owánrín",
    youthAdvice: "Unexpected bugs are just puzzles to solve. If your code does something strange today, stay calm and look for the hidden lesson; you have the skill to fix it.",
    adultAdvice: "Sudden volatility is likely. The market may 'swing' unexpectedly today. Keep your stops tight and don't let a surprise move turn into a big loss for your portfolio.",
    elderAdvice: "A sudden message or visitor may bring news to the home. Stay steady and offer your balanced perspective to keep the family calm and focused on the future."
  },
  {
    name: "Oshe Obara",
    nameYoruba: "Òsé Ọbàrà",
    youthAdvice: "Watch your words today. When sharing your AI progress with others, speak with humility. A quiet success is often much more powerful than a loud one.",
    adultAdvice: "Beware of 'fake' moves in the market. The indices may look like they are soaring, but ensure the underlying volume confirms it is a real trend before entering.",
    elderAdvice: "Your authority is the pillar of the household. Use your voice today to remind everyone of their responsibilities and the core values of the family."
  },
  {
    name: "Oshe Okanran",
    nameYoruba: "Òsé Ọkànràn",
    youthAdvice: "Work quietly on your code today. You don't need to show everyone your progress until it is finished; let the final result be your proudest moment.",
    adultAdvice: "Wait for clarity. If the market feels 'choppy' or the signals are mixed, sit on your hands. The best trade today is often waiting for a clear path forward.",
    elderAdvice: "Patience is a sacred gift. Let the world rush by while you remain steady in your spirit. The answers you seek will come in the quiet hours of the day."
  },
  {
    name: "Oshe Ogunda",
    nameYoruba: "Òsé Ògúndá",
    youthAdvice: "Face your challenges head-on. If a math problem or a coding bug is hard, don't run away. You have the strength and the tools to solve it today.",
    adultAdvice: "Decisive action is required. If a trade is clearly failing, cut it immediately. If a setup is perfect, enter with confidence. No hesitating today.",
    elderAdvice: "Clear the path for the family. Your firm decisions today will remove a long-standing obstacle and bring lasting peace to the lineage."
  },
  {
    name: "Oshe Osa",
    nameYoruba: "Òsé Òsá",
    youthAdvice: "Stay calm even if school feels busy today. Take deep breaths and focus on one task at a time; your mind is sharper when it isn't rushing its work.",
    adultAdvice: "Major shifts are coming. Watch the macro-economic news for signs of a 'flight to safety.' Keep your capital liquid and be ready to move quickly.",
    elderAdvice: "Protect the home from outside influence. Focus on the internal harmony of the family and keep your traditional values at the center of the household."
  },
  {
    name: "Oshe Ika",
    nameYoruba: "Òsé Ìká",
    youthAdvice: "Guard your original code and ideas today. Don't let negative talk from others discourage your AI goals; keep your progress private until it is ready.",
    adultAdvice: "Market traps are common. Stay away from low-volume stocks and stick to the high-volume indices like QQQ. Trust your own data over social media talk.",
    elderAdvice: "Watch over the household's health today. Your guidance on proper rest and nutrition is the protection the family needs for the upcoming season."
  },
  {
    name: "Oshe Oturupon",
    nameYoruba: "Òsé Òtúrúpọ̀n",
    youthAdvice: "Respect the basics. Ensure your basic Python syntax is perfect before you try to import complex AI libraries; strong roots make for a great developer.",
    adultAdvice: "The market is in a phase of quiet consolidation. Spend your time today refining your watchlists and indicators rather than forcing trades in a flat market.",
    elderAdvice: "Your stability is a blessing to the home. Share a story of perseverance with the family today to help them stay grounded and patient during changes."
  },
  {
    name: "Oshe Otura",
    nameYoruba: "Òsé Òtúrá",
    youthAdvice: "Seek peace to solve your coding bugs! If you feel frustrated, take a five-minute break to breathe; the solution will come when you are calm.",
    adultAdvice: "A great day for successful negotiations or closing out a long-term position. The energy today supports fair outcomes and profitable exits for traders.",
    elderAdvice: "Bring the family together for a moment of reflection. Your spiritual leadership provides the peace and clarity the household needs right now."
  },
  {
    name: "Oshe Irete",
    nameYoruba: "Òsé Ìretè",
    youthAdvice: "Deep research is rewarded. Spend extra time reading the documentation for your favorite Python tools; you will find a new way to make your AI better.",
    adultAdvice: "Verify every signal today. Look beyond the surface charts—check the fundamental health of the companies you are trading before making your next move.",
    elderAdvice: "The family foundation is built on small, daily actions. Continue to plant the seeds of wisdom today that will shade the generations to come after you."
  },
  {
    name: "Oshe Meji",
    nameYoruba: "Òsé Méjì",
    youthAdvice: "A day of sweetness and success! If you complete your coding projects today, you will feel a great sense of pride. Celebrate your wins with a smile.",
    adultAdvice: "Victory is assured for the disciplined. If you see a trade reaching your profit target, take it. Don't let greed spoil a perfectly good day in the markets.",
    elderAdvice: "You are the joy of the lineage. Your presence today brings sweetness and light to the household. Share your happiness with everyone around you."
  },
  {
    name: "Oshe Ofun",
    nameYoruba: "Òsé Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI and Python with your friends; when you teach others, your own understanding becomes ten times stronger.",
    adultAdvice: "The market is revealing its secrets to the patient observer. Trust your intuition if you see a quiet signal in the data that the general public is missing today.",
    elderAdvice: "You are a vessel of ancient light. Your presence alone brings a blessing of peace. Continue to lead with the purity and silence that has served you well."
  },
  {
    name: "Ofun Ogbe",
    nameYoruba: "Òfún Ogbè",
    youthAdvice: "A fresh start is coming! If a coding project felt too difficult yesterday, try starting a new script today with a clear mind; the solution will be easy now.",
    adultAdvice: "A trend reversal is confirmed. If you were waiting for a sign to flip from short to long (or vice versa), the data now supports the move. Trust your indicators.",
    elderAdvice: "You are the bridge between the generations. Share a story today that helps the family understand where they came from so they can lead the future."
  },
  {
    name: "Ofun Oyeku",
    nameYoruba: "Òfún Ìyèkú",
    youthAdvice: "Listen to the warnings of your parents and teachers today. If they suggest a change to your routine, take it to heart—it will save you from a 'bug' later.",
    adultAdvice: "The trend is shifting unexpectedly. Watch the VIX for a sudden spike that could signal a reversal in the market. Protect your capital immediately.",
    elderAdvice: "A sudden change in family plans may occur. Remain the steady rock for the lineage and offer your wisdom to calm any confusion within the household."
  },
  {
    name: "Ofun Meji",
    nameYoruba: "Òfún Méjì",
    youthAdvice: "The final lesson is complete! You have learned that character, patience, and hard work are the keys to everything. Use your AI skills to bless the world.",
    adultAdvice: "The cycle is complete and the wisdom is clear. Stick to your proven system, manage your risk, and trust the long-term path you have built in the markets.",
    elderAdvice: "You are the light of the lineage. Your journey through these Odus has brought immense wisdom to your family. Continue to lead with purity, peace, and love."
  }, },
  {
    name: "Ogbe Ofun",
    nameYoruba: "Ogbè Òfún",
    youthAdvice: "Be a vessel of light. Share what you learn about AI with others; when you teach, your own understanding becomes ten times stronger.",
    adultAdvice: "The market is revealing its secrets to those who are quiet enough to listen. Trust your intuition and the subtle signals in your data.",
    elderAdvice: "Your presence is a sacred blessing. Continue to lead with the silence and purity that has brought you this far in life."
  },
  {
    name: "Ogbe Meji",
    nameYoruba: "Ogbè Méjì",
    youthAdvice: "You have double the energy today! Use it to finish your schoolwork early so you have extra time for your coding projects.",
    adultAdvice: "Maximum clarity is present. If QQQ and SPY are both showing strength, follow the trend with confidence, but remain disciplined.",
    elderAdvice: "A double blessing is coming to the household. Receive it with a grateful heart and use it to provide for the family's future."
  },
  },
  {
    name: "Ogbe Obara",
    nameYoruba: "Ogbè Ọbàrà",
    youthAdvice: "Be careful with your words today. When talking about your coding projects, speak with humility and listen to feedback from others.",
    adultAdvice: "Beware of 'empty' promises in the market. If a stock looks too good to be true without solid earnings, it is likely a trap. Stay disciplined.",
    elderAdvice: "Your authority is respected. Use your voice to settle disputes within the family and bring everyone back to their core values."
  },
  {
    name: "Ogbe Okanran",
    nameYoruba: "Ogbè Ọkànràn",
    youthAdvice: "Silence is powerful. You don't need to show everyone your code until it is ready; work quietly and let your success make the noise.",
    adultAdvice: "The market is testing your patience. If your trade is hitting resistance, wait for a clear signal before adding more size. Don't fight the trend.",
    elderAdvice: "A time of quiet reflection. Look back at the lessons of your ancestors to find the solution to a current family challenge."
  },
  {
    name: "Ogbe Ogunda",
    nameYoruba: "Ogbè Ògúndá",
    youthAdvice: "Be a problem solver. If you find a 'bug' in your life or your code, don't complain—build a tool or a plan to fix it permanently.",
    adultAdvice: "Decisive action is required. Today is not for 'maybe.' Either execute your trading plan with confidence or stay in cash and wait.",
    elderAdvice: "You are the protector of the lineage. Make the hard decisions today that ensure the safety and prosperity of the entire home."
  },
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
