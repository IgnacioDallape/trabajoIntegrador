const mongoose = require('mongoose')
const Cart = require('../models/Cart')


module.exports = {
    connect: () => {
        return mongoose.connect('mongodb+srv://nachoIntegrador:nachoIntegrador@integradordallape.knrlzeo.mongodb.net/integradorDallape'
            , { useUnifiedTopology: true, useNewUrlParser: true })
            .then(db => {
                // console.log(db.connection.host)
                console.log('conexion exitosa')
            })
            .catch(err => console.log(err))
    }
}