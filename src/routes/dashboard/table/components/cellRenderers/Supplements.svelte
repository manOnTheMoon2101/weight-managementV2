<script lang="ts">
	import type { ICellRendererParams } from "@ag-grid-community/core";
	import Pill from "@lucide/svelte/icons/pill";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	let {
		value,
		data,
		supplementFields,
	}: ICellRendererParams & {
		supplementFields: any[];
	} = $props();

	let supplements = $derived(
		supplementFields?.map((field) => ({
			name: field,
			value: data[field],
		})) || []
	);

	const supplementColors: any = {
		fatBurner: "text-[#E8DBC9]",
		appleCider: "text-green-500",
		multiVitamin: "text-[#A89072]",
		magnesium: "text-[#C7B89F]",
		cla: "text-[#F2E8DB]",
	};
</script>

<div class="flex flex-row">
    {#each supplements.filter(s => s.value == "true") as supplement}
        <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Pill class={supplementColors[supplement.name]} />
                </Tooltip.Trigger>
                <Tooltip.Content>
                    <p>{supplement.name}</p>
                </Tooltip.Content>
            </Tooltip.Root>
        </Tooltip.Provider>
    {/each}
</div>