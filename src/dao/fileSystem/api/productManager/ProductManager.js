const uuid4 = require("uuid4")
const fs = require('fs')

class ProductManager {
    constructor(){
        this.products = []
    }

    //funciones

    async addProducts(name, price, code, category){
        try{
            if(!name || !price || !code || !category){
                console.log(' complete todos los campos ')
                return false
            }

            let reading = await this.getProducts()
            reading = reading.map( e => e.code === code )
    
            if(reading){
                console.log('codigo repetido')
                return false
            }

            const newProduct = {
                name: name,
                price: price,
                category: category,
                code: code,
                id: uuid4()
            }

            this.products.push(newProduct)
            await fs.promises.writeFile('./products.json', JSON.stringify(this.products, null, 2), 'utf-8')
            console.log('producto guardado', this.products)
            return this.products
        } catch ( err ) {
            console.log(err, 'error en addProducts')
            return false
        }
    }

    async getProducts(){
        try{
            let prod = await fs.promises.readFile('./products.json', 'utf-8')
            prod = JSON.parse(prod)
    
            if(prod !== null && prod !== undefined && prod.lenght > 0){
                this.products = prod
                return
            } else {
                this.products = []
                return
            }
        }   catch (err) {
            console.log(err, 'error en get products')
            return this.products = []
        }
    }

    async getProductsById(id) {
        try{
            let prod = await this.getProducts()
            if(prod == []){
                console.log('no hay productos en el json')
                return 
            } 
            let mapping = prod.map( e => e.id === id)
            if(!mapping){
                console.log('no existe producto con id: ', id)
                return
            }
            console.log(mapping)
            return mapping
        } catch (err){
            console.log(err, 'error en getProductsById')
            return false
        }
    }

    async updateProducts(id, modification){
        try{
            let getting = await this.getProductsById(id)
            
            if(!getting){
                console.log('no se encontro producto con id: ', id)
                return
            }

            let prodMap = getting.map( e  => e.code === code)

            if(prodMap){
                console.log(`no existe un producto con el code : ${code}`)
                return
            }

            let prodIndex = getting.findIndex( e => e.id === id)
            if(prodIndex == -1) {
                console.log(` no se pudo encontrar el indice del producto `)
                return
            }

            this.products[prodIndex] = {...getting, ...modification, id: id}
            console.log( this.products[prodIndex])
            await fs.promises.writeFile('./products.json', JSON.stringify(this.products, null, 2), 'utf-8')
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
            await fs.promises.writeFile('./products.json', JSON.stringify(this.products, null, 2), 'utf-8')
            return this.products
        } catch (err) {
            console.log(err, ` error en deleteProducts `)
            return false
        }
    }






}

