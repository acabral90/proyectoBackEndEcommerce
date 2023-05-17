import mongoose from "mongoose";

const chatCollection = 'chat';

const chatSchema = new mongoose.Schema({
    user: {
        type: String
    },

    message: {
        type: String
    }
});

const chatModel = mongoose.model(chatCollection, chatSchema)

export default chatModel;