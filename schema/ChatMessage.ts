import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export const ChatMessageSchema = new Schema({
	deletedDate: { type: Date },
	content: { type: String},
	playgroundId: { type: Number},
	team: { type: Number },
    type: { type: Number }, 	
})

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema, "ChatMessage")

export default ChatMessage
