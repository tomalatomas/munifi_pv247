import { FC } from 'react';
import { Grid, Paper, Typography, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

import { Player } from './Board';
import PlayerIcon from './PlayerIcon';

type Props = {
	player: Player;
	winner?: Player;
	onRestart: () => void;
};

const Status: FC<Props> = ({ player, winner, onRestart }) => (
	<Grid item xs={12}>
		<Paper
			variant="outlined"
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				bgcolor: winner ? 'success.light' : undefined,
				px: 2,
				py: 1
			}}
		>
			<Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				{winner ? 'Winner is:' : 'Next player:'}
				<PlayerIcon>{winner ?? player}</PlayerIcon>
			</Typography>
			<IconButton
				onClick={onRestart}
				title="Restart"
				color="error"
				sx={{ bgcolor: 'background.paper' }}
			>
				<ReplayIcon />
			</IconButton>
		</Paper>
	</Grid>
);

export default Status;
