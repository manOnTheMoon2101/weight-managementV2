<script lang="ts">
	import { authClient } from "$lib/auth-client";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	let email = "";
	let password = "";
	let name = "";
	let error = "";
	let loading = false;

	async function handleSignUp() {
		error = "";
		try {
			loading = true;
			await authClient.signUp.email({
				name,
				email,
				password,
                callbackURL:'/dashboard'
			});
		} catch (e) {
			error = "Sign up failed. Please try again.";
		}
		loading = false;
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-background p-4">
	<div class="bg-primary flex flex-col items-center gap-8 rounded-2xl border shadow-xl p-10 max-w-md w-full">
		<!-- Welcome Header -->
		<div class="text-center space-y-2">
			<h1 class="text-3xl font-bold text-foreground">Join Us</h1>
			<p class="text-foreground">Create your account to get started</p>
		</div>

		<!-- Sign Up Form -->
		<form class="flex w-full flex-col gap-6" on:submit|preventDefault={handleSignUp}>
			<div class="space-y-4">
				<div class="space-y-2">
					<label for="name" class="text-sm font-medium text-gray-700">Full Name</label>
					<Input 
						id="name"
						type="text" 
						placeholder="Enter your full name" 
						bind:value={name} 
						required 
						class="w-full" 
					/>
				</div>

				<div class="space-y-2">
					<label for="email" class="text-sm font-medium text-gray-700">Email</label>
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
					<label for="password" class="text-sm font-medium text-gray-700">Password</label>
					<Input 
						id="password"
						type="password" 
						placeholder="Create a password" 
						bind:value={password} 
						required 
						class="w-full" 
					/>
				</div>
			</div>

			{#if error}
				<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
					{error}
				</div>
			{/if}

			{#if !loading}
				<Button type="submit" size="lg" class="w-full" variant='sign'>
					Create Account
				</Button>
			{:else}
				<div class="flex items-center justify-center space-x-2 text-gray-600">
					<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
					<span>Creating account...</span>
				</div>
			{/if}
		</form>

		<!-- Footer -->
		<div class="text-center text-sm text-foreground">
			<p>Already have an account? 
				<a href="/signin" class="text-accent hover:text-accent/80 font-medium">Sign in</a>
			</p>
		</div>
	</div>
</div> 