import { createContext } from 'react';
import { UserContract } from './contracts/user.contract';

export const AuthContext = createContext<{
	user: UserContract | null;
	setUser: (user: UserContract | null) => void;
	token: string | null;
	setToken: (token: string | null) => void;
}>({} as any);
