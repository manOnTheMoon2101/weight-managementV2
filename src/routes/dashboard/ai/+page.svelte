<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
    import {Badge} from "$lib/components/ui/badge/index"

	let warning = $state("");

	function setPrank() {
		warning = "AI Coming Soon!!!";
	}

    // function clearPrank(){
    //     warning = ""
    // }
</script>

<div class="grid w-full gap-2">
	<Textarea placeholder="Enter Foods Here." />
	<Button class="bg-secondary" onclick={setPrank}>Generate</Button>
</div>

{#if warning}
<!-- <Button class="bg-secondary" onclick={clearPrank}>Clear</Button> -->
	<div class="text-center"><Badge class="bg-destructive text-2xl text-foreground">{warning}</Badge></div>
{/if}
