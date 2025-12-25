import { pgTable, text, serial, integer, boolean, date, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const odus = pgTable("odus", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameYoruba: text("name_yoruba").notNull(),
  subtitle: text("subtitle").notNull(),
  subtitleYoruba: text("subtitle_yoruba").notNull(),
  element: text("element").notNull(),
  elementYoruba: text("element_yoruba").notNull(),
  energy: text("energy").notNull(),
  energyYoruba: text("energy_yoruba").notNull(),
  message: text("message").notNull(),
  messageYoruba: text("message_yoruba").notNull(),
  guidance: jsonb("guidance").$type<string[]>().notNull(),
  guidanceYoruba: jsonb("guidance_yoruba").$type<string[]>().notNull(),
  reflection: text("reflection").notNull(),
  reflectionYoruba: text("reflection_yoruba").notNull(),
  pattern: jsonb("pattern").$type<boolean[][]>().notNull(), // 2D array for traditional pattern
  description: text("description").notNull(),
  descriptionYoruba: text("description_yoruba").notNull(),
  keywords: jsonb("keywords").$type<string[]>().notNull(),
  keywordsYoruba: jsonb("keywords_yoruba").$type<string[]>().notNull(),
  problems: jsonb("problems").$type<string[]>().default([]),
  problemsYoruba: jsonb("problems_yoruba").$type<string[]>().default([]),
  prayer: text("prayer").notNull().default(""),
  prayerYoruba: text("prayer_yoruba").notNull().default(""),
  eseIfa: text("ese_ifa").notNull().default(""),
      eseIfaYoruba: text("ese_ifa_yoruba").notNull().default(""),
    age: integer("age"),
    year: integer("year"),
    youthAdvice: text("youth_advice"), // Keep this line
 }); // This bracket on Line 35 should be the ONLY one closing the table


  id: serial("id").primaryKey(),
  date: text("date").notNull().unique(), // YYYY-MM-DD format
  oduId: integer("odu_id").notNull(),
  saved: boolean("saved").default(false),
});

export const dailyPrayers = pgTable("daily_prayers", {
  id: serial("id").primaryKey(),
  dayOfWeek: integer("day_of_week").notNull().unique(), // 0 = Sunday, 1 = Monday, etc.
  dayName: text("day_name").notNull(),
  dayNameYoruba: text("day_name_yoruba").notNull(),
  title: text("title").notNull(),
  titleYoruba: text("title_yoruba").notNull(),
  prayer: text("prayer").notNull(),
  prayerYoruba: text("prayer_yoruba").notNull(),
  meaning: text("meaning").notNull(),
  meaningYoruba: text("meaning_yoruba").notNull(),
  blessing: text("blessing").notNull(),
  blessingYoruba: text("blessing_yoruba").notNull(),
  eseIfa: text("ese_ifa").notNull().default(""),
  eseIfaYoruba: text("ese_ifa_yoruba").notNull().default(""),
});

export const ifaLunarPrayers = pgTable("ifa_lunar_prayers", {
  id: serial("id").primaryKey(),
  dayOfYear: integer("day_of_year").notNull().unique(), // 1-365
  lunarMonth: integer("lunar_month").notNull(), // 1-13
  lunarDay: integer("lunar_day").notNull(), // 1-28
  yorubaDate: text("yoruba_date").notNull(),
  sacredOdu: text("sacred_odu").notNull(),
  lunarPhase: text("lunar_phase").notNull(), // new, waxing, full, waning
  spiritualFocus: text("spiritual_focus").notNull(),
  spiritualFocusYoruba: text("spiritual_focus_yoruba").notNull(),
  prayer: text("prayer").notNull(),
  prayerYoruba: text("prayer_yoruba").notNull(),
  blessing: text("blessing").notNull(),
  blessingYoruba: text("blessing_yoruba").notNull(),
  significance: text("significance").notNull(),
  significanceYoruba: text("significance_yoruba").notNull(),
});

