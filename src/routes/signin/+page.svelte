<script lang="ts">
	import { authClient } from "$lib/auth-client";
	import { Button } from "$lib/components/ui/button";
	let email = "";
	let password = "";
	let error = "";

	async function handleSignIn() {
		error = "";
		try {
			await authClient.signIn.email({
				email,
				password,
				// callbackURL: data.redirectPath // Uncomment if you want to redirect after sign-in
			});
			// Optionally redirect or show success
		} catch (e) {
			error = "Sign in failed. Please check your credentials.";
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="flex flex-col items-center gap-8 rounded-xl border bg-card p-10">
		Logo here
		<form class="flex flex-col gap-4 w-72" on:submit|preventDefault={handleSignIn}>
			<input
				type="email"
				placeholder="Email"
				bind:value={email}
				required
				class="input"
			/>
			<input
				type="password"
				placeholder="Password"
				bind:value={password}
				required
				class="input"
			/>
			{#if error}
				<div class="text-red-500">{error}</div>
			{/if}
			<Button type="submit" size="lg">Sign in</Button>
		</form>
	</div>
</div>
