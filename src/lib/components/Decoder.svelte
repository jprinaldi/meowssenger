<script lang="ts">
	import { FileButton } from '@skeletonlabs/skeleton';
	import { decode } from '$lib';

	let imageFiles: FileList;
	let offscreenContext: OffscreenCanvasRenderingContext2D | null;
	let message: string;

	async function handleSubmit() {
		const image = await createImageBitmap(imageFiles[0]);
		const offscreenCanvas = new OffscreenCanvas(image.width, image.height);
		offscreenContext = offscreenCanvas.getContext('2d');
		if (!offscreenContext) return;
		offscreenContext.drawImage(image, 0, 0);
		const imageData = offscreenContext.getImageData(
			0,
			0,
			offscreenContext.canvas.width,
			offscreenContext.canvas.height
		);
		message = decode(imageData);
	}
</script>

<FileButton
	bind:files={imageFiles}
	on:change={handleSubmit}
	name="files"
	accept="image/png"
	required
	button="btn variant-ghost-secondary"
>
	Select image
</FileButton>

{#if message !== undefined}
	<div class="card variant-ghost-tertiary">
		<header class="card-header text-xl">The message is:</header>
		<section class="p-4">{message}</section>
	</div>
{/if}
