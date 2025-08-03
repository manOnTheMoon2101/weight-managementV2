import { boolean, pgTable, text, timestamp,integer,serial } from "drizzle-orm/pg-core";
import {user} from "./auth.schema"
import { relations } from "drizzle-orm";

export const limits = pgTable("limits", {
	id: serial("id").primaryKey(),
	fatLimit: integer("fatLimit").default(0),
    carbsLimit: integer("carbsLimit").default(0),
    proteinLimit: integer("proteinLimit").default(0),
    sugarLimit: integer("sugarLimit").default(0),
    caloriesLimit: integer("caloriesLimit").default(0),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
    isActive:  boolean("isActive").default(true),
    isDeleted:  boolean("isDeleted").default(false),
    userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});



export const userLimits = relations(limits, ({ many }) => ({
    user:many(user),
}));