import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

const ChatMessageSchema = new Schema({
    
})

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema,"ChatMessage")

export default ChatMessage
