import React, { FC } from 'react';
import bg from '../Assets/register.jpg';
import logo from '../Assets/logo.svg';
import { useHistory } from 'react-router';
import { routes } from '../routes';
import Flatpickr from 'react-flatpickr';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNullable } from '../hooks';
import { Hash } from '../helpers';
import { User } from '../Models/user.model';
import InputMask from 'react-input-mask';

type Props = {};

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

const Register: FC<Props> = (props) => {
	const [processing, setProcessing] = useState(false);
	const { register, handleSubmit } = useForm<UserContract>();
	const [birthday, setBirthday] = useNullable<Date>();
	const history = useHistory();

	const submit = async (data: UserContract) => {
		setProcessing(true);
		try {
			const exists = await new User().where('email', '==', data.email).first();

			if (exists) {
				return toastr.error('User already exists.');
			}

			data.password = Hash.make(data.password);
			data.birthday = birthday?.toJSON() || '';
			data.role = 'Patient';

			await new User({ ...data, approved: true }).save();

			toastr.success('Registered successfully. Please login.');
			history.goBack();
		} catch (error) {
			console.log('Unable to register', error);
			toastr.error('Unable to register. Please try again later.');
		} finally {
			setProcessing(false);
		}
	};

	return (
		<div className='peers ai-s fxw-nw h-100vh'>
			<div className='d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv' style={{ backgroundImage: `url(${bg})` }}>
				<div className='pos-a centerXY'>
					<div className='bgc-white bdrs-50p pos-r' style={{ width: '120px', height: '120px' }}>
						<img
							className='pos-a centerXY cursor-pointer'
							src={logo}
							alt='VMS'
							style={{ width: '100px', height: '100px' }}
							onClick={(e) => {
								e.preventDefault();
								history.push(routes.HOME);
							}}
						/>
					</div>
				</div>
			</div>
			<div className='col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r' style={{ minWidth: '320px' }}>
				<h4 className='fw-300 c-grey-900 mB-40'>Register</h4>
				<form onSubmit={handleSubmit(submit)}>
					<div className='form-row'>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='name'>Name</label>
							<input {...register('name')} type='text' name='name' id='name' className='form-control' disabled={processing} />
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='birthday'>Birthday</label>
							<Flatpickr
								className='form-control'
								options={{
									altInput: true,
									altFormat: 'F j, Y',
								}}
								onChange={(dates) => setBirthday(dates.first())}
								value={birthday || undefined}
								disabled={processing}
							/>
						</div>
						<div className='form-group col-12 col-md-6'>
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
								<button type='submit' className='btn btn-primary' disabled={processing}>
									Register
								</button>
							</div>
							<div className='peer'>
								<Link to={routes.LOGIN} className='btn btn-link'>
									Login
								</Link>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
