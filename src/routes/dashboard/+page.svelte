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
	import '@fontsource/balsamiq-sans';
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


<div class="flex flex-col gap-1 my-24">
	<div>
		<div class="flex flex-row items-center justify-between">
			<div>
				{#if user}
					<h1 class="text-6xl font-bold">{greet(user.name)}</h1>
				{/if}
			</div>
			<div
				class={!currentWeight || !previousWeight
					? "flex flex-row items-center"
					: Number(currentWeight) > Number(previousWeight)
						? "flex flex-row items-center "
						: Number(currentWeight) < Number(previousWeight)
							? "flex flex-row items-center "
							: "flex flex-row items-center"}
			>
				<Tooltip.Provider delayDuration={100}>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<div class="mx-4 flex flex-col items-start">
								<div class="flex flex-row items-center">
									<h2 class="text-4xl">{currentWeight}</h2>
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
								<h4 class="text-accent text-2xl">Current Weight</h4>
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
								<h4 class="text-accent">Previous Weight</h4>
							</div>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			</div>
		</div>

		<div class="flex flex-row items-center justify-evenly mt-24">
			<Weight dateSeriesData={weightCharts} />
			<div class="flex flex-col items-center justify-center">
				<span class="flex flex-row items-center text-8xl"
					>{Math.round(Number(averageStepsIntake))} <FootPrint /></span
				>

				<h3 class="text-accent  text-2xl">Average Steps</h3>
			</div>
			<div class="flex flex-col items-center justify-center">
				<span class="flex flex-row items-center text-8xl"
					>{Math.round(Number(averageWaterIntake))} <Droplet class="text-blue-400 fill-blue-400" /></span
				>

				<h3 class="text-accent text-2xl">Average Water</h3>
			</div>

			
		</div>


		<div class="flex flex-row items-center justify-around  mt-24">
			<Supplements data={supplementCharts}/>
		

		<div class="flex flex-col items-center justify-center">
			<span class="flex flex-row items-center text-8xl"
				>{averageSleepIntake}  <Timer class="text-accent "/></span
			>

			<h3 class="text-accent text-2xl">Average Sleep Time</h3>
		</div>

	</div>
	</div>
</div>


<style>
	:global(body) {
		font-family: 'Balsamiq Sans', system-ui;
	}
  </style>