import { BaseContract } from './base.contract';
import { DateContract } from './date.contract';

export interface VaccineContract extends BaseContract {
	name: string;
	doses: number;
	dates?: DateContract[];
}