// Divination logs for users to save and review past readings
export const divinationLogs = pgTable("divination_logs", {
  id: serial("id").primaryKey(),
  userId: text("user_id"), // Optional user identification
  date: text("date").notNull(),
  oduId: integer("odu_id").references(() => odus.id).notNull(),
  question: text("question"), // What the user asked about
  context: text("context"), // Life situation context
  interpretation: text("interpretation"), // Personal interpretation notes
  outcome: text("outcome"), // What actually happened
  saved: boolean("saved").default(false),
  starred: boolean("starred").default(false),
  tags: text("tags").array(), // User-defined tags
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Ẹbọ (offerings/rituals) recommendations based on Odu
export const eboRecommendations = pgTable("ebo_recommendations", {
  id: serial("id").primaryKey(),
  oduId: integer("odu_id").references(() => odus.id).notNull(),
  category: text("category").notNull(), // "healing", "protection", "prosperity", etc.
  title: text("title").notNull(),
  titleYoruba: text("title_yoruba").notNull(),
  description: text("description").notNull(),
  descriptionYoruba: text("description_yoruba").notNull(),
  materials: text("materials").array().notNull(), // Required materials
  materialsYoruba: text("materials_yoruba").array().notNull(),
  herbs: text("herbs").array(), // Traditional herbs
  herbsYoruba: text("herbs_yoruba").array(),
  procedure: text("procedure").notNull(), // Step-by-step procedure
  procedureYoruba: text("procedure_yoruba").notNull(),
  timing: text("timing"), // Best time to perform
  timingYoruba: text("timing_yoruba"),
  precautions: text("precautions").array(), // Important precautions
  precautionsYoruba: text("precautions_yoruba").array(),
  difficulty: text("difficulty").notNull(), // "beginner", "intermediate", "advanced"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertOduSchema = createInsertSchema(odus).omit({
  id: true,
});

export const insertDailyReadingSchema = createInsertSchema(dailyReadings).omit({
  id: true,
});

export const insertDailyPrayerSchema = createInsertSchema(dailyPrayers).omit({
  id: true,
});

export const insertIfaLunarPrayerSchema = createInsertSchema(ifaLunarPrayers).omit({
  id: true,
});

export const insertDivinationLogSchema = createInsertSchema(divinationLogs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEboRecommendationSchema = createInsertSchema(eboRecommendations).omit({
  id: true,
  createdAt: true,
});

export type InsertOdu = z.infer<typeof insertOduSchema>;
export type Odu = typeof odus.$inferSelect;
export type InsertDailyReading = z.infer<typeof insertDailyReadingSchema>;
export type DailyReading = typeof dailyReadings.$inferSelect;
export type InsertDailyPrayer = z.infer<typeof insertDailyPrayerSchema>;
export type DailyPrayer = typeof dailyPrayers.$inferSelect;
export type InsertIfaLunarPrayer = z.infer<typeof insertIfaLunarPrayerSchema>;
export type IfaLunarPrayer = typeof ifaLunarPrayers.$inferSelect;
export type InsertDivinationLog = z.infer<typeof insertDivinationLogSchema>;
export type DivinationLog = typeof divinationLogs.$inferSelect;
export type InsertEboRecommendation = z.infer<typeof insertEboRecommendationSchema>;
export type EboRecommendation = typeof eboRecommendations.$inferSelect;

// Combined type for daily reading with Odu data
export type DailyReadingWithOdu = DailyReading & {
  odu: Odu;
};

export type DivinationLogWithOdu = DivinationLog & {
  odu: Odu;
};

export type EboRecommendationWithOdu = EboRecommendation & {
  odu: Odu;
};

// Learning Path and Achievement Tables
export const learningPaths = pgTable("learning_paths", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  orishaName: text("orisha_name").notNull(),
  currentLevel: text("current_level").default("beginner"),
  totalProgress: integer("total_progress").default(0),
  isCompleted: boolean("is_completed").default(false),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  lastActivityAt: timestamp("last_activity_at").defaultNow(),
  preferences: jsonb("preferences").default("{}"),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  badgeType: text("badge_type").notNull(),
  badgeName: text("badge_name").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(),
  earnedAt: timestamp("earned_at").defaultNow(),
  progress: integer("progress").default(100),
  category: text("category").default("general"),
  isRare: boolean("is_rare").default(false),
});

export const learningModules = pgTable("learning_modules", {
  id: serial("id").primaryKey(),
  pathId: integer("path_id").references(() => learningPaths.id).notNull(),
  moduleType: text("module_type").notNull(), // "pronunciation", "history", "practice", "quiz"
  title: text("title").notNull(),
  titleYoruba: text("title_yoruba"),
  content: text("content").notNull(),
  contentYoruba: text("content_yoruba"),
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
  score: integer("score").default(0),
  timeSpent: integer("time_spent").default(0),
  moduleOrder: integer("module_order").notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  moduleId: integer("module_id").references(() => learningModules.id).notNull(),
  status: text("status").default("not_started"), // "not_started", "in_progress", "completed"
  progress: integer("progress").default(0),
  score: integer("score").default(0),
  timeSpent: integer("time_spent").default(0),
  lastAccessed: timestamp("last_accessed").defaultNow(),
  attempts: integer("attempts").default(0),
  bestScore: integer("best_score").default(0),
});

// Insert schemas for learning system
export const insertLearningPathSchema = createInsertSchema(learningPaths).omit({
  id: true,
  startedAt: true,
  lastActivityAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  earnedAt: true,
});

export const insertLearningModuleSchema = createInsertSchema(learningModules).omit({
  id: true,
  completedAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastAccessed: true,
});

// Types for learning system
export type LearningPath = typeof learningPaths.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type LearningModule = typeof learningModules.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;

export type InsertLearningPath = z.infer<typeof insertLearningPathSchema>;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type InsertLearningModule = z.infer<typeof insertLearningModuleSchema>;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

// Combined types for learning system
export type LearningPathWithModules = LearningPath & {
  modules: LearningModule[];
  userProgress: UserProgress[];
  achievements: Achievement[];
};

export type ModuleWithProgress = LearningModule & {
  userProgress?: UserProgress;
};

// Enhanced Profile System Tables
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  name: text("name"),
  email: text("email"),
  spiritualName: text("spiritual_name"),
  dateOfBirth: date("date_of_birth"),
  location: text("location"),
  primaryOrisha: text("primary_orisha"),
  secondaryOrisha: text("secondary_orisha"),
  spiritualLevel: text("spiritual_level").default("beginner"), // beginner, intermediate, advanced
  joinedDate: timestamp("joined_date").defaultNow(),
  lastActiveDate: timestamp("last_active_date").defaultNow(),
  profileImageUrl: text("profile_image_url"),
  bio: text("bio"),
  spiritualGoals: jsonb("spiritual_goals").$type<string[]>().default([]),
  preferences: jsonb("preferences").default("{}"),
  achievements: jsonb("achievements").$type<string[]>().default([]),
  totalPracticeHours: integer("total_practice_hours").default(0),
  streak: integer("streak").default(0),
  longestStreak: integer("longest_streak").default(0),
});

