CREATE TABLE "nutrients" (
	"id" text PRIMARY KEY NOT NULL,
	"fat" integer DEFAULT 0,
	"carbs" integer DEFAULT 0,
	"protein" integer DEFAULT 0,
	"sugar" integer DEFAULT 0,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"isActive" boolean DEFAULT true,
	"isDeleted" boolean DEFAULT false,
	"userId" text
);
--> statement-breakpoint
CREATE TABLE "health_tracker" (
	"id" text PRIMARY KEY NOT NULL,
	"weight" integer DEFAULT 0 NOT NULL,
	"water" integer DEFAULT 0,
	"sugar" integer DEFAULT 0,
	"caloriesBurned" integer DEFAULT 0,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"isActive" boolean DEFAULT true,
	"isDeleted" boolean DEFAULT false,
	"userId" text
);
--> statement-breakpoint
CREATE TABLE "sleep_schedule" (
	"id" text PRIMARY KEY NOT NULL,
	"sleep" time DEFAULT '08:00:00',
	"score" integer DEFAULT 0,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"isActive" boolean DEFAULT true,
	"isDeleted" boolean DEFAULT false,
	"userId" text
);
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_supplements_id_supplements_id_fk";
--> statement-breakpoint
ALTER TABLE "supplements" ADD COLUMN "userId" text;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "supplements_id";