<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import Button from "$lib/components/ui/button/button.svelte";
	import Save from "@lucide/svelte/icons/save";
	import Crop from "@lucide/svelte/icons/crop";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import type { CropperSelection } from "@cropper/elements";
	import * as Cropper from "@eslym/svelte-cropperjs";
	import { toast } from "svelte-sonner";
	import { enhance } from "$app/forms";

	interface User {
		name: string;
		surname: string;
		email: string;
		image: string;
	}

	let { assignedUser = $bindable() }: { assignedUser: User } = $props();
	let updateLoading = $state(false);
	let fileInput = $state<HTMLInputElement>(null!);
	let cropper: CropperSelection = $state(null!);
	let imageSrc = $state<string | null>(null);
	let croppedImageUrl = $state<string | null>(null);
	let showCropper = $state<boolean>(false);
	let originalFileName = $state<string>("cropped-avatar.png");
	let formResult = $state<{ success?: boolean; error?: string } | null>(null);

	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file) {
			originalFileName = file.name;
			const reader = new FileReader();
			reader.onload = (e) => {
				imageSrc = e.target?.result as string;
				showCropper = true;
			};
			reader.readAsDataURL(file);
		}
	}

	async function handleCrop() {
		if (!cropper) return;

		const canvas = await cropper.$toCanvas({ width: 256, height: 256 });
		const blob = await new Promise<Blob>((resolve) =>
			canvas.toBlob((b) => resolve(b!), "image/png")
		);

		croppedImageUrl = URL.createObjectURL(blob);

		const file = new File([blob], originalFileName, { type: "image/png" });
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(file);

		showCropper = false;

		setTimeout(() => {
			if (fileInput) {
				fileInput.files = dataTransfer.files;
			}
		}, 0);
	}

	function cancelCrop() {
		showCropper = false;
		imageSrc = null;
		fileInput.value = "";
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class="cursor-pointer">Account</Dialog.Trigger>
	<Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} class="sm:max-w-[700px]">
		<Dialog.Header>
			<Dialog.Title>
				{#if showCropper}
					Crop Image
				{:else}
					Manage Account
				{/if}
			</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description>
			<form
				method="POST"
				action="/dashboard?/updateUser"
				enctype="multipart/form-data"
				use:enhance={() => {
					updateLoading = true;
					return async ({ result }) => {
						updateLoading = false;
						if (result.type === "success" && result.data) {
							formResult = result.data as { success?: boolean; error?: string };
							if (formResult.success) {
								toast.success("Successfully Updated");
							} else if (formResult.error) {
								toast.error(formResult.error);
							}
						}
					};
				}}
			>
				{#if showCropper && imageSrc}
					<div class="mb-4">
						<div class="grid grid-cols-[1fr_auto] gap-4">
							<Cropper.Canvas background class="h-96 w-full">
								<Cropper.Image
									src={imageSrc}
									alt="Selected Image"
									rotatable
									scalable
									translatable
								/>
								<Cropper.Shade />
								<Cropper.Handle action="move" plain />
								<Cropper.Selection
									id="selection"
									bind:element={cropper}
									aspect-ratio={1}
									initial-aspect-ratio={1}
									initial-coverage={0.8}
									movable
									resizable
								>
									<Cropper.Grid bordered covered />
									<Cropper.Crosshair centered themeColor="#0000FF80" />
									<Cropper.Handle action="move" plain />
									<Cropper.Handle action="n-resize" />
									<Cropper.Handle action="e-resize" />
									<Cropper.Handle action="s-resize" />
									<Cropper.Handle action="w-resize" />
									<Cropper.Handle action="ne-resize" />
									<Cropper.Handle action="nw-resize" />
									<Cropper.Handle action="se-resize" />
									<Cropper.Handle action="sw-resize" />
								</Cropper.Selection>
							</Cropper.Canvas>
							<div class="flex flex-col gap-2">
								<Cropper.Viewer selection="#selection" class="h-32 w-32 rounded-full border" />
							</div>
						</div>
						<div class="mt-4 flex gap-2">
							<Button type="button" onclick={handleCrop}><Crop />Apply Crop</Button>
							<Button type="button" variant="outline" onclick={cancelCrop}>Cancel</Button>
						</div>
					</div>
				{:else}
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
								onchange={handleFileSelect}
							/>

							<Tooltip.Provider delayDuration={100}>
								<Tooltip.Root>
									<Tooltip.Trigger>
										<Avatar.Root
											class="h-24 w-24 cursor-pointer"
											onclick={() => fileInput?.click()}
										>
											<Avatar.Image src={croppedImageUrl || assignedUser.image} alt={assignedUser.name} />
											<Avatar.Fallback>CN</Avatar.Fallback>
										</Avatar.Root>
									</Tooltip.Trigger>
									<Tooltip.Content side="top">
										<span>Change Image</span>
									</Tooltip.Content>
								</Tooltip.Root>
							</Tooltip.Provider>
						</div>

						<div class="w-full rounded-lg p-1">
							<Label for="name">Name</Label>
							<Input class="my-0" name="name" placeholder="Name" bind:value={assignedUser.name} />
							<Label for="name">Surname</Label>
							<Input class="my-0" name="surname" placeholder="Surname" bind:value={assignedUser.surname} />
							<Label class="my-0" for="email">Email</Label>
							<Input name="email" disabled={assignedUser.email === 'test@test.com'} placeholder="Email" type="email" bind:value={assignedUser.email} />
						</div>
					</div>
				{/if}

				<div class="mt-4 flex flex-row justify-end">
					{#if !updateLoading}
						<Button type="submit" variant={"save"}
							>{#if !showCropper}
								<Save />Save
							{/if}</Button
						>
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
	</Dialog.Content>
</Dialog.Root>
