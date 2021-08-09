import React, { FC } from 'react';
import Announcements from '../Components/Announcements';
import Card from '../Components/Card';
import FAQs from '../Components/FAQs';
import Navbar from '../Components/Home/Navbar';
import { UserContract } from '../Contracts/user.contract';
import { useAuthenticate } from '../hooks';
import { State } from '../Libraries/state.library';

type Props = {};

const state = State.getInstance();

const Patient: FC<Props> = (props) => {
	const user = state.get<UserContract>('user');
	const { authenticated } = useAuthenticate();

	if (!authenticated) {
		return null;
	}

	return (
		<>
			<Navbar />
			<div style={{ backgroundColor: '#1884C1' }} className='py-5'>
				<div className='container text-white'>
					<div className='row'>
						<div className='col-12 col-md-8'>
							<h1>Welcome back, {user?.name}</h1>
							<p className='lead'>Welcome to Vaccine Monitoring and Scheduling System</p>
						</div>
					</div>
				</div>
			</div>
			<div className='container' style={{ marginTop: '-2.5rem' }}>
				<div className='row mt-3'>
					<div className='col-12 col-md-8 h-100'>
						<Card className='mb-3'>
							<h3>Upcoming Appointments</h3>
							<p>You don't have any upcoming appointments.</p>
							<div className='mt-5'>
								<h4 className='d-flex align-items-center'>
									<i className='material-icons mr-1'>check</i>
									Before you arrive
								</h4>
								<ol>
									<li>Bring identification</li>
									<li>Bring a facial mask</li>
									<li>Check your email for any updates</li>
								</ol>
							</div>
						</Card>
						<FAQs className='mt-3' />
					</div>
					<div className='col-12 col-md-4'>
						<div className='container-fluid'>
							<div className='row'>
								<div className='col-12'>
									<Card className='mb-3'>
										<h5>Past Appointments</h5>
										<div className='mt-3 text-center'>
											<p>You don't have any past appointments</p>
										</div>
									</Card>
									<Card className='my-3'>
										<h5>Next Step</h5>
										<div className='text-center'>
											<i
												className='material-icons text-warning border rounded-circle shadow-sm p-1 mb-2'
												style={{ fontSize: '3rem' }}>
												checklist
											</i>
											<h6>Update us on your health</h6>
											<p>Any updates about side effects you may have can benefit science.</p>
										</div>
									</Card>
									<Announcements />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Patient;
