import { boolean, pgTable,timestamp , time, integer,serial } from "drizzle-orm/pg-core";
import { nutrients } from "./nutrients";

export const sleep_schedule = pgTable("sleep_schedule", {
	id: serial("id").primaryKey(),
	time: time("sleep").default("08:00:00"),
	score:  integer("score").default(0),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
    isActive:  boolean("isActive").default(true),
    isDeleted:  boolean("isDeleted").default(false),
    nutrientsId: integer("nutrientsId")
		.notNull()
		.references(() => nutrients.id, { onDelete: "cascade" }),
});