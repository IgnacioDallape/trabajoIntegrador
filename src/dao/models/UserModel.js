//@ts-check
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const schema = new Schema({
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
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
});
schema.plugin(mongoosePaginate);
module.exports = model('users', schema);