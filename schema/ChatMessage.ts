import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export interface IChatMessage {
    deletedDate: Date ,
	content:   String,
	playgroundId:   Number,
	team: Number ,
    type: Number , 
}
export const ChatMessageSchema = new Schema({
	deletedDate: { type: Date },
	content: { type: String},
	playgroundId: { type: Number},
	team: { type: Number },
    type: { type: Number }, 	
})

export interface IChatMessageModel extends IChatMessage, Document {}

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema, "ChatMessage")

export default ChatMessage
