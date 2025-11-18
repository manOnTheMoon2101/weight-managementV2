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
		CsvExportModule,
	} from "ag-grid-community";
	import type { GridApi } from "ag-grid-community";

	ModuleRegistry.registerModules([
		ClientSideRowModelModule,
		TextFilterModule,
		NumberFilterModule,
		DateFilterModule,
		CsvExportModule,
	]);

	const { columnDefs = [], rowData = [] } = $props();
	let gridApi: GridApi | null = null;

	const darkTheme = themeQuartz.withPart(colorSchemeDarkBlue).withParams({
		backgroundColor: `var(--background)`,
		foregroundColor: `var(--foreground)`,
		headerBackgroundColor: `var(--secondary)`,
		headerTextColor: "white",
		oddRowBackgroundColor: "var(--primary)",
		rowHoverColor:'var(--secondary)'
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

	function exportToCsv() {
		if (gridApi) {
			gridApi.exportDataAsCsv({
				fileName: `Weight-Tracker-${new Date().toISOString().split('T')[0]}.csv`,
			});
		}
	}
	export { exportToCsv };
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

<div class="flex flex-col gap-4">
	<!-- <div class="flex flex-row items-center justify-end">
		<ArrowDownToLine />
		<Button variant="outline" onclick={exportToCsv}>
			Download CSV
		</Button>
	</div> -->
	<div bind:this={gridDiv} style="height: 80vh; width: 100%;"></div>
</div>
