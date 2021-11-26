import { isArray, isString } from 'lodash';
import swal from 'sweetalert';

let networkHandle: NodeJS.Timeout | null = null;
let authHandle: NodeJS.Timeout | null = null;

export class Asker {
	static async notice(message: string, title?: string): Promise<boolean> {
		return await swal({ title, text: message, buttons: ['Cancel', 'Confirm'], icon: 'warning' });
	}

	static async danger(message: string, title?: string): Promise<boolean> {
		return await swal({ title, text: message, buttons: ['Cancel', 'Confirm'], dangerMode: true, icon: 'warning' });
	}

	static async save(message: string, title?: string): Promise<boolean> {
		return await swal({ title, text: message, buttons: ['Cancel', 'Save'], icon: 'info' });
	}

	static async okay(message: string, title?: string): Promise<boolean> {
		return await swal({ title, text: message, icon: 'info' });
	}

	static async error(message: string, title?: string): Promise<boolean> {
		return await swal({ title, text: message, icon: 'error' });
	}
}

export function getHTMLBody(html: string) {
	return new DOMParser().parseFromString(html, 'text/html').body.innerHTML;
}

export function handleError(error: any, useHandle = true) {
	if (error) {
		if (error.response) {
			const response = error.response;
			if (response.data.errors && response.status === 422) {
				return Object.values<string[]>(response.data.errors)
					.reverse()
					.forEach((errors) => errors.map((error) => toastr.error(error)));
			}
			if (response.data.message) {
				if ([500, 400, 403, 404, 429].includes(response.status)) {
					return toastr.error(response.data.message);
				}

				if (response.status === 401) {
					if (authHandle === null) {
						if (response.data.message && !response.data.message.includes('Unauthenticated')) {
							toastr.error(response.data.message);
						} else {
							toastr.error('Authentication has expired. Please try logging in and try again.');
						}
						authHandle = setTimeout(() => {
							if (authHandle !== null) {
								clearTimeout(authHandle);
								authHandle = null;
							}
						}, 5000);
					}
					return;
				}

				if (isArray(response.data.message)) {
					return response.data.message.forEach((message: string) => toastr.error(message, undefined, { extendedTimeOut: 2000 }));
				} else if (isString(response.data.message)) {
					return toastr.error(response.data.message);
				}
			}
		} else if (error.message) {
			if (error.message.includes('Network Error')) {
				if (networkHandle === null && useHandle) {
					toastr.error('Unable to connect. Please check your internet connection or the server may be down.');
					networkHandle = setTimeout(() => {
						if (networkHandle !== null) {
							clearTimeout(networkHandle);
							networkHandle = null;
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
