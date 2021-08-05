import { Model } from 'firestore-eloquent';
import { UserContract } from '../Contracts/user.contract';
import { Token } from './token.model';

export class User extends Model<UserContract> {
	type = User;

	fillable() {
		return ['name', 'email', 'password', 'gender', 'address', 'birthday', 'role'];
	}

	tokens() {
		return this.hasMany(new Token(), 'tokens');
	}
}
