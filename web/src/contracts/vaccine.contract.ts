import { AppointmentVaccineContract } from './appointment-vaccine.contract';
import { ModelContract } from './model.contract';

export interface VaccineContract extends ModelContract {
	name: string;
	at_birth: boolean;
	one_month_and_a_half: boolean;
	two_months_and_a_half: boolean;
	three_months_and_a_half: boolean;
	nine_months: boolean;
	one_year: boolean;
	doses: number;
	quantity: number;
	appointments?: AppointmentVaccineContract[];
}
