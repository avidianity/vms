import { Model } from 'firestore-eloquent';
import { VaccineContract } from '../Contracts/vaccine.contract';

export class Vaccine extends Model<VaccineContract> {
	type = Vaccine;

	fillable() {
		return ['name', 'doses'];
	}
}
