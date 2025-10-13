<script lang="ts">
	import type { ICellRendererParams } from "@ag-grid-community/core";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	let {
		value,
	}: ICellRendererParams & {
		supplementFields: any[];
	} = $props();

	function convertKgToPounds(kg: number): number {
		return kg * 2.20462;
	}
</script>

<div class="flex flex-row">
	<Tooltip.Provider delayDuration={100}>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{value}kg
			</Tooltip.Trigger>
			<Tooltip.Content>
				{convertKgToPounds(value).toFixed(2)} lbs
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</div>
