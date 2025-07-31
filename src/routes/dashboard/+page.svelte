<script lang="ts">
	import type { PageData } from "./$types";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import ChevronUp from "@lucide/svelte/icons/chevron-up";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	export let data: PageData;

	$: user = data.user;
	$: currentWeight = data.currentWeight;
	$: previousWeight = data.previousWeight;
	$: averageWaterIntake = data.averageWaterIntake;
	$: averageStepsIntake = data.averageStepsIntake;

	function greet(name: string): string {
		const hour = new Date().getHours();
		if (hour < 12) {
			return `Good morning, ${name}!`;
		} else if (hour < 18) {
			return `Good afternoon, ${name}!`;
		} else {
			return `Good evening, ${name}!`;
		}
	}
</script>

<div class="flex flex-col gap-1">
	<div class="bg-card text-card-foreground rounded-md border p-1 font-mono">
		<div class="flex flex-row justify-around">
			<span>
				{#if user}
				{greet(user.name)}
				{/if}
				Current Weight
				<span
					class={!currentWeight?.weight || !previousWeight?.weight
						? "text-white"
						: Number(currentWeight.weight) > Number(previousWeight.weight)
							? "text-red-500"
							: Number(currentWeight.weight) < Number(previousWeight.weight)
								? "text-green-500"
								: "text-white"}
				>
					{currentWeight?.weight}
				</span>
				{#if currentWeight?.weight && previousWeight?.weight}
					{#if Number(currentWeight.weight) > Number(previousWeight.weight)}
						<ChevronUp class="text-red-500 " />
					{:else if Number(currentWeight.weight) < Number(previousWeight.weight)}
						<ChevronDown class="text-green-500 " />
					{:else}
						<ChevronRight class="text-white " />
					{/if}
				{/if}
			</span>
			Average Water Intake(ml) {Math.round(Number(averageWaterIntake))}
			Average Steps {Math.round(Number(averageStepsIntake))}
		</div>
	</div>
</div>
