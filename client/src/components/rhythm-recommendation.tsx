import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Heart, Shield, Coins, TreePine, Waves, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface RhythmRecommendation {
  primaryPattern: string;
  tempo: number;
  duration: number;
  ambientSoundscape: string;
  spiritualFocus: string;
  guidance: string;
  guidanceYoruba: string;
  chantSuggestion?: string;
  ritualTiming: string;
  energyAlignment: string;
}

const spiritualIntents = [
  { 
    id: "healing", 
    name: "Healing & Restoration", 
    nameYoruba: "Ìwòsàn àti Ìmúpadà", 
    icon: Heart,
    color: "emerald"
  },
  { 
    id: "protection", 
    name: "Spiritual Protection", 
    nameYoruba: "Ààbò Ẹ̀mí", 
    icon: Shield,
    color: "blue"
  },
  { 
    id: "prosperity", 
    name: "Abundance & Prosperity", 
    nameYoruba: "Ọ̀pọ̀lọpọ̀ àti Ọrọ̀", 
    icon: Coins,
    color: "yellow"
  },
  { 
    id: "wisdom", 
    name: "Divine Wisdom", 
    nameYoruba: "Ọgbọ́n Òrìṣà", 
    icon: Crown,
    color: "purple"
  },
  { 
    id: "ancestral", 
    name: "Ancestral Connection", 
    nameYoruba: "Ìsopọ̀ Àwọn Bàbá", 
    icon: TreePine,
    color: "amber"
  },
  { 
    id: "cleansing", 
    name: "Spiritual Cleansing", 
    nameYoruba: "Ìwẹ̀nù Ẹ̀mí", 
    icon: Waves,
    color: "cyan"
  }
];

