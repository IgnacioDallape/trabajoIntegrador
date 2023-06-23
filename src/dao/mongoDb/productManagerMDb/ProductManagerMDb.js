const fs = require('fs')
const Product = require('../../models/Product')
const mongoose = require('mongoose')

class ProductManagerMDb {


    async getProducts() {
        try{
            let prodDb = await Product.find({})
            if(!prodDb){
                console.log('prodDb esta vacia')
                return false
            }
            return prodDb

        } catch (err) {
            console.log(err, 'error en getProducts en mongo')
            return false
        }
    }

    async getProductsById(pid) {
        try{
            let prodDb = await Product.findOne({_id:pid})
            if(!prodDb){
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
        try{
            let newProduct = await new Product(prod)
            let pr = await newProduct.save()
            console.log(pr)
            if(!pr){
                console.log('newProduct esta vacia')
                return false
            }
            return pr
        } catch (err) {
            console.log(err, 'error en addProducts en mongo')
            return false
        }
    }

    async deleteProducts(cid,pid){
        try{

            let cart = Product.findOne({_id: cid})
            if(!cart){
                console.log(`carrito con id ${cid} no existe`)
                return false
            }
            console.log(cart)
            return cart
        } catch (err) {
            console.log('error en deleteProducts')
            return false
        }
    }
}

module.exports = ProductManagerMDb