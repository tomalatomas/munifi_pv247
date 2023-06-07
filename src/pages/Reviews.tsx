import { FC, useEffect, useMemo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';

import ReviewPreview from '../components/ReviewPreview';
import { reviewsCollection, Review } from '../firebase';
import AddReview from '../components/AddReview';
import useLoggedInUser from '../hooks/useLoggedInUser';

const Reviews: FC = () => {
	const [reviews, setReviews] = useState<Review[]>([]);
	const user = useLoggedInUser();

	const userHasReviewed = useMemo(
		() => reviews.some(review => review.by === user?.email),
		[reviews, user]
	);

	useEffect(() => {
		// Call onSnapshot() to listen to changes
		const unsubscribe = onSnapshot(reviewsCollection, snapshot => {
			// Access .docs property of snapshot
			setReviews(snapshot.docs.map(doc => doc.data()));
		});
		// Don't forget to unsubscribe from listening to changes
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<>
			<Box
				sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
			>
				<Typography variant="h4">User reviews:</Typography>
				{user && !userHasReviewed && (
					<AddReview>
						{open => (
							<Button onClick={open} variant="contained">
								Add review
							</Button>
						)}
					</AddReview>
				)}
			</Box>
			{reviews.map((r, i) => (
				<ReviewPreview key={i} {...r} />
			))}
		</>
	);
};

export default Reviews;
