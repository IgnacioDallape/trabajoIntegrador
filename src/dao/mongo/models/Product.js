import { Schema, mongoose } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new Schema({

    title: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['higiene', 'cocina', 'verduleria', 'carniceria', 'electrodomesticos']
    }
}, {
    versionKey: false
})

ProductSchema.plugin(mongoosePaginate)


const Product = mongoose.model('product', ProductSchema)

export default Product
