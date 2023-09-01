import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
    code: String,
    purchase_datetime: {
        type: Date,
        default: Date.now 
    },
    amount: Number,
    purchaser: String
}, {
    versionKey: false
});

TicketSchema.pre('save', async function (next) {
    if (!this.code) {
        const generatedCode = await generateUniqueCode(); 
        this.code = generatedCode;
    }
    next();
});

async function generateUniqueCode() {
    const existingCodes = await ticket.find({}, 'code'); 
    const allCodes = existingCodes.map(entry => entry.code);

    let newCode;
    do {
        newCode = generateRandomCode();
    } while (allCodes.includes(newCode));

    return newCode;
}

function generateRandomCode() {
    return Math.random().toString(36).substr(2, 8).toUpperCase(); 
}

const ticket = mongoose.model('ticket', TicketSchema);

export default ticket;
