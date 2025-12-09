import { relations } from "drizzle-orm";
import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
export const custom_supplements = pgTable("custom_supplements", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	color: text("color").default("#FFFFFF").notNull(),
	type: text("type").notNull().default("Capsule"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
	isActive: boolean("isActive").default(true),
	isDeleted: boolean("isDeleted").default(false),
	userId: text("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const custome_supplementsRelations = relations(custom_supplements, ({ one }) => ({
	user: one(user, {
		fields: [custom_supplements.userId],
		references: [user.id],
	}),
}));
