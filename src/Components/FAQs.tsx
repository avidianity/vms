import React, { FC } from 'react';
import Card from './Card';

type Props = {
	className?: string;
};

const FAQs: FC<Props> = (props) => {
	return (
		<Card className={props.className}>
			<h6 className='card-title mb-5'>Frequently Asked Questions</h6>
			<b className='text-info'>Why are immunization important to infant?</b>
			<small className='d-block text-muted'>
				<a href='https://www.nichd.nih.gov'>https://www.nichd.nih.gov</a>
			</small>
			<hr />
			<b className='text-info'>What are the most important vaccination for babies?</b>
			<small className='d-block text-muted'>
				<a href='https://www.parents.com/health'>https://www.parents.com/health</a>
			</small>
			<hr />
			<b className='text-info'>How can immunization affect a child development?</b>
			<small className='d-block text-muted'>
				<a href='https://healthtalk.org/immunization/why-do-we-immunise'>https://healthtalk.org/immunization/why-do-we-immunise</a>
			</small>
		</Card>
	);
};

export default FAQs;
