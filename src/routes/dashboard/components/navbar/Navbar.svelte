<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import LogoutDialog from "./components/logout-dialog.svelte";
	import EditDialog from "./components/profile-edit.svelte";
	import { Button } from "$lib/components/ui/button";
	import LimitsDialog from "./components/limits-dialog.svelte";

	let {
		user,
		userColour,
		limits,
	}: {
		user: any[];
		userColour:any
		limits: any[];
	} = $props();

	const parsedUser = $derived(typeof user === "string" ? JSON.parse(user) : user);
	const firstLetter = $derived(parsedUser?.name?.charAt(0));
</script>

<div class="border-b border-b-accent">
	<div class="flex flex-row items-center justify-between">
		<div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<div class="my-1 flex flex-row items-center">
						<Avatar.Root class="mr-2">
							<Avatar.Image src={parsedUser.image} alt="User Image" />
							<Avatar.Fallback  style="background-color: {userColour}">{firstLetter ?? "?"}</Avatar.Fallback>
						</Avatar.Root>
						<span>{parsedUser.name}</span>
					</div></DropdownMenu.Trigger
				>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item closeOnSelect={false}><EditDialog {user} {userColour} /></DropdownMenu.Item>
						<DropdownMenu.Item closeOnSelect={false}><LimitsDialog {limits} /></DropdownMenu.Item>
					
			
				
						
						<DropdownMenu.Item closeOnSelect={false}><LogoutDialog /></DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div>
			<Button href="/dashboard" variant={'navbar'}>Dashboard</Button>
			<Button href="/dashboard/table" variant={'navbar'}>Table</Button>
		</div>
	</div>
</div>
