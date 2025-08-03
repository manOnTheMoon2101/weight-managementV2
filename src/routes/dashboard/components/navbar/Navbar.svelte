<script lang="ts">
	import Toggler from "./components/toggler.svelte";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import LogoutDialog from "./components/logout-dialog.svelte";
	import EditDialog from "./components/profile-edit.svelte";
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { Button } from "$lib/components/ui/button";
	import LimitsDialog from "./components/nutrients-dialog.svelte"
	import { onMount } from "svelte";
	export let user: any;
	export let limits: any

	$: user = typeof user === "string" ? JSON.parse(user) : user;
	$: firstLetter = user?.name?.charAt(0);


</script>

<div class="border-b border-b-orange-300 ">
	<div class="flex flex-row justify-between items-center">
		<div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<div class="flex flex-row items-center my-1">
						<Avatar.Root class="mr-2">
							<Avatar.Fallback class="bg-amber-600">{firstLetter ?? "?"}</Avatar.Fallback>
						</Avatar.Root>
						<span>{user.name}</span>
					</div></DropdownMenu.Trigger
				>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item closeOnSelect={false}><EditDialog {user} /></DropdownMenu.Item>
						<DropdownMenu.Item  closeOnSelect={false}><LimitsDialog {limits} /></DropdownMenu.Item>
						<DropdownMenu.Item closeOnSelect={false}><LogoutDialog /></DropdownMenu.Item>
						<DropdownMenu.Item closeOnSelect={false} class="flex flex-row justify-center"
							><Toggler /></DropdownMenu.Item
						>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div>
			<Button href="/dashboard">Dashboard</Button>
		<Button href="/dashboard/table">Table</Button>
		</div>
	</div>
</div>
