import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import CartManager from '../mongoDb/CartManagerMongodb.js';
const CM = new CartManager();


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

export default model('users', schema);