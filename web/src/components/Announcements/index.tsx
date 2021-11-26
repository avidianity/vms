import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import Form from './Form';
import List from './List';

type Props = {};

const Announcements: FC<Props> = (props) => {
	return (
		<Routes>
			<Route path='add' element={<Form />} />
			<Route path=':id/edit' element={<Form />} />
			<Route path='' element={<List />} />
		</Routes>
	);
};

export default Announcements;
