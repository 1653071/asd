import mongoose from 'mongoose';
let Client = null
async function connect() {
    try {
        Client= await mongoose.connect(
            process.env.MONGODB_URL || 'mongodb+srv://quang:1234567890@cluster0.ssrlu.mongodb.net/food',
            {}
        );

        console.log('Database connected successfully');
    } catch (error) {
        console.log('Connect to database failed');
    }
}


export const db = mongoose.connection
export default {connect,Client};
