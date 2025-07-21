

import { db } from "$lib/server/db";
import { user } from '$lib/server/schema/index';
import { health_tracker } from '$lib/server/schema/index';
import { eq , and} from "drizzle-orm";
import { auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';




export const load: PageServerLoad = async ({ request }) => {
	try {
	  const session = await auth.api.getSession({
		headers: request.headers
	  });
	  
	  if (!session?.user?.id) {
		throw redirect(302, '/login');
	  }
	  
	  const currentWeight = await db.query.health_tracker.findFirst({
		where: and(
		eq(health_tracker.userId, session.user.id),
		  eq(health_tracker.isActive, true),
		  eq(health_tracker.isDeleted, false)
		),
		orderBy: health_tracker.createdAt,
	  });
	  
	  return {
		currentWeight: currentWeight
	  };
	} catch (error) {
	  if (error instanceof Response) {
		throw error;
	  }
	 
	  console.error('Error fetching nutrients:', error);
	  return {
		nutrients: [],
		error: 'Failed to load nutrients'
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
		await db.update(user)
			.set({ name, email })
			.where(eq(user.id, session.user.id));
		return { success: true };
	}
};