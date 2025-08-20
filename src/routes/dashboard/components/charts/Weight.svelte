<script>
	import { Chart, Svg, Axis, Spline, LineChart, Points , Tooltip , Highlight } from "layerchart";

	let { dateSeriesData } = $props();

</script>

<div class="bg-background h-[300px] w-full border border-accent rounded-2xl p-4">
	<h2 class="text-2xl font-bold text-center">Weight(kg)</h2>
	<LineChart
		data={dateSeriesData}
		x="createdAt"
		y="weight"
		points
		yDomain={[70, 100]}
		padding={{ left: 60, bottom: 40, top: 20, right: 20 }}
	>
		<Svg>
			<Axis placement="left" rule class="fill-foreground" />
			<Axis placement="bottom" rule class="fill-foreground"  />
			<Spline class="stroke-foreground stroke-2" />
			<Points class="fill-accent" />
			<Highlight points lines />
		</Svg>
		<Tooltip.Root class="bg-accent">
			{#snippet children({ data })}
			  <!-- <Tooltip.Header value={data.createdAt} format="day" /> -->
			  <Tooltip.List>
				<Tooltip.Item label={'Date'} value={data.createdAt} />
				<Tooltip.Item label={'Weight'} value={data.weight} />
			  </Tooltip.List>
			{/snippet}
		  </Tooltip.Root>
	</LineChart>


	
</div>
