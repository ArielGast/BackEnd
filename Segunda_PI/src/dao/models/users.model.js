
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true

    },
    age: {
        type: Number,
        require: true,
        default: 0
    },
    password: {
        type: String,
        require: true
    }
})

export const usersModel = mongoose.model('Users', usersSchema)