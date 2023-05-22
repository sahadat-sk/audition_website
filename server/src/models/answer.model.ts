import {
  Ref,
  getModelForClass,
  index,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { User } from './user.model';
import { Question } from './question.model';

@modelOptions({ schemaOptions: { timestamps: true } })
@index({ userId: 1, questionId: 1 })
export class Answer {
  @prop({ ref: () => Question })
  questionId: Ref<Question>;

  @prop({ ref: () => User })
  userId: Ref<User>;

  @prop()
  text: string;

  @prop({ default: '' })
  file: string;

  @prop()
  selectedOptions: string[];
}

const answerModel = getModelForClass(Answer);

export default answerModel;
