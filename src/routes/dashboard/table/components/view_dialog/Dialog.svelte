<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import Button from "$lib/components/ui/button/button.svelte";

	import SettingsIcon from "@lucide/svelte/icons/settings-2";
	import X from "@lucide/svelte/icons/x";
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import Health from "@lucide/svelte/icons/heart";
	import Pencil from "@lucide/svelte/icons/pencil";
	import Measurement from "@lucide/svelte/icons/ruler";
	import Apple from "@lucide/svelte/icons/apple";
	import Bed from "@lucide/svelte/icons/bed";
	import Pill from "@lucide/svelte/icons/pill";
	import Liquid from "@lucide/svelte/icons/milk";
	import Gummy from "@lucide/svelte/icons/candy";

	interface Supplements {
		custom_supplementsId: number;
		quantity: string;
		custom_supplement?: {
			name: string;
			id: number;
		};
	}

	interface SupplementData {
		id: number;
		name: string;
	}

	let {
		dialogOpen = $bindable(),
		rowToEdit,
		allSupplements = [],
	} = $props<{
		dialogOpen: boolean;
		rowToEdit: any;
		allSupplements: any;
	}>();

	let deleteLoading = $state(false);
	let updateLoading = $state(false);
	let assignedSupplements = $state<Supplements[]>([]);
	let supplementDialogOpen = $state(false);
	let supplementQuantityEdit = $state(false);
	let quantityInput = $state("");
	let editingSupplementId = $state<number | null>(null);
	let editQuantityInput = $state("");
	let editQuantityName = $state("");

	$inspect(rowToEdit);
	$effect(() => {
		if (rowToEdit?.allAssignedSupplements) {
			assignedSupplements = [...rowToEdit.allAssignedSupplements];
		}
	});

	function handleDeleteSubmit() {
		deleteLoading = true;
	}

	function handleUpdateSubmit(event: Event) {
		updateLoading = true;
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		formData.set("assignedSupplements", JSON.stringify(assignedSupplements));

		return true;
	}

	function formatDate(dateValue: string | Date): string {
		const date = new Date(dateValue);
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			month: "short",
			year: "numeric",
			day: "numeric",
		});
	}

	function assignSupplement(supplementId: number, quantity: string) {
		if (!quantity.trim()) {
			console.log("No quantity provided, returning");
			return;
		}

		const existingIndex = assignedSupplements.findIndex(
			(s) => s.custom_supplementsId === supplementId
		);

		if (existingIndex >= 0) {
			assignedSupplements[existingIndex].quantity = quantity;
		} else {
			assignedSupplements.push({
				custom_supplementsId: supplementId,
				quantity: quantity,
			});
		}

		quantityInput = "";
		// supplementDialogOpen = false;
	}

	function removeSupplement(supplementId: number) {
		assignedSupplements = assignedSupplements.filter(
			(s) => s.custom_supplementsId !== supplementId
		);
	}

	function updateSupplementQuantity() {
		if (!editQuantityInput.trim() || editingSupplementId === null) {
			return;
		}

		const existingIndex = assignedSupplements.findIndex(
			(s) => s.custom_supplementsId === editingSupplementId
		);

		if (existingIndex >= 0) {
			assignedSupplements[existingIndex].quantity = editQuantityInput;
		}

		editingSupplementId = null;
		editQuantityInput = "";
		supplementQuantityEdit = false;
	}
</script>

