<div class="flex flex-col gap-1">
	<div class="rounded-md border bg-card p-1 font-mono text-card-foreground">
		<div class="flex flex-row justify-around">
           
            <Table columnDefs={columns} rowData={nutrients} />
           
        <Chart/>
        <Chart/>
        </div>
		<Button href="/" class="w-fit" size="lg">Back to Home</Button>
		
	</div>
</div>


<script lang="ts">
import { Button } from "$lib/components/ui/button";
import Table from "./components/table/table.svelte"
import Chart from "./components/charts/chart.svelte"
import type { PageData } from './$types';
  
  export let data: PageData;


  
  $: nutrients = data.nutrients;

  console.log(nutrients)

const columns = [
        { headerName: 'Date', field: 'createdAt' },
        { headerName: 'Calories', field: 'calories' },
        { headerName: 'Protein', field: 'protein' },
        { headerName: 'Fat', field: 'sugar' },
        { headerName: 'Sugar', field: 'sugar' },
        { headerName: 'Carbs', field: 'carbs' },
       
    ];

</script>