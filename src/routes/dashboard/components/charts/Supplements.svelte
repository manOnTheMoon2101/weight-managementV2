<script lang="ts">
	import { PieChart } from "layerchart";
	import * as Chart from "$lib/components/ui/chart/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import Pill from "@lucide/svelte/icons/pill";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import Badge from "$lib/components/ui/badge/badge.svelte";
import Filter from "@lucide/svelte/icons/list-filter";
	interface SupplementEntry {
		quantity: number | null;
		waist: string;
		type: string;
		color: string;
		createdAt: Date;
	}

	interface Props {
		weekData?: SupplementEntry[] | null;
		monthData?: SupplementEntry[] | null;
	}

	let { weekData = null, monthData = null }: Props = $props();

	let viewMode = $state<"week" | "month">("week");

	$effect(() => {
		const savedViewMode = localStorage.getItem("supplementsChart");
		if (savedViewMode) {
			viewMode = savedViewMode as "week" | "month";
		}
	});

	$effect(() => {
		localStorage.setItem("supplementsChart", viewMode);
	});

	const currentData = $derived(viewMode === "week" ? weekData : monthData);

	const chartData = $derived(() => {
		if (!currentData || currentData.length === 0) return [];
		const supplementMap = new Map<string, { count: number; color: string; type: string }>();

		currentData.forEach((entry, index) => {
			const name = entry.waist || "Unknown";
			const quantity = entry.quantity || 0;
			const existing = supplementMap.get(name);

			if (existing) {
				existing.count += quantity;
			} else {
				supplementMap.set(name, {
					count: quantity,
					color: entry.color || "white",
					type: entry.type || "supplement",
				});
			}
		});
		return Array.from(supplementMap.entries())
			.map(([name, data]) => ({
				supplement: name,
				count: data.count,
				color: data.color,
				type: data.type,
			}))
			.filter((item) => item.count > 0);
	});

	const chartConfig = $derived(() => {
		const config: Record<string, { label: string; color?: string }> = {
			count: { label: "Count" },
		};

		chartData().forEach((item) => {
			config[item.supplement] = {
				label: item.supplement,
				color: item.color,
			};
		});

		return config;
	});

	const totalCount = $derived(chartData().reduce((sum, item) => sum + item.count, 0));
</script>

<Card.Root class="bg-primary my-2 flex flex-col">
	<Card.Header>
		<div class="flex flex-row justify-between">
			<div>
				<Card.Title><Pill /></Card.Title>
				<Card.Description>Supplements</Card.Description>
			</div>

			<div>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="cursor-pointer">
						<Badge><Filter class="h-4 w-4 mr-2"/>{viewMode == "week" ? "Last 7 Days" : "Last Month"}</Badge>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item
								onclick={() => (viewMode = "month")}
								class={viewMode === "month" ? "text-secondary" : ""}
							>
								Last Month
							</DropdownMenu.Item>
							<DropdownMenu.Item
								onclick={() => (viewMode = "week")}
								class={viewMode === "week" ? "text-secondary" : ""}
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
			<Chart.Container config={chartConfig()}>
				<PieChart
					data={chartData()}
					key="supplement"
					value="count"
					label={(d) => d.supplement}
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
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
