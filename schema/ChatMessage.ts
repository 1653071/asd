import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export const ChatMessageSchema = new Schema({
	deletedDate: { type: Date }
})

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema, "ChatMessage")

export default ChatMessage
