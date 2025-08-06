<script lang="ts">
	import type { PageData } from "./$types";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import ChevronUp from "@lucide/svelte/icons/chevron-up";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { DateFormatter, type DateValue, getLocalTimeZone, today } from "@internationalized/date";
	let {
		user,
		currentWeight,
		currentWeightDate,
		previousWeight,
		previousWeightDate,
		averageWaterIntake,
		averageStepsIntake,
	}: {
		user: any;
		currentWeight?: number;
		currentWeightDate?: any;
		previousWeight?: number;
		previousWeightDate?: any;
		averageWaterIntake: number;
		averageStepsIntake: number;
	} = $props();

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
			Average Steps {Math.round(Number(averageStepsIntake))}
		</div>
	</div>
</div>
