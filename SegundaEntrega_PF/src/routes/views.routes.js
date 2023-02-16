import { Router } from 'express';
//import fs from 'fs';
//import { ProductManager } from '../dao/fileManagers/productManager.js';
import { ProductManager } from '../dao/mongoManagers/productManager.js';
import { MessageManager } from '../dao/mongoManagers/messageManager.js';

//const file_products = './productos.json';
const router = Router();
const productManager= new ProductManager();
const messageManager = new MessageManager();  

router.get('/', async (req, res) => {
    const products = await productManager.getProductsForHandle()
    if (products) {
        res.render('index', {products})
        
    }
/*     if (fs.existsSync(file_products)){
        const productsJson = await fs.promises.readFile(file_products, 'utf-8')
        products = JSON.parse(productsJson)
    }  */  
});

router.get ('/realtimeproducts',  async (req,res) => {
    const products = await productManager.getProductsForHandle()

    /* let products = [];
    if (fs.existsSync(file_products)){
        const productsJson = await fs.promises.readFile(file_products, 'utf-8')
        products = JSON.parse(productsJson)
    } */
    res.render('realTimeProducts', {products})
})

router.get ('/chat', async(req,res) => {

    const newMessage = await messageManager.getMessages();
    res.render ('chat', newMessage)
})

export default router