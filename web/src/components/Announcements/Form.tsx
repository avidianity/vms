import { useMode } from '@avidian/hooks';
import { useFormik } from 'formik';
import React, { FC, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useMatch, useNavigate } from 'react-router';
import * as Yup from 'yup';
import { handleError } from '../../helpers';
import { createAnnouncement, getAnnouncement, updateAnnouncement } from '../../queries/announcement.query';
import { routes } from '../../routes';
import TextInput from '../Shared/TextInput';

type Props = {};

const Form: FC<Props> = (props) => {
	const [mode, setMode] = useMode();
	const navigate = useNavigate();
	const match = useMatch(`${routes.DASHBOARD}/${routes.ANNOUNCEMENTS}/:id/edit`);
	const { values, setValues, handleBlur, handleChange, handleSubmit, setFieldValue, touched, errors, isSubmitting } = useFormik({
		initialValues: {
			title: '',
			description: '',
		},
		validationSchema: Yup.object({
			title: Yup.string().required('Title is required.'),
			description: Yup.string().required('Description is required.'),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			try {
				await (mode === 'Add' ? createAnnouncement(values) : updateAnnouncement(match?.params.id, values));
				toastr.success(`${mode} announcement successful!`);
				navigate(`${routes.DASHBOARD}/${routes.ANNOUNCEMENTS}`);
			} catch (error) {
				handleError(error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	const fetch = async (id: any) => {
		const announcement = await getAnnouncement(id);
		await setValues(announcement);
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
				<h5 className='card-title'>{mode} Announcement</h5>
			</div>
			<div className='card-body'>
				<form onSubmit={handleSubmit}>
					<TextInput
						label='Title'
						name='title'
						isSubmitting={isSubmitting}
						handleBlur={handleBlur}
						handleChange={handleChange}
						touched={touched}
						errors={errors}
						values={values}
					/>
					<div className='form-group'>
						<label htmlFor='description' className='text-bold'>
							Description
						</label>
						<ReactQuill
							theme='snow'
							value={values.description}
							onChange={(content) => (!isSubmitting ? setFieldValue('description', content) : null)}
						/>
					</div>
					{touched.description && errors.description ? (
						<small className='form-text text-danger d-block mb-2'>{errors.description}</small>
					) : null}
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
