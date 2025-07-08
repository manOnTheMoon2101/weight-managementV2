<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="flex flex-col gap-4 p-4">
	<h1 class="text-4xl font-bold">Dashboard Layout</h1>
	{@render children()}
</div>
