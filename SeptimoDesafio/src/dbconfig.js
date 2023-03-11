import mongoose from 'mongoose';

const URI = 'mongodb+srv://arielgast:pepe1234@cluster0.a5yoyot.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(URI, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Conectado a la base de datos');
    }
})
