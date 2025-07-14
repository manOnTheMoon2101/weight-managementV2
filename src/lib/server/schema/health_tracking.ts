import { boolean, pgTable, timestamp,integer ,serial} from "drizzle-orm/pg-core";
import { nutrients } from "./nutrients";

export const health_tracker = pgTable("health_tracker", {
	id: serial("id").primaryKey(),
	weight: integer("weight").default(0).notNull(),
    water: integer("water").default(0),
    caloriesBurned: integer("caloriesBurned").default(0),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
    isActive:  boolean("isActive").default(true),
    isDeleted:  boolean("isDeleted").default(false),
    nutrientsId: integer("nutrientsId")
		.notNull()
		.references(() => nutrients.id, { onDelete: "cascade" }),
});