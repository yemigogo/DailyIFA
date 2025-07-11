import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

import { oduDatabase } from "./data/odu-database";
import { insertDailyReadingSchema } from "@shared/schema";
import { format } from "date-fns";
import { generateIfaLunarCalendar } from "./data/ifa-lunar-calendar";
import { generateAll256Odu, getOduPaginated, searchOdu, getOduByCategory, getRandomOdu } from "./odu-generator";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import multer from 'multer';
import fs from 'fs/promises';

const execAsync = promisify(exec);

// Configure multer for audio uploads
const upload = multer({
  dest: 'temp_uploads/',
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'audio/mpeg',
      'audio/wav', 
      'audio/mp3',
      'audio/opus',
      'application/ogg'
    ];
    const allowedExtensions = ['.mp3', '.wav', '.opus', '.ogg'];
    
    const isValidMime = allowedMimeTypes.includes(file.mimetype);
    const isValidExt = allowedExtensions.some(ext => file.originalname.toLowerCase().endsWith(ext));
    
    if (isValidMime || isValidExt) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed (.mp3, .wav, .opus, .ogg)'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize the Odu database and Ifa lunar calendar
  await initializeOduDatabase();
  await initializeIfaLunarCalendar();




  // Get today's reading
  app.get("/api/readings/today", async (req, res) => {
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      
      let reading = await storage.getDailyReading(today);
      
      if (!reading) {
        const oduId = generateOduForDate(today);
        await storage.createDailyReading({
          date: today,
          oduId,
          saved: false
        });
        
        reading = await storage.getDailyReading(today);
      }

      res.json(reading);
    } catch (error) {
      res.status(500).json({ message: "Failed to get today's reading" });
    }
  });

  // Get reading history
  app.get("/api/readings/history", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const history = await storage.getReadingHistory(limit);
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: "Failed to get reading history" });
    }
  });

  // Get daily reading for a specific date
  app.get("/api/readings/:date", async (req, res) => {
    try {
      const { date } = req.params;
      
      // Validate date format (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
      }

      let reading = await storage.getDailyReading(date);
      
      // If no reading exists for this date, generate one
      if (!reading) {
        const oduId = generateOduForDate(date);
        
        // Verify the Odu exists before creating the reading
        const odu = await storage.getOdu(oduId);
        if (!odu) {
          console.error(`Generated invalid Odu ID ${oduId} for date ${date}`);
          return res.status(500).json({ message: "Failed to generate valid reading" });
        }
        
        const newReading = await storage.createDailyReading({
          date,
          oduId,
          saved: false
        });
        
        reading = await storage.getDailyReading(date);
      }

      if (!reading) {
        return res.status(500).json({ message: "Failed to create reading" });
      }

      res.json(reading);
    } catch (error) {
      console.error("Error getting daily reading:", error);
      res.status(500).json({ message: "Failed to get daily reading" });
    }
  });

  // Save a daily reading
  app.post("/api/readings/:date/save", async (req, res) => {
    try {
      const { date } = req.params;
      const savedReading = await storage.saveDailyReading(date);
      
      if (!savedReading) {
        return res.status(404).json({ message: "Reading not found" });
      }

      res.json(savedReading);
    } catch (error) {
      res.status(500).json({ message: "Failed to save reading" });
    }
  });

  // Get all Odus (for educational purposes)
  app.get("/api/odus", async (req, res) => {
    try {
      const odus = await storage.getAllOdus();
      res.json(odus);
    } catch (error) {
      res.status(500).json({ message: "Failed to get Odus" });
    }
  });

  app.get("/api/odus/search", async (req, res) => {
    try {
      const { problem } = req.query;
      if (!problem || typeof problem !== 'string') {
        return res.status(400).json({ message: "Problem parameter is required" });
      }
      const odus = await storage.searchOduByProblem(problem);
      res.json(odus);
    } catch (error) {
      res.status(500).json({ message: "Failed to search Odus" });
    }
  });

  // Get daily prayer by day of week (0 = Sunday, 1 = Monday, etc.)
  app.get("/api/prayers/daily/:dayOfWeek", async (req, res) => {
    try {
      const dayOfWeek = parseInt(req.params.dayOfWeek);
      if (isNaN(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
        return res.status(400).json({ message: "Day of week must be between 0-6" });
      }

      const prayer = await storage.getDailyPrayer(dayOfWeek);
      if (!prayer) {
        return res.status(404).json({ message: "Prayer not found for this day" });
      }

      res.json(prayer);
    } catch (error) {
      res.status(500).json({ message: "Failed to get daily prayer" });
    }
  });

  // Get all daily prayers
  app.get("/api/prayers/all", async (req, res) => {
    try {
      const prayers = await storage.getAllDailyPrayers();
      res.json(prayers);
    } catch (error) {
      res.status(500).json({ message: "Failed to get daily prayers" });
    }
  });

  // Get Ifa lunar prayer for specific day of year (1-365)
  app.get("/api/ifa-lunar/:dayOfYear", async (req, res) => {
    try {
      const dayOfYear = parseInt(req.params.dayOfYear);
      
      if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 365) {
        return res.status(400).json({ message: "Invalid day of year. Must be between 1-365" });
      }

      const prayer = await storage.getIfaLunarPrayer(dayOfYear);
      
      if (!prayer) {
        return res.status(404).json({ message: "Lunar prayer not found for this day" });
      }

      res.json(prayer);
    } catch (error) {
      res.status(500).json({ message: "Failed to get Ifa lunar prayer" });
    }
  });

  // Get current day's Ifa lunar prayer
  app.get("/api/ifa-lunar/today", async (req, res) => {
    try {
      const today = new Date();
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const dayOfYear = Math.ceil((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      // Ensure dayOfYear is within valid range
      const validDayOfYear = Math.max(1, Math.min(365, dayOfYear));

      const prayer = await storage.getIfaLunarPrayer(validDayOfYear);
      
      if (!prayer) {
        return res.status(404).json({ message: "Lunar prayer not found for today" });
      }

      res.json(prayer);
    } catch (error) {
      console.error("Error getting today's lunar prayer:", error);
      res.status(500).json({ message: "Failed to get today's Ifa lunar prayer" });
    }
  });

  // Get all Ifa lunar prayers
  app.get("/api/ifa-lunar/all", async (req, res) => {
    try {
      const prayers = await storage.getAllIfaLunarPrayers();
      res.json(prayers);
    } catch (error) {
      res.status(500).json({ message: "Failed to get all Ifa lunar prayers" });
    }
  });

  // AI-powered rhythm recommendation endpoint
  app.post("/api/rhythm-recommendation", async (req, res) => {
    try {
      const { intent, customIntent, currentMood, language } = req.body;
      
      if (!process.env.ANTHROPIC_API_KEY) {
        return res.status(500).json({ error: "ANTHROPIC_API_KEY not configured" });
      }

      // Import Anthropic SDK
      const Anthropic = require('@anthropic-ai/sdk');
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const intentDescription = customIntent || intent;
      const prompt = `As an expert in traditional Yoruba spiritual practices and Batá drumming, provide a personalized rhythm recommendation based on the following:

Spiritual Intent: ${intentDescription}
Current Emotional State: ${currentMood || 'not specified'}
Language: ${language || 'english'}

Please provide a JSON response with the following structure:
{
  "primaryPattern": "Name of the recommended Batá rhythm pattern (e.g., Egungun Ceremonial, Orisha Calling, Ifa Invocation)",
  "tempo": "BPM between 60-120 based on intent",
  "duration": "Recommended session duration in minutes",
  "ambientSoundscape": "Recommended background sound (Ocean Blessing Waves, Sacred Forest, etc.)",
  "spiritualFocus": "Brief description of what to focus on during the session",
  "guidance": "Spiritual guidance and intentions to hold during the rhythm session",
  "guidanceYoruba": "Same guidance translated to Yoruba",
  "chantSuggestion": "Optional traditional Yoruba phrase or chant to accompany the rhythm",
  "ritualTiming": "Best time of day or conditions for this practice",
  "energyAlignment": "How this rhythm aligns with the user's spiritual energy"
}

Base your recommendations on authentic Yoruba spiritual traditions, the healing properties of specific drum patterns, and the energetic qualities of different rhythms. Consider the user's emotional state when selecting tempo and pattern complexity.`;

      const message = await anthropic.messages.create({
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
        model: "claude-sonnet-4-20250514",
      });

      let recommendation;
      try {
        recommendation = JSON.parse(message.content[0].text);
      } catch (parseError) {
        // Fallback if AI doesn't return valid JSON
        recommendation = {
          primaryPattern: "Egungun Ceremonial",
          tempo: intent === "healing" ? 70 : intent === "protection" ? 90 : 80,
          duration: 15,
          ambientSoundscape: intent === "healing" ? "Ocean Blessing Waves" : "Sacred Forest",
          spiritualFocus: `Focus on ${intentDescription}`,
          guidance: "Allow the rhythm to guide your spiritual journey and open your heart to divine wisdom.",
          guidanceYoruba: "Jẹ́ kí ìlù tọ́ ọ sínú ìrìnàjò ẹ̀mí rẹ kí o sì ṣí ọkàn rẹ sí ọgbọ́n òrun.",
          ritualTiming: "Early morning or evening during quiet reflection time",
          energyAlignment: "This rhythm will help balance and harmonize your spiritual energy"
        };
      }
      
      res.json({ recommendation });
    } catch (error) {
      console.error("Error generating rhythm recommendation:", error);
      res.status(500).json({ error: "Failed to generate recommendation" });
    }
  });

  // Audio management endpoints
  
  // Get audio library
  app.get("/api/audio/library", async (req, res) => {
    try {
      const audioFiles = [
        {
          id: 'olokun',
          name: 'Olókun',
          yorubaText: 'Olókun',
          englishTranslation: 'Orisha of the Ocean',
          category: 'orisha',
          isAuthentic: true,
          audioUrl: '/static/audio/pronunciation/olokun.mp3',
          duration: 46
        },
        {
          id: 'oya',
          name: 'Ọya',
          yorubaText: 'Ọya',
          englishTranslation: 'Orisha of Wind and Storms',
          category: 'orisha',
          isAuthentic: true,
          audioUrl: '/static/audio/pronunciation/oya.mp3',
          duration: 51
        },
        {
          id: 'yemoja',
          name: 'Yemọja',
          yorubaText: 'Yemọja',
          englishTranslation: 'Mother of the Ocean',
          category: 'orisha',
          isAuthentic: true,
          audioUrl: '/static/audio/pronunciation/yemoja.mp3',
          duration: 102
        },
        {
          id: 'osun',
          name: 'Ọ̀ṣun',
          yorubaText: 'Ọ̀ṣun',
          englishTranslation: 'Goddess of Rivers and Love',
          category: 'orisha',
          isAuthentic: true,
          audioUrl: '/static/audio/pronunciation/osun.mp3',
          duration: 66
        },
        {
          id: 'obatala',
          name: 'Ọbàtálá',
          yorubaText: 'Ọbàtálá',
          englishTranslation: 'Father of Creation, King of White Cloth',
          category: 'orisha',
          isAuthentic: true,
          audioUrl: '/static/audio/pronunciation/obatala.mp3',
          duration: 86
        },
        {
          id: 'sango',
          name: 'Ṣàngó',
          yorubaText: 'Ṣàngó',
          englishTranslation: 'Orisha of Thunder',
          category: 'orisha',
          isAuthentic: false,
          audioUrl: '/static/audio/pronunciation/sango.mp3'
        },
        {
          id: 'orisa',
          name: 'Òrìṣà',
          yorubaText: 'Òrìṣà',
          englishTranslation: 'Deity/Divine Being',
          category: 'spiritual-terms',
          isAuthentic: false,
          audioUrl: '/static/audio/pronunciation/orisa.mp3'
        }
      ];
      
      res.json(audioFiles);
    } catch (error) {
      res.status(500).json({ error: "Failed to get audio library" });
    }
  });

  // Upload and process authentic audio
  app.post("/api/audio/upload", upload.single('audioFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No audio file provided" });
      }

      const { yorubaText, englishTranslation, category } = req.body;
      
      if (!yorubaText || !englishTranslation) {
        return res.status(400).json({ error: "Yoruba text and English translation are required" });
      }

      // Create safe filename from Yoruba text
      const safeFilename = yorubaText.toLowerCase()
        .replace(/[ọọ́]/g, 'o')
        .replace(/[ẹệ́]/g, 'e')
        .replace(/[ìíī]/g, 'i')
        .replace(/[àáā]/g, 'a')
        .replace(/[ùúū]/g, 'u')
        .replace(/[ṣ]/g, 's')
        .replace(/[ń]/g, 'n')
        .replace(/[^a-z0-9]/g, '');

      const outputPath = `static/audio/pronunciation/${safeFilename}.mp3`;
      const tempPath = req.file.path;

      try {
        // Convert to MP3 using FFmpeg
        await execAsync(`ffmpeg -i "${tempPath}" -acodec libmp3lame -ab 128k "${outputPath}" -y`);
        
        // Get audio duration
        const { stdout } = await execAsync(`ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${outputPath}"`);
        const duration = Math.round(parseFloat(stdout.trim()));

        // Clean up temp file
        await fs.unlink(tempPath);

        // Update Interactive Yoruba Text mapping
        const mappingUpdate = `
        '${yorubaText.toLowerCase()}': '${safeFilename}.mp3',
        '${safeFilename}': '${safeFilename}.mp3'`;

        // Return success response
        res.json({
          success: true,
          file: {
            id: safeFilename,
            name: yorubaText,
            yorubaText,
            englishTranslation,
            category: category || 'orisha',
            isAuthentic: true,
            audioUrl: `/static/audio/pronunciation/${safeFilename}.mp3`,
            duration
          },
          mappingUpdate,
          message: `Successfully processed ${yorubaText} pronunciation (${duration}s)`
        });

      } catch (ffmpegError) {
        // Clean up temp file on error
        try {
          await fs.unlink(tempPath);
        } catch (unlinkError) {
          console.error("Failed to clean up temp file:", unlinkError);
        }
        throw ffmpegError;
      }

    } catch (error) {
      console.error("Audio upload error:", error);
      res.status(500).json({ error: "Failed to process audio file" });
    }
  });

  // Learning Path API endpoints
  app.get('/api/learning-paths/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const paths = await storage.getUserLearningPaths(userId);
      res.json(paths);
    } catch (error) {
      console.error("Error fetching learning paths:", error);
      res.status(500).json({ message: "Failed to fetch learning paths" });
    }
  });

  app.post('/api/learning-paths', async (req, res) => {
    try {
      const pathData = req.body;
      const path = await storage.createLearningPath(pathData);
      
      // Award achievement for starting first learning path
      const achievements = await storage.checkAndAwardAchievements(
        pathData.userId, 
        'start_learning_path',
        { orishaName: pathData.orishaName }
      );
      
      res.json({ path, newAchievements: achievements });
    } catch (error) {
      console.error("Error creating learning path:", error);
      res.status(500).json({ message: "Failed to create learning path" });
    }
  });

  app.get('/api/learning-paths/:userId/:orishaName', async (req, res) => {
    try {
      const { userId, orishaName } = req.params;
      const path = await storage.getLearningPath(userId, orishaName);
      if (!path) {
        return res.status(404).json({ message: "Learning path not found" });
      }
      res.json(path);
    } catch (error) {
      console.error("Error fetching learning path:", error);
      res.status(500).json({ message: "Failed to fetch learning path" });
    }
  });

  app.put('/api/learning-paths/:pathId/progress', async (req, res) => {
    try {
      const pathId = parseInt(req.params.pathId);
      const { progress } = req.body;
      const updatedPath = await storage.updateLearningPathProgress(pathId, progress);
      res.json(updatedPath);
    } catch (error) {
      console.error("Error updating learning path progress:", error);
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  app.put('/api/learning-paths/:pathId/complete', async (req, res) => {
    try {
      const pathId = parseInt(req.params.pathId);
      const { userId, orishaName } = req.body;
      const completedPath = await storage.completeLearningPath(pathId);
      
      // Award achievement for completing learning path
      const userPaths = await storage.getUserLearningPaths(userId);
      const completedPaths = userPaths.filter(p => p.isCompleted).length;
      
      const achievements = await storage.checkAndAwardAchievements(
        userId,
        'complete_learning_path',
        { orishaName, completedPaths }
      );
      
      res.json({ path: completedPath, newAchievements: achievements });
    } catch (error) {
      console.error("Error completing learning path:", error);
      res.status(500).json({ message: "Failed to complete learning path" });
    }
  });

  // Achievement API endpoints
  app.get('/api/achievements/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  app.post('/api/achievements/check', async (req, res) => {
    try {
      const { userId, action, context } = req.body;
      const newAchievements = await storage.checkAndAwardAchievements(userId, action, context);
      res.json(newAchievements);
    } catch (error) {
      console.error("Error checking achievements:", error);
      res.status(500).json({ message: "Failed to check achievements" });
    }
  });

  // Learning Module API endpoints
  app.get('/api/learning-modules/:pathId', async (req, res) => {
    try {
      const pathId = parseInt(req.params.pathId);
      const modules = await storage.getModulesForPath(pathId);
      res.json(modules);
    } catch (error) {
      console.error("Error fetching learning modules:", error);
      res.status(500).json({ message: "Failed to fetch learning modules" });
    }
  });

  app.post('/api/learning-modules', async (req, res) => {
    try {
      const moduleData = req.body;
      const module = await storage.createLearningModule(moduleData);
      res.json(module);
    } catch (error) {
      console.error("Error creating learning module:", error);
      res.status(500).json({ message: "Failed to create learning module" });
    }
  });

  app.put('/api/user-progress/:userId/:moduleId', async (req, res) => {
    try {
      const { userId } = req.params;
      const moduleId = parseInt(req.params.moduleId);
      const progressData = req.body;
      const progress = await storage.updateModuleProgress(userId, moduleId, progressData);
      res.json(progress);
    } catch (error) {
      console.error("Error updating module progress:", error);
      res.status(500).json({ message: "Failed to update module progress" });
    }
  });

  app.put('/api/user-progress/:userId/:moduleId/complete', async (req, res) => {
    try {
      const { userId } = req.params;
      const moduleId = parseInt(req.params.moduleId);
      const { score } = req.body;
      const progress = await storage.completeModule(userId, moduleId, score);
      
      // Check for pronunciation achievement
      const achievements = await storage.checkAndAwardAchievements(
        userId,
        'complete_pronunciation',
        { score }
      );
      
      res.json({ progress, newAchievements: achievements });
    } catch (error) {
      console.error("Error completing module:", error);
      res.status(500).json({ message: "Failed to complete module" });
    }
  });

  // Initialize sample learning modules for new paths
  app.post('/api/learning-paths/:pathId/initialize-modules', async (req, res) => {
    try {
      const pathId = parseInt(req.params.pathId);
      const { orishaName } = req.body;
      
      // Sample learning modules for each Orisha
      const sampleModules = [
        {
          pathId,
          moduleType: 'pronunciation',
          title: `Pronouncing ${orishaName}`,
          titleYoruba: `Sísọ ${orishaName}`,
          content: `Learn the authentic pronunciation of ${orishaName} with traditional tonal patterns and spiritual reverence.`,
          contentYoruba: `Kọ́ sísọ ${orishaName} tó tọ́ pẹ̀lú àwọn ohùn àtìjọ́ àti ẹ̀bùn ẹ̀mí.`,
          moduleOrder: 1
        },
        {
          pathId,
          moduleType: 'history',
          title: `Origins of ${orishaName}`,
          titleYoruba: `Ìpilẹ̀ṣẹ̀ ${orishaName}`,
          content: `Discover the ancient stories and cultural significance of ${orishaName} in Yoruba tradition.`,
          contentYoruba: `Ṣàwárí àwọn ìtàn àtijọ́ àti pàtàkì àṣà ${orishaName} nínú àṣà Yorùbá.`,
          moduleOrder: 2
        },
        {
          pathId,
          moduleType: 'practice',
          title: `Connecting with ${orishaName}`,
          titleYoruba: `Ìbáraẹnisọ̀rọ̀ pẹ̀lú ${orishaName}`,
          content: `Learn traditional prayers, offerings, and spiritual practices for honoring ${orishaName}.`,
          contentYoruba: `Kọ́ àwọn àdúrà àtìjọ́, ẹbọ, àti àwọn ìṣe ẹ̀mí fún ọ̀wọ̀ ${orishaName}.`,
          moduleOrder: 3
        },
        {
          pathId,
          moduleType: 'quiz',
          title: `${orishaName} Knowledge Test`,
          titleYoruba: `Ìdánwò Ìmọ̀ ${orishaName}`,
          content: `Test your understanding of ${orishaName}'s attributes, stories, and spiritual significance.`,
          contentYoruba: `Dán ìmọ̀ rẹ nípa àwọn àbùdá ${orishaName}, ìtàn, àti pàtàkì ẹ̀mí wò.`,
          moduleOrder: 4
        }
      ];

      const createdModules = [];
      for (const moduleData of sampleModules) {
        const module = await storage.createLearningModule(moduleData);
        createdModules.push(module);
      }

      res.json({ modules: createdModules });
    } catch (error) {
      console.error("Error initializing learning modules:", error);
      res.status(500).json({ message: "Failed to initialize learning modules" });
    }
  });

  // ===== 256 ODU COMPLETE SYSTEM API ENDPOINTS =====
  
  // Get all 256 Odu with pagination
  app.get("/api/odus/complete", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 16;
      
      const result = getOduPaginated(page, limit);
      res.json(result);
    } catch (error) {
      console.error("Error getting complete Odu system:", error);
      res.status(500).json({ message: "Failed to get complete Odu system" });
    }
  });

  // Get random Odu for daily reading
  app.get("/api/odus/random", async (req, res) => {
    try {
      const randomOdu = getRandomOdu();
      res.json(randomOdu);
    } catch (error) {
      console.error("Error getting random Odu:", error);
      res.status(500).json({ message: "Failed to get random Odu" });
    }
  });

  // Search Odu by name, meaning, or spiritual focus
  app.get("/api/odus/search-complete", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const results = searchOdu(query);
      res.json({
        query,
        results,
        count: results.length
      });
    } catch (error) {
      console.error("Error searching complete Odu system:", error);
      res.status(500).json({ message: "Failed to search Odu system" });
    }
  });

  // Get Odu by category (major or minor)
  app.get("/api/odus/category/:category", async (req, res) => {
    try {
      const category = req.params.category as 'major' | 'minor';
      if (category !== 'major' && category !== 'minor') {
        return res.status(400).json({ message: "Category must be 'major' or 'minor'" });
      }
      
      const odus = getOduByCategory(category);
      res.json({
        category,
        odus,
        count: odus.length
      });
    } catch (error) {
      console.error("Error getting Odu by category:", error);
      res.status(500).json({ message: "Failed to get Odu by category" });
    }
  });

  // Get all 256 Odu as a complete list (for advanced users)
  app.get("/api/odus/all-256", async (req, res) => {
    try {
      const all256Odu = generateAll256Odu();
      res.json({
        totalOdus: all256Odu.length,
        majorOdus: all256Odu.filter(odu => odu.category === 'major').length,
        minorOdus: all256Odu.filter(odu => odu.category === 'minor').length,
        odus: all256Odu
      });
    } catch (error) {
      console.error("Error getting all 256 Odu:", error);
      res.status(500).json({ message: "Failed to get complete 256 Odu system" });
    }
  });

  // Get Odu by specific ID
  app.get("/api/odus/complete/:id", async (req, res) => {
    try {
      const oduId = parseInt(req.params.id);
      if (isNaN(oduId) || oduId < 1 || oduId > 256) {
        return res.status(400).json({ message: "Odu ID must be between 1-256" });
      }
      
      const all256Odu = generateAll256Odu();
      const odu = all256Odu.find(o => o.id === oduId);
      
      if (!odu) {
        return res.status(404).json({ message: "Odu not found" });
      }
      
      res.json(odu);
    } catch (error) {
      console.error("Error getting Odu by ID:", error);
      res.status(500).json({ message: "Failed to get Odu" });
    }
  });

  // Get spiritual guidance based on multiple Odu
  app.post("/api/odus/guidance", async (req, res) => {
    try {
      const { oduIds, question } = req.body;
      
      if (!oduIds || !Array.isArray(oduIds) || oduIds.length === 0) {
        return res.status(400).json({ message: "At least one Odu ID is required" });
      }
      
      const all256Odu = generateAll256Odu();
      const selectedOdus = oduIds
        .map((id: number) => all256Odu.find(odu => odu.id === id))
        .filter((odu: any) => odu !== undefined);
      
      if (selectedOdus.length === 0) {
        return res.status(404).json({ message: "No valid Odus found" });
      }
      
      // Combine guidance from multiple Odu
      const combinedGuidance = {
        question: question || "General spiritual guidance",
        selectedOdus: selectedOdus.map(odu => ({
          name: odu.name,
          nameYoruba: odu.nameYoruba,
          guidance: odu.guidance,
          guidanceYoruba: odu.guidanceYoruba
        })),
        overallGuidance: selectedOdus.map(odu => odu.guidance).join(' '),
        overallGuidanceYoruba: selectedOdus.map(odu => odu.guidanceYoruba).join(' '),
        spiritualFoci: [...new Set(selectedOdus.flatMap(odu => odu.spiritualFocus))],
        combinedProverb: selectedOdus.map(odu => odu.proverb).join(' • ')
      };
      
      res.json(combinedGuidance);
    } catch (error) {
      console.error("Error generating combined guidance:", error);
      res.status(500).json({ message: "Failed to generate spiritual guidance" });
    }
  });

  // Flask Odu Cards API endpoint
  app.get("/api/odu-cards", async (req, res) => {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      // Get all PNG files from the odu_cards directory
      const cardsDir = path.join(process.cwd(), 'static/odu_cards');
      const files = await fs.readdir(cardsDir);
      const pngFiles = files.filter(file => file.endsWith('.png'));
      
      console.log(`Found ${pngFiles.length} PNG files in odu_cards directory`);
      
      // Create card objects with metadata
      const cards = pngFiles
        .filter(filename => {
          // Extract number from filename (e.g., "001_OGBE_MEJI.png" -> "001")
          const numberMatch = filename.match(/^(\d{3})_/);
          if (!numberMatch) return false;
          
          const cardNumber = parseInt(numberMatch[1]);
          return cardNumber >= 1 && cardNumber <= 256;
        })
        .sort((a, b) => {
          // Sort by the number at the beginning of filename
          const aNum = parseInt(a.match(/^(\d{3})_/)?.[1] || '0');
          const bNum = parseInt(b.match(/^(\d{3})_/)?.[1] || '0');
          return aNum - bNum;
        })
        .slice(0, 20) // Limit to first 20 for display
        .map(filename => {
          // Extract Odu name from filename (actual format: 001_OGBE_MEJI.png)
          const nameMatch = filename.match(/^\d{3}_(.+)\.png$/);
          const rawName = nameMatch ? nameMatch[1] : filename.replace('.png', '');
          
          // Clean up the name (remove MEJI suffix, replace underscores)
          let name = rawName.replace(/_MEJI$/, '').replace(/_/g, ' ').toUpperCase();
          
          // Determine type based on naming pattern (files with MEJI are major Odu)
          const isMajor = filename.includes('_MEJI.png') && !filename.includes('_Ogbe_') && !filename.includes('_Oyeku_');
          
          // Create pattern based on Odu name
          let pattern = 'MEJI\nII\nII\nII\nII';
          if (name.includes('OYEKU')) {
            pattern = 'MEJI\nII II\nII II\nII II\nII II';
          } else if (name.includes('IWORI')) {
            pattern = 'MEJI\nII II\nI I\nI I\nII II';
          } else if (name.includes('ODI')) {
            pattern = 'MEJI\nI I\nII II\nII II\nI I';
          }
          
          // Map meanings
          const meanings: Record<string, string> = {
            'OGBE': 'Light, clarity, divine wisdom',
            'OYEKU': 'Mystery, reflection, hidden knowledge', 
            'IWORI': 'Character, spiritual development',
            'ODI': 'Foundation, stability',
            'IROSUN': 'Healing, restoration',
            'OWONRIN': 'Chaos, transformation',
            'OBARA': 'Passion, emotion',
            'OKANRAN': 'Protection, boundaries',
            'OGUNDA': 'Warrior spirit, strength',
            'OSA': 'Intuition, spiritual insight',
            'IKA': 'Transformation, cunning strategy',
            'OTURUPON': 'Patience, endurance',
            'OTURA': 'Hidden mysteries',
            'IRETE': 'Victory, triumph',
            'OSE': 'Abundance, prosperity',
            'OFUN': 'Completion, blessing'
          };
          
          const meaning = meanings[name.split(' ')[0]] || 'Sacred wisdom and divine guidance';
          
          return {
            filename,
            name,
            url: `/static/odu_cards/${filename}`,
            type: isMajor ? 'major' : 'minor',
            pattern,
            meaning
          };
        });

      console.log(`Processed ${cards.length} cards for API response`);
      
      res.json({
        cards,
        total: cards.length,
        message: "Flask Odu cards (authentic Excel data)",
        source: "User Excel Integration"
      });
    } catch (error) {
      console.error("Error fetching Odu cards:", error);
      res.status(500).json({ 
        message: "Failed to fetch Odu cards",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Complete 256 Odu System API endpoint
  app.get("/api/odu-256/complete", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const per_page = parseInt(req.query.per_page as string) || 20;
      const category = req.query.category as string || 'all';
      const search = req.query.search as string || '';
      const primary_odu = req.query.primary_odu as string || '';
      
      const all256Odu = generateAll256Odu();
      
      // Filter by category
      let filteredOdus = all256Odu;
      if (category !== 'all') {
        filteredOdus = filteredOdus.filter(odu => odu.category === category);
      }
      
      // Filter by search
      if (search) {
        filteredOdus = filteredOdus.filter(odu => 
          odu.name.toLowerCase().includes(search.toLowerCase()) ||
          odu.nameYoruba.toLowerCase().includes(search.toLowerCase()) ||
          odu.meaning.toLowerCase().includes(search.toLowerCase()) ||
          odu.guidance.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      // Filter by primary Odu
      if (primary_odu) {
        filteredOdus = filteredOdus.filter(odu => 
          odu.name.toLowerCase().includes(primary_odu.toLowerCase())
        );
      }
      
      // Pagination
      const total = filteredOdus.length;
      const startIndex = (page - 1) * per_page;
      const endIndex = startIndex + per_page;
      const paginatedOdus = filteredOdus.slice(startIndex, endIndex);
      
      // Convert to expected format
      const formattedOdus = paginatedOdus.map(odu => ({
        id: odu.id,
        name: odu.name,
        full_name: odu.nameYoruba,
        pattern: odu.pattern,
        meaning: odu.meaning,
        guidance: odu.guidance,
        category: odu.category,
        spiritual_significance: odu.spiritualFocus.join(', '),
        traditional_story: odu.proverb,
        modern_application: odu.guidance,
        primary_odu: odu.name.split('-')[0] || odu.name,
        secondary_odu: odu.name.split('-')[1] || odu.name
      }));
      
      res.json({
        odu_list: formattedOdus,
        pagination: {
          page,
          per_page,
          total,
          pages: Math.ceil(total / per_page)
        },
        filters: {
          category,
          search,
          primary_odu
        },
        statistics: {
          total_odu: total,
          major_odu: 16,
          minor_odu: 240
        }
      });
    } catch (error) {
      console.error("Error fetching complete 256 Odu system:", error);
      res.status(500).json({ message: "Failed to fetch complete 256 Odu system" });
    }
  });

  // 256 Odu Categories API endpoint
  app.get("/api/odu-256/categories", async (req, res) => {
    try {
      const all256Odu = generateAll256Odu();
      
      // Calculate category distribution
      const categoryStats = all256Odu.reduce((acc, odu) => {
        acc[odu.category] = (acc[odu.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      // Calculate primary Odu distribution
      const primaryOduStats = all256Odu.reduce((acc, odu) => {
        const primaryOdu = odu.name.split('-')[0] || odu.name;
        acc[primaryOdu] = (acc[primaryOdu] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const categories = Object.entries(categoryStats).map(([category, count]) => ({
        category,
        count
      }));
      
      const primary_odu_distribution = Object.entries(primaryOduStats).map(([primary_odu, count]) => ({
        primary_odu,
        count
      }));
      
      res.json({
        categories,
        primary_odu_distribution,
        total_combinations: 256
      });
    } catch (error) {
      console.error("Error fetching 256 Odu categories:", error);
      res.status(500).json({ message: "Failed to fetch 256 Odu categories" });
    }
  });

  // Flask Odu Interface route
  app.get("/odu", (req, res) => {
    try {
      // Serve a simple HTML page that displays all Odu cards
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete Odu Ifá Cards Interface</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: white;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #f4d03f;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        .header p {
            color: #bbb;
            font-size: 1.1rem;
        }
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }
        .card {
            background: #333;
            border: 2px solid white;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(244, 208, 63, 0.3);
        }
        .card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 5px;
            margin-bottom: 15px;
        }
        .card h3 {
            color: #f4d03f;
            margin: 10px 0;
            font-size: 1.2rem;
        }
        .card p {
            color: #ccc;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        .loading {
            text-align: center;
            color: #f4d03f;
            font-size: 1.2rem;
            margin: 50px 0;
        }
        .badge {
            display: inline-block;
            background: #f4d03f;
            color: #1a1a1a;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Complete Odu Ifá Cards Interface</h1>
        <p>Traditional Yoruba Divination System - Authentic Cards Collection</p>
    </div>
    <div id="cards-container">
        <div class="loading">Loading Odu cards...</div>
    </div>

    <script>
        async function loadOduCards() {
            try {
                const response = await fetch('/api/odu-cards');
                const data = await response.json();
                
                const container = document.getElementById('cards-container');
                container.innerHTML = '';
                
                if (data.cards && data.cards.length > 0) {
                    const grid = document.createElement('div');
                    grid.className = 'cards-grid';
                    
                    data.cards.forEach(card => {
                        const cardElement = document.createElement('div');
                        cardElement.className = 'card';
                        
                        cardElement.innerHTML = \`
                            <div class="badge">\${card.type.toUpperCase()}</div>
                            <img src="\${card.url}" alt="\${card.name}" onerror="this.src='/static/images/placeholder-odu.png'">
                            <h3>\${card.name}</h3>
                            <p>\${card.meaning || 'Sacred wisdom and divine guidance'}</p>
                        \`;
                        
                        grid.appendChild(cardElement);
                    });
                    
                    container.appendChild(grid);
                } else {
                    container.innerHTML = '<div class="loading">No Odu cards found</div>';
                }
            } catch (error) {
                console.error('Error loading cards:', error);
                document.getElementById('cards-container').innerHTML = 
                    '<div class="loading">Error loading Odu cards</div>';
            }
        }
        
        // Load cards when page loads
        loadOduCards();
    </script>
</body>
</html>`;
      
      res.send(html);
    } catch (error) {
      console.error("Error serving Flask Odu interface:", error);
      res.status(500).send("Error loading Flask Odu interface");
    }
  });

  // Serve static files from the static directory
  app.use('/static', express.static('static'));

  console.log('Registered routes:');
  console.log('- /api/odu-cards');
  console.log('- /api/odu-256/complete');
  console.log('- /api/odu-256/categories');
  console.log('- /odu');
  console.log('- /static (static files)');

  // Authentic Odu Cards API endpoint (from manifest)
  app.get("/api/odu-cards-authentic", async (req, res) => {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      // Read the card manifest
      const manifestPath = path.join(process.cwd(), 'static/odu_cards/card_manifest.json');
      const manifestData = await fs.readFile(manifestPath, 'utf-8');
      const manifest = JSON.parse(manifestData);
      
      // Categorize cards into major and minor Odu
      const majorOduNumbers = [1, 17, 33, 49, 65, 81, 97, 113, 129, 145, 161, 177, 193, 209, 225, 241]; // Major Odu positions
      
      const categorizedManifest = {
        ...manifest,
        categories: {
          major: manifest.cards.filter((card: any) => majorOduNumbers.includes(card.number)),
          minor: manifest.cards.filter((card: any) => !majorOduNumbers.includes(card.number))
        }
      };

      res.json(categorizedManifest);
    } catch (error) {
      console.error("Error fetching authentic Odu cards:", error);
      res.status(500).json({ 
        message: "Failed to fetch authentic Odu cards",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function initializeOduDatabase() {
  // Check if Odus are already initialized with the full expanded set
  const existingOdus = await storage.getAllOdus();
  const expectedCount = oduDatabase.length;
  
  if (existingOdus.length < expectedCount) {
    console.log(`Initializing Odu database: ${existingOdus.length}/${expectedCount} entries found`);
    
    // Add missing Odu entries
    for (const oduData of oduDatabase) {
      const existingOdu = existingOdus.find(odu => odu.name === oduData.name);
      if (!existingOdu) {
        await storage.createOdu(oduData);
        console.log(`Added Odu: ${oduData.name}`);
      }
    }
    
    console.log(`Odu database initialization complete: ${expectedCount} total entries`);
  }
}

function generateOduForDate(date: string): number {
  // Generate a deterministic Odu ID based on the date for 365-day yearly cycle
  // This ensures the same date always gets the same Odu throughout years
  const dateObj = new Date(date);
  
  // Get day of year (1-365/366)
  const startOfYear = new Date(dateObj.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((dateObj.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // For traditional Ifa system with 256 Odu, we need to cycle through them
  // We'll use a combination of day of year and additional factors for distribution
  
  // Primary cycle: Distribute across 256 Odu
  let oduIndex = (dayOfYear - 1) % 256;
  
  // Add year variation to prevent same Odu on same calendar date every year
  const yearVariation = dateObj.getFullYear() % 16; // 16-year cycle for additional variation
  
  // Combine day of year with year variation
  oduIndex = (oduIndex + yearVariation) % 256;
  
  // For leap years, add slight adjustment for days after Feb 28
  if (isLeapYear(dateObj.getFullYear()) && dayOfYear > 59) { // After Feb 28
    oduIndex = (oduIndex + 1) % 256;
  }
  
  // Map to our available Odu (currently 16, will expand to 256)
  // For now, cycle through available Odu until we have all 256
  const availableOduCount = oduDatabase.length;
  const finalOduIndex = oduIndex % availableOduCount;
  
  return finalOduIndex + 1; // Odu IDs start from 1
}

async function initializeIfaLunarCalendar() {
  // Check if Ifa lunar prayers are already initialized
  const existingPrayers = await storage.getAllIfaLunarPrayers();
  
  if (existingPrayers.length < 365) {
    console.log(`Initializing Ifa Lunar Calendar: ${existingPrayers.length}/365 prayers found`);
    
    // Generate the complete 365-day lunar calendar
    const lunarCalendar = generateIfaLunarCalendar();
    
    // Add missing lunar prayer entries
    for (const lunarDay of lunarCalendar) {
      const existingPrayer = existingPrayers.find(prayer => prayer.dayOfYear === lunarDay.dayOfYear);
      if (!existingPrayer) {
        await storage.createIfaLunarPrayer({
          dayOfYear: lunarDay.dayOfYear,
          lunarMonth: lunarDay.lunarMonth,
          lunarDay: lunarDay.lunarDay,
          yorubaDate: lunarDay.yorubaDate,
          sacredOdu: lunarDay.sacredOdu,
          lunarPhase: lunarDay.lunarPhase,
          spiritualFocus: lunarDay.spiritualFocus,
          spiritualFocusYoruba: lunarDay.spiritualFocusYoruba,
          prayer: lunarDay.prayer,
          prayerYoruba: lunarDay.prayerYoruba,
          blessing: lunarDay.blessing,
          blessingYoruba: lunarDay.blessingYoruba,
          significance: lunarDay.significance,
          significanceYoruba: lunarDay.significanceYoruba
        });
        
        if (lunarDay.dayOfYear % 50 === 0) {
          console.log(`Added lunar prayers up to day ${lunarDay.dayOfYear}/365`);
        }
      }
    }
    
    console.log(`Ifa Lunar Calendar initialization complete: 365 daily prayers`);
  }
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}



// Initialize encyclopedia data
async function initializeEncyclopediaData() {
  try {
    const existingEntries = await storage.getAllEncyclopediaEntries();
    if (existingEntries.length === 0) {
      console.log("Initializing encyclopedia data...");
      
      // Import encyclopedia data
      const { encyclopediaData, hyperlinkableTermsData } = await import("./encyclopedia-data");
      const { db } = await import("./db");
      const { hyperlinkableTerms } = await import("@shared/schema");
      
      // Insert encyclopedia entries
      for (const entryData of encyclopediaData) {
        await storage.createEncyclopediaEntry(entryData);
      }
      
      // Insert hyperlinkable terms directly
      for (const termData of hyperlinkableTermsData) {
        await db.insert(hyperlinkableTerms).values(termData);
      }
      
      console.log(`Initialized ${encyclopediaData.length} encyclopedia entries and ${hyperlinkableTermsData.length} hyperlinkable terms`);
    }
  } catch (error) {
    console.error("Error initializing encyclopedia data:", error);
  }
}

// Call encyclopedia initialization
initializeEncyclopediaData();
