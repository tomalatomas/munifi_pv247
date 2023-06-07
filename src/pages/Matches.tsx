import { onSnapshot } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { Match, matchesCollection } from '../firebase';
import MatchPreview from '../components/MatchPreview';

const Matches: FC = () => {
	const [matches, setMatches] = useState<Match[]>([]);

	useEffect(() => {
		// Call onSnapshot() to listen to changes
		const unsubscribeMatches = onSnapshot(matchesCollection, snapshot => {
			// Access .docs property of snapshot
			setMatches(snapshot.docs.map(doc => doc.data()));
		});
		// Don't forget to unsubscribe from listening to changes
		return () => {
			unsubscribeMatches();
		};
	}, []);

	return (
		<>
			<Box
				sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
			>
				<Typography variant="h4">Recent matches:</Typography>
			</Box>
			{matches.map((r, i) => (
				<MatchPreview key={i} {...r} />
			))}
		</>
	);
};

export default Matches;
