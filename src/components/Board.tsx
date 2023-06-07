import { FC } from 'react';
import { Grid } from '@mui/material';

import useGame from '../hooks/useGame';

import Square from './Square';
import Status from './Status';

export type Player = 'O' | 'X';
export type Winner = Player | undefined | 'Tie';

const BoardIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
export type BoardIndex = (typeof BoardIndexes)[number];

export type BoardState = Partial<Record<BoardIndex, Player>>;

const Board: FC = () => {
	const { board, player, winner, onSquareClicked, onRestart } = useGame();

	return (
		<Grid container spacing={1}>
			{BoardIndexes.map(i => (
				<Square key={i} onClick={() => onSquareClicked(i)}>
					{board[i] ?? i}
				</Square>
			))}
			<Status player={player} winner={winner} onRestart={onRestart} />
		</Grid>
	);
};

export default Board;
