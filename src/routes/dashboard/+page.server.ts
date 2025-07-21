import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { health_tracker, user } from "$lib/server/schema/index";
import { redirect } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
	try {
		const session = await auth.api.getSession({
			headers: request.headers,
		});

		if (!session?.user?.id) {
			throw redirect(302, "/login");
		}

		const latestWeightEntries = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false)
			),
			columns: {
				weight: true,
			},
			orderBy: (health_tracker, { desc }) => desc(health_tracker.createdAt),
			limit: 1,
		});
		const currentWeight = latestWeightEntries[0] || null;

		const waterIntake = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false)
			),
			columns: {
				water: true,
			},
		});
		const waterValues = waterIntake
			.map((entry) => entry.water)
			.filter((w) => typeof w === "number");
		const averageWaterIntake =
			waterValues.length > 0
				? waterValues.reduce((sum, val) => sum + val, 0) / waterValues.length
				: null;

		return {
			currentWeight: currentWeight,
			averageWaterIntake: averageWaterIntake,
		};
	} catch (error) {
		if (error instanceof Response) {
			throw error;
		}

		console.error("Error fetching nutrients:", error);
		return {
			nutrients: [],
			error: "Failed to load nutrients",
		};
	}
};

export const actions = {
	updateUser: async ({ request }: { request: Request }) => {
		const session = await auth.api.getSession({ headers: request.headers });
		if (!session) {
			redirect(302, "/signin");
		}
		const form = await request.formData();
		const name = form.get("name") as string;
		const email = form.get("email") as string;
		if (!name || !email) {
			return { success: false, error: "Name and email are required." };
		}
		await db.update(user).set({ name, email }).where(eq(user.id, session.user.id));
		return { success: true };
	},
};
