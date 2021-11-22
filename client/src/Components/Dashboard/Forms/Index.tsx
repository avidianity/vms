import React, { FC } from 'react';
import { Link, Route, RouteProps, Switch } from 'react-router-dom';
import { useURL } from '../../../hooks';
import { routes } from '../../../routes';
import Adult from './Adult';
import Baby from './Baby';

type Props = {};

const Selection: FC<Props> = (props) => {
	const url = useURL();

	return (
		<div className='container-fluid py-5'>
			<div className='row'>
				<div className='col-6 text-center'>
					<Link
						to={url(routes.FORMS.BABY)}
						className='btn btn-primary btn-xl p-5'
						style={{ fontSize: '2rem' }}>
						Baby
					</Link>
				</div>
				<div className='col-6 text-center'>
					<Link
						to={url(routes.FORMS.ADULT)}
						className='btn btn-primary btn-xl p-5'
						style={{ fontSize: '2rem' }}>
						Adult
					</Link>
				</div>
			</div>
		</div>
	);
};

const Forms: FC = (props) => {
	const url = useURL();

	const links: RouteProps[] = [
		{
			path: url('/'),
			exact: true,
			component: Selection,
		},
		{
			path: url(routes.FORMS.BABY),
			component: Baby,
		},
		{
			path: url(routes.FORMS.ADULT),
			component: Adult,
		},
	];

	return (
		<Switch>
			{links.map((route, index) => (
				<Route {...route} key={index} />
			))}
		</Switch>
	);
};

export default Forms;
