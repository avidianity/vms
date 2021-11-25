import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, RouteProps, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import { routes } from './routes';

export default function App() {
	const [loaded, setLoaded] = useState(false);

	const links: RouteProps[] = [
		{
			path: routes.DASHBOARD,
			element: <Dashboard />,
		},
		{
			path: routes.REGISTER,
			element: <Register />,
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

	return (
		<BrowserRouter>
			<Routes>
				{links.map((link, index) => (
					<Route {...link} key={index} />
				))}
			</Routes>
		</BrowserRouter>
	);
}
