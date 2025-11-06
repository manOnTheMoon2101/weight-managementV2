<script lang="ts">
  import { scaleBand } from "d3-scale";
  import { BarChart, type ChartContextValue } from "layerchart";
  import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { cubicInOut } from "svelte/easing";
  	import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
    	import Beef from "@lucide/svelte/icons/beef";
  	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig = {
    desktop: { label: "Desktop", color: "var(--accent)" },
  } satisfies Chart.ChartConfig;

  let context = $state<ChartContextValue>();
</script>

<Card.Root class="bg-primary">
  <Card.Header>
    <div class="flex flex-row justify-between">
			<div>
				<Card.Title><Beef /></Card.Title>
				<Card.Description>Protein</Card.Description>
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
								
							>
								Last Month
							</DropdownMenu.Item>
							<DropdownMenu.Item
								
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
        data={chartData}
        xScale={scaleBand().padding(0.25)}
        x="month"
        axis="x"
        grid={false}
        series={[{ key: "desktop", label: "Desktop", color: chartConfig.desktop.color }]}
        props={{
          bars: {
            stroke: "none",
            rounded: "all",
            radius: 8,
            // use the height of the chart to animate the bars
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
          xAxis: { format: (d) => d.slice(0, 3) },
        }}
      >
        {#snippet tooltip()}
          <Chart.Tooltip hideLabel />
        {/snippet}
      </BarChart>
    </Chart.Container>
  </Card.Content>
  <Card.Footer>
    <div class="flex w-full items-start gap-2 text-sm">
      <div class="grid gap-2">
        <div class="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
        </div>
        <div class="text-muted-foreground flex items-center gap-2 leading-none">
          Showing total visitors for the last 6 months
        </div>
      </div>
    </div>
  </Card.Footer>
</Card.Root>
