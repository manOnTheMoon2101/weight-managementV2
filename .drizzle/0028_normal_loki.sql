CREATE TABLE "assignedSupplements" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"isActive" boolean DEFAULT true,
	"isDeleted" boolean DEFAULT false,
	"quantity" integer DEFAULT 0,
	"nutrientsId" integer NOT NULL,
	"custom_supplementsId" integer NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assignedSupplements" ADD CONSTRAINT "assignedSupplements_nutrientsId_nutrients_id_fk" FOREIGN KEY ("nutrientsId") REFERENCES "public"."nutrients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignedSupplements" ADD CONSTRAINT "assignedSupplements_custom_supplementsId_nutrients_id_fk" FOREIGN KEY ("custom_supplementsId") REFERENCES "public"."nutrients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignedSupplements" ADD CONSTRAINT "assignedSupplements_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;