<script lang="ts">
	import Toggler from "./components/toggler.svelte";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import LogoutDialog from "./components/logout-dialog.svelte";
	import EditDialog from "./components/profile-edit.svelte";
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { Button } from "$lib/components/ui/button";
	import LimitsDialog from "./components/nutrients-dialog.svelte";

	import { onMount } from "svelte";

	let {
		user,
		limits,
	}: {
		user: any[];
		limits: any[];
	} = $props();

	const parsedUser = $derived(typeof user === "string" ? JSON.parse(user) : user);
	const firstLetter = $derived(parsedUser?.name?.charAt(0));

	$inspect(user);
</script>

<div class="border-b border-b-orange-300">
	<div class="flex flex-row items-center justify-between">
		<div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<div class="my-1 flex flex-row items-center">
						<Avatar.Root class="mr-2">
							<Avatar.Fallback class="bg-[#34d399]">{firstLetter ?? "?"}</Avatar.Fallback>
						</Avatar.Root>
						<span>{parsedUser.name}</span>
					</div></DropdownMenu.Trigger
				>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item closeOnSelect={false}><EditDialog {user} /></DropdownMenu.Item>
						<DropdownMenu.Item closeOnSelect={false}><LimitsDialog {limits} /></DropdownMenu.Item>
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
