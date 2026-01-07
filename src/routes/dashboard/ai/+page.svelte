<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { Badge } from "$lib/components/ui/badge/index";


	interface NutritionData {
		name: string;
		calories: string;
		serving_size_g: string;
		fat_total_g: string;
		fat_saturated_g: string;
		protein_g: string;
		sodium_mg: string;
		potassium_mg: string;
		cholesterol_mg: string;
		carbohydrates_total_g: string;
		fiber_g: string;
		sugar_g: string;
	}

	let query = $state("");
	let loading = $state(false);
	let nutritionData = $state<NutritionData[] | null>(null);
	let error = $state("");

	async function generateNutrition() {
		if (!query.trim()) {
			error = "Please enter some foods";
			return;
		}

		loading = true;
		error = "";
		nutritionData = null;

		try {
			const response = await fetch("/api/nutrition", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query: query.trim() }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to fetch nutrition data");
			}

			nutritionData = data;
		} catch (err) {
			console.error("Error details:", err);
			error = err instanceof Error ? err.message : "An error occurred";
		} finally {
			loading = false;
		}
	}

	function clearResults() {
		nutritionData = null;
		error = "";
		query = "";
	}
</script>

<div class="grid w-full gap-2">
	<Textarea
		placeholder="Enter Foods Here (e.g., '1 apple, 2 slices of bread, 100g chicken breast')"
		bind:value={query}
		disabled={loading}
	/>
	<Button class="bg-secondary" onclick={generateNutrition} disabled={loading || !query.trim()}>
		{loading ? "Analyzing..." : "Generate Nutrition Info"}
	</Button>
</div>

{#if error}
	<div class="text-center">
		<Badge class="bg-destructive text-foreground text-lg">{error}</Badge>
	</div>
{/if}

{#if nutritionData}
	<div class="mt-4 space-y-4">
		<div class="flex items-center justify-between">
			<h3 class="text-lg font-semibold">Nutrition Analysis</h3>
			<Button variant="outline" onclick={clearResults}>Clear</Button>
		</div>

		{#if Array.isArray(nutritionData) && nutritionData.length > 0}
			<div class="grid gap-4">
				{#each nutritionData as item}
					<div class="rounded-lg border p-4">
						<h4 class="mb-3 text-lg font-semibold">{item.name}</h4>
						<div class="grid grid-cols-2 gap-3 md:grid-cols-3"></div>
						<div class="flex flex-col">
							<span class="text-muted-foreground text-sm">Calories</span>
							<span class="font-medium">{item.calories}</span>
						</div>
						<div class="flex flex-col">
							<span class="text-muted-foreground text-sm">Serving Size (g)</span>
							<span class="font-medium">{item.serving_size_g}</span>
						</div>
						<div class="flex flex-col">
							<span class="text-muted-foreground text-sm">Total Fat (g)</span>
							<span class="font-medium">{item.fat_total_g}</span>
						</div>
						<div class="flex flex-col">
							<span class="text-muted-foreground text-sm">Saturated Fat (g)</span>
							<span class="font-medium">{item.fat_saturated_g}</span>
						</div>
						<div class="flex flex-col">
							<span class="text-muted-foreground text-sm">Protein (g)</span>
							<span class="font-medium">{item.protein_g}</span>
						</div>
						<div class="flex flex-col">
							<span class="text-muted-foreground text-sm">Sodium (mg)</span>
							<span class="font-medium">{item.sodium_mg}</span>
						</div>
						<div class="flex flex-col">
							<span class="text-muted-foreground text-sm">Potassium (mg)</span>
							<span class="font-medium">{item.potassium_mg}</span>
						</div>
						<div class="flex flex-col">
							<span class="text-muted-foreground text-sm">Cholesterol (mg)</span>
							<span class="font-medium">{item.cholesterol_mg}</span>
						</div>
						<div class="flex flex-col">
							<span class="text-muted-foreground text-sm">Carbohydrates (g)</span>
							<span class="font-medium">{item.carbohydrates_total_g}</span>
						</div>
						<div class="flex flex-col">
							<span class="text-muted-foreground text-sm">Fiber (g)</span>
							<span class="font-medium">{item.fiber_g}</span>
						</div>
						<div class="flex flex-col">
							<span class="text-muted-foreground text-sm">Sugar (g)</span>
							<span class="font-medium">{item.sugar_g}</span>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center">
				<Badge variant="outline">No nutrition data found for the entered foods</Badge>
			</div>
		{/if}
	</div>
{/if}
