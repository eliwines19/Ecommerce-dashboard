const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email Address is required"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, { timestamps: true })

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12)
})

module.exports = mongoose.model("User", userSchema);