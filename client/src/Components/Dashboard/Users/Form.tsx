import React, { createRef, FC, useEffect, useState } from 'react';
import Card from '../../Card';
import InputMask from 'react-input-mask';
import Flatpickr from 'react-flatpickr';
import { useForm } from 'react-hook-form';
import { useMode, useNullable } from '../../../hooks';
import { User } from '../../../Models/user.model';
import { Hash } from '../../../helpers';
import { useHistory, useRouteMatch } from 'react-router';
import { Roles } from '../../../Contracts/user.contract';
import dayjs from 'dayjs';

type Props = {
	type: Roles;
};

type UserContract = {
	name: string;
	email: string;
	password: string;
	gender: string;
	birthday: string;
	address: string;
	role: string;
	phone: string;
};

const Form: FC<Props> = ({ type }) => {
	const [processing, setProcessing] = useState(false);
	const [mode, setMode] = useMode();
	const { register, handleSubmit, setValue } = useForm<UserContract>();
	const [birthday, setBirthday] = useNullable<Date>();
	const match = useRouteMatch<{ id: string }>();
	const ref = createRef<HTMLFormElement>();
	const history = useHistory();

	const submit = async (data: UserContract) => {
		setProcessing(true);
		try {
			data.password = Hash.make(data.password);
			data.birthday = birthday?.toJSON() || '';
			data.role = type;

			const model = new User(data);

			if (mode === 'Edit') {
				model.set('id', match.params.id);
			}

			model.set('approved', true);

			await model.save();
			toastr.success('Health Worker saved successfully.');
			history.goBack();
		} catch (error) {
			console.log(error);
			toastr.error(`Unable to ${mode.toLowerCase()} Health Worker. Please try again later.`, 'Oops!');
		} finally {
			setProcessing(false);
			ref.current?.reset();
		}
	};

	const get = async () => {
		setProcessing(true);
		try {
			const id = match.params.id;
			const query = new User();
			const user = await query.findOneOrFail(id);
			const { password, ...data } = user.getData()!;

			Object.entries(data).forEach(([key, value]) => {
				setValue(key as any, value);
			});

			setBirthday(dayjs(data.birthday).toDate());

			setMode('Edit');
		} catch (error) {
			console.error(error);
			toastr.error('Unable to find Health Worker.', 'Oops!');
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
				<h4>
					{mode} {type}
				</h4>
				<form ref={ref} onSubmit={handleSubmit(submit)}>
					<div className='form-row'>
						<div className='form-group col-12 col-md-6 col-lg-4'>
							<label htmlFor='name'>Name</label>
							<input {...register('name')} type='text' name='name' id='name' className='form-control' disabled={processing} />
						</div>
						<div className='form-group col-12 col-md-6 col-lg-4'>
							<label htmlFor='birthday'>Birthday</label>
							<Flatpickr
								className='form-control'
								options={{
									altInput: true,
									altFormat: 'F m, Y',
								}}
								onChange={(dates) => setBirthday(dates.first())}
								value={birthday || undefined}
								disabled={processing}
							/>
						</div>
						<div className='form-group col-12 col-md-6 col-lg-4'>
							<label htmlFor='gender'>Sex</label>
							<select {...register('gender')} name='gender' id='gender' className='form-control' disabled={processing}>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</select>
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='address'>Address</label>
							<input
								{...register('address')}
								type='text'
								name='address'
								id='address'
								className='form-control'
								disabled={processing}
							/>
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='email'>Email</label>
							<input
								{...register('email')}
								type='email'
								name='email'
								id='email'
								className='form-control'
								disabled={processing}
							/>
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='phone'>Phone</label>
							<InputMask
								mask='+639999999999'
								{...register('phone')}
								id='phone'
								className='form-control'
								disabled={processing}
							/>
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='password'>Password</label>
							<input
								{...register('password')}
								type='password'
								name='password'
								id='password'
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
