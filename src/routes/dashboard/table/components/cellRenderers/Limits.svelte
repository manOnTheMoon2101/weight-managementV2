<script lang="ts">
	import type { ICellRendererParams } from "@ag-grid-community/core";
	import Pill from "@lucide/svelte/icons/pill";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	let {
		data,
		limit,
		type,
	}: ICellRendererParams & {
		data: any[];
		limit: number;
		type: string;
	} = $props();
</script>

<div
	class={data > limit && type === "More"
		? "text-red-500"
		: data >= limit && type === "Less"
			? "text-green-500"
			: ""}
>
	<Tooltip.Provider delayDuration={100}>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{data}
			</Tooltip.Trigger>
			{#if data && type === "Less" && data >= limit}
				<Tooltip.Content class="bg-green-500">
					<p>Goal Achieved</p>
				</Tooltip.Content>
			{:else if data && type === "More" && data >= limit}
				<Tooltip.Content class="bg-red-500">
					<p>Limits Exceeded</p>
				</Tooltip.Content>
			{:else}
				<Tooltip.Content>
					<p>{data}</p>
				</Tooltip.Content>
			{/if}
		</Tooltip.Root>
	</Tooltip.Provider>
</div>