export const notificationSettings = pgTable("notification_settings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  dailyReadings: boolean("daily_readings").default(true),
  weeklyInsights: boolean("weekly_insights").default(true),
  orishaFeastDays: boolean("orisha_feast_days").default(true),
  practiceReminders: boolean("practice_reminders").default(true),
  socialUpdates: boolean("social_updates").default(false),
  emailNotifications: boolean("email_notifications").default(true),
  pushNotifications: boolean("push_notifications").default(true),
  soundEnabled: boolean("sound_enabled").default(true),
  quietHours: jsonb("quiet_hours").default("{}"), // start/end times
  frequency: text("frequency").default("daily"), // daily, weekly, custom
  customDays: jsonb("custom_days").$type<number[]>().default([]), // days of week
  reminderTime: text("reminder_time").default("09:00"),
});

export const spiritualPractices = pgTable("spiritual_practices", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  practiceType: text("practice_type").notNull(), // meditation, prayer, ritual, study
  title: text("title").notNull(),
  description: text("description"),
  duration: integer("duration"), // in minutes
  orisha: text("orisha"),
  materials: jsonb("materials").$type<string[]>().default([]),
  location: text("location"),
  notes: text("notes"),
  mood: text("mood"), // before/after practice
  energy: integer("energy"), // 1-10 scale
  insights: text("insights"),
  completed: boolean("completed").default(false),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  tags: jsonb("tags").$type<string[]>().default([]),
});

