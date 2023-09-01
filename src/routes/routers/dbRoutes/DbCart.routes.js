import { Router } from 'express';
import { addCart, getCartById, getCarts, addProductToCart, deleteProductCartById, deleteProductsCart, updateProductCartById, UpdateProductsCart } from '../../../controllers/cart.controller.js';
const router = new Router();

function isUser(req,res,next){
    let isAnUser = req.session.role
    console.log(isAnUser,22)
    if(isAnUser != 'user' ){
        res.status(500).send('solo los usuarios pueden hacer esto!')
    }
    next()
}

router.get('/addCart', addCart)

router.get('/carts', getCarts)

router.get('/cart/:cid', getCartById)

router.post('/carts/:cid/products/:pid', isUser, addProductToCart)

router.delete('/carts/:cid', isUser,deleteProductsCart)

router.delete('/carts/:cid/products/:pid', isUser,deleteProductCartById)

router.put('/carts/:cid', isUser,UpdateProductsCart)

router.put('/carts/:cid/products/:pid', isUser ,updateProductCartById)


export { router }