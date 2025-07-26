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
					<div class="flex flex-row">
						<Card.Root class="bg-card">
							<Card.Header>
								<Card.Title>Health</Card.Title>
							</Card.Header>
							<Card.Content>
								<Label for="weight">Weight</Label>
								<Input name="weight" placeholder="Weight" value={rowToEdit?.weight || ""} />
							</Card.Content>
						</Card.Root>

						<Card.Root class="bg-card">
							<Card.Header>
								<Card.Title>Supplements</Card.Title>
							</Card.Header>
							<Card.Content>
								<Label for="cla">Cla</Label>
								<Input name="cla" placeholder="CLA" value={rowToEdit?.cla || ""} />
							</Card.Content>
						</Card.Root>
						<Card.Root class="bg-card">
							<Card.Header>
								<Card.Title>Nutrients</Card.Title>
							</Card.Header>
							<Card.Content>
								<Label for="protein">Protein</Label>
								<Input name="protein" placeholder="Protein" value={rowToEdit?.protein || ""} />
							</Card.Content>
						</Card.Root>
					</div>

					<div>
						<Card.Root class="bg-card">
							<Card.Header>
								<Card.Title>Nutrients</Card.Title>
							</Card.Header>
							<Card.Content>
                                <Checkbox id="cla" checked={rowToEdit?.cla || false}  />
                                <Label for="cla">CLA</Label>

                                <Checkbox id="fatBurner" checked={rowToEdit?.fatBurner || false} />
                                <Label for="fatBurner">Fat Burner</Label>
                            </Card.Content>
						</Card.Root>
					</div>
				</form>
			</Dialog.Description>
		</Dialog.Header>
		<Button class="bg-accent" onclick={() => (dialogOpen = false)}>Save</Button>
	</Dialog.Content>
</Dialog.Root>
