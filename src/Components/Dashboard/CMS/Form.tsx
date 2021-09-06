import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMode } from '../../../hooks';
import Card from '../../Card';
import { useHistory, useRouteMatch } from 'react-router';
import { CMS, Types } from '../../../Models/cms.model';
import { ucwords } from '../../../helpers';

type Props = {
	type: Types;
};

type Inputs = {
	title: string;
	description: string;
};

const Form: FC<Props> = ({ type }) => {
	const title = ucwords(type);
	const [mode, setMode] = useMode('Add');
	const [processing, setProcessing] = useState(false);
	const { register, reset, handleSubmit, setValue } = useForm<Inputs>();
	const match = useRouteMatch<{ id: string }>();
	const history = useHistory();

	const submit = async (data: Inputs) => {
		setProcessing(true);
		try {
			if (mode === 'Add') {
				await CMS.createQueryBuilder().create({
					...data,
					type,
				});
			} else {
				const cms = await new CMS().where('type', '==', type).findOneOrFail(match.params.id);
				await cms.fill(data).save();
			}
			toastr.success(`${title} saved successfully.`);
			reset();
		} catch (error) {
			console.log(error);
			toastr.error(`Unable to save ${title}.`);
		} finally {
			setProcessing(false);
		}
	};

	const get = async () => {
		setProcessing(true);
		try {
			const cms = await new CMS().where('type', '==', type).findOneOrFail(match.params.id);
			const data = cms.getData();
			for (const [key, value] of Object.entries(data)) {
				setValue(key as any, value);
			}
		} catch (error) {
			console.log(error);
			toastr.error(`Unable to fetch ${title}.`);
			history.goBack();
		} finally {
			setProcessing(false);
		}
	};

	useEffect(() => {
		if (match.path.includes('edit')) {
			setMode('Edit');
			get();
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className='container'>
			<Card>
				<h4>
					{mode} {title}
				</h4>
				<form onSubmit={handleSubmit(submit)} className='form-row'>
					<div className='form-group col-12'>
						<label htmlFor='title'>Title</label>
						<input {...register('title')} type='text' id='title' className='form-control' disabled={processing} />
					</div>
					<div className='form-group col-12'>
						<label htmlFor='description'>Description</label>
						<textarea {...register('description')} id='description' className='form-control' disabled={processing} />
					</div>
					<div className='form-group col-12'>
						<button type='submit' className='btn btn-primary btn-sm' disabled={processing}>
							Submit
						</button>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default Form;
