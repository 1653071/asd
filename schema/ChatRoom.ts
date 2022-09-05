import mongoose, { Schema } from 'mongoose';

const ChatRoomSchema = new Schema({
    idChatRoom: {
        type: String
    },
    userIds : {
        type: Array
    },
    playgroundId: {
        type: Number
    },
    team: {
        type: Number
    }
  
})

const ChatRoom = mongoose.model('ChatRooms', ChatRoomSchema,"ChatRooms")

export default ChatRoom
