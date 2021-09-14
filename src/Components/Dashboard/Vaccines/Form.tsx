import React, { createRef, FC, useEffect, useState } from 'react';
import Card from '../../Card';
import { useForm } from 'react-hook-form';
import { useMode } from '../../../hooks';
import { Vaccine } from '../../../Models/vaccine.model';
import { useHistory, useRouteMatch } from 'react-router';

type Props = {};

type VaccineContract = {
	name: string;
	doses: number;
	at_birth: boolean;
	one_month_and_a_half: boolean;
	two_months_and_a_half: boolean;
	three_months_and_a_half: boolean;
	nine_months: boolean;
	one_year: boolean;
};

const Form: FC<Props> = (props) => {
	const [processing, setProcessing] = useState(false);
	const [mode, setMode] = useMode();
	const { register, handleSubmit, setValue } = useForm<VaccineContract>();
	const match = useRouteMatch<{ id: string }>();
	const ref = createRef<HTMLFormElement>();
	const history = useHistory();

	const submit = async (data: VaccineContract) => {
		setProcessing(true);
		try {
			const model = new Vaccine(data);

			if (mode === 'Edit') {
				model.set('id', match.params.id);
			}

			await model.save();
			toastr.success('Vaccine saved successfully.');
			history.goBack();
		} catch (error) {
			console.log(error);
			toastr.error(`Unable to ${mode.toLowerCase()} Vaccine. Please try again later.`, 'Oops!');
		} finally {
			setProcessing(false);
			ref.current?.reset();
		}
	};

	const get = async () => {
		setProcessing(true);
		try {
			const id = match.params.id;
			const query = new Vaccine();
			const vaccine = await query.findOne(id);

			for (const [key, value] of Object.entries(vaccine?.getData()!)) {
				setValue(key as any, value);
			}

			setMode('Edit');
		} catch (error) {
			console.error(error);
			toastr.error('Unable to find Vaccine.', 'Oops!');
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
				<h4>{mode} Vaccine</h4>
				<form ref={ref} onSubmit={handleSubmit(submit)}>
					<div className='form-row'>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='name'>Name</label>
							<input {...register('name')} type='text' id='name' className='form-control' disabled={processing} />
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='doses'>Doses</label>
							<input
								{...register('doses')}
								type='number'
								id='doses'
								className='form-control'
								disabled={processing || mode === 'Edit'}
							/>
						</div>
						<div className='form-group col-12 col-md-6 col-lg-4'>
							<div className='checkbox checkbox-circle checkbox-info peers ai-c'>
								<input {...register('at_birth')} type='checkbox' id='at_birth' className='peer' disabled={processing} />
								<label htmlFor='at_birth' className='form-label peers peer-greed js-sb ai-c'>
									<span className='peer peer-greed'>At Birth</span>
								</label>
							</div>
						</div>
						<div className='form-group col-12 col-md-6 col-lg-4'>
							<div className='checkbox checkbox-circle checkbox-info peers ai-c'>
								<input
									{...register('one_month_and_a_half')}
									type='checkbox'
									id='one_month_and_a_half'
									className='peer'
									disabled={processing}
								/>
								<label htmlFor='one_month_and_a_half' className='form-label peers peer-greed js-sb ai-c'>
									<span className='peer peer-greed'>1 1/2 Months</span>
								</label>
							</div>
						</div>
						<div className='form-group col-12 col-md-6 col-lg-4'>
							<div className='checkbox checkbox-circle checkbox-info peers ai-c'>
								<input
									{...register('two_months_and_a_half')}
									type='checkbox'
									id='two_months_and_a_half'
									className='peer'
									disabled={processing}
								/>
								<label htmlFor='two_months_and_a_half' className='form-label peers peer-greed js-sb ai-c'>
									<span className='peer peer-greed'>2 1/2 Months</span>
								</label>
							</div>
						</div>
						<div className='form-group col-12 col-md-6 col-lg-4'>
							<div className='checkbox checkbox-circle checkbox-info peers ai-c'>
								<input
									{...register('three_months_and_a_half')}
									type='checkbox'
									id='three_months_and_a_half'
									className='peer'
									disabled={processing}
								/>
								<label htmlFor='three_months_and_a_half' className='form-label peers peer-greed js-sb ai-c'>
									<span className='peer peer-greed'>3 1/2 Months</span>
								</label>
							</div>
						</div>
						<div className='form-group col-12 col-md-6 col-lg-4'>
							<div className='checkbox checkbox-circle checkbox-info peers ai-c'>
								<input
									{...register('nine_months')}
									type='checkbox'
									id='nine_months'
									className='peer'
									disabled={processing}
								/>
								<label htmlFor='nine_months' className='form-label peers peer-greed js-sb ai-c'>
									<span className='peer peer-greed'>9 Months</span>
								</label>
							</div>
						</div>
						<div className='form-group col-12 col-md-6 col-lg-4'>
							<div className='checkbox checkbox-circle checkbox-info peers ai-c'>
								<input {...register('one_year')} type='checkbox' id='one_year' className='peer' disabled={processing} />
								<label htmlFor='one_year' className='form-label peers peer-greed js-sb ai-c'>
									<span className='peer peer-greed'>1 Year</span>
								</label>
							</div>
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
