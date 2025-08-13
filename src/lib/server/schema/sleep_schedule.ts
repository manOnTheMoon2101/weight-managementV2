import { boolean, pgTable,timestamp , time, integer,serial , text } from "drizzle-orm/pg-core";
import { nutrients } from "./nutrients";
import { user } from "./auth.schema";
import { relations } from "drizzle-orm";


export const sleep_schedule = pgTable("sleep_schedule", {
	id: serial("id").primaryKey(),
	time: time("time").default("08:00:00"),
	score:  integer("score").default(0),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
    isActive:  boolean("isActive").default(true),
    isDeleted:  boolean("isDeleted").default(false),
    nutrientsId: integer("nutrientsId")
		.notNull()
		.references(() => nutrients.id, { onDelete: "cascade" }),
        userId: text("userId")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});


export const sleepScheudlueRelations = relations(sleep_schedule, ({ one }) => ({
    nutrient: one(nutrients, {
        fields: [sleep_schedule.nutrientsId],
        references: [nutrients.id],
    }),
    user: one(user, {
		fields: [sleep_schedule.userId],
		references: [user.id],
	}),
}));