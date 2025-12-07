<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	import SettingsIcon from "@lucide/svelte/icons/settings-2";
	import X from "@lucide/svelte/icons/x";
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import Health from "@lucide/svelte/icons/heart";
	import Measurement from "@lucide/svelte/icons/ruler";
	import Apple from "@lucide/svelte/icons/apple";
	import Bed from "@lucide/svelte/icons/bed";
	import Pill from "@lucide/svelte/icons/pill";
	let { dialogOpen = $bindable(), rowToEdit } = $props<{ dialogOpen: boolean; rowToEdit: any }>();

	let deleteLoading = $state(false);
	let updateLoading = $state(false);

	function formatDMY(dateString: string): string {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${year}-${month}-${day}`;
	}

	function handleDeleteSubmit() {
		deleteLoading = true;
	}
	function handleUpdateSubmit() {
		updateLoading = true;
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

						<Card.Root class="bg-primary flex-1">
							<Card.Header class="pb-3">
								<Card.Title class="flex text-base"><Pill class="mr-1" />Supplements</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="flex flex-col space-y-1">
									<div class="my-4 flex items-start space-x-2">
										<Checkbox
											id="vitamin"
											name="vitamin"
											checked={rowToEdit?.multiVitamin == "true" ? true : false}
										/>
										<Label for="vitamin" class="text-sm">Vitamin</Label>
									</div>
									<div class="my-4 flex items-start space-x-2">
										<Checkbox
											id="magnesium"
											name="magnesium"
											checked={rowToEdit?.magnesium == "true" ? true : false}
										/>
										<Label for="magnesium" class="text-sm">Magnesium</Label>
									</div>
									<div class="my-4 flex items-start space-x-2">
										<Checkbox
											id="zen"
											name="zen"
											checked={rowToEdit?.zen == "true" ? true : false}
										/>
										<Label for="zen" class="text-sm">Zen</Label>
									</div>

									<div class="my-4 flex items-start space-x-2">
										<Checkbox
											id="cla"
											name="cla"
											checked={rowToEdit?.cla == "true" ? true : false}
										/>
										<Label for="cla" class="text-sm">CLA</Label>
									</div>
									<div class="my-4 flex items-start space-x-2">
										<Checkbox
											id="fatBurner"
											name="fatBurner"
											checked={rowToEdit?.fatBurner == "true" ? true : false}
										/>
										<Label for="fatBurner" class="text-sm">Fat Burner</Label>
									</div>
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
