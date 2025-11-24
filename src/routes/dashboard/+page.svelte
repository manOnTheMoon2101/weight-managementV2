<script lang="ts">
	import type { PageData } from "./$types";
	import ChevronDown from "@lucide/svelte/icons/arrow-down-to-dot";
	import ChevronUp from "@lucide/svelte/icons/arrow-up-from-dot";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import FootPrint from "@lucide/svelte/icons/footprints";
	import Timer from "@lucide/svelte/icons/timer";
	import Droplet from "@lucide/svelte/icons/droplet";
	import Maximize from "@lucide/svelte/icons/maximize";
	import Minimize from "@lucide/svelte/icons/minimize";
	import WeightIcon from "@lucide/svelte/icons/weight";
	import { DateFormatter } from "@internationalized/date";
	import Weight from "./components/charts/Weight.svelte";
	import Waist from "./components/charts/Waist.svelte";
	import Supplements from "./components/charts/Supplements.svelte";
	import "@fontsource/balsamiq-sans";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import Card from "$lib/components/ui/card/card.svelte";
	import Steps from "./components/charts/Steps.svelte";
	import Toggler from "./components/navbar/components/toggler.svelte";
	import Water from "./components/charts/Water.svelte";
	import Protein from "./components/charts/Protein.svelte";
	import Sleep from "./components/charts/Sleep.svelte";
	import Calories from "./components/charts/Calories.svelte";
	import MultiChart from "./components/charts/MultiChart.svelte";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	let { data }: { data: PageData } = $props();

	let user = $derived(data.user);
	$inspect(user)
	let weightMonthChart = $derived(data.weightMonthChart);
	let weightWeekChart = $derived(data.weightWeekChart);
	let stepsMonthChart = $derived(data.stepsMonthChart);
	let stepsWeekChart = $derived(data.stepsWeekChart);
	let measurementMonthChart = $derived(data.measurementMonthChart);
	let measurementWeekChart = $derived(data.measurementWeekChart);
	let waterMonthChart = $derived(data.waterMonthChart);
	let waterWeekChart = $derived(data.waterWeekChart);
	let proteinMonthChart = $derived(data.proteinMonthChart);
	let proteinWeekChart = $derived(data.proteinWeekChart);
	let caloriesMonthChart = $derived(data.caloriesMonthChart);
	let caloriesWeekChart = $derived(data.caloriesWeekChart);
	let sleepMonthChart = $derived(data.sleepMonthChart);
	let sleepWeekChart = $derived(data.sleepWeekChart);
	let weightViewMode = $state("7days");
	let stepsViewMode = $state("7days");
	let waterViewMode = $state("7days");
	let sleepViewMode = $state("7days");
	let proteinViewMode = $state("7days");
	let caloriesViewMode = $state("7days");
	let measurementViewMode = $state("7days");
	let weightCharts = $derived(weightViewMode === "7days" ? weightWeekChart : weightMonthChart);
	let stepsCharts = $derived(stepsViewMode === "7days" ? stepsWeekChart : stepsMonthChart);
	let sleepCharts = $derived(sleepViewMode === "7days" ? sleepWeekChart : sleepMonthChart);
	let waterCharts = $derived(waterViewMode === "7days" ? waterWeekChart : waterMonthChart);
	let proteinCharts = $derived(proteinViewMode === "7days" ? proteinWeekChart : proteinMonthChart);
	let caloriesCharts = $derived(
		caloriesViewMode === "7days" ? caloriesWeekChart : caloriesMonthChart
	);
	let measurementCharts = $derived(
		measurementViewMode === "7days" ? measurementWeekChart : measurementMonthChart
	);
	let waistChart = $derived(data.waistChart);
	let supplementCharts = $derived(data.supplementCountsWeekChart);
	let supplementCountsMonthChart = $derived(data.supplementCountsMonthChart);
	let currentWeight = $derived(data.currentWeight?.weight);
	let currentWeightDate = $derived(data.currentWeight?.createdAt);
	let previousWeight = $derived(data.previousWeight?.weight);
	let previousWeightDate = $derived(data.previousWeight?.createdAt);
	let last7DaysSteps = $derived(data.last7DaysSteps);
	let lastMonthSteps = $derived(data.lastMonthSteps);
	let userStepLimit = $derived(data.userStepLimit);
	let userJourney = $derived(data.userJourney);

	let last7DaysWater = $derived(data.last7DaysWater);
	let lastMonthWater = $derived(data.lastMonthWater);
	let waterLimit = $derived(data.waterLimit);

	let viewMode = $state("7days");
	let isFullscreen = $state(false);

	function greet(): string {
		const hour = new Date().getHours();
		if (hour < 12) {
			return `Good morning`;
		} else if (hour < 18) {
			return `Good afternoon`;
		} else {
			return `Good evening`;
		}
	}

	const df = new DateFormatter("en-US", {
		dateStyle: "medium",
	});

	function toggleFullscreen() {
		if (isFullscreen) {
			const doc = document as Document & {
				webkitExitFullscreen?: () => Promise<void> | void;
				msExitFullscreen?: () => Promise<void> | void;
			};
			if (doc.exitFullscreen) {
				doc.exitFullscreen();
			} else if (doc.webkitExitFullscreen) {
				doc.webkitExitFullscreen();
			} else if (doc.msExitFullscreen) {
				doc.msExitFullscreen();
			}
		} else {
			const element = document.documentElement as HTMLElement & {
				webkitRequestFullscreen?: () => Promise<void> | void;
				msRequestFullscreen?: () => Promise<void> | void;
			};
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen();
			} else if (element.msRequestFullscreen) {
				element.msRequestFullscreen();
			}
		}
	}
	if (typeof document !== "undefined") {
		document.addEventListener("fullscreenchange", () => {
			isFullscreen = !!document.fullscreenElement;
		});
		document.addEventListener("webkitfullscreenchange", () => {
			isFullscreen = !!(document as any).webkitFullscreenElement;
		});
		document.addEventListener("msfullscreenchange", () => {
			isFullscreen = !!(document as any).msFullscreenElement;
		});
	}
	const firstLetter = $derived(user?.name?.charAt(0));
