import { Star, StarBorder } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography
} from '@mui/material';
import { FC } from 'react';
import { deleteDoc } from 'firebase/firestore';

import { Review, reviewsDocument } from '../firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

const deleteReview = (id: string) => {
	const document = reviewsDocument(id);
	deleteDoc(document)
		.then(() => {
			console.log('Document deleted successfully');
		})
		.catch(error => {
			console.log(error);
		});
};

const ReviewPreview: FC<Review> = ({ by, stars, description }) => {
	const user = useLoggedInUser();
	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				textAlign: 'left'
			}}
		>
			<CardContent>
				<Typography variant="h5" color="textSecondary">
					{by}
				</Typography>
				<Box mb={2}>
					{[...Array(5).keys()].map(i =>
						i < stars ? (
							<Star key={i} color="primary" />
						) : (
							<StarBorder key={i} color="primary" />
						)
					)}
				</Box>
				{description && <Typography>{description}</Typography>}
				{user?.email === by && (
					<CardActions>
						<Button
							onClick={() => deleteReview(by)}
							variant="contained"
							color="error"
						>
							Delete
						</Button>
					</CardActions>
				)}
			</CardContent>
		</Card>
	);
};

export default ReviewPreview;
