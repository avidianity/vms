import axios from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts';
import { Asker } from '../../helpers';
import { routes } from '../../routes';
import { SearchEvent } from '../../events';
import { useToggle } from '@avidian/hooks';

type Props = {};

const Navbar: FC<Props> = (props) => {
	const { token } = useContext(AuthContext);
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [enableSearch, setEnableSearch] = useToggle(false);

	const logout = async () => {
		if (await Asker.danger('Are you sure you want to logout?')) {
			await axios.post('/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } }).catch(console.log);
			toastr.success('Logged out successfully!');
			navigate(routes.LOGIN);
		}
	};

	useEffect(() => {
		const key = SearchEvent.on<boolean>('toggle', (value) => {
			setSearch('');
			setEnableSearch(value);
		});

		return () => {
			SearchEvent.off(key);
		};
		// eslint-disable-next-line
	}, []);

	return (
		<nav className='navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl' id='navbarBlur' navbar-scroll='true'>
			<div className='container-fluid py-2 px-3'>
				<nav aria-label='breadcrumb'>
					<h6 className='font-weight-bolder mb-0'>Dashboard</h6>
				</nav>
				<div className='collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4' id='navbar'>
					<div className='ms-md-auto pe-md-3 d-flex align-items-center'>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								SearchEvent.dispatch('search', search);
							}}>
							<div className={`input-group input-group-outline ${search.length > 0 ? 'is-filled' : ''}`}>
								<label className='form-label'>Search</label>
								<input
									type='search'
									className='form-control'
									onChange={(e) => {
										setSearch(e.target.value);
										SearchEvent.dispatch('search', e.target.value);
									}}
									value={search}
									onFocus={(e) => {
										e.target.parentElement?.classList.add('focused', 'is-focused');
									}}
									onBlur={(e) => {
										e.target.parentElement?.classList.remove('focused', 'is-focused');
									}}
									disabled={!enableSearch}
								/>
							</div>
						</form>
					</div>
					<ul className='navbar-nav justify-content-end'>
						<li className='nav-item d-xl-none ps-3 d-flex align-items-center'>
							<a
								href='/'
								className='nav-link text-body p-0'
								id='iconNavbarSidenav'
								onClick={(e) => {
									e.preventDefault();
								}}>
								<div className='sidenav-toggler-inner'>
									<i className='sidenav-toggler-line'></i>
									<i className='sidenav-toggler-line'></i>
									<i className='sidenav-toggler-line'></i>
								</div>
							</a>
						</li>
						<li className='nav-item dropdown pe-2 d-flex align-items-center'>
							<a
								href='/'
								className='nav-link text-body p-0 ps-2'
								id='dropdownMenuButton'
								data-bs-toggle='dropdown'
								aria-expanded='false'>
								<i className='fa fa-bell cursor-pointer'></i>
							</a>
							<ul className='dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4' aria-labelledby='dropdownMenuButton'>
								<li className='mb-2'>
									<a className='dropdown-item border-radius-md' href='/'>
										<div className='d-flex py-1'>
											<div className='my-auto'>
												<img src='/assets/img/team-2.jpg' className='avatar avatar-sm me-3' alt='' />
											</div>
											<div className='d-flex flex-column justify-content-center'>
												<h6 className='text-sm font-weight-normal mb-1'>
													<span className='font-weight-bold'>New message</span> from Laur
												</h6>
												<p className='text-xs text-secondary mb-0'>
													<i className='fa fa-clock me-1'></i>
													13 minutes ago
												</p>
											</div>
										</div>
									</a>
								</li>
								<li className='mb-2'>
									<a className='dropdown-item border-radius-md' href='/'>
										<div className='d-flex py-1'>
											<div className='my-auto'>
												<img
													src='/assets/img/small-logos/logo-spotify.svg'
													className='avatar avatar-sm bg-gradient-dark me-3'
													alt=''
												/>
											</div>
											<div className='d-flex flex-column justify-content-center'>
												<h6 className='text-sm font-weight-normal mb-1'>
													<span className='font-weight-bold'>New album</span> by Travis Scott
												</h6>
												<p className='text-xs text-secondary mb-0'>
													<i className='fa fa-clock me-1'></i>1 day
												</p>
											</div>
										</div>
									</a>
								</li>
								<li>
									<a className='dropdown-item border-radius-md' href='/'>
										<div className='d-flex py-1'>
											<div className='avatar avatar-sm bg-gradient-secondary me-3 my-auto'>
												<svg
													width='12px'
													height='12px'
													viewBox='0 0 43 36'
													version='1.1'
													xmlns='http://www.w3.org/2000/svg'
													xmlnsXlink='http://www.w3.org/1999/xlink'>
													<title>credit-card</title>
													<g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
														<g
															transform='translate(-2169.000000, -745.000000)'
															fill='#FFFFFF'
															fillRule='nonzero'>
															<g transform='translate(1716.000000, 291.000000)'>
																<g transform='translate(453.000000, 454.000000)'>
																	<path
																		className='color-background'
																		d='M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z'
																		opacity='0.593633743'></path>
																	<path
																		className='color-background'
																		d='M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z'></path>
																</g>
															</g>
														</g>
													</g>
												</svg>
											</div>
											<div className='d-flex flex-column justify-content-center'>
												<h6 className='text-sm font-weight-normal mb-1'>Payment successfully completed</h6>
												<p className='text-xs text-secondary mb-0'>
													<i className='fa fa-clock me-1'></i>2 days
												</p>
											</div>
										</div>
									</a>
								</li>
							</ul>
						</li>
						<li className='nav-item d-flex align-items-center ms-3'>
							<a
								href='/logout'
								className='nav-link text-body font-weight-bold px-0'
								onClick={(e) => {
									e.preventDefault();
									logout();
								}}>
								<i className='fa fa-user me-sm-1'></i>
								<span className='d-sm-inline d-none'>Logout</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
