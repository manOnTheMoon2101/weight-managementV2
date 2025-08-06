<script lang="ts">
	import "../app.css";
	let { children } = $props();
	import { ModeWatcher } from "mode-watcher";
	import { dev } from "$app/environment";
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	injectAnalytics({ mode: dev ? "development" : "production" });
</script>

<svelte:head>
	<title>svelte-starter</title>
</svelte:head>

<ModeWatcher />
{@render children()}
