import { Collection } from 'firestore-eloquent';
import md5 from 'md5';
import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, RouteProps, Switch } from 'react-router-dom';
import ECCD from './Components/ECCD';
import { manager, PROXY_URL } from './constants';
import { firestore } from './Libraries/firebase.library';
import { State } from './Libraries/state.library';
import { Appointment } from './Models/appointment.model';
import { Token } from './Models/token.model';
import { routes } from './routes';
import Dashboard from './Views/Dashboard';
import Home from './Views/Home';
import Login from './Views/Login';
import Patient from './Views/Patient';
import Register from './Views/Register';
import axios from 'axios';

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
		{
			path: `${routes.ECCD}/:id`,
			component: ECCD,
		},
	];

	const check = async () => {
		if (state.has('token')) {
			try {
				const hash = md5(state.get<string>('token')!);
				const token = await new Token().where('hash', '==', hash).firstOrFail();
                const user = await token.user().get();
                if (!user) {
                    throw new Error();
                }
				await user.load(['picture']);
				state.set('user', user.toJSON());
			} catch (_) {
				state.remove('token').set('user', null);
			}
        }
        
        try {
            await axios.get(`${PROXY_URL}/ping`);
        } catch (error) {
            toastr.error('Unable to reach mailing and sms server.');
            console.error(error);
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
