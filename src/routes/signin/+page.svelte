<script lang="ts">
	import { authClient } from "$lib/auth-client";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { goto } from "$app/navigation";
	let email = "";
	let password = "";
	let error = "";
	let loading = false;

	async function handleSignIn() {
		error = "";
		try {
			loading = true;
			await authClient.signIn.email({
				email,
				password,
			});
			await goto("/dashboard");
		} catch (e) {
			error = "Sign in failed. Please check your credentials.";
		}
		loading = false;
	}
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="bg-secondary flex flex-col items-center gap-8 rounded-xl border p-10">
		<form class="flex w-72 flex-col gap-4" on:submit|preventDefault={handleSignIn}>
			<Input type="email" placeholder="Email" bind:value={email} required class="input" />
			<Input type="password" placeholder="Password" bind:value={password} required class="input" />
			{#if error}
				<div class="text-red-500">{error}</div>
			{/if}
			{#if !loading}
				<Button variant={"secondary"} type="submit" size="lg">Sign in</Button>
			{:else}
				<span>Loading</span>
			{/if}
		</form>
	</div>
</div>
