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
				name: 'Tic Tac Toe',
				short_name: 'Tic Tac Toe',
				description:
					'Website developed as an assignment in React development course.',
				theme_color: '#031c36',
				background_color: '#121212',
				icons: [
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
				]
			}
		})
	]
});
