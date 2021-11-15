import React, { FC, useEffect, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Announcements from '../Components/Announcements';
import Card from '../Components/Card';
import Appointments from '../Components/Patient/Appointments';
import FAQs from '../Components/FAQs';
import Navbar from '../Components/Home/Navbar';
import Modal from '../Components/Modal';
import { UserContract } from '../Contracts/user.contract';
import { useArray, useAuthenticate, useCollection, useNullable, useURL } from '../hooks';
import { State } from '../Libraries/state.library';
import { Appointment } from '../Models/appointment.model';
import { routes } from '../routes';
import Profile from '../Components/Profile';
import { Asker, getAppointments } from '../helpers';
import { Question } from '../Models/question.model';
import { Question as AppointmentQuestion } from '../Contracts/appointment.contract';
import { useForm } from 'react-hook-form';
import Flatpickr from 'react-flatpickr';
import dayjs from 'dayjs';
import axios from 'axios';
import { PROXY_URL } from '../constants';

type Props = {};

type Inputs = {
	mother: string;
	father: string;
	height: string;
	weight: string;
	gender: string;
	name_of_child: string;
};

const state = State.getInstance();

const id = String.random(20);

const Patient: FC<Props> = (props) => {
	const url = useURL();
	const user = state.get<UserContract>('user');
	const { authenticated } = useAuthenticate();
	const [appointments, setAppointments] = useCollection<Appointment>();
	const [questions, setQuestions] = useCollection<Question>();
	const [appointmentQuestions, setAppointmentQuestions] = useArray<AppointmentQuestion>();
	const { register, handleSubmit } = useForm<Inputs>();
	const [birthday, setBirthday] = useNullable<Date>();

	const get = async () => {
		await Promise.all([getAppointmentsRaw(), getQuestions()]);
	};

	const getQuestions = async () => {
		try {
			const questions = await new Question().all();
			setQuestions(questions);
		} catch (error) {
			console.log(error);
			toastr.error('Unable to fetch vaccine questions.');
		}
	};

	const getAppointmentsRaw = async () => {
		setAppointments(await getAppointments());
	};

	const submit = async (data: Inputs) => {
		if (await Asker.notice('Are you sure you want to submit this appointment?')) {
			$(`#${id}`).modal('hide');
			try {
				const appointment = new Appointment();
				appointment.fill({
					...data,
					date_of_birth: birthday?.toJSON(),
					attendee_id: null,
					done: false,
					patient_id: user?.id,
					dates: [],
					questions: appointmentQuestions,
					height: 'Pending',
					weight: 'Pending',
				});

				await appointment.save();

				const message = `Hi ${user?.name}, you have made an appointment at ${dayjs().format(
					'MMMM DD, YYYY hh:ss A'
				)}. Please wait for further notification for the designation of vaccine.`;

				await Promise.all([
					axios.post(`${PROXY_URL}/mail`, { email: user?.email, message, subject: 'VMS Appointment' }).catch(() => {}),
					axios.post(`${PROXY_URL}/sms`, { numbers: [user?.phone], message }).catch(() => {}),
				]);

				toastr.success('Appointment saved successfully.');
			} catch (error) {
				console.log(error);
				toastr.error('Unable to save appointment.');
			} finally {
				await get();
			}
		}
	};

	useEffect(() => {
		get();
		$(`#${id}`).on('hidden.bs.modal', (e) => {
			e.preventDefault();
		});
		// eslint-disable-next-line
	}, []);

	const pastAppointments = useMemo(() => appointments.filter((appointment) => appointment.get('done')), [appointments]);

	if (!authenticated) {
		return null;
	}

	return (
		<>
			<Navbar />
			<div style={{ backgroundColor: '#1884C1' }} className='py-5'>
				<div className='container text-white'>
					<div className='row'>
						<div className='col-12 col-md-8'>
							<h1>Welcome back, {user?.name}</h1>
							<p className='lead'>Welcome to Vaccine Monitoring and Scheduling System</p>
							<button
								className='btn btn-info'
								onClick={(e) => {
									e.preventDefault();
									get();
									$(`#${id}`).modal('show');
								}}>
								Make an Appointment
							</button>
							<form onSubmit={handleSubmit(submit)}>
								<Modal
									id={id}
									title='Make an Appointment'
									size='lg'
									buttons={
										<button type='submit' className='btn btn-primary btn-sm'>
											Submit
										</button>
									}>
									<div className='container'>
										<div className='row'>
											<div className='form-group col-12 col-md-4'>
												<label htmlFor='father'>Name of Father</label>
												<input {...register('father')} type='text' id='father' className='form-control' />
											</div>
											<div className='form-group col-12 col-md-4'>
												<label htmlFor='mother'>Name of Mother</label>
												<input {...register('mother')} type='text' id='mother' className='form-control' />
											</div>
											<div className='form-group col-12 col-md-4'>
												<label htmlFor='name_of_child'>Name of Child</label>
												<input
													{...register('name_of_child')}
													type='text'
													id='name_of_child'
													className='form-control'
												/>
											</div>
											<div className='form-group col-12 col-md-6'>
												<label htmlFor='birthday'>Date of Birth</label>
												<Flatpickr
													type='text'
													id='birthday'
													className='form-control'
													value={birthday || undefined}
													onChange={(dates) => {
														setBirthday(dates.first());
													}}
												/>
											</div>
											<div className='form-group col-12 col-md-6'>
												<label htmlFor='gender'>Sex</label>
												<select {...register('gender')} id='gender' className='form-control'>
													<option value='Male'>Male</option>
													<option value='Female'>Female</option>
												</select>
											</div>
											{questions.map((question, index) => (
												<div className='form-group col-12 col-md-6' key={index}>
													<label htmlFor={`question-${index}`}>{question.get('question')}</label>
													<input
														type='text'
														id={`question-${index}`}
														className='form-control'
														onChange={(e) => {
															const index = appointmentQuestions.findIndex((q) => q.id === question.id());
															const answer = appointmentQuestions[index];
															if (answer) {
																answer.answer = e.target.value;
																appointmentQuestions.splice(index, 1, answer);
															} else {
																appointmentQuestions.push({
																	id: question.id(),
																	question: question.get('question'),
																	answer: e.target.value,
																});
															}

															setAppointmentQuestions([...appointmentQuestions]);
														}}
														value={appointmentQuestions.find((q) => q.id === question.id())?.answer}
													/>
												</div>
											))}
										</div>
									</div>
								</Modal>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className='container' style={{ marginTop: '-2.5rem' }}>
				<div className='row mt-3'>
					<div className='col-12 col-md-8 h-100'>
						<Switch>
							<Route path={url('')} exact component={Appointments} />
							<Route path={url(routes.PROFILE)} component={Profile} />
						</Switch>
						<FAQs className='mt-3' />
					</div>
					<div className='col-12 col-md-4'>
						<div className='container-fluid'>
							<div className='row'>
								<div className='col-12'>
									<Card className='mb-3'>
										<h5>Past Appointments</h5>
										{pastAppointments.length > 0 ? (
											<>
												<div className='mt-3'>
													{pastAppointments.map((appointment, index) => (
														<div key={index}>
															<p className='mb-0'>{appointment.get('vaccine')?.name || null}</p>
															<p className='mb-0'>
																{appointment.get('attendee')?.name || ''}{' '}
																{dayjs(appointment.get('created_at')).format('MMMM DD, YYYY hh:mm A')}
															</p>
														</div>
													))}
												</div>
											</>
										) : (
											<div className='mt-3 text-center'>
												<p>You don't have any past appointments</p>
											</div>
										)}
									</Card>
									<Card className='my-3'>
										<h5>Next Step</h5>
										<div className='text-center'>
											<i
												className='material-icons text-warning border rounded-circle shadow-sm p-1 mb-2'
												style={{ fontSize: '3rem' }}>
												checklist
											</i>
											<h6>Update us on your health</h6>
											<p>Any updates about side effects you may have can benefit science.</p>
										</div>
									</Card>
									<Announcements />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Patient;
