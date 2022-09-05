import mongoose, { Schema } from 'mongoose';

const ChatMessageSchema = new Schema({
    _id: {
        type: Number
    },
    idChatRoom: {
        type: Number
    },
    content: {
        type: String
    },
    type: {
        type: Number
    },
    creator: {
        type: Number
    },
    modifier: {
        type: Number
    },
    createDate: {
        type: Date
    },
    modifiedDate: {
        type: Date
    },
    deleteDate: {
        type: Date
    }
})

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema,"ChatMessage")

export default ChatMessage
