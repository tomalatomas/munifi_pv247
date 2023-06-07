import {
	AppBar,
	Box,
	Container,
	CssBaseline,
	ThemeProvider,
	Toolbar
} from '@mui/material';
import {
	RouterProvider,
	RootRoute,
	Outlet,
	Router,
	Route
} from '@tanstack/react-router';

import useLocalStorage from './hooks/useLocalStorage';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Play from './pages/Play';
import { theme } from './themes';

const rootRoute = new RootRoute({
	component: () => {
		// TODO: Use auth from local storage
		const [user, setUser] = useLocalStorage('auth');

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position="fixed">
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							{/* TODO: Add button links */}
							<Box sx={{ flexGrow: 1 }} />
							{/* TODO: Add login/logout */}
						</Toolbar>
					</Container>
				</AppBar>

				<Container
					maxWidth="sm"
					component="main"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
						pt: 8,
						gap: 2
					}}
				>
					<Outlet />
				</Container>
			</ThemeProvider>
		);
	}
});

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Home
});

const aboutRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/about',
	component: About
});

const loginRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: Login
});

const playRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/play',
	component: Play
});

const notFoundRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: NotFound
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	loginRoute,
	aboutRoute,
	playRoute,
	notFoundRoute
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => <RouterProvider router={router} />;

export default App;
