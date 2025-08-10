<script lang="ts">
  import { onMount } from "svelte";
  import { AgCharts } from "ag-charts-community";
  
  let chartDiv = $state<HTMLDivElement>();
  let chart = $state<any>();
  
  interface Props {
    rowData?: Array<any>;
  }
  
  let { rowData = [] }: Props = $props();
  $inspect(rowData)
  
  const options = {
    container: undefined as HTMLDivElement | undefined,
    data: rowData,
    theme: {
      palette: {
        fills: ['#2563eb', '#3b82f6', '#60a5fa'],
        strokes: ['#2563eb', '#3b82f6', '#60a5fa'],
      },
      overrides: {
        common: {
          background: {
            fill: 'var(--background)',
          },
          title: {
            color: 'var(--foreground)',
          },
        },
        line: {
          series: {
            strokeWidth: 2,
            marker: {
              fill: '#2563eb',
              stroke: '#2563eb',
              strokeWidth: 2,
            },
          },
        },
        axes: {
          label: {
            color: 'var(--foreground)',
          },
          title: {
            color: 'var(--foreground)',
          },
          line: {
            color: 'var(--accent)',
          },
          tick: {
            color: 'var(--accent)',
          },
          gridLine: {
            style: [{
              stroke: 'var(--accent)',
              strokeOpacity: 0.1,
            }],
          },
        },
      },
    },
    series: [
      {
        type: "line",
        xKey: "createdAt", // Using createdAt date field
        yKey: "weight", // Using weight field
        marker: { enabled: true },
      },
    ],
    axes: [
      {
        type: "time",
        position: "bottom",
        line: { enabled: false },
        tick: { enabled: false },
        label: { enabled: false },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "Weight",
        },
      },
    ],
    title: {
      text: "Weight Chart",
    },
    legend: {
      enabled: false,
    },
  };
  
  onMount(() => {
    if (chartDiv) {
      const chartOptions = structuredClone(options);
      chartOptions.container = chartDiv;
      chart = AgCharts.create(chartOptions);
    }
    
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  });
  
  // React to rowData changes using $effect
  $effect(() => {
    if (chart && rowData.length > 0) {
      chart.data = rowData;
    }
  });
</script>

<div bind:this={chartDiv} style="width: 100%; height: 300px;" class="mx-1"></div>