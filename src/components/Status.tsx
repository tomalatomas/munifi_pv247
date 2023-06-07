import { Grid, Typography, Paper, IconButton } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import { Stack } from '@mui/system';

import PlayerIcon from './PlayerIcon';
import { Player } from './Board';

type Props = PropsWithChildren<{
	onClick: () => void;
	winner: Player | null;
}>;

/**
 *   - shows either which player's turn it is or which player has won the game
 *   - provides a restart game button
 */

const Status: FC<Props> = ({ onClick, winner, children }) => (
	<Paper
		variant="outlined"
		sx={{
			margin: '1em 0em',
			backgroundColor: winner ? 'lightgreen' : 'transparent'
		}}
	>
		<Grid
			container
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			sx={{
				padding: '1em'
			}}
		>
			<Stack direction="row" alignItems="center">
				<Typography
					sx={{
						paddingRight: '0.5em'
					}}
				>
					{winner ? 'Winner:' : 'Next Player:'}
				</Typography>
				<PlayerIcon>{winner ? winner : children}</PlayerIcon>
			</Stack>
			<IconButton sx={{ color: 'red' }} onClick={onClick}>
				<ReplayIcon />
			</IconButton>
		</Grid>
	</Paper>
);

export default Status;
