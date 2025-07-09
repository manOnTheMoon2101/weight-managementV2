
import { createAuthClient } from "better-auth/svelte";
import { env } from "$env/dynamic/private";


if (!env.BETTER_AUTH_URL) throw new Error("BETTER_AUTH_URL is not set");
export const authClient = createAuthClient({
	baseURL: env.BETTER_AUTH_URL || "https://weight-management-v2.vercel.app",
});
