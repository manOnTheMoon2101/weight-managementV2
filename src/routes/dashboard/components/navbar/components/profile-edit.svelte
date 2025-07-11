<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	export let user: any;
</script>

<Dialog.Root>
	<Dialog.Trigger>Edit Profile</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Profile</Dialog.Title>
			<Dialog.Description>
				<form>
					<Label for="name">Name</Label>
					<Input placeholder="Name" value={user.name} />
					<Label for="email">Email</Label>
					<Input placeholder="Email" type="email" value={user.email} />

					<div class="flex flex-row justify-center">
						<Button>Save</Button>
					</div>
				</form>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
