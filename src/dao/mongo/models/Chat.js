import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({

    userMail: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        minlength: 1
    }
}, {
    versionKey: false
})

const Chat = mongoose.model('chat', ChatSchema);

export { Chat }
