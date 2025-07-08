<script lang="ts">
	import "../app.css";
	let { children } = $props();
	import { ModeWatcher } from "mode-watcher";
</script>

<svelte:head>
	<title>svelte-starter</title>
</svelte:head>
<ModeWatcher />
{@render children()}
