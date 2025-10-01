import { boolean, pgTable,timestamp , serial , integer , text } from "drizzle-orm/pg-core";
import { nutrients } from "./nutrients";
import { relations } from "drizzle-orm";
import { user } from "./auth.schema";
export const supplements = pgTable("supplements", {
	id: serial("id").primaryKey(),
	fatburner: boolean("fatburner").default(false),
	multiVitamin:  boolean("multiVitamin").default(false),
	zen:  boolean("zen").default(false),
	cla:  boolean("cla").default(false),
	magnesium:  boolean("magnesium").default(false),
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



export const supplementsRelations = relations(supplements, ({ one }) => ({
    nutrient: one(nutrients, {
        fields: [supplements.nutrientsId],
        references: [nutrients.id],
    }),
	user: one(user, {
		fields: [supplements.userId],
		references: [user.id],
	}),
}));