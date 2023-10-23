export const canvasWidth = 300;
export const canvasHeight = 300;
export const pixelsPerChar = 7;
export const bitsPerChar = pixelsPerChar * 3;
export const maxMessageLength = Math.floor(
	(canvasWidth * canvasHeight - pixelsPerChar) / pixelsPerChar
);
