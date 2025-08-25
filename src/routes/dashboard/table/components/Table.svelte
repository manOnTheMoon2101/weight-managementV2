<script lang="ts">
	import { onMount } from "svelte";
	import {
		createGrid,
		ModuleRegistry,
		ClientSideRowModelModule,
		TextFilterModule,
		NumberFilterModule,
		DateFilterModule,
		type GridOptions,
		themeQuartz,
		colorSchemeDarkBlue,
	} from "ag-grid-community";
	import type { GridApi } from "ag-grid-community";

	ModuleRegistry.registerModules([
		ClientSideRowModelModule,
		TextFilterModule,
		NumberFilterModule,
		DateFilterModule,
	]);

	const { columnDefs = [], rowData = [] } = $props();

	let gridApi: GridApi | null = null;

	const darkTheme = themeQuartz.withPart(colorSchemeDarkBlue).withParams({
		backgroundColor: `var(--background)`,
		foregroundColor: `var(--foreground)`,
		headerBackgroundColor: `var(--secondary)`,
		headerTextColor: "var(--foreground)",
		// oddRowBackgroundColor: "#263299",
	});

	let gridDiv: HTMLDivElement;
	let filterValue = $state("");


	function onFilterTextBoxChanged(
		event: Event & { currentTarget: EventTarget & HTMLInputElement }
	) {
		filterValue = event.currentTarget.value;

		if (gridApi) {
			gridApi.setGridOption("quickFilterText", filterValue);
		}
	}
	onMount(() => {
		const gridOptions: GridOptions<any> = {
			theme: darkTheme,
			columnDefs,
			rowData,
			defaultColDef: {
				sortable: true,
				filter: true,
				flex: 1,
			},
			onGridReady: (params) => {
				gridApi = params.api;
			},
		};

		if (gridDiv) {
			createGrid(gridDiv, gridOptions);
		}
	});






</script>
<div class="flex flex-row justify-between">
</div>
<div bind:this={gridDiv} style="height: 80vh; width: 100%;"></div>
