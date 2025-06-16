import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { oduDatabase } from "./data/odu-database";
import { insertDailyReadingSchema } from "@shared/schema";
import { format } from "date-fns";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize the Odu database
  await initializeOduDatabase();

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

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
