import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { QUESTION_TYPES } from '../../../globalconfig';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Question {
  @prop()
  text: string;

  @prop({ default: '' })
  file: string;

  @prop({
    default: 'text',
    enum: [
      QUESTION_TYPES.SINGLE,
      QUESTION_TYPES.FILE,
      QUESTION_TYPES.TEXT,
      QUESTION_TYPES.MULTI,
    ],
    required: true,
  })
  type: string;

  @prop()
  options: string[];
}

const questionModel = getModelForClass(Question);

export default questionModel;
