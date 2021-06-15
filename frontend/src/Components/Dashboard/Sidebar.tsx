import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import { useURL } from '../../hooks';
import { routes } from '../../routes';

type Props = {};

const Sidebar: FC<Props> = (props) => {
	const url = useURL();

	return (
		<div className='sidebar'>
			<div className='sidebar-inner'>
				<div className='sidebar-logo'>
					<div className='peers ai-c fxw-nw'>
						<div className='peer peer-greed'>
							<a className='sidebar-link td-n' href='index.html'>
								<div className='peers ai-c fxw-nw'>
									<div className='peer'>
										<div className='logo d-flex align-items-center justify-content-center'>
											<img
												src={logo}
												alt='VMS'
												style={{
													width: '40px',
													height: '40px',
												}}
											/>
										</div>
									</div>
									<div className='peer peer-greed'>
										<h5 className='lh-1 mB-0 logo-text'>
											VMS
										</h5>
									</div>
								</div>
							</a>
						</div>
						<div className='peer'>
							<div className='mobile-toggle sidebar-toggle'>
								<a
									href='/'
									className='td-n'
									onClick={(e) => {
										e.preventDefault();
										const root = $('#root');
										if (root.hasClass('is-collapsed')) {
											root.removeClass('is-collapsed');
										} else {
											root.addClass('is-collapsed');
										}
									}}>
									<i className='ti-arrow-circle-left'></i>
								</a>
							</div>
						</div>
					</div>
				</div>
				<ul className='sidebar-menu scrollable pos-r'>
					<li className='nav-item mT-30 actived'>
						<Link to={routes.DASHBOARD} className='sidebar-link'>
							<span className='icon-holder'>
								<i className='c-blue-500 ti-home'></i>{' '}
							</span>
							<span className='title'>Home</span>
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							to={url(routes.FORMS.ROOT)}
							className='sidebar-link'>
							<span className='icon-holder'>
								<i className='c-light-blue-500 ti-pencil'></i>{' '}
							</span>
							<span className='title'>Forms</span>
						</Link>
					</li>
					<li className='nav-item dropdown open'>
						<a
							href='/'
							className='sidebar-link cursor-normal'
							onClick={(e) => e.preventDefault()}>
							<span className='icon-holder'>
								<i className='c-red-500 ti-pulse'></i>
							</span>
							<span className='title'>Vaccines</span>
							<span className='arrow'>
								<i className='ti-angle-right'></i>
							</span>
						</a>
						<ul className='dropdown-menu d-block'>
							<li>
								<Link
									to={url(routes.VACCINE.TYPES)}
									className='sidebar-link'>
									Vaccine Types
								</Link>
							</li>
							<li>
								<Link
									to={url(routes.VACCINE.BATCH)}
									className='sidebar-link'>
									Batch
								</Link>
							</li>
							<li>
								<Link
									to={url(routes.VACCINE.QUEUE)}
									className='sidebar-link'>
									Vaccine Queue
								</Link>
							</li>
						</ul>
					</li>
					<li className='nav-item dropdown open'>
						<a
							href='/'
							className='sidebar-link cursor-normal'
							onClick={(e) => e.preventDefault()}>
							<span className='icon-holder'>
								<i className='c-green-500 ti-shift-right-alt'></i>
							</span>
							<span className='title'>Incoming</span>
							<span className='arrow'>
								<i className='ti-angle-right'></i>
							</span>
						</a>
						<ul className='dropdown-menu d-block'>
							<li>
								<Link
									to={url(routes.INCOMING.RESIDENTS)}
									className='sidebar-link'>
									Resident
								</Link>
							</li>
							<li>
								<Link
									to={url(routes.INCOMING.ELIGIBILITY)}
									className='sidebar-link'>
									Eligibility
								</Link>
							</li>
							<li>
								<Link
									to={url(routes.INCOMING.RECOMMENDATION)}
									className='sidebar-link'>
									Recommenddation
								</Link>
							</li>
							<li>
								<Link
									to={url(routes.INCOMING.APPOINTMENT)}
									className='sidebar-link'>
									Appointment
								</Link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
