import express from "express";
import { config } from "./config/env.js";
const app = express();
const PORT = config.PORT;

//session

import session from "express-session";
import MongoStore from "connect-mongo";

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://nachoIntegrador:${config.passwordMongoDb}@integradordallape.knrlzeo.mongodb.net/integradorDallape`,
      ttl: 1800,
      autoRemove: "native",
    }),
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1800000,
      httpOnly: true,
    },
  })
);

//passport

import passport from "passport";

initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);

app.use(express.static(join(dirname(__filename), 'public')));

// handlebars

import handlebars from 'express-handlebars';

app.engine('handlebars', handlebars.engine());
app.set('views', join(dirname(__filename), 'views'));
app.set('view engine', 'handlebars');

// ROUTES

//imports


import { router as routerProduct } from "./dao/fileSystem/api/productManager/products.routes.js";
import { router as routerCart } from "./dao/fileSystem/api/cartManager/cart.routes.js";
import { router as routerIndex } from "./routes/view/index.view.js";
import { router as routerHome } from "./routes/view/home.view.js";
import { router as routerMongoDbProducts } from "./routes/routers/dbRoutes/DbProducts.routes.js";
import { router as routerChat } from "./routes/view/chat.view.js";
import { router as realTimeRouter } from "./routes/view/realtime.view.js";
import { router as paginateRouter } from "./routes/view/products.view.js";
import { ChatManager } from "./dao/mongo/classes/Chat.dao.js";
import { router as cartRouterMDb } from "./routes/routers/dbRoutes/DbCart.routes.js";
import { router as routerPaginate } from "./routes/routers/paginate/products.routes.js";
import { router as authRouter } from "./routes/auth/auth.routes.js";
import { initializePassport } from "./config/passport.js";
import { router as registerRouter } from "./routes/view/register.view.js";
import { router as loginRouter } from "./routes/view/login.view.js";
import { router as profileRouter } from "./routes/view/profile.view.js";

//general
app.use("/index", routerIndex);
app.use("/home", routerHome);
app.use("/chat", routerChat);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
//products
app.use("/products", paginateRouter);
app.use("/productList", routerPaginate);
app.use("/productsFs", routerProduct);
app.use("/dbProducts", routerMongoDbProducts);
app.use("/realtimeproducts", realTimeRouter);
//carts
app.use("/cartsFs", routerCart);
app.use("/dbCarts", cartRouterMDb);


//SOCKET

import http from 'http';
import { Server } from 'socket.io';
const server = http.createServer(app);
const io = new Server(server);


import dbManager from './dao/mongo/classes/Products.dao.js';
const newMongoProd = new dbManager();
let chat = new ChatManager();

export default io

io.on('connection', async (socket) => {
  try {

    //carrito, aca todavia no puedo acceder a session por mas de que en las demas rutas si pueda hacerlo, en socket no puedo por ahora
    socket.on("cart", (data) => {
      console.log("Data recibida desde el cliente:", data);
      const cart = data;

      console.log('req', socket.request)

      // Envía una respuesta de vuelta al cliente en el mismo evento 'cart'
      socket.emit("cart", "Respuesta desde el servidor");
    });


    //realtime
    let prodMongo = await newMongoProd.getProducts();
    socket.emit('products', prodMongo);
    socket.emit('products', prodMongo);
    socket.on('connected', async (data) => {
      console.log(data, 222);
    });
    socket.on('updateProducts', async () => {
      await emitProducts();
    });

    //chat

    socket.on('chat', async (data) => {
      try {
        console.log(data);
        let adding = await chat.addMessage(data);
        if (!adding) {
          console.log('error em index chat addMessage');
          return false;
        }
        let getting = await chat.getMessage();
        if (!getting) {
          console.log('error em index chat getMessage');
          return false;
        }
        console.log(getting);
        io.sockets.emit('chat', getting);
      } catch (err) {
        console.log(err, 'error en socket en index / chat');
        return false;
      }
    });

    socket.on('deletingMessages', async () => {
      try {
        const deleting = await chat.deleteAllMessages()
        console.log(deleting, 1234)
        if (!deleting) return false
        const getMessages = await chat.getMessage()
        console.log(getMessages, 123)
        if (!getMessages) return false
        io.sockets.emit('chat', getMessages)
      } catch (error) {
        console.log(err, 'error en socket en index / chat');
        return false;
      }
    })

    //paginate

    socket.on('page', async (data) => {
      try {
        let { limit, page, category, sort } = data;
        let b = await { limit, page, category, sort };
        let a = await newMongoProd.getProducts(b);
        socket.emit('actualPage', a);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('nextPage', async (data) => {
      try {
        console.log(data, 22);
        let a = await newMongoProd.getProducts(data);
        socket.emit('paginate', a);
      } catch (err) {
        console.log(err);
      }
    });
    socket.on('prevPage', async (data, options) => {
      try {
        let a = await newMongoProd.getProducts(data);
        socket.emit('paginate', a);
      } catch (err) {
        console.log(err);
      }
    });

    socket.emit('paginate', prodMongo);
  } catch (err) {
    console.log(err);
  }
});



app.get('/', (req, res) => {
  res.redirect('/login');
});

import Database from "./dao/mongo/db.js";

server.listen(PORT, () => {
  console.log('corriendo en el puerto: ', PORT);
  Database.connect();
});
