import { AppointmentVaccineDateContract } from './appointment-vaccine-date.contract';
import { AppointmentContract } from './appointment.contract';
import { ModelContract } from './model.contract';
import { VaccineContract } from './vaccine.contract';

export interface AppointmentVaccineContract extends ModelContract {
	vaccine_id: number;
	appointment_id: number;
	vaccine?: VaccineContract;
	appointment?: AppointmentContract;
	done: boolean;
	appointment_dates?: AppointmentVaccineDateContract[];
}
