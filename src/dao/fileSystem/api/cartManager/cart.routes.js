const express = require('express')
const CartManager = require('./CartManager')
const ProductManager = require('../productManager/ProductManager')
const { Router } = express
const router = new Router()
const cartManager = new CartManager()
const productManager = new ProductManager()

router.get('/', async (req, res) => {
    try{
        let carts = await cartManager.getCarts()
        if(!carts){
            console.log('error al obtener carritos')
            res.status(500).send('error al obtener carritos')
            return false
        }
        console.log('carritos obtenidos')
        res.status(500).send({
            msg: 'carritos obtenidos!',
            carritos: carts
        })
    } catch (err) {
        console.log(err, 'error')
        res.status(500).send(err, 'error')

    }
})

router.get('/:cid', async (req,res) => {
    try{
        let cartId = req.params.cid
        let findingCart = await cartManager.getCartsById(cartId)
        if(!findingCart){
            console.log(`error al obtener carrito con id ${cartId}`)
            res.status(500).send('error al obtener carrito')
            return false
        }
        console.log(`carrito obtenido con id ${cartId}`)
        res.status(500).send({
            msg: 'carrito obtenido!',
            carritos: findingCart
        })

    } catch (err){
        console.log(err, 'error en router.get/:cid')
        res.status(500).send(err, 'error')
    }
})


router.post('/', async(req,res) => {
    try{
        let addingCart = await cartManager.addCart()
        if(!addingCart){
            console.log('error al crear carrito')
            res.status(500).send('error al crear carrito')
            return false
        }
        console.log('Carrito creado!')
        res.status(200).send('carrito creado con exito')
        return
    } catch (err) {
        console.log(err, 'error')
        res.status(500).send(err, 'error')

    }
})

router.post('/:cid/products/:pid', async (req,res) => {
    try{
        prodId = req.params.pid
        cartId = req.params.cid
        let addingProdToCart = await cartManager.addingProductsToCart(prodId, cartId)
        if(!addingProdToCart){
            console.log(`error al crear carrito con id ${cartId}, y error al ingresar el producto con id ${prodId}`)
            res.status(500).send('error al cargar producto')
            return false
        }
        console.log('Producto agregado al carrito!')
        res.status(200).send('Producto agregado al carrito con exito')
        return
    } catch (err) {
        console.log(err, 'error')
        res.status(500).send(err, 'error')
    }
})

module.exports = router