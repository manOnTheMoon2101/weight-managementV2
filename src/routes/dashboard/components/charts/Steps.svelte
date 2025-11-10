<script lang="ts">
	import { AreaChart } from "layerchart";
	import { curveNatural } from "d3-shape";
	import { scaleUtc } from "d3-scale";
	import * as Chart from "$lib/components/ui/chart/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import Footprints from "@lucide/svelte/icons/footprints";
	import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import Badge from "$lib/components/ui/badge/badge.svelte";

	let { dateSeriesData, viewMode = $bindable("7days") } = $props();

	$effect(() => {
		const savedViewMode = localStorage.getItem("stepsChart");
		if (savedViewMode) {
			viewMode = savedViewMode as "7days" | "month";
		}
	});

	$effect(() => {
		localStorage.setItem("stepsChart", viewMode);
	});

	let averageSteps = $derived(
		dateSeriesData && dateSeriesData.length > 0
			? Math.round(
					dateSeriesData.reduce((sum: number, x: any) => sum + x.steps, 0) / dateSeriesData.length
				)
			: 0
	);

	let minSteps = $derived(
		dateSeriesData && dateSeriesData.length > 0
			? Math.min(...dateSeriesData.map((x: any) => x.steps))
			: 0
	);

	let maxSteps = $derived(
		dateSeriesData && dateSeriesData.length > 0
			? Math.max(...dateSeriesData.map((x: any) => x.steps))
			: 0
	);

	const chartConfig = {
		steps: { label: "Steps", color: "var(--accent)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="bg-primary mx-2">
	<Card.Header>
		<div class="flex flex-row justify-between">
			<div>
				<Card.Title><Footprints /></Card.Title>
				<Card.Description>Steps</Card.Description>
			</div>

			<div>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="cursor-pointer">
						<Badge class="bg-amber-500 text-center text-xs "
							>{viewMode == "7days" ? "Last 7 Days" : "Last Month"}
						</Badge>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label class="flex items-center">Set Filter</DropdownMenu.Label>
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
	<Card.Footer>
		<div class="flex w-full items-start text-sm">
			<div class="grid">
				<div class="flex items-center gap-2 leading-none font-medium">
					{averageSteps} avg steps for last {viewMode == "7days" ? "7 days" : "30 days"}
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					Range: {minSteps.toLocaleString()} - {maxSteps.toLocaleString()} steps
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
