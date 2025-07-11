<script lang="ts">
	import "../app.css";
	let { children } = $props();
	import { ModeWatcher } from "mode-watcher";
		import Navbar from "./components/navbar/Navbar.svelte"
		import { authClient } from "$lib/auth-client";

		const session = authClient.useSession()
		console.log(session)
</script>

<svelte:head>
	<title>svelte-starter</title>
</svelte:head>
{#if $session.data}

<Navbar user={session} />

{:else}
<div>nothing</div>
{/if}

<ModeWatcher />
{@render children()}