export default function RhythmRecommendation() {
  const { language, ts } = useLanguage();
  const [selectedIntent, setSelectedIntent] = useState<string>("");
  const [customIntent, setCustomIntent] = useState<string>("");
  const [currentMood, setCurrentMood] = useState<string>("");
  const [recommendation, setRecommendation] = useState<RhythmRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateRecommendation = async () => {
    if (!selectedIntent && !customIntent.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/rhythm-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          intent: selectedIntent || 'custom',
          customIntent: customIntent,
          currentMood,
          language
        })
      });
      
      if (!response.ok) throw new Error('Failed to get recommendation');
      
      const data = await response.json();
      setRecommendation(data.recommendation);
    } catch (error) {
      console.error('Error getting recommendation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyRecommendation = () => {
    if (!recommendation) return;
    
    // Trigger parent components to apply the recommended settings
    const event = new CustomEvent('applyRhythmRecommendation', {
      detail: recommendation
    });
    window.dispatchEvent(event);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-700">
      <CardHeader>
        <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-3">
          <Sparkles className="w-6 h-6" />
          {ts("AI Rhythm Recommendation", "Ìmọ̀ Ẹ̀rọ Ìdáhùn Ìlù")}
        </CardTitle>
        <p className="text-sm text-purple-600 dark:text-purple-400">
          {ts(
            "Get personalized rhythm patterns based on your spiritual intent and current energy",
            "Gba àwọn ìlù tí ó bá ète ẹ̀mí àti agbára rẹ̀ mu"
          )}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Spiritual Intent Selection */}
        <div>
          <label className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-3">
            {ts("What is your spiritual intention?", "Kí ni ète ẹ̀mí rẹ̀?")}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {spiritualIntents.map((intent) => {
              const IconComponent = intent.icon;
              const isSelected = selectedIntent === intent.id;
              
              return (
                <button
                  key={intent.id}
                  onClick={() => {
                    setSelectedIntent(intent.id);
                    setCustomIntent("");
                  }}
                  className={`
                    p-3 rounded-lg border-2 transition-all duration-200
                    ${isSelected 
                      ? `border-${intent.color}-500 bg-${intent.color}-100 dark:bg-${intent.color}-900/30` 
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                    }
                  `}
                >
                  <IconComponent className={`w-6 h-6 mx-auto mb-2 ${isSelected ? `text-${intent.color}-600` : 'text-gray-500'}`} />
                  <div className="text-sm font-medium text-center">
                    {language === "yoruba" ? intent.nameYoruba : intent.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Intent */}
        <div>
          <label className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
            {ts("Or describe your specific intention:", "Tàbí ṣàlàyé ète rẹ̀ pàtó:")}
          </label>
          <Textarea
            value={customIntent}
            onChange={(e) => {
              setCustomIntent(e.target.value);
              if (e.target.value.trim()) setSelectedIntent("");
            }}
            placeholder={ts(
              "e.g., I need guidance for an important decision, seeking peace after loss, preparing for a new beginning...",
              "bí àpẹẹrẹ, mo nílò ìtọ́ni fún ìpinnu pàtàkì, mo ń wá àlàáfíà lẹ́yìn ìpadánù..."
            )}
            className="min-h-[80px]"
          />
        </div>

        {/* Current Mood */}
        <div>
          <label className="block text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
            {ts("How are you feeling right now?", "Báwo ni o ṣe ń rílárá báyìí?")}
          </label>
          <Select value={currentMood} onValueChange={setCurrentMood}>
            <SelectTrigger>
              <SelectValue placeholder={ts("Select your current state", "Yan ipò rẹ̀ báyìí")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anxious">{ts("Anxious/Worried", "Àníyàn/Ìbànújẹ́")}</SelectItem>
              <SelectItem value="sad">{ts("Sad/Grieving", "Ìbànújẹ́/Ọ̀fọ̀")}</SelectItem>
              <SelectItem value="confused">{ts("Confused/Lost", "Ìdàrúdàpọ̀/Ìsọnù")}</SelectItem>
              <SelectItem value="angry">{ts("Angry/Frustrated", "Ìbínú/Ìdààmú")}</SelectItem>
              <SelectItem value="hopeful">{ts("Hopeful/Optimistic", "Ìrètí/Ìdúnnú")}</SelectItem>
              <SelectItem value="grateful">{ts("Grateful/Blessed", "Ọpẹ́/Ìbùkún")}</SelectItem>
              <SelectItem value="neutral">{ts("Calm/Neutral", "Ìdákẹ́jẹ́/Àárín")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Generate Button */}
        <Button 
          onClick={generateRecommendation}
          disabled={(!selectedIntent && !customIntent.trim()) || isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              {ts("Consulting the Orishas...", "Ń bá àwọn Òrìṣà sọ̀rọ̀...")}
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              {ts("Get AI Rhythm Recommendation", "Gba Ìmọ̀ Ẹ̀rọ Ìdáhùn Ìlù")}
            </>
          )}
        </Button>

        {/* Recommendation Display */}
        {recommendation && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-4">
              {ts("Your Personalized Rhythm Recommendation", "Ìdáhùn Ìlù Tí Ó Tọ́ Sí Ọ")}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Badge variant="outline" className="mb-2">
                  {ts("Primary Pattern", "Ìlù Àkọ́kọ́")}
                </Badge>
                <p className="font-medium">{recommendation.primaryPattern}</p>
              </div>
              
              <div>
                <Badge variant="outline" className="mb-2">
                  {ts("Recommended Tempo", "Ìyára Ìlù")}
                </Badge>
                <p className="font-medium">{recommendation.tempo} BPM</p>
              </div>
              
              <div>
                <Badge variant="outline" className="mb-2">
                  {ts("Duration", "Àkókò")}
                </Badge>
                <p className="font-medium">{recommendation.duration} {ts("minutes", "ìṣẹ́jú")}</p>
              </div>
              
              <div>
                <Badge variant="outline" className="mb-2">
                  {ts("Ambient Soundscape", "Àyíká Ohùn")}
                </Badge>
                <p className="font-medium">{recommendation.ambientSoundscape}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Badge variant="outline" className="mb-2">
                  {ts("Spiritual Focus", "Ìdójúkọ Ẹ̀mí")}
                </Badge>
                <p className="text-sm">{recommendation.spiritualFocus}</p>
              </div>
              
              <div>
                <Badge variant="outline" className="mb-2">
                  {ts("Guidance", "Ìtọ́ni")}
                </Badge>
                <p className="text-sm">
                  {language === "yoruba" ? recommendation.guidanceYoruba : recommendation.guidance}
                </p>
              </div>

              {recommendation.chantSuggestion && (
                <div>
                  <Badge variant="outline" className="mb-2">
                    {ts("Suggested Chant", "Orin Ìmọ̀ran")}
                  </Badge>
                  <p className="text-sm font-medium italic">{recommendation.chantSuggestion}</p>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {ts("Best Timing", "Àkókò Tí Ó Dára Jù")}
                  </Badge>
                  <p className="text-sm">{recommendation.ritualTiming}</p>
                </div>
                
                <div>
                  <Badge variant="outline" className="mb-2">
                    {ts("Energy Alignment", "Ìmúṣẹ Agbára")}
                  </Badge>
                  <p className="text-sm">{recommendation.energyAlignment}</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={applyRecommendation}
              className="w-full mt-4 bg-green-600 hover:bg-green-700"
            >
              {ts("Apply This Recommendation", "Lo Ìdáhùn Yìí")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}