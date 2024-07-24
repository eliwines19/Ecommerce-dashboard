const UserSchema = require('../models/UserModel')
require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token
    if(!token){
        return res.json({ status: false })
    }
    jwt.verify(token, `${process.env.TOKEN_SECRET}`, async (err, data) => {
        if(err){
            return res.json({ status: false })
        } else {
            const user = await UserSchema.findById(data.id)
            if(user){
                return res.json({ status: true, user: user.username, email: user.email, colorTheme: user.colorTheme })
            } else {
                return res.json({ status: false })
            }
        }
    })
}