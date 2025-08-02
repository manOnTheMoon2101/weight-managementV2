<script lang="ts">
	import "../app.css";
	let { children } = $props();
	import { ModeWatcher } from "mode-watcher";
	// import { injectAnalytics } from '@vercel/analytics/sveltekit'
	// injectAnalytics();
</script>

<svelte:head>
	<title>svelte-starter</title>
</svelte:head>

<ModeWatcher />
{@render children()}
