import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    idCart: {
        type: Number,
    },
    products:{
        type: Array,
    },
})

cartsSchema.pre('findOne',function(next){
    this.populate('products')
    next()
})

export const cartsModel = mongoose.model('Carts', cartsSchema);