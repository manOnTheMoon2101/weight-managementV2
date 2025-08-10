import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { health_tracker, limits, user } from "$lib/server/schema/index";
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
				createdAt: true,
			},
			orderBy: (health_tracker, { desc }) => desc(health_tracker.createdAt),
			limit: 2,
		});

		
		const allWeights = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false)
			),
			columns: {
				weight: true,
				createdAt: true
			},
		});

		const weightCharts = allWeights || null
		const currentWeight = latestWeightEntries[0] || null;
		const previousWeight = latestWeightEntries[1] || null;

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

		const totalSteps = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false)
			),
			columns: {
				steps: true,
			},
		});
		const stepsValues = totalSteps.map((entry) => entry.steps).filter((w) => typeof w === "number");
		const averageStepsIntake =
			stepsValues.length > 0
				? stepsValues.reduce((sum, val) => sum + val, 0) / stepsValues.length
				: null;

		return {
			user: session.user,
			currentWeight: currentWeight,
			weightCharts: weightCharts,
			previousWeight: previousWeight,
			averageWaterIntake: averageWaterIntake,
			averageStepsIntake: averageStepsIntake,
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
		const colour = form.get("userColour") as string; // Now matches the form field name
		
		if (!name || !email) {
			return { success: false, error: "Name and email are required." };
		}
		
		await db.update(user).set({ name, email, colour }).where(eq(user.id, session.user.id));
		return { success: true };
	},

	updateLimits: async ({ request }: { request: Request }) => {
		const session = await auth.api.getSession({ headers: request.headers });
		if (!session) {
			redirect(302, "/signin");
		}
		const form = await request.formData();
		const caloriesLimit = form.get("caloriesLimit") as unknown as number;

		const fatLimit = form.get("fatLimit") as unknown as number;
		const carbsLimit = form.get("carbsLimit") as unknown as number;
		const proteinLimit = form.get("proteinLimit") as unknown as number;
		const sugarLimit = form.get("sugarLimit") as unknown as number;
		const stepsLimit = form.get("stepsLimit") as unknown as number;
		const waterLimit = form.get("waterLimit") as unknown as number;
		if (!caloriesLimit || !carbsLimit || !proteinLimit || !sugarLimit || !stepsLimit || !waterLimit) {
			return { success: false, error: "Limits Required." };
		}
		await db
			.update(limits)
			.set({ caloriesLimit, fatLimit, carbsLimit, proteinLimit, sugarLimit , stepsLimit , waterLimit})
			.where(eq(limits.userId, session.user.id));
		return { success: true };
	},
};
