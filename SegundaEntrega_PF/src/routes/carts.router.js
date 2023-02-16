import { Router } from 'express';
//import { CartManager } from '../dao/fileManagers/cartManager.js';
//import { ProductManager } from '../dao/fileManagers/productManager.js';
import { CartManager } from '../dao/mongoManagers/cartManager.js';
import { ProductManager } from '../dao/mongoManagers/productManager.js';

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.get('/:cId', async (req,res) => {
    const {cId} = req.params;
    const cart = await cartManager.getCartById(cId);
    res.json({cart});
})


router.post ('/', async (req,res) => {
    const cart = await cartManager.addCart();
    res.send({status: 'Succes', message: 'Carrito creado con exito'})
})

router.post('/:cId/product/:pId', async (req,res) => {
    const {cId, pId} = req.params;
 /*    const response = await cartManager.addToCart(cId, pId)
    res.json({response}) */
    const checkProduct = await productManager.getProductById(pId); 
    const checkCart = await cartManager.getCartById(cId);
    if ( checkProduct == undefined || checkCart == null) {
        res.status(400).send({status: 'error', message: 'Producto o carrito no encontrado'})
    } else {
        const response = await cartManager.addToCart(cId, pId)
        if (response){
            res.send({status: 'Succes', message: 'Producto agregado correctamente'})
        } else {
            res.status(400).send({status:'Error', message: 'Not added'})
        }   
    }  
})



export default router