const mongoose = require('mongoose')
const Cart = require('../models/Cart')


module.exports = {
    connect: () => {
        return mongoose.connect('mongodb+srv://nachoIntegrador:nachoIntegrador@integradordallape.knrlzeo.mongodb.net/integradorDallape'
        , {useUnifiedTopology: true, useNewUrlParser: true})
        .then(async (connect) =>  {
            console.log('conexion exitosa')
        })
        .catch(err => console.log(err))
    }
}