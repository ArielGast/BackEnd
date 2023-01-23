import { Router } from 'express';
import fs from 'fs';


const file_cart = './carrito.json';
const file_products = './productos.json';
const router = Router();


router.get('/', async (req, res) => {
let cart = [];
if (fs.existsSync(file_cart)){
    const cartJson = await fs.promises.readFile(file_cart, 'utf-8')
    cart = JSON.parse(cartJson)
}
console.log(cart)
res.render('index', {cart})
});


export default router