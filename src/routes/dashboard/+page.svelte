<script lang="ts">
    import type { PageData } from "./$types";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import ChevronUp from "@lucide/svelte/icons/chevron-up";
    import ChevronRight from "@lucide/svelte/icons/chevron-right";
    
    export let data: PageData;
    
    $: currentWeight = data.currentWeight;
    $: previousWeight = data.previousWeight;
    $: averageWaterIntake = data.averageWaterIntake;
    $: averageStepsIntake = data.averageStepsIntake;
    
    // Function to determine weight change status
    $: getWeightChangeClass = () => {
        if (!currentWeight?.weight || !previousWeight?.weight) return "text-white";
        const current = Number(currentWeight.weight);
        const previous = Number(previousWeight.weight);
        if (current > previous) return "text-red-500"; // Weight increased (red)
        if (current < previous) return "text-green-500"; // Weight decreased (green)
        return "text-white"; // No change (white)
    };
    
    $: getWeightChangeIndicator = () => {
        if (!currentWeight?.weight || !previousWeight?.weight) return "";
        const current = Number(currentWeight.weight);
        const previous = Number(previousWeight.weight);
        if (current > previous) return "up";
        if (current < previous) return "down";
        return "same"; // Equal weights
    };
</script>

<div class="flex flex-col gap-1">
    <div class="bg-card text-card-foreground rounded-md border p-1 font-mono">
        <div class="flex flex-row justify-around">
            <span>
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