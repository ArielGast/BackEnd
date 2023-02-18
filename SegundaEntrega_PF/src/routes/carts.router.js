import { Router } from 'express';
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
    const checkProduct = await productManager.getProductById(pId); 
    const checkCart = await cartManager.getCartById(cId);
    if ( checkProduct == undefined || checkCart == null) {
        res.status(400).send({status: 'error', message: 'Producto o carrito no encontrado'})
    } else {
        const response = await cartManager.addToCart(cId, pId);
        if (response){
            res.send({status: 'Succes', message: 'Producto agregado correctamente'})
        } else {
            res.status(400).send({status:'Error', message: 'Not added'})
        }   
    }  
})

router.delete('/:cId/products/:pId', async (req,res) => {
    const { cId, pId} = req.params;
    const request = await cartManager.deleteProductFromCart(cId, pId)
    if (request == 'Error') {
        res.status(400).send({status: 'Error', message: 'Producto o carrito no encontrado'});
    }
    if (request == 'Succes') {
        res.status(200).send({status: 'Succes', message: 'Producto elmininado del carrito'});
    }
})

router.put('/:cId', async (req,res) => {
    const {cId} = req.params;
    const productos = [];
    const request = await cartManager.updateCart(cId, productos);
    res.status(200).send({status: 'Succes', message: 'Carrito actualizado'});
        
})

router.put('/:cId/products/:pId', async (req,res) => {
    const {cId, pId} = req.params;
    const {newQty} = req.body;
    const response = await cartManager.updateProductQty(cId, pId, newQty);
    if (response == 0) {
        res.status(404).send({status: 'Error', message: 'No se ha actualizado'})
    }else {
        res.status(200).send({status: 'Succes', message: 'Se ha actualizado la candtidad'})
    }

})

router.delete('/:cId', async (req, res) => {
    const {cId} = req.params;
    const response = await cartManager.deleteAllProducts(cId);
    if (response == 'Succes') {
        res.status(200).send({status: 'Succes' , message: 'El carrita se ha vaciado'});
    }else {
        res.status(400).send({status: 'Error', message: 'Ocurrio un error'})
    }
})

export default router