import dayjs from 'dayjs';
import { Collection } from 'firestore-eloquent';
import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import { UserContract } from '../../Contracts/user.contract';
import { useCollection, useURL } from '../../hooks';
import { State } from '../../Libraries/state.library';
import { Appointment } from '../../Models/appointment.model';
import { User } from '../../Models/user.model';
import { routes } from '../../routes';
import Badge from '../Badge';

type Props = {};

const state = State.getInstance();

const Sidebar: FC<Props> = (props) => {
	const url = useURL();
	const user = state.get<UserContract>('user');
	const [appointments, setAppointments] = useCollection<Appointment>();
	const [patients, setPatients] = useCollection<User>();

	const fetch = async () => {
		try {
			const appointments = await new Appointment().all();
			setAppointments(
				new Collection(
					...appointments.filter((appointment) => {
						const date = dayjs(appointment.get('created_at')).toDate();
						const now = new Date();

						return date.toDateString() === now.toDateString();
					})
				)
			);

			const patients = await new User().where('role', '==', 'Patient').all();
			setPatients(
				new Collection(
					...patients.filter((patient) => {
						const date = dayjs(patient.get('created_at')).toDate();
						const now = new Date();

						return date.toDateString() === now.toDateString();
					})
				)
			);
		} catch (_) {}
	};

	useEffect(() => {
		fetch();
		const handle = setInterval(() => fetch(), 5000);
		return () => {
			clearInterval(handle);
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className='sidebar'>
			<div className='sidebar-inner'>
				<div className='sidebar-logo'>
					<div className='peers ai-c fxw-nw'>
						<div className='peer peer-greed'>
							<Link className='sidebar-link td-n' to='/'>
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
										<h5 className='lh-1 mB-0 logo-text'>VMS</h5>
									</div>
								</div>
							</Link>
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
					{user?.role === 'Health Worker' ? (
						<>
							<li className='mT-30'>
								<Link to={routes.DASHBOARD} className='sidebar-link'>
									<span className='icon-holder'>
										<i className='c-blue-500 ti-home'></i>{' '}
									</span>
									<span className='title'>Home</span>
								</Link>
							</li>
							<li>
								<Link to={url(routes.VACCINE.ROOT)} className='sidebar-link'>
									<span className='icon-holder'>
										<i className='c-red-500 ti-pulse'></i>
									</span>
									<span className='title'>Vaccines</span>
								</Link>
							</li>
							<li>
								<Link to={url(routes.DATES)} className='sidebar-link'>
									<span className='icon-holder'>
										<i className='c-cyan-500 ti-calendar'></i>{' '}
									</span>
									<span className='title'>Available Dates</span>
								</Link>
							</li>
							<li>
								<Link to={url(routes.INCOMING.APPOINTMENT)} className='sidebar-link'>
									<span className='icon-holder'>
										<i className='c-purple-500 ti-list'></i>{' '}
									</span>
									<span className='title'>
										Appointments
										{appointments.length > 0 ? <Badge type='danger'>{appointments.length}</Badge> : null}
									</span>
								</Link>
							</li>
							<li>
								<Link to={url(routes.HEALTH_WORKERS)} className='sidebar-link'>
									<span className='icon-holder'>
										<i className='c-green-500 ti-user'></i>{' '}
									</span>
									<span className='title'>Health Workers</span>
								</Link>
							</li>
							<li>
								<Link to={url(routes.PATIENTS)} className='sidebar-link'>
									<span className='icon-holder'>
										<i className='c-blue-500 ti-user'></i>{' '}
									</span>
									<span className='title'>
										Patients
										{patients.length > 0 ? <Badge type='danger'>{patients.length}</Badge> : null}
									</span>
								</Link>
							</li>
							<li>
								<Link to={url(routes.ANNOUNCEMENTS)} className='sidebar-link'>
									<span className='icon-holder'>
										<i className='c-light-blue-300 material-icons'>announcements</i>{' '}
									</span>
									<span className='title'>Announcements</span>
								</Link>
							</li>
						</>
					) : null}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
