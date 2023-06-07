import { Button, Paper, TextField, Typography } from '@mui/material';
import { Navigate, useNavigate } from '@tanstack/react-router';
import { FormEvent, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const Login = () => {
	// TODO: Use setUser handler to update the user on submit
	const [user, setUser] = useLocalStorage('auth');
	const [username, setUsername] = useState('');
	const [usernameTouched, setUsernameTouched] = useState(false);

	// Redirect logged in user back to homepage
	if (user) return <Navigate to="/" />;
	const hasError = usernameTouched && !username;
	const navigate = useNavigate();

	return (
		<Paper
			component="form"
			onSubmit={(e: FormEvent) => {
				e.preventDefault();
				setUser(username);
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
			<TextField
				required
				error={hasError}
				helperText={!username.length ? 'Username is required' : ''}
				variant="outlined"
				id="username"
				label="Enter your username"
				value={username}
				onChange={e => {
					setUsername(e.target.value);
				}}
				onBlur={() => {
					setUsernameTouched(true);
				}}
			/>
			<Button type="submit" sx={{ alignSelf: 'flex-end', mt: 2 }}>
				Login
			</Button>
		</Paper>
	);
};
export default Login;
