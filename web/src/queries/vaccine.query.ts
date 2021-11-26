import axios from 'axios';
import { VaccineContract } from '../contracts/vaccine.contract';

export async function getVaccines() {
	const { data } = await axios.get<VaccineContract[]>('/vaccines');
	return data;
}

export async function getVaccine(id: any) {
	const { data } = await axios.get<VaccineContract>(`/vaccines/${id}`);
	return data;
}

export async function createVaccine(payload: Partial<VaccineContract>) {
	const { data } = await axios.post<VaccineContract>('/vaccines', payload);
	return data;
}

export async function updateVaccine(id: any, payload: Partial<VaccineContract>) {
	const { data } = await axios.put<VaccineContract>(`/vaccines/${id}`, payload);
	return data;
}

export async function deleteVaccine(id: any) {
	await axios.delete(`/vaccines/${id}`);
}

export async function searchVaccines(keyword: string) {
	const { data } = await axios.get<VaccineContract[]>(`/search/vaccines?keyword=${keyword}`);
	return data;
}
