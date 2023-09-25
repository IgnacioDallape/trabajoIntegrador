import Cart from '../models/Cart.js';
import ProductManagerMDb from './Products.dao.js';
const prodMan = new ProductManagerMDb();

class CartManagerMDb {
    constructor() {
        this.carts = []
    }
    async addCart() {
        try {
            let a = Cart.create({})
            return a
        } catch (err) {
            console.log(err, 'error en addCartM')
            return false
        }
    }

    async getCarts() {
        try {
            let finding = Cart.find({})
            // .then(e => {return e = JSON.stringify(e, null, '\t')})
            // .catch(err => console.log(err))
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
            let finding = await Cart.findOne({ _id: cid })
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
            if (!cart) {
                console.log(`no se encontro cart con id ${cid}`)
                return false
            }
            const result = await Cart.updateMany(
                { $pull: { products: {} } }
            )
            if (!result) {
                console.log('error al elminar los productos del carrito en deleteProductsM')
                return false
            }
            return true
        } catch (err) {
            console.log(err, 'error en deleteProducts')
            return false
        }
    }

    async deleteProductsById(cid, pid) {
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
                { _id: cart._id },
                {
                    $pull: { products: { _id: prod._id } }
                }
            );
            if (!cartUpd) {
                console.log(`error al eliminar el producto con id ${pid} del carrito en deleteProductsByIdM`)
                return false
            }
            console.log('producto eliminado')
            return true
        } catch (err) {
            console.log(err, 'error en deleteProductsById')
            return false
        }
    }

    async updateAllCartProducts(cid, body) {
        try {
            let cart = await this.getCartsById(cid)
            if (!cart) {
                console.log(`no se encontro cart con id ${cid}`)
                return false
            }
            const prod = await Cart.updateOne(
                { $set: { products: body } }
            )
            if (!prod) {
                console.log('false en prod de updateAllCartProducts')
                return false
            }
            return true

        } catch (err) {
            console.log(err, 'error en updateAllCartProducts')
            return false
        }
    }


    async updateCartOneProd(cid, pid, quantity) {
        try {
            console.log(pid)
            let cart = await this.getCartsById(cid)
            if (!cart) {
                console.log(`no se encontro cart con id ${cid}`)
                return false
            }
            const prod = await prodMan.getProductsById(pid)
            if (!prod) {
                console.log('false en prod de updateAllCartProducts')
                return false
            }
            const cartUpd = await Cart.updateOne(
                {
                    _id: cid,
                    'products._id': pid // Condición para encontrar el producto específico en el carrito
                },
                {
                    $set: {
                        'products.$.stock': quantity // Actualiza la cantidad del producto específico en el carrito
                    }
                }
            );

            if (cartUpd.nModified === 0) {
                console.log(`No se encontró un carrito con id ${cid}`);
                return false;
            }
            return true

        } catch (err) {
            console.log(err, 'error en updateAllCartProducts')
            return false
        }
    }

}

export default CartManagerMDb 