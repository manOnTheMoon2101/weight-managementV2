<script lang="ts">
	import { authClient } from "$lib/auth-client";
	import { Button } from "$lib/components/ui/button";
	let email = "";
	let password = "";
	let name = "";
	let error = "";

	async function handleSignUp() {
		error = "";
		try {
			await authClient.signUp.email({
				name,
				email,
				password,
                callbackURL:'/dashboard'
			});
			// Optionally redirect or show success
		} catch (e) {
			error = "Sign up failed. Please try again.";
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="flex flex-col items-center gap-8 rounded-xl border bg-card p-10">

		<form class="flex flex-col gap-4 w-72" on:submit|preventDefault={handleSignUp}>
			<input
				type="text"
				placeholder="Name"
				bind:value={name}
				required
				class="input"
			/>
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
			<Button type="submit" size="lg">Sign up</Button>
		</form>
	</div>
</div> 