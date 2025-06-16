import { odus, dailyReadings, type Odu, type InsertOdu, type DailyReading, type InsertDailyReading, type DailyReadingWithOdu } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private odus: Map<number, Odu>;
  private dailyReadings: Map<string, DailyReading>;
  private currentOduId: number;
  private currentReadingId: number;

  constructor() {
    this.odus = new Map();
    this.dailyReadings = new Map();
    this.currentOduId = 1;
    this.currentReadingId = 1;
  }

  async getAllOdus(): Promise<Odu[]> {
    return Array.from(this.odus.values());
  }

  async getOdu(id: number): Promise<Odu | undefined> {
    return this.odus.get(id);
  }

  async createOdu(insertOdu: InsertOdu): Promise<Odu> {
    const id = this.currentOduId++;
    const odu: Odu = { ...insertOdu, id };
    this.odus.set(id, odu);
    return odu;
  }

  async getDailyReading(date: string): Promise<DailyReadingWithOdu | undefined> {
    const reading = this.dailyReadings.get(date);
    if (!reading) return undefined;

    const odu = this.odus.get(reading.oduId);
    if (!odu) return undefined;

    return { ...reading, odu };
  }

  async createDailyReading(insertReading: InsertDailyReading): Promise<DailyReading> {
    const id = this.currentReadingId++;
    const reading: DailyReading = { ...insertReading, id };
    this.dailyReadings.set(reading.date, reading);
    return reading;
  }

  async getReadingHistory(limit = 10): Promise<DailyReadingWithOdu[]> {
    const readings = Array.from(this.dailyReadings.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    const readingsWithOdu: DailyReadingWithOdu[] = [];
    for (const reading of readings) {
      const odu = this.odus.get(reading.oduId);
      if (odu) {
        readingsWithOdu.push({ ...reading, odu });
      }
    }

    return readingsWithOdu;
  }

  async saveDailyReading(date: string): Promise<DailyReading | undefined> {
    const reading = this.dailyReadings.get(date);
    if (!reading) return undefined;

    const updatedReading = { ...reading, saved: true };
    this.dailyReadings.set(date, updatedReading);
    return updatedReading;
  }
}

export const storage = new MemStorage();
