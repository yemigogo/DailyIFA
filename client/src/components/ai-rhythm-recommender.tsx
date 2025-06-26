import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Brain, Music } from "lucide-react";

interface RhythmRecommendation {
  pattern: string;
  tempo: number;
  intensity: number;
  description: string;
  spiritualBenefit: string;
  duration: string;
}

interface AIRhythmRecommenderProps {
  onRecommendationApply?: (recommendation: RhythmRecommendation) => void;
}

export function AIRhythmRecommender({ onRecommendationApply }: AIRhythmRecommenderProps) {
  const [spiritualIntent, setSpiritualIntent] = useState<string>("");
  const [emotionalState, setEmotionalState] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RhythmRecommendation | null>(null);
  const [error, setError] = useState<string>("");

  const spiritualIntents = [
    { value: "healing", label: "Healing & Restoration" },
    { value: "protection", label: "Protection & Security" },
    { value: "prosperity", label: "Prosperity & Abundance" },
    { value: "wisdom", label: "Wisdom & Clarity" },
    { value: "ancestral", label: "Ancestral Connection" },
    { value: "cleansing", label: "Spiritual Cleansing" },
    { value: "gratitude", label: "Gratitude & Blessing" },
    { value: "meditation", label: "Deep Meditation" }
  ];

  const emotionalStates = [
    { value: "calm", label: "Calm & Peaceful" },
    { value: "anxious", label: "Anxious & Worried" },
    { value: "excited", label: "Excited & Energetic" },
    { value: "sad", label: "Sad & Melancholic" },
    { value: "angry", label: "Angry & Frustrated" },
    { value: "confused", label: "Confused & Lost" },
    { value: "grateful", label: "Grateful & Blessed" },
    { value: "determined", label: "Determined & Focused" }
  ];

  const generateRecommendation = async () => {
    if (!spiritualIntent || !emotionalState) {
      setError("Please select both spiritual intent and emotional state");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/ai/rhythm-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spiritualIntent,
          emotionalState,
          culturalContext: "yoruba_traditional"
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI recommendation');
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recommendation');
    } finally {
      setIsLoading(false);
    }
  };

  const applyRecommendation = () => {
    if (recommendation && onRecommendationApply) {
      onRecommendationApply(recommendation);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI-Powered Rhythm Recommendation
        </CardTitle>
        <CardDescription>
          Get personalized Batá rhythm patterns based on your spiritual intent and current emotional state
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Spiritual Intent</label>
            <Select value={spiritualIntent} onValueChange={setSpiritualIntent}>
              <SelectTrigger>
                <SelectValue placeholder="Select your spiritual goal" />
              </SelectTrigger>
              <SelectContent>
                {spiritualIntents.map((intent) => (
                  <SelectItem key={intent.value} value={intent.value}>
                    {intent.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Current Emotional State</label>
            <Select value={emotionalState} onValueChange={setEmotionalState}>
              <SelectTrigger>
                <SelectValue placeholder="How are you feeling?" />
              </SelectTrigger>
              <SelectContent>
                {emotionalStates.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={generateRecommendation}
          disabled={isLoading || !spiritualIntent || !emotionalState}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Consulting Orisha Wisdom...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Get AI Rhythm Recommendation
            </>
          )}
        </Button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {recommendation && (
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Music className="h-5 w-5" />
                Recommended Rhythm Pattern
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Pattern:</span> {recommendation.pattern}
                </div>
                <div>
                  <span className="font-semibold">Tempo:</span> {recommendation.tempo} BPM
                </div>
                <div>
                  <span className="font-semibold">Intensity:</span> {recommendation.intensity}/10
                </div>
                <div>
                  <span className="font-semibold">Duration:</span> {recommendation.duration}
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-purple-700">Description:</span>
                  <p className="text-sm mt-1">{recommendation.description}</p>
                </div>
                <div>
                  <span className="font-semibold text-purple-700">Spiritual Benefit:</span>
                  <p className="text-sm mt-1">{recommendation.spiritualBenefit}</p>
                </div>
              </div>

              <Button 
                onClick={applyRecommendation}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Apply This Rhythm Pattern
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}