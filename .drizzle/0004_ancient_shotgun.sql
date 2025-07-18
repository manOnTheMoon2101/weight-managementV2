ALTER TABLE "nutrients" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "supplements" ADD COLUMN "nutrientsId" text;--> statement-breakpoint
ALTER TABLE "health_tracker" ADD COLUMN "nutrientsId" text;--> statement-breakpoint
ALTER TABLE "sleep_schedule" ADD COLUMN "nutrientsId" text;--> statement-breakpoint
ALTER TABLE "nutrients" ADD CONSTRAINT "nutrients_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplements" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "health_tracker" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "sleep_schedule" DROP COLUMN "userId";