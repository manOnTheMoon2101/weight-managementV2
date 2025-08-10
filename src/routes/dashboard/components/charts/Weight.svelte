<script>
	import { Chart, Svg, Axis, Spline, LineChart, Points } from "layerchart";

	let { dateSeriesData } = $props();

	$inspect(dateSeriesData);
</script>

<div class="bg-background h-[300px] w-1/2 rounded-sm border p-4">
	<LineChart
		data={dateSeriesData}
		x="createdAt"
		y="weight"
		points
		yDomain={[70, 100]}
		yNice
		padding={{ left: 60, bottom: 40, top: 20, right: 20 }}
	>
		<Svg>
			<Axis placement="left" rule class=" fill-white" />
			<!-- <Axis placement="bottom" rule class="text-slate-300 stroke-white" title="Date" /> -->
			<Spline class="stroke-accent stroke-2" />
			<Points class="fill-accent" />
		</Svg>
	</LineChart>
</div>
