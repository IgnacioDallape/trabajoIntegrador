const express = require('express')
const app = express()
app.use(express.json())
const PORT = 8080
const Database = require('./dao/mongoDb/db')
const routerProduct = require('./dao/fileSystem/api/productManager/products.routes')
const routerCart = require('./dao/fileSystem/api/cartManager/cart.routes')
const routerIndex = require('./routes/index.routes')
const routerHome = require('./routes/home.routes')
const routerMongoDb = require('./dao/mongoDb/productsDb.routes')
const routerChat = require('./dao/mongoDb/chat/chat.routes')
const realTimeRouter = require('./routes/realtime.routes')
const productsRouter = require('./dao/mongoDb/productManagerMDb/products.routes')
const ChatManager = require('./dao/mongoDb/chat/ChatManagerDb')

// routes

app.use('/products', routerProduct)
app.use('/carts', routerCart)
app.use('/index', routerIndex)
app.use('/home', routerHome)
app.use('/mongo', routerMongoDb)
app.use('/chat', routerChat)
app.use('/realtimeproducts', realTimeRouter)
app.use('/product', productsRouter)

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


io.on('connection', async (socket) => {

    try{
        socket.emit('wellcome', 'Bienvenido!')
        socket.on('mensaje', async (data) => {
            console.log(data)
        })

        socket.on('connected', async (data) =>  {
            console.log(data)
        })

        const newMongoProd = new dbManager()
        let prodMongo = await newMongoProd.getProducts()
        io.sockets.emit('products', prodMongo)
        
        // socket.on('chat', async (data) => {
        //     messages.push(data)
        //     console.log(messages)
        //     io.sockets.emit('chat', messages)
        // })

        socket.on('chat', async (data) => {
            try{
                let chat = new ChatManager
                console.log(data)
                let adding = await chat.addMessage(data)
                if(!adding){
                    console.log('error em index chat addMessage')
                    return false
                }
                let getting = await chat.getMessage()
                if(!getting){
                    console.log('error em index chat getMessage')
                    return false
                }
                console.log(getting)
                io.sockets.emit('chat', getting)
            } catch (err) {
                console.log(err, 'error en socket en index / chat')
                return false    
            }
        })

    } catch (err) {
        console.log(err)
    }
})





//midleware

// const socketMiddleware = async (req, res, next) => {
//     try{
//         let product = new ProductManager();
//         product = await product.getProducts();
//         console.log(product)
//         io.sockets.emit('products', product);
//         next();
//     } catch (err) {
//         console.log(err)
//     }
// };

// app.use(socketMiddleware)