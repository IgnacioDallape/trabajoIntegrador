const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['verdura', 'fruta', 'carne', 'pollo', 'pescado']
    }
})

const Product = mongoose.model('products', ProductSchema)

module.exports = Product
