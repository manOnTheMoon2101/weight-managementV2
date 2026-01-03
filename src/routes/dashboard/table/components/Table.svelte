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
		backgroundColor: `var(--primary)`,
		foregroundColor: `var(--foreground)`,
		headerBackgroundColor: `var(--secondary)`,
		headerTextColor: "var(--foreground)",
		oddRowBackgroundColor: "var(--background)",
		rowHoverColor: "var(--secondary)",
		headerFontSize: 14,
		fontSize: 13,
	});

	let gridDiv: HTMLDivElement;

	function exportToCsv() {
		if (gridApi) {
			gridApi.exportDataAsCsv({
				fileName: `Weight-Tracker-${new Date().toISOString().split("T")[0]}.csv`,
			});
		}
	}
	export { exportToCsv };
	onMount(() => {
		const isMobile = window.innerWidth < 768;

		const gridOptions: GridOptions<any> = {
			theme: darkTheme,
			columnDefs,
			rowData,
			defaultColDef: {
				sortable: true,
				filter: true,
				flex: 1,
				minWidth: isMobile ? 120 : undefined,
			},
			suppressHorizontalScroll: false,
			onGridReady: (params) => {
				gridApi = params.api;
				if (isMobile) {
					params.api.sizeColumnsToFit();
				}
			},
		};

		if (gridDiv) {
			createGrid(gridDiv, gridOptions);
		}

		const handleResize = () => {
			if (gridApi) {
				gridApi.sizeColumnsToFit();
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	});
</script>

<div class="shadow-secondary flex flex-col gap-4 shadow-lg">
	<div
		bind:this={gridDiv}
		class="ag-theme-quartz-dark w-full overflow-x-auto"
		style="height: 80vh;"
	></div>
</div>
