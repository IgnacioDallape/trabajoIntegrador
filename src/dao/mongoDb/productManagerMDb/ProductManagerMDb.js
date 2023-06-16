const fs = require('fs')
const Product = require('../../models/Models')

class ProductManagerMDb {

    async getProducts() {
        try{
            let prodDb = await Product.find({})
            console.log(prodDb,22)
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
    async addProducts(prod) {
        try{
            let newProduct = await new Product(prod)
            newProduct = newProduct.save()
            if(!newProduct){
                console.log('newProduct esta vacia')
                return false
            }
            return newProduct

        } catch (err) {
            console.log(err, 'error en addProducts en mongo')
            return false
        }

    }
}

module.exports = ProductManagerMDb