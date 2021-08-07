import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router';
import { VaccineContract } from '../../../Contracts/vaccine.contract';
import { Asker, outIf } from '../../../helpers';
import { useCollection, useURL } from '../../../hooks';
import { State } from '../../../Libraries/state.library';
import { Vaccine } from '../../../Models/vaccine.model';
import Card from '../../Card';
import Tooltip from '../Tooltip';

type Props = {};

const state = State.getInstance();

const List: FC<Props> = (props) => {
	const query = new Vaccine();
	const [vaccines, setVaccines] = useCollection<Vaccine>();
	const [fetching, setFetching] = useState(false);
	const history = useHistory();
	const url = useURL();
	const vaccine = state.get<VaccineContract>('vaccine');

	const get = async () => {
		setFetching(true);
		try {
			const vaccines = await query.all();
			setVaccines(vaccines);
		} catch (error) {
			console.log(error);
			toastr.error('Unable to fetch Vaccines.', 'Oops!');
		} finally {
			setFetching(false);
		}
	};

	const remove = async (id: string) => {
		try {
			if (await Asker.danger('Are you sure you want to delete this Vaccine?')) {
				const vaccine = await new Vaccine().findOne(id);
				await vaccine.delete();

				toastr.success('Vaccine deleted successfully.');

				await get();
			}
		} catch (error) {
			console.error(error);
			toastr.error('Unable to delete Vaccine.', 'Oops!');
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
					title='Vaccines'
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
							sortable: true,
						},
						{
							name: 'Name',
							selector: (row) => row.get('name'),
							minWidth: '200px',
							sortable: true,
						},
						{
							name: 'Number of Doses',
							selector: (row) => row.get('doses'),
							minWidth: '150px',
							sortable: true,
						},
						{
							name: 'Created',
							selector: (row) => dayjs(row.get('created_at')).format('MMMM DD, YYYY hh:mm A'),
							minWidth: '200px',
							sortable: true,
						},
						{
							name: 'Actions',
							cell: (row) =>
								vaccine?.id !== row.get('id') ? (
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
												remove(row.get('id'));
											}}>
											delete
										</i>
									</>
								) : null,
							minWidth: '150px',
						},
					]}
					data={vaccines}
				/>
			</Card>
			<Tooltip />
		</div>
	);
};

export default List;
