<script>
	import '../app.postcss';
	import { AppBar, AppShell, Toast, initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<svelte:head>
	<title>Meowssenger</title>
	<meta
		name="description"
		content="Encode and decode messages within images in such a manner that the presence of such messages is not evident to human inspection"
	/>
</svelte:head>

<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-1" slotDefault="place-self-center">
			<a href="/" class="text-xl">Meowssenger</a>
		</AppBar>
	</svelte:fragment>
	<div class="container mx-auto p-4">
		<slot />
	</div>
</AppShell>
