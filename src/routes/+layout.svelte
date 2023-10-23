<script>
	import '../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
</script>

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
