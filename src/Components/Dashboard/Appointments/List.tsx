import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router';
import { AppointmentContract } from '../../../Contracts/appointment.contract';
import { UserContract } from '../../../Contracts/user.contract';
import { Asker, outIf } from '../../../helpers';
import { useCollection, useURL } from '../../../hooks';
import { State } from '../../../Libraries/state.library';
import { Appointment } from '../../../Models/appointment.model';
import { routes } from '../../../routes';
import Card from '../../Card';
import Tooltip from '../Tooltip';

type Props = {};

const state = State.getInstance();

const List: FC<Props> = (props) => {
	const query = new Appointment();
	const user = state.get<UserContract>('user');
	const [appointments, setAppointments] = useCollection<Appointment, AppointmentContract>();
	const [fetching, setFetching] = useState(false);
	const history = useHistory();
	const url = useURL();

	const exportAsECCDCard = (id: any) => {
		history.push(`${routes.ECCD}/${id}`);
	};

	const get = async () => {
		setFetching(true);
		try {
			const appointments = await query.all();
			setAppointments(await appointments.load(['vaccine', 'patient', 'attendee']));
		} catch (error) {
			console.log(error);
			toastr.error('Unable to fetch Appointments.', 'Oops!');
		} finally {
			setFetching(false);
		}
	};

	const remove = async (id: string) => {
		try {
			if (await Asker.danger('Are you sure you want to delete this Appointment?')) {
				const appointment = await new Appointment().findOneOrFail(id);
				await appointment.delete();

				toastr.success('Appointment deleted successfully.');

				await get();
			}
		} catch (error) {
			console.error(error);
			toastr.error('Unable to delete Appointment.', 'Oops!');
		}
	};

	const assign = async (appointment: Appointment) => {
		try {
			appointment.set('attendee_id', user?.id!);
			await appointment.save();
			toastr.success('Assigned self to appointment successfully.');
			await get();
		} catch (error) {
			console.log(error);
			toastr.error('Unable to assign self to appointment');
		}
	};

	useEffect(() => {
		get();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='container'>
			<Card>
				<DataTable
					title='Available Appointments'
					actions={[
						<i
							className={`material-icons clickable d-none`}
							onClick={(e) => {
								e.preventDefault();
								history.push(url('/add'));
							}}
							data-tip='Add'>
							add
						</i>,
						<i
							className={`material-icons ${outIf(fetching, 'spin-slow')} clickable`}
							onClick={(e) => {
								e.preventDefault();
								get();
							}}
							data-tip='Refresh'>
							refresh
						</i>,
					]}
					columns={[
						{
							name: 'ID',
							selector: (row) => row.get('id'),
							minWidth: '200px',
						},
						{
							name: 'Vaccine',
							selector: (row) => row.get('vaccine')?.name || 'N/A',
							minWidth: '200px',
							sortable: true,
						},
						{
							name: 'Attendee',
							selector: (row) => row.get('attendee')?.name || 'N/A',
							minWidth: '300px',
							sortable: true,
						},
						{
							name: 'Name of Appointer',
							selector: (row) => row.get('patient')?.name || 'N/A',
							minWidth: '300px',
							sortable: true,
						},
						{
							name: 'Child Name',
							selector: (row) => row.get('name_of_child'),
							minWidth: '300px',
							sortable: true,
						},
						{
							name: 'Gender',
							selector: (row) => row.get('gender'),
							minWidth: '100px',
							sortable: true,
						},
						{
							name: 'Date of Birth',
							selector: (row) => dayjs(row.get('date_of_birth')).format('MMMM DD, YYYY'),
							minWidth: '250px',
							sortable: true,
						},
						{
							name: 'Height',
							selector: (row) => row.get('height'),
							minWidth: '100px',
							sortable: true,
						},
						{
							name: 'Weight',
							selector: (row) => row.get('weight'),
							minWidth: '100px',
							sortable: true,
						},
						{
							name: "Mother's Name",
							selector: (row) => row.get('mother'),
							minWidth: '300px',
							sortable: true,
						},
						{
							name: 'Done',
							cell: (row) => (
								<span className={`badge badge-${row.get('done') ? 'success' : 'danger'}`}>
									{row.get('done') ? 'Yes' : 'No'}
								</span>
							),
							minWidth: '250px',
							sortable: true,
						},
						{
							name: 'Meetings Done',
							cell: (row) => (
								<>
									{row.get('dates').map((date, index) => (
										<span className='d-block' key={index}>
											{dayjs(date).format('MMMM DD, YYYY')}
										</span>
									))}
								</>
							),
							minWidth: '250px',
							sortable: true,
						},
						{
							name: 'Created',
							selector: (row) => dayjs(row.get('created_at')).format('MMMM DD, YYYY hh:mm A'),
							minWidth: '250px',
							sortable: true,
						},
						{
							name: 'Actions',
							cell: (row) => (
								<>
									{!row.get('attendee') ? (
										<i
											className='material-icons clickable mx-1'
											onClick={(e) => {
												e.preventDefault();
												assign(row);
											}}
											data-tip='Assign Self'>
											assignment_ind
										</i>
									) : null}
									<i
										className='material-icons clickable mx-1'
										onClick={(e) => {
											e.preventDefault();
											exportAsECCDCard(row.id());
										}}
										data-tip='Export as ECCD Card'>
										picture_as_pdf
									</i>
									<i
										className='material-icons clickable mx-1'
										onClick={(e) => {
											e.preventDefault();
											history.push(url(`/${row.id()}/edit`));
										}}
										data-tip='Edit'>
										edit
									</i>
									<i
										className='material-icons clickable mx-1'
										data-tip='Delete'
										onClick={(e) => {
											e.preventDefault();
											remove(row.id());
										}}>
										delete
									</i>
								</>
							),
							minWidth: '150px',
						},
					]}
					data={appointments}
				/>
			</Card>
			<Tooltip />
		</div>
	);
};

export default List;
