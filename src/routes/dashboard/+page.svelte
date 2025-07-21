<script lang="ts">

import type { PageData } from "./$types";

	export let data: PageData;


	console.log(data.currentWeight?.weight)

	$: currentWeight = data.currentWeight

</script>

<div class="flex flex-col gap-1">
	<div class="bg-card text-card-foreground rounded-md border p-1 font-mono">
		<div class="flex flex-row justify-around">
			Current Weight {currentWeight?.weight}
		</div>
		
	</div>
</div>
