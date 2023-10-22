<script>
	import '../app.postcss';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>Meowssenger</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
