import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { useURL } from '../../../hooks';
import List from './List';
import View from './View';

type Props = {};

const Records: FC<Props> = (props) => {
	const url = useURL();

	return (
		<Switch>
			<Route path={url('')} exact component={List} />
			<Route path={url('/:id/view')} component={View} />
		</Switch>
	);
};

export default Records;
