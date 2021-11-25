import React, { FC, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

type Props = {};

const Dashboard: FC<Props> = (props) => {
	useEffect(() => {
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
					<div></div>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
