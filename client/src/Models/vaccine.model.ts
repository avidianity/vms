import { Model } from 'firestore-eloquent';
import { VaccineContract } from '../Contracts/vaccine.contract';
import { Appointment } from './appointment.model';
import { Date } from './date.model';

export class Vaccine extends Model<VaccineContract> {
	type = Vaccine;

	constructor(data?: Partial<VaccineContract>) {
		super(data);
		this.name = 'vaccine';
	}

	fillable() {
		return [
			'name',
			'doses',
			'one_month_and_a_half',
			'two_months_and_a_half',
			'three_months_and_a_half',
			'nine_months',
			'one_year',
			'quantity',
		];
	}

	protected booted() {
		this.deleting(async (vaccine) => {
			await vaccine.dates().delete();
		});
	}

	dates() {
		return this.hasMany(Date);
	}

	appointments() {
		return this.hasMany(Appointment);
	}
}
