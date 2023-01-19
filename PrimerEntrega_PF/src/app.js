import express from 'express';
import cartsRouter from '../routes/carts.router.js';
import productsRouter from '../routes/products.router.js';
import { ProductManager } from './productManager.js';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`)
})

app.get('/', (req,res) => {
    res.send('Ruta Raiz')
}) 

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);