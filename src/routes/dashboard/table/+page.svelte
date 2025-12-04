<script lang="ts">
	import Table from "./components/Table.svelte";
	import type { PageData } from "./$types";
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import Mail from "@lucide/svelte/icons/mail";
	import ArrowDownToLine from "@lucide/svelte/icons/arrow-down-to-line";
	// import Refresh from "@lucide/svelte/icons/refresh-cw";
	import { page } from "$app/state";
	import { toast } from "svelte-sonner";
	import { browser } from "$app/environment";
	import Measurement from "./components/cellRenderers/Measurement.svelte";
	import Weight from "./components/cellRenderers/Weight.svelte";
	import Date from "./components/cellRenderers/Date.svelte";
	import Supplements from "./components/cellRenderers/Supplements.svelte";
	import Dialog from "./components/view_dialog/Dialog.svelte";
	import { makeSvelteCellRenderer } from "ag-grid-svelte5-extended";
	import AddDialog from "../components/navbar/components/add_dialog/AddDialog.svelte";
	import Limits from "./components/cellRenderers/Limits.svelte";

	import { DateFormatter, type DateValue, getLocalTimeZone, today } from "@internationalized/date";
	import axios from "axios";

	const { data } = $props<{ data: PageData }>();

	type Supplement = {
		cla?: number;
		fatburner?: number;
		zen?: number;
		multiVitamin?: number;
		magnesium?: number;
	};

	type HealthTracker = {
		weight?: number;
		water?: number;
		steps?: number;
		waistMeasurement?: number;
	};

	type SleepSchedule = {
		score?: number;
		time?: any;
	};

	type NutrientRow = {
		supplements?: Supplement[];
		health_tracker?: HealthTracker[];
		sleep_schedule?: SleepSchedule[];
		[key: string]: any;
	};
	

	const latestWaistEntry = $derived(data.latestWaistEntry)
	const latestWeightEntry = $derived(data.latestWeightEntry)
	const nutrients = $derived.by(() =>
		data.nutrients.map((row: NutrientRow) => ({
			...row,
			cla: row.supplements?.map((x: Supplement) => x.cla),
			fatBurner: row.supplements?.map((x: Supplement) => x.fatburner),
			zen: row.supplements?.map((x: Supplement) => x.zen),
			multiVitamin: row.supplements?.map((x: Supplement) => x.multiVitamin),
			magnesium: row.supplements?.map((x: Supplement) => x.magnesium),
			sleepTime: row?.sleep_schedule?.[0]?.time,
			weight: row.health_tracker?.[0]?.weight,
			water: row.health_tracker?.[0]?.water,
			steps: row.health_tracker?.[0]?.steps,
			waistMeasurement: row.health_tracker?.[0].waistMeasurement,
			userEmail: data.userEmail,
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
			cellRenderer: makeSvelteCellRenderer(Dialog as any),
			cellRendererParams: (params: any) => ({
				dialogOpen: false,
				rowToEdit: params.data,
			}),
			minWidth: 100,
			maxWidth: 120,
		},
		{ headerName: "Date", field: "createdAt", cellRenderer: makeSvelteCellRenderer(Date as any), minWidth: 140, maxWidth: 200 },
		{
			headerName: "Weight",
			field: "weight",
			filter: "agNumberColumnFilter",
			cellRenderer: makeSvelteCellRenderer(Weight as any),
		},
		{
			headerName: "Waist Measurement",
			field: "waistMeasurement",
			filter: "agNumberColumnFilter",
			cellRenderer: makeSvelteCellRenderer(Measurement as any),
		},
		{
			headerName: "Steps",
			field: "steps",
			filter: "agNumberColumnFilter",
			cellRenderer: makeSvelteCellRenderer(Limits as any),
			cellRendererParams: (params: any) => ({
				data: params.data.steps,
				type: "Less",
				limit: limits?.stepsLimit,
			}),
		},
		{
			headerName: "Sleep",
			field: "sleepTime",
		},
		{
			headerName: "Water",
			field: "water",
			filter: "agNumberColumnFilter",
			cellRenderer: makeSvelteCellRenderer(Limits as any),
			cellRendererParams: (params: any) => ({
				data: params.data.water,
				type: "Less",
				limit: limits?.waterLimit,
			}),
		},
		{
			headerName: "Calories",
			field: "calories",
			filter: "agNumberColumnFilter",
			cellRenderer: makeSvelteCellRenderer(Limits as any),
			cellRendererParams: (params: any) => ({
				data: params.data.calories,
				type: "More",
				limit: limits?.caloriesLimit,
			}),
		},
		{
			headerName: "Supplements",
			filter: false,
			sortable: false,
			minWidth: 150,
			cellRenderer: makeSvelteCellRenderer(Supplements as any),
			cellRendererParams: {
				supplementFields: ["fatBurner", "zen", "multiVitamin", "magnesium", "cla"],
			},
		},
		{ headerName: "Protein", field: "protein", filter: "agNumberColumnFilter" },
		{
			headerName: "Fat",
			field: "fat",
			filter: "agNumberColumnFilter",
			cellRenderer: makeSvelteCellRenderer(Limits as any),
			cellRendererParams: (params: any) => ({
				data: params.data.fat,
				type: "More",
				limit: limits?.fatLimit,
			}),
		},
		{
			headerName: "Sugar",
			field: "sugar",
			filter: "agNumberColumnFilter",
			cellRenderer: makeSvelteCellRenderer(Limits as any),
			cellRendererParams: (params: any) => ({
				data: params.data.sugar,
				type: "More",
				limit: limits?.sugarLimit,
			}),
		},
		{
			headerName: "Carbs",
			field: "carbs",
			filter: "agNumberColumnFilter",
			cellRenderer: makeSvelteCellRenderer(Limits as any),
			cellRendererParams: (params: any) => ({
				data: params.data.carbs,
				type: "More",
				limit: limits?.carbsLimit,
			}),
		},
	];

	let value: { start: DateValue | undefined; end: DateValue | undefined } | undefined = $state();

	$effect(() => {
		if (browser) {
			const storedDates = localStorage.getItem("dates");
			if (storedDates) {
				try {
					const item = JSON.parse(storedDates);
					const foundItem = items.find((i) => i.value === item.value);
					if (foundItem) {
						selectedPreset = foundItem.label;
						const todayDate = today(getLocalTimeZone());
						value = {
							start: todayDate.add({ days: foundItem.start }),
							end: todayDate.add({ days: foundItem.end }),
						};
					}
				} catch (error) {
					console.error("Error parsing stored dates:", error);
				}
			}
		}
	});

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

			window.location.href = url.toString();
		}
	}

	let selectedPreset = $state("");
	let tableComponent: any = $state();
	let isSendingEmail = $state(false);

	async function sendEmail() {
		isSendingEmail = true;
		try {
			await axios.post('/api/send-email',nutrients);
			
			toast.success("Succesfully Sent Email")
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				toast.error(`Failed to send email: ${error.response.data.error}`);
			} else {
				
				toast.error('Error sending email')
			}
			console.error(error);
		} finally {
			isSendingEmail = false;
		}
	}

	const storedDateLabel = $derived.by(() => {
		if (!browser) return null;

		const stored = localStorage.getItem("dates");
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				return parsed.label;
			} catch (error) {
				console.error("Error parsing stored dates:", error);
				return null;
			}
		}
		return null;
	});

	function handlePresetSelect(selectedValue: string | string[]) {
		const valueToUse = Array.isArray(selectedValue) ? selectedValue[0] : selectedValue;
		const item = items.find((i) => i.value === valueToUse);
		if (item && browser) {
			localStorage.setItem("dates", JSON.stringify(item));
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
	];

	function handleCalendarChange(newValue: typeof value) {
		value = newValue;
		// Clear preset selection when manually changing dates
		selectedPreset = "";
		// Clear localStorage when manually selecting dates
		if (browser) {
			localStorage.removeItem("dates");
		}
		if (newValue?.start && newValue?.end) {
			updateDateRange();
		}
	}
</script>

<div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
	<div class="w-full md:w-auto">
		<Popover.Root>
			<Popover.Trigger
				class={cn(
					buttonVariants({
						variant: "outline",
						class: "border-accent mx-2 w-full md:w-[300px] justify-start border text-left font-normal",
					}),
					!value && "text-foreground"
				)}
			>
				<CalendarIcon class="mr-2 size-4 flex-shrink-0" />
				<span class="truncate">
					{value && (value.start || value.end) ? valueString : storedDateLabel ? selectedPreset : "Select date range"}
				</span>
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
	<div class="flex flex-wrap gap-2 px-2 md:px-0">
		<AddDialog dialogOpen latestWaist={latestWaistEntry}  latestWeight={latestWeightEntry}/>
		<Button variant="save" onclick={() => tableComponent?.exportToCsv()} class="flex-1 md:flex-none">
			<ArrowDownToLine class="mr-2 size-4" />
			<span class="hidden sm:inline">Export to CSV</span>
			<span class="sm:hidden">CSV</span>
		</Button>
		<Button variant="save" onclick={sendEmail} disabled={isSendingEmail} class="flex-1 md:flex-none">
			<Mail class="mr-2 size-4" />
			<span>{isSendingEmail ? 'Sending...' : 'Send Email'}</span>
		</Button>
		<!-- <Button variant="save" class="flex-1 md:flex-none">
			<Refresh class="mr-2 size-4" />
			<span class="hidden sm:inline">Refresh</span>
		</Button> -->
	</div>
</div>

<div>
	<Table bind:this={tableComponent} rowData={nutrients} columnDefs={columns} />
</div>
