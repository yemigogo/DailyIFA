import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const router = Router();

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// "claude-sonnet-4-20250514"
const DEFAULT_MODEL_STR = "claude-sonnet-4-20250514";

interface RhythmRequest {
  spiritualIntent: string;
  emotionalState: string;
  culturalContext: string;
}

router.post('/rhythm-recommendation', async (req, res) => {
  try {
    const { spiritualIntent, emotionalState, culturalContext }: RhythmRequest = req.body;

    if (!spiritualIntent || !emotionalState) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const prompt = `As a master drummer and spiritual advisor in the Yoruba tradition, provide a personalized Batá rhythm recommendation based on:

Spiritual Intent: ${spiritualIntent}
Emotional State: ${emotionalState}
Cultural Context: ${culturalContext}

Please respond with a JSON object containing:
- pattern: The specific Batá rhythm pattern name (e.g., "Egungun Calling", "Orisha Invocation", "Healing Waters")
- tempo: BPM (beats per minute) between 80-160
- intensity: Scale of 1-10 for spiritual energy
- description: Brief description of the rhythm's characteristics and how it's played
- spiritualBenefit: How this rhythm will help achieve the spiritual intent and balance the emotional state
- duration: Recommended practice time (e.g., "5-10 minutes", "15-20 minutes")

Consider traditional Yoruba drumming practices, the sacred nature of Batá rhythms, and how different patterns affect spiritual and emotional states. Base your recommendation on authentic African drumming traditions.`;

    const message = await anthropic.messages.create({
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
      model: DEFAULT_MODEL_STR,
    });

    // Extract text content from the response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Parse the JSON response
    let recommendation;
    try {
      recommendation = JSON.parse(responseText);
    } catch (parseError) {
      // If JSON parsing fails, create a structured response from the text
      recommendation = {
        pattern: "Traditional Healing",
        tempo: 100,
        intensity: 5,
        description: "A grounding rhythm pattern that balances spiritual energy",
        spiritualBenefit: responseText.substring(0, 200) + "...",
        duration: "10-15 minutes"
      };
    }

    res.json({ recommendation });

  } catch (error) {
    console.error('AI recommendation error:', error);
    
    // Provide fallback recommendation if AI fails
    const fallbackRecommendation = {
      pattern: "Ancestral Connection",
      tempo: 90,
      intensity: 4,
      description: "A steady, meditative rhythm that helps center the spirit and connect with ancestral wisdom",
      spiritualBenefit: "This rhythm helps calm the mind and opens pathways for spiritual guidance",
      duration: "10-15 minutes"
    };

    res.json({ recommendation: fallbackRecommendation });
  }
});

export default router;