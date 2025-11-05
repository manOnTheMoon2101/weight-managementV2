<script lang="ts">
	import type { PageData } from "./$types";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import ChevronUp from "@lucide/svelte/icons/chevron-up";
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
	let { data }: { data: PageData } = $props();

	let user = $derived(data.user);
	let weightMonthChart = $derived(data.weightMonthChart);
	let weightWeekChart = $derived(data.weightWeekChart);
	let stepsMonthChart = $derived(data.stepsMonthChart);
	let weightViewMode = $state("7days");
	let weightCharts = $derived(weightViewMode === "7days" ? weightWeekChart : weightMonthChart);
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

	let last7DaysWater = $derived(data.last7DaysWater);
	let lastMonthWater = $derived(data.lastMonthWater);
	let waterLimit = $derived(data.waterLimit);

	let viewMode = $state("7days");
	let isFullscreen = $state(false);

	$inspect(supplementCharts);

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
</script>

<div class="flex flex-col gap-1">
	<div>
		<div class="mb-4 md:hidden">
			<div
				class="flex items-center gap-2 rounded-md border border-yellow-300 bg-yellow-100 p-3 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-200"
			>
				<span>⚠️</span>
				<span
					>This site doesn't support mobile yet. Please use a larger screen. Mobile support is
					coming soon :)</span
				>
			</div>
		</div>

		<div class="flex flex-row items-center justify-between">
			<div class="bg-primary flex w-3/5 flex-col justify-between rounded-lg">
				{#if user}
					<div>
						<h1 class="text-sm font-bold text-muted-foreground">{greet()}</h1>
						<h2 class="text-2xl font-bold ">{user.name}</h2>
					</div>
				{/if}

				<div class="flex flex-row">
					<div class="flex flex-col items-start p-2">
						<div class="flex flex-row items-center">
							<span class="flex flex-row items-center text-4xl"
								>{currentWeight}
								<WeightIcon class="text-foreground" /></span
							>
						</div>
						<span>
							{#if currentWeightDate}
								{df.format(currentWeightDate)}
							{:else}
								-
							{/if}
						</span>
						<h4 class="text-accent font-bold">Current Weight</h4>
					</div>

					<span class="flex items-center justify-center">
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

					<div class="flex flex-col items-start p-2">
						<span class="flex flex-row items-center text-4xl"
							>{previousWeight}<WeightIcon class="text-foreground" /></span
						>

						<span>
							{#if previousWeightDate}
								{df.format(previousWeightDate)}
							{:else}
								-
							{/if}
						</span>
						<h4 class="text-accent font-bold">Previous Weight</h4>
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
			<div class="flex w-2/5 flex-row justify-around">
				<Steps dateSeriesData={stepsMonthChart} />
				<Steps dateSeriesData={stepsMonthChart} />
			</div>
		</div>

		<div class="flex flex-row items-center justify-between">
			<div class="bg-primary mx-2 flex flex-col items-center justify-center rounded-2xl p-4">
				<h4 class="text-accent text-2xl font-bold">Analysis</h4>
				<div class="mb-4 flex flex-row justify-around">
					<div
						role="button"
						tabindex="0"
						onclick={() => (viewMode = "7days")}
						onkeydown={(e) => {
							if (e.key === "Enter" || e.key === " ") viewMode = "7days";
						}}
					>
						<Button
							class={viewMode == "7days" ? "bg-accent mx-2" : "mx-2"}
							size="sm"
							variant="secondary">Last 7 Days</Button
						>
					</div>
					<div
						role="button"
						tabindex="0"
						onclick={() => (viewMode = "month")}
						onkeydown={(e) => {
							if (e.key === "Enter" || e.key === " ") viewMode = "month";
						}}
					>
						<Button
							class={viewMode == "month" ? "bg-accent mx-2" : "mx-2"}
							size="sm"
							variant="secondary">Last Month</Button
						>
					</div>
				</div>

				<Card
					class="bg-primary my-2 flex flex-col items-center justify-center rounded-2xl border-none p-4"
				>
					<Tooltip.Provider delayDuration={100}>
						<Tooltip.Root>
							<Tooltip.Trigger>
								{#if viewMode === "7days"}
									<div class="text-center">
										<h6 class="mb-2 text-lg font-semibold">Days with Steps ≤ {userStepLimit}</h6>
										<Badge variant={"weekly"} class="px-4 py-2 text-xl">
											{last7DaysSteps?.length || 0} days
										</Badge>
									</div>
								{:else}
									<div class="text-center">
										<div class="text-center">
											<h6 class="mb-2 text-lg font-semibold">Days with Steps ≤ {userStepLimit}</h6>
											<Badge variant={"weekly"} class="px-4 py-2 text-xl">
												{lastMonthSteps?.length || 0} days
											</Badge>
										</div>
									</div>
								{/if}
							</Tooltip.Trigger>
							<Tooltip.Content side="left">
								{#if last7DaysSteps && last7DaysSteps.length > 0 && viewMode == "7days"}
									<h4>Dates</h4>
									<div class="text-muted-foreground mt-3 text-sm">
										{last7DaysSteps
											.map((entry) =>
												new Date(entry.createdAt).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
												})
											)
											.join(", ")}
									</div>
								{:else if lastMonthSteps && lastMonthSteps.length > 0 && viewMode == "month"}
									<h4>Dates</h4>
									<div class="text-muted-foreground mt-3 text-sm">
										{lastMonthSteps
											.map((entry) =>
												new Date(entry.createdAt).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
												})
											)
											.join(", ")}
									</div>
								{/if}
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				</Card>

				<Card
					class="bg-primary my-2 flex flex-col items-center justify-center rounded-2xl border-none p-4"
				>
					<Tooltip.Provider delayDuration={100}>
						<Tooltip.Root>
							<Tooltip.Trigger>
								{#if last7DaysWater && last7DaysWater.length > 0 && viewMode === "7days"}
									<div class="text-center">
										<h6 class="mb-2 text-lg font-semibold">Days with Water ≤ {waterLimit}</h6>
										<Badge variant={"weekly"} class="px-4 py-2 text-xl">
											{last7DaysWater?.length || 0} days
										</Badge>
									</div>
								{:else if last7DaysWater && last7DaysWater.length > 0 && viewMode === "month"}
									<div class="text-center">
										<div class="text-center">
											<h6 class="mb-2 text-lg font-semibold">Days with Water ≤ {waterLimit}</h6>
											<Badge variant={"weekly"} class="px-4 py-2 text-xl">
												{lastMonthWater?.length || 0} days
											</Badge>
										</div>
									</div>
								{/if}
							</Tooltip.Trigger>
							<Tooltip.Content side="left">
								{#if last7DaysWater && last7DaysWater.length > 0 && viewMode === "7days"}
									<h4>Dates</h4>
									<div class="text-muted-foreground mt-3 text-sm">
										{last7DaysWater
											.map((entry) =>
												new Date(entry.createdAt).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
												})
											)
											.join(", ")}
									</div>
								{:else if lastMonthWater && lastMonthWater.length > 0 && viewMode === "month"}
									<h4>Dates</h4>
									<div class="text-muted-foreground mt-3 text-sm">
										{lastMonthWater
											.map((entry) =>
												new Date(entry.createdAt).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
												})
											)
											.join(", ")}
									</div>
								{/if}
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				</Card>
			</div>

			<Supplements data={supplementCharts} monthData={supplementCountsMonthChart} />

			<div class="bg-primary mx-2">Sleep Chart</div>
			<div class="bg-primary mx-2">Protein Chart</div>
		</div>

		<div class="mt-24 flex flex-row items-center justify-evenly">
			<div class="w-full">
				<div class="mb-4 flex flex-row justify-center">
					<div
						role="button"
						tabindex="0"
						onclick={() => (weightViewMode = "7days")}
						onkeydown={(e) => {
							if (e.key === "Enter" || e.key === " ") weightViewMode = "7days";
						}}
					>
						<Button
							class={weightViewMode == "7days" ? "bg-accent mx-2" : "mx-2"}
							size="sm"
							variant="secondary">Last 7 Days</Button
						>
					</div>
					<div
						role="button"
						tabindex="0"
						onclick={() => (weightViewMode = "month")}
						onkeydown={(e) => {
							if (e.key === "Enter" || e.key === " ") weightViewMode = "month";
						}}
					>
						<Button
							class={weightViewMode == "month" ? "bg-accent mx-2" : "mx-2"}
							size="sm"
							variant="secondary">Last Month</Button
						>
					</div>
				</div>
				<Weight dateSeriesData={weightCharts} />
				<Waist dateSeriesData={waistChart} />
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		font-family: "Balsamiq Sans", system-ui;
	}
</style>
