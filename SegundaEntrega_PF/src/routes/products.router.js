import { Router } from 'express';
import { ProductManager } from '../dao/mongoManagers/productManager.js';

const router = Router();
const productManager = new ProductManager();


router.get('/', async (req, res) => {
    const { limit=10, page=1, query, sort } = req.query;
    const productos = await productManager.getProducts(limit, page, query, sort);
    if (productos.docs.length == 0) {
        const respuesta = {
            status: 'error'
        }
            res.json({respuesta});        
    } else {
        const respuesta = {
            status: 'succes',
            payload: productos.docs,
            totalpages: productos.totalPages,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            page: productos.page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: productos.hasPrevPage != false ? (`localhost:8080/api/products?page=${parseInt(page)-1}`): null,
            nextLink: productos.hasNextPage != false ? (`localhost:8080/api/products?page=${parseInt(page)+1}`): null
        }
        res.json({respuesta});
    }

}); 

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