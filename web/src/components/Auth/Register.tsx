import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PHONE_REGEX } from '../../constants';

type Props = {};

const Register: FC<Props> = (props) => {
	const { handleBlur, handleChange, handleSubmit, values, isSubmitting, touched, errors } = useFormik({
		initialValues: {
			email: '',
			phone: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Email address is invalid.').required('Email is required.'),
			phone: Yup.string().required('Phone is required.').matches(PHONE_REGEX, 'Phone format must be +639xxxxxxxxx.'),
			password: Yup.string().required('Password is required.'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				//
			} catch (error) {
				//
			}
			setSubmitting(false);
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
											<div
												className={`input-group input-group-outline ${
													touched.email && errors.email ? '' : 'mb-3'
												} ${values.email.length > 0 ? 'is-filled' : ''}`}>
												<label className='form-label'>Email</label>
												<input
													type='email'
													name='email'
													className='form-control'
													onFocus={(e) => {
														e.target.parentElement?.classList.add('focused', 'is-focused');
													}}
													onChange={handleChange}
													onBlur={(e) => {
														e.target.parentElement?.classList.remove('focused', 'is-focused');
														handleBlur(e);
													}}
													disabled={isSubmitting}
													value={values.email}
												/>
											</div>
											{touched.email && errors.email ? (
												<small className='form-text text-danger d-block mb-2'>{errors.email}</small>
											) : null}
											<div
												className={`input-group input-group-outline ${
													touched.phone && errors.phone ? '' : 'mb-3'
												} ${values.phone.length > 0 ? 'is-filled' : ''}`}>
												<label className='form-label'>Phone</label>
												<input
													type='text'
													name='phone'
													className='form-control'
													onFocus={(e) => {
														e.target.parentElement?.classList.add('focused', 'is-focused');
													}}
													onChange={handleChange}
													onBlur={(e) => {
														e.target.parentElement?.classList.remove('focused', 'is-focused');
														handleBlur(e);
													}}
													disabled={isSubmitting}
													value={values.phone}
												/>
											</div>
											{touched.phone && errors.phone ? (
												<small className='form-text text-danger d-block mb-2'>{errors.phone}</small>
											) : null}
											<div
												className={`input-group input-group-outline ${
													touched.password && errors.password ? '' : 'mb-3'
												} ${values.password.length > 0 ? 'is-filled' : ''}`}>
												<label className='form-label'>Password</label>
												<input
													type='password'
													name='password'
													className='form-control'
													onFocus={(e) => {
														e.target.parentElement?.classList.add('focused', 'is-focused');
													}}
													onChange={handleChange}
													onBlur={(e) => {
														e.target.parentElement?.classList.remove('focused', 'is-focused');
														handleBlur(e);
													}}
													disabled={isSubmitting}
													value={values.password}
												/>
											</div>
											{touched.password && errors.password ? (
												<small className='form-text text-danger d-block mb-2'>{errors.password}</small>
											) : null}
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
