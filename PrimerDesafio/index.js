class ProductManager {

    constructor () {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (title == '' || description == '' || price == 0 || thumbnail == '' || code == '' || stock == 0 ) {
            console.log('All data is required');
        } else {
            if (this.products.length === 0) {
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
            } else if (this.products.some((el) => el.code == code)){
                    console.log('Código ya ingresado')
                } else {
                        const product = {
                            title,
                            description,
                            price,
                            thumbnail,
                            code,
                            stock,
                            id: this.products[this.products.length - 1].id + 1,
                        }
                        this.products.push(product);
                    }
        }

    }
    getProducts () {
        console.log(this.products); 
    }

    getProductById(id) {
        const productFind = this.products.filter((el) => el.id == id)
        if (productFind.length == 0) {
            console.log('Not found');
        } else {

            console.log(productFind);
        }
    }

}

const prod = new ProductManager()
prod.getProducts();
prod.addProduct('Producto Prueba', 'Esto es una prueba', 200, 'Sin imagen', 'abc123', 25);
prod.getProducts();
prod.addProduct('Producto Prueba', 'Esto es una prueba', 200, 'Sin imagen', 'abc123', 25);
prod.getProductById(1);
prod.getProductById(4);




