//@ts-check
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const CartManager = require('../mongoDb/CartManagerMongodb')
const CM = new CartManager()

const schema = new Schema( {
    firstName: {
        type: String,
        required: true,
        max: 100,
    },
    lastName: {
        type: String,
        required: true,
        max: 100,
    },
    email: {
        type: String,
        required: true,
        max: 100,
        unique: true,
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
});
schema.plugin(mongoosePaginate);

module.exports = model('users', schema);