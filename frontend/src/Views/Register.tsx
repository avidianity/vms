import React, { FC } from 'react';
import bg from '../Assets/static/images/bg.jpg';
import logo from '../Assets/logo.svg';
import { useHistory } from 'react-router';
import { routes } from '../routes';
import Flatpickr from 'react-flatpickr';

type Props = {};

const Register: FC<Props> = (props) => {
	const history = useHistory();

	return (
		<div className='peers ai-s fxw-nw h-100vh'>
			<div
				className='d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv'
				style={{ backgroundImage: `url(${bg})` }}>
				<div className='pos-a centerXY'>
					<div
						className='bgc-white bdrs-50p pos-r'
						style={{ width: '120px', height: '120px' }}>
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
			<div
				className='col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r'
				style={{ minWidth: '320px' }}>
				<h4 className='fw-300 c-grey-900 mB-40'>Register</h4>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						history.push(routes.DASHBOARD);
					}}>
					<div className='form-row'>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='name'>Name</label>
							<input
								type='text'
								name='name'
								id='name'
								className='form-control'
							/>
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='birthday'>Birthday</label>
							<Flatpickr
								className='form-control'
								options={{
									altInput: true,
									altFormat: 'F m, Y',
								}}
							/>
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='gender'>Gender</label>
							<select
								name='gender'
								id='gender'
								className='form-control'>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</select>
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='address'>Address</label>
							<input
								type='text'
								name='address'
								id='address'
								className='form-control'
							/>
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								name='email'
								id='email'
								className='form-control'
							/>
						</div>
						<div className='form-group col-12 col-md-6'>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								name='password'
								id='password'
								className='form-control'
							/>
						</div>
					</div>
					<div className='form-group'>
						<div className='peers ai-c jc-sb fxw-nw'>
							<div className='peer'>
								<button
									type='submit'
									className='btn btn-primary'>
									Register
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
