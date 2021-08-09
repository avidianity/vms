import dayjs from 'dayjs';
import React, { FC, useEffect } from 'react';
import { Route, RouteProps, Switch } from 'react-router';
import { v4 } from 'uuid';
import Dates from '../Components/Dashboard/Dates';
import Home from '../Components/Dashboard/Home';
import Navbar from '../Components/Dashboard/Navbar';
import Profile from '../Components/Profile';
import Sidebar from '../Components/Dashboard/Sidebar';
import Users from '../Components/Dashboard/Users';
import Vaccines from '../Components/Dashboard/Vaccines';
import { useAuthenticate, useURL } from '../hooks';
import { routes } from '../routes';

type Props = {};

const root = process.env.REACT_APP_PUBLIC_URL;

const Dashboard: FC<Props> = (props) => {
	const url = useURL();

	const { authenticated } = useAuthenticate();

	const links: RouteProps[] = [
		{
			path: url('/'),
			exact: true,
			component: Home,
		},
		{
			path: url(routes.PROFILE),
			component: Profile,
		},
		{
			path: url(routes.USERS),
			component: Users,
		},
		{
			path: url(routes.VACCINE.ROOT),
			component: Vaccines,
		},
		{
			path: url(routes.DATES),
			component: Dates,
		},
	];

	useEffect(() => {
		const id = v4();

		const scripts = ['/js/vendor.js', '/js/bundle.js'].map((url) => {
			const script = document.createElement('script');
			script.classList.add(id);
			script.src = `${root}${url}`;
			return script;
		});

		document.body.append(...scripts);

		return () => {
			$(`.${id}`).remove();
		};
	}, []);

	if (!authenticated) {
		return null;
	}

	return (
		<>
			<Sidebar />
			<div className='page-container'>
				<Navbar />
				<main className='main-content bgc-grey-100'>
					<div id='mainContent'>
						<Switch>
							{links.map((route, index) => (
								<Route {...route} key={index} />
							))}
						</Switch>
					</div>
				</main>
				<footer className='bdT ta-c p-30 lh-0 fsz-sm c-grey-600'>
					<span>Copyright © {dayjs().year()}. All Rights Reserved.</span>
				</footer>
			</div>
		</>
	);
};

export default Dashboard;
