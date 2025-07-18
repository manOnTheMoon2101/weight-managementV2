<script lang="ts">
	import "../app.css";
	let { children } = $props();
	import { ModeWatcher } from "mode-watcher";
		import { authClient } from "$lib/auth-client";

		const session = authClient.useSession()
		console.log(session)
</script>

<svelte:head>
	<title>svelte-starter</title>
</svelte:head>



<ModeWatcher />
{@render children()}
