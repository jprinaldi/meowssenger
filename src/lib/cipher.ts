import { bitsPerChar, maxMessageLength } from '$lib/config';

export function encode(
	message: string,
	context: OffscreenCanvasRenderingContext2D
): ImageData | null {
	if (message.length === 0) {
		throw new Error('Message cannot be empty');
	}

	if (message.length > maxMessageLength) {
		throw new Error('Message is too long');
	}

	if (context === null) {
		throw new Error('Context is null');
	}

	const bits = messageToBits(message);
	const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
	const data = imageData.data;

	for (let i = 0; i < bits.length; i += 1) {
		const dataIndex = bitIndexToDataIndex(i);
		data[dataIndex] &= 0xfe;
		data[dataIndex] |= parseInt(bits[i], 2);
	}

	// Encode null char at the end
	for (let i = bits.length, n = bits.length + bitsPerChar; i < n; i += 1) {
		const dataIndex = bitIndexToDataIndex(i);
		data[dataIndex] = 0;
	}

	return imageData;
}

export function decode(imageData: ImageData): string {
	const data = imageData.data;
	const codePointArray = [];
	for (let i = 0; i < maxMessageLength; i += 1) {
		const codePoint = getHiddenCodePoint(data, i * bitsPerChar);
		if (codePoint === 0) break;
		codePointArray.push(codePoint);
	}
	return codePointArray.map((codePoint) => String.fromCodePoint(codePoint)).join('');
}

function getLSB(data: Uint8ClampedArray, i: number): number {
	return data[i] & 1;
}

function getHiddenCodePoint(data: Uint8ClampedArray, offset: number): number {
	let bits = '';
	for (let i = 0, n = bitsPerChar; i < n; i += 1) {
		const dataIndex = bitIndexToDataIndex(offset + i);
		const lsb = getLSB(data, dataIndex);
		bits += lsb.toString(2);
	}
	return parseInt(bits, 2);
}

function messageToBits(message: string): string {
	let bits = '';
	for (const codePointString of message) {
		const codePoint = codePointString.codePointAt(0);
		if (codePoint === undefined) break;
		bits += codePoint.toString(2).padStart(21, '0');
	}
	return bits;
}

function bitIndexToDataIndex(bitIndex: number) {
	return (bitIndex % 3) + 4 * Math.floor(bitIndex / 3);
}
