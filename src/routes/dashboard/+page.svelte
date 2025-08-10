<script lang="ts">
	import type { PageData } from "./$types";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import ChevronUp from "@lucide/svelte/icons/chevron-up";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import FootPrint from "@lucide/svelte/icons/footprints";
	import { DateFormatter} from "@internationalized/date";
import Weight from "./components/charts/Weight.svelte";
	let { data }: { data: PageData } = $props();

	let user = $derived(data.user);
	let weightCharts = $derived(data.weightCharts)
	let currentWeight = $derived(data.currentWeight?.weight);
	let currentWeightDate = $derived(data.currentWeight?.createdAt);
	let previousWeight = $derived(data.previousWeight?.weight);
	let previousWeightDate = $derived(data.previousWeight?.createdAt);
	let averageWaterIntake = $derived(data.averageWaterIntake);
	let averageStepsIntake = $derived(data.averageStepsIntake);

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
		<div class="flex flex-row items-center justify-between">
			<div>
				{#if user}
					<h1 class="text-4xl">{greet(user.name)}</h1>
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
								<h4 class="text-muted">Current Weight</h4>
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
								<h4 class="text-muted">Previous Weight</h4>
							</div>
						</Tooltip.Content>
					</Tooltip.Root>
				</Tooltip.Provider>
			</div>
		</div>

		<div>
			Average Water Intake(ml) {Math.round(Number(averageWaterIntake))}
			
		</div>

		<div class="flex flex-row items-center justify-evenly">
			<Weight dateSeriesData={weightCharts}/>
			<div class="flex flex-col justify-center items-center">
				<span class="text-8xl flex flex-row items-center">{Math.round(Number(averageStepsIntake))} <FootPrint/></span>

				<h3 class="text-muted">Average Steps </h3>
			</div>
		</div>
	</div>
</div>
