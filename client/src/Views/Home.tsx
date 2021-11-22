import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { routes } from '../routes';
import intro from '../Assets/landing.gif';
import Navbar from '../Components/Home/Navbar';
import Announcements from '../Components/Announcements';
import Program from '../Components/Program';

type Props = {};

const Home: FC<Props> = (props) => {
	return (
		<>
			<Navbar />
			<div style={{ backgroundColor: '#25B7E1' }} className='py-5'>
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
						<div className='col-12 col-md-6 text-center'>
							<img src={intro} alt={v4()} className='img-fluid' />
						</div>
					</div>
				</div>
			</div>
			<div className='container' style={{ marginTop: '-2.5rem' }}>
				<Program />
				<div className='row mb-5'>
					<div className='col-12 col-md-4 mt-3'>
						<Announcements />
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
