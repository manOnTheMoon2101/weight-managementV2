<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import Button from "$lib/components/ui/button/button.svelte";

	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import Health from "@lucide/svelte/icons/heart";
	import Measurement from "@lucide/svelte/icons/ruler";
	import Apple from "@lucide/svelte/icons/apple";
	import Pill from "@lucide/svelte/icons/pill";
	import Plus from "@lucide/svelte/icons/circle-plus";
	import Liquid from "@lucide/svelte/icons/milk";
	import Gummy from "@lucide/svelte/icons/candy";
	import * as Dialog from "$lib/components/ui/dialog/index.js";

	interface Supplements {
		custom_supplementsId: number;
		quantity: string;
	}

	interface SupplementData {
		id: number;
		name: string;
	}

	let {
		dialogOpen = $bindable(),
		latestWaist = {},
		latestWeight = {},
		allSupplements = {},
	} = $props<{
		dialogOpen: boolean;
		latestWaist: any;
		latestWeight: any;
		allSupplements: SupplementData[];
	}>();

	let createLoading = $state(false);
	let assignedSupplements = $state<Supplements[]>([]);
	let supplementDialogOpen = $state(false);
	let quantityInput = $state("");

	function handleCreateSubmit(event: Event) {
		createLoading = true;

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		formData.set("assignedSupplements", JSON.stringify(assignedSupplements));

		return true;
	}

	function assignSupplement(supplementId: number, quantity: string) {
		console.log("assignSupplement called with:", supplementId, quantity);

		if (!quantity.trim()) {
			console.log("No quantity provided, returning");
			return;
		}

		const existingIndex = assignedSupplements.findIndex(
			(s) => s.custom_supplementsId === supplementId
		);

		if (existingIndex >= 0) {
			assignedSupplements[existingIndex].quantity = quantity;
			console.log("Updated existing supplement");
		} else {
			assignedSupplements.push({
				custom_supplementsId: supplementId,
				quantity: quantity,
			});
			console.log("Added new supplement");
		}

		// Reset input and close dialog
		quantityInput = "";
		supplementDialogOpen = false;
	}

	function removeSupplement(supplementId: number) {
		assignedSupplements = assignedSupplements.filter(
			(s) => s.custom_supplementsId !== supplementId
		);
	}
</script>

