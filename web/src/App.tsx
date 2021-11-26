import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, RouteProps, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import { routes } from './routes';
import { useNullable } from '@avidian/hooks';
import { AuthContext } from './contexts';
import { UserContract } from './contracts/user.contract';
import { QueryClientProvider, QueryClient } from 'react-query';
import State from '@avidian/state';
import axios from 'axios';

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const [user, setUser] = useNullable<UserContract>();
	const [token, setToken] = useNullable<string>();
	const state = new State();

	const links: RouteProps[] = [
		{
			path: routes.DASHBOARD,
			element: <Dashboard />,
		},
		{
			path: `${routes.DASHBOARD}/*`,
			element: <Dashboard />,
		},
		{
			path: routes.REGISTER,
			element: <Register />,
		},
		{
			path: routes.LOGIN,
			element: <Login />,
		},
	];

	useEffect(() => {
		if (!loaded) {
			[
				'/assets/js/core/popper.min.js',
				'/assets/js/core/bootstrap.min.js',
				'/assets/js/plugins/perfect-scrollbar.min.js',
				'/assets/js/plugins/smooth-scrollbar.min.js',
				'/assets/js/plugins/chartjs.min.js',
				'/assets/js/material-dashboard.min.js',
				'/assets/js/chart.js',
			].forEach((url, index) => {
				setTimeout(() => {
					const script = document.createElement('script');
					script.src = url;
					script.defer = true;
					document.body.appendChild(script);
				}, 250 * index + 1);
			});
			setLoaded(true);
		}
		// eslint-disable-next-line
	}, [loaded]);

	const check = async () => {
		try {
			if (state.has('token')) {
				const token = state.get<string>('token');
				const { data } = await axios.get<UserContract>('/auth/check', { headers: { Authorization: `Bearer ${token}` } });
				setUser(data);
				setToken(token);
			}
		} catch (error) {
			console.error(error);
			state.remove('user').remove('token');
			setUser(null);
			setToken(null);
		}
	};

	useEffect(() => {
		check();
		//eslint-disable-next-line
	}, []);

	return (
		<BrowserRouter>
			<AuthContext.Provider value={{ user, setUser, token, setToken }}>
				<QueryClientProvider client={new QueryClient()}>
					<Routes>
						{links.map((link, index) => (
							<Route {...link} key={index} />
						))}
					</Routes>
				</QueryClientProvider>
			</AuthContext.Provider>
		</BrowserRouter>
	);
}
