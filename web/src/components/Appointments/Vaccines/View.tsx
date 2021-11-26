import { useNullable } from '@avidian/hooks';
import React, { FC, useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router';
import { AppointmentVaccineContract } from '../../../contracts/appointment-vaccine.contract';
import { getAppointmentVaccine } from '../../../queries/appointment-vaccine.query';
import { routes } from '../../../routes';
import Modal from '../../Shared/Modal';
import { Modal as BSModal } from 'bootstrap';
import TextInput from '../../Shared/TextInput';
import { useFormik } from 'formik';
import { Asker, handleError } from '../../../helpers';
import * as Yup from 'yup';
import {
	createAppointmentVaccineDate,
	deleteAppointmentVaccineDate,
	updateAppointmentVaccineDate,
} from '../../../queries/appointment-vaccine-date.query';
import dayjs from 'dayjs';

type Props = {};

const View: FC<Props> = (props) => {
	const match = useMatch(`${routes.DASHBOARD}/${routes.APPOINTMENTS}/:appointment_id/view/vaccine/:id`);
	const navigate = useNavigate();
	const [appointmentVaccine, setAppointmentVaccine] = useNullable<AppointmentVaccineContract>();
	const [modal, setModal] = useNullable<BSModal>();

	const fetch = async (id: any) => {
		try {
			const appointmentVaccine = await getAppointmentVaccine(id);
			if (appointmentVaccine.appointment_id.toString() !== match?.params.appointment_id) {
				throw new Error();
			}
			setAppointmentVaccine(appointmentVaccine);
		} catch (error) {
			console.error(error);
			navigate(-1);
			toastr.error('Unable to fetch assigned vaccination date.');
		}
	};

	const appointmentVaccineDateForm = useFormik({
		initialValues: {
			date: '',
		},
		validationSchema: Yup.object({
			date: Yup.date().required('Date is required.'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				await createAppointmentVaccineDate({
					date: values.date,
					appointment_vaccine_id: appointmentVaccine?.id,
					done: false,
				});
				toastr.success('Vaccination date assigned successfully!');
				modal?.hide();
			} catch (error) {
				handleError(error);
			} finally {
				fetch(match?.params.id);
				setSubmitting(false);
			}
		},
	});

	const removeAppointmentVaccineDate = async (id: any) => {
		if (await Asker.danger('Are you sure you want to remove this assigned vaccination date? All related data will be lost.')) {
			try {
				await deleteAppointmentVaccineDate(id);
				toastr.success('Assignment of vaccination date removed.');
				fetch(match?.params.id);
			} catch (error) {
				console.error(error);
				toastr.error('Unable to remove assigned vaccination date.');
			}
		}
	};

	const markAppointmentVaccineDateAsDone = async (id: any) => {
		if (await Asker.notice("Are you sure you want to mark this assigned date as 'Done'?")) {
			try {
				await updateAppointmentVaccineDate(id, { done: true });
				toastr.success("Assigned vaccination date has been marked as 'Done' successfully!");
			} catch (error) {
				console.error(error);
				toastr.error("Unable to mark assigned vaccination date as 'Done'.");
			} finally {
				fetch(match?.params.id);
			}
		}
	};

	useEffect(() => {
		if (match) {
			fetch(match.params.id);
		} else {
			navigate(-1);
		}
		//eslint-disable-next-line
	}, []);

	if (!match) {
		return null;
	}

	if (!appointmentVaccine) {
		return null;
	}

	return (
		<div className='container-fluid'>
			<div className='card'>
				<div className='card-header'>
					<h6>View Assigned Vaccine</h6>
					<button
						className='btn btn-info btn-sm'
						onClick={(e) => {
							e.preventDefault();
							navigate(-1);
						}}>
						Go Back
					</button>
				</div>
				<div className='card-body'>
					<div className='card-text'>
						Appointment ID: <b>{appointmentVaccine.appointment_id}</b>
					</div>
					<div className='card-text'>
						Vaccine ID: <b>{appointmentVaccine.vaccine_id}</b>
					</div>
					<div className='card-text'>
						Vaccine Name: <b>{appointmentVaccine.vaccine?.name}</b>
					</div>
					<hr className='my-3' />
					<button
						className='btn btn-primary btn-sm mt-2'
						onClick={(e) => {
							e.preventDefault();
							modal?.show();
						}}>
						Assign Date
					</button>
					<div className='row'>
						{appointmentVaccine.appointment_dates?.map((appointmentVaccineDate, index) => (
							<div className='col-12 col-md-6 col-xxl-4 p-2' key={index}>
								<div className='card'>
									<div className='card-body'>
										<div className='card-text'>
											Date: <b className='ms-1'>{dayjs(appointmentVaccineDate.date).format('MMMM DD, YYYY')}</b>
										</div>
										<div className='card-text'>
											Done:{' '}
											{appointmentVaccineDate.done ? (
												<span className='badge rounded-pill bg-success'>Yes</span>
											) : (
												<span className='badge rounded-pill bg-danger'>No</span>
											)}
										</div>
									</div>
									<div className='card-footer'>
										<small className='card-text'>
											Assigned: {dayjs(appointmentVaccineDate.created_at).format('MMMM DD, YYYY')}
										</small>
										<div className='mt-2'>
											{!appointmentVaccineDate.done ? (
												<button
													className='btn btn-success btn-sm mx-1'
													onClick={(e) => {
														e.preventDefault();
														markAppointmentVaccineDateAsDone(appointmentVaccineDate.id);
													}}>
													Mark as 'Done'
												</button>
											) : null}
											<button
												className='btn btn-danger btn-sm mx-1'
												onClick={(e) => {
													e.preventDefault();
													removeAppointmentVaccineDate(appointmentVaccineDate.id);
												}}
												disabled={appointmentVaccineDate.done}>
												Delete
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<form onSubmit={appointmentVaccineDateForm.handleSubmit}>
				<Modal
					title='Assign Date'
					ref={(ref) => {
						if (ref && !modal) {
							setModal(new BSModal(ref, { backdrop: 'static' }));
						}
					}}
					footer={
						<button type='submit' className='btn btn-info btn-sm'>
							Submit
						</button>
					}>
					<TextInput
						type='date'
						label='Date'
						name='date'
						isSubmitting={appointmentVaccineDateForm.isSubmitting}
						handleBlur={appointmentVaccineDateForm.handleBlur}
						handleChange={appointmentVaccineDateForm.handleChange}
						touched={appointmentVaccineDateForm.touched}
						errors={appointmentVaccineDateForm.errors}
						values={appointmentVaccineDateForm.values}
					/>
				</Modal>
			</form>
		</div>
	);
};

export default View;
