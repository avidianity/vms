import React, { createRef, FC, useEffect, useState } from 'react';
import Card from '../../Card';
import { useArray, useCollection, useMode, useNullable } from '../../../hooks';
import { Date as DateModel } from '../../../Models/date.model';
import { useHistory, useRouteMatch } from 'react-router';
import Flatpickr from 'react-flatpickr';
import { Vaccine } from '../../../Models/vaccine.model';
import { addListener, listen, removeListener } from 'firestore-eloquent';
import { VaccineContract } from '../../../Contracts/vaccine.contract';

type Props = {};

const Form: FC<Props> = (props) => {
	const [processing, setProcessing] = useState(false);
	const [mode, setMode] = useMode();
	const match = useRouteMatch<{ id: string }>();
	const ref = createRef<HTMLFormElement>();
	const [dates, setDates] = useArray<Date>();
	const [vaccine, setVaccine] = useNullable<Vaccine>();
	const [vaccines, setVaccines] = useCollection<Vaccine, VaccineContract>();
	const history = useHistory();

	const submit = async () => {
		setProcessing(true);
		try {
			if (!vaccine) {
				return toastr.error('Please choose a vaccine.');
			}

			const model = new DateModel({
				dates: dates.map((date) => date.toJSON()),
			});

			if (mode === 'Edit') {
				model.set('id', match.params.id);
			}

			await vaccine.dates().save(model);

			toastr.success('Date saved successfully.');
			history.goBack();
		} catch (error) {
			console.log(error);
			toastr.error(`Unable to ${mode.toLowerCase()} Date. Please try again later.`, 'Oops!');
		} finally {
			setProcessing(false);
			ref.current?.reset();
			setDates([]);
			setVaccine(null);
		}
	};

	const get = async () => {
		setProcessing(true);
		try {
			const id = match.params.id;
			const query = new DateModel();
			const date = await query.findOneOrFail(id);
			const vaccine = await date.vaccine().get();

			if (vaccine) {
				setVaccine(vaccine);
			}
			setDates(date.get('dates').map((date) => date.toDate()));

			setMode('Edit');
		} catch (error) {
			console.error(error);
			toastr.error('Unable to find Date.', 'Oops!');
			history.goBack();
		} finally {
			setProcessing(false);
		}
	};

	useEffect(() => {
		if (match.path.includes('edit')) {
			get();
		}

		const key = addListener(Vaccine, setVaccines);
		new Vaccine().all().then(setVaccines).catch(console.error);
		listen(Vaccine);
		return () => {
			removeListener(Vaccine, key);
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className='container'>
			<Card>
				<h4>{mode} Available Date</h4>
				<form
					ref={ref}
					onSubmit={(e) => {
						e.preventDefault();
						submit();
					}}>
					<div className='form-row'>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='vaccine_id'>Vaccine</label>
							<select
								name='vaccine_id'
								id='vaccine_id'
								className='form-control'
								onChange={(e) => {
									const id = e.target.value;

									const vaccine = vaccines.find((vaccine) => vaccine.id() === id);

									if (vaccine) {
										setVaccine(vaccine);
									}
								}}
								value={vaccine?.id() || 'none'}>
								<option value='none' disabled>
									{' '}
									-- Select --{' '}
								</option>
								{vaccines.map((vaccine, index) => (
									<option key={index} value={vaccine.id()}>
										{vaccine.get('name')}
									</option>
								))}
							</select>
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='date'>Date Range</label>
							<Flatpickr
								options={{
									mode: 'multiple',
									altInput: true,
								}}
								id='date'
								className='form-control'
								disabled={processing}
								onChange={(dates) => {
									if (vaccine) {
										setDates(dates.limit(vaccine.get('doses')));
									}
								}}
								value={vaccines ? dates : []}
							/>
							<small className='form-text text-muted'>
								Number of dates are limited to the number of doses of the vaccine.
							</small>
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
