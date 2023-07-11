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
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    grade: {
        type: Number,

    },
    group: {
        type: String,
        max: 100,
    }
});
schema.plugin(mongoosePaginate);
module.exports = model('users', schema);