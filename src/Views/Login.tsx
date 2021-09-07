import React, { FC } from 'react';
import bg from '../Assets/login.jpg';
import logo from '../Assets/logo.svg';
import { useHistory } from 'react-router';
import { routes } from '../routes';
import { useForm } from 'react-hook-form';
import { User } from '../Models/user.model';
import { useState } from 'react';
import { Hash } from '../helpers';
import { Token } from '../Models/token.model';
import md5 from 'md5';
import { State } from '../Libraries/state.library';
import { Link } from 'react-router-dom';

type Props = {};

type UserContract = {
	name: string;
	email: string;
	password: string;
	gender: string;
	birthday: string;
	address: string;
	role: string;
};

const state = State.getInstance();

const Login: FC<Props> = (props) => {
	const [processing, setProcessing] = useState(false);
	const history = useHistory();

	const { register, handleSubmit } = useForm<UserContract>();

	const submit = async (data: UserContract) => {
		setProcessing(true);
		try {
			const user = await new User().where('email', '==', data.email).first();

			if (!user) {
				return toastr.error('Email does not exist.');
			}

			if (!Hash.check(data.password, user.get('password'))) {
				return toastr.error('Password is incorrect.');
			}

			if (!user.get('approved')) {
				return toastr.error('Your account is not yet approved.');
			}

			await user.load(['picture']);

			const hash = String.random(20);

			await user.tokens().save(new Token({ hash: md5(hash) }));

			toastr.success(`Welcome back, ${user.get('name')}!`);

			state.set('user', user.getData()).set('token', hash);

			history.push(user.get('role') === 'Patient' ? routes.PATIENT : routes.DASHBOARD);
		} catch (error) {
			console.log('unable to login', error);
			toastr.error('Unable to login. Please try again later.');
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
				<h4 className='fw-300 c-grey-900 mB-40'>Login</h4>
				<form onSubmit={handleSubmit(submit)}>
					<div className='form-group'>
						<label className='text-normal text-dark'>Email</label>
						<input {...register('email')} type='email' className='form-control' placeholder='Email' disabled={processing} />
					</div>
					<div className='form-group'>
						<label className='text-normal text-dark'>Password</label>
						<input
							{...register('password')}
							type='password'
							className='form-control'
							placeholder='Password'
							disabled={processing}
						/>
					</div>
					<div className='form-group'>
						<div className='peers ai-c jc-sb fxw-nw'>
							<div className='peer'>
								<button type='submit' className='btn btn-primary' disabled={processing}>
									Login
								</button>
							</div>
							<div className='peer'>
								<Link to={routes.REGISTER} className='btn btn-link'>
									Register
								</Link>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
