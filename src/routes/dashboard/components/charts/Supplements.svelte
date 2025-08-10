<script lang="ts">
	import { PieChart } from "layerchart";
	let { data } = $props();


	$inspect(data)

	const colors = ["#FF6B6B", "#FFD93D", "#FF8C42", "#9B59B6"];
</script>

<div class="h-[300px] resize overflow-auto rounded-sm border p-4">
	<PieChart {data} key="fruit" value="value" c="color" legend />
</div>
