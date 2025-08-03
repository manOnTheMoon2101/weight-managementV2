CREATE TABLE "limits" (
	"id" serial PRIMARY KEY NOT NULL,
	"fatLimit" integer DEFAULT 0,
	"carbsLimit" integer DEFAULT 0,
	"proteinLimit" integer DEFAULT 0,
	"sugarLimit" integer DEFAULT 0,
	"caloriesLimit" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"isActive" boolean DEFAULT true,
	"isDeleted" boolean DEFAULT false,
	"userId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "limits" ADD CONSTRAINT "limits_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;