import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { routes } from '../../routes';
import logo from '../../Assets/logo.svg';
import { useURL, useUser } from '../../hooks';
import { outIf } from '../../helpers';

type Props = {};

const id = v4();

const Navbar: FC<Props> = (props) => {
	const [menu, setMenu] = useState(false);
	const { user, logout } = useUser();
	const url = useURL();

	return (
		<nav className='navbar navbar-expand-lg navbar-light shadow w-100' style={{ backgroundColor: '#fff' }}>
			<Link to={routes.HOME} className='navbar-brand'>
				<img src={logo} alt='VMSS' style={{ height: '40px', width: '40px' }} />
			</Link>
			<button
				className='navbar-toggler'
				type='button'
				onClick={(e) => {
					e.preventDefault();
					$(`#${id}`).collapse('toggle');
				}}>
				<span className='navbar-toggler-icon'></span>
			</button>

			<div className='collapse navbar-collapse' id={id}>
				<ul className='navbar-nav ml-auto mr-2'>
					{!user ? (
						<>
							<li className='nav-item'>
								<Link to={routes.LOGIN} className='nav-link'>
									<i className='fas fa-sign-in-alt'></i>
									Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link to={routes.REGISTER} className='nav-link'>
									<i className='fas fa-user-circle'></i>
									Register
								</Link>
							</li>
						</>
					) : (
						<li className={`dropdown ${outIf(menu, 'show')}`}>
							<a
								href='/'
								className='dropdown-toggle no-after peers fxw-nw ai-c lh-1'
								onClick={(e) => {
									e.preventDefault();
									setMenu(!menu);
								}}>
								<div className='peer mR-10'>
									<img
										className='w-2r bdrs-50p'
										src={user.picture?.path || 'https://via.placeholder.com/200'}
										alt={user.name}
									/>
								</div>
								<div className='peer'>
									<span className='fsz-sm c-grey-900'>{user?.name}</span>
								</div>
							</a>
							<ul className={`dropdown-menu fsz-sm ${outIf(menu, 'show')}`}>
								<li className='px-3'>
									<Link
										to={user.role === 'Patient' ? routes.PATIENT : routes.DASHBOARD}
										className='d-b td-n pY-5 bgcH-grey-100 c-grey-700'>
										<i className='ti-home mR-10'></i> <span>Home</span>
									</Link>
								</li>
								<li className='px-3'>
									<Link to={url(routes.PROFILE)} className='d-b td-n pY-5 bgcH-grey-100 c-grey-700'>
										<i className='ti-user mR-10'></i> <span>Profile</span>
									</Link>
								</li>
								<li className='px-3'>
									<a
										className='d-b td-n pY-5 bgcH-grey-100 c-grey-700'
										href='/logout'
										onClick={(e) => {
											e.preventDefault();
											logout();
										}}>
										<i className='ti-power-off mR-10'></i> <span>Logout</span>
									</a>
								</li>
							</ul>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
