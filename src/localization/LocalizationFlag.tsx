import Flag from 'react-flagkit';

import { Languages, useLanguage } from '../hooks/useTranslation';

type Props = {
	lang: Languages;
	flagkey: string;
};

const LocalizationFlag: React.FC<Props> = ({ lang, flagkey }) => {
	const [language, setLanguage] = useLanguage();
	return (
		<button
			onClick={() => setLanguage(lang)}
			style={{
				cursor: 'pointer',
				filter: `grayscale(${language === lang ? 0 : 1})`,
				border: 'none',
				background: 'transparent'
			}}
		>
			<Flag country={flagkey} />
		</button>
	);
};

export default LocalizationFlag;
