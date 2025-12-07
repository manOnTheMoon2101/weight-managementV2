<script lang="ts">
	import { authClient } from "$lib/auth-client";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { goto } from "$app/navigation";
	let email = "";
	let password = "";
	let name = "";
	let error = "";
	let loading = false;

	async function handleSignUp() {
		error = "";
		loading = true;

		try {
			const result = await authClient.signUp.email({
				name,
				email,
				password,
				
			});
			await goto("/dashboard");
			if (result?.error) {
				error = result.error.message || "Sign up failed. Please try again.";
				return;
			}

			if (!result?.data) {
				error = "Sign up failed. Please try again.";
				return;
			}
		} catch (e: any) {
			console.error("Sign up error:", e);
			if (e?.response?.data?.error) {
				error = e.response.data.error.message || e.response.data.error;
			} else if (e?.message) {
				error = e.message;
			} else if (typeof e === "string") {
				error = e;
			} else {
				error = "Sign up failed. Please try again.";
			}
		} finally {
			loading = false;
		}
	}
</script>

<div class="bg-background flex min-h-screen items-center justify-center p-4">
	<div
		class="bg-primary flex w-full max-w-md flex-col items-center gap-8 rounded-2xl border p-10 shadow-xl"
	>
		<div class="space-y-2 text-center">
			<h1 class="text-foreground text-3xl font-bold">Join Us</h1>
			<p class="text-foreground">Create your account to get started</p>
		</div>

		<form class="flex w-full flex-col gap-6" on:submit|preventDefault={handleSignUp}>
			<div class="space-y-4">
				<div class="space-y-2">
					<label for="name" class="text-sm font-medium ">Full Name</label>
					<Input
						id="name"
						type="text"
						placeholder="Enter your full name"
						bind:value={name}
						required
						disabled={loading}
						class="w-full"
					/>
				</div>

				<div class="space-y-2">
					<label for="email" class="text-sm font-medium ">Email</label>
					<Input
						id="email"
						type="email"
						placeholder="Enter your email"
						bind:value={email}
						required
						disabled={loading}
						class="w-full"
					/>
				</div>

				<div class="space-y-2">
					<label for="password" class="text-sm font-medium ">Password</label>
					<Input
						id="password"
						type="password"
						placeholder="Create a password"
						bind:value={password}
						required
						disabled={loading}
						class="w-full"
					/>
				</div>
			</div>

			{#if error}
				<div class="bg-destructive rounded-lg px-4 py-3 text-sm text-white">
					{error}
				</div>
			{/if}

			{#if !loading}
				<Button
					disabled={!email || !password || !name}
					type="submit"
					size="lg"
					class="w-full"
					variant="sign"
				>
					Create Account
				</Button>
			{:else}
				<Button type="button" size="lg" class="w-full" disabled>
					<div class="text-foreground flex items-center justify-center space-x-2">
						<div class="border-accent h-5 w-5 animate-spin rounded-full border-b-2"></div>
						<span>Creating account...</span>
					</div>
				</Button>
			{/if}
		</form>

		<div class="text-foreground text-center text-sm">
			<p>
				Already have an account?
				<a href="/signin" class="text-accent hover:text-accent/80 font-medium">Sign in</a>
			</p>
		</div>
	</div>
</div>
