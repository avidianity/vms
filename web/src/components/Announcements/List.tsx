import React, { FC } from 'react';
import DataTable from 'react-data-table-component';
import { useQuery } from 'react-query';
import { Asker, getHTMLBody } from '../../helpers';
import { deleteAnnouncement, getAnnouncements } from '../../queries/announcement.query';
import dayjs from 'dayjs';
import { truncate } from 'lodash';
import { Link } from 'react-router-dom';

type Props = {};

const List: FC<Props> = (props) => {
	const { data: announcements, refetch, isFetching } = useQuery('announcements', getAnnouncements);

	const remove = async (id: any) => {
		if (await Asker.danger('Are you sure you want to delete this announcement?')) {
			try {
				await deleteAnnouncement(id);
				toastr.success('Announcement has been deleted successfully!');
			} catch (error) {
				console.error(error);
				toastr.error('Unable to delete announcement.');
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
					title='Announcements'
					actions={[
						<Link to='add' className='btn btn-icon btn-sm btn-primary'>
							Add Announcement
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
					data={announcements || []}
					columns={[
						{
							name: 'ID',
							selector: (row) => row.id,
							sortable: true,
						},
						{
							name: 'Title',
							selector: (row) => row.title,
							sortable: true,
							minWidth: '150px',
						},
						{
							name: 'Description',
							cell: (row) => (
								<div dangerouslySetInnerHTML={{ __html: truncate(getHTMLBody(row.description), { length: 100 }) }} />
							),
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
