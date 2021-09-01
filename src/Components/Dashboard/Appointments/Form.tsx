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
				setVaccine(await appointment.vaccine().get());
				await appointment
					.fill({
						...data,
						date_of_birth: birthday?.toJSON(),
						dates,
					})
					.save();
			}
			toastr.success('Appointment saved successfully.');
			reset();
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
							{patients.map((patient, index) => (
								<option value={patient.id()} key={index}>
									{patient.get('name')}
								</option>
							))}
						</select>
					</div>
					<div className='form-group col-12 col-md-6 col-lg-4'>
						<label htmlFor='patient_id'>Parent</label>
						<select {...register('patient_id')} id='patient_id' className='form-control' disabled={processing}>
							{patients.map((patient, index) => (
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
						<label htmlFor='gender'>Gender</label>
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
							<h6>Completed Dates</h6>
							{vaccine.get('dates')?.map((parentDate, parentIndex) =>
								parentDate.dates.map((childDate, childIndex) => (
									<div className='form-group col-12' key={`${parentIndex}-${childIndex}`}>
										<label htmlFor={parentDate.id}>{childDate}</label>
										<input
											type='checkbox'
											id={parentDate.id}
											className='form-control'
											checked={dates.includes(childDate)}
											onChange={() => {
												if (dates.includes(childDate)) {
													const index = dates.indexOf(childDate);
													dates.splice(index, 1);
												} else {
													dates.push(childDate);
												}
												setDates([...dates]);
											}}
										/>
									</div>
								))
							)}
						</>
					) : null}
					<div className='form-group col-12'>
						<label htmlFor='done'>Done</label>
						<input {...register('done')} type='checkbox' id='done' className='form-control' disabled={processing} />
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
