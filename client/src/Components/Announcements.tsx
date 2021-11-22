import dayjs from 'dayjs';
import React, { FC, Fragment, useEffect } from 'react';
import Linkify from 'react-linkify';
import { useCollection } from '../hooks';
import { CMS } from '../Models/cms.model';
import Card from './Card';

type Props = {};

const Announcements: FC<Props> = (props) => {
	const [cms, setCMS] = useCollection<CMS>();

	const fetch = async () => {
		try {
			setCMS(await new CMS().where('type', '==', CMS.ANNOUNCEMENT).all());
		} catch (error) {
			console.log(error);
			toastr.error('Unable to fetch announcements.');
		}
	};

	useEffect(() => {
		fetch();
		// eslint-disable-next-line
	}, []);

	return (
		<Card>
			<h6 className='card-title mb-5'>Announcements</h6>
			{cms.map((item, index) => (
				<Fragment key={index}>
					<hr />
					<b className='text-info'>{item.get('title')}</b>
					<small className='d-block text-muted' style={{ fontSize: '10px' }}>
						{dayjs(item.get('updated_at')).fromNow()}
					</small>
					<small className='d-block text-muted'>
						<Linkify>{item.get('description')}</Linkify>
					</small>
				</Fragment>
			))}
		</Card>
	);
};

export default Announcements;
