<script lang="ts">
	import { onMount } from 'svelte';
	import { saveAs } from 'file-saver';
	import { conceal } from '$lib';

	const canvasWidth = 300;
	const canvasHeight = 300;
	const imageURL = 'cat.png';

	let canvas: HTMLCanvasElement;
	let offscreenContext: OffscreenCanvasRenderingContext2D | null;
	let context: CanvasRenderingContext2D | null;
	let message = '';
	let encoded = false;

	$: formDisabled = offscreenContext === null;

	onMount(() => {
		context = canvas.getContext('2d');
		const image = new Image();
		image.addEventListener('load', () => {
			const offscreenCanvas = new OffscreenCanvas(image.width, image.height);
			offscreenContext = offscreenCanvas.getContext('2d');
			if (!offscreenContext) return;
			offscreenContext.drawImage(image, 0, 0);
		});
		image.src = imageURL;
	});

	function handleSubmit() {
		if (context === null || offscreenContext === null) return;
		const imageData = conceal(message, offscreenContext);
		if (imageData === null) return;
		context.putImageData(imageData, 0, 0);
		encoded = true;
	}

	function save() {
		canvas.toBlob((blob) => {
			if (blob === null) return;
			saveAs(blob, 'cat.png');
		});
	}
</script>

<div class="flex flex-col space-y-4">
	<form on:submit|preventDefault={handleSubmit}>
		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<input
				type="text"
				placeholder="Enter a message"
				bind:value={message}
				disabled={formDisabled}
				required
			/>
			<button type="submit" class="variant-soft-primary" disabled={formDisabled}>Conceal</button>
		</div>
	</form>
	<div
		class="flex flex-col items-center space-y-4 card variant-ghost-tertiary"
		class:invisible={!encoded}
	>
		<header class="card-header">
			<h2 class="h2 text-center">Your message has been encoded within the image below!</h2>
		</header>
		<section class="p-4">
			<canvas bind:this={canvas} width={canvasWidth} height={canvasHeight} />
		</section>
		<footer class="card-footer">
			<button on:click={save} class="btn variant-ghost-primary">Save</button>
		</footer>
	</div>
</div>

<style lang="postcss">
	canvas {
		width: 300px;
		height: 300px;
	}
</style>
