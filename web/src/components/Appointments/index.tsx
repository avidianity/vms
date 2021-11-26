import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import Form from './Form';
import List from './List';
import View from './View';
import ViewAppointmentVaccine from './Vaccines/View';

type Props = {};

const Appointments: FC<Props> = (props) => {
	return (
		<Routes>
			<Route path='add' element={<Form />} />
			<Route path=':id/edit' element={<Form />} />
			<Route path=':id/view' element={<View />} />
			<Route path=':appointment_id/view/vaccine/:id' element={<ViewAppointmentVaccine />} />
			<Route path='' element={<List />} />
		</Routes>
	);
};

export default Appointments;
