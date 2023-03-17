import mongoose from 'mongoose';

const URI = 'mongodb+srv://arielgast:pepe1234@cluster0.a5yoyot.mongodb.net/ecommerce?retryWrites=true&w=majority'
try {
    mongoose.connect(URI);
    console.log('Database connected')
    
} catch (error) {
    console.log(error)
}

