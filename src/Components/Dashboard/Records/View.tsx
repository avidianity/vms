import dayjs from 'dayjs';
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { UserContract } from '../../../Contracts/user.contract';
import { useCollection, useNullable } from '../../../hooks';
import { Appointment } from '../../../Models/appointment.model';
import Card from '../../Card';

type Props = {};

const View: FC<Props> = () => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	const [patient, setPatient] = useNullable<UserContract>();
	const [appointments, setAppointments] = useCollection<Appointment>();

	const fetch = async () => {
		try {
			const appointment = await new Appointment().findOneOrFail(id);
			await appointment.load(['patient']);
			const patient = appointment.get('patient')!;
			setPatient(patient);
			const appointments = await new Appointment().where('patient_id', '==', patient?.id!).getAll();
			await appointments.load(['vaccine', 'attendee']);
			setAppointments(appointments);
		} catch (error) {
			console.log(error);
			toastr.error(`Unable to fetch record.`);
			history.goBack();
		}
	};

	useEffect(() => {
		fetch();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='container'>
			<Card>
				<>
					<h4>{patient?.name}</h4>
					<p>{patient?.email}</p>
					<p>Sex: {patient?.gender}</p>
					<p>Birthday: {dayjs(patient?.birthday).format('MMMM DD, YYYY')}</p>
					<p>Address: {patient?.address}</p>
					<p>Phone: {patient?.phone}</p>
					<p>Appoinments</p>
					<div className='container-fluid'>
						<div className='row'>
							{appointments.map((appointment, index) => (
								<div className='col-12 col-md-6 col-lg-4 col-xl-3' key={index}>
									<Card>
										<p>Vaccine: {appointment.get('vaccine')?.name || 'Pending'}</p>
										<p>Attendee: {appointment.get('attendee')?.name || 'N/A'}</p>
										<p>Date Created: {dayjs(appointment.get('created_at')).format('MMMM DD, YYYY hh:mm A')}</p>
										<h6>Doses Done:</h6>
										{appointment.get('dates').map((date, index) => (
											<p key={index}>{dayjs(date).format('MMMM DD, YYYY')}</p>
										))}
									</Card>
								</div>
							))}
						</div>
					</div>
				</>
			</Card>
		</div>
	);
};

export default View;
