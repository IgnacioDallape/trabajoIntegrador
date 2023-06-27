const express = require('express')
const app = express()
app.use(express.json())
const PORT = 8080
const Database = require('./dao/mongoDb/db')
const routerProduct = require('./dao/fileSystem/api/productManager/products.routes')
const routerCart = require('./dao/fileSystem/api/cartManager/cart.routes')
const routerIndex = require('./routes/index.routes')
const routerHome = require('./routes/home.routes')
const routerMongoDb = require('./dao/mongoDb/productManagerMDb/productsDb.routes')
const routerChat = require('./routes/chat.routes')
const realTimeRouter = require('./routes/realtime.routes')
const paginateRouter = require('./routes/paginatedProducts.routes')
const ChatManager = require('./dao/mongoDb/chat/ChatManagerDb')
const cartRouterMDb = require('./dao/mongoDb/cartManagerMdb/cartDb.routes')

// routes

app.use('/products', routerProduct)
app.use('/carts', routerCart)
app.use('/index', routerIndex)
app.use('/home', routerHome)
app.use('/mongo', routerMongoDb)
app.use('/chat', routerChat)
app.use('/realtimeproducts', realTimeRouter)
app.use('/product', paginateRouter)
app.use('/mongoCarts', cartRouterMDb)


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

    try {

        //realtime

        let prodMongo = await newMongoProd.getProducts()
        socket.emit('products', prodMongo)
        socket.emit('products', prodMongo)
        socket.on('connected', async (data) => {
            console.log(data, 222);
        });
        socket.on('updateProducts', async () => {
            await emitProducts()
        })

        //chat

        socket.on('chat', async (data) => {
            try {
                let chat = new ChatManager
                console.log(data)
                let adding = await chat.addMessage(data)
                if (!adding) {
                    console.log('error em index chat addMessage')
                    return false
                }
                let getting = await chat.getMessage()
                if (!getting) {
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

        //paginate

        socket.on('page', async (data) => {
            try {
                let { limit, page, category, sort } = data
                let b = await ({ limit, page, category, sort })
                let a = await newMongoProd.getProducts(b)
                socket.emit('actualPage', a)
            } catch (err) {
                console.log(err)
            }
        });

        socket.on('nextPage', async (data) => {
            try {
                console.log(data, 22)
                let a = await newMongoProd.getProducts(data)
                socket.emit('paginate', a)
            } catch (err) {
                console.log(err)
            }
        })
        socket.on('prevPage', async (data, options) => {
            try {
                let a = await newMongoProd.getProducts(data)
                socket.emit('paginate', a)
            }
            catch (err) {
                console.log(err)
            }
        })
        
        socket.emit('paginate', prodMongo);


    } catch (err) {
        console.log(err)
    }
})

