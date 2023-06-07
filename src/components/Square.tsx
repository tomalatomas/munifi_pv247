import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FC, PropsWithChildren } from 'react';

import PlayerIcon from './PlayerIcon';

// Hint: Suggested components
// import { Grid, Button } from '@mui/material';
// import { Box } from '@mui/system';

type Props = PropsWithChildren<{
	onClick: () => void;
}>;

/**
 *  - represents one square on tic tac toe board
 *  - should act as a container (render it's children)
 *  - should accept callback that is called when it's clicked.
 */
const Square: FC<Props> = ({ onClick, children }) => (
	<Grid item xs={4}>
		<Button
			variant="outlined"
			onClick={onClick}
			sx={{
				aspectRatio: '1',
				width: '100%',
				fontSize: 32
			}}
		>
			<PlayerIcon>{children}</PlayerIcon>
		</Button>
	</Grid>
);
export default Square;
