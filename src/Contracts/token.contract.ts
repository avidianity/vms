import { BaseContract } from './base.contract';
import { UserContract } from './user.contract';

export interface TokenContract extends BaseContract {
	hash: string;
	user_id: string;
	user?: UserContract;
}
