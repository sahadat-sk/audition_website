import mongoose from 'mongoose';
import { MONGODB_URI } from './secrets';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI || '');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
