import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { FC, useEffect, useState } from 'react';

import Square from './Square';
import Status from './Status';

// Hint: Suggested components
// import { Container, Grid } from '@mui/material';

export type Player = 'O' | 'X';

const BoardIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
type BoardIndex = (typeof BoardIndexes)[number];

type BoardState = Partial<Record<BoardIndex, Player>>;

/**
 * Function that takes board state and calculates whether a player won
 * @param {BoardState} board State object of teh board
 * @return {Player?} Player if someone won, undefined otherwise
 */
const getWinner = (board: BoardState) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		const positionA = board[BoardIndexes[a]];
		const positionB = board[BoardIndexes[b]];
		const positionC = board[BoardIndexes[c]];
		if (positionA && positionA === positionB && positionA === positionC) {
			return positionA;
		}
	}
	return null;
};

/**
 * TODO: Write a component that:
 * - represents the board of a tic tac toe game
 * - handles all the logic
 * - renders whole board and status of the game
 */
const Board: FC = () => {
	// State
	const [player, setPlayer] = useState<Player>('X');
	const [board, setBoard] = useState<BoardState>({});
	const winner = getWinner(board);

	// Handlers
	/**
	 * Function that accepts clicked index and changes teh state accordingly
	 * @param {BoardIndex} index Clicked index
	 */
	const onSquareClicked = (index: BoardIndex) => {
		// Disallow clicking on already set square or if winner is declared
		if (board[index] || winner) {
			return;
		}

		// Mark square with current player's symbol
		setBoard(b => ({ ...b, [index]: player }));
		// Switch to other player
		setPlayer(prev => (prev === 'X' ? 'O' : 'X'));
	};

	/**
	 * Function that resets all board state to initial values
	 */
	const onBoardRestart = () => {
		setPlayer('X');
		setBoard({});
	};

	return (
		<Container
			maxWidth="sm"
			component="main"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				height: '100vh'
			}}
		>
			<Grid container spacing={1}>
				<Square onClick={() => onSquareClicked(0)}>{board[0] ?? 0}</Square>
				<Square onClick={() => onSquareClicked(1)}>{board[1] ?? 1}</Square>
				<Square onClick={() => onSquareClicked(2)}>{board[2] ?? 2}</Square>
				<Square onClick={() => onSquareClicked(3)}>{board[3] ?? 3}</Square>
				<Square onClick={() => onSquareClicked(4)}>{board[4] ?? 4}</Square>
				<Square onClick={() => onSquareClicked(5)}>{board[5] ?? 5}</Square>
				<Square onClick={() => onSquareClicked(6)}>{board[6] ?? 6}</Square>
				<Square onClick={() => onSquareClicked(7)}>{board[7] ?? 7}</Square>
				<Square onClick={() => onSquareClicked(8)}>{board[8] ?? 8}</Square>
			</Grid>
			<Status onClick={() => onBoardRestart()} winner={winner}>
				{player}
			</Status>
		</Container>
	);
};
export default Board;
