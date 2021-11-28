import axios from 'axios';
import { useFormik } from 'formik';
import React, { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { handleError } from '../../helpers';
import { routes } from '../../routes';
import State from '@avidian/state';
import { AuthContext } from '../../contexts';
import { UserContract } from '../../contracts/user.contract';
import { upperFirst } from 'lodash';
import { EMAIL_REGEX, PHONE_REGEX } from '../../constants';
import { useToggle } from '@avidian/hooks';
import TextInput from '../Shared/TextInput';

type Props = {};

const Login: FC<Props> = (props) => {
	const [mode, setMode] = useState<'phone' | 'email'>('email');
	const [remember, setRemember] = useToggle(true);
	const navigate = useNavigate();
	const { setUser, setToken } = useContext(AuthContext);
	const { handleBlur, handleChange, handleSubmit, values, isSubmitting, touched, errors, resetForm } = useFormik({
		initialValues: {
			email: '',
			phone: '+639',
			password: '',
		},
		validationSchema: Yup.object({
			[mode]:
				mode === 'email'
					? Yup.string()
							.email('Email address is invalid.')
							.matches(EMAIL_REGEX, 'Email address is invalid.')
							.required('Email is required.')
					: Yup.string().required('Phone is required.').matches(PHONE_REGEX, 'Phone format must be +639xxxxxxxxx.'),
			password: Yup.string().required('Password is required.'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const {
					data: { user, token },
				} = await axios.post<{ user: UserContract; token: string }>('/auth/login', {
					[mode]: values[mode],
					password: values.password,
				});
				toastr.success('Logged in successfully!');
				const state = new State();
				if (remember) {
					state.set('user', user).set('token', token);
				}
				state.set('remember', remember);
				setToken(token);
				setUser(user);
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
				navigate(routes.DASHBOARD);
			} catch (error) {
				handleError(error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	return (
		<main className='main-content mt-0'>
			<div
				className='page-header align-items-start min-vh-100'
				style={{
					backgroundImage: `url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')`,
				}}>
				<span className='mask bg-gradient-dark opacity-6'></span>
				<div className='container my-auto'>
					<div className='row'>
						<div className='col-lg-4 col-md-8 col-12 mx-auto'>
							<div className='card z-index-0 fadeIn3 fadeInBottom'>
								<div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
									<div className='bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1'>
										<h4 className='text-white font-weight-bolder text-center mt-2 mb-0'>Sign In</h4>
										<div className='row mt-3'>
											<div className='col-12 text-center'>
												<button
													className='btn btn-primary btn-sm'
													onClick={(e) => {
														e.preventDefault();
														resetForm();
														setMode(mode === 'email' ? 'phone' : 'email');
													}}>
													Use {mode === 'email' ? 'phone' : 'email'}
												</button>
											</div>
										</div>
									</div>
								</div>
								<div className='card-body'>
									<form className='text-start' onSubmit={handleSubmit}>
										<TextInput
											type={mode === 'email' ? 'email' : 'text'}
											label={upperFirst(mode)}
											name={mode}
											isSubmitting={isSubmitting}
											handleBlur={handleBlur}
											handleChange={handleChange}
											touched={touched}
											errors={errors}
											values={values}
										/>
										<TextInput
											type='password'
											label='Password'
											name='password'
											isSubmitting={isSubmitting}
											handleBlur={handleBlur}
											handleChange={handleChange}
											touched={touched}
											errors={errors}
											values={values}
										/>
										<div className='form-check form-switch d-flex align-items-center mb-3'>
											<input
												className='form-check-input'
												type='checkbox'
												id='remember'
												onChange={() => setRemember()}
												disabled={isSubmitting}
												checked={remember}
											/>
											<label className='form-check-label mb-0 ms-2' htmlFor='remember'>
												Remember me
											</label>
										</div>
										<div className='text-center'>
											<button type='submit' className='btn bg-gradient-primary w-100 my-4 mb-2'>
												Sign In
											</button>
										</div>
										<p className='mt-4 text-sm text-center'>
											Don't have an account?{' '}
											<Link to={routes.REGISTER} className='text-primary text-gradient font-weight-bold'>
												Sign up
											</Link>
										</p>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Login;
