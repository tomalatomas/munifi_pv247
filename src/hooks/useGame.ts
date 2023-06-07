import { addDoc, Timestamp } from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { matchesCollection } from '../firebase';

import useLoggedInUser from './useLoggedInUser';

export type Player = 'O' | 'X';
export type Winner = Player | 'Tie' | undefined;

export const BoardIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
type BoardIndex = (typeof BoardIndexes)[number];

export type BoardState = Partial<Record<BoardIndex, Player>>;

const getWinner = (board: BoardState): Winner => {
	// It's a tie if board is full
	if (Object.entries(board).length === 9) return 'Tie';

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

const useGame = (initialBoard: BoardState = {}, readOnly?: boolean) => {
	const user = useLoggedInUser();
	const [board, setBoard] = useState(initialBoard);

	const player = useMemo<Player>(
		() => (Object.entries(board).length % 2 ? 'O' : 'X'),
		[board]
	);

	const winner = useMemo(() => getWinner(board), [board]);

	// Handlers
	const onSquareClicked = (index: BoardIndex) => {
		// Disallow clicking on already set square
		if (winner || board[index]) {
			return;
		}

		// Mark square with current player's symbol
		setBoard(b => ({ ...b, [index]: player }));
	};

	const onRestart = useCallback(() => {
		setBoard({});
	}, []);

	// Register 'keydown' listener that restarts the game
	useEffect(() => {
		if (readOnly) return;
		const listener = (e: KeyboardEvent) => {
			e.key === 'r' && onRestart();
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [readOnly]);

	// Send match result after the game ends
	useEffect(() => {
		if (readOnly || !winner) return;
		addDoc(matchesCollection, {
			by: user?.email ?? 'Anonymous',
			date: Timestamp.now(),
			board,
			winner
		});
	}, [winner]);

	return {
		board,
		player,
		winner,
		onSquareClicked,
		onRestart
	};
};

export default useGame;
