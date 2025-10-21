<script lang="ts">
	import { PieChart } from "layerchart";
	import Button from "$lib/components/ui/button/button.svelte";
	let { data } = $props();

	const colors = ["var(--accent)", "white", "var(--secondary)", "var(--background)", "var(--zen)"];

	const pieData = data[0]
		? [
				{ fruit: "Fat Burner", value: data[0].fatburnerCount, color: colors[0] },
				{ fruit: "Multi Vitamin", value: data[0].multiVitaminCount, color: colors[1] },
				{ fruit: "Magnesium", value: data[0].magnesiumCount, color: colors[2] },
				{ fruit: "CLA", value: data[0].claCount, color: colors[3] },
				{ fruit: "Zen", value: data[0].zenCount, color: colors[4] },
			]
		: [];
</script>

<div class="bg-primary flex h-[400px] w-1/2 flex-col items-center justify-center rounded-2xl p-4">
	<h4 class="text-accent text-center text-2xl font-bold">Supplements</h4>
	<div class="mb-4 flex flex-row justify-around">
		<div role="button" tabindex="0">
			<Button size="sm" variant="secondary">Last 7 Days</Button>
		</div>
		<div role="button" tabindex="0">
			<Button size="sm" variant="secondary">Last Month</Button>
		</div>
	</div>
	<PieChart data={pieData} key="fruit" value="value" c="color" legend />
</div>
