<script lang="ts">
	import type { Snippet } from "svelte";
	import Navbar from "./components/navbar/Navbar.svelte";
	import Footer from "./components/footer/Footer.svelte";
	let { data, children }: { data: any; children: Snippet } = $props();
</script>

<div class="flex flex-col gap-4 p-4">
	<Navbar
		user={data.user}
		limits={data.limits}
		userColour={data.userColour.colour}
		userJourney={data.userJourney.journey}
		userSupplements={data.userSupplements}
	/>

	{@render children()}

	<Footer />
</div>
