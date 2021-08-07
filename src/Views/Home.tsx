import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import logo from '../Assets/logo.svg';
import { routes } from '../routes';
import intro from '../Assets/intro.png';
import Card from '../Components/Card';

type Props = {};

const Home: FC<Props> = (props) => {
	const id = v4();
	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-light shadow' style={{ backgroundColor: '#fff' }}>
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
					</ul>
				</div>
			</nav>
			<div style={{ backgroundColor: '#1884C1' }} className='py-5'>
				<div className='container text-white'>
					<div className='row'>
						<div className='col-12 col-md-6'>
							<h1 className='display-4'>Setup your Vaccination</h1>
							<p className='lead'>
								The first step is to register for this program, which let's you schedule your vaccination.
							</p>
							<Link to={routes.REGISTER} className='btn btn-primary btn-sm rounded'>
								Register Now
							</Link>
						</div>
						<div className='col-12 col-md-6'>
							<img src={intro} alt={v4()} className='img-fluid' />
						</div>
					</div>
				</div>
			</div>
			<div className='container' style={{ marginTop: '-2.5rem' }}>
				<Card>
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
				</Card>
				<div className='row mb-5'>
					<div className='col-12 col-md-8 mt-3'>
						<Card>
							<h6 className='card-title mb-5'>Frequently Asked Questions</h6>
							<b className='text-info'>How to stay safe?</b>
							<small className='d-block text-muted'>Answer Here</small>
							<hr />
							<b className='text-info'>Paano magka jowa?</b>
							<small className='d-block text-muted'>Answer Here</small>
							<hr />
							<b className='text-info'>Paano magka mama?</b>
							<small className='d-block text-muted'>Answer Here</small>
						</Card>
					</div>
					<div className='col-12 col-md-4 mt-3'>
						<Card>
							<h6 className='card-title mb-5'>Announcements</h6>
							<b className='text-info'>How to stay safe?</b>
							<small className='d-block text-muted'>Answer Here</small>
							<hr />
							<b className='text-info'>Paano magka jowa?</b>
							<small className='d-block text-muted'>Answer Here</small>
							<hr />
							<b className='text-info'>Paano magka mama?</b>
							<small className='d-block text-muted'>Answer Here</small>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
