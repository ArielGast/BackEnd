const fs = require('fs');
const { join } = require('path');
const { pathToFileURL } = require('url');

class ProductManager {

    constructor () {
        this.products = [];
        this.path = './productos.json';
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (title == '' || description == '' || price == 0 || thumbnail == '' || code == '' || stock == 0 ) {
                console.log('All data is required');
                } else if (!fs.existsSync(this.path)) {
                    const product = {
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock,
                        id: 1,                
                    }
                    this.products.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                } else {  
                    const readProducts = await fs.promises.readFile(this.path, 'utf-8')
                    const readProductsJS = JSON.parse(readProducts);    
                    if (readProductsJS.some((el) => el.code === code)) {
                        console.log('Repeated Code');
                        return
                    } else {
                        const product = {
                            title,
                            description,
                            price,
                            thumbnail,
                            code,
                            stock,
                            id: readProductsJS[readProductsJS.length - 1].id + 1,
                        }
                        readProductsJS.push(product);
                        await fs.promises.writeFile(this.path, JSON.stringify(readProductsJS))
                    }
                }

            } catch (error) {
                console.log(error);
            }

    }

    async getProducts () {
        try {
            if (fs.existsSync(this.path)) {
                const readProducts = await fs.promises.readFile(this.path, 'utf-8');
                const readProductsJS = JSON.parse(readProducts);
                console.log(readProductsJS); 
                return readProductsJS
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
                const productFind = readProductsJS.filter((el) => el.id == id)
                if (productFind.length == 0) {
                    console.log('Not Found');
                } else {
                    console.log(productFind);
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
                const deleteProduct = readProductsJS.filter((el) => el.id != id);
                console.log('Producto borrado');
                console.log(deleteProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct));
            } else {
            console.log('No File')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id,newTitle, newDescription, newPrice, newThumbnail, newCode, newStock ) {
        try { 
            const readProducts = await fs.promises.readFile(this.path, 'utf-8');
            const readProductsJS = JSON.parse(readProducts);
            console.log(readProductsJS);
            const updateProduct = readProductsJS.map( el => 
                 el.id == id ? { ...el,
                    title: newTitle,
                    description: newDescription,
                    price: newPrice,
                    thumbnail: newThumbnail,
                    code: newCode,
                    stock: newStock,
                }: el              
            );         
            console.log(updateProduct);
            fs.promises.writeFile(this.path, JSON.stringify(updateProduct))         
        }catch (error) {
            console.log(error);
        }
    }

}

const prod = new ProductManager()
//prod.getProducts();
//prod.addProduct('Producto Prueba', 'Esto es una prueba', 200, 'Sin imagen', 'abc123', 25);
//prod.getProducts();
//prod.addProduct('Producto Prueba2', 'Esto es una prueba', 100, 'Sin imagen', 'abc124', 20);
//prod.getProductById(1);
//prod.getProductById(4)
//prod.deleteProduct(3);
//prod.updateProduct(3, 'Test', 'prueba de cambio', 500, 'imagen01', 'abf4', 40)
