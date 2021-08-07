import { BaseContract } from './base.contract';
import { FileContract } from './file.contract';

export interface UserContract extends BaseContract {
	name: string;
	email: string;
	password: string;
	gender: string;
	birthday: string;
	address: string;
	phone: string;
	role: string;
	picture?: FileContract;
}
