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
        const newReading = await storage.createDailyReading({
          date,
          oduId,
          saved: false
        });
        
        reading = await storage.getDailyReading(date);
      }

      res.json(reading);
    } catch (error) {
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

  const httpServer = createServer(app);
  return httpServer;
}

async function initializeOduDatabase() {
  // Check if Odus are already initialized
  const existingOdus = await storage.getAllOdus();
  if (existingOdus.length === 0) {
    // Initialize with the Odu database
    for (const oduData of oduDatabase) {
      await storage.createOdu(oduData);
    }
  }
}

function generateOduForDate(date: string): number {
  // Generate a deterministic Odu ID based on the date
  // This ensures the same date always gets the same Odu
  const dateNum = new Date(date).getTime();
  const oduIndex = Math.abs(dateNum) % oduDatabase.length;
  return oduIndex + 1; // Odu IDs start from 1
}
