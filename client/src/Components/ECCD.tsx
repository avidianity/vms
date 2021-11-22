import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { AppointmentContract } from '../Contracts/appointment.contract';
import { useNullable } from '../hooks';
import { Appointment } from '../Models/appointment.model';

type Props = {};

const ECCD: FC<Props> = (props) => {
	const [item, setItem] = useNullable<AppointmentContract>();
	const [loaded, setLoaded] = useState(false);
	const history = useHistory();
	const params = useParams<{ id: string }>();

	const fetch = async () => {
		try {
			const appointment = await new Appointment().findOneOrFail(params.id);
			await appointment.load(['attendee', 'patient', 'vaccine']);
			setItem(appointment.getData());
			setLoaded(true);
		} catch (error) {
			console.log(error);
			toastr.error('Unable to fetch appointment.');
			history.goBack();
		}
	};

	useEffect(() => {
		fetch();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (loaded) {
			window.print();
		}
	}, [loaded]);

	return (
		<div className='container pt-5'>
			<div className='text-center mb-5'>
				<h1>The Early Childhood Care and Development (ECCD) Card</h1>
			</div>
			<hr />
			<p>Complete Address of Family (House No., Street, City/Province)</p>
			<b>{item?.patient?.address}</b>
			<hr />
			<p>Child's Name</p>
			<b>{item?.name_of_child}</b>
			<hr />
			<p>Mother's Name</p>
			<b>{item?.mother}</b>
			<hr />
			<p>Birth Date</p>
			<b>{item?.date_of_birth ? dayjs(item?.date_of_birth).format('MMMM DD, YYYY') : item?.date_of_birth}</b>
			<hr />
			<p>Attendee</p>
			<b>{item?.attendee?.name}</b>
			<hr />
			<div className='text-center'>
				<h4>Essential Health and Nutrition Services</h4>
				<div className='card'>
					<div className='card-body'>
						<div className='table-responsive'>
							<table className='table'>
								<thead>
									<tr>
										<th></th>
										<th colSpan={item?.dates?.length}>Date Administered</th>
									</tr>
									<tr>
										<th>Vaccine</th>
										{item?.dates?.map((_, index) => (
											<th key={index}>{index + 1}</th>
										))}
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{item?.vaccine?.name}</td>
										{item?.dates?.map((date, index) => (
											<td key={index}>{dayjs(date).format('MMMM DD, YYYY')}</td>
										))}
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ECCD;
