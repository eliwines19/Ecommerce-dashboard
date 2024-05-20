const mongoose = require('mongoose')

const SaleSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    productPrice: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 20
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    customerEmail: {
        type: String,
        required: true,
        trim: true,
        maxLength: 320
    },
    customerPhoneNumber: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    customerCountry: {
        type: String,
        required: true,
        trim: true,
        maxLength: 60
    }
}, { timestamps: true })

module.exports = mongoose.model('Sale', SaleSchema)