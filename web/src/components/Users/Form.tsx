import { useMode } from '@avidian/hooks';
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { EMAIL_REGEX, PHONE_REGEX } from '../../constants';
import { handleError } from '../../helpers';
import { createUser, getUser, updateUser } from '../../queries/user.query';
import { routes } from '../../routes';
import SelectInput from '../Shared/SelectInput';
import TextInput from '../Shared/TextInput';

type Props = {};

const Form: FC<Props> = (props) => {
	const [mode, setMode] = useMode();
	const navigate = useNavigate();
	const match = useMatch(`${routes.DASHBOARD}/${routes.USERS}/:id/edit`);
	const { values, setValues, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting } = useFormik({
		initialValues: {
			name: '',
			email: '',
			phone: '+639',
			password: '',
			role: 'admin',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Name is required.'),
			email: Yup.string()
				.email('Email address is invalid.')
				.matches(EMAIL_REGEX, 'Email address is invalid.')
				.required('Email is required.'),
			phone: Yup.string().required('Phone is required.').matches(PHONE_REGEX, 'Phone format must be +639xxxxxxxxx.'),
			password: Yup.string().required('Password is required.'),
			role: Yup.string().oneOf(['admin', 'user'], 'Role is invalid.').required('Role is required.'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				await (mode === 'Add' ? createUser(values) : updateUser(match?.params.id, values));
				toastr.success(`${mode} user successful!`);
				navigate(`${routes.DASHBOARD}/${routes.ANNOUNCEMENTS}`);
			} catch (error) {
				handleError(error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	const fetch = async (id: any) => {
		const user = await getUser(id);
		await setValues({ ...user, password: '' });
		setMode('Edit');
	};

	useEffect(() => {
		if (match) {
			fetch(match.params.id);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='card'>
			<div className='card-header'>
				<h5 className='card-title'>{mode} User</h5>
			</div>
			<div className='card-body'>
				<form onSubmit={handleSubmit}>
					<TextInput
						label='Name'
						name='name'
						isSubmitting={isSubmitting}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
						values={values}
					/>
					<TextInput
						type='email'
						label='Email'
						name='email'
						isSubmitting={isSubmitting}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
						values={values}
					/>
					<TextInput
						label='Phone'
						name='phone'
						isSubmitting={isSubmitting}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
						values={values}
					/>
					<TextInput
						type='password'
						label='Password'
						name='password'
						isSubmitting={isSubmitting}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
						values={values}
					/>
					<SelectInput
						label='Role'
						name='role'
						isSubmitting={isSubmitting}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
						values={values}>
						<option value=''> -- Select -- </option>
						<option value='admin'>Admin</option>
						<option value='user'>User</option>
					</SelectInput>
					<div className='form-group pt-3'>
						<button type='submit' className='btn btn-primary btn-sm' disabled={isSubmitting}>
							{isSubmitting ? 'Saving' : 'Save'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Form;
