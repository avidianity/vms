import axios from 'axios';
import { AppointmentVaccineContract } from '../contracts/appointment-vaccine.contract';

export async function getAppointmentVaccines() {
	const { data } = await axios.get<AppointmentVaccineContract[]>('/appointment-vaccines');
	return data;
}

export async function getAppointmentVaccine(id: any) {
	const { data } = await axios.get<AppointmentVaccineContract>(`/appointment-vaccines/${id}`);
	return data;
}

export async function createAppointmentVaccine(payload: Partial<AppointmentVaccineContract>) {
	const { data } = await axios.post<AppointmentVaccineContract>('/appointment-vaccines', payload);
	return data;
}

export async function updateAppointmentVaccine(id: any, payload: Partial<AppointmentVaccineContract>) {
	const { data } = await axios.put<AppointmentVaccineContract>(`/appointment-vaccines/${id}`, payload);
	return data;
}

export async function deleteAppointmentVaccine(id: any) {
	await axios.delete(`/appointment-vaccines/${id}`);
}
