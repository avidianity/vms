import { Model } from 'firestore-eloquent';
import { VaccineContract } from '../Contracts/vaccine.contract';
import { Date } from './date.model';

export class Vaccine extends Model<VaccineContract> {
	type = Vaccine;

	constructor(data?: Partial<VaccineContract>) {
		super(data);
		this.name = 'vaccines';
	}

	fillable() {
		return ['name', 'doses'];
	}

	protected booted() {
		this.deleting(async (vaccine) => {
			await vaccine.dates().delete();
		});
	}

	dates() {
		return this.hasMany(new Date(), 'dates');
	}
}
