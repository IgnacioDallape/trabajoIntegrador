import express from 'express';
import { getProducts, getProductsById, deleteProducts, addProducts } from '../../../controllers/products.controller.js';
const { Router } = express;
const router = new Router();

router.get('/getProducts', getProducts)

router.post('/addProducts', addProducts)

router.get('/getProducts/:pid', getProductsById)

router.delete('/delete/products/:pid', deleteProducts)




export { router }