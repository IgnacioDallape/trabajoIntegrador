import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
    code: {
        type: String,
        default: Date.now
    },
    purchase_datetime: {
        type: Date,
        default: Date.now 
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser:{
        type: String,
        max: 100
    }
}, {
    versionKey: false
});

const ticket = mongoose.model('ticket', TicketSchema);

export default ticket;
