import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router';
import { Asker, outIf } from '../../../helpers';
import { useCollection, useURL } from '../../../hooks';
import { Question } from '../../../Models/question.model';
import Card from '../../Card';
import Tooltip from '../Tooltip';

type Props = {};

const List: FC<Props> = (props) => {
	const query = new Question();
	const [questions, setQuestions] = useCollection<Question>();
	const [fetching, setFetching] = useState(false);
	const history = useHistory();
	const url = useURL();

	const get = async () => {
		setFetching(true);
		try {
			const questions = await query.all();
			setQuestions(questions);
		} catch (error) {
			console.log(error);
			toastr.error('Unable to fetch Questions.', 'Oops!');
		} finally {
			setFetching(false);
		}
	};

	const remove = async (id: string) => {
		try {
			if (await Asker.danger('Are you sure you want to delete this Question?')) {
				const date = await new Question().findOne(id);
				await date?.delete();

				toastr.success('Question deleted successfully.');

				await get();
			}
		} catch (error) {
			console.error(error);
			toastr.error('Unable to delete Question.', 'Oops!');
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
					title='Questions'
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
							name: 'Question',
							selector: (row) => row.get('question'),
							minWidth: '200px',
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
					data={questions}
				/>
			</Card>
			<Tooltip />
		</div>
	);
};

export default List;
