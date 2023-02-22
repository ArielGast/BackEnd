import {productsModel} from '../models/products.model.js';

export  class ProductManager {

    async getProducts(lim, pag, qry, srt) {
        try {
            const options = {
                limit: lim,
                page: pag,
                query: qry,
                sort: srt
            }
            const listado =  await productsModel.paginate({},options);      
            return listado
        }catch(error) {
            console.log(error)
        }
    }


    async getProductsForHandle(lim) {
        try {
            if (lim == '') {
                return await productsModel.find().lean();
            }else {
                return await productsModel.find().lean().limit(lim);
            }
        }catch (error) {
            console.log(error);
        }
    }

    async getProductById(idP) {
        try {
            const product = await productsModel.findOne({id:idP});
            if (product) {
                return product
            }else {
                return 'Not found';
            }

        }catch (error) {
            console.log(error)
        }
    }
    async addProduct(obj) {
        try {
            const newProduct = await productsModel.create(obj);
            return newProduct;
            }catch (error) {
            console.log(error);
        }
    }
    async deleteProduct (id) {
        try {
            const product = await this.getProductById(id)
            if (product == 'Not found') {
                return 'No ID'
            }else {
                await productsModel.deleteOne({_id: id});
                return 'Borrado con exito';
            }
        }catch (error) {
            console.log(error)
        }
    }
    
    async updateProduct (idProducto, obj) {
        try {
            const updateProduct = await productsModel.updateOne({ _id: idProducto}, {$set: { "title":obj.title, "description":obj.description, "code":obj.code, "price":obj.price, "status":obj.status, "stock":obj.stock, "category":obj.category, "thumbnail":obj.thumbnail} });
            return updateProduct;           
        }catch (error) {
            console.log(error)
            
        }
    }


}