

import { db } from "$lib/server/db";
import { user } from '$lib/server/schema/index';
import { eq } from "drizzle-orm";
import { auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export const actions = {
	update: async ({ request }: { request: Request }) => {
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
		await db.update(user)
			.set({ name, email })
			.where(eq(user.id, session.user.id));
		return { success: true };
	}
};