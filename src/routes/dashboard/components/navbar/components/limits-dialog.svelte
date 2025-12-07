<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Select from "$lib/components/ui/select/index.js";
	let { limits,userJourney } = $props<{ limits: any,userJourney : any }>();

	let updateLoading = $state(false);

	let journeys = [
		{ value: "Weight_Loss", name: "Weight Loss" },
		{ value: "Weight_Gain", name: "Bulk" },
	];

	let value = $derived(userJourney || "");

	const triggerContent = $derived(
		journeys.find((f) => f.value === value)?.name ?? "Select a Journey"
	);

	function handleUpdateSubmit() {
		updateLoading = true;
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class="cursor-pointer">Preferences</Dialog.Trigger>
	<Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()}>
		<Dialog.Header>
			<Dialog.Title>Preferences</Dialog.Title>
			<Dialog.Description>
				<form method="POST" action="/dashboard?/updateLimits" onsubmit={handleUpdateSubmit}>
					<div class="flex flex-row justify-between rounded-lg p-1">
						<div>
							<Label for="caloriesLimit">Calories</Label>
							<Input
								name="caloriesLimit"
								placeholder="Calories"
								type={"number"}
								value={limits?.caloriesLimit}
							/>

							<Label for="waterLimit">Water</Label>
							<Input
								name="waterLimit"
								placeholder="Water"
								type={"number"}
								value={limits?.waterLimit}
							/>

							<Label for="stepsLimit">Steps</Label>
							<Input
								name="stepsLimit"
								placeholder="Steps"
								type={"number"}
								value={limits?.stepsLimit}
							/>
							<div class="my-2">
								<Label for="journey">Journey</Label>
								<Select.Root type="single" name="journey" bind:value>
									<Select.Trigger class="w-[180px] text-foregroundAlt">{triggerContent}</Select.Trigger>
									<Select.Content class="bg-background">
										{#each journeys as journey (journey.value)}
											<Select.Item value={journey.value} label={journey.name}>
												{journey.name}
											</Select.Item>
										{/each}
									</Select.Content>
								</Select.Root>
							</div>
						</div>

						<div>
							<Label for="fatLimit">Fat</Label>
							<Input name="fatLimit" placeholder="Fat" type={"number"} value={limits?.fatLimit} />

							<Label for="carbsLimit">Carbs</Label>
							<Input
								name="carbsLimit"
								placeholder="Carbs"
								type={"number"}
								value={limits?.carbsLimit}
							/>

							<Label for="proteinLimit">Protein</Label>
							<Input
								name="proteinLimit"
								placeholder="Protein"
								type={"number"}
								value={limits?.proteinLimit}
							/>

							<Label for="sugarLimit">Sugar</Label>
							<Input
								name="sugarLimit"
								placeholder="Sugar"
								type={"number"}
								value={limits?.sugarLimit}
							/>
						</div>
					</div>

					<div class="mt-4 flex flex-row justify-end">
						{#if !updateLoading}
							<Button type="submit" variant="save">Save</Button>
						{:else}
							<Button type="submit" variant="save" disabled>
								<div class="flex items-center justify-center space-x-2">
									<div class="border-accent h-4 w-4 animate-spin rounded-full border-b-2"></div>
									<span>Saving...</span>
								</div>
							</Button>
						{/if}
					</div>
				</form>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
