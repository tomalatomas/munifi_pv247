import { Box, Button, Stack, Typography } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

type Props = {
	text: string;
	color?: string;
	hoverColor: string;
	action?: () => void;
};

const StylizedButton: FC<Props> = ({ text, color, hoverColor, action }) => (
	<Button
		variant="contained"
		sx={{
			'backgroundColor': color,
			'alignSelf': 'center',
			'fontWeight': 'bold',
			':hover': { backgroundColor: hoverColor }
		}}
		onClick={action}
	>
		{text}
	</Button>
);

const Home = () => {
	// TODO: Use auth from local storage
	const [user, setUser] = useLocalStorage('auth');

	const logout = () => {
		setUser(null);
	};

	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<GridOnIcon
					sx={{
						color: 'primary.main',
						fontSize: '24rem',
						mixBlendMode: 'difference'
					}}
				/>
				<Typography variant="h1" fontWeight="bolder">
					Tic Tac Toe
				</Typography>
			</Box>
			{user && (
				<Typography variant="h4" textAlign="center">
					Welcome, {user}!
				</Typography>
			)}
			<Stack direction="row" spacing={2}>
				<Link to="/play" style={{ textDecoration: 'none' }}>
					<StylizedButton
						text="Let's start"
						color="startButton"
						hoverColor="#FFBD00"
					/>
				</Link>
				{user ? (
					<StylizedButton
						text="Logout"
						color="#ff4545"
						hoverColor="red"
						action={() => setUser(null)}
					/>
				) : (
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<StylizedButton text="Login" hoverColor="darkgreen" />
					</Link>
				)}
			</Stack>
			<Link to="/about" style={{ textDecoration: 'none' }}>
				<StylizedButton text="About" color="lightgray" hoverColor="white" />
			</Link>
		</>
	);
};

export default Home;
