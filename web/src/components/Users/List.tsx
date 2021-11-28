import React, { FC, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useQuery } from 'react-query';
import { Asker } from '../../helpers';
import { deleteUser, getUsers, searchUsers } from '../../queries/user.query';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { SearchEvent } from '../../events';
import { useToggle } from '@avidian/hooks';

type Props = {};

const List: FC<Props> = (props) => {
	const [search, setSearch] = useState('');
	const [isSearch, setIsSearch] = useToggle(false || search.length > 3);
	const {
		data: users,
		refetch,
		isFetching,
	} = useQuery(`users${isSearch ? '-search' : ''}`, !isSearch ? getUsers : () => searchUsers(search));

	const remove = async (id: any) => {
		if (await Asker.danger('Are you sure you want to delete this user?')) {
			try {
				await deleteUser(id);
				toastr.success('User has been deleted successfully!');
			} catch (error) {
				console.error(error);
				toastr.error('Unable to delete user.');
			} finally {
				refetch();
			}
		}
	};

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

	return (
		<div className='card'>
			<div className='card-body'>
				<DataTable
					pagination
					fixedHeader
					subHeader
					title='Users'
					actions={[
						<Link to='add' className='btn btn-icon btn-sm btn-primary'>
							Add User
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
					data={users || []}
					columns={[
						{
							name: 'ID',
							selector: (row) => row.id,
							sortable: true,
						},
						{
							name: 'Name',
							selector: (row) => row.name,
							sortable: true,
							minWidth: '250px',
						},
						{
							name: 'Email',
							selector: (row) => row.email,
							sortable: true,
							minWidth: '250px',
						},
						{
							name: 'Phone',
							selector: (row) => row.phone,
							sortable: true,
							minWidth: '150px',
						},
						{
							name: 'Role',
							cell: (row) => (
								<span className={`badge rounded-pill bg-${row.role === 'admin' ? 'success' : 'info'}`}>
									{row.role.toUpperCase()}
								</span>
							),
							sortable: true,
							minWidth: '150px',
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
								<div>
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
								</div>
							),
						},
					]}
				/>
			</div>
		</div>
	);
};

export default List;
