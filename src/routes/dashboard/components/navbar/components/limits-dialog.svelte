<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import Button from "$lib/components/ui/button/button.svelte";

	let { limits } = $props<{ limits: any }>();
</script>

<Dialog.Root>
	<Dialog.Trigger>Edit Limits</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Limits</Dialog.Title>
			<Dialog.Description>
				<form method="POST" action="/dashboard?/updateLimits">
					<Label for="caloriesLimit">Calories</Label>
					<Input
						name="caloriesLimit"
						placeholder="Calories"
						type={"number"}
						value={limits.caloriesLimit}
					/>

					<Label for="fatLimit">Fat</Label>
					<Input name="fatLimit" placeholder="Fat" type={"number"} value={limits.fatLimit} />

					<Label for="carbsLimit">Carbs</Label>
					<Input name="carbsLimit" placeholder="Carbs" type={"number"} value={limits.carbsLimit} />

					<Label for="proteinLimit">Protein</Label>
					<Input
						name="proteinLimit"
						placeholder="Carbs"
						type={"number"}
						value={limits.proteinLimit}
					/>

					<Label for="sugarLimit">Sugar</Label>
					<Input name="sugarLimit" placeholder="Carbs" type={"number"} value={limits.sugarLimit} />

					<Label for="waterLimit">Water</Label>
					<Input name="waterLimit" placeholder="Water" type={"number"} value={limits.waterLimit} />

					<Label for="stepsLimit">Steps</Label>
					<Input name="stepsLimit" placeholder="Steps" type={"number"} value={limits.stepsLimit} />
					<div class="flex flex-row justify-center">
						<Button type="submit" variant='sign'>Save</Button>
					</div>
				</form>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
