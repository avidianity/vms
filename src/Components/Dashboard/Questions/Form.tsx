import React, { createRef, FC, useEffect, useState } from 'react';
import Card from '../../Card';
import { useMode } from '../../../hooks';
import { useHistory, useRouteMatch } from 'react-router';
import { Question } from '../../../Models/question.model';

type Props = {};

const Form: FC<Props> = (props) => {
	const [processing, setProcessing] = useState(false);
	const [mode, setMode] = useMode();
	const match = useRouteMatch<{ id: string }>();
	const ref = createRef<HTMLFormElement>();
	const history = useHistory();
	const [question, setQuestion] = useState('');

	const submit = async () => {
		setProcessing(true);
		try {
			if (mode === 'Add') {
				await new Question({
					question,
				}).save();
			} else {
				const id = match.params.id;
				const model = await Question.createQueryBuilder().findOneOrFail(id);
				await model.update({ question });
			}
			toastr.success('Question saved successfully.');
		} catch (error) {
			console.log(error);
			toastr.error(`Unable to ${mode.toLowerCase()} Question. Please try again later.`, 'Oops!');
		} finally {
			setProcessing(false);
			ref.current?.reset();
		}
	};

	const get = async () => {
		setProcessing(true);
		try {
			const id = match.params.id;

			const question = await Question.createQueryBuilder().findOneOrFail(id);

			setQuestion(question.get('question'));

			setMode('Edit');
		} catch (error) {
			console.error(error);
			toastr.error('Unable to find Question.', 'Oops!');
			history.goBack();
		} finally {
			setProcessing(false);
		}
	};

	useEffect(() => {
		if (match.path.includes('edit')) {
			get();
		}

		// eslint-disable-next-line
	}, []);

	return (
		<div className='container'>
			<Card>
				<h4>{mode} Question</h4>
				<form
					ref={ref}
					onSubmit={(e) => {
						e.preventDefault();
						submit();
					}}>
					<div className='form-row'>
						<div className='form-group col-12'>
							<label htmlFor='question'>Question</label>
							<input
								type='text'
								name='question'
								id='question'
								className='form-control'
								onChange={(e) => setQuestion(e.target.value)}
								value={question}
							/>
						</div>
					</div>
					<div className='form-group'>
						<div className='peers ai-c jc-sb fxw-nw'>
							<div className='peer'>
								<button type='submit' className='btn btn-primary btn-sm' disabled={processing}>
									Save
								</button>
							</div>
						</div>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default Form;
