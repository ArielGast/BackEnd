import { Router } from 'express';
//import { ProductManager } from '../dao/fileManagers/productManager.js';
import { ProductManager } from '../dao/mongoManagers/productManager.js';

const router = Router();
const productManager = new ProductManager();


router.get('/', async (req, res) => {
    const { limit } = req.query;
    const productos = await productManager.getProducts(limit);
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
        return res.status(400).send({status:'Error', message: 'All data required'})   
    }
    const respuesta = await productManager.addProduct(product);
    if ( respuesta == undefined) {
        return res.status(400).send({status:'Error', message: 'Data repeated'})
    } else {
        return res.send({status: 'Success', message: 'Producto add successfully'}); 
    }
}) 


router.put('/:pId', async (req,res) =>{
    const {pId} = req.params;
    let newData = req.body;
    if (newData === '') {
        return res.status(400).send('Error. No hay datos para actualizar');
    }
    const response = await productManager.updateProduct(pId,newData);
    return res.send({status: "Succes", message: 'El producto se ha actualizado'});
})

router.delete('/:pId', async (req,res) => {
    const {pId} = req.params;
    const response = await productManager.deleteProduct(pId)
    if (response === 'No ID') {
        res.status(400).send({status:'Error' , message: 'No product in Data Base'})
    } else {
        res.send({status: 'Succes', message: 'El producto ha sido eliminado'})
    }
})

    

export default router