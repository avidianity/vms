import { Model } from 'firestore-eloquent';
import { AppointmentContract } from '../Contracts/appointment.contract';
import { User } from './user.model';
import { Vaccine } from './vaccine.model';

export class Appointment extends Model<AppointmentContract> {
	type = Appointment;

	constructor(data?: Partial<AppointmentContract>) {
		super(data);
		this.name = 'appointments';
	}

	fillable() {
		return ['vaccine_id', 'attendee_id', 'patient_id', 'done', 'dates'];
	}

	vaccine() {
		return this.belongsTo(new Vaccine());
	}

	patient() {
		return this.belongsTo(new User(), 'patient');
	}

	attendee() {
		return this.belongsTo(new User(), 'attendee');
	}
}
