import { 
  odus, dailyReadings, dailyPrayers, ifaLunarPrayers, divinationLogs, eboRecommendations,
  encyclopediaEntries, hyperlinkableTerms, encyclopediaProgress,
  learningPaths, achievements, learningModules, userProgress,
  type Odu, type InsertOdu, type DailyReading, type InsertDailyReading, type DailyReadingWithOdu,
  type DailyPrayer, type InsertDailyPrayer, type IfaLunarPrayer, type InsertIfaLunarPrayer,
  type DivinationLog, type InsertDivinationLog, type DivinationLogWithOdu,
  type EboRecommendation, type InsertEboRecommendation, type EboRecommendationWithOdu,
  type EncyclopediaEntry, type InsertEncyclopediaEntry, type HyperlinkableTerm,
  type EncyclopediaProgress, type InsertEncyclopediaProgress,
  type LearningPath, type InsertLearningPath, type Achievement, type InsertAchievement,
  type LearningModule, type InsertLearningModule, type UserProgress, type InsertUserProgress,
  type LearningPathWithModules, type ModuleWithProgress
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, ilike, sql, asc } from "drizzle-orm";

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
  
  // Learning Path methods
  getUserLearningPaths(userId: string): Promise<LearningPathWithModules[]>;
  createLearningPath(path: InsertLearningPath): Promise<LearningPath>;
  getLearningPath(userId: string, orishaName: string): Promise<LearningPathWithModules | undefined>;
  updateLearningPathProgress(pathId: number, progress: number): Promise<LearningPath>;
  completeLearningPath(pathId: number): Promise<LearningPath>;
  
  // Achievement methods
  getUserAchievements(userId: string): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  checkAndAwardAchievements(userId: string, action: string, context?: any): Promise<Achievement[]>;
  
  // Learning Module methods
  getModulesForPath(pathId: number): Promise<ModuleWithProgress[]>;
  createLearningModule(module: InsertLearningModule): Promise<LearningModule>;
  updateModuleProgress(userId: string, moduleId: number, progress: InsertUserProgress): Promise<UserProgress>;
  completeModule(userId: string, moduleId: number, score: number): Promise<UserProgress>;
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

  // Encyclopedia methods
  async getAllEncyclopediaEntries(): Promise<EncyclopediaEntry[]> {
    return await db.select().from(encyclopediaEntries)
      .where(eq(encyclopediaEntries.isPublished, true))
      .orderBy(encyclopediaEntries.title);
  }

  async getEncyclopediaEntry(slug: string): Promise<EncyclopediaEntry | undefined> {
    const result = await db.select().from(encyclopediaEntries)
      .where(and(
        eq(encyclopediaEntries.slug, slug),
        eq(encyclopediaEntries.isPublished, true)
      ))
      .limit(1);
    return result[0];
  }

  async getEncyclopediaEntriesByCategory(category: string): Promise<EncyclopediaEntry[]> {
    return await db.select().from(encyclopediaEntries)
      .where(and(
        eq(encyclopediaEntries.category, category),
        eq(encyclopediaEntries.isPublished, true)
      ))
      .orderBy(encyclopediaEntries.title);
  }

  async searchEncyclopediaEntries(query: string): Promise<EncyclopediaEntry[]> {
    const searchTerm = `%${query.toLowerCase()}%`;
    return await db.select().from(encyclopediaEntries)
      .where(and(
        eq(encyclopediaEntries.isPublished, true),
        or(
          ilike(encyclopediaEntries.title, searchTerm),
          ilike(encyclopediaEntries.shortDescription, searchTerm),
          ilike(encyclopediaEntries.fullContent, searchTerm)
        )
      ))
      .orderBy(encyclopediaEntries.title);
  }

  async getHyperlinkableTerms(): Promise<HyperlinkableTerm[]> {
    return await db.select().from(hyperlinkableTerms)
      .where(eq(hyperlinkableTerms.isActive, true))
      .orderBy(desc(sql`length(${hyperlinkableTerms.term})`));
  }

  async createEncyclopediaEntry(insertEntry: InsertEncyclopediaEntry): Promise<EncyclopediaEntry> {
    const result = await db.insert(encyclopediaEntries).values(insertEntry).returning();
    return result[0];
  }

  async markEncyclopediaAsRead(userId: string | null, entrySlug: string): Promise<void> {
    await db.insert(encyclopediaProgress).values({
      userId,
      entrySlug,
      isCompleted: true
    }).onConflictDoUpdate({
      target: [encyclopediaProgress.userId, encyclopediaProgress.entrySlug],
      set: {
        isCompleted: true,
        readAt: new Date()
      }
    });
  }

  // Learning Path methods implementation
  async getUserLearningPaths(userId: string): Promise<LearningPathWithModules[]> {
    const paths = await db.select().from(learningPaths).where(eq(learningPaths.userId, userId));
    
    const pathsWithModules: LearningPathWithModules[] = [];
    for (const path of paths) {
      const modules = await this.getModulesForPath(path.id);
      const userAchievements = await this.getUserAchievements(userId);
      const progressRecords = await db.select().from(userProgress)
        .where(eq(userProgress.userId, userId));
      
      pathsWithModules.push({
        ...path,
        modules: modules.map(m => m),
        userProgress: progressRecords,
        achievements: userAchievements.filter(a => a.category === path.orishaName.toLowerCase())
      });
    }
    
    return pathsWithModules;
  }

  async createLearningPath(insertPath: InsertLearningPath): Promise<LearningPath> {
    const [path] = await db.insert(learningPaths).values(insertPath).returning();
    return path;
  }

  async getLearningPath(userId: string, orishaName: string): Promise<LearningPathWithModules | undefined> {
    const [path] = await db.select().from(learningPaths)
      .where(and(eq(learningPaths.userId, userId), eq(learningPaths.orishaName, orishaName)));
    
    if (!path) return undefined;
    
    const modules = await this.getModulesForPath(path.id);
    const userAchievements = await this.getUserAchievements(userId);
    const progressRecords = await db.select().from(userProgress)
      .where(eq(userProgress.userId, userId));
    
    return {
      ...path,
      modules: modules.map(m => m),
      userProgress: progressRecords,
      achievements: userAchievements.filter(a => a.category === orishaName.toLowerCase())
    };
  }

  async updateLearningPathProgress(pathId: number, progress: number): Promise<LearningPath> {
    const [updatedPath] = await db.update(learningPaths)
      .set({ 
        totalProgress: progress,
        lastActivityAt: new Date()
      })
      .where(eq(learningPaths.id, pathId))
      .returning();
    return updatedPath;
  }

  async completeLearningPath(pathId: number): Promise<LearningPath> {
    const [completedPath] = await db.update(learningPaths)
      .set({ 
        isCompleted: true,
        completedAt: new Date(),
        totalProgress: 100,
        lastActivityAt: new Date()
      })
      .where(eq(learningPaths.id, pathId))
      .returning();
    return completedPath;
  }

  // Achievement methods implementation
  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return await db.select().from(achievements)
      .where(eq(achievements.userId, userId))
      .orderBy(desc(achievements.earnedAt));
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const [achievement] = await db.insert(achievements).values(insertAchievement).returning();
    return achievement;
  }

  async checkAndAwardAchievements(userId: string, action: string, context?: any): Promise<Achievement[]> {
    const newAchievements: Achievement[] = [];
    const existingAchievements = await this.getUserAchievements(userId);
    const earnedBadgeTypes = existingAchievements.map(a => a.badgeType);

    // Define achievement criteria and award logic
    const achievementDefinitions = [
      {
        badgeType: 'first_orisha',
        condition: action === 'start_learning_path',
        badgeName: 'Spiritual Seeker',
        description: 'Started your first Orisha learning journey',
        iconName: 'Crown',
        category: 'milestone',
        isRare: false
      },
      {
        badgeType: 'pronunciation_master',
        condition: action === 'complete_pronunciation' && context?.score >= 90,
        badgeName: 'Voice of Tradition',
        description: 'Mastered authentic Yoruba pronunciation',
        iconName: 'Volume2',
        category: 'skill',
        isRare: false
      },
      {
        badgeType: 'complete_path',
        condition: action === 'complete_learning_path',
        badgeName: 'Orisha Devotee',
        description: `Completed the ${context?.orishaName} learning path`,
        iconName: 'CheckCircle',
        category: context?.orishaName?.toLowerCase() || 'general',
        isRare: false
      },
      {
        badgeType: 'authentic_listener',
        condition: action === 'listen_authentic_audio',
        badgeName: 'Authentic Voice Keeper',
        description: 'Listened to authentic Nigerian Yoruba pronunciations',
        iconName: 'Headphones',
        category: 'cultural',
        isRare: true
      },
      {
        badgeType: 'five_orisha_master',
        condition: action === 'complete_learning_path' && context?.completedPaths >= 5,
        badgeName: 'Orisha Council Sage',
        description: 'Mastered 5 different Orisha learning paths',
        iconName: 'Star',
        category: 'mastery',
        isRare: true
      }
    ];

    for (const achievement of achievementDefinitions) {
      if (achievement.condition && !earnedBadgeTypes.includes(achievement.badgeType)) {
        const newAchievement = await this.createAchievement({
          userId,
          badgeType: achievement.badgeType,
          badgeName: achievement.badgeName,
          description: achievement.description,
          iconName: achievement.iconName,
          category: achievement.category,
          isRare: achievement.isRare
        });
        newAchievements.push(newAchievement);
      }
    }

    return newAchievements;
  }

  // Learning Module methods implementation
  async getModulesForPath(pathId: number): Promise<ModuleWithProgress[]> {
    const modules = await db.select().from(learningModules)
      .where(eq(learningModules.pathId, pathId))
      .orderBy(asc(learningModules.moduleOrder));
    
    const modulesWithProgress: ModuleWithProgress[] = [];
    for (const module of modules) {
      const [progress] = await db.select().from(userProgress)
        .where(eq(userProgress.moduleId, module.id))
        .limit(1);
      
      modulesWithProgress.push({
        ...module,
        userProgress: progress
      });
    }
    
    return modulesWithProgress;
  }

  async createLearningModule(insertModule: InsertLearningModule): Promise<LearningModule> {
    const [module] = await db.insert(learningModules).values(insertModule).returning();
    return module;
  }

  async updateModuleProgress(userId: string, moduleId: number, progressData: InsertUserProgress): Promise<UserProgress> {
    const [progress] = await db.insert(userProgress)
      .values({
        ...progressData,
        userId,
        moduleId
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.moduleId],
        set: {
          progress: progressData.progress || 0,
          status: progressData.status || 'in_progress',
          timeSpent: progressData.timeSpent || 0,
          lastAccessed: new Date(),
          attempts: sql`${userProgress.attempts} + 1`
        }
      })
      .returning();
    return progress;
  }

  async completeModule(userId: string, moduleId: number, score: number): Promise<UserProgress> {
    const [progress] = await db.insert(userProgress)
      .values({
        userId,
        moduleId,
        status: 'completed',
        progress: 100,
        score,
        bestScore: score
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.moduleId],
        set: {
          status: 'completed',
          progress: 100,
          score,
          bestScore: sql`GREATEST(${userProgress.bestScore}, ${score})`,
          lastAccessed: new Date()
        }
      })
      .returning();
    return progress;
  }
}

export const storage = new DatabaseStorage();
