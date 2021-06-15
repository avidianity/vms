import React, { FC } from 'react';
import { useNullable } from '../../../hooks';
import Flatpickr from 'react-flatpickr';
import dayjs from 'dayjs';

type Props = {};

const Adult: FC<Props> = (props) => {
	const [birthday, setBirthday] = useNullable<Date>();
	return (
		<div className='container'>
			<h1 className='mb-0'>Adult</h1>
			<p>Personal Information</p>
			<form className='form-row'>
				<div
					className='col-12 col-md-6 border rounded'
					style={{ padding: '3rem' }}>
					<h5>Contact Info</h5>
					<div className='form-group'>
						<label htmlFor='first_name'>First Name</label>
						<input
							type='text'
							name='first_name'
							id='first_name'
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='middle_name'>Middle Name</label>
						<input
							type='text'
							name='middle_name'
							id='middle_name'
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='last_name'>Last Name</label>
						<input
							type='text'
							name='last_name'
							id='last_name'
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='number'>Mobile #</label>
						<input
							type='text'
							name='number'
							id='number'
							className='form-control'
						/>
					</div>
				</div>
				<div
					className='col-12 col-md-6 border rounded'
					style={{ padding: '3rem' }}>
					<h5>Birthdate</h5>
					<div className='form-group'>
						<label htmlFor='birthday'>Birthday</label>
						<Flatpickr
							options={{ altInput: true }}
							value={birthday || undefined}
							onChange={(dates) => {
								setBirthday(dates.first());
							}}
						/>
					</div>
					<div className='form-group'>
						<label>Month of Birth</label>
						<input
							type='text'
							className='form-control'
							disabled
							value={
								birthday ? dayjs(birthday).format('MMMM') : ''
							}
						/>
					</div>
					<div className='form-group'>
						<label>Year of Birth</label>
						<input
							type='text'
							className='form-control'
							disabled
							value={
								birthday ? dayjs(birthday).format('YYYY') : ''
							}
						/>
					</div>
					<div className='form-group'>
						<label>Age</label>
						<input
							type='text'
							className='form-control'
							disabled
							value={
								birthday
									? dayjs().year() - dayjs(birthday).year()
									: ''
							}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='address'>Address</label>
						<input
							type='text'
							name='address'
							id='address'
							className='form-control'
						/>
					</div>
				</div>
				<div className='col-12 pt-3'>
					<button type='submit' className='btn btn-primary'>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default Adult;
