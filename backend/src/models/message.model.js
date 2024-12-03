import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String, // clerk user Id
      required: true,
    },
    receiverId: {
      type: String, // clerk user Id
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model('Message', messageSchema);
