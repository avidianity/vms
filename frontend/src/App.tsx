import React, { FC } from 'react';
import { BrowserRouter as Router, Route, RouteProps, Switch } from 'react-router-dom';
import { routes } from './routes';
import Dashboard from './Views/Dashboard';
import Login from './Views/Login';

type Props = {};

const App: FC<Props> = (props) => {
	const links: RouteProps[] = [
		{
			path: routes.HOME,
			component: Login,
			exact: true,
		},
		{
			path: routes.DASHBOARD,
			component: Dashboard,
		},
	];

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
