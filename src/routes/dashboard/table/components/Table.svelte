<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import DialogModal from "./view_dialog/Dialog.svelte";
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
	import type { GridApi } from "ag-grid-community";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";

	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import { DateFormatter, type DateValue, getLocalTimeZone, today } from "@internationalized/date";
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Select from "$lib/components/ui/select/index.js";

	ModuleRegistry.registerModules([
		ClientSideRowModelModule,
		TextFilterModule,
		NumberFilterModule,
		DateFilterModule,
	]);
	let value: DateValue | undefined = $state();

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
	function onFilterTextBoxChanged(
		event: Event & { currentTarget: EventTarget & HTMLInputElement }
	) {
		filterValue = event.currentTarget.value;

		if (gridApi) {
			gridApi.setGridOption("quickFilterText", filterValue);
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
			onGridReady: (params) => {
				gridApi = params.api;
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
	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	const valueString = $derived(value ? df.format(value.toDate(getLocalTimeZone())) : "");

	const items = [
		{ value: 0, label: "Today" },
		{ value: 1, label: "Tomorrow" },
		{ value: 3, label: "In 3 days" },
		{ value: 7, label: "In a week" },
		{ value: -30, label: "Past 30 Days" },
	];
</script>

<DialogModal bind:dialogOpen bind:rowToEdit />
<div class="flex flex-row justify-between">
	<div>
		<Popover.Root>
			<Popover.Trigger
				class={cn(
					buttonVariants({
						variant: "outline",
						class: "w-[280px] justify-start text-left font-normal",
					}),
					!value && "text-muted-foreground"
				)}
			>
				<CalendarIcon class="mr-2 size-4" />
				{value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
			</Popover.Trigger>
			<Popover.Content class="flex w-auto flex-col space-y-2 p-2">
				<Select.Root
					type="single"
					bind:value={
						() => valueString,
						(v) => {
							if (!v) return;
							value = today(getLocalTimeZone()).add({ days: Number.parseInt(v) });
						}
					}
				>
					<Select.Trigger>
						{valueString}
					</Select.Trigger>
					<Select.Content>
						{#each items as item (item.value)}
							<Select.Item value={`${item.value}`}>{item.label}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				<div class="rounded-md border">
					<Calendar type="single" bind:value />
				</div>
			</Popover.Content>
		</Popover.Root>
	</div>
	<div class="my-2">
		<Input
			type="text"
			class="bg-background placeholder:text-foreground text-foreground pl-8"
			placeholder="Search"
			bind:value={filterValue}
			oninput={onFilterTextBoxChanged}
		/>
	</div>
</div>
<div bind:this={gridDiv} style="height: 80vh; width: 100%;"></div>
