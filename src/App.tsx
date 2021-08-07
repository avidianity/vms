import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, RouteProps, Switch } from 'react-router-dom';
import { State } from './Libraries/state.library';
import { User } from './Models/user.model';
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
		if (state.has('user')) {
			const user = await new User().findOne(state.get('user')?.id);
			state.set('user', user.getData());
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
