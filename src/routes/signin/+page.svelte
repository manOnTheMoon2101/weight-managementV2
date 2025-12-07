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
		loading = true;
		error = "";

		await authClient.signIn.email({
			email,
			password,
			fetchOptions:{
				onSuccess: async () => {
				await goto("/dashboard");
			},
			onError: (ctx) => {
				error = "Wrong Password or Email";
				loading = false;
			},
			}
		});
	}
</script>

<div class="bg-background flex min-h-screen items-center justify-center p-4">
	<div
		class="bg-primary flex w-full max-w-md flex-col items-center gap-8 rounded-2xl border p-10 shadow-xl"
	>
		<!-- Welcome Header -->
		<div class="space-y-2 text-center">
			<h1 class="text-foreground text-3xl font-bold">Welcome</h1>
			<p class="text-foreground">Sign in to your account to continue</p>
		</div>

		<!-- Sign In Form -->
		<form class="flex w-full flex-col gap-6" on:submit|preventDefault={handleSignIn}>
			<div class="space-y-4">
				<div class="space-y-2">
					<label for="email" class="text-sm font-medium ">Email</label>
					<Input
						id="email"
						type="email"
						placeholder="Enter your email"
						bind:value={email}
						required
						class="w-full"
					/>
				</div>

				<div class="space-y-2">
					<label for="password" class="text-sm font-medium ">Password</label>
					<Input
						id="password"
						type="password"
						placeholder="Enter your password"
						bind:value={password}
						required
						class="w-full"
					/>
				</div>
			</div>

			{#if error}
				<div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{error}
				</div>
			{/if}

			{#if !loading}
				<Button variant="sign" type="submit" size="lg" class="w-full">Sign In</Button>
			{:else}
				<div class="text-foreground flex items-center justify-center space-x-2">
					<div class="border-accent h-5 w-5 animate-spin rounded-full border-b-2"></div>
					<span>Signing in...</span>
				</div>
			{/if}
		</form>

		<!-- Footer -->
		<div class="text-foreground text-center text-sm">
			<p>
				Don't have an account?
				<a href="/signup" class="text-accent hover:text-accent/80 font-medium">Sign up</a>
			</p>
		</div>
	</div>
</div>
