<script lang="ts">
	import type { ICellRendererParams } from "@ag-grid-community/core";
	import Pill from "@lucide/svelte/icons/pill";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	let {
		data,
        limit,
	}: ICellRendererParams & {
		data: any[];
        limit: number
	} = $props();
</script>

<div class={data > limit ? "text-destructive" : ""}>
	{data}
</div>
