ALTER TABLE "assignedSupplements" DROP CONSTRAINT "assignedSupplements_custom_supplementsId_nutrients_id_fk";
--> statement-breakpoint
ALTER TABLE "assignedSupplements" ADD CONSTRAINT "assignedSupplements_custom_supplementsId_custom_supplements_id_fk" FOREIGN KEY ("custom_supplementsId") REFERENCES "public"."custom_supplements"("id") ON DELETE cascade ON UPDATE no action;