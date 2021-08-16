import { Collection } from 'firestore-eloquent';
import md5 from 'md5';
import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, RouteProps, Switch } from 'react-router-dom';
import { manager } from './constants';
import { firestore } from './Libraries/firebase.library';
import { State } from './Libraries/state.library';
import { Appointment } from './Models/appointment.model';
import { File } from './Models/file.model';
import { Token } from './Models/token.model';
import { User } from './Models/user.model';
import { routes } from './routes';
import Dashboard from './Views/Dashboard';
import Home from './Views/Home';
import Login from './Views/Login';
import Patient from './Views/Patient';
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
		{
			path: routes.PATIENT,
			component: Patient,
		},
	];

	const check = async () => {
		if (state.has('token')) {
			const hash = md5(state.get<string>('token')!);
			const tokens = await new Token().where('hash', '==', hash).all();
			if (tokens.length > 0) {
				const token = tokens[0];
				const user = await new User().findOneOrFail(token.get('user_id'));
				const picture = await new File().where('user_id', '==', user.id()).first();
				user.set('picture', picture?.getData());
				state.set('user', user.toJSON());
			} else {
				state.remove('token').remove('user');
			}
		}
	};

	useEffect(() => {
		check();
		const key = firestore.collection('appointments').onSnapshot((snapshot) => {
			const collection = new Collection();
			snapshot.forEach((document) => {
				collection.push(new Appointment(document.data()));
			});

			manager.dispatch('appointments', collection);
		});

		return () => {
			key();
		};
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
