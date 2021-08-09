import React, { FC } from 'react';
import Card from './Card';

type Props = {};

const Announcements: FC<Props> = (props) => {
	return (
		<Card>
			<h6 className='card-title mb-5'>Announcements</h6>
			<b className='text-info'>How to stay safe?</b>
			<small className='d-block text-muted'>Answer Here</small>
			<hr />
			<b className='text-info'>Paano magka jowa?</b>
			<small className='d-block text-muted'>Answer Here</small>
			<hr />
			<b className='text-info'>Paano magka mama?</b>
			<small className='d-block text-muted'>Answer Here</small>
		</Card>
	);
};

export default Announcements;
