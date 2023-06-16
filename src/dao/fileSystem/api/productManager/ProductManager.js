const uuid4 = require("uuid4")
const fs = require('fs')

class ProductManager {
    constructor(){
        this.products = []
    }

    //funciones

    async addProducts(title, description, price, thumbnail, code, stock, status, category){
        try{
            if(!title || !description || !price || !thumbnail || !code || !stock || !status || !category){
                console.log(' complete todos los campos ')
                return false
            }

            let reading = await this.getProducts()
            console.log(reading)
            if(reading){
                reading = reading.find( e => e.code === code )
            }
    
            if(reading){
                console.log('codigo repetido')
                return false
            }

            const newProduct = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock,
                status: status,
                code: code,
                category: category,
                id: uuid4()
            }

            this.products.push(newProduct)
            await fs.promises.writeFile('./src/dao/fileSystem/api/productManager/products.json', JSON.stringify(this.products, null, 2), 'utf-8')
            console.log('producto guardado', this.products)
            return this.products
        } catch ( err ) {
            console.log(err, 'error en addProducts')
            return false
        }
    }

    async getProducts(){
        try{
            let prod = await fs.promises.readFile('./src/dao/fileSystem/api/productManager/products.json', 'utf-8')
            if(!prod || prod.lenght > 0){
                this.products = []
                return
            }
            prod = JSON.parse(prod)
            this.products = prod
            return this.products
        }   catch (err) {
            console.log(err, 'error en get products')
            return false
        }
    }

    async getProductsById(id) {
        try{
            let prod = await this.getProducts()
            if(prod == []){
                console.log('no hay productos en el json')
                return false
            } 
            let finding = prod.find( e => e.id === id)
            if(!finding){
                console.log('no existe producto con id: ', id)
                return false
            }
            return finding
        } catch (err){
            console.log(err, 'error en getProductsById')
            return false
        }
    }

    async updateProducts(modification, id ){
        try{
            let getting = await this.getProductsById(id)
            let getProd = await this.getProducts()
            if(!getting){
                console.log('no se encontro producto con id: ', id)
                return false
            }
            if(getting.code === modification.code ){
                console.log(`ya existe un producto con el code ${modification.code} `)
                return false
            }
            console.log('pasaste')
            let prodIndex = getProd.findIndex( e => e.id === id)
            if(prodIndex == -1) {
                console.log(` no se pudo encontrar el indice del producto `)
                return false
            }
            this.products[prodIndex] = {...getting, ...modification, id: id}
            console.log( this.products)
            await fs.promises.writeFile('./src/dao/fileSystem/api/productManager/products.json', JSON.stringify(this.products, null, 2), 'utf-8')
            let a = await fs.promises.readFile('./products.json', 'utf-8')
            console.log(a)
            return this.products
        } catch (err) {
            console.log(err, 'error en updateProducts')
            return false
        }
    }


    async deleteProducts(id){
        try{
            let deleting = await this.getProductsById(id)
            if(!deleting){
                console.log(`no existe el producto con id : ${id}`)
                return
            }
            let deleteFindIndex = this.products.findIndex(e => e.id === id)
            if(!deleteFindIndex == -1){
                console.log('no podemos encontrar el indice del producto a eliminar')
                return
            }
            this.products.splice(deleteFindIndex, 1)
            await fs.promises.writeFile('./src/dao/fileSystem/api/productManager/products.json', JSON.stringify(this.products, null, 2), 'utf-8')
            return this.products
        } catch (err) {
            console.log(err, ` error en deleteProducts `)
            return false
        }
    }

}

module.exports = ProductManager