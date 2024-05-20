const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    country: {
        type: String,
        required: true,
        trim: true,
        maxLength: 60
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    hireDate: {
        type: Date,
        required: true,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Employee', EmployeeSchema)