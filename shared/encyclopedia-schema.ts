import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Cultural Encyclopedia Entries
export const encyclopediaEntries = pgTable("encyclopedia_entries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // "orisha", "concept", "practice", "history", "symbol"
  shortDescription: text("short_description").notNull(),
  fullContent: text("full_content").notNull(),
  yorubaTerms: text("yoruba_terms").array().default([]),
  relatedEntries: text("related_entries").array().default([]), // slugs of related entries
  tags: text("tags").array().default([]),
  difficulty: text("difficulty").notNull().default("beginner"), // "beginner", "intermediate", "advanced"
  readingTime: text("reading_time").notNull().default("2 min"),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// Hyperlinked Terms - tracks which terms should be linked throughout the app
export const hyperlinkableTerms = pgTable("hyperlinkable_terms", {
  id: serial("id").primaryKey(),
  term: text("term").notNull().unique(),
  encyclopediaSlug: text("encyclopedia_slug").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// User reading progress
export const encyclopediaProgress = pgTable("encyclopedia_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id"), // Will be null for anonymous users
  entrySlug: text("entry_slug").notNull(),
  isCompleted: boolean("is_completed").notNull().default(false),
  readAt: timestamp("read_at").defaultNow().notNull()
});

// Schema types
export const insertEncyclopediaEntrySchema = createInsertSchema(encyclopediaEntries).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertHyperlinkableTermSchema = createInsertSchema(hyperlinkableTerms).omit({
  id: true,
  createdAt: true
});

export const insertEncyclopediaProgressSchema = createInsertSchema(encyclopediaProgress).omit({
  id: true,
  readAt: true
});

export type EncyclopediaEntry = typeof encyclopediaEntries.$inferSelect;
export type InsertEncyclopediaEntry = z.infer<typeof insertEncyclopediaEntrySchema>;
export type HyperlinkableTerm = typeof hyperlinkableTerms.$inferSelect;
export type InsertHyperlinkableTerm = z.infer<typeof insertHyperlinkableTermSchema>;
export type EncyclopediaProgress = typeof encyclopediaProgress.$inferSelect;
export type InsertEncyclopediaProgress = z.infer<typeof insertEncyclopediaProgressSchema>;