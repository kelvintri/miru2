import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
// Create an enum for watch status
export const watchStatusEnum = pgEnum("watch_status", [
  "WATCHING",
  "COMPLETED",
  "ON_HOLD",
  "DROPPED",
  "PLAN_TO_WATCH",
]);

// Users table (to extend Supabase Auth)
export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(), // Maps to Supabase Auth user id
  username: text("username").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Anime list table
export const animeList = pgTable("anime_list", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  anilistId: integer("anilist_id").notNull(), // ID from Anilist API
  status: watchStatusEnum("status").notNull().default("PLAN_TO_WATCH"),
  score: integer("score").$defaultFn(() => sql`CASE WHEN score >= 0 AND score <= 10 THEN score END`),
  episodesWatched: integer("episodes_watched").default(0),
  totalEpisodes: integer("total_episodes"),
  startDate: timestamp("start_date"),
  finishDate: timestamp("finish_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Type definitions for your tables
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type AnimeListEntry = typeof animeList.$inferSelect;
export type NewAnimeListEntry = typeof animeList.$inferInsert; 