<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	export let dialogOpen: boolean;
	export let rowToEdit: any;

	function formatDMY(dateString: string): string {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${year}-${month}-${day}`;
	}
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{rowToEdit ? formatDMY(rowToEdit.createdAt) : ""}</Dialog.Title>
			<Dialog.Description>
				<form>
					<Card.Root class="bg-card">
						<Card.Header>
							<Card.Title>Health</Card.Title>
						</Card.Header>
						<Card.Content>
							<Label for="weight">Weight</Label>
							<Input name="weight" placeholder="Weight" value={rowToEdit?.weight || ""} />

							<Label for="steps">Steps</Label>
							<Input name="steps" placeholder="Steps" value={rowToEdit?.steps || ""} />

							<Label for="water">Water</Label>
							<Input name="water" placeholder="Water" value={rowToEdit?.water || ""} />
						</Card.Content>
					</Card.Root>
					<div class="flex flex-row">
						<Card.Root class="bg-card">
							<Card.Header>
								<Card.Title>Nutrients</Card.Title>
							</Card.Header>
							<Card.Content>
								<Label for="protein">Protein</Label>
								<Input name="protein" placeholder="Protein" value={rowToEdit?.protein || ""} />
								<Label for="fat">Fat</Label>
								<Input name="fat" placeholder="Protein" value={rowToEdit?.fat || ""} />

								<Label for="sugar">Sugar</Label>
								<Input name="sugar" placeholder="Sugar" value={rowToEdit?.sugar || ""} />

								<Label for="carbs">Carbs</Label>
								<Input name="carbs" placeholder="Carbs" value={rowToEdit?.carbs || ""} />
							</Card.Content>
						</Card.Root>
						<Card.Root class="bg-card">
							<Card.Header>
								<Card.Title>Supplements</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="flex flex-col">
									<div class="my-2">
										<Checkbox id="cla" checked={rowToEdit?.cla == "true" ? true : false} />
										<Label for="cla">CLA</Label>
									</div>

									<div class="my-2">
										<Checkbox
											id="fatBurner"
											checked={rowToEdit?.fatBurner == "true" ? true : false}
										/>
										<Label for="fatBurner">Fat Burner</Label>
									</div>

									<div class="my-2">
										<Checkbox
											id="vitamin"
											checked={rowToEdit?.multiVitamin == "true" ? true : false}
										/>
										<Label for="vitamin">Vitamin</Label>
									</div>

									<div class="my-2">
										<Checkbox id="apple" checked={rowToEdit?.appleCider == "true" ? true : false} />
										<Label for="apple">Apple Cider</Label>
									</div>

									<div class="my-2">
										<Checkbox
											id="magneisum"
											checked={rowToEdit?.magneisum == "true" ? true : false}
										/>
										<Label for="magnesium">Magnesium</Label>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</div>

					<div>
						<Card.Root class="bg-card">
							<Card.Header>
								<Card.Title>Sleep</Card.Title>
							</Card.Header>
							<Card.Content>
								<Label for="score">Score</Label>
								<Input name="score" placeholder="Sleep Score" value={rowToEdit?.score || ""} />
							</Card.Content>
						</Card.Root>
					</div>
				</form>
			</Dialog.Description>
		</Dialog.Header>
		<Button class="bg-accent" onclick={() => (dialogOpen = false)}>Save</Button>
	</Dialog.Content>
</Dialog.Root>
