# Meowssenger

#### Video Demo: https://www.youtube.com/watch?v=ElY3wKSgSrA

#### Description:

This project gives users the ability to encode/decode messages within images, in such a manner that the presence of such messages is not evident to human inspection.

In order to achieve this, each character of the message is first encoded in UTF-32, which uses 32 bits. However, since the 11 leading bits are always zero in this encoding, we just end up using 21 bits total for each character.

Then, these bits are set as the least significant bit of the image's RGB color values. And because we only touch the least significant bit, the resulting image looks, to the human eye, pretty much identical to the original one.

Because we use 21 bits for each character, and because each pixel has 3 color values, we need 7 pixels to encode a single character. I explored the possibility of also leveraging the alpha channel to hide bits, but this resulted in some really tricky technical issues because of the way in which the PNG format and the HTML canvas work. I would like to dig deeper into that issue eventually, but for now, I decided to just ignore it.

I also encode a null character (NUL) to let the decoding algorithm know where the message ends.

Also, for this project I decided to use the same base image for every encoding operation (the classic CS50 cat), but an obvious enhancement would be to allow users to input their own base image.

#### Example:

Let's say we want to encode the following emoji: 🧁

First, we compute its 21-bit UTF-32 representation: 000011111100111000001

In order to improve visualization, let's split it in groups of 3: 000 011 111 100 111 000 001

Now let's say the first pixel has an RGB value of 0xffffff. In order to encode 000, we set each of the corresponding color bytes' least significant bits to 0, resulting in 0xfefefe.

Now let's say the second pixel has an RGB value of 0x000000. After encoding 011, we get 0x000101.

After doing the same thing for each of the other 5 groups of bits, we end up by encoding the null character (000000000000000000000, 21 zeros) in the next 7 pixels of the image.

And that's pretty much it when it comes to encoding.

Decoding does something similar but in reverse, it extracts the least significant bits of each pixel color until it finds the null character.

#### Project Structure:

The project was built using SvelteKit, so there are a lot of files that make this web app work, but the key files are the ones inside src/lib and src/routes.

The src/lib/cipher.ts file contains the main application logic, including the functions to encode and decode messages.

The src/lib/config.ts file contains some configuration constants.

The src/lib/components directory contains the encoder and decoder UI components.

The src/routes directory contains the app routes and main layout.

#### Tech stack:

Languages: HTML5, CSS3, TypeScript

Web framework: SvelteKit

UI framework: Skeleton

CSS framework: Tailwind CSS

Hosting service provider: Netlify
