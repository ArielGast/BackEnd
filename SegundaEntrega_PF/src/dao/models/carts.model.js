import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    idCart: {
        type: Number
    },
    products: 
        [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                quantity: {
                    type: Number,
                }
            }  

        ]

})

/*cartsSchema.pre('findOne',function(next){
    this.populate('products')
    next()
})*/

export const cartsModel = mongoose.model('Carts', cartsSchema);