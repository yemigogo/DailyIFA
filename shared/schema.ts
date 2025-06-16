import { pgTable, text, serial, integer, boolean, date, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const odus = pgTable("odus", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subtitle: text("subtitle").notNull(),
  element: text("element").notNull(),
  energy: text("energy").notNull(),
  message: text("message").notNull(),
  guidance: jsonb("guidance").$type<string[]>().notNull(),
  reflection: text("reflection").notNull(),
  pattern: jsonb("pattern").$type<boolean[][]>().notNull(), // 2D array for traditional pattern
  description: text("description").notNull(),
  keywords: jsonb("keywords").$type<string[]>().notNull(),
});

export const dailyReadings = pgTable("daily_readings", {
  id: serial("id").primaryKey(),
  date: text("date").notNull().unique(), // YYYY-MM-DD format
  oduId: integer("odu_id").notNull(),
  saved: boolean("saved").default(false),
});

export const insertOduSchema = createInsertSchema(odus).omit({
  id: true,
});

export const insertDailyReadingSchema = createInsertSchema(dailyReadings).omit({
  id: true,
});

export type InsertOdu = z.infer<typeof insertOduSchema>;
export type Odu = typeof odus.$inferSelect;
export type InsertDailyReading = z.infer<typeof insertDailyReadingSchema>;
export type DailyReading = typeof dailyReadings.$inferSelect;

// Combined type for daily reading with Odu data
export type DailyReadingWithOdu = DailyReading & {
  odu: Odu;
};
