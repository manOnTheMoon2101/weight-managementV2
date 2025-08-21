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
		<div class="flex flex-row items-start justify-between">
			<!-- <div>
				{#if user}
					<h1 class="text-6xl font-bold">{greet(user.name)}</h1>
				{/if}
			</div> -->
			<Supplements data={supplementCharts} />

			<div
				class=" border-accent my-2 flex flex-col items-center justify-center rounded-2xl border p-4 shadow-2xl bg-primary"
			>
				<h4 class="text-accent font-bold text-2xl">Weekly Analysis</h4>

				<div>
					<div>
						<div class="my-4">
							<h6>Nutrient Limits Reaced</h6>
							<Badge>None</Badge>
						</div>
						<div class="my-4">
							<h6>Steps not reached</h6>
							<Badge>2</Badge>
						</div>
						<div class="my-4">
							<h6>Minimum Water not dranked</h6>
							<Badge>4</Badge>
						</div>
					</div>
				</div>
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
									<div class="border-accent mx-4 flex flex-col items-start rounded-2xl border p-4 shadow-2xl bg-primary">
										<h4 class="text-accent font-bold text-2xl">Current Weight</h4>
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
						class="border-accent flex flex-col items-center justify-center rounded-2xl border p-4 shadow-2xl bg-primary"
					>
						<h4 class="text-accent font-bold text-2xl">Average Steps</h4>
						<span class="flex flex-row items-center text-8xl"
							>{Math.round(Number(averageStepsIntake))} <FootPrint /></span
						>

						<span> 2025 </span>
					</div>
				</div>
				<div
					class="border-accent my-2 flex flex-col items-center justify-center rounded-2xl border p-4 shadow-2xl bg-primary"
				>
					<h4 class="text-accent font-bold text-2xl">Average Water</h4>
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
			<div class="border-accent flex flex-col items-center justify-center rounded-2xl border p-4 shadow-2xl bg-primary">
				<h4 class="text-accent font-bold text-2xl">Average Sleep Time</h4>
				<span class="flex flex-row items-center text-8xl"
					>{averageSleepIntake} <Timer class="text-accent " /></span
				>

				
			</div>
		</div>
	</div>
</div>

<!-- <style>
	:global(body) {
		font-family: 'Balsamiq Sans', system-ui;
	}
  </style> -->
