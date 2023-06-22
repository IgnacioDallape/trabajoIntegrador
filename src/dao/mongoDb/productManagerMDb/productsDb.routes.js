const express = require('express')
const { Router } = express
const router = new Router()
const bodyParser = require('body-parser');
const dbManager = require('./ProductManagerMDb')
const dbProducts = new dbManager()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/getProducts', async (req, res, next) => {
    try {
        let getDbProducts = await dbProducts.getProducts()
        if (!getDbProducts) {
            console.log('error en router de getproducts db')
            res.status(500).send(err)
            return
        }
        // let names = getDbProducts.map ( e => e.name)

        res.status(200).send({
            msg: 'estos son los productos en db!',
            pr: getDbProducts
        })
        next()
    } catch (err) {
        console.log('error en router de getproducts db')
        res.status(500).send(err)
    }
})

router.post('/addProducts', async (req, res, next) => {
    try {
        let prod = req.body
        let addDbProducts = await dbProducts.addProducts(prod)
        console.log(addDbProducts)
        if (!addDbProducts) {
            console.log('error en router de saveProducts db')
            res.status(500).send(err)
            return
        }
        res.status(200).send({
            msg: 'estos son los productos!',
            pr: addDbProducts
        })
        next()
    } catch (err) {
        console.log('error en router de saveProducts db')
        res.status(500).send(err)
    }
})



module.exports = router