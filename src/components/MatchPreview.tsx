import { Box, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { Match } from '../firebase';
import { BoardState } from '../hooks/useGame';

import Board from './Board';

const getBoard = (boardString: string): BoardState => JSON.parse(boardString);

const MatchPreview: FC<Match> = ({ by, duration, winner, date, board }) => {
	const user = useLoggedInUser();
	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				textAlign: 'left'
			}}
		>
			<CardContent>
				<Typography variant="h5" color="textSecondary">
					{by}
				</Typography>
				<Box mb={2}>
					{Board({ initialBoard: getBoard(board), readOnly: true })}
				</Box>
				<Typography>{`Won by ${winner} in ${
					duration / 1000
				} seconds`}</Typography>
				<Typography>{`Played by ${by}`}</Typography>
				<Typography>{`Played on ${date.toDate()}`}</Typography>
			</CardContent>
		</Card>
	);
};

export default MatchPreview;
