<script lang="ts">
	import { Svg, Axis, Layer, Highlight, Area, LinearGradient, Chart, Tooltip } from "layerchart";
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

<div>
	<div class="flex flex-row justify-between">
		<div>
			<span class="text-2xl">{averageSteps}</span>
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
	<Chart
		data={dateSeriesData}
		x="createdAt"
		y="steps"
		yDomain={[minSteps, maxSteps]}
		yNice
		padding={{ left: 0, bottom: 0 }}
		tooltip={{ mode: "quadtree-x" }}
	>
		<Layer type="canvas">
			<!-- <Axis placement="left" grid rule />
			<Axis placement="bottom" rule /> -->
			<LinearGradient class="from-accent/50 to-accent/1" vertical>
				{#snippet children({ gradient })}
					<Area line={{ class: "stroke-2 stroke-primary" }} fill={gradient} />
				{/snippet}
			</LinearGradient>
			<Highlight points lines />
		</Layer>

		<Tooltip.Root class="bg-primary">
			{#snippet children({ data })}
				<Tooltip.Header value={data.createdAt} />
				<Tooltip.List>
					<Tooltip.Item label="Steps" value={data.steps} />
				</Tooltip.List>
			{/snippet}
		</Tooltip.Root>
	</Chart>
</div>
