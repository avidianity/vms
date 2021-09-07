import { BaseContract } from './base.contract';
import { FileContract } from './file.contract';

export enum Roles {
	PATIENT = 'Patient',
	BHW = 'Health Worker',
}

export interface UserContract extends BaseContract {
	name: string;
	email: string;
	password: string;
	gender: string;
	birthday: string;
	address: string;
	phone: string;
	role: string;
	approved: boolean;
	picture?: FileContract;
	verification?: FileContract;
}
