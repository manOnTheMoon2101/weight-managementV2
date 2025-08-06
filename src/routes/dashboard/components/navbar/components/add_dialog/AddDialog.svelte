<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	import SettingsIcon from "@lucide/svelte/icons/settings-2";
	import * as Sheet from "$lib/components/ui/sheet/index.js";
	let { dialogOpen = $bindable() } = $props<{ dialogOpen: boolean }>();
</script>

<Sheet.Root>
	<Sheet.Trigger>
		<Button>Add</Button>
	</Sheet.Trigger>
	<Sheet.Content class="max-h-[100vh] ">
		<Sheet.Header>
			<Sheet.Title>Add New Data</Sheet.Title>
			<Sheet.Description>
				<form class="space-y-3 overflow-y-auto">
					<Card.Root class="bg-card">
						<Card.Header class="pb-3">
							<Card.Title class="text-base">Health</Card.Title>
						</Card.Header>
						<Card.Content class="space-y-2">
							<div>
								<Label for="weight" class="text-sm">Weight</Label>
								<Input name="weight" placeholder="Weight" class="h-8" />
							</div>
							<div>
								<Label for="steps" class="text-sm">Steps</Label>
								<Input name="steps" placeholder="Steps" class="h-8" />
							</div>
							<div>
								<Label for="water" class="text-sm">Water</Label>
								<Input name="water" placeholder="Water" class="h-8" />
							</div>
						</Card.Content>
					</Card.Root>

					<div class="flex flex-row gap-3">
						<Card.Root class="bg-card flex-1">
							<Card.Header class="pb-3">
								<Card.Title class="text-base">Nutrients</Card.Title>
							</Card.Header>
							<Card.Content class="space-y-2">
								<div>
									<Label for="calories" class="text-sm">Calories</Label>
									<Input name="calories" placeholder="Calories" class="h-8" />
								</div>
								<div>
									<Label for="protein" class="text-sm">Protein</Label>
									<Input name="protein" placeholder="Protein" class="h-8" />
								</div>
								<div>
									<Label for="fat" class="text-sm">Fat</Label>
									<Input name="fat" placeholder="Fat" class="h-8" />
								</div>
								<div>
									<Label for="sugar" class="text-sm">Sugar</Label>
									<Input name="sugar" placeholder="Sugar" class="h-8" />
								</div>
								<div>
									<Label for="carbs" class="text-sm">Carbs</Label>
									<Input name="carbs" placeholder="Carbs" class="h-8" />
								</div>
							</Card.Content>
						</Card.Root>

						<Card.Root class="bg-card flex-1">
							<Card.Header class="pb-3">
								<Card.Title class="text-base">Supplements</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="flex flex-col space-y-1">
									<div class="flex items-center space-x-2">
										<Checkbox id="cla" />
										<Label for="cla" class="text-sm">CLA</Label>
									</div>
									<div class="flex items-center space-x-2">
										<Checkbox id="fatBurner" />
										<Label for="fatBurner" class="text-sm">Fat Burner</Label>
									</div>
									<div class="flex items-center space-x-2">
										<Checkbox id="vitamin" />
										<Label for="vitamin" class="text-sm">Vitamin</Label>
									</div>
									<div class="flex items-center space-x-2">
										<Checkbox id="apple" />
										<Label for="apple" class="text-sm">Apple Cider</Label>
									</div>
									<div class="flex items-center space-x-2">
										<Checkbox id="magnesium" />
										<Label for="magnesium" class="text-sm">Magnesium</Label>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</div>

					<Card.Root class="bg-card">
						<Card.Header class="pb-3">
							<Card.Title class="text-base">Sleep</Card.Title>
						</Card.Header>
						<Card.Content>
							<div>
								<Label for="score" class="text-sm">Score</Label>
								<Input name="score" placeholder="Sleep Score" class="h-8" />
							</div>
						</Card.Content>
					</Card.Root>
				</form>
			</Sheet.Description>
		</Sheet.Header>
		<Button class="bg-accent mt-4" onclick={() => (dialogOpen = false)}>Save</Button>
	</Sheet.Content>
</Sheet.Root>