export const socialConnections = pgTable("social_connections", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  followerId: text("follower_id").notNull(),
  status: text("status").default("pending"), // pending, accepted, blocked
  createdAt: timestamp("created_at").defaultNow(),
});

export const sharedInsights = pgTable("shared_insights", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  oduId: integer("odu_id").references(() => odus.id),
  orisha: text("orisha"),
  isPublic: boolean("is_public").default(false),
  likes: integer("likes").default(0),
  shares: integer("shares").default(0),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const calendarEvents = pgTable("calendar_events", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  eventType: text("event_type").notNull(), // ritual, feast_day, practice, reminder
  date: date("date").notNull(),
  time: text("time"),
  duration: integer("duration"), // in minutes
  orisha: text("orisha"),
  isRecurring: boolean("is_recurring").default(false),
  recurrencePattern: text("recurrence_pattern"), // daily, weekly, monthly, yearly
  reminder: boolean("reminder").default(true),
  reminderTime: integer("reminder_time").default(60), // minutes before
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orishaAssessments = pgTable("orisha_assessments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  assessmentType: text("assessment_type").default("personality"), // personality, elemental, spiritual
  responses: jsonb("responses").notNull(), // question-answer pairs
  results: jsonb("results").notNull(), // orisha scores and recommendations
  primaryOrisha: text("primary_orisha"),
  secondaryOrisha: text("secondary_orisha"),
  compatibility: integer("compatibility"), // percentage
  confidence: integer("confidence"), // percentage
  insights: text("insights"),
  recommendations: jsonb("recommendations").$type<string[]>().default([]),
  completedAt: timestamp("completed_at").defaultNow(),
  version: text("version").default("1.0"),
});

export const themeCustomizations = pgTable("theme_customizations", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  currentTheme: text("current_theme").default("light"),
  customColors: jsonb("custom_colors").default("{}"),
  fontFamily: text("font_family").default("Inter"),
  fontSize: text("font_size").default("medium"),
  orishaTheme: text("orisha_theme"), // theme based on primary orisha
  sacredSymbols: boolean("sacred_symbols").default(true),
  animations: boolean("animations").default(true),
  highContrast: boolean("high_contrast").default(false),
  reducedMotion: boolean("reduced_motion").default(false),
  customBackground: text("custom_background"),
  accentColor: text("accent_color").default("#d97706"),
});

export const audioPreferences = pgTable("audio_preferences", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  pronunciationEnabled: boolean("pronunciation_enabled").default(true),
  autoPlay: boolean("auto_play").default(false),
  volume: integer("volume").default(70), // 0-100
  voiceGender: text("voice_gender").default("any"), // male, female, any
  speechRate: text("speech_rate").default("normal"), // slow, normal, fast
  pronunciation_dialect: text("pronunciation_dialect").default("yoruba_nigeria"),
  backgroundSounds: boolean("background_sounds").default(false),
  soundTheme: text("sound_theme").default("traditional"), // traditional, modern, nature
  audioQuality: text("audio_quality").default("high"), // low, medium, high
  downloadForOffline: boolean("download_for_offline").default(false),
});

