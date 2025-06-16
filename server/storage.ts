import { odus, dailyReadings, type Odu, type InsertOdu, type DailyReading, type InsertDailyReading, type DailyReadingWithOdu } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Odu methods
  getAllOdus(): Promise<Odu[]>;
  getOdu(id: number): Promise<Odu | undefined>;
  createOdu(odu: InsertOdu): Promise<Odu>;
  
  // Daily reading methods
  getDailyReading(date: string): Promise<DailyReadingWithOdu | undefined>;
  createDailyReading(reading: InsertDailyReading): Promise<DailyReading>;
  getReadingHistory(limit?: number): Promise<DailyReadingWithOdu[]>;
  saveDailyReading(date: string): Promise<DailyReading | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getAllOdus(): Promise<Odu[]> {
    return await db.select().from(odus);
  }

  async getOdu(id: number): Promise<Odu | undefined> {
    const [odu] = await db.select().from(odus).where(eq(odus.id, id));
    return odu || undefined;
  }

  async createOdu(insertOdu: InsertOdu): Promise<Odu> {
    const [odu] = await db
      .insert(odus)
      .values(insertOdu)
      .returning();
    return odu;
  }

  async getDailyReading(date: string): Promise<DailyReadingWithOdu | undefined> {
    const [result] = await db
      .select()
      .from(dailyReadings)
      .leftJoin(odus, eq(dailyReadings.oduId, odus.id))
      .where(eq(dailyReadings.date, date));

    if (!result || !result.odus) return undefined;

    return {
      ...result.daily_readings,
      odu: result.odus
    };
  }

  async createDailyReading(insertReading: InsertDailyReading): Promise<DailyReading> {
    const [reading] = await db
      .insert(dailyReadings)
      .values(insertReading)
      .returning();
    return reading;
  }

  async getReadingHistory(limit = 10): Promise<DailyReadingWithOdu[]> {
    const results = await db
      .select()
      .from(dailyReadings)
      .leftJoin(odus, eq(dailyReadings.oduId, odus.id))
      .orderBy(desc(dailyReadings.date))
      .limit(limit);

    return results
      .filter(result => result.odus)
      .map(result => ({
        ...result.daily_readings,
        odu: result.odus!
      }));
  }

  async saveDailyReading(date: string): Promise<DailyReading | undefined> {
    const [reading] = await db
      .update(dailyReadings)
      .set({ saved: true })
      .where(eq(dailyReadings.date, date))
      .returning();
    return reading || undefined;
  }
}

export const storage = new DatabaseStorage();
