<script lang="ts">
	import Table from "./components/Table.svelte";
	import type { PageData } from "./$types";
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import Supplements from "./components/cellRenderers/Supplements.svelte";
	import Dialog from "./components/view_dialog/Dialog.svelte";
	import { makeSvelteCellRenderer } from "ag-grid-svelte5-extended";
	import Limits from "./components/cellRenderers/Limits.svelte";
	import { DateFormatter, type DateValue, getLocalTimeZone, today } from "@internationalized/date";

	const { data } = $props<{ data: PageData }>();

	type Supplement = {
		cla?: number;
		fatburner?: number;
		appleCider?: number;
		multiVitamin?: number;
		magnesium?: number;
	};

	type HealthTracker = {
		weight?: number;
		water?: number;
		steps?: number;
	};

	type SleepSchedule = {
		score?: number;
	};

	type NutrientRow = {
		supplements?: Supplement[];
		health_tracker?: HealthTracker[];
		sleep_schedule?: SleepSchedule[];
		[key: string]: any;
	};

	const nutrients = $derived.by(() =>
		data.nutrients.map((row: NutrientRow) => ({
			...row,
			cla: row.supplements?.map((x: Supplement) => x.cla),
			fatBurner: row.supplements?.map((x: Supplement) => x.fatburner),
			appleCider: row.supplements?.map((x: Supplement) => x.appleCider),
			multiVitamin: row.supplements?.map((x: Supplement) => x.multiVitamin),
			magnesium: row.supplements?.map((x: Supplement) => x.magnesium),
			weight: row.health_tracker?.map((x: HealthTracker) => x.weight),
			water: row.health_tracker?.map((x: HealthTracker) => x.water),
			steps: row.health_tracker?.map((x: HealthTracker) => x.steps),
			score: row.sleep_schedule?.map((x: SleepSchedule) => x.score),
		}))
	);

	const limits = $derived.by(() => data.limits);

	const columns = [
		{
			headerName: "Actions",
			field: "actions",
			filter: false,
			sortable: false,
			suppressMovable: true,
			headerClass: "bg-background",
			cellRenderer: makeSvelteCellRenderer(Dialog),
			cellRendererParams: (params: any) => ({
				dialogOpen: false,
				rowToEdit: params.data,
			}),
		},
		{ headerName: "Date", field: "createdAt" },
		{ headerName: "Weight", field: "weight" },
		{ headerName: "Water", field: "water" },
		{
			headerName: "Calories",
			field: "calories",
			cellRenderer: makeSvelteCellRenderer(Limits),
			cellRendererParams: (params: any) => ({
				data: params.data.calories,
				limit: limits.caloriesLimit,
			}),
		},
		{ headerName: "Protein", field: "protein" },
		{
			headerName: "Fat",
			field: "fat",
			cellRenderer: makeSvelteCellRenderer(Limits),
			cellRendererParams: (params: any) => ({
				data: params.data.fat,
				limit: limits.fatLimit,
			}),
		},
		{
			headerName: "Sugar",
			field: "sugar",
			cellRenderer: makeSvelteCellRenderer(Limits),
			cellRendererParams: (params: any) => ({
				data: params.data.sugar,
				limit: limits.sugarLimit,
			}),
		},
		{
			headerName: "Carbs",
			field: "carbs",
			cellRenderer: makeSvelteCellRenderer(Limits),
			cellRendererParams: (params: any) => ({
				data: params.data.carbs,
				limit: limits.carbsLimit,
			}),
		},
		{
			headerName: "Supplements",
			cellRenderer: makeSvelteCellRenderer(Supplements),
			cellRendererParams: {
				supplementFields: ["fatBurner", "appleCider", "multiVitamin", "magnesium", "cla"],
			},
		},
		// { headerName: "CLA", field: "cla" },
		// { headerName: "Fat Burner", field: "fatBurner" },
		// { headerName: "Apple Cider", field: "appleCider" },
		// { headerName: "Multi Vitamin", field: "multiVitamin" },
		// { headerName: "Magnesium", field: "magnesium" },
	];

	let value: { start: DateValue | undefined; end: DateValue | undefined } | undefined = $state();

	const df = new DateFormatter("en-US", {
		dateStyle: "medium",
	});

	const valueString = $derived.by(() => {
		if (!value) return "";

		if (value.start && value.end) {
			return `${df.format(value.start.toDate(getLocalTimeZone()))} - ${df.format(value.end.toDate(getLocalTimeZone()))}`;
		} else if (value.start) {
			return df.format(value.start.toDate(getLocalTimeZone()));
		}

		return "";
	});

	async function updateDateRange() {
		if (value?.start && value?.end) {
			const startDateStr = value.start.toString();
			const endDateStr = value.end.toString();

			const url = new URL(page.url);
			url.searchParams.set("startDate", startDateStr);
			url.searchParams.set("endDate", endDateStr);

			await goto(url.toString(), {
				replaceState: false,
				invalidateAll: true,
				noScroll: true,
			});
		}
	}

	let selectedPreset = $state("");
	function handlePresetSelect(selectedValue: string | string[]) {
		const valueToUse = Array.isArray(selectedValue) ? selectedValue[0] : selectedValue;
		const item = items.find((i) => i.value === valueToUse);
		if (item) {
			selectedPreset = item.label;
			const todayDate = today(getLocalTimeZone());
			value = {
				start: todayDate.add({ days: item.start }),
				end: todayDate.add({ days: item.end }),
			};
			updateDateRange();
		}
	}

	const items = [
		{ value: "today", label: "Today", start: 0, end: 0 },
		{ value: "yesterday", label: "Yesterday", start: -1, end: -1 },
		{ value: "last7days", label: "Last 7 days", start: -7, end: 0 },
		{ value: "last30days", label: "Last 30 days", start: -30, end: 0 },
		{ value: "thisweek", label: "This week", start: -7, end: 0 },
		{ value: "thismonth", label: "This month", start: -30, end: 0 },
	];

	function handleCalendarChange(newValue: typeof value) {
		value = newValue;
		if (newValue?.start && newValue?.end) {
			updateDateRange();
		}
	}
</script>

<div>
	<Popover.Root>
		<Popover.Trigger
			class={cn(
				buttonVariants({
					variant: "outline",
					class: "w-[300px] justify-start text-left font-normal",
				}),
				!value && "text-muted-foreground"
			)}
		>
			<CalendarIcon class="mr-2 size-4" />
			{value && (value.start || value.end) ? valueString : "Pick a date range"}
		</Popover.Trigger>
		<Popover.Content class="flex w-auto flex-col space-y-2 p-2">
			<Select.Root type="single" onValueChange={handlePresetSelect}>
				<Select.Trigger>
					{selectedPreset || "Select a preset range"}
				</Select.Trigger>
				<Select.Content>
					{#each items as item (item.value)}
						<Select.Item value={item.value}>{item.label}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<div class="rounded-md border">
				<RangeCalendar bind:value onValueChange={handleCalendarChange} />
			</div>
		</Popover.Content>
	</Popover.Root>
</div>

<div>
	<Table rowData={nutrients} columnDefs={columns} />
</div>
