const mongoose = require('mongoose')


module.exports = {
    connect: () => {
        return mongoose.connect('mongodb+srv://nachoIntegrador:nachoIntegrador@integradordallape.knrlzeo.mongodb.net/integradorDallape'
        , {useUnifiedTopology: true, useNewUrlParser: true})
        .then(connect => {
            console.log('conexion exitosa')
        })
        .catch(err => console.log(err))
    }
}