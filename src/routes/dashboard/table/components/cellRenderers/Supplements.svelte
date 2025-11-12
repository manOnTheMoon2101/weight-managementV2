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
		fatBurner: "text-chart1",
		zen: "text-chart2",
		multiVitamin: "text-chart3",
		magnesium: "text-chart4",
		cla: "text-chart5",
	};

	const supplementDisplayNames: any = {
		fatBurner: "L-Carnitine",
		zen: "Zen",
		multiVitamin: "Multi-Vitamin",
		magnesium: "Magnesium",
		cla: "CLA",
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
                    <p>{supplementDisplayNames[supplement.name] || supplement.name}</p>
                </Tooltip.Content>
            </Tooltip.Root>
        </Tooltip.Provider>
    {/each}
</div>