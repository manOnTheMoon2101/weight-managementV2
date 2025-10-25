<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import ColorPicker, { ChromeVariant } from "svelte-awesome-color-picker";
	import { enhance } from "$app/forms";
	let { user, userColour }: { user: any; userColour: string } = $props();
	let updateLoading = $state(false);
	let hex = $state(userColour || "#fbbf24");
	let fileInput: HTMLInputElement;

	function handleUpdateSubmit() {
		updateLoading = true;
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class="cursor-pointer">Edit Profile</Dialog.Trigger>
	<Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()}>
		<Dialog.Header>
			<Dialog.Title>Edit Profile</Dialog.Title>
			<Dialog.Description>
				<form
					method="POST"
					action="/dashboard?/updateUser"
					enctype="multipart/form-data"
					onsubmit={handleUpdateSubmit}
				>
					<!-- <div>
                        <Label for="color">Colour</Label>
						{hex}
                        <ColorPicker bind:hex components={ChromeVariant} sliderDirection="horizontal" />
                        <input type="hidden" name="userColour" bind:value={hex} />
                    </div> -->

					<div class="flex flex-row items-center justify-between">
						<div
							class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
						>
							<input
								type="file"
								name="file"
								bind:this={fileInput}
								class="hidden"
								accept="image/*"
							/>

							<Avatar.Root class="h-24 w-24 cursor-pointer" onclick={() => fileInput?.click()}>
								<Avatar.Image src={user.image} alt={user.name} />
								<Avatar.Fallback>CN</Avatar.Fallback>
							</Avatar.Root>
						</div>

						<div class="w-full">
							<Label for="name">Name</Label>
							<Input class="my-0" name="name" placeholder="Name" value={user.name} />
							<Label class="my-0" for="email">Email</Label>
							<Input name="email" placeholder="Email" type="email" value={user.email} />
						</div>
					</div>

					<div class="mt-4 flex flex-row justify-end">
						{#if !updateLoading}
							<Button type="submit" variant={"save"}>Save</Button>
						{:else}
							<Button type="submit" variant={"save"} disabled>
								<div class="flex items-center justify-center space-x-2">
									<div class="border-accent h-4 w-4 animate-spin rounded-full border-b-2"></div>
									<span>Saving...</span>
								</div>
							</Button>
						{/if}
					</div>
				</form>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
