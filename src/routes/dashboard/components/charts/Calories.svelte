<script lang="ts">
	import { scaleBand } from "d3-scale";
	import { BarChart, type ChartContextValue } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import * as Chart from "$lib/components/ui/chart/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { cubicInOut } from "svelte/easing";
	import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
	import Zap from "@lucide/svelte/icons/zap";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	let { dateSeriesData, viewMode = $bindable("7days") } = $props();

	let averageCalories = $derived(
		dateSeriesData && dateSeriesData.length > 0
			? Math.round(
					dateSeriesData.reduce((sum: number, x: any) => sum + x.calories, 0) / dateSeriesData.length
				)
			: 0
	);

	let minCalories = $derived(
		dateSeriesData && dateSeriesData.length > 0
			? Math.min(...dateSeriesData.map((x: any) => x.calories))
			: 0
	);

	let maxCalories = $derived(
		dateSeriesData && dateSeriesData.length > 0
			? Math.max(...dateSeriesData.map((x: any) => x.calories))
			: 0
	);

	$inspect(dateSeriesData);

	const chartConfig = {
		desktop: { label: "Calories", color: "var(--accent)" },
	} satisfies Chart.ChartConfig;

	let context = $state<ChartContextValue>();
</script>

<Card.Root class="bg-primary">
	<Card.Header>
		<div class="flex flex-row justify-between">
			<div>
				<Card.Title><Zap/></Card.Title>
				<Card.Description>Calories</Card.Description>
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
							<DropdownMenu.Item
								class={viewMode === "month" ? "bg-accent" : ""}
								onclick={() => (viewMode = "month")}
							>
								Last Month
							</DropdownMenu.Item>
							<DropdownMenu.Item
								class={viewMode === "7days" ? "bg-accent" : ""}
								onclick={() => (viewMode = "7days")}
							>
								Last 7 Days
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<BarChart
				bind:context
				data={dateSeriesData}
				xScale={scaleBand().padding(0.25)}
				x="createdAt"
				axis={false}
				grid={false}
				series={
        [
          { key: "calories", label: "Calories", color: chartConfig.desktop.color }
          ]
          }
				props={{
					bars: {
						stroke: "none",
						rounded: "all",
						radius: 8,
						initialY: context?.height,
						initialHeight: 0,
						motion: {
							x: { type: "tween", duration: 500, easing: cubicInOut },
							width: { type: "tween", duration: 500, easing: cubicInOut },
							height: { type: "tween", duration: 500, easing: cubicInOut },
							y: { type: "tween", duration: 500, easing: cubicInOut },
						},
					},
					highlight: { area: { fill: "none" } },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip
						labelFormatter={(v: Date) =>
							v.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
						indicator="line"
					/>
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full items-start text-sm">
			<div class="grid">
				<div class="flex items-center gap-2 leading-none font-medium">
					{averageCalories} avg protein for last {viewMode == "7days" ? "7 days" : "30 days"}
					<TrendingUpIcon class="size-4" />
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					Range: {minCalories.toLocaleString()} - {maxCalories.toLocaleString()} protein
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
