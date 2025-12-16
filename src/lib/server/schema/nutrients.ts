import { boolean, pgTable, text, timestamp,integer,serial } from "drizzle-orm/pg-core";
import {user} from "./auth.schema"
import { relations } from "drizzle-orm";
import { supplements } from "./supplements";
import { health_tracker } from "./health_tracking";
import { sleep_schedule } from "./sleep_schedule";
import { assignedSupplements } from "./assignedSupplements";

export const nutrients = pgTable("nutrients", {
	id: serial("id").primaryKey(),
	fat: integer("fat").default(0),
    carbs: integer("carbs").default(0),
    protein: integer("protein").default(0),
    sugar: integer("sugar").default(0),
    calories: integer("calories").default(0),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
    isActive:  boolean("isActive").default(true),
    isDeleted:  boolean("isDeleted").default(false),
    userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});



export const nutrientsRelations = relations(nutrients, ({ many }) => ({
    supplements: many(supplements),
    user:many(user),
    health_tracker:many(health_tracker),
    sleep_schedule:many(sleep_schedule),
    assignedSupplements: many(assignedSupplements)
}));