import { Box, Typography } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';

import ButtonLink from '../components/ButtonLink';
import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import Previews from '../components/Previews';

const Home = () => {
	usePageTitle('Home');
	const user = useLoggedInUser();
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
			{user?.email && (
				<Typography variant="h4" textAlign="center">
					Welcome, {user.email}!
				</Typography>
			)}
			<ButtonLink
				to="/play"
				variant="outlined"
				sx={{
					'color': 'playerO',
					'borderColor': 'playerO',
					'alignSelf': 'center',
					':hover': { color: 'playerX', borderColor: 'playerX' }
				}}
			>
				Let&apos;s start
			</ButtonLink>
			<Previews />
			{/* TODO: Add 3 latest reviews */}
		</>
	);
};

export default Home;
