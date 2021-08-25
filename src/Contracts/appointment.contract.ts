import { BaseContract } from './base.contract';
import { UserContract } from './user.contract';
import { VaccineContract } from './vaccine.contract';

export type Question = {
	id: string;
	question: string;
	answer: string;
};

export interface AppointmentContract extends BaseContract {
	vaccine_id: string;
	vaccine?: VaccineContract;
	attendee_id: string | null;
	attendee?: UserContract;
	patient_id: string;
	patient?: UserContract;
	done: boolean;
	dates: string[];
	mother: string;
	date_of_birth: string;
	height: string;
	weight: string;
	gender: string;
	questions: Question[];
}
