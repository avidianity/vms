import State from '@avidian/state';
import React, { FC, useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts';
import { routes } from '../../routes';
import Announcements from '../Announcements';
import Appointments from '../Appointments';
import Past from '../Appointments/Past';
import Users from '../Users';
import Vaccines from '../Vaccines';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

type Props = {};

const Dashboard: FC<Props> = (props) => {
	const { user } = useContext(AuthContext);
	const state = new State();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			if (state.get<boolean>('remember') === true) {
				if (!state.has('token')) {
					navigate(routes.LOGIN);
				}
			} else {
				navigate(routes.LOGIN);
			}
		}
		document.body.classList.add('g-sidenav-show', 'bg-gray-200');
		return () => {
			document.body.classList.remove('g-sidenav-show', 'bg-gray-200');
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className='g-sidenav-show bg-gray-200'>
			<Sidebar />
			<main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg'>
				<Navbar />
				<div className='container-fluid py-4'>
					<Routes>
						<Route path='' element={<Past />} />
						<Route path={`${routes.ANNOUNCEMENTS}/*`} element={<Announcements />} />
						<Route path={`${routes.APPOINTMENTS}/*`} element={<Appointments />} />
						<Route path={`${routes.USERS}/*`} element={<Users />} />
						<Route path={`${routes.VACCINES}/*`} element={<Vaccines />} />
					</Routes>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
