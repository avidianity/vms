import { BaseContract } from './base.contract';

export interface UserContract extends BaseContract {
	name: string;
	email: string;
	password: string;
	gender: string;
	birthday: string;
	address: string;
	role: string;
}
