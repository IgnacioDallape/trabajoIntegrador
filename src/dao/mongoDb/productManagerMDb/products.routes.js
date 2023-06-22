const express = require('express')
const ProductManagerMDb = require('./ProductManagerMDb')
const newProduct = new ProductManagerMDb()
const bodyParser = require('body-parser');
const { Router } = express
const router = new Router()

router.get('/', (req,res) => {
    try{
        res.send('bienvenidos a products.routes')
    } catch (err) {
        console.log(err)
        res.send(err)

    }
})

module.exports = router

// try{

// } catch (err) {
    
// }