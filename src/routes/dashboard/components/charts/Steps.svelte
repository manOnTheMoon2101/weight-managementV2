<script lang="ts">
	import { AreaChart } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { curveNatural } from "d3-shape";
	import { scaleUtc } from "d3-scale";
	import * as Chart from "$lib/components/ui/chart/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
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

	const chartConfig = {
		steps: { label: "Steps", color: "var(--accent)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="bg-primary">
	<Card.Header>
		<div class="flex flex-row justify-between">
			<div>
				<Card.Title>{averageSteps}</Card.Title>
				<Card.Description>Avarage Steps</Card.Description>
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
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<AreaChart
				data={dateSeriesData}
				x="createdAt"
				xScale={scaleUtc()}
				series={[
					{
						key: "steps",
						label: "Steps",
						color: chartConfig.steps.color,
					},
				]}
				axis={false}
				grid={false}
				props={{
					area: {
						curve: curveNatural,
						"fill-opacity": 0.4,
						line: { class: "stroke-1" },
						motion: "tween",
					},
					xAxis: {
						style: "display: none;",
					},
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip
						labelFormatter={(v: Date) =>
							v.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
						indicator="line"
					/>
				{/snippet}
			</AreaChart>
		</Chart.Container>
	</Card.Content>
	<!-- <Card.Footer>
		<div class="flex w-full items-start gap-2 text-sm">
			<div class="grid gap-2">
				<div class="flex items-center gap-2 leading-none font-medium">
					Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					January - June 2024
				</div>
			</div>
		</div>
	</Card.Footer> -->
</Card.Root>
