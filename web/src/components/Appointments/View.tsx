import { useNullable } from '@avidian/hooks';
import dayjs from 'dayjs';
import React, { FC, useContext, useEffect } from 'react';
import { useNavigate, useMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { AppointmentContract } from '../../contracts/appointment.contract';
import { getAppointment } from '../../queries/appointment.query';
import { routes } from '../../routes';
import Modal from '../Shared/Modal';
import { Modal as BSModal } from 'bootstrap';
import { useFormik } from 'formik';
import { createAppointmentVaccine, deleteAppointmentVaccine } from '../../queries/appointment-vaccine.query';
import { Asker, handleError } from '../../helpers';
import { useQuery } from 'react-query';
import { getVaccines } from '../../queries/vaccine.query';
import SelectInput from '../Shared/SelectInput';
import { AuthContext } from '../../contexts';

type Props = {};

const View: FC<Props> = (props) => {
	const navigate = useNavigate();
	const match = useMatch(`${routes.DASHBOARD}/${routes.APPOINTMENTS}/:id/view`);
	const [appointment, setAppointment] = useNullable<AppointmentContract>();
	const [modal, setModal] = useNullable<BSModal>();
	const { data: vaccines } = useQuery('vaccines', getVaccines);
	const { user } = useContext(AuthContext);

	const vaccineForm = useFormik({
		initialValues: {
			vaccine_id: 0,
		},
		onSubmit: async (values, { setSubmitting }) => {
			try {
				await createAppointmentVaccine({ vaccine_id: values.vaccine_id, appointment_id: appointment?.id! });
				toastr.success('Vaccine assigned successfully!');
				modal?.hide();
				vaccineForm.resetForm();
				await fetch(match?.params.id);
			} catch (error) {
				handleError(error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	const fetch = async (id: any) => {
		try {
			setAppointment(await getAppointment(id));
		} catch (error) {
			console.error(error);
			toastr.error('Unable to fetch appointment.');
		}
	};

	const removeAppointmentVaccine = async (id: any) => {
		if (await Asker.danger('Are you sure you want to remove this assigned vaccine? All related data will be lost.')) {
			try {
				await deleteAppointmentVaccine(id);
				toastr.success('Assignment of vaccine removed.');
				fetch(match?.params.id);
			} catch (error) {
				console.error(error);
				toastr.error('Unable to remove assigned vaccine.');
			}
		}
	};

	useEffect(() => {
		if (match) {
			fetch(match.params.id);
		} else {
			navigate(-1);
		}
		// eslint-disable-next-line
	}, []);

	if (!match) {
		return null;
	}

	if (!appointment) {
		return null;
	}

	return (
		<div className='container-fluid'>
			<div className='card'>
				<div className='card-header'>
					<h5 className='card-title'>View Appointment</h5>
				</div>
				<div className='card-body'>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-12'>
								Appointment ID: <b>{appointment.id}</b>
							</div>
							<div className='col-12 col-md-6 col-lg-4 py-3'>
								Child's Name: <b>{appointment.child}</b>
							</div>
							<div className='col-12 col-md-6 col-lg-4 py-3'>
								Fathers's Name: <b>{appointment.father}</b>
							</div>
							<div className='col-12 col-md-6 col-lg-4 py-3'>
								Mothers's Name: <b>{appointment.mother}</b>
							</div>
							<div className='col-12 col-md-6 col-lg-4 py-3'>
								Birthday: <b>{dayjs(appointment.birthday).format('MMMM DD, YYYY')}</b>
							</div>
							<div className='col-12 col-md-6 py-3'>
								Place of Birth: <b>{appointment.place_of_birth}</b>
							</div>
							<div className='col-12 col-md-6 col-lg-4 py-3'>
								Sex: <b>{appointment.sex}</b>
							</div>
							<div className='col-12 col-md-6 col-lg-4 py-3'>
								Height: <b>{appointment.height}</b>
							</div>
							<div className='col-12 col-md-6 col-lg-4 py-3'>
								Weight: <b>{appointment.weight}</b>
							</div>
							<div className='col-12 col-md-6 col-lg-4 py-3'>
								User: <b>{appointment.user?.name || 'N/A'}</b>
							</div>
							<div className='col-12 col-md-6 col-lg-4 py-3'>
								Attendee: <b>{appointment.attendee?.name || 'N/A'}</b>
							</div>
							<div className='col-12'>
								<hr className='my-3' />
							</div>
							{user?.role === 'admin' ? (
								<div className='col-12'>
									<button
										className='btn btn-info btn-sm'
										onClick={(e) => {
											e.preventDefault();
											vaccineForm.resetForm();
											modal?.show();
										}}>
										Assign Vaccine
									</button>
								</div>
							) : null}
							{appointment.vaccines?.map((appointmentVaccine, index) => (
								<div className='col-12 col-md-6 col-xxl-4 p-2' key={index}>
									<div className='card'>
										<div className='card-body'>
											<div className='card-text d-flex'>
												Vaccine Name: <b className='ms-1'>{appointmentVaccine.vaccine?.name}</b>
												<span className='ms-auto'>
													ID: <b>{appointmentVaccine.vaccine?.id}</b>
												</span>
											</div>
											<div className='card-text'>
												Doses: <b>{appointmentVaccine.vaccine?.doses}</b>
											</div>
											<div className='card-text'>
												Done:{' '}
												{appointmentVaccine.done ? (
													<span className='badge rounded-pill bg-success'>Yes</span>
												) : (
													<span className='badge rounded-pill bg-danger'>No</span>
												)}
											</div>
										</div>
										<div className='card-footer'>
											<small className='card-text'>
												Assigned: {dayjs(appointmentVaccine.created_at).format('MMMM DD, YYYY')}
											</small>
											<div className='mt-2'>
												<Link className='btn btn-warning btn-sm mx-1' to={`vaccine/${appointmentVaccine.id}`}>
													View
												</Link>
												{user?.role === 'admin' ? (
													<button
														className='btn btn-danger btn-sm mx-1'
														onClick={(e) => {
															e.preventDefault();
															removeAppointmentVaccine(appointmentVaccine.id);
														}}
														disabled={appointmentVaccine.done}>
														Delete
													</button>
												) : null}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<form onSubmit={vaccineForm.handleSubmit}>
				<Modal
					ref={(ref) => {
						if (ref && !modal) {
							setModal(new BSModal(ref, { backdrop: 'static' }));
						}
					}}
					title='Assign Vaccine'
					footer={
						<button type='submit' className='btn btn-info btn-sm' disabled={vaccineForm.isSubmitting}>
							Submit
						</button>
					}>
					<SelectInput
						name='vaccine_id'
						label='Vaccine'
						handleBlur={vaccineForm.handleBlur}
						handleChange={vaccineForm.handleChange}
						isSubmitting={vaccineForm.isSubmitting}
						touched={vaccineForm.touched}
						errors={vaccineForm.errors}
						values={vaccineForm.values}>
						<option value=''> -- Select -- </option>
						{vaccines?.map((vaccine, index) => (
							<option value={vaccine.id} key={index} disabled={vaccine.quantity === 0}>
								{vaccine.name} {vaccine.quantity === 0 ? '(Out Of Stock)' : ''}
							</option>
						))}
					</SelectInput>
				</Modal>
			</form>
		</div>
	);
};

export default View;
