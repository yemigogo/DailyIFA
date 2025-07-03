import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Zap, Star, Crown } from "lucide-react";

interface MascotPersonality {
  id: string;
  name: string;
  nameYoruba: string;
  emoji: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  traits: string[];
  greetings: string[];
  encouragements: string[];
  celebrations: string[];
  specialties: string[];
  icon: typeof Star;
}

const mascotPersonalities: MascotPersonality[] = [
  {
    id: "ifa-sage",
    name: "Àgbà Ifá",
    nameYoruba: "Àgbà Ifá",
    emoji: "🧙🏿‍♂️",
    colors: {
      primary: "#8B4513",
      secondary: "#DAA520", 
      accent: "#F4A460"
    },
    traits: ["Wise", "Patient", "Traditional", "Spiritual"],
    greetings: [
      "Àbọ̀rú Àbọ̀yè! Ready to learn ancient wisdom?",
      "Welcome, young seeker of knowledge!",
      "The spirits of wisdom guide your learning today!"
    ],
    encouragements: [
      "Wisdom comes to those who persist!",
      "Each lesson brings you closer to understanding",
      "The ancestors smile upon your dedication"
    ],
    celebrations: [
      "Àṣẹ! You have achieved great wisdom!",
      "The spirits celebrate your progress!",
      "Your ancestors are proud of your growth!"
    ],
    specialties: ["Ifá History", "Sacred Verses", "Spiritual Wisdom"],
    icon: Crown
  },
  {
    id: "orisha-guide",
    name: "Àwòn Òrìṣà",
    nameYoruba: "Àwòn Òrìṣà",
    emoji: "⚡",
    colors: {
      primary: "#4169E1",
      secondary: "#FFD700",
      accent: "#FF6347"
    },
    traits: ["Powerful", "Protective", "Energetic", "Divine"],
    greetings: [
      "The Orishas bless your learning journey!",
      "Divine energy flows through your studies!",
      "Channel the power of the ancestors!"
    ],
    encouragements: [
      "Feel the divine energy within you!",
      "The Orishas guide your every step!",
      "Your spiritual power grows stronger!"
    ],
    celebrations: [
      "The divine realm celebrates with you!",
      "You have earned the Orishas' favor!",
      "Your spiritual energy shines bright!"
    ],
    specialties: ["Orisha Paths", "Divine Energy", "Spiritual Power"],
    icon: Zap
  },
  {
    id: "yoruba-teacher",
    name: "Olùkọ́ Yorùbá",
    nameYoruba: "Olùkọ́ Yorùbá",
    emoji: "👩🏿‍🏫",
    colors: {
      primary: "#228B22",
      secondary: "#32CD32",
      accent: "#98FB98"
    },
    traits: ["Encouraging", "Knowledgeable", "Friendly", "Cultural"],
    greetings: [
      "Ẹ ku àárọ̀! Let's learn together today!",
      "Welcome to your Yoruba cultural journey!",
      "Every word you learn connects you to heritage!"
    ],
    encouragements: [
      "Your pronunciation is improving beautifully!",
      "Each word connects you to your roots!",
      "Language is the bridge to culture!"
    ],
    celebrations: [
      "Òṣé! Your language skills are flourishing!",
      "You're becoming a true cultural ambassador!",
      "Your Yoruba heritage shines through!"
    ],
    specialties: ["Language Learning", "Cultural Heritage", "Pronunciation"],
    icon: Heart
  },
  {
    id: "spiritual-companion",
    name: "Ẹlẹ́mìí Ọ̀rẹ́",
    nameYoruba: "Ẹlẹ́mìí Ọ̀rẹ́",
    emoji: "✨",
    colors: {
      primary: "#9370DB",
      secondary: "#DDA0DD",
      accent: "#E6E6FA"
    },
    traits: ["Mystical", "Intuitive", "Calming", "Insightful"],
    greetings: [
      "The spiritual realm welcomes you!",
      "Your inner light shines brightly today!",
      "Connect with the mystical energies within!"
    ],
    encouragements: [
      "Trust your spiritual intuition!",
      "The universe supports your growth!",
      "Your spiritual awareness expands!"
    ],
    celebrations: [
      "Your spiritual journey reaches new heights!",
      "The cosmic energies celebrate with you!",
      "Your inner wisdom has awakened!"
    ],
    specialties: ["Meditation", "Spiritual Growth", "Inner Wisdom"],
    icon: Sparkles
  }
];

interface LearningMascotProps {
  userProgress?: number;
  currentTopic?: string;
  recentAchievement?: string;
  onPersonalityChange?: (personality: MascotPersonality) => void;
}

