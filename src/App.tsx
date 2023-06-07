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
	RouterProvider,
	RootRoute,
	Outlet,
	Router,
	Route
} from '@tanstack/react-router';

import ButtonLink from './components/ButtonLink';
import About from './pages/About';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Play from './pages/Play';
import theme from './theme';
import useLoggedInUser, { UserProvider } from './hooks/useLoggedInUser';
import { signOut } from './firebase';
import Matches from './pages/Matches';
import LanguageSwitch from './components/LanguageSwitch';
import { LanguageProvider, useTranslation } from './hooks/useTranslation';

const rootRoute = new RootRoute({
	component: () => {
		const user = useLoggedInUser();
		const t = useTranslation();

		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<AppBar sx={{ position: 'sticky' }}>
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<ButtonLink to="/">{t('home')}</ButtonLink>
							<ButtonLink to="/play">{t('play')}</ButtonLink>
							<ButtonLink to="/about">{t('about')}</ButtonLink>
							<ButtonLink to="/matches">{t('matches')}</ButtonLink>
							<ButtonLink to="/reviews">{t('reviews')}</ButtonLink>
							<Box sx={{ flexGrow: 1 }} />
							{!user ? (
								<ButtonLink to="/login">{t('login')}</ButtonLink>
							) : (
								<Button onClick={signOut}>{t('logout')}</Button>
							)}
							<LanguageSwitch />
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
						gap: 2,
						my: 4
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

const matchesRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/matches',
	component: Matches
});

const reviewsRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/reviews',
	component: Reviews
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
	matchesRoute,
	reviewsRoute,
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

const App = () => (
	<UserProvider>
		<LanguageProvider>
			<RouterProvider router={router} />
		</LanguageProvider>
	</UserProvider>
);

export default App;
