import React, { FC, useEffect, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import Announcements from '../Components/Announcements';
import Card from '../Components/Card';
import Appointments from '../Components/Patient/Appointments';
import FAQs from '../Components/FAQs';
import Navbar from '../Components/Home/Navbar';
import Modal from '../Components/Modal';
import { UserContract } from '../Contracts/user.contract';
import { useAuthenticate, useCollection, useNullable, useURL } from '../hooks';
import { State } from '../Libraries/state.library';
import { Appointment } from '../Models/appointment.model';
import { Vaccine } from '../Models/vaccine.model';
import { routes } from '../routes';
import Profile from '../Components/Profile';
import { Date } from '../Models/date.model';
import { getAppointments } from '../helpers';

type Props = {};

const state = State.getInstance();

const id = String.random(20);

const Patient: FC<Props> = (props) => {
	const url = useURL();
	const user = state.get<UserContract>('user');
	const { authenticated } = useAuthenticate();
	const [vaccines, setVaccines] = useCollection<Vaccine>();
	const [vaccine, setVaccine] = useNullable<Vaccine>();
	const [appointments, setAppointments] = useCollection<Appointment>();

	const get = async () => {
		await Promise.all([getVaccines(), getAppointmentsRaw()]);
	};

	const getVaccines = async () => {
		try {
			const vaccines = await new Vaccine().all();

			await Promise.all(
				vaccines.map(async (vaccine) => {
					const dates = await new Date().where('vaccine_id', '==', vaccine.id()!).all();

					vaccine.set('dates', dates.toJSON());
				})
			);

			setVaccines(vaccines);
		} catch (error) {
			console.log(error);
			toastr.error('Unable to fetch vaccine list.');
		}
	};

	const getAppointmentsRaw = async () => {
		setAppointments(await getAppointments());
	};

	const submit = async () => {
		$(`#${id}`).modal('hide');
		try {
			const appointment = new Appointment();
			appointment.fill({
				vaccine_id: vaccine?.id(),
				attendee_id: null,
				done: false,
				patient_id: user?.id,
				dates: [],
			});

			await appointment.save();

			toastr.success('Appointment saved successfully.');
		} catch (error) {
			console.log(error);
			toastr.error('Unable to save appointment.');
		} finally {
			await get();
		}
	};

	useEffect(() => {
		get();
		$(`#${id}`).on('hidden.bs.modal', (e) => {
			e.preventDefault();
			setVaccine(null);
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
							<form
								onSubmit={(e) => {
									e.preventDefault();
									submit();
								}}>
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
										<div className='form-group'>
											<label htmlFor='vaccine'>Vaccine</label>
											<select
												className='form-control'
												onChange={(e) => {
													const id = e.target.value;
													const vaccine = vaccines.get(id);
													setVaccine(vaccine || null);
												}}
												value={vaccine?.id() || 'none'}>
												<option value='none' disabled>
													{' '}
													-- Select --{' '}
												</option>
												{vaccines
													.filter((vaccine) => {
														if (
															appointments.has(
																(appointment) => appointment.get('vaccine_id') === vaccine.id()
															)
														) {
															return false;
														}

														return true;
													})
													.map((vaccine, index) => (
														<option value={vaccine.id()} key={index}>
															{vaccine.get('name')}
														</option>
													))}
											</select>
										</div>
										{vaccine ? (
											<>
												<h6 className='text-center'>Available Dates</h6>
												<div className='container'>
													<div className='row'>
														{vaccine.get('dates')?.map((date, parentIndex) =>
															date.dates.map((date, childIndex) => (
																<div
																	key={`${parentIndex}-${childIndex}`}
																	className='col-12 col-md-6 col-lg-4 col-xl-3 text-center'>
																	{date.toDayJS().format('MMMM DD, YYYY')}
																</div>
															))
														)}
													</div>
												</div>
											</>
										) : null}
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
														<p key={index}>{appointment.get('vaccine')?.name}</p>
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
