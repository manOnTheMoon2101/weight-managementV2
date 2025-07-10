<script lang="ts">
  import { onMount } from 'svelte';
  import { AgCharts } from 'ag-charts-community';
  let chartDiv: HTMLDivElement;
  let chart: any;

  const options = {
    container: undefined, // will be set in onMount
    data: [
      { x: 1, y: 3 },
      { x: 2, y: 7 },
      { x: 3, y: 4 },
      { x: 4, y: 9 },
      { x: 5, y: 6 }
    ],
    series: [
      {
        type: 'line',
        xKey: 'x',
        yKey: 'y',
        marker: { enabled: true },
      }
    ],
    title: {
      text: 'Simple Line Chart',
    },
    legend: {
      enabled: false
    }
  };

  onMount(() => {
    if (chartDiv) {
      // Deep clone options to avoid mutation and ensure correct typing
      const chartOptions = JSON.parse(JSON.stringify(options));
      chartOptions.container = chartDiv;
      chart = AgCharts.create(chartOptions);
    }
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  });
</script>

<div bind:this={chartDiv} style="width: 100%; height: 300px;"></div>
