import dayjs from 'dayjs';
import React, { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Roles } from '../../../Contracts/user.contract';
import { Asker } from '../../../helpers';
import { useNullable } from '../../../hooks';
import { User } from '../../../Models/user.model';
import Card from '../../Card';

type Props = {
	type: Roles;
};

const View: FC<Props> = ({ type }) => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	const [user, setUser] = useNullable<User>();

	const approve = async (row: User) => {
		if (await Asker.notice(`Are you sure you want to approve ${row.get('name')}?`)) {
			await row.update({ approved: true });
			toastr.success('Approved successfully!');
			history.goBack();
		}
	};

	const fetch = async () => {
		try {
			const user = await new User().where('role', '==', type).where('approved', '==', false).findOneOrFail(id);
			await user.load(['picture', 'verification']);
			setUser(user);
		} catch (error) {
			console.log(error);
			toastr.error(`Unable to fetch ${type}`);
			history.goBack();
		}
	};

	useEffect(() => {
		fetch();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='container'>
			<Card>
				{user ? (
					<>
						<h4>{user.get('name')}</h4>
						<p>{user.get('email')}</p>
						<p>Gender: {user.get('gender')}</p>
						<p>Birthday: {dayjs(user.get('birthday')).format('MMMM DD, YYYY')}</p>
						<p>Address: {user.get('address')}</p>
						<p>Phone: {user.get('phone')}</p>
						<p>Verification ID:</p>
						{user.has('verification') ? (
							<img
								src={user.get('verification')?.path}
								className='shadow-sm border'
								alt={user.get('verification')?.name}
								style={{
									maxHeight: '300px',
									maxWidth: '300px',
								}}
							/>
						) : null}
						<div className='container'>
							<div className='d-flex'>
								<button
									className='btn btn-success btn-sm ml-auto'
									onClick={(e) => {
										e.preventDefault();
										approve(user);
									}}>
									Approve
								</button>
							</div>
						</div>
					</>
				) : null}
			</Card>
		</div>
	);
};

export default View;
