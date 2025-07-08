<script lang="ts">
	import { authClient } from "$lib/auth-client";
	import { Button } from "$lib/components/ui/button";

	const session = authClient.useSession();
</script>

<div class="flex flex-col gap-4 p-6">
	{#if $session.data}
		<div class="flex flex-col gap-2">
			<p>Welcome back, {$session?.data.user.name}!</p>
			<Button href="/dashboard" class="w-fit" size="lg">Go to Dashboard</Button>
			<div>
				More data from auth client:
				<pre>{JSON.stringify($session?.data.user, null, 2)}</pre>
			</div>
			<Button
				type="button"
				onclick={() => authClient.signOut()}
				class="w-fit"
				variant="destructive"
				size="lg">Sign out</Button
			>
		</div>
	{:else}
		<div class="flex flex-col gap-2">
			<p>You are not signed in.</p>
			<Button href="/signin" class="w-fit" size="lg">Sign in</Button>
		</div>
		<div class="flex flex-col gap-2">
			<p>You are not signed in.</p>
			<Button href="/signup" class="w-fit" size="lg">Sign Up</Button>
		</div>
	{/if}
</div>
