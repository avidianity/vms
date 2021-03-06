import { Model } from 'firestore-eloquent';
import { UserContract } from '../Contracts/user.contract';
import { File } from './file.model';
import { Token } from './token.model';

export class User extends Model<UserContract> {
	type = User;

	constructor(data?: Partial<UserContract>) {
		super(data);
		this.name = 'user';
	}

	protected booted() {
		this.deleting((user) => {
			user.tokens().delete().catch(console.error);
			this.picture()
				.get()
				.then((file) => file?.delete())
				.catch(console.error);
		});
	}

	fillable() {
		return ['name', 'email', 'password', 'gender', 'address', 'birthday', 'role', 'phone', 'approved'];
	}

	tokens() {
		return this.hasMany(Token);
	}

	picture() {
		return this.hasOne(File, 'picture');
	}

	verification() {
		return this.hasOne(File, 'verification');
	}
}
