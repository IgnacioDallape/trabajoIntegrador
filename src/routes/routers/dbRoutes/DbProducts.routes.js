const express = require('express')
const { Router } = express
const router = new Router()
const bodyParser = require('body-parser');
const dbManager = require('../../../dao/mongoDb/ProductManagerMDb')
const dbProducts = new dbManager()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/getProducts', async (req, res, next) => {
    try {
        const options = {
                limit : req.query.limit,
                page : req.query.page,
                category : req.query.category,
                sort: req.query.sort
        }
        console.log(options)
        let getDbProducts = await dbProducts.getProducts(options)
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
        console.log(addDbProducts,222)
        if (!addDbProducts) {
            console.log('error en router de addProducts db')
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

// router.delete('/delete/carts/:cid/products/:pid', async (req,res) => {
//     try{
//         let cid = req.params.cid
//         let pid = req.params.pid
//         let dbman = new dbManager()
//         let deleting  = dbman.deleteCartProducts(cid,pid)
//         console.log(deleting)
//         res.status(200).send('producto eliminado: ', deleting)

//     } catch (err) {
//         console.log(err)
//         res.status(500).send('error en router delete')
//     }
// })

router.get('/getProducts/:pid', async (req,res) => {
    let pid = req.params.pid
    let productById = await dbProducts.getProductsById(pid)
    console.log(productById)
    if(!productById){
        console.log(`no existe el producto con id ${pid}`)
        res.status(500).send('no existe el producto')
        return false
    }
    res.status(200).send(`el producto es: ${productById}`)
    console.log(productById)
})

router.delete('/delete/products/:pid', async (req,res) => {
    try{
        let pid = req.params.pid
        let dbman = new dbManager()
        let deleting  = await dbman.deleteProducts(pid)
        res.status(200).send('producto eliminado: ' + JSON.stringify(deleting));

    } catch (err) {
        console.log(err)
        res.status(500).send('error en router delete')
    }
})




module.exports = router