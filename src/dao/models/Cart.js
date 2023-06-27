const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product'
                }
            }
        ]
    }
}, {
    versionKey: false
})



const Cart = mongoose.model('cart', CartSchema)


module.exports = Cart
