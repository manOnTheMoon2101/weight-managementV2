CREATE TABLE "custom_supplements" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text DEFAULT '#FFFFFF' NOT NULL,
	"type" text DEFAULT 'Capsule' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"isActive" boolean DEFAULT true,
	"isDeleted" boolean DEFAULT false,
	"userId" text NOT NULL
);
ALTER TABLE "custom_supplements" ADD CONSTRAINT "custom_supplements_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;