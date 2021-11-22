import React, { FC } from 'react';
import Card from './Card';

type Props = {};

const Program: FC<Props> = (props) => {
	return (
		<Card>
			<h4 className='card-title'>How this program works</h4>
			<hr className='my-3' />
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-12 col-md-6 col-lg-3 text-center'>
						<i className='material-icons text-primary border rounded-circle shadow-sm p-1 mb-2' style={{ fontSize: '3rem' }}>
							inventory
						</i>
						<h5>Register</h5>
						<p>This program let's you setup and track your vaccination.</p>
					</div>
					<div className='col-12 col-md-6 col-lg-3 text-center'>
						<i className='material-icons text-info border rounded-circle shadow-sm p-1 mb-2' style={{ fontSize: '3rem' }}>
							folder_open
						</i>
						<h5>Enter your Personal Info</h5>
						<p>Your age and other factors can affect the timing of your vaccination.</p>
					</div>
					<div className='col-12 col-md-6 col-lg-3 text-center'>
						<i className='material-icons text-success border rounded-circle shadow-sm p-1 mb-2' style={{ fontSize: '3rem' }}>
							event
						</i>
						<h5>Schedule the Vaccination</h5>
						<p>We'll look for openings and book appointments on your behalf.</p>
					</div>
					<div className='col-12 col-md-6 col-lg-3 text-center'>
						<i className='material-icons text-warning border rounded-circle shadow-sm p-1 mb-2' style={{ fontSize: '3rem' }}>
							checklist
						</i>
						<h5>Update us on your health</h5>
						<p>Any updates about side effects you may have can benefit science.</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default Program;
