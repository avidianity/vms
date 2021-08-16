import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useURL } from '../../../hooks';
import List from './List';

type Props = {};

const Appointments: FC<Props> = (props) => {
	const url = useURL();

	return (
		<Switch>
			<Route path={url('')} exact component={List} />
		</Switch>
	);
};

export default Appointments;
