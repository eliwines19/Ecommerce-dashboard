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
    },
    colorTheme: {
        type: String,
        required: false,
        default: '#03C9D7'
    }
}, { timestamps: true })

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("User", userSchema);