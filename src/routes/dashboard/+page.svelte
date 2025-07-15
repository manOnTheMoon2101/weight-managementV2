<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import Table from "./components/table/table.svelte";
	import Chart from "./components/charts/chart.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	$: nutrients = data.nutrients.map((row) => ({
		...row,
		cla: row.supplements?.map((x) => x.cla),
		fatBurner: row.supplements?.map((x) => x.fatburner),
		appleCider: row.supplements?.map((x) => x.appleCider),
		multiVitamin: row.supplements?.map((x) => x.multiVitamin),
	}));

	const columns = [
		{ headerName: "Date", field: "createdAt" },
		{ headerName: "Calories", field: "calories" },
		{ headerName: "Protein", field: "protein" },
		{ headerName: "Fat", field: "sugar" },
		{ headerName: "Sugar", field: "sugar" },
		{ headerName: "Carbs", field: "carbs" },
		{ headerName: "CLA", field: "cla" },
		{ headerName: "Fat Burner", field: "fatBurner" },
		{ headerName: "Apple Cider", field: "appleCider" },
		{ headerName: "Multi Vitamin", field: "multiVitamin" },
	];
</script>

<div class="flex flex-col gap-1">
	<div class="bg-card text-card-foreground rounded-md border p-1 font-mono">
		<div class="flex flex-row justify-around">
			<Table columnDefs={columns} rowData={nutrients} />

			<Chart />
			<Chart />
		</div>
		<Button href="/" class="w-fit" size="lg">Back to Home</Button>
	</div>
</div>
