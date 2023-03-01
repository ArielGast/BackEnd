import { Router } from 'express';
import { ProductManager } from '../dao/mongoManagers/productManager.js';
import { MessageManager } from '../dao/mongoManagers/messageManager.js';


const router = Router();
const productManager= new ProductManager();
const messageManager = new MessageManager();  

router.get('/', async (req, res) => {
    const products = await productManager.getProductsForHandle()
    if (products) {
        res.render('index', {products, email:req.session.email})
        
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

router.get('/registro', (req,res) => {
    res.render('registro')
})

router.get('/errorRegistro', (req,res) =>{
    res.render('errorRegistro');
})

router.get('/login', (req,res) =>{
    res.render('login')
})

router.get('/perfil', (req,res) =>{
    res.render('perfil', {email:req.session.email})
})

router.get('/errorLogin', (req,res) =>{
    res.render('errorLogin');
})

export default router