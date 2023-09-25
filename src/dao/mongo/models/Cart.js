import mongoose from 'mongoose'

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

CartSchema.pre('find', function(){
    this.populate('products.product')
})

const Cart = mongoose.model('cart', CartSchema)


export default Cart