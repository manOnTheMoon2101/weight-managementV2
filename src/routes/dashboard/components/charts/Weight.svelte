<script>
  import { Chart, Svg, Axis, Spline } from 'layerchart';
 
  let {
    dateSeriesData
  } = $props();
 
  $inspect(dateSeriesData);
</script>
<div class="h-[300px] w-1/2 p-4 border rounded-sm bg-background">
  <Chart
    data={dateSeriesData}
    x="createdAt"
    y="weight"
    yDomain={[70, 100]}
    yNice
    padding={{ left: 60, bottom: 40, top: 20, right: 20 }}
  >
    <Svg>
      <Axis placement="left" rule class="text-slate-300 stroke-slate-300" title="Weight (kg)"/>
      <!-- <Axis placement="bottom" rule class="text-slate-300 stroke-white" title="Date" /> -->
      <Spline class="stroke-2 stroke-accent" />
    </Svg>
  </Chart>
</div>