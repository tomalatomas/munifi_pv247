import { FC } from 'react';
import { Grid, Paper, Typography, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

import { Player, Winner } from '../hooks/useGame';

import PlayerIcon from './PlayerIcon';

type Props = {
	player: Player;
	winner: Winner;
	onRestart: () => void;
};

const Status: FC<Props> = ({ player, winner, onRestart }) => (
	<Grid item xs={12}>
		<Paper
			variant="outlined"
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				bgcolor:
					winner === 'Tie'
						? 'warning.light'
						: winner
						? 'success.light'
						: undefined,
				px: 2,
				py: 1
			}}
		>
			<Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				{winner === 'Tie' ? (
					"It's a tie"
				) : (
					<>
						{winner ? 'Winner is:' : 'Next player:'}
						<PlayerIcon>{winner ?? player}</PlayerIcon>
					</>
				)}
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
