import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

import ButtonLink from '../components/ButtonLink';
import usePageTitle from '../hooks/usePageTitle';
import {
	Match,
	matchesCollection,
	Review,
	reviewsCollection
} from '../firebase';
import PlayerIcon from '../components/PlayerIcon';
import useLoggedInUser from '../hooks/useLoggedInUser';
import ReviewPreview from '../components/ReviewPreview';
import { useTranslation } from '../hooks/useTranslation';

const Home = () => {
	const t = useTranslation();
	usePageTitle(t('home'));

	const user = useLoggedInUser();

	const [matches, setMatches] = useState<Match[]>([]);

	useEffect(
		() =>
			// Call onSnapshot() to listen to changes
			onSnapshot(matchesCollection, snapshot =>
				// Access .docs property of snapshot
				setMatches(
					snapshot.docs
						.map(d => d.data())
						.sort((lhs, rhs) => rhs.date.seconds - lhs.date.seconds)
						.slice(0, 3)
				)
			),
		[]
	);

	const [reviews, setReviews] = useState<Review[]>([]);

	useEffect(
		() =>
			onSnapshot(reviewsCollection, snapshot => {
				setReviews(snapshot.docs.map(doc => doc.data()).slice(0, 3));
			}),
		[]
	);

	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<GridOnIcon
					sx={{
						color: 'primary.main',
						fontSize: '24rem',
						mixBlendMode: 'difference'
					}}
				/>
				<Typography variant="h1" fontWeight="bolder">
					Tic Tac Toe
				</Typography>
			</Box>
			{user?.email && (
				<Typography variant="h4" textAlign="center">
					{t('welcome')}, {user.email}!
				</Typography>
			)}
			<ButtonLink
				to="/play"
				variant="outlined"
				sx={{
					'color': 'playerO',
					'borderColor': 'playerO',
					'alignSelf': 'center',
					':hover': { color: 'playerX', borderColor: 'playerX' }
				}}
			>
				{t('start')}
			</ButtonLink>

			{/* Recent matches */}
			{!!matches.length && (
				<>
					<Typography mt={2} variant="h4">
						{t('recent_games')}
					</Typography>
					<Box sx={{ display: 'flex', gap: 2 }}>
						{matches.map(m => (
							<Card key={m.date.seconds}>
								<CardContent>
									<Typography fontWeight="bold">{m.by}</Typography>
									<Divider sx={{ my: 2 }} />
									<Typography
										sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
									>
										{m.winner === 'Tie' ? (
											t('tie_is')
										) : (
											<>
												{t('winner_was')}
												<PlayerIcon>{m.winner}</PlayerIcon>
											</>
										)}
									</Typography>
									<Typography variant="caption">
										{new Date(new Date().getTime() - m.date.toMillis())
											.toISOString()
											.substring(11, 19)}{' '}
										ago
									</Typography>
								</CardContent>
							</Card>
						))}
					</Box>
				</>
			)}

			{/* Recent reviews */}
			{!!reviews.length && (
				<>
					<Typography mt={2} variant="h4">
						{t('recent_reviews')}
					</Typography>
					<Box sx={{ display: 'flex', gap: 2 }}>
						{reviews.map((r, i) => (
							<ReviewPreview key={i} {...r} />
						))}
					</Box>
				</>
			)}
		</>
	);
};

export default Home;
