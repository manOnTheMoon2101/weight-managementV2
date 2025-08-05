<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
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
	import Input from "$lib/components/ui/input/input.svelte";
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		today,
		parseDate,
	} from "@internationalized/date";

	ModuleRegistry.registerModules([
		ClientSideRowModelModule,
		TextFilterModule,
		NumberFilterModule,
		DateFilterModule,
	]);

	let value: { start: DateValue | undefined; end: DateValue | undefined } | undefined = $state();

	const { columnDefs = [], rowData = [] } = $props();

	let gridApi: GridApi | null = null;

	const darkTheme = themeQuartz.withPart(colorSchemeDarkBlue).withParams({
		backgroundColor: `var(--background)`,
		foregroundColor: `var(--foreground)`,
		headerBackgroundColor: `var(--accent)`,
		headerTextColor: "#cfd8dc",
		// oddRowBackgroundColor: "#263299",
	});

	let gridDiv: HTMLDivElement;
	let filterValue = $state("");
	let dialogOpen = $state(false);
	let rowToEdit: any = $state(null);


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

	<!-- <div class="my-2">
		<Input
			type="text"
			class="bg-background placeholder:text-foreground text-foreground pl-8"
			placeholder="Search"
			bind:value={filterValue}
			oninput={onFilterTextBoxChanged}
		/>
	</div> -->
</div>
<div bind:this={gridDiv} style="height: 80vh; width: 100%;"></div>