// Insert schemas for enhanced profile features
export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  joinedDate: true,
  lastActiveDate: true,
});

export const insertNotificationSettingsSchema = createInsertSchema(notificationSettings).omit({
  id: true,
});

export const insertSpiritualPracticeSchema = createInsertSchema(spiritualPractices).omit({
  id: true,
  createdAt: true,
});

export const insertSocialConnectionSchema = createInsertSchema(socialConnections).omit({
  id: true,
  createdAt: true,
});

export const insertSharedInsightSchema = createInsertSchema(sharedInsights).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCalendarEventSchema = createInsertSchema(calendarEvents).omit({
  id: true,
  createdAt: true,
});

export const insertOrishaAssessmentSchema = createInsertSchema(orishaAssessments).omit({
  id: true,
  completedAt: true,
});

export const insertThemeCustomizationSchema = createInsertSchema(themeCustomizations).omit({
  id: true,
});

export const insertAudioPreferencesSchema = createInsertSchema(audioPreferences).omit({
  id: true,
});

// Types for enhanced profile features
export type UserProfile = typeof userProfiles.$inferSelect;
export type NotificationSettings = typeof notificationSettings.$inferSelect;
export type SpiritualPractice = typeof spiritualPractices.$inferSelect;
export type SocialConnection = typeof socialConnections.$inferSelect;
export type SharedInsight = typeof sharedInsights.$inferSelect;
export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type OrishaAssessment = typeof orishaAssessments.$inferSelect;
export type ThemeCustomization = typeof themeCustomizations.$inferSelect;
export type AudioPreferences = typeof audioPreferences.$inferSelect;

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type InsertNotificationSettings = z.infer<typeof insertNotificationSettingsSchema>;
export type InsertSpiritualPractice = z.infer<typeof insertSpiritualPracticeSchema>;
export type InsertSocialConnection = z.infer<typeof insertSocialConnectionSchema>;
export type InsertSharedInsight = z.infer<typeof insertSharedInsightSchema>;
export type InsertCalendarEvent = z.infer<typeof insertCalendarEventSchema>;
export type InsertOrishaAssessment = z.infer<typeof insertOrishaAssessmentSchema>;
export type InsertThemeCustomization = z.infer<typeof insertThemeCustomizationSchema>;
export type InsertAudioPreferences = z.infer<typeof insertAudioPreferencesSchema>;

// Combined types for enhanced profile features
export type UserProfileWithSettings = UserProfile & {
  notificationSettings?: NotificationSettings;
  themeCustomization?: ThemeCustomization;
  audioPreferences?: AudioPreferences;
  recentPractices?: SpiritualPractice[];
  achievements?: Achievement[];
  assessments?: OrishaAssessment[];
};

export type SpiritualPracticeWithInsights = SpiritualPractice & {
  relatedOdu?: Odu;
};

export type SharedInsightWithOdu = SharedInsight & {
  odu?: Odu;
  author?: UserProfile;
};

export type CalendarEventWithDetails = CalendarEvent & {
  relatedPractices?: SpiritualPractice[];
};

// Learning Progress Tracking System
export const cosmologyProgress = pgTable("cosmology_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  sectionId: text("section_id").notNull(), // "spiritual_universe", "spirit_domains", "cosmic_laws", "realm_quiz"
  sectionTitle: text("section_title").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
  timeSpent: integer("time_spent"), // in seconds
  notes: text("notes"),
  language: text("language").default("english"), // "english" or "yoruba"
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCosmologyProgressSchema = createInsertSchema(cosmologyProgress).omit({
  id: true,
  completedAt: true,
  createdAt: true,
});

export type CosmologyProgress = typeof cosmologyProgress.$inferSelect;
export type InsertCosmologyProgress = z.infer<typeof insertCosmologyProgressSchema>;

// Re-export encyclopedia types
export * from "./encyclopedia-schema";
