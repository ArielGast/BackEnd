import fs, { read } from 'fs';
import { __dirname } from '../../utils.js';


 export class ProductManager {

    constructor () {
        this.products = [];
        this.path = __dirname +'/productos.json';
    }

    async addProduct(obj) {
        try {
            if (obj === null ) {
                console.log('All data is required');
                } else if (!fs.existsSync(this.path)) {
                    const product = {
                        id: 1,                
                        title: obj.title,
                        description: obj.description,
                        code: obj.code,
                        price: obj.price,
                        status: obj.status || true,
                        stock: obj.stock,
                        category: obj.category,
                        thumbnail: obj.thumbnail,
                    }
                    this.products.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                } else {  
                    const readProducts = await fs.promises.readFile(this.path, 'utf-8')
                    const readProductsJS = JSON.parse(readProducts);
                    if (readProductsJS.some((el) => el.code === obj.code)) {
                        console.log('Repeated Code');
                        return true
                    } else {
                        const product = {
                            id: await readProductsJS[readProductsJS.length - 1].id + 1,
                            title: obj.title,
                            description: obj.description,
                            code: obj.code,
                            price: obj.price,
                            status: obj.status || true,
                            stock: obj.stock,
                            category: obj.category,
                            thumbnail: obj.thumbnail,
                        }
                        readProductsJS.push(product);
                        await fs.promises.writeFile(this.path, JSON.stringify(readProductsJS))
                        return false
                    }
                }

            } catch (error) {
                console.log(error);
            }

    }

    async getProducts (limit) {
        try {
            if (fs.existsSync(this.path)) {
                const readProducts = await fs.promises.readFile(this.path, 'utf-8');
                if (limit === 'max') {
                    return JSON.parse(readProducts)
                } else {
                    return JSON.parse(readProducts).slice(0,limit)
                }       
            } else {
                console.log('No se ha encontrado el archivo')
            }
        } catch (error) {
            console.log(error)
        } 
    }

    async getProductById(id) {
        try {
            if (fs.existsSync(this.path)) {
                const readProducts = await fs.promises.readFile(this.path, 'utf-8')
                const readProductsJS = JSON.parse(readProducts);
                const productFind = readProductsJS.filter((el) => el.id === parseInt(id))
                if (productFind.length === 0) {
                    return 'Not Found';
                } else {
                    return productFind;
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct (id) {
        try {
            if (fs.existsSync(this.path)) {
                const readProducts = await fs.promises.readFile(this.path, 'utf-8');
                const readProductsJS = await JSON.parse(readProducts);
                const bandera = readProductsJS.some((e) => e.id === parseInt(id)); 
                console.log(bandera)
                if (bandera) {
                    const deleteProduct = readProductsJS.filter((el) => el.id !== parseInt(id));
                    console.log(deleteProduct);
                    await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct));
                    return deleteProduct;
                } else {
                    return ('No existe el ID')
                }
            } else {
            return ('No File')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(idProducto, obj) {
        try { 
            const readProducts = await fs.promises.readFile(this.path, 'utf-8');
            const readProductsJS = JSON.parse(readProducts);
            const updateProduct = readProductsJS.map( el => 
                 el.id === parseInt(idProducto) ? { ...el,
                    title: obj.title,
                    description: obj.description,
                    code: obj.code,
                    price: obj.price,
                    status: obj.status,
                    stock: obj.stock,
                    category: obj.category,
                    thumbnail: obj.thumbnail
                }: el              
            );          
            await fs.promises.writeFile(this.path, JSON.stringify(updateProduct)) 
            return updateProduct;        
        }catch (error) {
            console.log(error);
        }
    }

}