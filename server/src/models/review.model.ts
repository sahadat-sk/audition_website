import {
  Ref,
  getModelForClass,
  index,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { User } from './user.model';

@modelOptions({ schemaOptions: { timestamps: true } })
@index({ userId: 1 })
export class Review {
  @prop({ ref: () => User, required: true })
  userId: Ref<User>;

  @prop({ ref: () => User, required: true })
  reviewerId: Ref<User>;

  @prop({ required: true })
  review: string;

  @prop({ required: true })
  rating: number;
}

const reviewModle = getModelForClass(Review);

export default reviewModle;
