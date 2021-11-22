import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { outIf } from '../../helpers';
import { useURL, useUser } from '../../hooks';
import { routes } from '../../routes';

type Props = {};

const Navbar: FC<Props> = (props) => {
	const [menu, setMenu] = useState(false);
	const url = useURL();
	const { user, logout } = useUser();

	return (
		<div className='header navbar'>
			<div className='header-container'>
				<ul className='nav-left'>
					<li>
						<a
							id='sidebar-toggle'
							className='sidebar-toggle'
							href='/'
							onClick={(e) => {
								e.preventDefault();
								const root = $('#root');
								if (root.hasClass('is-collapsed')) {
									root.removeClass('is-collapsed');
								} else {
									root.addClass('is-collapsed');
								}
							}}>
							<i className='ti-menu'></i>
						</a>
					</li>
				</ul>
				<ul className='nav-right mr-4'>
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
									src={user?.picture?.path || 'https://via.placeholder.com/200'}
									alt={user?.name}
								/>
							</div>
							<div className='peer'>
								<span className='fsz-sm c-grey-900'>{user?.name}</span>
							</div>
						</a>
						<ul className={`dropdown-menu fsz-sm ${outIf(menu, 'show')}`}>
							<li>
								<Link to={url(routes.PROFILE)} className='d-b td-n pY-5 bgcH-grey-100 c-grey-700'>
									<i className='ti-user mR-10'></i> <span>Profile</span>
								</Link>
							</li>
							<li role='separator' className='divider'></li>
							<li>
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
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
