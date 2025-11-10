<script lang="ts">
	import { PieChart } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import * as Chart from "$lib/components/ui/chart/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
	import Pill from "@lucide/svelte/icons/pill";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	interface Props {
		weekData?: Array<{
			fatburnerCount: number;
			multiVitaminCount: number;
			magnesiumCount: number;
			claCount: number;
			zenCount: number;
		}> | null;
		monthData?: Array<{
			fatburnerCount: number;
			multiVitaminCount: number;
			magnesiumCount: number;
			claCount: number;
			zenCount: number;
		}> | null;
	}

	let { weekData = null, monthData = null }: Props = $props();

	let viewMode = $state<"week" | "month">("week");



	$effect(() => {
		const savedViewMode = localStorage.getItem("supplementsChart");
		if (savedViewMode) {
			viewMode = savedViewMode as "7days" | "month";
		}
	});

	$effect(() => {
		localStorage.setItem("supplementsChart", viewMode);
	});
	const colors = [
		"var(--accent)",
		"var(--primary)",
		"var(--secondary)",
		"var(--accent)",
		"var(--background)",
	];

	const currentData = $derived(viewMode === "week" ? weekData?.[0] : monthData?.[0]);

	const chartData = $derived(() => {
		if (!currentData) return [];

		return [
			{
				supplement: "fatburner",
				count: Number(currentData.fatburnerCount) || 0,
				color: colors[0],
			},
			{
				supplement: "multiVitamin",
				count: Number(currentData.multiVitaminCount) || 0,
				color: colors[1],
			},
			{
				supplement: "magnesium",
				count: Number(currentData.magnesiumCount) || 0,
				color: colors[2],
			},
			{
				supplement: "cla",
				count: Number(currentData.claCount) || 0,
				color: colors[3],
			},
			{
				supplement: "zen",
				count: Number(currentData.zenCount) || 0,
				color: colors[4],
			},
		].filter((item) => item.count > 0);
	});

	const chartConfig = {
		count: { label: "Count" },
		fatburner: { label: "Fat Burner", color: colors[0] },
		multiVitamin: { label: "Multi Vitamin", color: colors[1] },
		magnesium: { label: "Magnesium", color: colors[2] },
		cla: { label: "CLA", color: colors[3] },
		zen: { label: "Zen", color: colors[4] },
	} satisfies Chart.ChartConfig;

	const totalCount = $derived(chartData().reduce((sum, item) => sum + item.count, 0));
</script>

<Card.Root class="bg-primary flex flex-col">
	<Card.Header>
		<div class="flex flex-row justify-between">
			<div>
				<Card.Title><Pill /></Card.Title>
				<Card.Description>Supplements</Card.Description>
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
								onclick={() => (viewMode = "month")}
								class={viewMode === "month" ? "bg-accent" : ""}
							>
								Last Month
							</DropdownMenu.Item>
							<DropdownMenu.Item
								onclick={() => (viewMode = "week")}
								class={viewMode === "week" ? "bg-accent" : ""}
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
		{#if chartData().length > 0}
			<Chart.Container config={chartConfig}>
				<PieChart
					data={chartData()}
					key="supplement"
					value="count"
					label={(d) =>
						d.supplement
							.split("")
							.map((c, i) => (i === 0 ? c.toUpperCase() : c))
							.join("")}
					cRange={chartData().map((d) => d.color)}
					props={{
						pie: {
							motion: "tween",
						},
					}}
				>
					{#snippet tooltip()}
						<Chart.Tooltip hideLabel />
					{/snippet}
				</PieChart>
			</Chart.Container>
		{:else}
			<div class="text-muted-foreground flex h-[250px] items-center justify-center">
				No supplement data available
			</div>
		{/if}
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full items-start text-sm">
			<div class="grid">
				<div class="flex items-center gap-2 leading-none font-medium">
					Total {totalCount} supplements used for last {viewMode === "week" ? "7 days" : "month"}
					<TrendingUpIcon class="size-4" />
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
