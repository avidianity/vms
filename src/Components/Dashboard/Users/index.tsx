import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { Roles } from '../../../Contracts/user.contract';
import { useURL } from '../../../hooks';
import Form from './Form';
import List from './List';

type Props = {
	type: Roles;
};

const Users: FC<Props> = ({ type }) => {
	const url = useURL();

	return (
		<Switch>
			<Route path={url('')} exact render={(props) => <List {...props} type={type} />} />
			<Route path={url('/add')} render={(props) => <Form {...props} type={type} />} />
			<Route path={url('/:id/edit')} render={(props) => <Form {...props} type={type} />} />
		</Switch>
	);
};

export default Users;
