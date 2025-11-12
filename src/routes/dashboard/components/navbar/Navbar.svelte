<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import LogoutDialog from "./components/logout-dialog.svelte";
	import EditDialog from "./components/profile-edit.svelte";
	import { Button } from "$lib/components/ui/button";
	import LimitsDialog from "./components/limits-dialog.svelte";
	import { page } from "$app/state";
	import Manage from "@lucide/svelte/icons/chart-no-axes-column"
	import TableProperties from "@lucide/svelte/icons/table-properties";
	import LayoutDashboard from "@lucide/svelte/icons/layout-dashboard";
	import Calculator from "@lucide/svelte/icons/calculator"
	import Toggler from "../navbar/components/toggler.svelte"
	let {
		user,
		userColour,
		userJourney,
		limits,
	}: {
		user: any[];
		userColour: any;
		userJourney: any,
		limits: any[];
	} = $props();

	const parsedUser = $derived(typeof user === "string" ? JSON.parse(user) : user);
	const firstLetter = $derived(parsedUser?.name?.charAt(0));
</script>

<div class="border-b-accent border-b">
	<div class="flex flex-row items-center justify-between">
		<div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="cursor-pointer">
					<div class="my-1 flex flex-row items-center  rounded-lg p-1 ">
						<Avatar.Root class="mr-2">
							<Avatar.Image src={parsedUser.image} alt="User Image" />
							<Avatar.Fallback style="background-color: {userColour}"
								>{firstLetter ?? "?"}</Avatar.Fallback
							>
						</Avatar.Root>
						<div class="flex flex-col justify-center items-start ">
							<h3 class="text-lg">{parsedUser.name}</h3>
						<h4 class="text-slate-600 text-sm">{parsedUser.email}</h4>
						</div>
					</div></DropdownMenu.Trigger
				>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label class="flex items-center"><Manage class="mr-1"/>Manage</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item closeOnSelect={false}
							><EditDialog {user} {userColour} /></DropdownMenu.Item
						>
						<DropdownMenu.Item closeOnSelect={false}><LimitsDialog {limits} {userJourney} /></DropdownMenu.Item>

						<DropdownMenu.Item closeOnSelect={false}><LogoutDialog /></DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div class="flex flex-row items-center">
			<Toggler />
			<Button
				href="/dashboard"
				variant={"navbar"}
				class={page.url.pathname !== "/dashboard" ? "bg-secondary mx-2" : "mx-2"}><LayoutDashboard/>Dashboard</Button
			>
			<Button
				href="/dashboard/table"
				variant={"navbar"}
				class={page.url.pathname !== "/dashboard/table" ? "bg-secondary mx-2" : "mx-2"}><TableProperties/>Table</Button
			>
			<Button
				disabled
				variant={"navbar"}
				class={page.url.pathname !== "/dashboard/table" ? "bg-secondary mx-2" : "mx-2"}><Calculator/>Nutrition AI(Soon)</Button
			>
		</div>
	</div>
</div>
