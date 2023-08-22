import {  addCartService, getCartByIdService, getCartsService , addProductToCartService, deleteProductCartByIdService, deleteProductsCartService, updateProductCartByIdService, UpdateProductsCartService } from "../services/cart.service.js"


const addCart = async (req, res) => {
    try {
        let prod = await addCartService()
        if(!prod) return false
        res.status(200).send(prod)
    } catch (err) {
        console.log(err, 'error en addCart routes')
        res.status(500).send(err)
    }
}

const getCarts = async (req, res) => {
    try {
        let a = await getCartsService()
        if (!a) {
            console.log('error en encontrar carritos')
            res.status(500).send('error en encontrar carritos')
            return false
        }
        res.status(200).send(a)
    } catch (err) {
        console.log(err, 'error en getCarts routes')
        res.status(500).send(err)
    }
}

const getCartById = async (req, res) => {
    try {
        let a = await getCartByIdService(req)
        console.log(a,2222222222222)
        if (!a) {
            console.log(`no se encontro carrito con id ${cid}.`)
            res.status(500).send('error en encontrar carrito')
            return false
        }
        res.status(200).send(a)
    } catch (err) {
        console.log(err, 'error en getCarts routes')
        res.status(500).send(err)
    }
}

const addProductToCart = async (req, res) => {
    try {
        let adding = await addProductToCartService(req)
        if (!adding) {
            console.log(`no se pudo añadir al carrito con id ${cid}, el producto${pid}.`)
            res.status(500).send('error en añadir producto al carrito')
            return false
        }
        res.status(200).send(adding)
    } catch (err) {
        console.log(err, 'error en addingProd routes')
        res.status(500).send(err)
    }
}

const deleteProductsCart = async (req, res) => {
    try {
        let a = await deleteProductsCartService(req)
        if (!a) {
            console.log(`no se eliminaron productos del carrito con id ${cid}.`)
            res.status(500).send('error en eliminar productos del carrito')
            return false
        }
        res.status(200).send(a)
    } catch (err) {
        console.log(err, 'error en delete routes')
        res.status(500).send(err)
    }
}

const deleteProductCartById = async (req, res) => {
    try {
        let a = await deleteProductCartByIdService(req)
        if (!a) {
            console.log(`no se elimino el producto con id ${pid}, del carrito con id ${cid}.`)
            res.status(500).send('error en eliminar productos del carrito')
            return false
        }
        res.status(200).send(a)
    } catch (err) {
        console.log(err, 'error en deleteById routes')
        res.status(500).send(err)
    }
}

const UpdateProductsCart = async (req, res) => {
    try {
        let a = await UpdateProductsCartService(req)
        if (!a) {
            console.log(`no se actualizaron los productos del carrito  ${cid}.`)
            res.status(500).send('error en actualizar todos los productos del carrito')
            return false
        }
        res.status(200).send(a)
    } catch (err) {
        console.log(err, 'error en update all carts routes')
        res.status(500).send(err)
    }
}

const updateProductCartById = async (req, res) => {
    try {
        let a = await updateProductCartByIdService(req)
        if (!a) {
            console.log(`no se actualizo el productos con id: ${pid} del carrito  ${cid}.`)
            res.status(500).send('error en actualizar el producto del carrito')
            return false
        }
        res.status(200).send(a)
    } catch (err) {
        console.log(err, 'error en update products routes')
        res.status(500).send(err)
    }
}

export {
    addCart, getCartById, getCarts , addProductToCart, deleteProductCartById, deleteProductsCart, updateProductCartById, UpdateProductsCart
}