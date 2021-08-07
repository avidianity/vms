import { BaseContract } from './base.contract';

export interface VaccineContract extends BaseContract {
	name: string;
	doses: number;
}
