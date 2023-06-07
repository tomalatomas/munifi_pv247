import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const NotFound = () => {
	const t = useTranslation();
	usePageTitle(t('not_found'));
	return (
		<>
			<WarningIcon sx={{ typography: 'h1' }} />
			<Typography variant="h2">{t('not_found')}</Typography>
			<Typography>{t('not_found_text')}</Typography>
		</>
	);
};

export default NotFound;
