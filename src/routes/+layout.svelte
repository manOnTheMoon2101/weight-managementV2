<script lang="ts">
	import "../app.css";
	let { children } = $props();
	import { ModeWatcher } from "mode-watcher";
	import { dev } from "$app/environment";
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { createInitialModeExpression } from "mode-watcher";
	 import { Toaster } from "$lib/components/ui/sonner/index.js";
	injectAnalytics({ mode: dev ? "development" : "production" });
</script>

<svelte:head>
	<title>Weight Tracker</title>
	<script>
		{@html createInitialModeExpression({
			defaultMode: "light",
			defaultTheme: "",
			modeStorageKey: "app-mode",
			themeStorageKey: "app-theme",
		})}
	</script>
</svelte:head>

<ModeWatcher />
<Toaster richColors />
{@render children()}