</script>

<div class="flex flex-col gap-1">
	<div>
		<!-- <div class="mb-4 md:hidden">
			<div
				class="flex items-center gap-2 rounded-md border border-yellow-300 bg-yellow-100 p-3 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-200"
			>
				<span>⚠️</span>
				<span
					>This site doesn't support mobile yet. Please use a larger screen. Mobile support is
					coming soon :)</span
				>
			</div>
		</div> -->

		<div class="flex flex-col items-center justify-between md:flex-row">
			<div class="bg-primary flex h-[300px] w-3/5 flex-col justify-between rounded-lg">
				{#if user}
					<div class="flex flex-row items-center justify-between">
						<div>
							<div class="flex flex-row items-center">
								<div>
									<Avatar.Root class="mr-2 size-15">
										<Avatar.Image src={user.image} alt="User Image" />
										<Avatar.Fallback>{firstLetter ?? "?"}</Avatar.Fallback>
									</Avatar.Root>
								</div>

								<div class="flex flex-col">
									<h1 class="text-muted-foreground text-lg font-bold">{greet()}</h1>
									<h2 class="text-4xl font-bold">{user.name}</h2>
								</div>
							</div>
						</div>

						<!-- <div><span>{df.format(new Date())}</span></div> -->
					</div>
				{/if}

				<div>
					<span class="flex items-center justify-center text-lg font-semibold">
						{#if currentWeight && previousWeight}
							{#if Number(currentWeight) > Number(previousWeight)}
								<span>
									Gained <span class={userJourney?.journey === 'Weight_Gain' ? 'text-green-500' : 'text-red-500'}>{(Number(currentWeight) - Number(previousWeight)).toFixed(1)}kg</span>
								</span>
							{:else if Number(currentWeight) < Number(previousWeight)}
								<span >
									Lost <span class={userJourney?.journey === 'Weight_Loss' ? 'text-green-500' : 'text-red-500'}>{(Number(previousWeight) - Number(currentWeight)).toFixed(1)}kg</span>
								</span>
							{:else}
								<span class="text-gray-500">No change</span>
							{/if}
						{/if}
					</span>
				</div>

				<div class="flex flex-row justify-between">
					<div class="flex flex-col items-start p-2">
						<div class="flex flex-row items-center">
							<span class="flex flex-row items-center text-6xl">{currentWeight} </span>
						</div>
						<span class="text-sm">
							{#if currentWeightDate}
								<span>{df.format(currentWeightDate)}</span>
							{:else}
								-
							{/if}
						</span>
						<h4 class="text-muted-foreground text-sm">Current Weight</h4>
					</div>

					<div class="my-2">
						<Separator orientation="vertical" />
					</div>

					<div class="flex flex-col items-start p-2">
						<span class="flex flex-row items-center text-6xl">{previousWeight}</span>

						<span class="text-sm">
							{#if previousWeightDate}
								<span>{df.format(previousWeightDate)}</span>
							{:else}
								-
							{/if}
						</span>
						<h4 class="text-muted-foreground text-sm">Previous Weight</h4>
					</div>

					<!-- <div class="mx-2">
						<Tooltip.Provider delayDuration={100}>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<div class="flex flex-col items-start p-2">
										<h4 class="text-accent text-2xl font-bold">Current Weight</h4>
										<div class="flex flex-row items-center">
											<span class="flex flex-row items-center text-8xl"
												>{currentWeight}
												<WeightIcon class="text-foreground" /></span
											>
											<span>
												{#if currentWeight && previousWeight}
													{#if Number(currentWeight) > Number(previousWeight)}
														<ChevronUp class="text-red-500 " />
													{:else if Number(currentWeight) < Number(previousWeight)}
														<ChevronDown class="text-green-500 " />
													{:else}
														<div></div>
													{/if}
												{/if}
											</span>
										</div>
										<span>
											{#if currentWeightDate}
												{df.format(currentWeightDate)}
											{:else}
												-
											{/if}
										</span>
									</div>
								</Tooltip.Trigger>
								<Tooltip.Content side="left">
									<div class="mx-4 flex flex-col items-start">
										<div class="flex flex-row items-center">
											<h2 class="text-4xl">{previousWeight}</h2>
										</div>
										<span>
											{#if previousWeightDate}
												{df.format(previousWeightDate)}
											{:else}
												-
											{/if}
										</span>
										<h4 class="text-accent font-bold">Previous Weight</h4>
									</div>
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					</div> -->

					<!-- <div>
					<Tooltip.Provider delayDuration={100}>
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Button
						variant="screen"
						aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
						title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
						onclick={toggleFullscreen}
					>
						{#if isFullscreen}
							<Minimize />
						{:else}
							<Maximize />
						{/if}
					</Button>
				
							</Tooltip.Trigger>
							<Tooltip.Content side="top">
								<span>{!isFullscreen ? 'Fullscreen' : 'Normal'}</span>
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				</div> -->
				</div>
			</div>
			<div class="flex w-2/5 flex-col justify-around md:flex-row">
				<Steps dateSeriesData={stepsCharts} bind:viewMode={stepsViewMode} />
				<Water
					dateSeriesData={waterCharts}
					bind:viewMode={waterViewMode}
					waterLimit={data.waterLimit}
				/>
			</div>
		</div>

		<div class="flex flex-col my-4 items-center justify-between md:flex-row">
			<div class="flex w-3/5 flex-col justify-around md:flex-row">
				<Protein dateSeriesData={proteinCharts} bind:viewMode={proteinViewMode} />

				<Supplements weekData={supplementCharts} monthData={supplementCountsMonthChart} />
			</div>

			<div class="flex w-2/5 flex-col justify-around md:flex-row">
				<Sleep dateSeriesData={sleepCharts} bind:viewMode={sleepViewMode} />
				<Calories dateSeriesData={caloriesCharts} bind:viewMode={caloriesViewMode} />
			</div>
		</div>

		<div>
			<MultiChart dateSeriesData={measurementCharts} bind:viewMode={measurementViewMode} />
		</div>
	</div>
</div>

<style>

</style>
