# Task 10 - Deployment

## Prerequisites

1. Correctly initialize firebase app with your `firebaseConfig`.

Your task for this lesson is to enable Progressive Web App functionality and deploy this page with Firebase Hosting.

## PWA

To add PWA support to our app, we can use the `vite-plugin-pwa` package. Start by adding it as a dev dependency and importing it into `vite.config.ts`. We also need to add assets we will be using in our `manifest` file.

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['grid.svg', 'preview.png'],
			manifest: {
				/* ... */
			}
		})
	]
});
```

Next we need to fill out the `manifest`:

- Update the `short_name` and `name` to **Tic Tac Toe**
- Add a `description` field
- Change the `icons` attribute to use the `grid.svg` and `preview.png`:

  ```ts
  [
  	{
  		src: '/grid.svg',
  		type: 'image/svg+xml',
  		sizes: '48x48 192x192 512x512'
  	},
  	{
  		src: '/preview.png',
  		type: 'image/png',
  		sizes: '700x700'
  	},
  	{
  		src: '/preview.png',
  		type: 'image/png',
  		sizes: '700x700',
  		purpose: 'any maskable'
  	}
  ];
  ```

- Set theme and background color to the colors used in app

## Metadata

Using [metatags.io](https://metatags.io/), update meta tags in `index.html`.

- **Title:** Tic Tac Toe
- **Description:** Website developed as an assignment in React development course.
- **Image:** Use the `preview.png`

Also update the icons in `index.html` to use the `grid.svg`.

```html
<link rel="icon" type="image/svg+xml" href="/grid.svg" />
<link rel="apple-touch-icon" href="/grid.svg" sizes="180x180" />
<link rel="mask-icon" href="/grid.svg" color="#f2d45c" />
```

## Deployment

As a last step of the assignment, you will deploy this assignment to Vercel. Since this repository is owned by FI-PV247 group, you will need to make your own fork of it, which you will then select on Vercel. Once it's deployed, add its url below.

- URL: [Deployment url](https://tomalatomas.vercel.app/)

> You can then use this url to also check if your meta data are correctly set up at [metatags.io](https://metatags.io/)

## Hints

- Certain meta tags like `og:image` require full and not just relative URL therefore using `%PUBLIC_URL%` won't be enough
- Make sure to not leave duplicate meta tags in the `index.html` from the original index.html
- Resulting link previews should look something like this

  ![Link previews example](/example.jpg)
