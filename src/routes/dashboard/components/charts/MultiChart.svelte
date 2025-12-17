<script lang="ts">
	import { LineChart } from "layerchart";
	import { scaleUtc } from "d3-scale";
	import { curveNatural } from "d3-shape";
	import Scale from "@lucide/svelte/icons/scale";
	import * as Chart from "$lib/components/ui/chart/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import Badge from "$lib/components/ui/badge/badge.svelte";
import Filter from "@lucide/svelte/icons/list-filter";
	let { dateSeriesData, viewMode = $bindable("7days") } = $props();

	$effect(() => {
		const savedViewMode = localStorage.getItem("multiChart");
		if (savedViewMode) {
			viewMode = savedViewMode as "7days" | "month";
		}
	});

	$effect(() => {
		localStorage.setItem("multiChart", viewMode);
	});
	const chartConfig = {
		waist: { label: "Waist", color: "var(--accent)" },
		weight: { label: "Weights", color: "var(--secondary)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="bg-primary my-2">
	<Card.Header>
		<div class="flex flex-row justify-between">
			<div>
				<Card.Title><Scale /></Card.Title>
				<Card.Description>Measurements</Card.Description>
			</div>

			<div>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="cursor-pointer">
						<Badge
							><Filter class="h-4 w-4 mr-2"/>{viewMode == "7days" ? "Last 7 Days" : "Last Month"}
						</Badge>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item
								class={viewMode === "month" ? "text-secondary" : ""}
								onclick={() => (viewMode = "month")}>Last Month</DropdownMenu.Item
							>
							<DropdownMenu.Item
								class={viewMode === "7days" ? "text-secondary" : ""}
								onclick={() => (viewMode = "7days")}>Last 7 Days</DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig} class="h-[100px] w-full">
			<LineChart
				data={dateSeriesData}
				x="createdAt"
				xScale={scaleUtc()}
				axis={false}
				grid={false}
				points={{ r: 4 }}
				series={[
					{
						key: "waist",
						label: "Waist",
						color: chartConfig.waist.color,
					},
					{
						key: "weight",
						label: "Weight",
						color: chartConfig.weight.color,
					},
					
				]}
				props={{
					spline: { curve: curveNatural, motion: "tween", strokeWidth: 2 },
					highlight: {
						points: {
							motion: "none",
							r: 6,
						},
					},
					xAxis: {
						format: (v: Date) => v.toLocaleDateString("en-US", { month: "short" }),
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
			</LineChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full items-start gap-2 text-sm">
			<div class="grid gap-2">
				<!-- <div class="flex items-center gap-2 leading-none font-medium">
					<TrendingUpIcon class="size-4" />
				</div> -->
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					{viewMode == "7days" ? "Last 7 days" : "Last 30 days"}
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
