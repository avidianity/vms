import React, { FC } from 'react';
import Flatpickr from 'react-flatpickr';

type Props = {};

const Types: FC<Props> = (props) => {
	return (
		<div className='container'>
			<h3>Vaccine Type</h3>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='name'>Name</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='text'
							name='name'
							id='name'
							className='form-control'
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='type'>Type</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='text'
							name='type'
							id='type'
							className='form-control'
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='manufacturer'>Manufacturer</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='text'
							name='manufacturer'
							id='manufacturer'
							className='form-control'
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='code'>Code (CCVX)</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='text'
							name='code'
							id='code'
							className='form-control'
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='gtin'>GTIN</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='text'
							name='gtin'
							id='gtin'
							className='form-control'
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='is_brand'>Is Brand</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='text'
							name='is_brand'
							id='is_brand'
							className='form-control'
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='dosage'>Dosage Amount</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='text'
							name='dosage'
							id='dosage'
							className='form-control'
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='dsr_high'>
							Standard Dose Range High
						</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='text'
							name='dsr_high'
							id='dsr_high'
							className='form-control'
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='dsr_low'>Standard Dose Range Low</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='text'
							name='dsr_low'
							id='dsr_low'
							className='form-control'
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='dsr_unit'>
							Standard Dose Range Unit
						</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='text'
							name='dsr_unit'
							id='dsr_unit'
							className='form-control'
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='ds_quantity'>
							Standard Dose Quantity
						</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='text'
							name='ds_quantity'
							id='ds_quantity'
							className='form-control'
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='period_next_dose'>
							Period Next Dose
						</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='text'
							name='period_next_dose'
							id='period_next_dose'
							className='form-control'
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='notify_date'>
							2nd Dose Notification
						</label>
					</div>
					<div className='col-sm-10'>
						<Flatpickr
							className='form-control'
							options={{ altInput: true }}
						/>
					</div>
				</div>
				<div className='form-group pt-3'>
					<button type='submit' className='btn btn-primary'>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default Types;
