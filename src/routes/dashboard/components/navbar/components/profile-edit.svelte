<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
    
    let { user }: { user: any } = $props();
    
    let hex = "#fbbf24";

</script>

<Dialog.Root>
    <Dialog.Trigger>Edit Profile</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Edit Profile</Dialog.Title>
            <Dialog.Description>
                <form method="POST" action="/dashboard?/updateUser">
                  <div>
					<Label for="color">Colour</Label>
					<ColorPicker 
					bind:hex 
					components={ChromeVariant} 
					sliderDirection="horizontal" 
				/>
				

				<input type="hidden" name="color" bind:value={hex} />
				  </div>
                    <Label for="name">Name                     {user.colour}</Label>
                    <Input name="name" placeholder="Name" value={user.name} />
                    
                    <Label for="email">Email</Label>
                    <Input name="email" placeholder="Email" type="email" value={user.email} />
                    
                    <div class="flex flex-row justify-center">
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </Dialog.Description>
        </Dialog.Header>
    </Dialog.Content>
</Dialog.Root>