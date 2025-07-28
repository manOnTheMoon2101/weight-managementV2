<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	$: currentWeight = data.currentWeight;
	$: averageWaterIntake = data.averageWaterIntake;
	$: averageStepsIntake = data.averageStepsIntake
</script>

<div class="flex flex-col gap-1">
	<div class="bg-card text-card-foreground rounded-md border p-1 font-mono">
		<div class="flex flex-row justify-around">
			Current Weight {currentWeight?.weight}
			Average Water Intake(ml) {Math.round(Number(averageWaterIntake))}
			Average Steps {Math.round(Number(averageStepsIntake))}
		</div>
	</div>
</div>
