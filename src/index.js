const express = require('express')
const app = express()
app.use(express.json())
const PORT = 8080
const Database = require('./dao/mongoDb/db')
const routerProduct = require('./dao/fileSystem/api/productManager/products.routes')
const routerCart = require('./dao/fileSystem/api/cartManager/cart.routes')
const routerIndex = require('./routes/index.routes')
const routerHome = require('./routes/home.routes')
const routerMongoDb = require('./dao/mongoDb/mongoDb.routes')
const routerChat = require('./routes/chat.routes')
const realTimeRouter = require('./routes/realtime.routes')
// routes

app.use('/products', routerProduct)
app.use('/carts', routerCart)
app.use('/index', routerIndex)
app.use('/home', routerHome)
app.use('/mongo', routerMongoDb)
app.use('/chat', routerChat)
app.use('/chat', routerChat)
app.use('/realtimeproducts', realTimeRouter)

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



app.get('/', (req, res) => {
    res.send('Bienvenido!')
})

server.listen(PORT, () => {
    console.log('corriendo en el puerto: ', PORT)
    Database.connect()
})

//io

let messages = []
const dbManager = require('./dao/mongoDb/productManagerMDb/ProductManagerMDb')
const newMongoProd = new dbManager()


io.on('connection', async (socket) => {
    console.log('nuevo usuario en linea')
    socket.emit('wellcome', 'Bienvenido!')
    socket.on('chat', (data) => {
        messages.push(data)
        console.log(messages)
        io.sockets.emit('chat', messages)
    })

    let prodMongo = await newMongoProd.getProducts()
    io.sockets.emit('productsMongo', prodMongo)
})



//midleware

// const socketMiddleware = async (req, res, next) => {
//     let product = new ProductManager();
//     product = await product.getProducts();
//     io.sockets.emit('products', product);
//     next();
// };
// app.use(socketMiddleware)