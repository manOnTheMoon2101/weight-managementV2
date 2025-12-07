<script lang="ts">
	import type { ICellRendererParams } from "@ag-grid-community/core";
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
		? "text-destructive"
		: data >= limit && type === "Less"
			? "text-save"
			: ""}
>
	<Tooltip.Provider delayDuration={100}>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{data}
			</Tooltip.Trigger>
			{#if data && type === "Less" && data >= limit}
				<Tooltip.Content class="bg-save">
					<p>Goal Achieved</p>
				</Tooltip.Content>
			{:else if data && type === "More" && data >= limit}
				<Tooltip.Content class="bg-destructive">
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
