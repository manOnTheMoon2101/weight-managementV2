<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	export let limits: any;
</script>

<Dialog.Root>
	<Dialog.Trigger>Edit Limits</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Limits</Dialog.Title>
			<Dialog.Description>
				<form method="POST" action="/dashboard?/updateLimits">
					<Label for="caloriesLimit">Calories</Label>
					<Input name="caloriesLimit" placeholder="Calories" type={'number'} value={limits.caloriesLimit} />

                    <Label for="fatLimit">Fat</Label>
					<Input name="fatLimit" placeholder="Fat" type={'number'} value={limits.fatLimit} />

                    <Label for="carbsLimit">Carbs</Label>
					<Input name="carbsLimit" placeholder="Carbs" type={'number'} value={limits.carbsLimit} />

                    <Label for="proteinLimit">Protein</Label>
					<Input name="proteinLimit" placeholder="Carbs" type={'number'} value={limits.proteinLimit} />

                    <Label for="sugarLimit">Sugar</Label>
					<Input name="sugarLimit" placeholder="Carbs" type={'number'} value={limits.sugarLimit} />

					<div class="flex flex-row justify-center">
						<Button type="submit">Save</Button>
					</div>
				</form>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
