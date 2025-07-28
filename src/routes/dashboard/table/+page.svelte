<script lang="ts">
	import Table from "./components/Table.svelte";

	import type { PageData } from "./$types";
	import Button from "$lib/components/ui/button/button.svelte";
	export let data: PageData;

	$: nutrients = data.nutrients.map((row) => ({
		...row,
		cla: row.supplements?.map((x) => x.cla),
		fatBurner: row.supplements?.map((x) => x.fatburner),
		appleCider: row.supplements?.map((x) => x.appleCider),
		multiVitamin: row.supplements?.map((x) => x.multiVitamin),
		magnesium: row.supplements?.map((x) => x.magnesium),
		weight: row.health_tracker?.map((x) => x.weight),
		water: row.health_tracker?.map((x) => x.water),
		steps: row.health_tracker?.map((x) => x.steps),
		score: row.sleep_schedule?.map((x) => x.score),
	}));

	const columns = [
		{
			headerName: "Actions",
			field: "actions",
			cellRenderer: (params: any) => {
				return `     <button class="edit-btn" data-row-index="${params.node.rowIndex}">Edit</button>
				`;
			},
		},
		{ headerName: "Date", field: "createdAt" },
		{ headerName: "Weight", field: "weight" },
		{ headerName: "Water", field: "water" },
		{ headerName: "Calories", field: "calories" },
		{ headerName: "Protein", field: "protein" },
		{ headerName: "Fat", field: "fat" },
		{ headerName: "Sugar", field: "sugar" },
		{ headerName: "Carbs", field: "carbs" },
		{ headerName: "CLA", field: "cla" },
		{ headerName: "Fat Burner", field: "fatBurner" },
		{ headerName: "Apple Cider", field: "appleCider" },
		{ headerName: "Multi Vitamin", field: "multiVitamin" },
		{ headerName: "Magnesium", field: "magnesium" },
	];
</script>

<div>
	<Table rowData={nutrients} columnDefs={columns} />
</div>
