import axios from 'axios';
import { AppointmentContract } from '../contracts/appointment.contract';

export async function getAppointments() {
	const { data } = await axios.get<AppointmentContract[]>('/appointments');
	return data;
}

export async function getAppointment(id: any) {
	const { data } = await axios.get<AppointmentContract>(`/appointments/${id}`);
	return data;
}

export async function createAppointment(payload: Partial<AppointmentContract>) {
	const { data } = await axios.post<AppointmentContract>('/appointments', payload);
	return data;
}

export async function updateAppointment(id: any, payload: Partial<AppointmentContract>) {
	const { data } = await axios.put<AppointmentContract>(`/appointments/${id}`, payload);
	return data;
}

export async function deleteAppointment(id: any) {
	await axios.delete(`/appointments/${id}`);
}

export async function searchAppointments(keyword: string) {
	const { data } = await axios.get<AppointmentContract[]>(`/search/appointments?keyword=${keyword}`);
	return data;
}
