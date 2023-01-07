import express from 'express';
import { ProductManager } from './ProductManager.js';

const app = express();
const productManager = new ProductManager();
const PORT = 8080;

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    const productos = await productManager.getProducts(limit || 'max')
    res.json({productos});
} ); 

app.get('/products/:pId', async (req, res) => {
    const {pId} = req.params;
    const product = await productManager.getProductById(pId);
    res.json({product});
})


app.listen(PORT, () => {
    console.log (`Escuchando el puerto ${PORT}`);
})