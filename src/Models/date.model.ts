import { Model } from 'firestore-eloquent';
import { DateContract } from '../Contracts/date.contract';
import { Vaccine } from './vaccine.model';

export class Date extends Model<DateContract> {
	type = Date;

	fillable() {
		return ['dates'];
	}

	vaccine() {
		return this.belongsTo(new Vaccine(), 'vaccine');
	}
}
