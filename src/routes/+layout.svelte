<script lang="ts">
	import "../app.css";
	let { children } = $props();
	import { ModeWatcher } from "mode-watcher";
		import Navbar from "./components/navbar/Navbar.svelte"
</script>

<svelte:head>
	<title>svelte-starter</title>
</svelte:head>
<Navbar/>
<ModeWatcher />
{@render children()}
