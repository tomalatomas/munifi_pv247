import { Button, Paper, Typography, TextField } from '@mui/material';
import { Navigate, useNavigate } from '@tanstack/react-router';
import { FormEvent } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import usePageTitle from '../hooks/usePageTitle';
import useField from '../hooks/useField';

const Login = () => {
	usePageTitle('Login');

	const navigate = useNavigate();

	const [user, setUser] = useLocalStorage('auth');

	const username = useField('username', { required: true });

	// Redirect logged in user back to homepage
	if (user) return <Navigate to="/" />;

	return (
		<Paper
			component="form"
			onSubmit={(e: FormEvent) => {
				e.preventDefault();
				setUser(username.value);
				navigate({ to: '/' });
			}}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				p: 4,
				gap: 2
			}}
		>
			<Typography variant="h4" component="h2" textAlign="center" mb={3}>
				Login
			</Typography>
			<Typography variant="caption">
				Select a name you want to login with.
			</Typography>
			<TextField label="Username" {...username.props} />
			<Button type="submit" sx={{ alignSelf: 'flex-end', mt: 2 }}>
				Login
			</Button>
		</Paper>
	);
};

export default Login;
