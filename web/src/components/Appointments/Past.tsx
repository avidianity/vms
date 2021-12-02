import React, { FC, useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { getAppointments, searchAppointments } from '../../queries/appointment.query';
import { SearchEvent } from '../../events';
import { useToggle } from '@avidian/hooks';
import { AuthContext } from '../../contexts';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';

type Props = {};

const Past: FC<Props> = (props) => {
	const [search, setSearch] = useState('');
	const [isSearch, setIsSearch] = useToggle(false || search.length > 3);
	const { user } = useContext(AuthContext);
	const { data, refetch, isFetching } = useQuery(
		`appointments${isSearch ? '-search' : ''}`,
		!isSearch ? getAppointments : () => searchAppointments(search)
	);

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

	const appointments = data?.filter((item) => item.done);

	return (
		<div className='card'>
			<div className='card-body'>
				<DataTable
					pagination
					fixedHeader
					subHeader
					title='Past Appointments'
					actions={[
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
								<Link to={`${routes.DASHBOARD}/${routes.APPOINTMENTS}/${row.id}/view`} className='mx-1'>
									<i className='material-icons'>visibility</i>
								</Link>
							),
							minWidth: '100px',
						},
					]}
				/>
			</div>
		</div>
	);
};

export default Past;
