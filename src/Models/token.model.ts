import { Model } from 'firestore-eloquent';
import { TokenContract } from '../Contracts/token.contract';
import { User } from './user.model';

export class Token extends Model<TokenContract> {
	type = Token;
	name = 'tokens';

	fillable() {
		return ['hash'];
	}

	user() {
		return this.belongsTo(new User(), 'user');
	}
}
