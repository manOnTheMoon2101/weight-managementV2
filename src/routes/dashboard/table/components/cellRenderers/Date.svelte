<script lang="ts">
	import type { ICellRendererParams } from "@ag-grid-community/core";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	let {
		value,
	}: ICellRendererParams & {
		supplementFields: any[];
	} = $props();

	function formatDate(dateValue: string | Date): string {
		const date = new Date(dateValue);
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			month: "short",
			year: "numeric",
			day: "numeric",
		});
	}
</script>

<div class="flex flex-row">
	<Tooltip.Provider delayDuration={100}>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{formatDate(value)}
			</Tooltip.Trigger>
			<Tooltip.Content>
				{new Date(value).toISOString().split("T")[0]}
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</div>
