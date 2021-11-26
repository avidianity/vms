import axios from 'axios';
import { AppointmentVaccineDateContract } from '../contracts/appointment-vaccine-date.contract';

export async function getAppointmentVaccineDates() {
	const { data } = await axios.get<AppointmentVaccineDateContract[]>('/appointment-vaccine-dates');
	return data;
}

export async function getAppointmentVaccineDate(id: any) {
	const { data } = await axios.get<AppointmentVaccineDateContract>(`/appointment-vaccine-dates/${id}`);
	return data;
}

export async function createAppointmentVaccineDate(payload: Partial<AppointmentVaccineDateContract>) {
	const { data } = await axios.post<AppointmentVaccineDateContract>('/appointment-vaccine-dates', payload);
	return data;
}

export async function updateAppointmentVaccineDate(id: any, payload: Partial<AppointmentVaccineDateContract>) {
	const { data } = await axios.put<AppointmentVaccineDateContract>(`/appointment-vaccine-dates/${id}`, payload);
	return data;
}

export async function deleteAppointmentVaccineDate(id: any) {
	await axios.delete(`/appointment-vaccine-dates/${id}`);
}
