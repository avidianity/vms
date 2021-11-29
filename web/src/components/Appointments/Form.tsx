import { useMode, useToggle } from '@avidian/hooks';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { FC, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import { useMatch, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { AuthContext } from '../../contexts';
import { AppointmentContract } from '../../contracts/appointment.contract';
import { handleError } from '../../helpers';
import { createAppointment, getAppointment, updateAppointment } from '../../queries/appointment.query';
import { getUsers } from '../../queries/user.query';
import { routes } from '../../routes';
import SelectInput from '../Shared/SelectInput';
import TextInput from '../Shared/TextInput';

type Props = {};

type Inputs = Pick<
	AppointmentContract,
	'child' | 'father' | 'mother' | 'birthday' | 'place_of_birth' | 'sex' | 'height' | 'weight' | 'user_id' | 'attendee_id'
>;

const Form: FC<Props> = (props) => {
	const [mode, setMode] = useMode();
	const navigate = useNavigate();
	const [assign, setAssign] = useToggle(false);
	const match = useMatch(`${routes.DASHBOARD}/${routes.APPOINTMENTS}/:id/edit`);
	const { values, setValues, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting } = useFormik<Inputs>({
		initialValues: {
			child: '',
			father: '',
			mother: '',
			birthday: '',
			place_of_birth: '',
			sex: 'Male',
			height: 'N/A',
			weight: 'N/A',
			user_id: 0,
			attendee_id: undefined,
		},
		validationSchema: Yup.object({
			child: Yup.string().required("Child's name is required."),
			father: Yup.string().required("Father's name is required."),
			mother: Yup.string().required("Mother's name is required."),
			birthday: Yup.date().required('Birthday is required.'),
			place_of_birth: Yup.string().required('Place of Birth is required.'),
			sex: Yup.string().required('Sex is required').oneOf(['Male', 'Female']),
			height: Yup.string().required('Height is required.'),
			weight: Yup.string().required('Weight is required.'),
			user_id: Yup.number().required('User is required.'),
			attendee_id: Yup.number().optional(),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				if (user?.role === 'user') {
					values.height = 'N/A';
					values.weight = 'N/A';
					values.user_id = user.id;
				}
				await (mode === 'Add' ? createAppointment(values) : updateAppointment(match?.params.id, values));
				toastr.success(`${mode} appointment successful!`);
				navigate(`${routes.DASHBOARD}/${routes.APPOINTMENTS}`);
			} catch (error) {
				handleError(error);
			} finally {
				setSubmitting(false);
			}
		},
	});
	const { data: users } = useQuery('users', getUsers);
	const { user } = useContext(AuthContext);

	const fetch = async (id: any) => {
		const appointment = await getAppointment(id);
		await setValues(appointment);
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
				<h5 className='card-title'>{mode} Appointment</h5>
			</div>
			<div className='card-body'>
				<form onSubmit={handleSubmit}>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-12 col-md-4'>
								<TextInput
									label="Child's Name"
									name='child'
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
									label="Father's Name"
									name='father'
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
									label="Mothers's Name"
									name='mother'
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
									type='date'
									label='Birthday'
									name='birthday'
									isSubmitting={isSubmitting}
									handleBlur={handleBlur}
									handleChange={handleChange}
									touched={touched}
									errors={errors}
									values={values}
									max={dayjs().subtract(1, 'day').toJSON()}
								/>
							</div>
							<div className='col-12 col-md-4'>
								<TextInput
									label='Place of Birth'
									name='place_of_birth'
									isSubmitting={isSubmitting}
									handleBlur={handleBlur}
									handleChange={handleChange}
									touched={touched}
									errors={errors}
									values={values}
								/>
							</div>
							<div className='col-12 col-md-4'>
								<SelectInput
									label='Sex'
									name='sex'
									isSubmitting={isSubmitting}
									handleBlur={handleBlur}
									handleChange={handleChange}
									touched={touched}
									errors={errors}
									values={values}>
									<option value='Male'>Male</option>
									<option value='Female'>Female</option>
								</SelectInput>
							</div>
							{user?.role === 'admin' ? (
								<>
									<div className='col-12 col-md-6 col-lg-3'>
										<TextInput
											label='Height'
											name='height'
											isSubmitting={isSubmitting}
											handleBlur={handleBlur}
											handleChange={handleChange}
											touched={touched}
											errors={errors}
											values={values}
										/>
									</div>
									<div className='col-12 col-md-6 col-lg-3'>
										<TextInput
											label='Weight'
											name='weight'
											isSubmitting={isSubmitting}
											handleBlur={handleBlur}
											handleChange={handleChange}
											touched={touched}
											errors={errors}
											values={values}
										/>
									</div>{' '}
								</>
							) : null}
							{user?.role === 'admin' ? (
								<>
									<div className='col-12 col-md-6 col-lg-3'>
										<SelectInput
											label='User'
											name='user_id'
											isSubmitting={isSubmitting}
											handleBlur={handleBlur}
											handleChange={handleChange}
											touched={touched}
											errors={errors}
											values={values}>
											<option value=''> -- Select -- </option>
											{users
												?.filter((user) => user.role === 'user')
												.map((user, index) => (
													<option value={user.id} key={index}>
														{user.name}
													</option>
												))}
										</SelectInput>
									</div>
									<div className='col-12 col-md-6 col-lg-3'>
										<SelectInput
											label={`Attendee ${!assign ? '(disabled)' : ''}`}
											name='attendee_id'
											isSubmitting={isSubmitting || !assign}
											handleBlur={handleBlur}
											handleChange={handleChange}
											touched={touched}
											errors={errors}
											values={values}>
											<option value=''> -- Select -- </option>
											{users
												?.filter((user) => user.role === 'admin')
												.map((user, index) => (
													<option value={user.id} key={index}>
														{user.name}
													</option>
												))}
										</SelectInput>
										<div className='form-check ps-0'>
											<input
												className='form-check-input'
												type='checkbox'
												id='assign'
												name='assign'
												checked={assign}
												onChange={() => {
													if (assign) {
														setValues({
															...values,
															attendee_id: '' as any,
														});
													}
													setAssign();
												}}
												disabled={isSubmitting}
											/>
											<label className='custom-control-label' htmlFor='assign'>
												Assign
											</label>
										</div>
									</div>
								</>
							) : null}
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
