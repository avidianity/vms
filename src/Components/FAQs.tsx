import React, { FC } from 'react';
import Card from './Card';

type Props = {
	className?: string;
};

const FAQs: FC<Props> = (props) => {
	return (
		<Card className={props.className}>
			<h6 className='card-title mb-5'>Frequently Asked Questions</h6>
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

export default FAQs;
