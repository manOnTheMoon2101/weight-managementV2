import { redirect } from "@sveltejs/kit";
import { and, eq, gte, lte } from "drizzle-orm";
import { auth } from "../../../lib/server/auth";
import { db } from "../../../lib/server/db";
import {
	health_tracker,
	limits,
	nutrients,
	sleep_schedule,
	supplements,
} from "../../../lib/server/schema/index";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request, url }) => {
	try {
		const session = await auth.api.getSession({
			headers: request.headers,
		});

		if (!session?.user?.id) {
			throw redirect(302, "/login");
		}

		const startDate = url.searchParams.get("startDate");
		const endDate = url.searchParams.get("endDate");

		let actualStartDate = startDate;
		let actualEndDate = endDate;

		if (!startDate || !endDate) {
			const today = new Date();
			const sevenDaysAgo = new Date();
			sevenDaysAgo.setDate(today.getDate() - 7);

			actualStartDate = sevenDaysAgo.toISOString().split("T")[0];
			actualEndDate = today.toISOString().split("T")[0];
		}

		let whereCondition = and(
			eq(nutrients.userId, session.user.id),
			eq(nutrients.isActive, true),
			eq(nutrients.isDeleted, false)
		);

		if (actualStartDate && actualEndDate) {
			try {
				const start = new Date(actualStartDate);
				const end = new Date(actualEndDate);

				console.log(start);
				console.log(end);

				end.setHours(23, 59, 59, 999);

				whereCondition = and(
					whereCondition,
					gte(nutrients.createdAt, start),
					lte(nutrients.createdAt, end)
				);
			} catch (error) {
				console.error("Invalid date format:", error);
			}
		}

		const userNutrients = await db.query.nutrients.findMany({
			where: whereCondition,
			with: {
				supplements: true,
				health_tracker: true,
				sleep_schedule: true,
			},
			orderBy: nutrients.createdAt,
		});

		const userLimits = await db.query.limits.findFirst({
			where: and(
				eq(limits.userId, session.user.id),
				eq(limits.isActive, true),
				eq(limits.isDeleted, false)
			),
		});

		return {
			nutrients: userNutrients,
			limits: userLimits || null,
			dateRange: {
				startDate: actualStartDate,
				endDate: actualEndDate,
			},
		};
	} catch (error) {
		if (error instanceof Response) {
			throw error;
		}

		console.error("Error fetching nutrients:", error);
		return {
			nutrients: [],
			dateRange: {
				startDate: null,
				endDate: null,
			},
			error: "Failed to load nutrients",
		};
	}
};

export const actions = {
	updateNutrients: async ({ request }: { request: Request }) => {
		const session = await auth.api.getSession({ headers: request.headers });
		if (!session) {
			redirect(302, "/signin");
		}
		const form = await request.formData();
		const id = Number(form.get("id")) || 0;
		const weight = Number(form.get("weight")) || 0;
		const steps = Number(form.get("steps")) || 0;
		const water = Number(form.get("water")) || 0;
		const calories = Number(form.get("calories")) || 0;
		const protein = Number(form.get("protein")) || 0;
		const fat = Number(form.get("fat")) || 0;
		const sugar = Number(form.get("sugar")) || 0;
		const carbs = Number(form.get("carbs")) || 0;

		const fatburner = Boolean(form.get("fatBurner")) || false;
		const multiVitamin = Boolean(form.get("vitamin")) || false;
		const magnesium = Boolean(form.get("magnesium")) || false;
		const cla = Boolean(form.get("cla")) || false;
		const appleCider = Boolean(form.get("apple")) || false;

		const time = form.get("time") as string;

		await db
			.update(nutrients)
			.set({ protein, fat, sugar, carbs, calories })
			.where(eq(nutrients.id, id));

		await db
			.update(health_tracker)
			.set({ weight, steps, water })
			.where(eq(health_tracker.nutrientsId, id));

		await db
			.update(supplements)
			.set({ fatburner, multiVitamin, magnesium, cla, appleCider })
			.where(eq(supplements.nutrientsId, id));

		await db
			.update(sleep_schedule)
			.set({ time })
			.where(and(eq(sleep_schedule.userId, session.user.id), eq(sleep_schedule.nutrientsId, id)));

		return { success: true };
	},

	removeNutrients: async ({ request }: { request: Request }) => {
		const session = await auth.api.getSession({ headers: request.headers });
		if (!session) {
			redirect(302, "/signin");
		}
		const form = await request.formData();
		const id = Number(form.get("id")) || 0;

		await db
			.update(nutrients)
			.set({ isActive: false, isDeleted: true })
			.where(eq(nutrients.id, id));

		await db
			.update(health_tracker)
			.set({ isActive: false, isDeleted: true })
			.where(eq(health_tracker.nutrientsId, id));

		await db
			.update(supplements)
			.set({ isActive: false, isDeleted: true })
			.where(eq(supplements.nutrientsId, id));

		await db
			.update(sleep_schedule)
			.set({ isActive: false, isDeleted: true })
			.where(and(eq(sleep_schedule.userId, session.user.id), eq(sleep_schedule.nutrientsId, id)));

		return { success: true };
	},

	createNutrients: async ({ request }: { request: Request }) => {
		const session = await auth.api.getSession({ headers: request.headers });
		if (!session) {
			redirect(302, "/signin");
		}
		const form = await request.formData();

		const protein = Number(form.get("protein")) || 0;
		const weight = Number(form.get("weight")) || 0;
		const steps = Number(form.get("steps")) || 0;
		const water = Number(form.get("water")) || 0;
		const calories = Number(form.get("calories")) || 0;
		const fat = Number(form.get("fat")) || 0;
		const sugar = Number(form.get("sugar")) || 0;
		const carbs = Number(form.get("carbs")) || 0;

		const fatburner = Boolean(form.get("fatBurner")) || false;
		const multiVitamin = Boolean(form.get("vitamin")) || false;
		const magnesium = Boolean(form.get("magnesium")) || false;
		const cla = Boolean(form.get("cla")) || false;
		const appleCider = Boolean(form.get("apple")) || false;

		// const time = form.get("time") as string;

		const nutrientsData = await db
			.insert(nutrients)
			.values({ userId: session.user.id, protein, fat, sugar, calories, carbs })
			.returning();

		const sleepData = await db
			.insert(sleep_schedule)
			.values({
				nutrientsId: nutrientsData[0].id,
				userId: session.user.id,
			})
			.returning();

		const supplementData = await db
			.insert(supplements)
			.values({
				nutrientsId: nutrientsData[0].id,
				userId: session.user.id,
				cla,
				appleCider,
				multiVitamin,
				magnesium,
				fatburner,
			})
			.returning();

		const healthData = await db
			.insert(health_tracker)
			.values({
				nutrientsId: nutrientsData[0].id,
				userId: session.user.id,
				weight,
				water,
				steps,
			})
			.returning();

		return {
			success: true,
			data: {
				nutrients: nutrientsData[0],
				sleep: sleepData[0],
				supplements: supplementData[0],
				health: healthData[0],
			},
		};
	},
};
