import React, { FC } from 'react';
import Flatpickr from 'react-flatpickr';

type Props = {};

const Batch: FC<Props> = (props) => {
	return (
		<div className='container'>
			<h3>Vaccine Batch</h3>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='description'>Description</label>
					</div>
					<div className='col-sm-10'>
						<textarea
							name='description'
							id='description'
							cols={30}
							rows={5}
							className='form-control'></textarea>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='expiration'>Expiration</label>
					</div>
					<div className='col-sm-10'>
						<Flatpickr
							className='form-control'
							options={{ altInput: true }}
						/>
					</div>
				</div>
				<div className='form-group row'>
					<div className='col-sm-2'>
						<label htmlFor='quantity_received'>
							Quantity Received
						</label>
					</div>
					<div className='col-sm-10'>
						<input
							type='number'
							name='quantity_received'
							id='quantity_received'
							className='form-control'
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

export default Batch;
