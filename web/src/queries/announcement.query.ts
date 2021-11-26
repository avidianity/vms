import axios from 'axios';
import { AnnouncementContract } from '../contracts/announcement.contract';

export async function getAnnouncements() {
	const { data } = await axios.get<AnnouncementContract[]>('/announcements');
	return data;
}

export async function getAnnouncement(id: any) {
	const { data } = await axios.get<AnnouncementContract>(`/announcements/${id}`);
	return data;
}

export async function createAnnouncement(payload: Partial<AnnouncementContract>) {
	const { data } = await axios.post<AnnouncementContract>('/announcements', payload);
	return data;
}

export async function updateAnnouncement(id: any, payload: Partial<AnnouncementContract>) {
	const { data } = await axios.put<AnnouncementContract>(`/announcements/${id}`, payload);
	return data;
}

export async function deleteAnnouncement(id: any) {
	await axios.delete(`/announcements/${id}`);
}
