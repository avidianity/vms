import { Model } from 'firestore-eloquent';
import { UserContract } from '../Contracts/user.contract';
import { File } from './file.model';
import { Token } from './token.model';

export class User extends Model<UserContract> {
	type = User;
	name = 'users';

	fillable() {
		return ['name', 'email', 'password', 'gender', 'address', 'birthday', 'role', 'phone'];
	}

	tokens() {
		return this.hasMany(new Token(), 'tokens');
	}

	picture() {
		return this.hasOne(new File(), 'picture');
	}
}
