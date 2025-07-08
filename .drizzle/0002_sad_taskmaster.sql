CREATE TABLE "supplements" (
	"id" text PRIMARY KEY NOT NULL,
	"fatburner" boolean DEFAULT false,
	"multiVitamin" boolean DEFAULT false,
	"appleCider" boolean DEFAULT false,
	"cla" boolean DEFAULT false,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"isActive" boolean DEFAULT true,
	"isDeleted" boolean DEFAULT false
);
