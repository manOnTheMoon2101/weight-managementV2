<script lang="ts">
  import { PieChart } from "layerchart";
  import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  	import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
    	import Pill from "@lucide/svelte/icons/pill";
  	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";


  	const colors = ["var(--accent)", "white", "var(--secondary)", "var(--background)", "var(--zen)"];
  const chartData = [
    { browser: "chrome", visitors: 275, color: colors[0]},
    { browser: "safari", visitors: 200, color: colors[1] },
    { browser: "firefox", visitors: 187, color: colors[2]},
    { browser: "edge", visitors: 173, color: colors[3] },
    { browser: "other", visitors: 90, color: colors[4] },
  ];

  const chartConfig = {
    visitors: { label: "Visitors" },
    chrome: { label: "Chrome", color: "var(--chart-1)" },
    safari: { label: "Safari", color: "var(--chart-2)" },
    firefox: { label: "Firefox", color: "var(--chart-3)" },
    edge: { label: "Edge", color: "var(--chart-4)" },
    other: { label: "Other", color: "var(--chart-5)" },
  } satisfies Chart.ChartConfig;
</script>

<Card.Root class="flex flex-col bg-primary">
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
  <Card.Content class="flex-1">
    <Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-[250px]">
      <PieChart
        data={chartData}
        key="browser"
        value="visitors"
        label={(d) =>
          d.browser
            .split("")
            .map((c, i) => (i === 0 ? c.toUpperCase() : c))
            .join("")}
        cRange={chartData.map((d) => d.color)}
        props={{
          pie: {
            motion: "tween",
          },
        }}
        legend
      >
        {#snippet tooltip()}
          <Chart.Tooltip hideLabel />
        {/snippet}
      </PieChart>
    </Chart.Container>
  </Card.Content>
  <Card.Footer class="flex-col gap-2 text-sm">
    <div class="flex items-center gap-2 font-medium leading-none">
      Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
    </div>
    <div class="text-muted-foreground leading-none">
      Showing total visitors for the last 6 months
    </div>
  </Card.Footer>
</Card.Root>
