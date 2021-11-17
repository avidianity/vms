import React, { FC, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router';
import { outIf } from '../../../helpers';
import { useURL } from '../../../hooks';
import { Appointment } from '../../../Models/appointment.model';
import Card from '../../Card';
import Tooltip from '../Tooltip';

type Props = {};

const List: FC<Props> = (props) => {
	const query = new Appointment();
	const [fetching, setFetching] = useState(false);
	const history = useHistory();
	const url = useURL();
	const [items, setItems] = useState<{ id: string; name: string }[]>([]);

	const get = async () => {
		setFetching(true);
		try {
			const items = await query.all();
			const users: { id: string; name: string }[] = [];

			items.forEach((item) => {
				const name = item.get('name_of_child');
				const id = item.id();
				if (!users.find((item) => item.name === name)) {
					users.push({ name, id });
				}
			});

			setItems(users);
		} catch (error) {
			console.log(error);
			toastr.error('Unable to fetch items.', 'Oops!');
		} finally {
			setFetching(false);
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
					title='Records'
					actions={[
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
							name: 'Name of Child',
							selector: (row) => row.name,
							minWidth: '250px',
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
											history.push(url(`/${row.id}/view`));
										}}
										data-tip='View'>
										visibility
									</i>
								</>
							),
							minWidth: '150px',
						},
					]}
					data={items}
				/>
			</Card>
			<Tooltip />
		</div>
	);
};

export default List;
