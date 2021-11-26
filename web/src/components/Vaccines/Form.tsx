import { useMode } from '@avidian/hooks';
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useMatch, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { handleError } from '../../helpers';
import { createVaccine, getVaccine, updateVaccine } from '../../queries/vaccine.query';
import { routes } from '../../routes';
import TextInput from '../Shared/TextInput';

type Props = {};

const Form: FC<Props> = (props) => {
	const [mode, setMode] = useMode();
	const navigate = useNavigate();
	const match = useMatch(`${routes.DASHBOARD}/${routes.VACCINES}/:id/edit`);
	const { values, setValues, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting } = useFormik({
		initialValues: {
			name: '',
			at_birth: false,
			one_month_and_a_half: false,
			two_months_and_a_half: false,
			three_months_and_a_half: false,
			nine_months: false,
			one_year: false,
			doses: 0,
			quantity: 0,
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Name is required.'),
			at_birth: Yup.boolean().optional(),
			one_month_and_a_half: Yup.boolean().optional(),
			two_months_and_a_half: Yup.boolean().optional(),
			three_months_and_a_half: Yup.boolean().optional(),
			nine_months: Yup.boolean().optional(),
			one_year: Yup.boolean().optional(),
			doses: Yup.number().required('Doses is required.'),
			quantity: Yup.number().required('Quantity is required.'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				await (mode === 'Add' ? createVaccine(values) : updateVaccine(match?.params.id, values));
				toastr.success(`${mode} vaccine successful!`);
				navigate(`${routes.DASHBOARD}/${routes.VACCINES}`);
			} catch (error) {
				handleError(error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	const fetch = async (id: any) => {
		const vaccine = await getVaccine(id);
		await setValues(vaccine);
		setMode('Edit');
	};

	useEffect(() => {
		if (match) {
			fetch(match.params.id);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='card'>
			<div className='card-header'>
				<h5 className='card-title'>{mode} Vaccine</h5>
			</div>
			<div className='card-body'>
				<form onSubmit={handleSubmit}>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-12 col-md-4'>
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
							</div>
							<div className='col-12 col-md-4'>
								<TextInput
									type='number'
									label='Doses'
									name='doses'
									isSubmitting={isSubmitting}
									handleBlur={handleBlur}
									handleChange={handleChange}
									touched={touched}
									errors={errors}
									values={values}
								/>
							</div>
							<div className='col-12 col-md-4'>
								<TextInput
									type='number'
									label='Quantity'
									name='quantity'
									isSubmitting={isSubmitting}
									handleBlur={handleBlur}
									handleChange={handleChange}
									touched={touched}
									errors={errors}
									values={values}
								/>
							</div>
							<div className='col-12'>
								<h6>Age Brackets</h6>
							</div>
							<div className='col-12 col-md-4'>
								<div className='form-check'>
									<input
										className='form-check-input'
										type='checkbox'
										id='at_birth'
										name='at_birth'
										checked={values.at_birth}
										onBlur={handleBlur}
										onChange={handleChange}
										disabled={isSubmitting}
									/>
									<label className='custom-control-label' htmlFor='at_birth'>
										At Birth
									</label>
								</div>
							</div>
							<div className='col-12 col-md-4'>
								<div className='form-check'>
									<input
										className='form-check-input'
										type='checkbox'
										id='one_month_and_a_half'
										name='one_month_and_a_half'
										checked={values.one_month_and_a_half}
										onBlur={handleBlur}
										onChange={handleChange}
										disabled={isSubmitting}
									/>
									<label className='custom-control-label' htmlFor='one_month_and_a_half'>
										1 1/2 Months
									</label>
								</div>
							</div>
							<div className='col-12 col-md-4'>
								<div className='form-check'>
									<input
										className='form-check-input'
										type='checkbox'
										id='two_months_and_a_half'
										name='two_months_and_a_half'
										checked={values.two_months_and_a_half}
										onBlur={handleBlur}
										onChange={handleChange}
										disabled={isSubmitting}
									/>
									<label className='custom-control-label' htmlFor='two_months_and_a_half'>
										2 1/2 Months
									</label>
								</div>
							</div>
							<div className='col-12 col-md-4'>
								<div className='form-check'>
									<input
										className='form-check-input'
										type='checkbox'
										id='three_months_and_a_half'
										name='three_months_and_a_half'
										checked={values.three_months_and_a_half}
										onBlur={handleBlur}
										onChange={handleChange}
										disabled={isSubmitting}
									/>
									<label className='custom-control-label' htmlFor='three_months_and_a_half'>
										3 1/2 Months
									</label>
								</div>
							</div>
							<div className='col-12 col-md-4'>
								<div className='form-check'>
									<input
										className='form-check-input'
										type='checkbox'
										id='nine_months'
										name='nine_months'
										checked={values.nine_months}
										onBlur={handleBlur}
										onChange={handleChange}
										disabled={isSubmitting}
									/>
									<label className='custom-control-label' htmlFor='nine_months'>
										9 Months
									</label>
								</div>
							</div>
							<div className='col-12 col-md-4'>
								<div className='form-check'>
									<input
										className='form-check-input'
										type='checkbox'
										id='one_year'
										name='one_year'
										checked={values.one_year}
										onBlur={handleBlur}
										onChange={handleChange}
										disabled={isSubmitting}
									/>
									<label className='custom-control-label' htmlFor='one_year'>
										1 Year
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className='form-group pt-3'>
						<button type='submit' className='btn btn-primary btn-sm' disabled={isSubmitting}>
							{isSubmitting ? 'Saving' : 'Save'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Form;
