const express = require('express')
const { Router } = express
const router = new Router()
const bodyParser = require('body-parser');
const cartManagerDb = require('./CartManagerMongodb');
const Cart = require('../../models/Cart');
const mongoose = require('mongoose');
const cartMan = new cartManagerDb()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/addCart', async (req, res) => {
    try {
        let a = await cartMan.addCart()
        console.log(a)
        if (!a) {
            console.log('error en crear carrito')
            res.status(500).send('error en crear carrito')
            return false
        }
        res.status(200).send('carrito creado con exito!')
    } catch (err) {
        console.log(err, 'error en addCart routes')
        res.status(500).send(err)
    }
})

router.get('/carts', async (req, res) => {
    try {
        let a = await cartMan.getCarts()
        console.log(a)
        if (!a) {
            console.log('error en encontrar carritos')
            res.status(500).send('error en encontrar carritos')
            return false
        }
        res.status(200).send({ a })
    } catch (err) {
        console.log(err, 'error en getCarts routes')
        res.status(500).send(err)
    }
})

router.get('/cart/:cid', async (req, res) => {
    try {
        let cid = req.params.cid
        let a = await cartMan.getCartsById(cid)
        console.log(a)
        if (!a) {
            console.log(`no se encontro carrito con id ${cid}.`)
            res.status(500).send('error en encontrar carrito')
            return false
        }
        res.status(200).send({ a })
    } catch (err) {
        console.log(err, 'error en getCarts routes')
        res.status(500).send(err)
    }
})

router.post('/carts/:cid/products/:pid', async (req, res) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let adding = await cartMan.addingProductsToCart(cid, pid)
        console.log(adding)
        if (!adding) {
            console.log(`no se pudo añadir al carrito con id ${cid}, el producto${pid}.`)
            res.status(500).send('error en añadir producto al carrito')
            return false
        }
        res.status(200).send({ adding })
    } catch (err) {
        console.log(err, 'error en addingProd routes')
        res.status(500).send(err)
    }
})

router.delete('/carts/:cid', async (req, res) => {
    try {
        let cid = req.params.cid
        let a = await cartMan.deleteProducts(cid)
        if (!a) {
            console.log(`no se eliminaron productos del carrito con id ${cid}.`)
            res.status(500).send('error en eliminar productos del carrito')
            return false
        }
        res.status(200).send('Carrito vaciado')
    } catch (err) {
        console.log(err, 'error en delete routes')
        res.status(500).send(err)
    }
})

router.delete('/carts/:cid/products/:pid', async (req, res) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let a = await cartMan.deleteProductsById(cid, pid)
        console.log(a)
        if (!a) {
            console.log(`no se elimino el producto con id ${pid}, del carrito con id ${cid}.`)
            res.status(500).send('error en eliminar productos del carrito')
            return false
        }
        res.status(200).send(`producto con id ${pid} eliminado`)
    } catch (err) {
        console.log(err, 'error en deleteById routes')
        res.status(500).send(err)
    }
})

router.put('/carts/:cid', async (req, res) => {
    try {
        let cid = req.params.cid
        let body = req.body
        let a = await cartMan.updateAllCartProducts(cid, body)
        console.log(a)
        if (!a) {
            console.log(`no se actualizaron los productos del carrito  ${cid}.`)
            res.status(500).send('error en actualizar todos los productos del carrito')
            return false
        }
        res.status(200).send(`carrito con id ${cid}, actualizado`)
    } catch (err) {
        console.log(err, 'error en update all carts routes')
        res.status(500).send(err)
    }
})

router.put('/carts/:cid/products/:pid', async (req, res) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let quantity = req.body
        let a = await cartMan.updateCartOneProd(cid, pid, quantity)
        if (!a) {
            console.log(`no se actualizo el productos con id: ${pid} del carrito  ${cid}.`)
            res.status(500).send('error en actualizar el producto del carrito')
            return false
        }
        res.status(200).send(`carrito con id ${cid}, actualizado, nueva quantity: ${quantity}`)
        Cart.findOne({})
        .populate('products.product')
        .then(e => console.log(JSON.stringify(e, null, '\t')))
            .catch(err => console.log(err))

    } catch (err) {
        console.log(err, 'error en update products routes')
        res.status(500).send(err)
    }
})


module.exports = router