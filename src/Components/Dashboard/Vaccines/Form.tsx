import React, { createRef, FC, useEffect, useState } from 'react';
import Card from '../../Card';
import { useForm } from 'react-hook-form';
import { useMode } from '../../../hooks';
import { Vaccine } from '../../../Models/vaccine.model';
import { useRouteMatch } from 'react-router';
import { VaccineContract } from '../../../Contracts/vaccine.contract';

type Props = {};

const Form: FC<Props> = (props) => {
	const [processing, setProcessing] = useState(false);
	const [mode, setMode] = useMode();
	const { register, handleSubmit, setValue } = useForm<VaccineContract>();
	const match = useRouteMatch<{ id: string }>();
	const ref = createRef<HTMLFormElement>();

	const submit = async (data: VaccineContract) => {
		setProcessing(true);
		try {
			await new Vaccine().forceFill(data).save();
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
			const { password, ...data } = vaccine.getData();
			for (const key in data) {
				setValue(key as any, data[key]);
			}
			setMode('Edit');
		} catch (error) {
			console.error(error);
			toastr.error('Unable to find Vaccine.', 'Oops!');
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
