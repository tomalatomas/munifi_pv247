import {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import { User } from 'firebase/auth';

import { onAuthChanged } from '../firebase';

const AuthContext = createContext<User | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<User>();
	useEffect(() => {
		onAuthChanged(u => setUser(u ?? undefined));
	}, []);
	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

const useLoggedInUser = () => {
	const user = useContext(AuthContext);
	return user;
};

export default useLoggedInUser;
