ALTER TABLE "health_tracker" ALTER COLUMN "nutrientsId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "health_tracker" ADD CONSTRAINT "health_tracker_nutrientsId_nutrients_id_fk" FOREIGN KEY ("nutrientsId") REFERENCES "public"."nutrients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health_tracker" DROP COLUMN "sugar";