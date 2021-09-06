import React, { FC, Fragment, useEffect } from 'react';
import { useCollection } from '../hooks';
import { CMS } from '../Models/cms.model';
import Card from './Card';
import Linkify from 'react-linkify';
import dayjs from 'dayjs';

type Props = {
	className?: string;
};

const FAQs: FC<Props> = (props) => {
	const [faqs, setFAQS] = useCollection<CMS>();

	const fetch = async () => {
		try {
			setFAQS(await new CMS().where('type', '==', CMS.FAQ).all());
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
		<Card className={props.className}>
			<h6 className='card-title mb-5'>Frequently Asked Questions</h6>
			{faqs.map((faq, index) => (
				<Fragment key={index}>
					<hr />
					<b className='text-info'>{faq.get('title')}</b>
					<small className='d-block text-muted' style={{ fontSize: '10px' }}>
						{dayjs(faq.get('updated_at')).fromNow()}
					</small>
					<small className='d-block text-muted'>
						<Linkify>{faq.get('description')}</Linkify>
					</small>
				</Fragment>
			))}
		</Card>
	);
};

export default FAQs;
