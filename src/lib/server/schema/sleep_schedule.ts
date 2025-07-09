import { boolean, pgTable, text, timestamp , time, integer } from "drizzle-orm/pg-core";


export const sleep_schedule = pgTable("sleep_schedule", {
	id: text("id").primaryKey(),
	time: time("sleep").default("08:00:00"),
	score:  integer("score").default(0),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
    isActive:  boolean("isActive").default(true),
    isDeleted:  boolean("isDeleted").default(false),
    userId: text("userId")
});