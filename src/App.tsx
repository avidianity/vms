import md5 from 'md5';
import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, RouteProps, Switch } from 'react-router-dom';
import { State } from './Libraries/state.library';
import { Token } from './Models/token.model';
import { routes } from './routes';
import Dashboard from './Views/Dashboard';
import Home from './Views/Home';
import Login from './Views/Login';
import Register from './Views/Register';

type Props = {};

const state = State.getInstance();

const App: FC<Props> = (props) => {
	const links: RouteProps[] = [
		{
			path: routes.HOME,
			component: Home,
			exact: true,
		},
		{
			path: routes.LOGIN,
			component: Login,
		},
		{
			path: routes.REGISTER,
			component: Register,
		},
		{
			path: routes.DASHBOARD,
			component: Dashboard,
		},
	];

	const check = async () => {
		if (state.has('token')) {
			const hash = md5(state.get<string>('token')!);
			const tokens = await new Token().where('hash', '==', hash).all();
			if (tokens.length > 0) {
				const token = tokens[0];
				const user = await token.user().get();
				await user.load(['picture']);
				state.set('user', user.toJSON());
			} else {
				state.remove('token').remove('user');
			}
		}
	};

	useEffect(() => {
		check();
		//eslint-disable-next-line
	}, []);

	return (
		<Router>
			<Switch>
				{links.map((route, index) => (
					<Route {...route} key={index} />
				))}
			</Switch>
		</Router>
	);
};

export default App;
