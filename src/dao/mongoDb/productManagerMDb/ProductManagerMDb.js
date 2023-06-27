const fs = require('fs')
const Product = require('../../models/Product')
const mongoose = require('mongoose')

class ProductManagerMDb {


    async getProducts(options) {
        try {
            let a = await options

            let limit = 10;
            if (options && options.limit !== undefined) {
                limit = options.limit;
            }

            let page = 1;
            if (options && options.page !== undefined) {
                page = options.page;
            }

            let category = options && options.category ? options.category : { $in: ['higiene', 'cocina', 'verduleria', 'carniceria', 'electrodomesticos'] };

            let sort = 0;
            if (options && options.sort !== undefined) {
                sort = options.sort;
            }


            const products = await Product.paginate({}, { limit, page, category, sort })

            return products

        } catch (err) {
            console.log(err, 'error en getProducts en mongo')
            return false
        }
    }

    async getProductsById(pid) {
        try {
            let prodDb = await Product.findOne({ _id: pid })
            if (!prodDb) {
                console.log(`no se encontro un producto con id ${pid}`)
                return false
            }
            return prodDb
        } catch (err) {
            console.log(err, 'error en getProducts en mongo')
            return false
        }
    }

    async addProducts(prod) {
        try {
            let newProduct = await new Product(prod)
            let pr = await newProduct.save()
            console.log(pr)
            if (!pr) {
                console.log('newProduct esta vacia')
                return false
            }
            return pr
        } catch (err) {
            console.log(err, 'error en addProducts en mongo')
            return false
        }
    }

    // async deleteCartProducts(cid, pid) {
    //     try {
    //         let cart = Product.findOne({ _id: cid })
    //         if (!cart) {
    //             console.log(`carrito con id ${cid} no existe`)
    //             return false
    //         }
            
    //         console.log(cart)
    //         return cart
    //     } catch (err) {
    //         console.log('error en deleteProducts')
    //         return false
    //     }
    // }
    async deleteProducts(pid) {
        try {
            let prod = await Product.findOne({ _id: pid })
            if (!prod) {
                console.log(`carrito con id ${cid} no existe`)
                return false
            }
            let a = await Product.deleteOne(prod);
            if(!a) {
                console.log('error borrando el prod')
                return false
            }
            console.log(`El producto con id ${pid} ha sido eliminado`);
            return a;
        } catch (err) {
            console.log(err,'error en deleteProducts')
            return false
        }

    }
}


module.exports = ProductManagerMDb