import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: Number, default: 0 },
  startTime: Date,
  endTime: Date,
});

const User = model('User', UserSchema);

export default User;
