import { Model } from 'firestore-eloquent';
import { AppointmentContract } from '../Contracts/appointment.contract';
import { User } from './user.model';
import { Vaccine } from './vaccine.model';

export class Appointment extends Model<AppointmentContract> {
	type = Appointment;

	constructor(data?: Partial<AppointmentContract>) {
		super(data);
		this.name = 'appointment';
	}

	fillable() {
		return [
			'vaccine_id',
			'attendee_id',
			'patient_id',
			'done',
			'dates',
            'questions',
            'father',
			'mother',
			'date_of_birth',
			'place_of_birth',
			'height',
			'weight',
			'gender',
			'name_of_child',
		];
	}

	vaccine() {
		return this.belongsTo(Vaccine);
	}

	patient() {
		return this.belongsTo(User, 'patient');
	}

	attendee() {
		return this.belongsTo(User, 'attendee');
	}
}
