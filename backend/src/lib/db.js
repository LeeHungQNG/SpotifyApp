import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('🚀 ~ connectDB ~ conn:', conn.connection.host);
  } catch (error) {
    console.log('Failed to connect MongoDB', error);
    process.exit(1); // 1 is failure, 0 is success
  }
};