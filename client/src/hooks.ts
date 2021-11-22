import { Collection, Model, ModelData } from 'firestore-eloquent';
import md5 from 'md5';
import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { UserContract } from './Contracts/user.contract';
import { Asker } from './helpers';
import { State } from './Libraries/state.library';
import { Token } from './Models/token.model';
import { routes } from './routes';

export function useURL() {
	const match = useRouteMatch();

	const fragments = match.path.split('');

	if (fragments.last() === '/') {
		fragments.splice(fragments.length - 1, 1);
	}

	return (path: string) => `${fragments.join('')}${path}`;
}

export function useMode(mode: 'Add' | 'Edit' = 'Add') {
	return useState<'Add' | 'Edit'>(mode);
}

export function useNullable<T>(data?: T) {
	return useState<T | null>(data || null);
}

export function useArray<T>(data?: T[]) {
	return useState<T[]>(data || []);
}

export function useCollection<T extends Model, D extends ModelData = any>(data?: Collection<T>) {
	return useState<Collection<T, D>>(data || new Collection());
}

const state = State.getInstance();

export function useUser() {
	const history = useHistory();
	const [user, setUser] = useState(state.get<UserContract>('user'));

	const logout = async () => {
		if (await Asker.notice('Are you sure you want to logout?')) {
			if (state.has('token')) {
				const hash = state.get<string>('token')!;
				const token = await new Token().where('hash', '==', md5(hash)).first();
				if (token) {
					await token.delete();
				}
			}
			state.clear();

			toastr.info('You have logged out.', 'Notice');
			history.push(routes.LOGIN);
		}
	};

	useEffect(() => {
		const key = state.listen<UserContract>('user', (user) => setUser(user));

		return () => {
			state.unlisten(key);
		};
		//eslint-disable-next-line
	}, []);

	return { user, logout };
}

export type AuthenticateOptions = {
	done?: (authenticated: boolean) => void;
};

export function useAuthenticate(options?: AuthenticateOptions) {
	const [authenticated, setAuthenticated] = useState(true);
	const history = useHistory();

	const done = options?.done;

	const back = () => {
		history.push(routes.LOGIN);
	};

	const check = async () => {
		try {
			const hash = state.get<string>('token')!;
			const token = await new Token().where('hash', '==', md5(hash)).first();

			if (!token) {
				state.clear();
				if (done) {
					done(false);
				}
				setAuthenticated(false);
				return back();
			}
			if (done) {
				done(true);
			}
			return setAuthenticated(true);
		} catch (error) {
			console.log('Unable to authenticate', error);
			state.clear();
			if (done) {
				done(false);
			}
			setAuthenticated(false);
			return back();
		}
	};

	useEffect(() => {
		check();
		// eslint-disable-next-line
	}, []);

	if (!state.has('token')) {
		state.clear();
		back();
	}

	return { authenticated };
}
