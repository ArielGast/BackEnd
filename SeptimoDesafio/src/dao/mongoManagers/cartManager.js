import { cartsModel } from "../models/carts.model.js";

export  class CartManager {

    async addCart () {
        try {
            const searchcart = await cartsModel.find();
            if (searchcart.length === 0) {
                const cart = {
                    idCart: 1,
                    products: []
                }
                const newCart = await cartsModel.create(cart);
                return newCart;
            } else {
                const cart = {
                    idCart: searchcart[searchcart.length -1].idCart + 1,
                    products: [],
                }
                const newCart = await cartsModel.create(cart);
                return newCart
            }
        }catch (error) {
            console.log(error);
        }
    }

    async addToCart (idCar, idP) {
        try {
            const searchCart = await cartsModel.findOne({idCart: idCar});
            const findProduct = searchCart.products.findIndex(p => p.idProduct == idP);
            if (findProduct === -1) {
                searchCart.products.push({idProduct: idP, quantity:1 });
                await searchCart.save();
            }else {
                await cartsModel.updateOne({idCart: idCar, "products.idProduct": idP}, {$inc: {"products.$.quantity": 1}});                
                }
            return searchCart

        }catch (error) {
            console.log(error);
        }
    }

    async getCartById(idC) {
        try {
            const cart = cartsModel.findOne({idCart: idC});
            if (cart) {
                return cart
            }else {
                return null
            }
        }catch(error) {
            console.log(error);   
        }
    }

    async deleteProductFromCart (idCar, idP) {
        try {
            let response;
            const searchCart = await cartsModel.findOne({idcart: idCar});
            const findProduct = searchCart.products.findIndex(p => p.idProduct == idP);
            if (findProduct === -1) {
                response = 'Error';
                return response;
            } else {
               await cartsModel.updateOne({idCart: idCar},{$pull:{products: {idProduct: idP }}})
                response = 'Succes';
                return response
            }

        } catch(error) {
            console.log(error)
        }
    }


    async updateCart (idCar, obj) {
        try {
            const updateCart = await cartsModel.updateOne({idCart: idCar}, {$set :{obj}});
            return updateCart
        }catch (error) {
            console.log(error);
        }
    }

    async updateProductQty (idCar, idP, qty) {
        try {
            const updateQuantity = await cartsModel.updateOne({idCart: idCar, 'products.idProduct':idP}, {$set: {'products.$.quantity': qty}});
            return updateQuantity.modifiedCount
        }catch(error) {
            console.log(error);
            
        }
    }

    async deleteAllProducts (idCar) {
        try {

            const cart = await this.getCartById(idCar);
            const productIds = cart.products.map(product => product.idProduct);
            productIds.forEach(p => {
                this.deleteProductFromCart(idCar, p)
            });
            return 'Succes' 
        } catch(error) {
            console.log(error)
        }
    }
}