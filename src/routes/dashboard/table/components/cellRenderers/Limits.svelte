<script lang="ts">
	import type { ICellRendererParams } from "@ag-grid-community/core";
	import Pill from "@lucide/svelte/icons/pill";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	let {
		data,
		limit,
	}: ICellRendererParams & {
		data: any[];
		limit: number;
	} = $props();
</script>

<div class={data > limit ? "text-red-500" : ""}>
	<Tooltip.Provider delayDuration={100}>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{data}
			</Tooltip.Trigger>
			{#if data > limit}
				<Tooltip.Content class="bg-red-500">
					<p>Limits Exceted</p>
				</Tooltip.Content>
			{:else}
				<Tooltip.Content>
					<p>{data}</p>
				</Tooltip.Content>
			{/if}
		</Tooltip.Root>
	</Tooltip.Provider>
</div>
