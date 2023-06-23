const fs = require('fs')
const Cart = require('../../models/Cart')
const Product = require('../../models/Product')
const ProductManagerMDb = require('../productManagerMDb/ProductManagerMDb')
const prodMan = new ProductManagerMDb()

class CartManagerMDb {
    constructor() {
        this.carts = []
    }
    async addCart() {
        try {
            Cart.create({})
            return true
        } catch (err) {
            console.log(err, 'error en addCartM')
            return false
        }
    }

    async getCarts() {
        try {
            let finding = await Cart.find({})
            console.log(finding)
            if (!finding) {
                console.log('no se encontro carritos')
                return false
            }
            return finding
        } catch (err) {
            console.log(err, 'error en getCartsM')
            return this.carts = []
        }
    }

    async getCartsById(cid) {
        try {
            let finding = await Cart.findOne({_id:cid})
            if (!finding) {
                console.log(`no se encontro carrito con id ${cid}`)
                return false
            }
            return finding
        } catch (err) {
            console.log('error en getCartsByIdM')
            return false
        }
    }

    async addingProductsToCart(cid, pid) {
        try {
            let cart = await this.getCartsById(cid)
            if (!cart) {
                console.log(`no se encontro cart con id ${cid}`)
                return false
            }
            let prod = await prodMan.getProductsById(pid)
            if (!prod) {
                console.log(`no se encontro prod con id ${pid}`)
                return false
            }
            await cart.products.push(prod)
            await Cart.updateOne({ _id: cid }, cart)
            return cart
        } catch (err) {
            console.log(err, 'error en addingProductsToCart')
            return false
        }
    }

    async deleteProducts(cid) {
        try {
            let cart = await this.getCartsById(cid)
            console.log(cart)
            if (!cart) {
                console.log(`no se encontro cart con id ${cid}`)
                return false
            }
            const result = await Cart.updateMany(
                { $pull: { products: {} } }
                )
            if(!result){
                console.log('error al elminar los productos del carrito en deleteProductsM')
                return false
            }
            return true
        } catch (err) {
            console.log(err, 'error en deleteProducts')
            return false
        }
    }

    async deleteProductsById(cid,pid) {
        try {
            let cart = await this.getCartsById(cid)
            if (!cart) {
                console.log(`no se encontro cart con id ${cid}`)
                return false
            }
            let prod = await prodMan.getProductsById(pid)
            if (!prod) {
                console.log(`no se encontro prod con id ${pid}`)
                return false
            }
            const cartUpd = await Cart.updateOne(
                { $pull: { products: { product: pid } }
            }
                )
            if(!cartUpd){
                console.log(`error al eliminar el producto con id ${pid} del carrito en deleteProductsByIdM`)
                return false
            }
            return true
        } catch (err) {
            console.log(err, 'error en deleteProductsById')
            return false
        }
    }

    async updateAllCartProducts(cid,body) {
        try {
            let cart = await this.getCartsById(cid)
            if (!cart) {
                console.log(`no se encontro cart con id ${cid}`)
                return false
            }
            const prod = await Cart.updateOne(
                { $set: { products: body } }
            )
            if(!prod){
                console.log('false en prod de updateAllCartProducts')
                return false
            }
            return true

        } catch (err) {
            console.log(err, 'error en updateAllCartProducts')
            return false
        }
    }
}

module.exports = CartManagerMDb