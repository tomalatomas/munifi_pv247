import { useCallback, useMemo, useState } from 'react';

import { Player, BoardState, BoardIndex, Winner } from '../components/Board';

const getWinner = (board: BoardState): Winner => {
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
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[a];
		}
	}
	if (Object.keys(board).length === 9) return 'Tie';
	return undefined;
};

const getPlayer = (board: BoardState): Player =>
	Object.keys(board).length % 2 === 0 ? 'X' : 'O';

const useGame = (boardValue: BoardState = {}) => {
	const [board, setBoard] = useState(boardValue);
	const player = useMemo(() => getPlayer(board), [board]);
	const winner = useMemo(() => getWinner(board), [board]);

	const onSquareClicked = (index: BoardIndex) => {
		// Disallow clicking on already set square
		if (board[index] || winner) {
			return;
		}
		const newBoard = { ...board, [index]: player };
		// Mark square with current player's symbol
		setBoard(newBoard);
		// Switch to other player
	};

	const onRestart = useCallback(() => {
		setBoard({});
	}, []);

	document.addEventListener('keydown', event => {
		if (event.code === 'KeyR') {
			onRestart();
		}
	});

	return { board, player, winner, onSquareClicked, onRestart };
};

export default useGame;
