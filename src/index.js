const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded( {extended: true} ))

const PORT = 8080
const Database = require('./dao/db')


const routerProduct = require('./dao/fileSystem/api/productManager/products.routes')
const routerCart = require('./dao/fileSystem/api/cartManager/cart.routes')
const routerIndex = require('./routes/view/index.view')
const routerHome = require('./routes/view/home.view')
const routerMongoDbProducts = require('./routes/routers/dbRoutes/DbProducts.routes')
const routerChat = require('./routes/view/chat.view')
const realTimeRouter = require('./routes/view/realtime.view')
const paginateRouter = require('./routes/view/products.view')
const ChatManager = require('./dao/mongoDb/ChatManagerDb')
const cartRouterMDb = require('./routes/routers/dbRoutes/DbCart.routes')
const routerPaginate = require('./routes/routers/paginate/products.routes')
const authRouter = require('./routes/routers/auth/auth.routes')
const initializePassport = require('./config/passport')
const registerRouter = require('./routes/view/register.view')
const loginRouter = require('./routes/view/login.view')
const profileRouter = require('./routes/view/profile.view')

//session
const session = require('express-session')
const MongoStore = require('connect-mongo')
const dotenv = require('dotenv')
dotenv.config()
let password = process.env.PASSWORD

app.use(session({
    store: MongoStore.create({
        mongoUrl:`mongodb+srv://nachoIntegrador:${password}@integradordallape.knrlzeo.mongodb.net/integradorDallape`
    }) ,
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

//passport

const passport = require('passport')
const github = require('./config/github.config.js')

initializePassport()
app.use(passport.initialize()) 
app.use(passport.session({}))

// routes

app.use('/productsFs', routerProduct)
app.use('/cartsFs', routerCart)
app.use('/index', routerIndex)
app.use('/home', routerHome)
app.use('/chat', routerChat)
app.use('/realtimeproducts', realTimeRouter)
app.use('/product', paginateRouter)
app.use('/mongoProducts', routerMongoDbProducts)
app.use('/mongoCarts', cartRouterMDb)
app.use('/products', routerPaginate)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/auth', authRouter)
app.use('/profile', profileRouter)


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




//io

let messages = []
const dbManager = require('./dao/mongoDb/ProductManagerMDb')
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




app.get('/', (req, res) => {
    res.send('Bienvenido!')
})

server.listen(PORT, () => {
    console.log('corriendo en el puerto: ', PORT)
    Database.connect()
})