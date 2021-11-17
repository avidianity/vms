import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Question } from '../../../Contracts/appointment.contract';
import { useArray, useCollection, useMode, useNullable } from '../../../hooks';
import Card from '../../Card';
import Flatpickr from 'react-flatpickr';
import { useHistory, useRouteMatch } from 'react-router';
import { Appointment } from '../../../Models/appointment.model';
import { Vaccine } from '../../../Models/vaccine.model';
import { User } from '../../../Models/user.model';
import { UserContract } from '../../../Contracts/user.contract';
import { VaccineContract } from '../../../Contracts/vaccine.contract';
import dayjs from 'dayjs';
import { State } from '../../../Libraries/state.library';
import { flatten } from 'lodash';
import axios from 'axios';
import { PROXY_URL } from '../../../constants';

type Props = {};

type Inputs = {
	vaccine_id: string;
	attendee_id: string | null;
	patient_id: string;
	done: boolean;
	dates: string[];
	name_of_child: string;
	mother: string;
	date_of_birth: string;
	height: string;
	weight: string;
	gender: string;
};

const state = State.getInstance();

const Form: FC<Props> = (props) => {
	const [mode, setMode] = useMode('Edit');
	const [processing, setProcessing] = useState(false);
	const { register, reset, handleSubmit, setValue } = useForm<Inputs>();
	const [birthday, setBirthday] = useNullable<Date>();
	const [vaccine, setVaccine] = useNullable<Vaccine>();
	const [questions, setQuestions] = useArray<Question>();
	const [patients, setPatients] = useCollection<User, UserContract>();
	const [vaccines, setVaccines] = useCollection<Vaccine, VaccineContract>();
	const [dates, setDates] = useArray<string>();
	const match = useRouteMatch<{ id: string }>();
	const history = useHistory();
	const [previousDates, setPreviousDates] = useArray<string>();
	const user = state.get<UserContract>('user');

	const submit = async (data: Inputs) => {
		setProcessing(true);
		try {
			if (mode === 'Add') {
				await Appointment.createQueryBuilder().create({
					...data,
					date_of_birth: birthday?.toJSON(),
				});
			} else {
				const appointment = await new Appointment().findOneOrFail(match.params.id);
				const hasNoVaccine = !appointment.get('vaccine_id');
				const hasDoneNewDate = dates.length > appointment.get('dates').length;
				await appointment
					.fill({
						...data,
						date_of_birth: birthday?.toJSON(),
						dates,
					})
					.save();
				const patient = await appointment.patient().get();
				if (hasNoVaccine && data.vaccine_id && patient) {
					const vaccine = await new Vaccine().findOneOrFail(data.vaccine_id);
					const dates = await vaccine.dates().get();
					const sorted = flatten(dates.map((date) => date.get('dates'))).sort((next, prev) => {
						if (dayjs(next).isAfter(dayjs(prev))) {
							return 1;
						}
						if (dayjs(next).isBefore(dayjs(prev))) {
							return -1;
						}
						return 0;
					});
					const firstDate = sorted
						.filter((date) => {
							return dayjs().isBefore(dayjs(date));
						})
						.filter((date) => {
							return appointment.get('dates').find((done) => {
								return (
									dayjs(done).isSame(dayjs(date), 'date') &&
									dayjs(done).isSame(dayjs(date), 'month') &&
									dayjs(done).isSame(dayjs(date), 'year')
								);
							})
								? false
								: true;
						})
						.first();
					const message = `Hi ${patient.get('name')}, ${user?.name} has assigned the vaccine: ${vaccine.get(
						'name'
					)} to your appointment created at ${dayjs(appointment.get('created_at')).format(
						'MMMM DD, YYYY hh:mm A'
					)}. Your next appointment will be on ${dayjs(firstDate).format('MMMM DD, YYYY')}.`;

					await Promise.all([
						axios
							.post(`${PROXY_URL}/mail`, { email: patient.get('email'), message, subject: 'VMS Vaccine Assignment' })
							.catch(() => {}),
						axios.post(`${PROXY_URL}/sms`, { numbers: [patient.get('phone')], message }).catch(() => {}),
					]);
				}

				if (hasDoneNewDate && data.vaccine_id && patient) {
					const vaccine = await new Vaccine().findOneOrFail(data.vaccine_id);
					const dates = await vaccine.dates().get();
					const sorted = flatten(dates.map((date) => date.get('dates'))).sort((next, prev) => {
						if (dayjs(next).isAfter(dayjs(prev))) {
							return 1;
						}
						if (dayjs(next).isBefore(dayjs(prev))) {
							return -1;
						}
						return 0;
					});
					const firstDate = sorted
						.filter((date) => {
							return dayjs().isBefore(dayjs(date));
						})
						.filter((date) => {
							return appointment.get('dates').find((done) => {
								return (
									dayjs(done).isSame(dayjs(date), 'date') &&
									dayjs(done).isSame(dayjs(date), 'month') &&
									dayjs(done).isSame(dayjs(date), 'year')
								);
							})
								? false
								: true;
						})
						.first();
					let message: string;
					if (firstDate && appointment.get('dates').length < sorted.length) {
						message = `Hi ${patient.get('name')}, your next appointment will be on ${dayjs(firstDate).format(
							'MMMM DD, YYYY'
						)}.`;
					} else {
						message = `Hi ${patient.get(
							'name'
						)}, You have finished all your appointments. Please make sure to keep your vaccination card. Thank you!`;
					}
					await Promise.all([
						axios
							.post(`${PROXY_URL}/mail`, { email: patient.get('email'), message, subject: 'VMS Vaccine Appointment' })
							.catch(() => {}),
						axios.post(`${PROXY_URL}/sms`, { numbers: [patient.get('phone')], message }).catch(() => {}),
					]);
				}
			}
			toastr.success('Appointment saved successfully.');
			reset();
			history.goBack();
		} catch (error) {
			console.log(error);
			toastr.error('Unable to save appointment.');
		} finally {
			setProcessing(false);
		}
	};

	const get = async () => {
		setProcessing(true);
		try {
			const appointment = await new Appointment().findOneOrFail(match.params.id);
			const data = appointment.getData();
			for (const [key, value] of Object.entries(data)) {
				setValue(key as any, value);
			}
			setQuestions(data.questions);
			setBirthday(data.date_of_birth.toDate());
			setPreviousDates(data.dates);
			const vaccine = await appointment.vaccine().get();
			await vaccine?.load(['dates']);
			setVaccine(vaccine);
		} catch (error) {
			console.log(error);
			toastr.error('Unable to fetch appointment.');
			history.goBack();
		} finally {
			setProcessing(false);
		}
	};

	const fetchPatients = async () => {
		try {
			const patients = await new User().all();
			setPatients(patients);
		} catch (error) {
			console.log(error);
			toastr.error('Unable to fetch patients.');
		}
	};

	const fetchVaccines = async () => {
		try {
			const vaccines = await new Vaccine().all();
			setVaccines(vaccines);
		} catch (error) {
			console.log(error);
			toastr.error('Unable to fetch vaccines.');
		}
	};

	const fetch = async () => {
		await Promise.all([fetchPatients(), fetchVaccines()]);
	};

	useEffect(() => {
		fetch();
		if (match.path.includes('edit')) {
			setMode('Edit');
			get();
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='container'>
			<Card>
				<h4>{mode} Appointment</h4>
				<form onSubmit={handleSubmit(submit)} className='form-row'>
					<div className='form-group col-12 col-md-6 col-lg-4'>
						<label htmlFor='vaccine_id'>Vaccine</label>
						<select
							{...register('vaccine_id')}
							id='vaccine_id'
							className='form-control'
							disabled={processing}
							onChange={async (e) => {
								const id = e.target.value;
								const vaccine = vaccines.get(id);
								if (vaccine) {
									await vaccine.load(['dates']);
									setVaccine(vaccine);
								} else {
									setVaccine(null);
								}
							}}>
							<option> -- Select -- </option>
							{vaccines.map((vaccine, index) => (
								<option value={vaccine.id()} key={index}>
									{vaccine.get('name')}
								</option>
							))}
						</select>
					</div>
					<div className='form-group col-12 col-md-6 col-lg-4'>
						<label htmlFor='attendee_id'>Attendee</label>
						<select {...register('attendee_id')} id='attendee_id' className='form-control' disabled={processing}>
							{patients
								.filter((patient) => patient.get('role') === 'Health Worker')
								.map((patient, index) => (
									<option value={patient.id()} key={index}>
										{patient.get('name')}
									</option>
								))}
						</select>
					</div>
					<div className='form-group col-12 col-md-6 col-lg-4'>
						<label htmlFor='patient_id'>Parent</label>
						<select {...register('patient_id')} id='patient_id' className='form-control' disabled={processing}>
							{patients
								.filter((patient) => patient.get('role') === 'Patient')
								.map((patient, index) => (
									<option value={patient.id()} key={index}>
										{patient.get('name')}
									</option>
								))}
						</select>
					</div>
					<div className='form-group col-12 col-md-6'>
						<label htmlFor='name_of_child'>Name of Child</label>
						<input
							{...register('name_of_child')}
							type='text'
							id='name_of_child'
							className='form-control'
							disabled={processing}
						/>
					</div>
					<div className='form-group col-12 col-md-6'>
						<label htmlFor='mother'>Mother</label>
						<input {...register('mother')} type='text' id='mother' className='form-control' disabled={processing} />
					</div>
					<div className='form-group col-12 col-md-6 col-lg-3'>
						<label htmlFor='date_of_birth'>Date of Birth</label>
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
					<div className='form-group col-12 col-md-6 col-lg-3'>
						<label htmlFor='height'>Height</label>
						<input {...register('height')} type='text' id='height' className='form-control' disabled={processing} />
					</div>
					<div className='form-group col-12 col-md-6 col-lg-3'>
						<label htmlFor='weight'>Weight</label>
						<input {...register('weight')} type='text' id='weight' className='form-control' disabled={processing} />
					</div>

					<div className='form-group col-12 col-md-6 col-lg-3'>
						<label htmlFor='gender'>Sex</label>
						<select {...register('gender')} id='gender' className='form-control' disabled={processing}>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
						</select>
					</div>
					<div className='form-group col-12'>
						<label htmlFor='questions'>Questions and Answers</label>
						{questions.map((item, index) => (
							<div key={index}>
								<h6>{item.question}</h6>
								<p className='text-muted'>{item.answer}</p>
							</div>
						))}
					</div>
					{mode === 'Edit' && vaccine ? (
						<>
							<div className='col-12'>
								<h6>Completed Dates</h6>
							</div>
							{vaccine.get('dates')?.map((parentDate, parentIndex) =>
								parentDate.dates.map((childDate, childIndex) => (
									<div className='form-group col-12 col-md-6 col-lg-4' key={`${parentIndex}-${childIndex}`}>
										<div className='checkbox checkbox-circle checkbox-info peers ai-c'>
											<input
												id={parentDate.id}
												type='checkbox'
												className='peer'
												disabled={processing}
												checked={dates.includes(childDate) || previousDates.includes(childDate)}
												onChange={() => {
													if (!previousDates.includes(childDate)) {
														if (dates.includes(childDate)) {
															const index = dates.indexOf(childDate);
															dates.splice(index, 1);
														} else {
															dates.push(childDate);
														}
														setDates([...dates]);
													}
												}}
											/>
											<label htmlFor={parentDate.id} className='form-label peers peer-greed js-sb ai-c'>
												<span className='peer peer-greed'>{dayjs(childDate).format('MMMM DD, YYYY')}</span>
											</label>
										</div>
									</div>
								))
							)}
						</>
					) : null}
					<div className='form-group col-12'>
						<hr />
						<div className='checkbox checkbox-circle checkbox-info peers ai-c'>
							<input {...register('done')} id='done' type='checkbox' className='peer' disabled={processing} />
							<label htmlFor='done' className='form-label peers peer-greed js-sb ai-c'>
								<span className='peer peer-greed'>Done</span>
							</label>
						</div>
					</div>
					<div className='form-group col-12'>
						<button type='submit' className='btn btn-primary btn-sm' disabled={processing}>
							Submit
						</button>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default Form;
