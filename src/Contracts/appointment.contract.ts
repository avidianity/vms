import { BaseContract } from './base.contract';
import { UserContract } from './user.contract';
import { VaccineContract } from './vaccine.contract';

export interface AppointmentContract extends BaseContract {
	vaccine_id: string;
	vaccine?: VaccineContract;
	attendee_id: string | null;
	attendee?: UserContract;
	patient_id: string;
	patient?: UserContract;
	done: boolean;
	dates: string[];
}
