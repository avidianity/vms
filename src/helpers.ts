import toastr from 'toastr';
import _, { isArray as _isArray, isString, trim } from 'lodash';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import swal from 'sweetalert';
import { compareSync, hashSync } from 'bcryptjs';
import { UserContract } from './Contracts/user.contract';
import { Date } from './Models/date.model';
import { Collection } from 'firestore-eloquent';
import { Appointment } from './Models/appointment.model';
import { User } from './Models/user.model';
import { Vaccine } from './Models/vaccine.model';
import { State } from './Libraries/state.library';

dayjs.extend(relativeTime);

export class Asker {
	static async notice(message: string, title?: string) {
		const response = await swal({
			title,
			text: message,
			buttons: ['Cancel', 'Confirm'],
			icon: 'warning',
		});

		return toBool(response);
	}
	static async danger(message: string, title?: string) {
		return toBool(
			await swal({
				title,
				text: message,
				buttons: ['Cancel', 'Confirm'],
				dangerMode: true,
				icon: 'warning',
			})
		);
	}
}

export class Hash {
	static check(value: string, hash: string) {
		return compareSync(value, hash);
	}

	static make(value: string) {
		return hashSync(value, 8);
	}
}

export function outIf<T>(condition: boolean, output: T, defaultValue: any = ''): T {
	return condition ? output : (defaultValue as T);
}
export function toBool(data: any) {
	return data ? true : false;
}

export function isArray<T>(value: any): value is T[] {
	return _isArray<T>(value);
}

export function toJSON(data: any) {
	return trim(JSON.stringify(data));
}

export function validURL(url: string) {
	let valid = false;
	var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-/]))?/;
	try {
		new URL(url);
		valid = true;
	} catch (_) {
		valid = false;
	}
	return !!pattern.test(url) && valid;
}

export function ucfirst(string: string) {
	const array = string.split('');
	array[0] = array[0].toUpperCase();
	return array.join('');
}

export function ucwords(string: string) {
	return string
		.split(' ')
		.map((word) => (word === 'Id' ? 'ID' : ucfirst(word)))
		.join(' ');
}

export function setValues(setter: Function, data: any) {
	for (const key in data) {
		setter(key, data[key]);
	}
}

let handle: NodeJS.Timeout | null = null;

export async function getAppointments() {
	try {
		const user = State.getInstance().get<UserContract>('user');
		if (user && user.id) {
			const appointments = await new Appointment().where('patient_id', '==', user.id).all();
			return new Collection(
				...(await Promise.all(
					appointments.map(async (appointment) => {
						const vaccine = await new Vaccine().findOne(appointment.get('vaccine_id'));

						vaccine?.set('dates', (await new Date().where('vaccine_id', '==', vaccine?.id()!).all()).toJSON());

						appointment.set('vaccine', vaccine?.getData());

						const attendeeId = appointment.get('attendee_id');

						if (attendeeId) {
							const attendee = await new User().findOne(attendeeId);
							appointment.set('attendee', attendee?.getData());
						}

						return appointment;
					})
				))
			);
		}
		return new Collection();
	} catch (error) {
		console.log(error);
		toastr.error('Unable to fetch appointment list.');
		return new Collection();
	}
}

export function handleError(error: any, useHandle = true) {
	if (error) {
		if (error.response) {
			const response = error.response;
			if (response.data.errors && isArray<string>(response.data.errors)) {
				return Object.values<string[]>(response.data.errors).map((errors) => errors.map((error) => toastr.error(error)));
			}
			if (response.data.message) {
				if (response.status === 500) {
					return toastr.error(response.data.message);
				}
				if (isArray(response.data.message)) {
					return response.data.message.forEach((message: string) =>
						toastr.error(sentencify(message), undefined, {
							extendedTimeOut: 2000,
						})
					);
				} else if (isString(response.data.message)) {
					return toastr.error(sentencify(response.data.message));
				}
			}
		} else if (error.message) {
			if (error.message.includes('Network Error')) {
				if (handle === null && useHandle) {
					toastr.error('Unable to connect. Please check your internet connection or the server may be down.');
					handle = setTimeout(() => {
						if (handle !== null) {
							clearTimeout(handle);
							handle = null;
						}
					}, 5000);
					return;
				}
			} else {
				return toastr.error(error.message);
			}
		}
	} else {
		return toastr.error('Something went wrong, please try again later.', 'Oops!');
	}
}

export function errorToStrings(error: any) {
	if (error) {
		if (error.response) {
			const response = error.response;
			if (response.data.message) {
				if (isArray(response.data.message)) {
					return (response.data.message as string[]).map((message) => sentencify(message));
				} else if (isString(response.data.message)) {
					return [sentencify(response.data.message)];
				}
			}
		} else if (error.message) {
			if (isString(error.message)) {
				if (error.message.includes('Network Error')) {
					return ['Unable to connect. Please check your internet connection or the server may be down.'];
				}
				return [error.message as string];
			} else if (isArray(error.message)) {
				return (error.message as string[]).map((message) => sentencify(message));
			}
		}
	}
	return ['Something went wrong, please try again later.'];
}

export function groupBy<T, K extends keyof T>(data: Array<T>, key: K) {
	const temp: { [key: string]: Array<T> } = {};

	data.forEach((item) => {
		const property: any = item[key];
		if (!(property in temp)) {
			temp[property] = [];
		}
		temp[property].push(item);
	});
	return Object.keys(temp).map((key) => temp[key]);
}

export function sentencify(words: string) {
	return ucfirst(
		_.snakeCase(words)
			.split('_')
			.map((word) => (word.toLowerCase() === 'id' ? 'ID' : word))
			.join(' ')
	);
}

export function fromNow(date: any) {
	return dayjs(date).fromNow();
}

export function makeMask<T extends Function>(callable: T, callback: Function) {
	return ((data: any) => {
		return callable(callback(data));
	}) as unknown as T;
}

export function except<T, K extends keyof T>(data: T, keys: Array<K>) {
	const copy = {} as T;

	for (const key in data) {
		copy[key] = data[key];
	}

	for (const key of keys) {
		if (key in copy) {
			delete copy[key];
		}
	}
	return copy;
}

export function exceptMany<T, K extends keyof T>(data: Array<T>, keys: Array<K>) {
	return [...data].map((item) => except(item, keys));
}

export function has<T>(keys: Array<T>, data: T) {
	return keys.includes(data);
}

export function only<T, K extends keyof T>(data: T, keys: Array<K>) {
	const result = {} as T;
	(result as any)['id'] = (data as any)['id'];
	for (const key of keys) {
		result[key] = data[key];
	}
	return result;
}

export function onlyMany<T, K extends keyof T>(data: Array<T>, keys: Array<K>) {
	return [...data].map((item) => only(item, keys));
}

const formatter = new Intl.NumberFormat('en-PH', {
	style: 'currency',
	currency: 'PHP',
});

export function formatCurrency(value: number) {
	return formatter.format(value).replace(/\D00(?=\D*$)/, '');
}
