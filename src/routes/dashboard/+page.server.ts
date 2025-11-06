import { env } from "$env/dynamic/private";
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
import { put } from "@vercel/blob";
import { and, count, eq, gt, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ request }) => {
	try {
		const now = new Date();
		const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
		const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
		const session = await auth.api.getSession({
			headers: request.headers,
		});

		if (!session?.user?.id) {
			throw redirect(302, "/login");
		}

		const weightEntries = await db.query.health_tracker.findMany({
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

		const WeightsMonthAgo = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false),
				sql`${health_tracker.createdAt} >= ${oneMonthAgo.toISOString()}`
			),
			columns: {
				weight: true,
				createdAt: true,
			},
		});

		const StepsMonthAgo = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false),
				sql`${health_tracker.createdAt} >= ${oneMonthAgo.toISOString()}`
			),
			columns: {
				steps: true,
				createdAt: true,
			},
		});

		const StepsWeekAgo = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false),
				sql`${health_tracker.createdAt} >= ${sevenDaysAgo.toISOString()}`
			),
			columns: {
				steps: true,
				createdAt: true,
			},
		});

		const WeightsWeekAgo = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false),
				sql`${health_tracker.createdAt} >= ${sevenDaysAgo.toISOString()}`
			),
			columns: {
				weight: true,
				createdAt: true,
			},
		});

		const allWaist = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false),
				gt(health_tracker.waistMeasurement, 0)
			),
			columns: {
				waistMeasurement: true,
				createdAt: true,
			},
		});

		const stepLimit = await db.query.limits.findFirst({
			where: and(
				eq(limits.userId, session.user.id),
				eq(limits.isActive, true),
				eq(limits.isDeleted, false)
			),
			columns: {
				stepsLimit: true,
			},
		});

		const userStepLimit = stepLimit?.stepsLimit || null;
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

		const waterLimit = await db.query.limits.findFirst({
			where: and(
				eq(limits.userId, session.user.id),
				eq(limits.isActive, true),
				eq(limits.isDeleted, false)
			),
			columns: {
				waterLimit: true,
			},
		});

		const userWaterLimit = waterLimit?.waterLimit || null;
		const last7DaysWater = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false),
				sql`${health_tracker.water} <= ${userWaterLimit}`,
				sql`${health_tracker.createdAt} >= ${sevenDaysAgo.toISOString()}`
			),
			columns: {
				water: true,
				createdAt: true,
			},
			orderBy: (health_tracker, { desc }) => desc(health_tracker.createdAt),
		});

		const lastMonthWater = await db.query.health_tracker.findMany({
			where: and(
				eq(health_tracker.userId, session.user.id),
				eq(health_tracker.isActive, true),
				eq(health_tracker.isDeleted, false),
				sql`${health_tracker.water} <= ${userWaterLimit}`,
				sql`${health_tracker.createdAt} >= ${oneMonthAgo.toISOString()}`
			),
			columns: {
				water: true,
				createdAt: true,
			},
			orderBy: (health_tracker, { desc }) => desc(health_tracker.createdAt),
		});

		const formattedMonthWeightEntries = WeightsMonthAgo.sort(
			(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		).map((entry) => ({
			weight: entry.weight,
			createdAt: new Date(entry.createdAt).toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}),
		}));

		const formattedMonthStepsEntries = StepsMonthAgo.sort(
			(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		).map((entry) => ({
			steps: entry.steps,
			createdAt: new Date(entry.createdAt),
		}));

		const formattedWeekStepsEntries = StepsWeekAgo.sort(
			(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		).map((entry) => ({
			steps: entry.steps,
			createdAt: new Date(entry.createdAt),
		}));

		const formattedWeekWeightEntries = WeightsWeekAgo.sort(
			(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		).map((entry) => ({
			weight: entry.weight,
			createdAt: new Date(entry.createdAt).toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}),
		}));

		const formattedWaistEntries = allWaist
			.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
			.map((entry) => ({
				waistMeasurement: entry.waistMeasurement,
				createdAt: new Date(entry.createdAt).toLocaleDateString("en-GB", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				}),
			}));

		const supplementCountsWeekAgo = await db
			.select({
				fatburnerCount: count(sql`case when ${supplements.fatburner} = true then 1 end`),
				multiVitaminCount: count(sql`case when ${supplements.multiVitamin} = true then 1 end`),
				magnesiumCount: count(sql`case when ${supplements.magnesium} = true then 1 end`),
				claCount: count(sql`case when ${supplements.cla} = true then 1 end`),
				zenCount: count(sql`case when ${supplements.zen} = true then 1 end`),
			})
			.from(supplements)
			.where(
				and(
					eq(supplements.userId, session.user.id),
					eq(supplements.isActive, true),
					eq(supplements.isDeleted, false),
					sql`${supplements.createdAt} >= ${sevenDaysAgo.toISOString()}`
				)
			);

		const supplementCountsMonthAgo = await db
			.select({
				fatburnerCount: count(sql`case when ${supplements.fatburner} = true then 1 end`),
				multiVitaminCount: count(sql`case when ${supplements.multiVitamin} = true then 1 end`),
				magnesiumCount: count(sql`case when ${supplements.magnesium} = true then 1 end`),
				claCount: count(sql`case when ${supplements.cla} = true then 1 end`),
				zenCount: count(sql`case when ${supplements.zen} = true then 1 end`),
			})
			.from(supplements)
			.where(
				and(
					eq(supplements.userId, session.user.id),
					eq(supplements.isActive, true),
					eq(supplements.isDeleted, false),
					sql`${supplements.createdAt} >= ${oneMonthAgo.toISOString()}`
				)
			);

		const supplementCountsWeekChart = supplementCountsWeekAgo || null;
		const supplementCountsMonthChart = supplementCountsMonthAgo || null;
		const weightMonthChart = formattedMonthWeightEntries || null;
		const stepsMonthChart = formattedMonthStepsEntries || null;
		const stepsWeekChart = formattedWeekStepsEntries || null;
		const weightWeekChart = formattedWeekWeightEntries || null;
		const waistChart = formattedWaistEntries || null;
		const currentWeight = weightEntries[0] || null;
		const previousWeight = weightEntries[1] || null;

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
			supplementCountsWeekChart: supplementCountsWeekChart,
			supplementCountsMonthChart: supplementCountsMonthChart,
			currentWeight: currentWeight,
			weightMonthChart: weightMonthChart,
			stepsMonthChart: stepsMonthChart,
			stepsWeekChart: stepsWeekChart,
			weightWeekChart: weightWeekChart,
			waistChart: waistChart,
			previousWeight: previousWeight,
			averageWaterIntake: averageWaterIntake,
			averageStepsIntake: averageStepsIntake,
			last7DaysSteps: last7DaysSteps,
			lastMonthSteps: lastMonthSteps,
			userStepLimit: userStepLimit,

			last7DaysWater: last7DaysWater,
			lastMonthWater: lastMonthWater,
			waterLimit: userWaterLimit || null,
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
		const colour = form.get("userColour") as string;
		const file = form.get("file") as File | null;

		if (!name || !email) {
			return { success: false, error: "Name and email are required." };
		}

		let imageUrl: string | null = null;
		if (file && typeof file.name === "string" && file.size > 0) {
			const { url } = await put(file.name, file, {
				access: "public",
				token: env.MERDA_READ_WRITE_TOKEN,
				allowOverwrite: true,
			});
			imageUrl = url;
		}

		await db
			.update(user)
			.set({
				name,
				email,
				colour: colour || "#fbbf24",
				...(imageUrl ? { image: imageUrl } : {}),
			})
			.where(eq(user.id, session.user.id));
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
			return { success: false, error: "All Limits Required." };
		}

		const existingLimits = await db.query.limits.findFirst({
			where: and(
				eq(limits.userId, session.user.id),
				eq(limits.isActive, true),
				eq(limits.isDeleted, false)
			),
		});

		if (existingLimits) {
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
					updatedAt: new Date(),
				})
				.where(eq(limits.userId, session.user.id));
		} else {
			await db.insert(limits).values({
				userId: session.user.id,
				caloriesLimit,
				fatLimit,
				carbsLimit,
				proteinLimit,
				sugarLimit,
				stepsLimit,
				waterLimit,
				createdAt: new Date(),
				updatedAt: new Date(),
				isActive: true,
				isDeleted: false,
			});
		}

		return { success: true };
	},
};
