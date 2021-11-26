import axios from 'axios';
import { UserContract } from '../contracts/user.contract';

export async function getUsers() {
	const { data } = await axios.get<UserContract[]>('/users');
	return data;
}

export async function getUser(id: any) {
	const { data } = await axios.get<UserContract>(`/users/${id}`);
	return data;
}

export async function createUser(payload: Partial<UserContract>) {
	const { data } = await axios.post<UserContract>('/users', payload);
	return data;
}

export async function updateUser(id: any, payload: Partial<UserContract>) {
	const { data } = await axios.put<UserContract>(`/users/${id}`, payload);
	return data;
}

export async function deleteUser(id: any) {
	await axios.delete(`/users/${id}`);
}

export async function searchUsers(keyword: string) {
	const { data } = await axios.get<UserContract[]>(`/search/users?keyword=${keyword}`);
	return data;
}
