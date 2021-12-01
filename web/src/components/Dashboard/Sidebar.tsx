import React, { FC, useContext } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { routes } from '../../routes';

type Props = {};

const Sidebar: FC<Props> = (props) => {
	const { user, token } = useContext(AuthContext);

	if (!user) {
		return null;
	}

	return (
		<aside
			className='sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark'
			id='sidenav-main'>
			<div className='sidenav-header'>
				<i
					className='fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none'
					aria-hidden='true'
					id='iconSidenav'></i>
				<Link className='navbar-brand m-0' to={routes.DASHBOARD}>
					<img src='/assets/img/logo.png' className='navbar-brand-img h-100 me-2' alt='main_logo' />
					<span className='ms-1 font-weight-bold text-white'>VMS</span>
				</Link>
			</div>
			<hr className='horizontal light mt-0 mb-2' />
			<div className='collapse navbar-collapse w-auto max-height-vh-100' id='sidenav-collapse-main'>
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<Link className='nav-link text-white' to={routes.APPOINTMENTS}>
							<div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
								<i className='material-icons opacity-10'>book</i>
							</div>
							<span className='nav-link-text ms-1'>Appointments</span>
						</Link>
					</li>
					{user.role === 'admin' ? (
						<>
							<li className='nav-item'>
								<Link className='nav-link text-white' to={routes.ANNOUNCEMENTS}>
									<div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
										<i className='material-icons opacity-10'>campaign</i>
									</div>
									<span className='nav-link-text ms-1'>Announcements</span>
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link text-white' to={routes.USERS}>
									<div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
										<i className='material-icons opacity-10'>person</i>
									</div>
									<span className='nav-link-text ms-1'>Users</span>
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link text-white' to={routes.VACCINES}>
									<div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
										<i className='material-icons opacity-10'>vaccines</i>
									</div>
									<span className='nav-link-text ms-1'>Vaccines</span>
								</Link>
							</li>
						</>
					) : null}
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
