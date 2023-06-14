const fs = require('fs')
const uuid4 = require('uuid4')
const ProductManager = require('../productManager/ProductManager')
let productManager = new ProductManager()

class CartManager {
    constructor() {
        this.carts = []
    }

    async addCart() {
        try {
            const newCart = {
                cid: uuid4(),
                products: []
            }
            this.carts = await this.getCarts()
            this.carts.push(newCart)
            await fs.promises.writeFile('./src/dao/fileSystem/api/cartManager/carts.json', JSON.stringify(this.carts, null, 2), 'utf-8')
            return this.carts
        } catch (err) {
            console.log(err, 'error en addCart')
            return false
        }
    }

    async getCarts() {
        try {
            let cartsJson = await fs.promises.readFile('./src/dao/fileSystem/api/cartManager/carts.json', 'utf-8')
            if (cartsJson == []) {
                console.log('No se pudo leer ningun carrito, esta vacio')
                return this.carts = []
            }
            this.carts = JSON.parse(cartsJson)
            return this.carts
        } catch (err) {
            console.log(err, 'error en getCarts')
            this.carts = []
            await fs.promises.writeFile('./src/dao/fileSystem/api/cartManager/carts.json', JSON.stringify(this.carts, null, 2), 'utf-8')
            return this.carts = []
        }
    }

    async getCartsById(cartId) {
        try {
            let searchingCart = await fs.promises.readFile('./src/dao/fileSystem/api/cartManager/carts.json', 'utf-8')
            if (searchingCart.length < 1) {
                console.log('carrito vacio')
                return false
            }
            searchingCart = JSON.parse(searchingCart)
            console.log(searchingCart.cid)
            searchingCart = Object.values(searchingCart)
            searchingCart = searchingCart.find(e => e.cid === cartId) 
            if (!searchingCart) {
                console.log(`No existe un carrito con el id: ${cartId}`)
                return false
            }
            return searchingCart
        } catch (err) {
            console.log(err, 'error en getCartsById')
            return false
        }
    }

    async addingProductsToCart(productId, cartId) {
        try {
            let searchProduct = await productManager.getProductsById(productId)
            this.carts = await this.getCarts()
            console.log(this.carts)
            if (!searchProduct) {
                console.log(`producto con id ${productId}, no encontrado`)
                return false
            }
            let searchCart = await this.getCartsById(cartId)
            console.log(searchCart, 9)
            if (!searchCart) {
                console.log(`No se encontro el carrito ${cartId}`)
                return false
            }
            let searchCartProducts = searchCart.products.find(prod => prod.pid === productId)
            console.log(searchCartProducts, 222)
            if (searchCartProducts) {
                console.log('aca')
                searchCartProducts.quantity += 1
            } else {
                searchCart.products.push({
                    pid: productId,
                    quantity: 1
                })
            }
            const cartIndex = this.carts.findIndex(cart => 
                    cart.cid == cartId
            );
            

            if (cartIndex == -1) {
                console.log('no existe el indice del carrito')
                return false
            }
            this.carts[cartIndex] = searchCart
            await fs.promises.writeFile('./src/dao/fileSystem/api/cartManager/carts.json', JSON.stringify(this.carts, null, 2), 'utf-8')
            return this.carts

        } catch (err) {
            console.log(err, 'error en addingProductsToCart')
            return false
        }
    }

    async deleteProducts(cartId) {
        try {
            let cartDelete = await this.getCartsById(cartId)
            if (!cartDelete) {
                console.log(`El carrito con id ${cartId} no existe`)
                return false
            }
            this.carts = this.carts.filter(e => e.cid !== cartId)
            await fs.promises.writeFile('./src/dao/fileSystem/api/cartManager/carts.json', JSON.stringify(this.carts, null, 2), 'utf-8')
            return this.carts
        } catch (err) {
            console.log(err, 'error en deleteProducts')
            return false
        }
    }
}


module.exports = CartManager