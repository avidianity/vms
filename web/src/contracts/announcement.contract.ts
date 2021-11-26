import { ModelContract } from './model.contract';

export interface AnnouncementContract extends ModelContract {
	title: string;
	description: string;
}
