<script lang="ts">
  import { onMount } from 'svelte';
  import { AgCharts } from 'ag-charts-community';
  
  let chartDiv: HTMLDivElement;
  let chart: any;
  export let rowData: Array<any> = [];

  $: chartData = rowData.length > 0 ? rowData.map(item => ({
    x: new Date(item.createdAt),
    y: item.protein
  })) : [];
  $: console.log('rowData:', rowData);
  $: console.log('chartData:', chartData);
  
  function createChart() {
    if (chartDiv && chartData.length > 0) {
      if (chart) {
        chart.destroy();
      }
      
      const options : any = {
        container: chartDiv,
        data: chartData,
        series: [
          {
            type: 'line',
            xKey: 'x',
            yKey: 'y',
            marker: { enabled: true },
          }
        ],
        title: {
          text: 'Protein Over Time',
        },
        legend: {
          enabled: false
        },
        axes: [
          {
            type: 'time',
            position: 'bottom',
            title: {
              text: 'Date'
            }
          },
          {
            type: 'number',
            position: 'left',
            title: {
              text: 'Protein'
            }
          }
        ]
      };
      
      chart = AgCharts.create(options);
    }
  }
  
  onMount(() => {
    createChart();
    
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  });
  
  // Recreate chart when data changes
  $: if (chartDiv && chartData.length > 0) {
    createChart();
  }
</script>

<div bind:this={chartDiv} style="width: 50%; height: 300px;" class="mx-1"></div>