import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useURL } from '../../../hooks';
import Form from './Form';
import List from './List';
import View from './View';

type Props = {};

const Appointments: FC<Props> = (props) => {
	const url = useURL();

	return (
		<Switch>
			<Route path={url('')} exact component={List} />
			<Route path={url('/:id/edit')} component={Form} />
			<Route path={url('/:id/view')} component={View} />
		</Switch>
	);
};

export default Appointments;
