<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	import type { ICellRendererParams } from "ag-grid-community";
	import SettingsIcon from "@lucide/svelte/icons/settings-2";
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	let { dialogOpen = $bindable(), rowToEdit } = $props<{ dialogOpen: boolean; rowToEdit: any }>();

	function formatDMY(dateString: string): string {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${year}-${month}-${day}`;
	}
</script>

<Sheet.Root>
	<Sheet.Trigger class="w-full">
		<Button size={"sm"} variant={"ghost"}><SettingsIcon class="size-4" />Edit</Button>
	</Sheet.Trigger>
	<Sheet.Content class="max-h-[100vh] overflow-y-auto">
		<Sheet.Header>
			<Sheet.Title>{rowToEdit ? formatDMY(rowToEdit.createdAt) : ""}</Sheet.Title>
			<Sheet.Description>
				<form class="space-y-3 overflow-y-auto" method="POST" action="?/updateNutrients">
					<input type="hidden" name="id" value={rowToEdit?.id || ""} />
					<Card.Root class="bg-primary">
						<Card.Header class="pb-3">
							<Card.Title class="text-base">Health</Card.Title>
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

					<div class="flex flex-row gap-3">
						<Card.Root class="bg-primary flex-1">
							<Card.Header class="pb-3">
								<Card.Title class="text-base">Nutrients</Card.Title>
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
								<Card.Title class="text-base">Supplements</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="flex flex-col space-y-1">
									<div class="flex items-center space-x-2">
										<Checkbox
											id="cla"
											name="cla"
											checked={rowToEdit?.cla == "true" ? true : false}
										/>
										<Label for="cla" class="text-sm">CLA</Label>
									</div>
									<div class="flex items-center space-x-2">
										<Checkbox
											id="fatBurner"
											name="fatBurner"
											checked={rowToEdit?.fatBurner == "true" ? true : false}
										/>
										<Label for="fatBurner" class="text-sm">Fat Burner</Label>
									</div>
									<div class="flex items-center space-x-2">
										<Checkbox
											id="vitamin"
											name="vitamin"
											checked={rowToEdit?.multiVitamin == "true" ? true : false}
										/>
										<Label for="vitamin" class="text-sm">Vitamin</Label>
									</div>
									<div class="flex items-center space-x-2">
										<Checkbox
											id="apple"
											name="apple"
											checked={rowToEdit?.appleCider == "true" ? true : false}
										/>
										<Label for="apple" class="text-sm">Apple Cider</Label>
									</div>
									<div class="flex items-center space-x-2">
										<Checkbox
											id="magnesium"
											name="magnesium"
											checked={rowToEdit?.magnesium == "true" ? true : false}
										/>
										<Label for="magnesium" class="text-sm">Magnesium</Label>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</div>

					<Card.Root class="bg-primary">
						<Card.Header class="pb-3">
							<Card.Title class="text-base">Sleep</Card.Title>
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
					<Button class="mt-4" variant='sign' type="submit">Save</Button>
				</form>
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
