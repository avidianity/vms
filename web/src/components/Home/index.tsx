import React, { FC, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import logo from '../../assets/img/logo.svg';
import { AuthContext } from '../../contexts';
import { routes } from '../../routes';
import intro from '../../assets/img/landing.gif';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { getAnnouncements } from '../../queries/announcement.query';

type Props = {};

const Home: FC<Props> = (props) => {
	const { data: announcements } = useQuery('announcements', getAnnouncements);
	const { user } = useContext(AuthContext);

	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-light bg-light'>
				<div className='container-fluid'>
					<Link className='navbar-brand' to={routes.HOME}>
						<img src={logo} alt='VMS' width='30' height='24' className='me-2' />
						VMS
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
							{user ? (
								<li className='nav-item'>
									<Link className='nav-link' to={routes.DASHBOARD}>
										Dashboard
									</Link>
								</li>
							) : (
								<>
									<li className='nav-item'>
										<Link className='nav-link' to={routes.LOGIN}>
											Login
										</Link>
									</li>
									<li className='nav-item'>
										<Link className='nav-link' to={routes.REGISTER}>
											Register
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
			<div style={{ backgroundColor: '#25B7E1' }} className='py-5'>
				<div className='container text-white'>
					<div className='row'>
						<div className='col-12 col-md-6'>
							<h1 className='display-4 text-white'>Setup your Vaccination</h1>
							<p className='lead'>
								The first step is to register for this program, which let's you schedule your vaccination.
							</p>
							<Link to={routes.REGISTER} className='btn btn-primary btn-sm rounded'>
								Register Now
							</Link>
						</div>
						<div className='col-12 col-md-6 text-center'>
							<img src={intro} alt={v4()} className='img-fluid' />
						</div>
					</div>
				</div>
			</div>
			<div className='container' style={{ marginTop: '-2.5rem' }}>
				<div className='card border-0 shadow'>
					<div className='card-body'>
						<h4 className='card-title'>How this program works</h4>
						<hr className='my-3' />
						<div className='container-fluid'>
							<div className='row'>
								<div className='col-12 col-md-6 col-lg-3 text-center'>
									<i
										className='material-icons text-primary border rounded-circle shadow-sm p-1 mb-2'
										style={{ fontSize: '3rem' }}>
										inventory
									</i>
									<h5>Register</h5>
									<p>This program let's you setup and track your vaccination.</p>
								</div>
								<div className='col-12 col-md-6 col-lg-3 text-center'>
									<i
										className='material-icons text-info border rounded-circle shadow-sm p-1 mb-2'
										style={{ fontSize: '3rem' }}>
										folder_open
									</i>
									<h5>Enter your Personal Info</h5>
									<p>Your age and other factors can affect the timing of your vaccination.</p>
								</div>
								<div className='col-12 col-md-6 col-lg-3 text-center'>
									<i
										className='material-icons text-success border rounded-circle shadow-sm p-1 mb-2'
										style={{ fontSize: '3rem' }}>
										event
									</i>
									<h5>Schedule the Vaccination</h5>
									<p>We'll look for openings and book appointments on your behalf.</p>
								</div>
								<div className='col-12 col-md-6 col-lg-3 text-center'>
									<i
										className='material-icons text-warning border rounded-circle shadow-sm p-1 mb-2'
										style={{ fontSize: '3rem' }}>
										checklist
									</i>
									<h5>Update us on your health</h5>
									<p>Any updates about side effects you may have can benefit science.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='row mb-5'>
					<div className='col-12 mt-3'>
						<div className='card shadow border-0'>
							<div className='card-body'>
								<h6 className='card-title mb-5'>Announcements</h6>
								{announcements?.map((item, index) => (
									<div className='card border-0 shadow-lg my-2' key={index}>
										<div className='card-body'>
											<b className='text-info'>{item.title}</b>
											<small className='d-block text-muted' style={{ fontSize: '10px' }}>
												{dayjs(item.updated_at).fromNow()}
											</small>
											<small
												className='d-block text-muted'
												dangerouslySetInnerHTML={{ __html: item.description }}></small>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
