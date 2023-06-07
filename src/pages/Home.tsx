import { Box, Button, Typography } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import { Link } from '@tanstack/react-router';

import useLocalStorage from '../hooks/useLocalStorage';

const Home = () => {
	// TODO: Use auth from local storage
	const [user] = useLocalStorage('auth');
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
			<Link to="/play">
				<Button
					variant="outlined"
					sx={{
						'color': 'playerO',
						'borderColor': 'playerO',
						'alignSelf': 'center',
						':hover': { color: 'playerX', borderColor: 'playerX' }
					}}
				>
					Let&apos;s start
				</Button>
			</Link>
		</>
	);
};

export default Home;