<Sheet.Root>
	<Sheet.Trigger>
		<Button variant={"save"}><Plus class="mr-1" />Add</Button>
	</Sheet.Trigger>
	<Sheet.Content class="max-h-[100vh] overflow-y-auto" side="right">
		<Sheet.Header>
			<Sheet.Title>Add New</Sheet.Title>
		</Sheet.Header>
		<form
			method="POST"
			action="?/createNutrients"
			class="space-y-3 overflow-y-auto"
			onsubmit={handleCreateSubmit}
		>
			<!-- Hidden input to store assigned supplements data -->
			<input type="hidden" name="assignedSupplements" value={JSON.stringify(assignedSupplements)} />
			<Card.Root class="bg-primary">
				<Card.Header class="pb-3">
					<Card.Title class="flex text-base"><Health class="mr-1" />Health</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2">
					<div>
						<Label for="weight" class="text-sm">Weight</Label>
						<Input
							id="weight"
							value={latestWeight ? latestWeight.weight : 0}
							name="weight"
							placeholder="Weight"
							class="h-8"
						/>
					</div>
					<div>
						<Label for="steps" class="text-sm">Steps</Label>
						<Input id="steps" name="steps" placeholder="Steps" class="h-8" />
					</div>
					<div>
						<Label for="water" class="text-sm">Water</Label>
						<Input id="water" name="water" placeholder="Water" class="h-8" />
					</div>
				</Card.Content>
			</Card.Root>

			<div>
				<Card.Root class="bg-primary flex-1">
					<Card.Header class="pb-3">
						<Card.Title class="flex items-center justify-between text-base">
							<span class="flex items-center"><Pill class="mr-1" />Supplements</span>
							<Button variant="save" onclick={() => (supplementDialogOpen = true)}><Plus /></Button>
						</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-2">
						{#if assignedSupplements.length > 0}
							{#each assignedSupplements as supplement}
								{@const supplementData = allSupplements.find(
									(s: { id: number }) => s.id === supplement.custom_supplementsId
								)}
								<div class="bg-muted flex items-center justify-between rounded p-2">
									<div class="flex-1">
										<span class="text-sm font-medium">{supplementData?.name || "Unknown"}</span>
										<span class="text-sm font-medium"
											>{#if supplementData.type === "Gummy"}
												<Gummy style="color: {supplementData.color}" />
											{:else if supplementData.type === "Liquid"}
												<Liquid style="color: {supplementData.color}" />
											{:else}
												<Pill style="color: {supplementData.color}" />
											{/if}</span
										>
										<span class="text-muted-foreground ml-2 text-xs"
											>Qty: {supplement.quantity}</span
										>
									</div>
									<Button
										size="sm"
										variant="ghost"
										onclick={() => removeSupplement(supplement.custom_supplementsId)}
										class="hover:bg-destructive hover:text-destructive-foreground h-6 w-6 p-0"
									>
										×
									</Button>
								</div>
							{/each}
						{:else}
							<p class="text-muted-foreground flex flex-row justify-center text-sm">
								No supplements assigned
							</p>
						{/if}
					</Card.Content>
				</Card.Root>
			</div>

			<div>
				<Card.Root class="bg-primary flex-1">
					<Card.Header class="pb-3">
						<Card.Title class="flex text-base"><Measurement class="mr-1" />Measurements</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-2">
						<div>
							<Label for="waist" class="text-sm">Waist</Label>
							<Input
								id="waist"
								value={latestWaist ? latestWaist.waistMeasurement : 0}
								name="waist"
								placeholder="Waist(Cm)"
								class="h-8"
							/>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
			<div class="flex flex-row gap-3">
				<Card.Root class="bg-primary flex-1">
					<Card.Header class="pb-3">
						<Card.Title class="flex text-base"><Apple class="mr-1" />Nutrients</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-2">
						<div>
							<Label for="calories" class="text-sm">Calories</Label>
							<Input id="calories" name="calories" placeholder="Calories" class="h-8" />
						</div>
						<div>
							<Label for="protein" class="text-sm">Protein</Label>
							<Input id="protein" name="protein" placeholder="Protein" class="h-8" />
						</div>
						<div>
							<Label for="fat" class="text-sm">Fat</Label>
							<Input id="fat" name="fat" placeholder="Fat" class="h-8" />
						</div>
						<div>
							<Label for="sugar" class="text-sm">Sugar</Label>
							<Input id="sugar" name="sugar" placeholder="Sugar" class="h-8" />
						</div>
						<div>
							<Label for="carbs" class="text-sm">Carbs</Label>
							<Input id="carbs" name="carbs" placeholder="Carbs" class="h-8" />
						</div>
					</Card.Content>
				</Card.Root>
			</div>

			<div class="mt-4 flex gap-2">
				{#if !createLoading}
					<Button type="submit" class="w-full" variant="save">Create</Button>
				{:else}
					<Button type="submit" class="w-full" variant="save" disabled>
						<div class="flex items-center justify-center space-x-2">
							<div class="border-accent h-4 w-4 animate-spin rounded-full border-b-2"></div>
							<span>Creating...</span>
						</div>
					</Button>
				{/if}
			</div>
		</form>
	</Sheet.Content>
</Sheet.Root>

<Dialog.Root bind:open={supplementDialogOpen}>
	<Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} class="sm:max-w-[500px]">
		<Dialog.Header>
			<Dialog.Title>Add Supplements</Dialog.Title>
		</Dialog.Header>
		<div class="space-y-4">
			<div>
				<Label for="quantity" class="text-sm">Quantity</Label>
				<Input
					id="quantity"
					bind:value={quantityInput}
					placeholder="Enter quantity"
					type="text"
					class="h-8"
					oninput={(e) => {
						const target = e.target as HTMLInputElement;
						if (target) {
							quantityInput = target.value;
						}
					}}
				/>
			</div>

			<div class="max-h-60 space-y-2 overflow-y-auto rounded border p-2">
				<p class="text-muted-foreground mb-2 text-sm">
					Available Supplements: {allSupplements?.length || 0}
				</p>
				{#if allSupplements && allSupplements.length > 0}
					{#each allSupplements as s}
						{@const isAlreadyAssigned = assignedSupplements.some(
							(assigned) => assigned.custom_supplementsId === s.id
						)}
						<div
							class="hover:bg-muted flex items-center justify-between rounded border p-2 {isAlreadyAssigned
								? 'opacity-50'
								: ''}"
						>
							<span class="text-sm">{s.name}</span>
							{#if s.type === "Gummy"}
								<Gummy style="color: {s.color}" />
							{:else if s.type === "Liquid"}
								<Liquid style="color: {s.color}" />
							{:else}
								<Pill style="color: {s.color}" />
							{/if}
							<Button
								type="button"
								size="sm"
								onclick={() => assignSupplement(s.id, quantityInput)}
								disabled={!quantityInput.trim() || isAlreadyAssigned}
								variant={isAlreadyAssigned ? "success" : "default"}
							>
								{isAlreadyAssigned ? "Added" : "Add"}
							</Button>
						</div>
					{/each}
				{:else}
					<p class="text-muted-foreground text-sm">No supplements available</p>
				{/if}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
