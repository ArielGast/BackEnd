import mongoose from "mongoose";

const messagesModel = new mongoose.Schema({
    email: {
        type: String,
        require:true,
        unique: true,
    },
    message: {
        type: String,
        require: true,
    },
})

export const messageSchema = mongoose.model('Messages', messagesModel)