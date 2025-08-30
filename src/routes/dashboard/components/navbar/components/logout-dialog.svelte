<script lang="ts">
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { Button } from "$lib/components/ui/button";
	import X from "@lucide/svelte/icons/x";
	import { goto } from "$app/navigation";
	import { authClient } from "$lib/auth-client";

	async function handleSignOut() {
		try {
			authClient.signOut();
			await goto("/");
		} catch (e) {
			console.log(e);
		}
	}
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger
  class='w-full'
		><div class="flex flex-row justify-center ">
			<Button variant="logout">Logout</Button>
		</div></AlertDialog.Trigger
	>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<div class="flex flex-row items-center justify-between">
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Cancel class="text-red-800 hover:bg-red-800/40"><X /></AlertDialog.Cancel>
			</div>
			<!-- <AlertDialog.Description>
       This action cannot be undone. This will permanently delete your account
       and remove your data from our servers.
      </AlertDialog.Description> -->
		</AlertDialog.Header>
		<div class="flex flex-row justify-center">
			<AlertDialog.Footer>
				<Button
					type="button"
					onclick={() => handleSignOut()}
					class="w-fit"
					variant="destructive"
					size="lg">Sign out</Button
				>
			</AlertDialog.Footer>
		</div>
	</AlertDialog.Content>
</AlertDialog.Root>
