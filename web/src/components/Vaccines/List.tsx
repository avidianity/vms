import React, { FC, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useQuery } from 'react-query';
import { Asker } from '../../helpers';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { deleteVaccine, getVaccines, searchVaccines } from '../../queries/vaccine.query';
import { SearchEvent } from '../../events';
import { useToggle } from '@avidian/hooks';

type Props = {};

const List: FC<Props> = (props) => {
	const [search, setSearch] = useState('');
	const [isSearch, setIsSearch] = useToggle(false || search.length > 3);
	const {
		data: vaccines,
		refetch,
		isFetching,
	} = useQuery(`vaccines${isSearch ? '-search' : ''}`, !isSearch ? getVaccines : () => searchVaccines(search));

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

	const remove = async (id: any) => {
		if (await Asker.danger('Are you sure you want to delete this vaccine?')) {
			try {
				await deleteVaccine(id);
				toastr.success('Vaccine has been deleted successfully!');
			} catch (error) {
				console.error(error);
				toastr.error('Unable to delete vaccine.');
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
					title='Vaccines'
					actions={[
						<Link to='add' className='btn btn-icon btn-sm btn-primary'>
							Add Vaccine
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
					data={vaccines || []}
					columns={[
						{
							name: 'ID',
							selector: (row) => row.id,
							sortable: true,
						},
						{
							name: 'Name',
							selector: (row) => row.name,
							minWidth: '200px',
							sortable: true,
						},
						{
							name: 'Number of Doses',
							selector: (row) => row.doses,
							minWidth: '200px',
							sortable: true,
						},
						{
							name: 'Quantity',
							selector: (row) => row.quantity,
							minWidth: '100px',
							sortable: true,
						},
						{
							name: 'At Birth',
							cell: (row) =>
								row.at_birth ? (
									<i className='material-icons text-success'>check</i>
								) : (
									<i className='material-icons text-danger'>clear</i>
								),
							minWidth: '100px',
							sortable: true,
						},
						{
							name: '1 1/2 Months',
							cell: (row) =>
								row.one_month_and_a_half ? (
									<i className='material-icons text-success'>check</i>
								) : (
									<i className='material-icons text-danger'>clear</i>
								),
							minWidth: '150px',
							sortable: true,
						},
						{
							name: '2 1/2 Months',
							cell: (row) =>
								row.two_months_and_a_half ? (
									<i className='material-icons text-success'>check</i>
								) : (
									<i className='material-icons text-danger'>clear</i>
								),
							minWidth: '150px',
							sortable: true,
						},
						{
							name: '3 1/2 Months',
							cell: (row) =>
								row.three_months_and_a_half ? (
									<i className='material-icons text-success'>check</i>
								) : (
									<i className='material-icons text-danger'>clear</i>
								),
							minWidth: '150px',
							sortable: true,
						},
						{
							name: '9 Months',
							cell: (row) =>
								row.nine_months ? (
									<i className='material-icons text-success'>check</i>
								) : (
									<i className='material-icons text-danger'>clear</i>
								),
							minWidth: '100px',
							sortable: true,
						},
						{
							name: '1 Year',
							cell: (row) =>
								row.one_year ? (
									<i className='material-icons text-success'>check</i>
								) : (
									<i className='material-icons text-danger'>clear</i>
								),
							minWidth: '100px',
							sortable: true,
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
