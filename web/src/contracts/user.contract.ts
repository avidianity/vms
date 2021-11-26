import { ModelContract } from './model.contract';

export interface UserContract extends ModelContract {
	name: string;
	email: string;
	phone: string;
	role: string;
	email_verified_at?: string;
}
