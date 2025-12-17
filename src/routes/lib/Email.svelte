<script lang="ts">
	import {
		Html,
		Head,
		Body,
		Preview,
		Container,
		Section,
		Text,
		Button,
		Row
	} from 'better-svelte-email';

	let { nutrients } = $props();


	// Helper function to format date
	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	}
</script>

<Html>
	<Head />
	<Body class="bg-zinc-100">
		<Preview preview="Health Tracking Report" />
		<Container class="m-8 mx-auto max-w-4xl rounded-2xl bg-white p-8">
			<Section class="mx-auto">
				<Text class="text-3xl font-bold text-zinc-900 text-center">Health Tracking Report</Text>
				<Text class="mt-2 text-zinc-500 text-center">Your nutrition and wellness summary</Text>
				
				{#if nutrients && nutrients.length > 0}
					{#each nutrients as entry}
						<Section class="mt-6 border-b border-zinc-200 pb-6">
							<Text class="text-sm text-zinc-500 mb-2">
								{formatDate(entry.createdAt)}
							</Text>
							
							<!-- Nutrition Info -->
							<Row class="mb-4">
								<Text class="text-lg font-semibold text-zinc-800 mb-2">Nutrition</Text>
								<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
									<div style="background: #f4f4f5; padding: 12px; border-radius: 8px;">
										<Text class="text-xs text-zinc-600 mb-1">Calories</Text>
										<Text class="text-xl font-bold text-zinc-900">{entry.calories}</Text>
									</div>
									<div style="background: #f4f4f5; padding: 12px; border-radius: 8px;">
										<Text class="text-xs text-zinc-600 mb-1">Protein</Text>
										<Text class="text-xl font-bold text-zinc-900">{entry.protein}g</Text>
									</div>
									<div style="background: #f4f4f5; padding: 12px; border-radius: 8px;">
										<Text class="text-xs text-zinc-600 mb-1">Carbs</Text>
										<Text class="text-xl font-bold text-zinc-900">{entry.carbs}g</Text>
									</div>
									<div style="background: #f4f4f5; padding: 12px; border-radius: 8px;">
										<Text class="text-xs text-zinc-600 mb-1">Fat</Text>
										<Text class="text-xl font-bold text-zinc-900">{entry.fat}g</Text>
									</div>
								</div>
							</Row>
							
							<!-- Health Metrics -->
							{#if entry.weight || entry.steps || entry.water}
								<Row class="mb-4">
									<Text class="text-lg font-semibold text-zinc-800 mb-2">Health Metrics</Text>
									<div style="display: flex; gap: 12px; flex-wrap: wrap;">
										{#if entry.weight}
											<div style="background: #fef3c7; padding: 12px; border-radius: 8px; flex: 1; min-width: 100px;">
												<Text class="text-xs text-zinc-600 mb-1">Weight</Text>
												<Text class="text-xl font-bold text-zinc-900">{entry.weight} kg</Text>
											</div>
										{/if}
										{#if entry.steps}
											<div style="background: #dbeafe; padding: 12px; border-radius: 8px; flex: 1; min-width: 100px;">
												<Text class="text-xs text-zinc-600 mb-1">Steps</Text>
												<Text class="text-xl font-bold text-zinc-900">{entry.steps.toLocaleString()}</Text>
											</div>
										{/if}
										{#if entry.water}
											<div style="background: #dbeafe; padding: 12px; border-radius: 8px; flex: 1; min-width: 100px;">
												<Text class="text-xs text-zinc-600 mb-1">Water</Text>
												<Text class="text-xl font-bold text-zinc-900">{entry.water} ml</Text>
											</div>
										{/if}
									</div>
								</Row>
							{/if}
							
							<!-- Supplements -->
							{#if entry.fatBurner || entry.multiVitamin || entry.zen || entry.cla || entry.magnesium}
								<Row class="mb-4">
									<Text class="text-lg font-semibold text-zinc-800 mb-2">Supplements</Text>
									<div style="display: flex; gap: 8px; flex-wrap: wrap;">
										{#if entry.fatBurner?.[0]}
											<span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">Fat Burner</span>
										{/if}
										{#if entry.multiVitamin?.[0]}
											<span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">Multi-Vitamin</span>
										{/if}
										{#if entry.zen?.[0]}
											<span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">Zen</span>
										{/if}
										{#if entry.cla?.[0]}
											<span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">CLA</span>
										{/if}
										{#if entry.magnesium?.[0]}
											<span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">Magnesium</span>
										{/if}
									</div>
								</Row>
							{/if}
							
							<!-- Sleep -->
							{#if entry.sleepTime}
								<Row>
									<Text class="text-lg font-semibold text-zinc-800 mb-2">Sleep</Text>
									<div style="background: #f3e8ff; padding: 12px; border-radius: 8px;">
										<Text class="text-sm text-zinc-600">Sleep Duration: <strong>{entry.sleepTime}</strong></Text>
									</div>
								</Row>
							{/if}
						</Section>
					{/each}
				{:else}
					<Text class="mt-6 text-center text-zinc-500">No health data available</Text>
				{/if}
				
				<Row class="mt-8 text-center">
					<Button
						href="https://github.com/manOnTheMoon2101/weight-managementV2"
						pX={24}
						pY={14}
						class="rounded-lg bg-amber-600 text-white font-semibold"
					>
						View on Github
					</Button>
				</Row>
			</Section>
		</Container>
	</Body>
</Html>
