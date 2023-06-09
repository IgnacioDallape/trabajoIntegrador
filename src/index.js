const express = require('express')
const app = express()


// static

app.use(express.static(__dirname + '/public'))

// handlebars

const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('views engine', 'handlebars')

//socket

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req,res) => {
    res.send('Bienvenido!')
})

server.listen(8080, () =>{
    console.log('corriendo en el puerto: ', 8080)
})

