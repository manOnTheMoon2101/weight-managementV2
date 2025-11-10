<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Chart from "$lib/components/ui/chart/index.js";
	import { ArcChart, Text } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
	import Droplet from "@lucide/svelte/icons/droplet";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import Badge from "$lib/components/ui/badge/badge.svelte";

	let { dateSeriesData, viewMode = $bindable("7days"), waterLimit } = $props();



	$effect(() => {
		const savedViewMode = localStorage.getItem("waterChart");
		if (savedViewMode) {
			viewMode = savedViewMode as "7days" | "month";
		}
	});

	$effect(() => {
		localStorage.setItem("waterChart", viewMode);
	});

	let averageWater = $derived(
		dateSeriesData && dateSeriesData.length > 0
			? Math.round(
					dateSeriesData.reduce((sum: number, x: any) => sum + x.water, 0) / dateSeriesData.length
				)
			: 0
	);

	let minWater = $derived(
		dateSeriesData && dateSeriesData.length > 0
			? Math.min(...dateSeriesData.map((x: any) => x.water))
			: 0
	);

	let maxWater = $derived(
		dateSeriesData && dateSeriesData.length > 0
			? Math.max(...dateSeriesData.map((x: any) => x.water))
			: 0
	);

	const chartConfig = {
		water: { label: "Water", color: "var(--accent)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="bg-primary mx-2">
	<Card.Header>
		<div class="flex flex-row justify-between">
			<div>
				<Card.Title><Droplet /></Card.Title>
				<Card.Description>Water</Card.Description>
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
	<Card.Content class="flex-1">
		<Chart.Container config={chartConfig}>
			<ArcChart
				label="water"
				value="water"
				outerRadius={66}
				innerRadius={46}
				trackOuterRadius={63}
				trackInnerRadius={52}
				padding={40}
				range={[0, 360]}
				maxValue={waterLimit}
				series={[
					{
						key: "water",
						color: "var(--accent)",
						data: [{ water: averageWater }],
					},
				]}
				props={{
					arc: { track: { fill: "var(--muted)" }, motion: "tween" },
					tooltip: { context: { hideDelay: 350 } },
				}}
				tooltip={false}
			>
				{#snippet belowMarks()}
					<circle cx="0" cy="0" r="60" class="fill-background" />
				{/snippet}
				{#snippet aboveMarks()}
					<Text
						value={String(averageWater)}
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-orange-900 text-4xl! font-bold"
						dy={3}
					/>
					<Text
						value="ml"
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-muted-foreground!"
						dy={22}
					/>
				{/snippet}
			</ArcChart>
		</Chart.Container>
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full items-start text-sm">
			<div class="grid">
				<div class="flex items-center gap-2 leading-none font-medium">
					{averageWater} ml avg water for last {viewMode == "7days" ? "7 days" : "30 days"}
					
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					Range: {minWater} - {maxWater} ml
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
