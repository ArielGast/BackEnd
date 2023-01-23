import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

export class CartManager {
    constructor () {
        this.carts = [];
        this.path = __dirname+'/carrito.json';
    }

    async addCart () {
        try {
            if(!fs.existsSync(this.path)) {
                const cart = {
                    idcart: 1,
                    products: []           
                }
                this.carts.push(cart);
                await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            } else {
                const readCarts = await fs.promises.readFile(this.path, 'utf-8');
                const readCartsJS = JSON.parse(readCarts);
                const cart = {
                    idcart: readCartsJS[readCartsJS.length -1].idcart +1,
                    products: []           
                }
                readCartsJS.push(cart);
                await fs.promises.writeFile(this.path, JSON.stringify(readCartsJS));
            }

        }catch (error) {
            console.log(error);
        }
    }

    async addToCart (idCar ,idP) {
        try {
            const readCarts = await fs.promises.readFile(this.path, 'utf-8');
            const readCartsJS = JSON.parse(readCarts);
            const findCart = readCartsJS.find((el) => el.idcart === parseInt(idCar));
            const findProduct = findCart.products.findIndex(p => p.productid === parseInt(idP));
            if (findProduct === -1) {
                findCart.products.push({productid: parseInt(idP), quantity: 1})
                await fs.promises.writeFile(this.path, JSON.stringify(readCartsJS))
            } 
            else {
                findCart.products[findProduct].quantity++
                await fs.promises.writeFile(this.path, JSON.stringify(readCartsJS));
                return findCart
            }  
        
        }catch (error) {
            console.log(error);
        }
    }

    async getCartById(idC) {
        try {
            if (!fs.existsSync(this.path)) {
                return 'No exite el carrito'
            }else {
                const readCart = await fs.promises.readFile(this.path, 'utf-8');
                const readCartJS = JSON.parse(readCart);
                const findCart = readCartJS.filter((el) => el.idcart == idC)
                if (findCart.length === 0) {
                    return 'Carrito Vacio'
                } else {
                    return findCart;
                }
            }

        }catch (error) {
            console.log(error);
        }
    }


}