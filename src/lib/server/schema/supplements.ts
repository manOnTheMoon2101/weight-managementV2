import { boolean, pgTable, text, timestamp , serial } from "drizzle-orm/pg-core";


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
    nutrientsId: text("nutrientsId")
});