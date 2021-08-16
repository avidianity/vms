import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router';
import { Asker, outIf } from '../../../helpers';
import { useCollection, useURL } from '../../../hooks';
import { Date } from '../../../Models/date.model';
import Card from '../../Card';
import Tooltip from '../Tooltip';

type Props = {};

const List: FC<Props> = (props) => {
	const query = new Date();
	const [dates, setDates] = useCollection<Date>();
	const [fetching, setFetching] = useState(false);
	const history = useHistory();
	const url = useURL();

	const get = async () => {
		setFetching(true);
		try {
			const dates = await query.all();
			setDates(await dates.load(['vaccine']));
		} catch (error) {
			console.log(error);
			toastr.error('Unable to fetch Dates.', 'Oops!');
		} finally {
			setFetching(false);
		}
	};

	const remove = async (id: string) => {
		try {
			if (await Asker.danger('Are you sure you want to delete this Date?')) {
				const date = await new Date().findOne(id);
				await date?.delete();

				toastr.success('Date deleted successfully.');

				await get();
			}
		} catch (error) {
			console.error(error);
			toastr.error('Unable to delete Date.', 'Oops!');
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
					title='Available Dates'
					actions={[
						<i
							className={`material-icons clickable`}
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
							selector: (row) => row.get('vaccine')?.name,
							minWidth: '200px',
							sortable: true,
						},
						{
							name: 'Dates',
							minWidth: '150px',
							cell: (row) => (
								<div>
									{row.get('dates').map((date, index) => (
										<p className='mb-0' key={index}>
											{dayjs(date).format('MMMM DD, YYYY')}
										</p>
									))}
								</div>
							),
						},
						{
							name: 'Created',
							selector: (row) => dayjs(row.get('created_at')).format('MMMM DD, YYYY hh:mm A'),
							minWidth: '200px',
							sortable: true,
						},
						{
							name: 'Actions',
							cell: (row) => (
								<>
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
											remove(row.get('id')!);
										}}>
										delete
									</i>
								</>
							),
							minWidth: '150px',
						},
					]}
					data={dates}
				/>
			</Card>
			<Tooltip />
		</div>
	);
};

export default List;
