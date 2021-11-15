import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router';
import { CMSContract } from '../../../Contracts/cms.contract';
import { Asker, outIf, ucwords } from '../../../helpers';
import { useCollection, useURL } from '../../../hooks';
import { CMS, Types } from '../../../Models/cms.model';
import Card from '../../Card';
import Tooltip from '../Tooltip';

type Props = {
	type: Types;
};

const List: FC<Props> = ({ type }) => {
	const title = ucwords(type);
	const query = new CMS();
	const [cms, setCMS] = useCollection<CMS, CMSContract>();
	const [fetching, setFetching] = useState(false);
	const history = useHistory();
	const url = useURL();

	const get = async () => {
		setFetching(true);
		try {
			const cms = await query.where('type', '==', type).all();
			setCMS(cms);
		} catch (error) {
			console.log(error);
			toastr.error(`Unable to fetch ${title}.`, 'Oops!');
		} finally {
			setFetching(false);
		}
	};

	const remove = async (id: string) => {
		try {
			if (await Asker.danger(`Are you sure you want to delete this ${title}?`)) {
				const cms = await new CMS().findOneOrFail(id);
				await cms.delete();

				toastr.success(`${title} deleted successfully.`);

				await get();
			}
		} catch (error) {
			console.error(error);
			toastr.error(`Unable to delete ${title}.`, 'Oops!');
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
					title={`${title}s`}
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
							name: 'Title',
							selector: (row) => row.get('title'),
							minWidth: '200px',
							sortable: true,
						},
						{
							name: 'Description',
							selector: (row) => row.get('description'),
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
											remove(row.id());
										}}>
										delete
									</i>
								</>
							),
							minWidth: '150px',
						},
					]}
					data={cms}
				/>
			</Card>
			<Tooltip />
		</div>
	);
};

export default List;