<Sheet.Root>
	<Sheet.Trigger class="w-full">
		<Button size={"sm"} variant={"save"}><SettingsIcon class="size-4" />Edit</Button>
	</Sheet.Trigger>
	<Sheet.Content class="max-h-[100vh] overflow-y-auto" side="left">
		<Sheet.Header>
			<Sheet.Title class="flex flex-row justify-center"
				>{rowToEdit ? formatDate(rowToEdit.createdAt) : ""}</Sheet.Title
			>
			<Sheet.Description>
				<form
					class="space-y-3 overflow-y-auto"
					method="POST"
					action="?/updateNutrients"
					onsubmit={handleUpdateSubmit}
				>
					<input type="hidden" name="id" value={rowToEdit?.id || ""} />
					<!-- Hidden input to store assigned supplements data -->
					<input
						type="hidden"
						name="assignedSupplements"
						value={JSON.stringify(assignedSupplements)}
					/>
					<Card.Root class="bg-primary">
						<Card.Header class="pb-3">
							<Card.Title class="flex text-base"><Health class="mr-1" />Health</Card.Title>
						</Card.Header>
						<Card.Content class="space-y-2">
							<div>
								<Label for="weight" class="text-sm">Weight</Label>
								<Input
									name="weight"
									placeholder="Weight"
									value={rowToEdit?.weight || ""}
									class="h-8"
								/>
							</div>
							<div>
								<Label for="steps" class="text-sm">Steps</Label>
								<Input
									name="steps"
									placeholder="Steps"
									value={rowToEdit?.steps || ""}
									class="h-8"
								/>
							</div>
							<div>
								<Label for="water" class="text-sm">Water</Label>
								<Input
									name="water"
									placeholder="Water"
									value={rowToEdit?.water || ""}
									class="h-8"
								/>
							</div>
						</Card.Content>
					</Card.Root>

					<div>
						<Card.Root class="bg-primary flex-1">
							<Card.Header class="pb-3">
								<Card.Title class="flex items-center justify-between text-base">
									<span class="flex items-center"><Pill class="mr-1" />Supplements</span>
									<Button size="sm" onclick={() => (supplementDialogOpen = true)}>Add</Button>
								</Card.Title>
							</Card.Header>
							<Card.Content class="space-y-2">
								<div class="border-t pt-2">
									{#if assignedSupplements.length > 0}
										{#each assignedSupplements as supplement}
											{@const supplementData = allSupplements.find(
												(s: SupplementData) => s.id === supplement.custom_supplementsId
											)}
											<div class="bg-muted mb-2 flex items-center justify-between rounded p-2">
												<div class="flex-1">
													<span class="text-sm font-medium">{supplementData?.name || ""}</span>
													<span class="text-sm font-medium">{#if supplementData.type === "Gummy"}
											<Gummy style="color: {supplementData.color}" />
										{:else if supplementData.type === "Liquid"}
											<Liquid style="color: {supplementData.color}" />
										{:else}
											<Pill style="color: {supplementData.color}" />
										{/if}</span>
													<span class="text-muted-foreground text-xs"
														>Qty: {supplement.quantity}</span
													>
												</div>
												<Button
													size="sm"
													variant="ghost"
													onclick={() => {
														editingSupplementId = supplement.custom_supplementsId;
														editQuantityInput = supplement.quantity;
														editQuantityName = supplementData?.name;
														supplementQuantityEdit = true;
													}}
													class="hover:bg-primary hover:text-foreground h-6 w-6 p-0"
												>
													<Pencil />
												</Button>
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
										<p class="text-muted-foreground text-sm">No custom supplements assigned</p>
									{/if}
								</div>
							</Card.Content>
						</Card.Root>
					</div>

					<div>
						<Card.Root class="bg-primary flex-1">
							<Card.Header class="pb-3">
								<Card.Title class="flex text-base"
									><Measurement class="mr-1" />Measurements</Card.Title
								>
							</Card.Header>
							<Card.Content class="space-y-2">
								<div>
									<Label for="waist" class="text-sm">Waist</Label>
									<Input
										value={rowToEdit?.waistMeasurement || ""}
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
									<Input
										name="calories"
										placeholder="Calories"
										value={rowToEdit?.calories || ""}
										class="h-8"
									/>
								</div>
								<div>
									<Label for="protein" class="text-sm">Protein</Label>
									<Input
										name="protein"
										placeholder="Protein"
										value={rowToEdit?.protein || ""}
										class="h-8"
									/>
								</div>
								<div>
									<Label for="fat" class="text-sm">Fat</Label>
									<Input name="fat" placeholder="Fat" value={rowToEdit?.fat || ""} class="h-8" />
								</div>
								<div>
									<Label for="sugar" class="text-sm">Sugar</Label>
									<Input
										name="sugar"
										placeholder="Sugar"
										value={rowToEdit?.sugar || ""}
										class="h-8"
									/>
								</div>
								<div>
									<Label for="carbs" class="text-sm">Carbs</Label>
									<Input
										name="carbs"
										placeholder="Carbs"
										value={rowToEdit?.carbs || ""}
										class="h-8"
									/>
								</div>
							</Card.Content>
						</Card.Root>
					</div>

					<Card.Root class="bg-primary">
						<Card.Header class="pb-3">
							<Card.Title class="flex text-base"><Bed class="mr-1" />Sleep</Card.Title>
						</Card.Header>
						<Card.Content>
							<!-- <div>
								<Label for="score" class="text-sm">Score</Label>
								<Input
									name="score"
									placeholder="Sleep Score"
									value={rowToEdit?.sleep_schedule[0]?.score || ""}
									class="h-8"
								/>
							</div> -->

							<div>
								<Label for="time" class="text-sm">Time</Label>
								<Input
									name="time"
									type="time"
									placeholder="Time"
									value={rowToEdit?.sleep_schedule[0]?.time || ""}
									class="h-8"
								/>
							</div>
						</Card.Content>
					</Card.Root>

					{#if !updateLoading}
						<Button class="mt-4 w-full" variant="save" type="submit">Update</Button>
					{:else}
						<Button class="mt-4  w-full" variant="save" type="button" disabled>
							<div class="flex items-center justify-center space-x-2">
								<div class="border-accent h-4 w-4 animate-spin rounded-full border-b-2"></div>
								<span>Updating...</span>
							</div>
						</Button>
					{/if}

					<div>
						<AlertDialog.Root>
							<AlertDialog.Trigger class="w-full">
								<Button class="text-destructive mt-4 w-full" variant="save">Delete</Button>
							</AlertDialog.Trigger>
							<AlertDialog.Content>
								<AlertDialog.Header>
									<div class="flex flex-row items-center justify-between">
										<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
										<AlertDialog.Cancel class="text-red-800 hover:bg-red-800/40"
											><X /></AlertDialog.Cancel
										>
									</div>
								</AlertDialog.Header>
								<AlertDialog.Description>
									This action cannot be undone. This will permanently delete the selected record.
								</AlertDialog.Description>
								<AlertDialog.Footer>
									<form method="POST" action="?/removeNutrients" onsubmit={handleDeleteSubmit}>
										<input type="hidden" name="id" value={rowToEdit?.id || ""} />
										{#if !deleteLoading}
											<Button class="mt-4" variant="destructive" type="submit">Delete</Button>
										{:else}
											<Button class="mt-4" variant="destructive" type="button" disabled>
												<div class="flex items-center justify-center space-x-2">
													<div
														class="border-accent h-4 w-4 animate-spin rounded-full border-b-2"
													></div>
													<span>Deleting...</span>
												</div>
											</Button>
										{/if}
									</form>
								</AlertDialog.Footer>
							</AlertDialog.Content>
						</AlertDialog.Root>
					</div>
				</form>
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>

<Dialog.Root bind:open={supplementQuantityEdit}>
	<Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} class="sm:max-w-[500px]">
		<Dialog.Header>
			<Dialog.Title>Edit {editQuantityName}</Dialog.Title>
		</Dialog.Header>
		<div class="space-y-4">
			<div>
				<Label for="editQuantity" class="text-sm">Quantity</Label>
				<Input
					id="editQuantity"
					bind:value={editQuantityInput}
					placeholder="Enter quantity"
					type="text"
					class="h-8"
				/>
			</div>
			<div class="flex justify-end space-x-2">
				<Button
					variant="outline"
					onclick={() => {
						supplementQuantityEdit = false;
						editingSupplementId = null;
						editQuantityInput = "";
					}}
				>
					Cancel
				</Button>
				<Button variant="save" onclick={updateSupplementQuantity}>Save</Button>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>

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
							(assigned: Supplements) => assigned.custom_supplementsId === s.id
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
