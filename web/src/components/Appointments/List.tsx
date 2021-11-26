import React, { FC, useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useQuery } from 'react-query';
import { Asker } from '../../helpers';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { deleteAppointment, getAppointments, searchAppointments, updateAppointment } from '../../queries/appointment.query';
import { SearchEvent } from '../../events';
import { useToggle } from '@avidian/hooks';
import { AuthContext } from '../../contexts';

type Props = {};

const List: FC<Props> = (props) => {
	const [search, setSearch] = useState('');
	const [isSearch, setIsSearch] = useToggle(false || search.length > 3);
	const { user } = useContext(AuthContext);
	const {
		data: appointments,
		refetch,
		isFetching,
	} = useQuery(`appointments${isSearch ? '-search' : ''}`, !isSearch ? getAppointments : () => searchAppointments(search));

	useEffect(() => {
		SearchEvent.dispatch('toggle', true);
		const key = SearchEvent.on<string>('search', (keyword) => {
			if (keyword.length > 3) {
				setIsSearch(true);
				setSearch(keyword);
			} else {
				setIsSearch(false);
				setSearch('');
			}
			refetch();
		});
		return () => {
			SearchEvent.dispatch('toggle', false);
			SearchEvent.off(key);
		};
		// eslint-disable-next-line
	}, []);

	const assign = async (id: any) => {
		if (await Asker.notice('Are you sure you want to assign yourself to this appointment as an attendee?')) {
			try {
				await updateAppointment(id, { attendee_id: user?.id });
				toastr.success('Assigned to an appointment as attendee successfully!');
			} catch (error) {
				console.error(error);
				toastr.error('Unable to assign self to appointment.');
			} finally {
				await refetch();
			}
		}
	};

	const remove = async (id: any) => {
		if (await Asker.danger('Are you sure you want to delete this appointment?')) {
			try {
				await deleteAppointment(id);
				toastr.success('Appointment has been deleted successfully!');
			} catch (error) {
				console.error(error);
				toastr.error('Unable to delete appointment.');
			} finally {
				refetch();
			}
		}
	};

	return (
		<div className='card'>
			<div className='card-body'>
				<DataTable
					pagination
					fixedHeader
					subHeader
					title='Appointments'
					actions={[
						<Link to='add' className='btn btn-icon btn-sm btn-primary'>
							Add Appointment
						</Link>,
						<button
							className='btn btn-info btn-sm'
							onClick={(e) => {
								e.preventDefault();
								refetch();
							}}
							disabled={isFetching}>
							{isFetching ? 'Refreshing' : 'Refresh'}
						</button>,
					]}
					data={appointments || []}
					columns={[
						{
							name: 'ID',
							selector: (row) => row.id,
							sortable: true,
						},
						{
							name: 'Attendee',
							cell: (row) => (
								<>
									{row.attendee?.name || 'N/A'}{' '}
									{row.attendee_id === user?.id ? <span className='badge rounded-pill bg-success ms-1'>me</span> : ''}
								</>
							),
							sortable: true,
							minWidth: '200px',
						},
						{
							name: "Child's Name",
							selector: (row) => row.child,
							sortable: true,
							minWidth: '200px',
						},
						{
							name: "Father's Name",
							selector: (row) => row.father,
							sortable: true,
							minWidth: '200px',
						},
						{
							name: "Mother's Name",
							selector: (row) => row.mother,
							sortable: true,
							minWidth: '200px',
						},
						{
							name: 'Birthday',
							selector: (row) => dayjs(row.birthday).format('MMMM DD, YYYY'),
							minWidth: '150px',
						},
						{
							name: 'Place of Birth',
							selector: (row) => row.place_of_birth,
							sortable: true,
							minWidth: '400px',
						},
						{
							name: 'Sex',
							selector: (row) => row.sex,
							sortable: true,
						},
						{
							name: 'Height',
							selector: (row) => row.height,
							sortable: true,
						},
						{
							name: 'Weight',
							selector: (row) => row.weight,
							sortable: true,
						},
						{
							name: 'User',
							selector: (row) => row.user?.name || 'N/A',
							sortable: true,
							minWidth: '200px',
						},
						{
							name: 'Created',
							selector: (row) => dayjs(row.created_at).format('MMMM DD, YYYY hh:mm A'),
							minWidth: '250px',
						},
						{
							name: 'Modified',
							selector: (row) => dayjs(row.updated_at).format('MMMM DD, YYYY hh:mm A'),
							minWidth: '250px',
						},
						{
							name: 'Actions',
							cell: (row) => (
								<>
									{!row.attendee_id ? (
										<a
											href='assign'
											onClick={(e) => {
												e.preventDefault();
												assign(row.id);
											}}
											className='mx-1'>
											<i className='material-icons'>assignment</i>
										</a>
									) : null}
									{row.attendee_id === user?.id ? (
										<Link to={`${row.id}/view`} className='mx-1'>
											<i className='material-icons'>visibility</i>
										</Link>
									) : null}
									<Link to={`${row.id}/edit`} className='mx-1'>
										<i className='material-icons'>edit</i>
									</Link>
									<a
										href='delete'
										onClick={(e) => {
											e.preventDefault();
											remove(row.id);
										}}
										className='mx-1'>
										<i className='material-icons'>delete</i>
									</a>
								</>
							),
							minWidth: '150px',
						},
					]}
				/>
			</div>
		</div>
	);
};

export default List;
