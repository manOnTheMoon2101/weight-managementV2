<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import ColorPicker, { ChromeVariant } from "svelte-awesome-color-picker";
    import { enhance } from '$app/forms';
    let { user, userColour }: { user: any; userColour: string } = $props();
    let hex = $state(userColour || "#fbbf24");
</script>

<Dialog.Root>
    <Dialog.Trigger class="cursor-pointer">Edit Profile</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Edit Profile</Dialog.Title>
            <Dialog.Description>
                <form   method="POST" action="/dashboard?/updateUser" enctype="multipart/form-data">
                    <!-- <div>
                        <Label for="color">Colour</Label>
						{hex}
                        <ColorPicker bind:hex components={ChromeVariant} sliderDirection="horizontal" />
                        <input type="hidden" name="userColour" bind:value={hex} />
                    </div> -->
                    <Label for="file">Upload Image</Label>
                    <Input type="file" name="file" placeholder="Upload Image"/>
                    <!-- <button>Upload</button> -->
                    <Label for="name">Name</Label>
                    <Input name="name" placeholder="Name" value={user.name} />
                    <Label for="email">Email</Label>
                    <Input name="email" placeholder="Email" type="email" value={user.email} />
                    <div class="flex flex-row justify-center">
                        <Button type="submit" variant={'sign'}>Save</Button>
                    </div>
                </form>
            </Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>