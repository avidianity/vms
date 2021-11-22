import { Model } from 'firestore-eloquent';
import { QuestionContract } from '../Contracts/question.contract';

export class Question extends Model<QuestionContract> {
	type = Question;

	constructor(data?: Partial<QuestionContract>) {
		super(data);
		this.name = 'question';
	}

	fillable() {
		return ['question'];
	}
}
