<script lang="ts">
	import { authClient } from "$lib/auth-client";
	import { Button } from "$lib/components/ui/button";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	const session = authClient.useSession();

	onMount(() => {
		if ($session.data) {
			goto('/dashboard');
		}
	});
</script>

<div class="flex flex-col gap-4 p-6">


	{#if !$session.data}
	<div class="min-h-screen flex items-center justify-center">
        <div class="flex flex-col items-center space-y-4 p-8 rounded-lg shadow-lg">
            <p class="text-6xl">Welcome</p>
            <Button variant={'secondary'}>
				<a href="/signin" >
					Sign in
				</a>
			</Button>
            
			<Button variant={'secondary'}>
            <a href="/signup" >
                Sign Up
            </a>
		</Button>
        </div>
    </div>
	{/if}
</div>
