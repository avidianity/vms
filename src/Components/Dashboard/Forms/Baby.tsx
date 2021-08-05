import React, { FC } from 'react';
import { useNullable } from '../../../hooks';
import Flatpickr from 'react-flatpickr';
import dayjs from 'dayjs';

type Props = {};

const Baby: FC<Props> = (props) => {
	const [birthday, setBirthday] = useNullable<Date>();

	return (
		<div className='container'>
			<h1 className='mb-0'>Baby</h1>
			<p>Personal Information</p>
			<form
				className='form-row'
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<div
					className='col-12 col-md-6 border rounded'
					style={{ padding: '3rem' }}>
					<h5>Contact Info</h5>
					<div className='form-group'>
						<label htmlFor='child_name'>Child Name</label>
						<input
							type='text'
							name='child_name'
							id='child_name'
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='place_of_birth'>Place of Birth</label>
						<input
							type='text'
							name='place_of_birth'
							id='place_of_birth'
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='mothers_name'>Mother's Name</label>
						<input
							type='text'
							name='mothers_name'
							id='mothers_name'
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='fathers_name'>Father's Name</label>
						<input
							type='text'
							name='fathers_name'
							id='fathers_name'
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='birth_height'>Birth Height</label>
						<input
							type='text'
							name='birth_height'
							id='birth_height'
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='birth_weight'>Birth Weight</label>
						<input
							type='text'
							name='birth_weight'
							id='birth_weight'
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='gender'>Sex</label>
						<select
							name='gender'
							id='gender'
							className='form-control'>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
						</select>
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

export default Baby;
