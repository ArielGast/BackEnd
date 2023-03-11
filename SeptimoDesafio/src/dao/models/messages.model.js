import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    email: {
        type: String,
        require:true,
    },
    message: {
        type: String,
        require: true,
    },
})

export const messagesModel = mongoose.model('Messages', messagesSchema)