const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const {readdirSync} = require('fs')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('Listening to port:', PORT)
    })
}

server()