import { FC, useState } from 'react';
import { Grid } from '@mui/material';

import Square from './Square';
import Status from './Status';

export type Player = 'O' | 'X';

const BoardIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
type BoardIndex = (typeof BoardIndexes)[number];

type BoardState = Partial<Record<BoardIndex, Player>>;

const getWinner = (board: BoardState): Player | undefined => {
	// For board of size 3x3 there are only 8 winning combinations
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	] as const;

	// Check all combinations until winner is found
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[a];
		}
	}

	// Winner is no one
	return undefined;
};

const Board: FC = () => {
	// State
	const [player, setPlayer] = useState<Player>('X');
	const [board, setBoard] = useState<BoardState>({});
	const [winner, setWinner] = useState<Player>();

	// Handlers
	const onSquareClicked = (index: BoardIndex) => {
		// Disallow clicking on already set square
		if (board[index]) {
			return;
		}

		const newBoard = { ...board, [index]: player };

		// Mark square with current player's symbol
		setBoard(newBoard);
		// Switch to other player
		setPlayer(p => (p === 'O' ? 'X' : 'O'));
		// Update winner
		setWinner(getWinner(newBoard));
		console.log(Object.keys(board).length % 2);
	};

	const onBoardRestart = () => {
		setPlayer('X');
		setBoard({});
		setWinner(undefined);
	};

	return (
		<Grid container spacing={1}>
			{BoardIndexes.map(i => (
				<Square key={i} onClick={() => onSquareClicked(i)}>
					{board[i] ?? i}
				</Square>
			))}
			<Status player={player} winner={winner} onRestart={onBoardRestart} />
		</Grid>
	);
};

export default Board;
