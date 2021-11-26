import { AppointmentVaccineContract } from './appointment-vaccine.contract';
import { ModelContract } from './model.contract';

export interface AppointmentVaccineDateContract extends ModelContract {
	appointment_vaccine_id: number;
	date: string;
	done: boolean;
	appointment_vaccine?: AppointmentVaccineContract;
}
