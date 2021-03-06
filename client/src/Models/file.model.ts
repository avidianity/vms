import { Model } from 'firestore-eloquent';
import { FileContract } from '../Contracts/file.contract';
import { storage } from '../Libraries/firebase.library';
import { User } from './user.model';

export class File extends Model<FileContract> {
	type = File;

	constructor(data?: Partial<FileContract>) {
		super(data);
		this.name = 'file';
	}

	fillable() {
		return ['size', 'path', 'type', 'name'];
	}

	user() {
		return this.belongsTo(User);
	}

	protected booted() {
		this.deleted((file) => {
			const ref = storage.ref(file.get('name'));
			ref.delete().catch(console.error);
		});
	}
}
