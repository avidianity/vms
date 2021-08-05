import md5 from 'md5';
import React, { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Asker, outIf } from '../../helpers';
import { useURL } from '../../hooks';
import { State } from '../../Libraries/state.library';
import { Token } from '../../Models/token.model';
import { routes } from '../../routes';

type Props = {};

const state = State.getInstance();

const Navbar: FC<Props> = (props) => {
	const [menu, setMenu] = useState(false);
	const url = useURL();
	const history = useHistory();

	const logout = async () => {
		if (await Asker.notice('Are you sure you want to logout?')) {
			if (state.has('token')) {
				const hash = state.get<string>('token')!;
				const token = await new Token().where('hash', '==', md5(hash)).first();
				if (token) {
					await token.delete();
				}
			}
			state.clear();
		}
		toastr.info('You have logged out.', 'Notice');
		history.push(routes.LOGIN);
	};

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
					<li className='search-box'>
						<a className='search-toggle no-pdd-right' href='/'>
							<i className='search-icon ti-search pdd-right-10'></i>{' '}
							<i className='search-icon-close ti-close pdd-right-10'></i>
						</a>
					</li>
					<li className='search-input'>
						<input className='form-control' type='text' placeholder='Search...' />
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
								<img className='w-2r bdrs-50p' src='https://via.placeholder.com/200' alt='' />
							</div>
							<div className='peer'>
								<span className='fsz-sm c-grey-900'>Jecris</span>
							</div>
						</a>
						<ul className={`dropdown-menu fsz-sm ${outIf(menu, 'show')}`}>
							<li>
								<Link to={url(routes.PROFILE)} className='d-b td-n pY-5 bgcH-grey-100 c-grey-700'>
									<i className='ti-user mR-10'></i> <span>Profile</span>
								</Link>
							</li>
							<li>
								<a href='/' className='d-b td-n pY-5 bgcH-grey-100 c-grey-700'>
									<i className='ti-settings mR-10'></i> <span>Settings</span>
								</a>
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
