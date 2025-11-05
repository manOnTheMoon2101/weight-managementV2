<script lang="ts">
	import { Svg, Axis, Spline, LineChart, Points, Tooltip, Highlight } from "layerchart";
	import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	let { dateSeriesData } = $props();

	$inspect(dateSeriesData);

	let averageSteps =
		dateSeriesData && dateSeriesData.length > 0
			? Math.round(
					dateSeriesData.reduce((sum: number, x: any) => sum + x.steps, 0) / dateSeriesData.length
				)
			: 0;

	let minSteps =
		dateSeriesData && dateSeriesData.length > 0
			? Math.min(...dateSeriesData.map((x: any) => x.steps))
			: 0;

	let maxSteps =
		dateSeriesData && dateSeriesData.length > 0
			? Math.max(...dateSeriesData.map((x: any) => x.steps))
			: 0;

	$inspect(averageSteps);
</script>

<div class="border-accent bg-primary my-4 h-[200px] w-full rounded-2xl border p-4 shadow-2xl">
	<div class="flex flex-row justify-between">
		<div>
			{averageSteps}
			<h3>Avarage Steps</h3>
		</div>

		<div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="cursor-pointer">
					<EllipsisVertical />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label class="flex items-center">Filter</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item closeOnSelect={false}>Last Month</DropdownMenu.Item>
						<DropdownMenu.Item closeOnSelect={false}>Last 7 Days</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
	<LineChart
		data={dateSeriesData}
		x="createdAt"
		y="steps"
		points
		yDomain={[minSteps, maxSteps]}
		padding={{ left: 20, bottom: 40, top: 20, right: 20 }}
	>
		<Svg>
			<!-- <Axis placement="left" rule class="fill-foreground" /> -->
			<!-- <Axis placement="bottom" rule class="fill-foreground" /> -->
			<Spline class="stroke-secondary stroke-2" />
			<Points class="fill-accent " />
			<Highlight lines />
		</Svg>
		<Tooltip.Root class="bg-accent">
			{#snippet children({ data })}
				<!-- <Tooltip.Header value={data.createdAt} format="day" /> -->
				<Tooltip.List>
					<Tooltip.Item label={"Date"} value={data.createdAt} />
					<Tooltip.Item label={"Steps"} value={data.steps} />
				</Tooltip.List>
			{/snippet}
		</Tooltip.Root>
	</LineChart>
</div>
