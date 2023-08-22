import { Router } from 'express';
import bodyParser from 'body-parser';
import CartManagerMongodb from '../../../dao/mongoDb/CartManagerMongodb.js';
import { addCart, getCartById, getCarts, addProductToCart, deleteProductCartById, deleteProductsCart, updateProductCartById, UpdateProductsCart } from '../../../controllers/cart.controller.js';
const router = new Router();

router.get('/addCart', addCart)

router.get('/carts', getCarts)

router.get('/cart/:cid', getCartById)

router.post('/carts/:cid/products/:pid', addProductToCart)

router.delete('/carts/:cid', deleteProductsCart)

router.delete('/carts/:cid/products/:pid', deleteProductCartById)

router.put('/carts/:cid', UpdateProductsCart)

router.put('/carts/:cid/products/:pid', updateProductCartById)


export { router }