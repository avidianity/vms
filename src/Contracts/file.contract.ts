import { BaseContract } from './base.contract';
import { UserContract } from './user.contract';

export interface FileContract extends BaseContract {
	size: number;
	path: string;
	type: string;
	name: string;
	user_id: string;
	user?: UserContract;
}
