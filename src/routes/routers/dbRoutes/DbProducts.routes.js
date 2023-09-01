import express from 'express';
import { getProducts, getProductsById, deleteProducts, addProducts } from '../../../controllers/products.controller.js';
const { Router } = express;
const router = new Router();

function isAdmin(req,res,next){
    console.log(req,222)
    let admin = req.session.role
    if(admin != 'admin'){
        res.send('solo los administradores pueden hacer esto!')
    }
    console.log(admin,22)
    next()
}


router.get('/getProducts', isAdmin ,getProducts)

router.post('/addProducts', isAdmin, addProducts)

router.get('/getProducts/:pid', getProductsById)

router.delete('/delete/products/:pid', isAdmin, deleteProducts)




export { router }