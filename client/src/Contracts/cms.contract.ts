import { BaseContract } from './base.contract';

export interface CMSContract extends BaseContract {
	title: string;
	description: string;
	type: 'faq' | 'announcement';
}
