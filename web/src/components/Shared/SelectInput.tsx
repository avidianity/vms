import React, { FC } from 'react';

type Props = {
	label: string;
	name: string;
	isSubmitting: boolean;
	handleBlur: any;
	handleChange: any;
	touched: any;
	errors: any;
	values: any;
};

const SelectInput: FC<Props> = ({ isSubmitting, handleBlur, handleChange, touched, errors, values, label, name, children }) => {
	return (
		<>
			<div className={`input-group input-group-outline ${touched[name] && errors[name] ? '' : 'mb-3'} is-filled`}>
				<label className='form-label'>{label}</label>
				<select
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
					value={values[name]}>
					{children}
				</select>
			</div>
			{touched[name] && errors[name] ? <small className='form-text text-danger d-block mb-2'>{errors[name]}</small> : null}
		</>
	);
};

export default SelectInput;
