import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, timestamp, text } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { nutrients } from "./nutrients";


export const health_tracker = pgTable("health_tracker", {
	id: serial("id").primaryKey(),
	weight: integer("weight").default(0).notNull(),
	water: integer("water").default(0),
	steps: integer("steps").default(0),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
	isActive: boolean("isActive").default(true),
	isDeleted: boolean("isDeleted").default(false),
	nutrientsId: integer("nutrientsId")
		.notNull()
		.references(() => nutrients.id, { onDelete: "cascade" }),
	userId: text("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const healthTrackingRelations = relations(health_tracker, ({ one }) => ({
	nutrient: one(nutrients, {
		fields: [health_tracker.nutrientsId],
		references: [nutrients.id],
	}),
	user: one(user, {
		fields: [health_tracker.userId],
		references: [user.id],
	}),
}));
