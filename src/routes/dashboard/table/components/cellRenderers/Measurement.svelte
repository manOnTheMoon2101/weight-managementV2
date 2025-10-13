<script lang="ts">
	import type { ICellRendererParams } from "@ag-grid-community/core";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	let {
		value,
	}: ICellRendererParams & {
		supplementFields: any[];
	} = $props();

	function convertCmToInches(cm: number): number {
		return cm / 2.54;
	}
</script>

<div class="flex flex-row">
	<Tooltip.Provider delayDuration={100}>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{value}cm
			</Tooltip.Trigger>
			<Tooltip.Content>
				{convertCmToInches(value).toFixed(2)} inches
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</div>
