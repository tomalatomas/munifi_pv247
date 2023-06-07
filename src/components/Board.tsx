import { Grid } from '@mui/material';

import useGame, { BoardIndexes, BoardState } from '../hooks/useGame';

import Square from './Square';
import Status from './Status';

type Props = {
	initialBoard?: BoardState;
	readOnly?: boolean;
};

const Board = ({ initialBoard, readOnly }: Props) => {
	const { board, player, winner, onSquareClicked, onRestart } = useGame(
		initialBoard,
		readOnly
	);

	return (
		<Grid container spacing={1}>
			{BoardIndexes.map(i => (
				<Square key={i} disabled={readOnly} onClick={() => onSquareClicked(i)}>
					{board[i]}
				</Square>
			))}
			{!readOnly && (
				<Status player={player} winner={winner} onRestart={onRestart} />
			)}
		</Grid>
	);
};

export default Board;
