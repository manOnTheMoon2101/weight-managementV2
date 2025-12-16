<script lang="ts">
	import type { ICellRendererParams } from "@ag-grid-community/core";
	import Pill from "@lucide/svelte/icons/pill";
	import Liquid from "@lucide/svelte/icons/milk";
	import Gummy from "@lucide/svelte/icons/candy";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";

	let { data }: ICellRendererParams = $props();

	let supplements = $derived(data.allAssignedSupplements || []);
</script>

<div class="flex flex-row">
	{#each supplements as supplement}
		<Tooltip.Provider delayDuration={100}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#if supplement.custom_supplement?.type === "Gummy"}
						<Gummy style="color: {supplement.custom_supplement?.color}" />
					{:else if supplement.custom_supplement?.type === "Liquid"}
						<Liquid style="color: {supplement.custom_supplement?.color}" />
					{:else}
						<Pill style="color: {supplement.custom_supplement?.color}" />
					{/if}
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>{supplement.custom_supplement?.name}</p>
					{#if supplement.quantity}
						<p class="text-muted-foreground text-sm">Quantity: {supplement.quantity}</p>
					{/if}
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	{/each}
</div>
