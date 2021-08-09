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

			for (const [key, value] of Object.entries(vaccine.getData())) {
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
							<input {...register('name')} type='text' name='name' id='name' className='form-control' disabled={processing} />
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='doses'>Doses</label>
							<input
								{...register('doses')}
								type='number'
								name='doses'
								id='doses'
								className='form-control'
								disabled={processing}
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