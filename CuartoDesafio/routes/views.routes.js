import { Router } from 'express';
import fs from 'fs';
import { ProductManager } from '../src/productManager.js';


const file_products = './productos.json';
const router = Router();
const productManager= new ProductManager();

router.get('/', async (req, res) => {
    let products = [];
    if (fs.existsSync(file_products)){
        const productsJson = await fs.promises.readFile(file_products, 'utf-8')
        products = JSON.parse(productsJson)
    }   
    console.log(products)
    res.render('index', {products})
});

router.get ('/realtimeproducts',  async (req,res) => {
    let products = [];
    if (fs.existsSync(file_products)){
        const productsJson = await fs.promises.readFile(file_products, 'utf-8')
        products = JSON.parse(productsJson)
    }
    res.render('realTimeProducts', {products})
})


export default router