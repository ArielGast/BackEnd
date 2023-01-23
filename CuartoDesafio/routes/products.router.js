import { Router } from 'express';
import { ProductManager } from '../src/productManager.js';

const router = Router();
const productManager = new ProductManager();


router.get('/', async (req, res) => {
    const { limit } = req.query;
    const productos = await productManager.getProducts(limit || 'max')
    res.json({productos});
} ); 

router.get('/:pId', async (req, res) => {
    const {pId} = req.params;
    const product = await productManager.getProductById(pId);
    res.json({product});
    
    
})

router.post('/', async (req,res) => {
    let product = req.body;
    if (product.title === '' || product.description ==='' || product.code ==='' || product.price === '' || product.stock === '' || product.category === '') {
        return res.status(400).send({status:'Error', message: 'Los datos son requeridos'})   
    }
    const respuesta = await productManager.addProduct(product);
    if ( respuesta == true) {
        return res.status(400).send({status:'Error', message: 'Código repetido'})
    } else {
        return res.send({status: 'Success', message: 'Producto agregado correctamente'}); 
    }
}) 


router.put('/:pId', async (req,res) =>{
    const {pId} = req.params;
    let newData = req.body;
    if (newData === '') {
        return res.status(400).send('Error. No hay datos para actualizar');
    }
    await productManager.updateProduct(parseInt(pId),newData);
    return res.send({status: "Succes", message: 'El producto se ha actualizado'});
})

router.delete('/:pId', async (req,res) => {
    const {pId} = req.params;
    await productManager.deleteProduct(pId)
    res.send({status: 'Succes', message: 'El producto ha sido eliminado'})
})

export default router