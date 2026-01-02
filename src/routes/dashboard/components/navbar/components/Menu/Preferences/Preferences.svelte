<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import Goal from "@lucide/svelte/icons/goal";
	import Journey from "@lucide/svelte/icons/footprints";
	import Pill from "@lucide/svelte/icons/pill";
	import Liquid from "@lucide/svelte/icons/milk";
	import Gummy from "@lucide/svelte/icons/candy";
	import Powder from "@lucide/svelte/icons/wand-sparkles";
	import Plus from "@lucide/svelte/icons/circle-plus";
	import Save from "@lucide/svelte/icons/save";
	import Minus from "@lucide/svelte/icons/minus";
	import Up from "@lucide/svelte/icons/corner-right-up";
	import Pencil from "@lucide/svelte/icons/pencil";
	import Down from "@lucide/svelte/icons/corner-right-down";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import ColorPicker, { ChromeVariant } from "svelte-awesome-color-picker";
			import Flag from "@lucide/svelte/icons/flag";
	import { toast } from "svelte-sonner";
	import { enhance } from "$app/forms";

	interface Limits {
		caloriesLimit: number | null;
		carbsLimit: number | null;
		stepsLimit: number | null;
		waterLimit: number | null;
		sugarLimit: number | null;
		proteinLimit: number | null;
	}

	interface Supplements {
		name: string;
		color: string;
		type: string;
		id: number;
	}

	let { limits, userJourney, userSupplements } = $props<{
		limits: Limits;
		userJourney: string;
		userSupplements: Supplements;
	}>();

	let updateLoading = $state<boolean>(false);
	let supplementDialogOpen = $state<boolean>(false);
	let supplementEditDialogOpen = $state<boolean>(false);
	let selectedColor = $state<string>("#FFFFFF");
	let supplementName = $state<string>("");
	let editColor = $state<string>("#FFFFFF");
	let editName = $state<string>("");
	let editType = $state<string>("");
	let editId = $state<string>("");
	let formResult = $state<{ success?: boolean; error?: string } | null>(null);

	let journeys = [
		{ value: "Weight_Loss", name: "Weight Loss" },
		{ value: "Weight_Gain", name: "Bulk" },
	];

	let supplementTypes = [
		{ value: "Capsule" },
		{ value: "Liquid" },
		{ value: "Gummy" },
		{ value: "Powder" },
	];

	let value = $derived(userJourney || "");

	const triggerContent = $derived(
		journeys.find((f) => f.value === value)?.name ?? "Select a Journey"
	);

	const triggerType = $derived(supplementTypes.find((f) => f.value === value)?.value ?? "Capsule");

	function handleUpdateSubmit(){
		updateLoading = true
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class="cursor-pointer  w-full flex flex-row gap-1"><Flag/>Preferences</Dialog.Trigger>
	<Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} class="max-h-[90vh] overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Preferences</Dialog.Title>
			<Dialog.Description>
				<form
					method="POST"
					class="space-y-3 overflow-y-auto"
					action="/dashboard?/updateLimits"
					use:enhance={() => {
					updateLoading = true;
					return async ({ result }) => {
						updateLoading = false;
						if (result.type === "success" && result.data) {
							formResult = result.data as { success?: boolean; error?: string };
							if (formResult.success) {
								toast.success("Successfully Updated");
							} else if (formResult.error) {
								toast.error(formResult.error);
							}
						}
					};
				}}
				>
					<div class="flex flex-row">
						<Card.Root class="mx-2">
							<Card.Header>
								<Card.Title class="flex flex-row"
									><Minus class="text-destructive mx-1" />Limits</Card.Title
								>
							</Card.Header>
							<Card.Content class="space-y-2">
								<Label for="caloriesLimit">Calories(g)</Label>
								<Input
									name="caloriesLimit"
									placeholder="Calories"
									type={"number"}
									value={limits?.caloriesLimit}
								/>
								<Label for="fatLimit">Fat(g)</Label>
								<Input name="fatLimit" placeholder="Fat" type={"number"} value={limits?.fatLimit} />

								<Label for="carbsLimit">Carbs(g)</Label>
								<Input
									name="carbsLimit"
									placeholder="Carbs"
									type={"number"}
									value={limits?.carbsLimit}
								/>

								<Label for="proteinLimit">Protein(g)</Label>
								<Input
									name="proteinLimit"
									placeholder="Protein"
									type={"number"}
									value={limits?.proteinLimit}
								/>

								<Label for="sugarLimit">Sugar(g)</Label>
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
								<Label for="waterLimit">Water(ml)</Label>
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
								<Select.Trigger class=" w-[180px]">
									{#if triggerContent === "Weight Loss"}
										<Down class="text-save" />
									{:else if triggerContent === "Bulk"}
										<Up class="text-destructive" />
									{/if}
									{triggerContent}</Select.Trigger
								>
								<Select.Content>
									{#each journeys as journey (journey.value)}
										<Select.Item value={journey.value} label={journey.name}>
											{journey.name}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</Card.Content>
					</Card.Root>

					<Card.Root>
						<Card.Header>
							<Card.Title class="flex items-center justify-between"
								>Supplements

								<Tooltip.Provider delayDuration={100}>
									<Tooltip.Root>
										<Tooltip.Trigger>
											<Button variant="save" onclick={() => (supplementDialogOpen = true)}
												><Plus /></Button
											>
										</Tooltip.Trigger>
										<Tooltip.Content side="top">Add New Supplement</Tooltip.Content>
									</Tooltip.Root>
								</Tooltip.Provider>
							</Card.Title>
						</Card.Header>

						<Card.Content>
							{#each userSupplements as s}
								<div class="flex flex-row items-center justify-between">
									<div class="flex flex-row items-center">
										{s.name}

										{#if s.type === "Gummy"}
											<Gummy style="color: {s.color}" />
										{:else if s.type === "Liquid"}
											<Liquid style="color: {s.color}" />
										{:else if s.type === "Powder"}
											<Powder style="color: {s.color}" />
										{:else}
											<Pill style="color: {s.color}" />
										{/if}
									</div>

									<Tooltip.Provider delayDuration={100}>
										<Tooltip.Root>
											<Tooltip.Trigger>
												<Button
													onclick={() => (
														(supplementEditDialogOpen = true),
														(editColor = s.color),
														(editType = s.type),
														(editName = s.name),
														(editId = s.id)
													)}><Pencil /></Button
												>
											</Tooltip.Trigger>
											<Tooltip.Content side="top">Edit Supplement</Tooltip.Content>
										</Tooltip.Root>
									</Tooltip.Provider>
								</div>
							{/each}
						</Card.Content>
					</Card.Root>
					<div class="mt-4 flex flex-row justify-end">
						{#if !updateLoading}
							<Button type="submit" variant="save"><Save />Save</Button>
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

<Dialog.Root bind:open={supplementDialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add Supplement</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description>
			<form
				method="POST"
				class="space-y-3"
				action="/dashboard?/createSupplements"
				onsubmit={handleUpdateSubmit}
			>
				<Label for="name">Supplement Name</Label>
				<Input name="name" placeholder="Name" type="text" bind:value={supplementName} />

				<Label for="description">Description</Label>
				<Textarea name="description" placeholder="Description"  />

				<div>
					<Label for="color">Colour</Label>

					<div class="border-accent mb-4 rounded-md border py-2">
						<ColorPicker
							label={selectedColor ? selectedColor : "Choose a color"}
							bind:hex={selectedColor}
							components={ChromeVariant}
							sliderDirection="horizontal"
						/>
						<input type="hidden" name="color" value={selectedColor} />
					</div>

					<Select.Root type="single" name="type" bind:value>
						<Select.Trigger class=" w-[180px]">
							{triggerType}</Select.Trigger
						>
						<Select.Content>
							{#each supplementTypes as type (type.value)}
								<Select.Item value={type.value} label={type.value}>
									{type.value}
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<Button type="submit" variant="save" disabled={updateLoading || !supplementName.trim()}>
					{updateLoading ? "Adding..." : "Add Supplement"}
				</Button>
			</form>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={supplementEditDialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Supplement</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description>
			<form
				method="POST"
				class="space-y-3"
				action="/dashboard?/updateSupplements"
				onsubmit={handleUpdateSubmit}
			>
				<input type="hidden" name="id" value={editId || ""} />
				<Label for="name">Supplement Name</Label>
				<Input name="name" placeholder="Enter supplement name" type="text" value={editName} />


				<Label for="description">Description</Label>
				<Textarea name="description" placeholder="Description"  />

				<div>
					<Label>Colour</Label>
					<div class="border-accent mb-4 rounded-md border py-2">
						<ColorPicker
							label={editColor}
							bind:hex={editColor}
							components={ChromeVariant}
							sliderDirection="horizontal"
						/>
						<input type="hidden" name="color" value={editColor} />
					</div>

					<Select.Root type="single" name="type" bind:value={editType}>
						<Select.Trigger class=" w-[180px]">
							{editType}</Select.Trigger
						>
						<Select.Content>
							{#each supplementTypes as type (type.value)}
								<Select.Item value={type.value} label={type.value}>
									{type.value}
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>

				<Button type="submit" variant="save" disabled={updateLoading}>
					{updateLoading ? "Updating..." : "Update Supplement"}
				</Button>
			</form>

			<form
				method="POST"
				action="/dashboard?/deleteSupplements"
				onsubmit={handleUpdateSubmit}
				class="mt-2"
			>
				<input type="hidden" name="id" value={editId || ""} />
				<Button type="submit" variant="destructive" disabled={updateLoading}>
					{updateLoading ? "Deleting..." : "Delete"}
				</Button>
			</form>
		</Dialog.Description>
	</Dialog.Content>
</Dialog.Root>
