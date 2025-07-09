
import { createAuthClient } from "better-auth/svelte";
import { PUBLIC_BETTER_AUTH_URL } from "$env/static/public";

const PROD_URL = "https://weight-management-v2.vercel.app";

export const authClient = createAuthClient({
  baseURL: PUBLIC_BETTER_AUTH_URL || PROD_URL,
});
