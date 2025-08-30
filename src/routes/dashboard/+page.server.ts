import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import {
	health_tracker,
	limits,
	sleep_schedule,
	supplements,
	user,
} from "$lib/server/schema/index";
import { redirect } from "@sveltejs/kit";
import { and, count, eq, sql } from "drizzle-orm";
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
				createdAt: true,
			},
		});

		// Get current date and calculate date ranges
		const now = new Date();
		const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
		const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

		// Get user's step limit
		const stepLimit = await db.query.limits.findFirst({
			where: and(
				eq(limits.userId, session.user.id),
				eq(limits.isActive, true),
				eq(limits.isDeleted, false)
			),
			columns: {
				stepsLimit: true
			}
		});

		const userStepLimit = stepLimit?.stepsLimit || 7000; // Default to 7000 if no limit set

		// Get steps data for last 7 days where steps <= user's step limit
		const last7DaysSteps = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false),
				sql`${health_tracker.steps} <= ${userStepLimit}`,
				sql`${health_tracker.createdAt} >= ${sevenDaysAgo.toISOString()}`
			),
			columns: {
				steps: true,
				createdAt: true,
			},
			orderBy: (health_tracker, { desc }) => desc(health_tracker.createdAt),
		});
	
		const lastMonthSteps = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false),
				sql`${health_tracker.steps} <= ${userStepLimit}`,
				sql`${health_tracker.createdAt} >= ${oneMonthAgo.toISOString()}`
			),
			columns: {
				steps: true,
				createdAt: true,
			},
			orderBy: (health_tracker, { desc }) => desc(health_tracker.createdAt),
		});

		const formattedWeightEntries = allWeights
			.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
			.map((entry) => ({
				weight: entry.weight,
				createdAt: new Date(entry.createdAt).toLocaleDateString("en-GB", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				}),
			}));

		const supplementCounts = await db
			.select({
				fatburnerCount: count(sql`case when ${supplements.fatburner} = true then 1 end`),
				multiVitaminCount: count(sql`case when ${supplements.multiVitamin} = true then 1 end`),
				magnesiumCount: count(sql`case when ${supplements.magnesium} = true then 1 end`),
				claCount: count(sql`case when ${supplements.cla} = true then 1 end`),
			})
			.from(supplements)
			.where(
				and(
					eq(supplements.userId, session.user.id),
					eq(supplements.isActive, true),
					eq(supplements.isDeleted, false)
				)
			);

		const supplementsChart = supplementCounts || null;
		const weightCharts = formattedWeightEntries || null;
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

		const averageTimeResult = await db
			.select({
				avgTime: sql<string>`AVG(${sleep_schedule.time}::time)::time(0)`,
			})
			.from(sleep_schedule)
			.where(
				and(
					eq(sleep_schedule.userId, session.user.id),
					eq(sleep_schedule.isActive, true),
					eq(sleep_schedule.isDeleted, false)
				)
			);

		const averageTimeFromSQL = averageTimeResult[0]?.avgTime || null;

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
			averageSleepIntake: averageTimeFromSQL,
			supplementsChart: supplementsChart,
			currentWeight: currentWeight,
			weightCharts: weightCharts,
			previousWeight: previousWeight,
			averageWaterIntake: averageWaterIntake,
			averageStepsIntake: averageStepsIntake,
			last7DaysSteps: last7DaysSteps,
			lastMonthSteps: lastMonthSteps,
			userStepLimit: userStepLimit,
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
		if (
			!caloriesLimit ||
			!carbsLimit ||
			!proteinLimit ||
			!sugarLimit ||
			!stepsLimit ||
			!waterLimit
		) {
			return { success: false, error: "Limits Required." };
		}
		await db
			.update(limits)
			.set({
				caloriesLimit,
				fatLimit,
				carbsLimit,
				proteinLimit,
				sugarLimit,
				stepsLimit,
				waterLimit,
			})
			.where(eq(limits.userId, session.user.id));
		return { success: true };
	},
};
