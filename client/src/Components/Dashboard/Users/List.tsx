import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router';
import { Roles, UserContract } from '../../../Contracts/user.contract';
import { Asker, outIf } from '../../../helpers';
import { useCollection, useURL } from '../../../hooks';
import { State } from '../../../Libraries/state.library';
import { User } from '../../../Models/user.model';
import Card from '../../Card';
import Tooltip from '../Tooltip';

type Props = {
	type: Roles;
};

const state = State.getInstance();

const List: FC<Props> = ({ type }) => {
	const query = new User();
	const [users, setUsers] = useCollection<User>();
	const [fetching, setFetching] = useState(false);
	const history = useHistory();
	const url = useURL();
	const user = state.get<UserContract>('user');

	const get = async () => {
		setFetching(true);
		try {
			const users = await query.where('role', '==', type).all();
			setUsers(await users.load(['picture']));
		} catch (error) {
			console.log(error);
			toastr.error(`Unable to fetch ${type}s.`, 'Oops!');
		} finally {
			setFetching(false);
		}
	};

	const remove = async (id: string) => {
		try {
			if (await Asker.danger(`Are you sure you want to delete this ${type}?`)) {
				const user = await new User().findOneOrFail(id);
				await user.delete();

				toastr.success(`${type} deleted successfully.`);

				await get();
			}
		} catch (error) {
			console.error(error);
			toastr.error(`Unable to delete ${type}.`, 'Oops!');
		}
	};

	useEffect(() => {
		get();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='container-fluid'>
			<Card>
				<DataTable
					title={`${type}s`}
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
							name: 'Name',
							selector: (row) => row.get('name'),
							minWidth: '200px',
							sortable: true,
						},
						{
							name: 'Email',
							selector: (row) => row.get('email'),
							minWidth: '250px',
							sortable: true,
						},
						{
							name: 'Address',
							selector: (row) => row.get('address'),
							minWidth: '250px',
							sortable: true,
						},
						{
							name: 'Sex',
							selector: (row) => row.get('gender'),
							minWidth: '100px',
							sortable: true,
						},
						{
							name: 'Birthday',
							selector: (row) => dayjs(row.get('birthday')).format('MMMM DD, YYYY'),
							minWidth: '200px',
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
							cell: (row) =>
								user?.id !== row.get('id') ? (
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
								) : null,
							minWidth: '150px',
						},
					]}
					data={users}
				/>
			</Card>
			<Tooltip />
		</div>
	);
};

export default List;
