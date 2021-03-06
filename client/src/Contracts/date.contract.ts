import { BaseContract } from './base.contract';
import { VaccineContract } from './vaccine.contract';

export interface DateContract extends BaseContract {
	dates: string[];
	vaccine_id: string;
	vaccine?: VaccineContract;
}
