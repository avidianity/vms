import React, { FC } from 'react';
import { Switch, Route } from 'react-router';
import { useURL } from '../../../hooks';
import { Types } from '../../../Models/cms.model';
import Form from './Form';
import List from './List';

type Props = {
	type: Types;
};

const CMS: FC<Props> = ({ type }) => {
	const url = useURL();

	return (
		<Switch>
			<Route path={url('')} exact render={(props) => <List {...props} type={type} />} />
			<Route path={url('/add')} render={(props) => <Form {...props} type={type} />} />
			<Route path={url('/:id/edit')} render={(props) => <Form {...props} type={type} />} />
		</Switch>
	);
};

export default CMS;
