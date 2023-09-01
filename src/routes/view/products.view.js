import express from 'express';
const { Router } = express;
const router = new Router();
import ProductManagerMDb from '../../dao/mongoDb/ProductManagerMDb.js';
const prodMan = new ProductManagerMDb();
import UserModel from '../../dao/models/UserModel.js';
import CartManagerMDb from '../../dao/mongoDb/CartManagerMongodb.js';
const CM = new CartManagerMDb()


router.get('/', async (req, res) => {
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

router.get('/cart', async (req,res) => {
    try {
        console.log(req.session.cart)
        res.redirect('/profile')
    } catch (error) {
        console.log(error);
        return false
    }
})

export  { router }

// router.get('/', async (req, res) => {
//     const { page, limit } = req.query;
//     const dataUsers = await Service.getAll(page, limit);

//     // console.log(dataUsers)

//     let usuarios = dataUsers.docs.map((item) => {
//         return { firstName: item.firstName, email: item.email };
//     });

//     const { docs, ...rest } = dataUsers;
//     let links = [];

//     for (let i = 1; i < rest.totalPages + 1; i++) {
//         links.push({ label: i, href: 'http://localhost:8080/users/?page=' + i });
//     }
//     // console.log(links);
//     return res.status(200).render('usuarios', { usuarios, pagination: rest, links });
// });