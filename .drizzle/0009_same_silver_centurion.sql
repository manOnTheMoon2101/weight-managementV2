ALTER TABLE "supplements" ALTER COLUMN "nutrientsId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "supplements" ALTER COLUMN "nutrientsId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sleep_schedule" ALTER COLUMN "nutrientsId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "sleep_schedule" ALTER COLUMN "nutrientsId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "supplements" ADD CONSTRAINT "supplements_nutrientsId_nutrients_id_fk" FOREIGN KEY ("nutrientsId") REFERENCES "public"."nutrients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sleep_schedule" ADD CONSTRAINT "sleep_schedule_nutrientsId_nutrients_id_fk" FOREIGN KEY ("nutrientsId") REFERENCES "public"."nutrients"("id") ON DELETE cascade ON UPDATE no action;