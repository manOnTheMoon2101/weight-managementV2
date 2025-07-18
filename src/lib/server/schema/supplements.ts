import { boolean, pgTable,timestamp , serial , integer } from "drizzle-orm/pg-core";
import { nutrients } from "./nutrients";
import { relations } from "drizzle-orm";

export const supplements = pgTable("supplements", {
	id: serial("id").primaryKey(),
	fatburner: boolean("fatburner").default(false),
	multiVitamin:  boolean("multiVitamin").default(false),
	appleCider:  boolean("appleCider").default(false),
	cla:  boolean("cla").default(false),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
    isActive:  boolean("isActive").default(true),
    isDeleted:  boolean("isDeleted").default(false),
	nutrientsId: integer("nutrientsId")
	.notNull()
	.references(() => nutrients.id, { onDelete: "cascade" }),
});



export const supplementsRelations = relations(supplements, ({ one }) => ({
    nutrient: one(nutrients, {
        fields: [supplements.nutrientsId],
        references: [nutrients.id],
    }),
}));