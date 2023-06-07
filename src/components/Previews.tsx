import { FC, useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { Stack, Typography } from '@mui/material';

import {
	Match,
	Review,
	matchesCollection,
	reviewsCollection
} from '../firebase';

import ReviewPreview from './ReviewPreview';
import MatchPreview from './MatchPreview';
import ButtonLink from './ButtonLink';

const Previews: FC = () => {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [matches, setMatches] = useState<Match[]>([]);

	useEffect(() => {
		// Call onSnapshot() to listen to changes
		const unsubscribeReviews = onSnapshot(reviewsCollection, snapshot => {
			// Access .docs property of snapshot
			setReviews(snapshot.docs.slice(0, 3).map(doc => doc.data()));
		});
		const unsubscribeMatches = onSnapshot(matchesCollection, snapshot => {
			// Access .docs property of snapshot
			setMatches(snapshot.docs.slice(0, 3).map(doc => doc.data()));
		});
		// Don't forget to unsubscribe from listening to changes
		return () => {
			unsubscribeReviews();
			unsubscribeMatches();
		};
	}, []);
	return (
		<Stack
			spacing={1}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: '100%'
			}}
		>
			<Typography variant="h5">Recent user reviews:</Typography>
			{reviews.map((r, i) => (
				<ReviewPreview key={i} {...r} />
			))}
			<ButtonLink to="/reviews" variant="outlined">
				See all reviews
			</ButtonLink>
			<Typography variant="h5">Recent matches played:</Typography>
			{matches.map((r, i) => (
				<MatchPreview key={i} {...r} />
			))}
			<ButtonLink to="/matches" variant="outlined">
				See all matches
			</ButtonLink>
		</Stack>
	);
};

export default Previews;
