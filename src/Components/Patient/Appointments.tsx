import dayjs from 'dayjs';
import React, { FC, useEffect } from 'react';
import { manager } from '../../constants';
import { UserContract } from '../../Contracts/user.contract';
import { Asker, getAppointments } from '../../helpers';
import { useCollection } from '../../hooks';
import { firestore } from '../../Libraries/firebase.library';
import { State } from '../../Libraries/state.library';
import { Appointment } from '../../Models/appointment.model';
import Card from '../Card';
import Tooltip from '../Dashboard/Tooltip';

type Props = {};

const state = State.getInstance();

const Appointments: FC<Props> = (props) => {
	const user = state.get<UserContract>('user');
	const [appointments, setAppointments] = useCollection<Appointment>();

	const get = async () => {
		setAppointments(await getAppointments());
	};

	const remove = async (id: string) => {
		try {
			if (await Asker.danger('Are you sure you want to delete this appointment?')) {
				await firestore.collection('appointments').doc(id).delete();
				toastr.success('Appointment deleted successfully.');

				get();
			}
		} catch (error) {
			console.log(error);
			toastr.error('Unable to delete appointment.');
		}
	};

	useEffect(() => {
		get();

		const key = manager.listen('appointments', setAppointments);

		return () => {
			manager.unlisten(key);
		};
		//eslint-disable-next-line
	}, []);

	return (
		<>
			<Card className='mb-3'>
				<h3 className='mb-4'>Upcoming Appointments</h3>
				{appointments.length > 0 ? (
					<div className='row'>
						{appointments.map((appointment, index) => (
							<div className='col-12 col-md-6' key={index}>
								<Card>
									<div className='d-flex align-items-center'>
										<h5>Vaccine: {appointment.get('vaccine')?.name}</h5>
										<button
											className='btn btn-danger btn-sm ml-auto'
											data-tip='Delete'
											onClick={(e) => {
												e.preventDefault();
												remove(appointment.id());
											}}>
											<i className='fas fa-trash'></i>
										</button>
									</div>
									<p className='mb-0'>
										Attendee: {appointment.get('attendee') ? appointment.get('attendee')?.name : 'N/A'}
									</p>
									<p className='mb-0'>Patient: {user?.name}</p>
									<div>
										Dates:{' '}
										<div className='row'>
											{appointment.get('vaccine')?.dates?.map((date, parentIndex) =>
												date.dates.map((date, childIndex) => (
													<div className='col-12 col-md-6' key={`${parentIndex}-${childIndex}`}>
														{dayjs(date).format('MMMM DD, YYYY')}
													</div>
												))
											)}
										</div>
									</div>
									{appointment.get('dates').length > 0 ? (
										<p className='mb-0'>
											Dates Done:{' '}
											{appointment.get('dates').map((date, index) => (
												<span className='mx-1' key={index}>
													{dayjs(date).format('MMMM DD, YYY')}
												</span>
											))}
										</p>
									) : null}
									<p className='mb-0'>Done: {appointment.get('done') ? 'Yes' : 'No'}</p>
								</Card>
							</div>
						))}
					</div>
				) : (
					<p>You don't have any upcoming appointments.</p>
				)}
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
			<Tooltip />
		</>
	);
};

export default Appointments;
