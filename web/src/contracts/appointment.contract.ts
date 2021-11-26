import { AppointmentVaccineContract } from './appointment-vaccine.contract';
import { ModelContract } from './model.contract';
import { UserContract } from './user.contract';

export interface AppointmentContract extends ModelContract {
	child: string;
	father: string;
	mother: string;
	birthday: string;
	place_of_birth: string;
	sex: string;
	height: string;
	weight: string;
	user_id: number;
	attendee_id?: number;
	user?: UserContract;
	attendee?: UserContract;
	vaccines?: AppointmentVaccineContract[];
}
