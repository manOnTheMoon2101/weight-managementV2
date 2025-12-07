<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import Goal from "@lucide/svelte/icons/goal";
	import Journey from "@lucide/svelte/icons/footprints";
	import Minus from "@lucide/svelte/icons/minus";
	import Up from "@lucide/svelte/icons/corner-right-up";
	import Down from "@lucide/svelte/icons/corner-right-down";
	let { limits, userJourney } = $props<{ limits: any; userJourney: any }>();

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
	<Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} class="max-h-[90vh] overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Preferences</Dialog.Title>
			<Dialog.Description>
				<form
					method="POST"
					class="space-y-3 overflow-y-auto"
					action="/dashboard?/updateLimits"
					onsubmit={handleUpdateSubmit}
				>
					<div class="flex flex-row">
						<Card.Root class="mx-2">
							<Card.Header>
								<Card.Title class="flex flex-row"
									><Minus class="text-destructive mx-1" />Limits</Card.Title
								>
							</Card.Header>
							<Card.Content class="space-y-2">
								<Label for="caloriesLimit">Calories</Label>
								<Input
									name="caloriesLimit"
									placeholder="Calories"
									type={"number"}
									value={limits?.caloriesLimit}
								/>
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
							</Card.Content>
						</Card.Root>

						<Card.Root class="mx-2">
							<Card.Header>
								<Card.Title class="flex flex-row"><Goal class="text-save mx-1" />Goals</Card.Title>
							</Card.Header>
							<Card.Content>
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
							</Card.Content>
						</Card.Root>
					</div>

					<Card.Root>
						<Card.Header>
							<Card.Title class="flex flex-row"><Journey class=" mx-1" />Journey</Card.Title>
						</Card.Header>
						<Card.Content>
							<Select.Root type="single" name="journey" bind:value>
								<Select.Trigger class=" w-[180px]"
									>
									
									{#if triggerContent === "Weight Loss"}
										<Down class="text-save"/>

										{:else}
										<Up class="text-destructive"/>
									{/if}
									{triggerContent}</Select.Trigger
								>
								<Select.Content >
									{#each journeys as journey (journey.value)}
										<Select.Item value={journey.value} label={journey.name}>
											{journey.name}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</Card.Content>
					</Card.Root>

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
