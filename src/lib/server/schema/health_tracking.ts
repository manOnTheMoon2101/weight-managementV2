import { boolean, pgTable, text, timestamp,integer,time } from "drizzle-orm/pg-core";

export const health_tracker = pgTable("health_tracker", {
	id: text("id").primaryKey(),
	weight: integer("weight").default(0).notNull(),
    water: integer("water").default(0),
    sleep: time("sleep").default("08:00:00"),
    sugar: integer("sugar").default(0),
    caloriesBurned: integer("caloriesBurned").default(0),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
    isActive:  boolean("isActive").default(true),
    isDeleted:  boolean("isDeleted").default(false),
    userId: text("userId")
});