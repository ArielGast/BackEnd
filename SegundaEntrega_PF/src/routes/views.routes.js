import { Router } from 'express';
import { ProductManager } from '../dao/mongoManagers/productManager.js';
import { MessageManager } from '../dao/mongoManagers/messageManager.js';

const router = Router();
const productManager= new ProductManager();
const messageManager = new MessageManager();  

router.get('/', async (req, res) => {
    const products = await productManager.getProductsForHandle()
    if (products) {
        res.render('index', {products})
        
    }
});

router.get ('/realtimeproducts',  async (req,res) => {
    const products = await productManager.getProductsForHandle()
    res.render('realTimeProducts', {products})
})

router.get ('/chat', async(req,res) => {

    const newMessage = await messageManager.getMessages();
    res.render ('chat', newMessage)
})

router.get ('/products', async (req,res) => {
    const {limit = 10, page = 1} = req.query;
    const products= await productManager.getProductsForHandle(limit, page);
    const listJson = JSON.parse(JSON.stringify(products.docs));
    console.log(products);
    res.render('products', {listJson, products})

})

export default router