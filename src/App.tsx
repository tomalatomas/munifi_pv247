import {
	AppBar,
	Container,
	Toolbar,
	Button,
	Box,
	ThemeProvider,
	CssBaseline
} from '@mui/material';
import {
	Link,
	RouterProvider,
	RootRoute,
	Outlet,
	Router,
	Route
} from '@tanstack/react-router';

import ButtonLink from './components/ButtonLink';
import useLocalStorage from './hooks/useLocalStorage';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Play from './pages/Play';
import theme from './theme';

const rootRoute = new RootRoute({
	component: () => {
		const [user, setUser] = useLocalStorage('auth');

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<AppBar>
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<ButtonLink to="/">Home</ButtonLink>
							<ButtonLink to="/play">Play</ButtonLink>
							<ButtonLink to="/about">About</ButtonLink>
							<Box sx={{ flexGrow: 1 }} />
							{!user ? (
								<ButtonLink to="/login">Login</ButtonLink>
							) : (
								<Button onClick={() => setUser(null)}>Logout</Button>
							)}
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
						flexGrow: 1,
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

const playRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/play',
	component: Play
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

const notFoundRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: NotFound
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	playRoute,
	aboutRoute,
	loginRoute,
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
