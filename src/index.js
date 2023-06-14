const express = require('express')
const app = express()
app.use(express.json())
const PORT = 8080
const Database = require('./dao/mongoDb/db')
const routerProduct = require('./dao/fileSystem/api/productManager/products.routes')
const routerCart = require('./dao/fileSystem/api/cartManager/cart.routes')
const routerIndex = require('./routes/index.routes')

// routes

app.use('/products', routerProduct)
app.use('/carts', routerCart)
app.use('/index', routerIndex)



// static

app.use(express.static(__dirname + '/public'))

// handlebars

const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//socket

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)



app.get('/', (req,res) => {
    res.send('Bienvenido!')
})

server.listen(PORT, () =>{
    console.log('corriendo en el puerto: ', PORT)
    Database.connect()
})

//db

const Product = require('./dao/models/models')

app.get('/getProducts',  (req,res) => {
    Product.find({})
    .then( pr => {
        console.log(pr)
        res.status(200).send(pr)
    })
    .catch( err => {
        console.log(err)
        res.status(500).send('error')
    })})

app.post('/saveProducts', (req,res) => {
    let newPr = req.body
    let product = new Product(newPr)
    product = product.save()
    .then( pr => {
        res.status(201).send({
            msg: 'producto guardado',
            data: pr
        })
    })
    .catch( err => {
        console.log(err)
        res.status(500).send('error')
    })
})

