const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({

    user: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        minlength: 1
    }
}, {
    timestamps: true,
    versionKey: false
})

const Chat = mongoose.model('chat', ChatSchema);

module.exports = Chat;
