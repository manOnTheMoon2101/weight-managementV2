
import { createAuthClient } from "better-auth/svelte";
// import { PUBLIC_BETTER_AUTH_URL } from "$env/static/public";

// if (!PUBLIC_BETTER_AUTH_URL) throw new Error("BETTER_AUTH_URL is not set");
export const authClient = createAuthClient({
	baseURL: "https://weight-management-v2.vercel.app"
});
