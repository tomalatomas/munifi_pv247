import React, { FC, PropsWithChildren } from 'react';
import Cross from '@mui/icons-material/Clear';
import Circle from '@mui/icons-material/PanoramaFishEye';

// Hint: Suggested components
// import Cross from '@mui/icons-material/Clear';
// import Circle from '@mui/icons-material/PanoramaFishEye';

/**
 *   - when provided with either player, renders a correct colored icon
 */
const PlayerIcon: FC<PropsWithChildren> = ({ children }) => {
	switch (children) {
		case 'X':
			return <Cross sx={{ color: 'red', fontSize: 'inherit' }} />;
		case 'O':
			return <Circle sx={{ color: 'blue', fontSize: 'inherit' }} />;
		default:
			return <div>{children}</div>;
	}
};

export default PlayerIcon;
