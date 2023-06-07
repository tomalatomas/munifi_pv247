import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Board from '../components/Board';
import PlayerIcon from '../components/PlayerIcon';
import { Match, matchesCollection } from '../firebase';
import { useTranslation } from '../hooks/useTranslation';

const Matches = () => {
	const [matches, setMatches] = useState<Match[]>([]);
	const t = useTranslation();

	useEffect(
		() =>
			onSnapshot(matchesCollection, snapshot => {
				setMatches(
					snapshot.docs
						.map(doc => doc.data())
						.sort((lhs, rhs) => rhs.date.seconds - lhs.date.seconds)
				);
			}),
		[]
	);

	return (
		<>
			<Typography variant="h4">{t('mhistory')}:</Typography>
			{matches.map((m, i) => (
				<Card key={i}>
					<CardContent
						sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
					>
						<Typography fontWeight="bold">{m.by}</Typography>
						<Board initialBoard={m.board} readOnly />
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography
								sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
							>
								{m.winner === 'Tie' ? (
									t('tie')
								) : (
									<>
										{t('winner')}:<PlayerIcon>{m.winner}</PlayerIcon>
									</>
								)}
							</Typography>
							<Typography variant="caption">
								{new Date(new Date().getTime() - m.date.toMillis())
									.toISOString()
									.substring(11, 19)}{' '}
								ago
							</Typography>
						</Box>
					</CardContent>
				</Card>
			))}
		</>
	);
};

export default Matches;
