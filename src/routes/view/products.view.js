import express from 'express';
const { Router } = express;
const router = new Router();
import ProductManagerMDb from '../../dao/mongoDb/ProductManagerMDb.js';
const prodMan = new ProductManagerMDb();
import UserModel from '../../dao/models/UserModel.js';
import CartManagerMDb from '../../dao/mongoDb/CartManagerMongodb.js';
const CM = new CartManagerMDb()

function auth(req,res,next){
    let sessionUsername = req.session.userName
    if(!sessionUsername){
        res.redirect('/login')
    }
    next()
}

router.get('/', auth, async (req, res) => {
    try {
        const username = req.session.userName;
        let { page, limit } = req.query

        let prod = await prodMan.getProducts(page, limit)
        if(!prod) {
            console.log('error en products.view')
            res.status(500).send('error obteniendo los productos')
            return false
        }
        let productos = prod.docs.map( e => {
            return { title: e.title, price: e.price, stock: e.stock}
        })
        const { docs, ...rest } = prod
    
        let links = []

        for(let i = 1; i < rest.totalPages + 1; i++){
            links.push({label:i, href:'/products/?page=' + i})
        }

        return res.status(200).render('products', {productos, pagination: rest, links, username, title: 'Productos'  })
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

let cart

router.get('/mostrarCarrito', auth, async (req,res) => {
    try {
        const carrito = req.session.carrito || [];
        console.log(carrito)
        res.json({ cart });
        return cart
    } catch (error) {
        console.log(error);
        return false
    }
})

router.post('/agregarAlCarrito', (req, res) => {
    const producto = req.body.producto; // Recibe el producto desde el frontend

    if (!req.session.carrito) {
        req.session.carrito = [];
    }

    req.session.carrito.push(producto);
    res.sendStatus(200);
});


export  { router }

