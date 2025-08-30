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

<div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
	<div class="bg-white flex flex-col items-center gap-8 rounded-2xl border shadow-xl p-10 max-w-md w-full">
		<!-- Welcome Header -->
		<div class="text-center space-y-2">
			<h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
			<p class="text-gray-600">Sign in to your account to continue</p>
		</div>

		<!-- Sign In Form -->
		<form class="flex w-full flex-col gap-6" on:submit|preventDefault={handleSignIn}>
			<div class="space-y-4">
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
						placeholder="Enter your password" 
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
				<Button variant='sign' type="submit" size="lg" class="w-full">
					Sign In
				</Button>
			{:else}
				<div class="flex items-center justify-center space-x-2 text-gray-600">
					<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
					<span>Signing in...</span>
				</div>
			{/if}
		</form>

		<!-- Footer -->
		<div class="text-center text-sm text-gray-500">
			<p>Don't have an account? 
				<a href="/signup" class="text-blue-600 hover:text-blue-800 font-medium">Sign up</a>
			</p>
		</div>
	</div>
</div>
