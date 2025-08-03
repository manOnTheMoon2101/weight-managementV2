import { auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { user } from "$lib/server/schema/index";
import { eq, and } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { limits } from "$lib/server/schema";

export const load: LayoutServerLoad = async ({ request }) => {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        redirect(302, "/signin");
    }

    const userColour = await db.query.user.findFirst({
        where: and(
            eq(user.id, session.user.id),
        ),
        columns: {
            colour: true
        }
    });

    const userLimits = await db.query.limits.findFirst({
        where: and(
          eq(limits.userId, session.user.id),
          eq(limits.isActive, true),
          eq(limits.isDeleted, false)
        ),
    });

    return {
        limits: userLimits,
        userColour: userColour,
        user: session.user,
    };
};