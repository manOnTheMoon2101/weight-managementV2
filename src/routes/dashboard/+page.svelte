<script lang="ts">
	import type { PageData } from "./$types";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import ChevronUp from "@lucide/svelte/icons/chevron-up";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import FootPrint from "@lucide/svelte/icons/footprints";
	import Timer from "@lucide/svelte/icons/timer";
	import Droplet from "@lucide/svelte/icons/droplet";
	import { DateFormatter } from "@internationalized/date";
	import Weight from "./components/charts/Weight.svelte";
	import Supplements from "./components/charts/Supplements.svelte";
	import "@fontsource/balsamiq-sans";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import Card from "$lib/components/ui/card/card.svelte";
	let { data }: { data: PageData } = $props();

	let user = $derived(data.user);
	let weightCharts = $derived(data.weightCharts);
	let supplementCharts = $derived(data.supplementsChart);
	let currentWeight = $derived(data.currentWeight?.weight);
	let currentWeightDate = $derived(data.currentWeight?.createdAt);
	let previousWeight = $derived(data.previousWeight?.weight);
	let previousWeightDate = $derived(data.previousWeight?.createdAt);
	let averageWaterIntake = $derived(data.averageWaterIntake);
	let averageStepsIntake = $derived(data.averageStepsIntake);
	let averageSleepIntake = $derived(data.averageSleepIntake);
	let last7DaysSteps = $derived(data.last7DaysSteps);
	let lastMonthSteps = $derived(data.lastMonthSteps);
	let userStepLimit = $derived(data.userStepLimit);

	let last7DaysWater = $derived(data.last7DaysWater);
	let lastMonthWater = $derived(data.lastMonthWater);
	let waterLimit = $derived(data.waterLimit);

	let viewMode = $state("7days");

	function greet(name: string): string {
		const hour = new Date().getHours();
		if (hour < 12) {
			return `Good morning,${name}!`;
		} else if (hour < 18) {
			return `Good afternoon,${name}!`;
		} else {
			return `Good evening,${name}!`;
		}
	}

	const df = new DateFormatter("en-US", {
		dateStyle: "medium",
	});
</script>

<div class="flex flex-col gap-1">
	<div>
		<div class="my-4">
			{#if user}
				<h1 class="text-6xl font-bold">{greet(user.name)}</h1>
			{/if}
		</div>
		<div class="flex flex-row items-start justify-between">
			<Supplements data={supplementCharts} />
			<div class="border-accent bg-primary mx-2 flex flex-col items-center justify-center rounded-2xl border p-4 shadow-2xl">
				<h4 class="text-accent text-2xl font-bold">Analysis</h4>
				<div class="mb-4 flex flex-row justify-around">
					<Button size="sm" variant="secondary" onclick={() => (viewMode = "7days")}
						>Last 7 Days</Button
					>
					<Button size="sm" variant="secondary" onclick={() => (viewMode = "month")}
						>Last Month</Button
					>
				</div>

				<Card
					class=" border-accent bg-primary my-2 flex flex-col items-center justify-center rounded-2xl border p-4 shadow-2xl"
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
								{#if last7DaysSteps && last7DaysSteps.length > 0}
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
								{:else if lastMonthSteps && lastMonthSteps.length > 0}
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
					class=" border-accent bg-primary my-2 flex flex-col items-center justify-center rounded-2xl border p-4  shadow-2xl"
				>
					<Tooltip.Provider delayDuration={100}>
						<Tooltip.Root>
							<Tooltip.Trigger>
								{#if viewMode === "7days"}
									<div class="text-center">
										<h6 class="mb-2 text-lg font-semibold">Days with Water ≤ {waterLimit}</h6>
										<Badge variant={"weekly"} class="px-4 py-2 text-xl">
											{last7DaysWater?.length || 0} days
										</Badge>
									</div>
								{:else}
									<div class="text-center">
										<div class="text-center">
											<h6 class="mb-2 text-lg font-semibold">Days with Steps ≤ {waterLimit}</h6>
											<Badge variant={"weekly"} class="px-4 py-2 text-xl">
												{lastMonthWater?.length || 0} days
											</Badge>
										</div>
									</div>
								{/if}
							</Tooltip.Trigger>
							<Tooltip.Content side="left">
								{#if last7DaysWater && last7DaysWater.length > 0}
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
								{:else if lastMonthWater && lastMonthWater.length > 0}
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

			<div class="flex flex-col">
				<div class="flex flex-row items-center">
					<div
						class={!currentWeight || !previousWeight
							? "my-2 flex flex-row  items-center p-4"
							: Number(currentWeight) > Number(previousWeight)
								? "my-2 flex flex-row  items-center p-4 "
								: Number(currentWeight) < Number(previousWeight)
									? "my-2 flex flex-row  items-center p-4 "
									: "my-2 flex flex-row  items-center p-4"}
					>
						<Tooltip.Provider delayDuration={100}>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<div
										class="border-accent bg-primary mx-4 flex flex-col items-start rounded-2xl border p-4 shadow-2xl"
									>
										<h4 class="text-accent text-2xl font-bold">Current Weight</h4>
										<div class="flex flex-row items-center">
											<h2 class="text-8xl">{currentWeight}</h2>
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
					</div>
					<div
						class="border-accent bg-primary flex flex-col items-center justify-center rounded-2xl border p-4 shadow-2xl"
					>
						<h4 class="text-accent text-2xl font-bold">Average Steps</h4>
						<span class="flex flex-row items-center text-8xl"
							>{Math.round(Number(averageStepsIntake))} <FootPrint /></span
						>

						<span> 2025 </span>
					</div>
				</div>
				<div
					class="border-accent bg-primary my-2 flex flex-col items-center justify-center rounded-2xl border p-4 shadow-2xl"
				>
					<h4 class="text-accent text-2xl font-bold">Average Water</h4>
					<span class="flex flex-row items-center text-8xl"
						>{Math.round(Number(averageWaterIntake))}
						<Droplet class="fill-blue-400 text-blue-400" /></span
					>
				</div>
			</div>
		</div>

		<div class="mt-24 flex flex-row items-center justify-evenly">
			<Weight dateSeriesData={weightCharts} />
		</div>

		<div class="mt-24 flex flex-row items-center justify-start">
			<div
				class="border-accent bg-primary flex flex-col items-center justify-center rounded-2xl border p-4 shadow-2xl"
			>
				<h4 class="text-accent text-2xl font-bold">Average Sleep Time</h4>
				<span class="flex flex-row items-center text-8xl"
					>{averageSleepIntake} <Timer class="text-accent " /></span
				>
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		font-family: "Balsamiq Sans", system-ui;
	}
</style>
