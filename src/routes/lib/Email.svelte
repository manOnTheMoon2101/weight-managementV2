<script>
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

	let { name  } = $props();
</script>

<Html>
	<Head />
	<Body class="bg-zinc-100">
		<Preview preview="Welcome Email" />
		<Container class="m-8 mx-auto max-w-lg rounded-2xl bg-white p-8">
			<Section class="mx-auto text-center">
				<Text class="text-2xl font-bold text-zinc-900">Welcome {name}!</Text>
				<Text class="mt-3 text-zinc-600">
					Better Svelte Email converts Svelte components into email-safe HTML.
				</Text>
				<Row class="mt-6">
					
					<Button
						href="https://github.com/manOnTheMoon2101/weight-managementV2"
						pX={24}
						pY={14}
						class="ml-2 rounded-lg border border-zinc-200 text-zinc-900"
					>
						Use Github
					</Button>
				</Row>
			</Section>
		</Container>
	</Body>
</Html>