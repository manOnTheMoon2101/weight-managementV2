<script lang="ts">
	import { LineChart } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import { curveNatural } from "d3-shape";
	import { scaleUtc } from "d3-scale";
	import * as Chart from "$lib/components/ui/chart/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import Bed from "@lucide/svelte/icons/bed";
	import Badge from "$lib/components/ui/badge/badge.svelte";

	let { dateSeriesData, viewMode = $bindable("7days") } = $props();


	$effect(() => {
		const savedViewMode = localStorage.getItem("sleepChart");
		if (savedViewMode) {
			viewMode = savedViewMode as "7days" | "month";
		}
	});

	$effect(() => {
		localStorage.setItem("sleepChart", viewMode);
	});

	function timeToHours(timeStr: string): number {
		if (!timeStr) return 0;
		const [hours, minutes, seconds] = timeStr.split(":").map(Number);
		return hours + minutes / 60 + (seconds || 0) / 3600;
	}

	let transformedData = $derived(
		dateSeriesData && dateSeriesData.length > 0
			? dateSeriesData.map((x: any) => ({
					...x,
					hours: timeToHours(x.time),
				}))
			: []
	);

	let averageSleep = $derived(
		transformedData.length > 0
			? (
					transformedData.reduce((sum: any, x: any) => sum + x.hours, 0) / transformedData.length
				).toFixed(1)
			: 0
	);

	let minSleep = $derived(
		transformedData.length > 0
			? Math.min(...transformedData.map((x: any) => x.hours)).toFixed(1)
			: 0
	);

	let maxSleep = $derived(
		transformedData.length > 0
			? Math.max(...transformedData.map((x: any) => x.hours)).toFixed(1)
			: 0
	);

	const chartConfig = {
		hours: { label: "Hours", color: "var(--accent)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="bg-primary mx-2 my-2">
	<Card.Header>
		<div class="flex flex-row justify-between">
			<div>
				<Card.Title><Bed /></Card.Title>
				<Card.Description>Sleep</Card.Description>
			</div>

			<div>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="cursor-pointer">
						<Badge
							>{viewMode == "7days" ? "Last 7 Days" : "Last Month"}
						</Badge>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
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
			<LineChart
				points={{ r: 4 }}
				data={transformedData}
				x="createdAt"
				xScale={scaleUtc()}
				axis={false}
				grid={false}
				series={[
					{
						key: "hours",
						label: "Hours",
						color: chartConfig.hours.color,
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
		<div class="flex w-full items-start text-sm">
			<div class="grid">
				<div class="flex items-center gap-2 leading-none font-medium">
					{averageSleep} avg hours for last {viewMode == "7days" ? "7 days" : "30 days"}
					
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					Range: {minSleep} - {maxSleep} hours
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
