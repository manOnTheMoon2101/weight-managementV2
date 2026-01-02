<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import LogoutDialog from "./components/Menu/Logout/logout-dialog.svelte";
	import EditDialog from "./components/Menu/Manage_Account/ManageAccount.svelte";
	import { Button } from "$lib/components/ui/button";
	import LimitsDialog from "./components/Menu/Preferences/Preferences.svelte";
	import { page } from "$app/state";
	import Manage from "@lucide/svelte/icons/settings";
	import TableProperties from "@lucide/svelte/icons/table-properties";
	import LayoutDashboard from "@lucide/svelte/icons/layout-dashboard";
	import Calculator from "@lucide/svelte/icons/calculator";
	import Menu from "@lucide/svelte/icons/menu";
	import Toggler from "./components/Theme_Toggler/Toggler.svelte";

	interface Limits {
		caloriesLimit: number | null;
		carbsLimit: number | null;
		stepsLimit: number | null;
		waterLimit: number | null;
		sugarLimit: number | null;
		proteinLimit: number | null;
	}

	interface User {
		name: string;
		surname: string;
		email: string;
		image: string;
	}

	interface Supplements {
		name: string;
		color: string;
		type: string;
		id: number;
	}

	let {
		user,
		userColour,
		userSupplements,
		userJourney,
		limits,
	}: {
		user: User;
		userColour: string;
		userSupplements: Supplements;
		userJourney: string;
		limits: Limits;
	} = $props();

	// svelte-ignore state_referenced_locally
	let assignedUser = $state(user);

	const firstLetter = $derived(user?.name?.charAt(0));
</script>

<div class="border-b-accent border-b">
	<div class="flex flex-row items-center justify-between">
		<div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="cursor-pointer">
					<div class="my-1 flex flex-row items-center rounded-lg p-1">
						<Avatar.Root class="mr-2">
							<Avatar.Image src={user.image} alt="User Image" />
							<Avatar.Fallback style="background-color: {userColour}"
								>{firstLetter ?? "?"}</Avatar.Fallback
							>
						</Avatar.Root>
						<div class="flex flex-col items-start justify-center">
							<h3 class="text-lg">{assignedUser.name}</h3>
							<h4 class="text-sm text-slate-600">{assignedUser.email}</h4>
						</div>
					</div></DropdownMenu.Trigger
				>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label class="flex items-center"
							><Manage class="mr-1" />Settings</DropdownMenu.Label
						>
						<DropdownMenu.Separator />
						<DropdownMenu.Item closeOnSelect={false}
							><EditDialog bind:assignedUser /></DropdownMenu.Item
						>
						<DropdownMenu.Item closeOnSelect={false}
							><LimitsDialog {limits} {userJourney} {userSupplements} /></DropdownMenu.Item
						>

						<DropdownMenu.Item closeOnSelect={false}><LogoutDialog /></DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div class="flex flex-row items-center">
			<Toggler />
			<!-- Desktop Navigation -->
			<div class="hidden flex-row items-center md:flex">
				<Button
					href="/dashboard"
					variant={"navbar"}
					class={page.url.pathname !== "/dashboard" ? "bg-secondary mx-2" : "mx-2"}
					><LayoutDashboard />Dashboard</Button
				>
				<Button
					href="/dashboard/table"
					variant={"navbar"}
					class={page.url.pathname !== "/dashboard/table" ? "bg-secondary mx-2" : "mx-2"}
					><TableProperties />Table</Button
				>
				<Button
					href="/dashboard/ai"
					variant={"navbar"}
					class={page.url.pathname !== "/dashboard/ai" ? "bg-secondary mx-2" : "mx-2"}
					><Calculator />Nutrition AI(Coming 2026)</Button
				>
			</div>
			<!-- Mobile Navigation Dropdown -->
			<div class="md:hidden">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button variant="navbar" size="icon" class="mx-2">
							<Menu />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Group>
							<DropdownMenu.Item
								class="cursor-pointer"
								onclick={() => (window.location.href = "/dashboard")}
							>
								<LayoutDashboard class="mr-2 h-4 w-4" />
								Dashboard
							</DropdownMenu.Item>
							<DropdownMenu.Item
								class="cursor-pointer"
								onclick={() => (window.location.href = "/dashboard/table")}
							>
								<TableProperties class="mr-2 h-4 w-4" />
								Table
							</DropdownMenu.Item>
							<DropdownMenu.Item
								class="cursor-not-allowed"
								onclick={() => (window.location.href = "/dashboard/ai")}
							>
								<Calculator class="mr-2 h-4 w-4" />
								Nutrition AI (Soon)
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
	</div>
</div>
