import dayjs from 'dayjs';
import React, { FC, HTMLInputTypeAttribute } from 'react';

type Props = {
	type?: HTMLInputTypeAttribute;
	label: string;
	name: string;
	isSubmitting: boolean;
	handleBlur: any;
	handleChange: any;
	touched: any;
	errors: any;
	values: any;
};

const TextInput: FC<Props> = ({ type = 'text', isSubmitting, handleBlur, handleChange, touched, errors, values, label, name }) => {
	return (
		<>
			<div
				className={`input-group input-group-outline ${touched[name] && errors[name] ? '' : 'mb-3'} ${
					values[name].length > 0 || type === 'date' ? 'is-filled' : ''
				}`}>
				<label className='form-label'>{label}</label>
				<input
					type={type}
					name={name}
					className='form-control'
					onFocus={(e) => {
						e.target.parentElement?.classList.add('focused', 'is-focused');
					}}
					onChange={handleChange}
					onBlur={(e) => {
						e.target.parentElement?.classList.remove('focused', 'is-focused');
						handleBlur(e);
					}}
					disabled={isSubmitting}
					value={type === 'date' ? dayjs(values[name]).format('YYYY-MM-DD') : values[name]}
				/>
			</div>
			{touched[name] && errors[name] ? <small className='form-text text-danger d-block mb-2'>{errors[name]}</small> : null}
		</>
	);
};

export default TextInput;
