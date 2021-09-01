import React, { FC } from 'react';
import Card from './Card';

type Props = {};

const Announcements: FC<Props> = (props) => {
	return (
		<Card>
			<h6 className='card-title mb-5'>Announcements</h6>
			<b className='text-info'>What are the available vaccines for this month?</b>
			<small className='d-block text-muted'>There are no available vaccines as for now.</small>
			<hr />
			<b className='text-info'>Available dates for vaccination</b>
			<small className='d-block text-muted'>No vaccination for this month.</small>
			<hr />
		</Card>
	);
};

export default Announcements;
