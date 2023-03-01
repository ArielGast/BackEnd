import { Router } from 'express';
import { ProductManager } from '../dao/mongoManagers/productManager.js';
import { MessageManager } from '../dao/mongoManagers/messageManager.js';
import { auth, isLogged, isAdmin } from '../middlewares/auth.middleware.js';


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

router.get('/registro', isLogged, (req,res) => {
    res.render('registro')
})

router.get('/errorRegistro', (req,res) =>{
    res.render('errorRegistro');
})

router.get('/login', isLogged,(req,res) =>{
    res.render('login')
})

router.get('/perfil', auth, isAdmin, async (req,res) =>{
    const {limit = 10, page = 1} = req.query;
    const products= await productManager.getProducts(limit, page);
    const listJson = JSON.parse(JSON.stringify(products.docs));
    res.render('products', {email: req.session.email, role: req.session.role, listJson, products})
})

router.get('/errorLogin', (req,res) =>{
    res.render('errorLogin');
})

export default router