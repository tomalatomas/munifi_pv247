import { Button, Paper, Typography, TextField, Box } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { signIn, signUp } from '../firebase';
import { useTranslation } from '../hooks/useTranslation';

const Login = () => {
	usePageTitle('Login');

	const navigate = useNavigate();

	const [isSignUp, setSignUp] = useState(false);

	const email = useField('email', true);
	const password = useField('password', true);
	const t = useTranslation();

	const [submitError, setSubmitError] = useState<string>();

	return (
		<Paper
			component="form"
			onSubmit={async (e: FormEvent) => {
				e.preventDefault();
				try {
					isSignUp
						? await signUp(email.value, password.value)
						: await signIn(email.value, password.value);
					navigate({ to: '/' });
				} catch (err) {
					setSubmitError(
						(err as { message?: string })?.message ?? 'Unknown error occurred'
					);
				}
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
				{t('signin')}
			</Typography>
			<TextField label="Email" {...email.props} type="email" />
			<TextField label={t('password')} {...password.props} type="password" />
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					alignItems: 'center',
					alignSelf: 'flex-end',
					mt: 2
				}}
			>
				{submitError && (
					<Typography
						variant="caption"
						textAlign="right"
						sx={{ color: 'error.main' }}
					>
						{submitError}
					</Typography>
				)}
				<Button
					type="submit"
					variant="outlined"
					onClick={() => setSignUp(true)}
				>
					{t('signup')}
				</Button>
				<Button
					type="submit"
					variant="contained"
					onClick={() => setSignUp(false)}
				>
					{t('signin')}
				</Button>
			</Box>
		</Paper>
	);
};

export default Login;
