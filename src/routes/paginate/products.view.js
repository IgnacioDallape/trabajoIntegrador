const express = require('express')
const { Router } = express
const router = new Router()
const ProductManagerMDb = require('../../dao/mongoDb/ProductManagerMDb')
const prodMan = new ProductManagerMDb()

router.get('/', async (req, res) => {
    try {
        let { page, limit } = req.query
        let prod = await prodMan.getProducts(page, limit)
        if(!prod) {
            console.log('error en products.view')
            res.status(500).send('error obteniendo los productos')
            return false
        }
        console.log(prod)
        let productos = prod.docs.map( e => {
            return { title: e.title, price: e.price, stock: e.stock}
        })
        const { docs, ...rest } = prod
        console.log(prod)
    
        let links = []

        for(let i = 1; i < rest.totalPages + 1; i++){
            links.push({label:i, href:'/product/?page=' + i})
        }

        return res.status(200).render('products', {productos, pagination: rest, links })
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

module.exports = router

// try{

// } catch (err) {

// }

router.get('/', async (req, res) => {
    const { page, limit } = req.query;
    const dataUsers = await Service.getAll(page, limit);

    // console.log(dataUsers)

    let usuarios = dataUsers.docs.map((item) => {
        return { firstName: item.firstName, email: item.email };
    });

    const { docs, ...rest } = dataUsers;
    let links = [];

    for (let i = 1; i < rest.totalPages + 1; i++) {
        links.push({ label: i, href: 'http://localhost:8080/users/?page=' + i });
    }
    // console.log(links);
    return res.status(200).render('usuarios', { usuarios, pagination: rest, links });
});