<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import Navbar from "./components/navbar/Navbar.svelte";
	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="flex flex-col gap-4 p-4">
	<Navbar user={data.user} />
	{@render children()}
</div>
