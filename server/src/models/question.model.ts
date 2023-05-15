import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Question {
  @prop()
  text: string;

  @prop({ default: '' })
  file: string;

  @prop({
    default: 'text',
    enum: ['text', 'single-select', 'multi-select', 'file'],
  })
  type: string;

  @prop()
  options: string[];
}

const questionModel = getModelForClass(Question);

export default questionModel;
