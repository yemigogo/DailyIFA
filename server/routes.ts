import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

import { oduDatabase } from "./data/odu-database";
import { insertDailyReadingSchema } from "@shared/schema";
import { format } from "date-fns";
import { generateIfaLunarCalendar } from "./data/ifa-lunar-calendar";

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
