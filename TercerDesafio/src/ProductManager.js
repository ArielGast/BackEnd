import fs from 'fs';

 export class ProductManager {

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
                            id: await readProductsJS[readProductsJS.length - 1].id + 1,
                        }
                        readProductsJS.push(product);
                        await fs.promises.writeFile(this.path, JSON.stringify(readProductsJS))
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
                const productFind = readProductsJS.filter((el) => el.id == id)
                if (productFind.length == 0) {
                    //console.log('Not Found');
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

//const prod = new ProductManager()

/* async function productos () {
    
    await prod.addProduct('Producto Prueba', 'Esto es una prueba', 200, 'Sin imagen', 'abc123', 25);
    await prod.addProduct('Producto Prueba2', 'Esto es una prueba', 300, 'Sin imagen', 'abc125', 20);
    await prod.addProduct('Producto Prueba3', 'Esto es una prueba', 400, 'Sin imagen', 'abc126', 30);
    await prod.addProduct('Producto Prueba4', 'Esto es una prueba', 500, 'Sin imagen', 'abc127', 26);
    await prod.addProduct('Producto Prueba5', 'Esto es una prueba', 600, 'Sin imagen', 'abc128', 22);
    await prod.addProduct('Producto Prueba6', 'Esto es una prueba', 700, 'Sin imagen', 'abc129', 120);
    await prod.addProduct('Producto Prueba7', 'Esto es una prueba', 800, 'Sin imagen', 'abc130', 56);
    await prod.addProduct('Producto Prueba8', 'Esto es una prueba', 900, 'Sin imagen', 'abc131', 89);
    await prod.addProduct('Producto Prueba9', 'Esto es una prueba', 1000, 'Sin imagen', 'abc132', 78);
}    
 productos(); */
