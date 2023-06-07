import Board from '../components/Board';
import usePageTitle from '../hooks/usePageTitle';

const Play = () => {
	usePageTitle('Play');
	return <Board />;
};

export default Play;