export default function LearningMascot({ 
  userProgress = 0, 
  currentTopic = "Ifá Wisdom",
  recentAchievement,
  onPersonalityChange 
}: LearningMascotProps) {
  const [currentPersonality, setCurrentPersonality] = useState<MascotPersonality>(mascotPersonalities[0]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPersonalitySelector, setShowPersonalitySelector] = useState(false);

  // Determine best personality based on current topic
  useEffect(() => {
    const getPersonalityForTopic = (topic: string): MascotPersonality => {
      if (topic.toLowerCase().includes("orisha")) return mascotPersonalities[1];
      if (topic.toLowerCase().includes("yoruba") || topic.toLowerCase().includes("language")) return mascotPersonalities[2];
      if (topic.toLowerCase().includes("meditation") || topic.toLowerCase().includes("spiritual")) return mascotPersonalities[3];
      return mascotPersonalities[0]; // Default to Ifá Sage
    };

    const newPersonality = getPersonalityForTopic(currentTopic);
    if (newPersonality.id !== currentPersonality.id) {
      setCurrentPersonality(newPersonality);
      onPersonalityChange?.(newPersonality);
    }
  }, [currentTopic, currentPersonality.id, onPersonalityChange]);

  // Update message based on context
  useEffect(() => {
    let message: string;
    
    if (recentAchievement) {
      message = currentPersonality.celebrations[Math.floor(Math.random() * currentPersonality.celebrations.length)];
    } else if (userProgress > 80) {
      message = currentPersonality.encouragements[Math.floor(Math.random() * currentPersonality.encouragements.length)];
    } else {
      message = currentPersonality.greetings[Math.floor(Math.random() * currentPersonality.greetings.length)];
    }
    
    setCurrentMessage(message);
  }, [currentPersonality, userProgress, recentAchievement]);

  const handlePersonalityClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
    setShowPersonalitySelector(!showPersonalitySelector);
  };

  const selectPersonality = (personality: MascotPersonality) => {
    setCurrentPersonality(personality);
    setShowPersonalitySelector(false);
    onPersonalityChange?.(personality);
  };

  const IconComponent = currentPersonality.icon;

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Personality Selector */}
      <AnimatePresence>
        {showPersonalitySelector && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-full right-0 mb-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 max-w-xs"
          >
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Choose Your Learning Guide
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {mascotPersonalities.map((personality) => (
                <button
                  key={personality.id}
                  onClick={() => selectPersonality(personality)}
                  className="flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105"
                  style={{
                    borderColor: personality.id === currentPersonality.id ? personality.colors.primary : 'transparent',
                    backgroundColor: personality.id === currentPersonality.id ? `${personality.colors.primary}15` : 'transparent'
                  }}
                >
                  <div className="text-2xl mb-1">{personality.emoji}</div>
                  <div className="text-xs font-medium text-center" style={{ color: personality.colors.primary }}>
                    {personality.name}
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    {personality.specialties[0]}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Bubble */}
      <AnimatePresence>
        {currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full right-0 mb-4 max-w-xs"
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border-2 relative"
              style={{ borderColor: currentPersonality.colors.primary }}
            >
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {currentMessage}
              </p>
              <div 
                className="absolute bottom-0 right-4 w-4 h-4 transform translate-y-2 rotate-45"
                style={{ backgroundColor: currentPersonality.colors.primary }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Avatar */}
      <motion.div
        animate={{
          scale: isAnimating ? [1, 1.2, 1] : 1,
          rotate: isAnimating ? [0, 10, -10, 0] : 0,
        }}
        transition={{ duration: 0.6 }}
        onClick={handlePersonalityClick}
        className="relative cursor-pointer"
      >
        {/* Main Avatar */}
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 relative overflow-hidden"
          style={{ 
            backgroundColor: currentPersonality.colors.primary,
            borderColor: currentPersonality.colors.secondary 
          }}
        >
          <span className="text-2xl">{currentPersonality.emoji}</span>
          
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke={currentPersonality.colors.accent}
              strokeWidth="2"
              strokeOpacity="0.3"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke={currentPersonality.colors.accent}
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - userProgress / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
        </div>

        {/* Floating Icon */}
        <motion.div
          animate={{
            y: [0, -4, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: currentPersonality.colors.secondary }}
        >
          <IconComponent size={12} color="white" />
        </motion.div>

        {/* Achievement Notification */}
        <AnimatePresence>
          {recentAchievement && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center"
            >
              <Star size={16} className="text-yellow-800" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Progress Indicator */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="text-xs font-bold px-2 py-1 rounded-full text-white text-center min-w-[2rem]"
             style={{ backgroundColor: currentPersonality.colors.primary }}>
          {userProgress}%
        </div>
      </div>
    </div>
  );
}

export { mascotPersonalities };
export type { MascotPersonality };