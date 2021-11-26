import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../routes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PHONE_REGEX } from '../../constants';
import axios from 'axios';
import { handleError } from '../../helpers';
import TextInput from '../Shared/TextInput';

type Props = {};

const Register: FC<Props> = (props) => {
	const navigate = useNavigate();
	const { handleBlur, handleChange, handleSubmit, values, isSubmitting, touched, errors } = useFormik({
		initialValues: {
			name: '',
			email: '',
			phone: '',
			password: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Name is required.'),
			email: Yup.string().email('Email address is invalid.').required('Email is required.'),
			phone: Yup.string().required('Phone is required.').matches(PHONE_REGEX, 'Phone format must be +639xxxxxxxxx.'),
			password: Yup.string().required('Password is required.'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				await axios.post('/auth/register', values);
				toastr.success('Registered successfully! Please verify your account.');
				navigate(routes.LOGIN);
			} catch (error) {
				handleError(error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	return (
		<main className='main-content mt-0'>
			<section>
				<div className='page-header min-vh-100'>
					<div className='container'>
						<div className='row'>
							<div
								className='
							col-6
							d-lg-flex d-none
							h-100
							my-auto
							pe-0
							position-absolute
							top-0
							start-0
							text-center
							justify-content-center
							flex-column
						'>
								<div
									className='
								position-relative
								bg-gradient-primary
								h-100
								m-3
								px-7
								border-radius-lg
								d-flex
								flex-column
								justify-content-center
							'
									style={{
										backgroundImage: `url(/assets/img/illustrations/illustration-signup.jpg)`,
										backgroundSize: 'cover',
									}}></div>
							</div>
							<div className='col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5'>
								<div className='card card-plain'>
									<div className='card-header'>
										<h4 className='font-weight-bolder'>Sign Up</h4>
										<p className='mb-0'>Enter your email, phone and password to register</p>
									</div>
									<div className='card-body'>
										<form onSubmit={handleSubmit}>
											<TextInput
												label='Name'
												name='name'
												isSubmitting={isSubmitting}
												handleBlur={handleBlur}
												handleChange={handleChange}
												touched={touched}
												errors={errors}
												values={values}
											/>
											<TextInput
												type='email'
												label='Email'
												name='email'
												isSubmitting={isSubmitting}
												handleBlur={handleBlur}
												handleChange={handleChange}
												touched={touched}
												errors={errors}
												values={values}
											/>
											<TextInput
												label='Phone'
												name='phone'
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
											<div className='form-check form-check-info text-start ps-0'>
												<input
													className='form-check-input'
													type='checkbox'
													value=''
													id='flexCheckDefault'
													disabled={isSubmitting}
												/>
												<label className='form-check-label' htmlFor='flexCheckDefault'>
													I agree to the{' '}
													<a
														href='/'
														className='text-dark font-weight-bolder'
														onClick={(e) => e.preventDefault()}>
														Terms and Conditions
													</a>
												</label>
											</div>
											<div className='text-center'>
												<button
													type='submit'
													className='btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0'
													disabled={isSubmitting}>
													Sign Up
												</button>
											</div>
										</form>
									</div>
									<div className='card-footer text-center pt-0 px-lg-2 px-1'>
										<p className='mb-2 text-sm mx-auto'>
											Already have an account?{' '}
											<Link to={routes.LOGIN} className='text-primary text-gradient font-weight-bold'>
												Sign In
											</Link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Register;
