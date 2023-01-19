import { Router } from 'express';
import { CartManager } from '../src/cartManager.js';
import { ProductManager } from '../src/productManager.js';

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
    const checkProduct = await productManager.getProductById(pId); 
    const checkCart = await cartManager.getCartById(cId);

    if ( checkProduct == 'Not Found' || checkCart == 'No exite el carrito') {
        res.status(400).send({status: 'error', message: 'Producto o carrito no encontrado'})
    } else {
        await cartManager.addToCart(cId, pId)
        res.send({status: 'Succes', message: 'Producto agregado correctamente'})
    }
})



export default router