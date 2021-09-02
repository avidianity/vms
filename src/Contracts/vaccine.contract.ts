import { BaseContract } from './base.contract';
import { DateContract } from './date.contract';

export interface VaccineContract extends BaseContract {
	name: string;
	doses: number;
	at_birth: boolean;
	one_month_and_a_half: boolean;
	two_months_and_a_half: boolean;
	three_months_and_a_half: boolean;
	nine_months: boolean;
	one_year: boolean;
	dates?: DateContract[];
}
