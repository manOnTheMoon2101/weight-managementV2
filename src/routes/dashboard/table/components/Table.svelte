<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
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
	import { writable } from "svelte/store";
	import Input from "$lib/components/ui/input/input.svelte";

	ModuleRegistry.registerModules([
		ClientSideRowModelModule,
		TextFilterModule,
		NumberFilterModule,
		DateFilterModule,
	]);

	export let columnDefs: Array<any> = [];
	export let rowData: Array<any> = [];

	const darkTheme = themeQuartz.withPart(colorSchemeDarkBlue).withParams({
		backgroundColor: `var(--background)`,
		foregroundColor: `var(--foreground)`,
		headerBackgroundColor: `var(--accent)`,
		headerTextColor: "#cfd8dc",
		oddRowBackgroundColor: "#263299",
	});

	let gridDiv: HTMLDivElement;
	let dialogOpen = false;
	let rowToEdit: any = null;

	function handleClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (target.classList.contains("edit-btn")) {
			const rowIndex = target.getAttribute("data-row-index");
			if (rowIndex !== null) {
				rowToEdit = rowData[parseInt(rowIndex)];
				dialogOpen = true;
			}
		}
	}

	function formatDMY(dateString: string): string {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${year}-${month}-${day}`;
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
		};

		if (gridDiv) {
			createGrid(gridDiv, gridOptions);
			gridDiv.addEventListener("click", handleClick);
		}
	});

	onDestroy(() => {
		if (gridDiv) {
			gridDiv.removeEventListener("click", handleClick);
		}
	});
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{rowToEdit ? formatDMY(rowToEdit.createdAt) : ""}</Dialog.Title>
			<Dialog.Description>
				<form>
					<Input name="weight" placeholder="Weight" value={rowToEdit?.weight || ""} />
				</form>
			</Dialog.Description>
		</Dialog.Header>
		<button on:click={() => (dialogOpen = false)}>Cancel</button>
	</Dialog.Content>
</Dialog.Root>

<div bind:this={gridDiv} style="height: 80vh; width: 100%;"></div>
