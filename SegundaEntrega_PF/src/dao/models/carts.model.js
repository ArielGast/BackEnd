import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    idCart: {
        type: Number,
    },
    products:{
        type: Array,
    },
})

export const cartsModel = mongoose.model('Carts', cartsSchema);