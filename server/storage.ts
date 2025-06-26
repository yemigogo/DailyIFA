import { 
  odus, dailyReadings, dailyPrayers, ifaLunarPrayers, divinationLogs, eboRecommendations,
  type Odu, type InsertOdu, type DailyReading, type InsertDailyReading, type DailyReadingWithOdu,
  type DailyPrayer, type InsertDailyPrayer, type IfaLunarPrayer, type InsertIfaLunarPrayer,
  type DivinationLog, type InsertDivinationLog, type DivinationLogWithOdu,
  type EboRecommendation, type InsertEboRecommendation, type EboRecommendationWithOdu
} from "@shared/schema";
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
  
  // Problem search methods
  searchOduByProblem(problem: string): Promise<Odu[]>;
  
  // Daily prayer methods
  getDailyPrayer(dayOfWeek: number): Promise<DailyPrayer | undefined>;
  getAllDailyPrayers(): Promise<DailyPrayer[]>;
  
  // Ifa lunar prayer methods
  getIfaLunarPrayer(dayOfYear: number): Promise<IfaLunarPrayer | undefined>;
  createIfaLunarPrayer(prayer: InsertIfaLunarPrayer): Promise<IfaLunarPrayer>;
  getAllIfaLunarPrayers(): Promise<IfaLunarPrayer[]>;
  
  // Divination log methods
  getDivinationLogs(userId?: string, limit?: number): Promise<DivinationLogWithOdu[]>;
  createDivinationLog(log: InsertDivinationLog): Promise<DivinationLog>;
  updateDivinationLog(id: number, updates: Partial<DivinationLog>): Promise<DivinationLog>;
  deleteDivinationLog(id: number): Promise<void>;
  
  // Ebo recommendation methods
  getEboRecommendations(oduId: number): Promise<EboRecommendation[]>;
  createEboRecommendation(ebo: InsertEboRecommendation): Promise<EboRecommendation>;
  getAllEboRecommendations(): Promise<EboRecommendationWithOdu[]>;
  
  // Encyclopedia methods
  getAllEncyclopediaEntries(): Promise<EncyclopediaEntry[]>;
  getEncyclopediaEntry(slug: string): Promise<EncyclopediaEntry | undefined>;
  getEncyclopediaEntriesByCategory(category: string): Promise<EncyclopediaEntry[]>;
  searchEncyclopediaEntries(query: string): Promise<EncyclopediaEntry[]>;
  getHyperlinkableTerms(): Promise<HyperlinkableTerm[]>;
  createEncyclopediaEntry(entry: InsertEncyclopediaEntry): Promise<EncyclopediaEntry>;
  markEncyclopediaAsRead(userId: string | null, entrySlug: string): Promise<void>;
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

  async searchOduByProblem(problem: string): Promise<Odu[]> {
    // Search for Odu that contain the problem in either English or Yoruba problems arrays
    const allOdus = await this.getAllOdus();
    
    return allOdus.filter(odu => {
      const englishProblems = odu.problems || [];
      const yorubaProblems = odu.problemsYoruba || [];
      
      const problemLower = problem.toLowerCase();
      
      return englishProblems.some(p => p.toLowerCase().includes(problemLower)) ||
             yorubaProblems.some(p => p.toLowerCase().includes(problemLower));
    });
  }

  async getDailyPrayer(dayOfWeek: number): Promise<DailyPrayer | undefined> {
    const [prayer] = await db.select().from(dailyPrayers).where(eq(dailyPrayers.dayOfWeek, dayOfWeek));
    return prayer || undefined;
  }

  async getAllDailyPrayers(): Promise<DailyPrayer[]> {
    return await db.select().from(dailyPrayers).orderBy(dailyPrayers.dayOfWeek);
  }

  async getIfaLunarPrayer(dayOfYear: number): Promise<IfaLunarPrayer | undefined> {
    const [prayer] = await db.select().from(ifaLunarPrayers).where(eq(ifaLunarPrayers.dayOfYear, dayOfYear));
    return prayer || undefined;
  }

  async createIfaLunarPrayer(insertPrayer: InsertIfaLunarPrayer): Promise<IfaLunarPrayer> {
    const [prayer] = await db
      .insert(ifaLunarPrayers)
      .values(insertPrayer)
      .returning();
    return prayer;
  }

  async getAllIfaLunarPrayers(): Promise<IfaLunarPrayer[]> {
    return await db.select().from(ifaLunarPrayers).orderBy(ifaLunarPrayers.dayOfYear);
  }

  // Divination log methods
  async getDivinationLogs(userId?: string, limit = 20): Promise<DivinationLogWithOdu[]> {
    const query = db
      .select({
        id: divinationLogs.id,
        userId: divinationLogs.userId,
        date: divinationLogs.date,
        oduId: divinationLogs.oduId,
        question: divinationLogs.question,
        context: divinationLogs.context,
        interpretation: divinationLogs.interpretation,
        outcome: divinationLogs.outcome,
        saved: divinationLogs.saved,
        starred: divinationLogs.starred,
        tags: divinationLogs.tags,
        createdAt: divinationLogs.createdAt,
        updatedAt: divinationLogs.updatedAt,
        odu: odus
      })
      .from(divinationLogs)
      .innerJoin(odus, eq(divinationLogs.oduId, odus.id))
      .orderBy(desc(divinationLogs.createdAt))
      .limit(limit);

    if (userId) {
      query.where(eq(divinationLogs.userId, userId));
    }

    return await query;
  }

  async createDivinationLog(insertLog: InsertDivinationLog): Promise<DivinationLog> {
    const [log] = await db
      .insert(divinationLogs)
      .values(insertLog)
      .returning();
    return log;
  }

  async updateDivinationLog(id: number, updates: Partial<DivinationLog>): Promise<DivinationLog> {
    const [log] = await db
      .update(divinationLogs)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(divinationLogs.id, id))
      .returning();
    return log;
  }

  async deleteDivinationLog(id: number): Promise<void> {
    await db.delete(divinationLogs).where(eq(divinationLogs.id, id));
  }

  // Ebo recommendation methods
  async getEboRecommendations(oduId: number): Promise<EboRecommendation[]> {
    return await db
      .select()
      .from(eboRecommendations)
      .where(eq(eboRecommendations.oduId, oduId))
      .orderBy(eboRecommendations.category, eboRecommendations.difficulty);
  }

  async createEboRecommendation(insertEbo: InsertEboRecommendation): Promise<EboRecommendation> {
    const [ebo] = await db
      .insert(eboRecommendations)
      .values(insertEbo)
      .returning();
    return ebo;
  }

  async getAllEboRecommendations(): Promise<EboRecommendationWithOdu[]> {
    return await db
      .select({
        id: eboRecommendations.id,
        oduId: eboRecommendations.oduId,
        category: eboRecommendations.category,
        title: eboRecommendations.title,
        titleYoruba: eboRecommendations.titleYoruba,
        description: eboRecommendations.description,
        descriptionYoruba: eboRecommendations.descriptionYoruba,
        materials: eboRecommendations.materials,
        materialsYoruba: eboRecommendations.materialsYoruba,
        herbs: eboRecommendations.herbs,
        herbsYoruba: eboRecommendations.herbsYoruba,
        procedure: eboRecommendations.procedure,
        procedureYoruba: eboRecommendations.procedureYoruba,
        timing: eboRecommendations.timing,
        timingYoruba: eboRecommendations.timingYoruba,
        precautions: eboRecommendations.precautions,
        precautionsYoruba: eboRecommendations.precautionsYoruba,
        difficulty: eboRecommendations.difficulty,
        createdAt: eboRecommendations.createdAt,
        odu: odus
      })
      .from(eboRecommendations)
      .innerJoin(odus, eq(eboRecommendations.oduId, odus.id))
      .orderBy(eboRecommendations.category, eboRecommendations.difficulty);
  }
}

export const storage = new DatabaseStorage();
