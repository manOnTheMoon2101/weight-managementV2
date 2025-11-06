<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Chart from "$lib/components/ui/chart/index.js";
	import { ArcChart, Text } from "layerchart";
	import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
	import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
	import Droplet from "@lucide/svelte/icons/droplet";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	const chartData = [{ browser: "safari", visitors: 2700, color: "var(--color-safari)" }];

	const chartConfig = {
		visitors: { label: "Water" },
		safari: { label: "Safari", color: "var(--accent)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="bg-primary">
	<Card.Header>
		<div class="flex flex-row justify-between">
			<div>
				<Card.Title><Droplet /></Card.Title>
				<Card.Description>Avarage Water</Card.Description>
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
							<DropdownMenu.Item>Last Month</DropdownMenu.Item>
							<DropdownMenu.Item>Last 7 Days</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container config={chartConfig} >
			<ArcChart
				label="browser"
				value="visitors"
				outerRadius={66}
				innerRadius={46}
				trackOuterRadius={63}
				trackInnerRadius={52}
				padding={40}
				range={[0, 360]}
				maxValue={3000}
				series={chartData.map((d) => ({
					key: d.browser,
					color: d.color,
					data: [d],
				}))}
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
						value={String(chartData[0].visitors)}
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-foreground text-4xl! font-bold"
						dy={3}
					/>
					<Text
						value="Water"
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
					test avg steps for last 7 days <TrendingUpIcon class="size-4" />
				</div>
				<div class="text-muted-foreground flex items-center gap-2 leading-none">
					Range: 200 - 2250 ml
				</div>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
