import { boolean, pgTable, text, timestamp,integer } from "drizzle-orm/pg-core";

export const nutrients = pgTable("nutrients", {
	id: text("id").primaryKey(),
	fat: integer("fat").default(0),
    carbs: integer("carbs").default(0),
    protein: integer("protein").default(0),
    sugar: integer("sugar").default(0),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
    isActive:  boolean("isActive").default(true),
    isDeleted:  boolean("isDeleted").default(false),
    userId: text("userId")
});