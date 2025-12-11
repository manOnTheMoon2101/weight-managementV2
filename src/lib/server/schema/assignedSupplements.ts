import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { custom_supplements } from "./custom_supplements";
import { nutrients } from "./nutrients";
export const assignedSupplements = pgTable("assignedSupplements", {
	id: serial("id").primaryKey(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
	isActive: boolean("isActive").default(true),
	isDeleted: boolean("isDeleted").default(false),
	quantity: integer("quantity").default(0),
	nutrientsId: integer("nutrientsId")
		.notNull()
		.references(() => nutrients.id, { onDelete: "cascade" }),
	custom_supplementsId: integer("custom_supplementsId")
		.notNull()
		.references(() => custom_supplements.id, { onDelete: "cascade" }),
	userId: text("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const custom_supplementsRelations = relations(assignedSupplements, ({ one }) => ({
	custom_supplement: one(custom_supplements, {
		fields: [assignedSupplements.custom_supplementsId],
		references: [custom_supplements.id],
	}),
	nutrient: one(nutrients, {
		fields: [assignedSupplements.nutrientsId],
		references: [nutrients.id],
	}),
	user: one(user, {
		fields: [assignedSupplements.userId],
		references: [user.id],
	}),
}));
