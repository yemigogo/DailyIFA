import { pgTable, text, serial, integer, boolean, date, jsonb } from "drizzle-orm/pg-core";
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
});

export const dailyReadings = pgTable("daily_readings", {
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

export type InsertOdu = z.infer<typeof insertOduSchema>;
export type Odu = typeof odus.$inferSelect;
export type InsertDailyReading = z.infer<typeof insertDailyReadingSchema>;
export type DailyReading = typeof dailyReadings.$inferSelect;
export type InsertDailyPrayer = z.infer<typeof insertDailyPrayerSchema>;
export type DailyPrayer = typeof dailyPrayers.$inferSelect;
export type InsertIfaLunarPrayer = z.infer<typeof insertIfaLunarPrayerSchema>;
export type IfaLunarPrayer = typeof ifaLunarPrayers.$inferSelect;

// Combined type for daily reading with Odu data
export type DailyReadingWithOdu = DailyReading & {
  odu: Odu;
};
