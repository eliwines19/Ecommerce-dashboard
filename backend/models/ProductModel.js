const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 80
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 20
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)