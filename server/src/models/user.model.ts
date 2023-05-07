import {
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';

import bcrypt from 'bcrypt';

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})
@modelOptions({ schemaOptions: { timestamps: true } })
@index({ email: 1 }, { unique: true })
export class User {
  @prop()
  username: string;

  @prop({ unique: true, required: true })
  email: string;

  @prop({ minlength: 6, maxlength: 20, select: false })
  password: string;

  @prop({length: 8})
  rollNumber: string;
  
  @prop({length: 10})
  contactNumber: string;

  @prop({ default: false })
  verified: boolean;

  @prop({ default: 'local' })
  provider: string;

  @prop({ default: 'user' })
  role: string;

  @prop()
  startTime: Date;

  @prop()
  endTime: Date;

  async comparePassword(hashedPassword: string, attempt: string) {
    return await bcrypt.compare(attempt, hashedPassword);
  }
}

const userModel = getModelForClass(User);

export default userModel;
