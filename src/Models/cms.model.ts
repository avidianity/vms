import { Model } from 'firestore-eloquent';
import { CMSContract } from '../Contracts/cms.contract';

export enum Types {
	FAQ = 'faq',
	ANNOUNCEMENT = 'announcement',
}

export class CMS extends Model<CMSContract> {
	type = CMS;

	public static readonly FAQ = Types.FAQ;
	public static readonly ANNOUNCEMENT = Types.ANNOUNCEMENT;

	constructor(data?: Partial<CMSContract>) {
		super(data);
		this.name = 'cms';
	}

	fillable() {
		return ['title', 'description', 'type'];
	}
}
