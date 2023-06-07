import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#3EB489',
			dark: '#8c0048'
		},
		text: {
			primary: '#4B4B4B'
		},
		playerX: '#0000FF',
		playerO: '#00FF00',
		startButton: '#FFFF00'
	}
});

declare module '@mui/material/styles' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Palette {
		playerX?: string;
		playerO?: string;
		startButton?: string;
	}
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface PaletteOptions {
		playerX?: string;
		playerO?: string;
		startButton?: string;
	}
}
