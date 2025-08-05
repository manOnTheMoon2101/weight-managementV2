<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import Navbar from "./components/navbar/Navbar.svelte";
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	let { data, children }: { data: any; children: Snippet } = $props();
	import { dev } from '$app/environment';

injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<div class="flex flex-col gap-4 p-4">
	<Navbar user={data.user} limits={data.limits} userColour={data.userColour.colour} />
	
	{@render children()}
</div>
