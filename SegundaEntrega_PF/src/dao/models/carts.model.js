import mongoose from "mongoose";
//import {productsModel} from "../models/products.model.js"

const cartsSchema = new mongoose.Schema({
    idCart: {
        type: Number
    },
    products: 
        [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                },
                quantity: {
                    type: Number,
                }
            }  

        ]

})

cartsSchema.pre('findOne',function(next){
    this.populate('products._id')
    next()
})

export const cartsModel = mongoose.model('Carts', cartsSchema);