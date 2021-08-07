import { Collection, Model } from 'firestore-eloquent';
import md5 from 'md5';
import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
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

export function useMode() {
	return useState<'Add' | 'Edit'>('Add');
}

export function useNullable<T>(data?: T) {
	return useState<T | null>(data || null);
}

export function useArray<T>(data?: T[]) {
	return useState<T[]>(data || []);
}

export function useCollection<T extends Model>(data?: Collection<T>) {
	return useState<Collection<T>>(data || new Collection());
}

const state = State.getInstance();

type AuthenticateOptions = {
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
